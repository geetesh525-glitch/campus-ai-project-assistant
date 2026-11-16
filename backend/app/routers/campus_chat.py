import uuid
import re
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.entities import CampusChatMessage, CampusKnowledgeDoc, UploadedDocument
from app.models.schemas import CampusChatRequest, CampusChatResponse
from app.services.rag_service import rag_service

router = APIRouter(prefix="/chat", tags=["Smart Campus Chatbot"])

# Sample campus knowledge facts for instant fallback answering
CAMPUS_KNOWLEDGE_BASE = [
    {
        "topic": "Attendance & Exam Eligibility",
        "content": "University regulations mandate a minimum of 75% attendance in each registered theory and laboratory course. A relaxation up to 65% may be granted strictly on verified medical grounds approved by the Academic Council. Students with less than 65% are debarred from end-semester examinations.",
        "source": "Academic Regulations Handbook 2026, Section 4.2"
    },
    {
        "topic": "Grading System & CGPA Calculation",
        "content": "The university follows a 10-point relative grading scale: O (Outstanding, 10), A+ (Excellent, 9), A (Very Good, 8), B+ (Good, 7), B (Above Average, 6), C (Pass, 5), F (Fail, 0). CGPA is computed as sum of (Course Credits * Grade Point) divided by total registered credits.",
        "source": "Examination Guidelines, Rule 8.1"
    },
    {
        "topic": "BTech Major Project Guidelines",
        "content": "Final-year BTech major projects must be executed in teams of 2 to 4 students under an allocated departmental faculty supervisor. Deliverables include Synopsis Defense (Week 4), Mid-Term Architecture Evaluation (Week 8), and Final Viva Voce with IEEE-format project report and live demonstration (Week 14).",
        "source": "Capstone Project Manual, CS Department"
    },
    {
        "topic": "Hostel & Campus Curfew Regulations",
        "content": "Hostel gates close at 10:00 PM on weekdays and 10:30 PM on weekends. Late entry requests must be submitted digitally via the Campus Portal at least 4 hours in advance with Warden approval.",
        "source": "Student Residential Code, Article 12"
    },
    {
        "topic": "Fee Payment & Scholarship Deadlines",
        "content": "Semester academic tuition fees must be remitted within 14 calendar days of semester registration. Merit-cum-Means and Post-Matric government scholarships require submission of income verification certificates to the Dean of Student Welfare office before September 30.",
        "source": "Finance & Bursar Circular 2026"
    }
]

@router.post("/message", response_model=CampusChatResponse)
async def process_campus_chat(payload: CampusChatRequest, db: Session = Depends(get_db)):
    user_query = payload.message.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Save user message
    user_msg_rec = CampusChatMessage(
        user_id="default-student",
        session_id=payload.sessionId,
        role="user",
        content=user_query,
        language=payload.language or "en"
    )
    db.add(user_msg_rec)
    db.commit()

    citations = []
    grounded_context = ""

    # Check knowledge base
    query_lower = user_query.lower()
    for kb in CAMPUS_KNOWLEDGE_BASE:
        words = set(re.findall(r'\b[a-zA-Z]{4,}\b', kb["topic"].lower()))
        q_words = set(re.findall(r'\b[a-zA-Z]{4,}\b', query_lower))
        if words.intersection(q_words):
            grounded_context += f"\n[{kb['source']}]: {kb['content']}\n"
            citations.append({
                "source": kb["source"],
                "topic": kb["topic"],
                "snippet": kb["content"][:160] + "..."
            })

    # If OpenAI API is configured, use LLM
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            
            system_prompt = (
                "You are the Campus AI Smart Assistant for university college students. "
                "You provide clear, accurate, friendly, and structured guidance regarding academic rules, "
                "curriculum, projects, exams, attendance, and campus life. "
                f"Respond in {payload.language == 'hi' and 'Hindi (हिंदी script)' or 'English'}. "
                "Always format your response cleanly with bullet points where appropriate."
            )
            if grounded_context:
                system_prompt += f"\n\nOfficial University Regulations Context:\n{grounded_context}"

            resp = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_query}
                ],
                temperature=0.3,
                max_tokens=700
            )
            bot_reply = resp.choices[0].message.content
        except Exception as e:
            print(f"[OpenAI Chatbot fallback]: {e}")
            bot_reply = _generate_local_campus_reply(user_query, grounded_context, payload.language)
    else:
        bot_reply = _generate_local_campus_reply(user_query, grounded_context, payload.language)

    # Save assistant message
    asst_msg_rec = CampusChatMessage(
        user_id="default-student",
        session_id=payload.sessionId,
        role="assistant",
        content=bot_reply,
        language=payload.language or "en",
        source_citations=citations
    )
    db.add(asst_msg_rec)
    db.commit()

    # Dynamic suggested follow-ups
    suggested = _get_suggested_followups(user_query, payload.language)

    return CampusChatResponse(
        reply=bot_reply,
        language=payload.language or "en",
        sessionId=payload.sessionId,
        suggestedQuestions=suggested,
        sourceCitations=citations
    )

def _generate_local_campus_reply(query: str, context: str, lang: str = "en") -> str:
    q = query.lower()

    if lang == "hi":
        if "attendance" in q or "उपस्थिति" in q:
            return (
                "विश्वविद्यालय के नियमों के अनुसार प्रत्येक पाठ्यक्रम में न्यूनतम **75% उपस्थिति** अनिवार्य है।\n\n"
                "- यदि मेडिकल कारण है, तो शैक्षणिक परिषद द्वारा सत्यापन के बाद इसे 65% तक छूट दी जा सकती है।\n"
                "- 65% से कम उपस्थिति होने पर छात्र को अंतिम सेमेस्टर परीक्षा में बैठने की अनुमति नहीं दी जाती है।"
            )
        elif "project" in q or "प्रोजेक्ट" in q:
            return (
                "BTech मेजर प्रोजेक्ट 2 से 4 छात्रों के समूह में पूरा किया जाता है:\n\n"
                "1. **प्रारंभिक सिनॉप्सिस डिफेंस**: सप्ताह 4\n"
                "2. **मिड-टर्म आर्किटेक्चर समीक्षा**: सप्ताह 8\n"
                "3. **अंतिम वाइवा और लाइव डेमो**: सप्ताह 14 (IEEE रिपोर्ट अनिवार्य)।"
            )
        else:
            return (
                f"नमस्ते! मैं कैंपस AI स्मार्ट सहायक हूँ। आपके प्रश्न '{query}' के संबंध में:\n\n"
                "• शैक्षणिक पाठ्यक्रम, परीक्षा समय सारणी और असाइनमेंट की सहायता यहाँ उपलब्ध है।\n"
                "• किसी विशिष्ट नियम (जैसे उपस्थिति, ग्रेडिंग, फीस या प्रोजेक्ट) के बारे में पूछें।"
            )

    # English Default
    if "attendance" in q or "absent" in q:
        return (
            "### University Attendance Policy & Exam Eligibility\n\n"
            "According to official **Academic Regulations (Section 4.2)**:\n"
            "- A minimum of **75% attendance** is mandatory in every registered theory and practical lab course.\n"
            "- A condonation relaxation down to **65%** is permitted strictly on medical grounds certified by the university health center.\n"
            "- Students below 65% are formally debarred from the End-Semester Examination."
        )
    elif "grade" in q or "cgpa" in q or "credit" in q:
        return (
            "### University 10-Point Relative Grading System\n\n"
            "The university computes your performance based on credits:\n"
            "- **O (Outstanding)**: 10 points\n"
            "- **A+ (Excellent)**: 9 points | **A (Very Good)**: 8 points\n"
            "- **B+ (Good)**: 7 points | **B (Above Average)**: 6 points\n"
            "- **C (Pass)**: 5 points | **F (Fail)**: 0 points\n\n"
            "Formula: `CGPA = Σ(Credits × Grade Point) / Σ(Total Credits)`"
        )
    elif "project" in q or "btech" in q or "capstone" in q:
        return (
            "### BTech Major Capstone Project Guidelines\n\n"
            "Final-year capstone projects follow a 3-phase review process:\n"
            "1. **Phase 1 (Week 4)**: Problem Statement & Literature Review Defense\n"
            "2. **Phase 2 (Week 8)**: System Architecture, Data Flow & Mid-Term Prototype\n"
            "3. **Phase 3 (Week 14)**: Final Viva Voce with live demo and IEEE-standard project report.\n\n"
            "Teams must consist of 2 to 4 students under a departmental faculty advisor."
        )
    elif "hostel" in q or "curfew" in q:
        return (
            "### Campus Residential & Hostel Timing\n\n"
            "- Weekday curfew is strictly **10:00 PM**; weekend curfew is **10:30 PM**.\n"
            "- Late night gate passes must be raised via the Student Portal with Warden approval at least 4 hours in advance."
        )
    elif context:
        return f"Based on verified university documentation:\n\n{context}"
    else:
        return (
            f"Hello! I am your **Campus AI Intelligent Assistant**.\n\n"
            f"Regarding your query on **{query}**:\n"
            "- You can explore research materials, run the 5-Agent Project Workspace, or generate formatted Word (.docx) assignments and slides (.pptx).\n"
            "- For administrative questions (attendance, fee deadlines, hostel rules, grade calculation), feel free to ask directly."
        )

def _get_suggested_followups(query: str, lang: str = "en") -> list:
    q = query.lower()
    if lang == "hi":
        return [
            "BTech पासिंग मार्क्स क्या हैं?",
            "मेजर प्रोजेक्ट के लिए टीम कैसे बनाएं?",
            "अटेंडेंस की कमी पर क्या नियम हैं?"
        ]

    if "attendance" in q:
        return [
            "What is the medical leave condonation process?",
            "How is attendance shortage penalized in internal marks?",
            "Where can I view my daily course attendance?"
        ]
    elif "grade" in q or "cgpa" in q:
        return [
            "What is the passing criteria for BTech degrees?",
            "How do backlog re-appear examinations work?",
            "Can I apply for grade re-evaluation?"
        ]
    elif "project" in q:
        return [
            "How do I choose an industry-relevant capstone topic?",
            "What should be included in the project synopsis?",
            "Generate system architecture for my project"
        ]
    else:
        return [
            "What are the attendance requirements for exams?",
            "Explain the BTech 10-point grading system",
            "What are the major project submission guidelines?"
        ]

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    messages = db.query(CampusChatMessage).filter(
        CampusChatMessage.session_id == session_id
    ).order_by(CampusChatMessage.created_at.asc()).limit(50).all()

    return [
        {
            "id": m.id,
            "role": m.role,
            "content": m.content,
            "language": m.language,
            "sourceCitations": m.source_citations or [],
            "createdAt": m.created_at.strftime("%I:%M %p")
        }
        for m in messages
    ]

@router.delete("/history/{session_id}")
async def clear_chat_history(session_id: str, db: Session = Depends(get_db)):
    db.query(CampusChatMessage).filter(CampusChatMessage.session_id == session_id).delete()
    db.commit()
    return {"message": "Chat history cleared successfully"}
