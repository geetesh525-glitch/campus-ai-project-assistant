import uuid
import re
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    VivaGenerateRequest,
    VivaQuestionItem,
    VivaEvaluateRequest,
    VivaEvaluationResponse
)
from app.services.rag_service import rag_service
from app.core.config import settings

router = APIRouter(prefix="/viva", tags=["Viva Preparation"])

@router.post("/generate", response_model=list[VivaQuestionItem])
async def generate_viva_questions(payload: VivaGenerateRequest):
    topic = payload.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required.")

    rag_answer = ""
    source_pages = []
    if payload.documentId:
        q_res = rag_service.query(payload.documentId, topic, top_k=3)
        rag_answer = q_res.get("answer", "")
        source_pages = q_res.get("source_pages", [])

    # Tiered Viva Questions
    questions = [
        VivaQuestionItem(
            id=str(uuid.uuid4()),
            difficulty="Easy",
            question=f"Define {topic} and explain its primary significance in {payload.subject}.",
            modelAnswer=f"{topic} serves as a foundational concept in {payload.subject}, designed to ensure systematic execution, eliminate anomalies, and guarantee predictable behavior in computing systems.",
            explanation="Examiners begin with definition-level questions to evaluate fundamental clarity and composure.",
            sourcePage=source_pages[0] if source_pages else 1
        ),
        VivaQuestionItem(
            id=str(uuid.uuid4()),
            difficulty="Medium",
            question=f"What are the mandatory preconditions or constraints required to implement {topic} correctly?",
            modelAnswer=f"Correct implementation requires adhering to structural integrity constraints, dependency validation, deterministic inputs, and rigorous boundary verification.",
            explanation="Tests practical comprehension beyond memorized definitions.",
            sourcePage=source_pages[1] if len(source_pages) > 1 else None
        ),
        VivaQuestionItem(
            id=str(uuid.uuid4()),
            difficulty="Medium",
            question=f"Compare and contrast the primary method used in {topic} with standard classical alternatives.",
            modelAnswer="While classical approaches often tolerate redundant data or simplistic approximations, modern techniques apply strict normalization and algorithmic bounds to guarantee optimal trade-offs.",
            explanation="Focuses on analytical reasoning and comparative justification.",
            sourcePage=None
        ),
        VivaQuestionItem(
            id=str(uuid.uuid4()),
            difficulty="Hard",
            question=f"In an edge case where concurrency or resource contention spikes, how does {topic} prevent cascading failures?",
            modelAnswer="It prevents cascading failures through isolation levels, graceful degradation, defensive validation of inputs, and preserving dependency invariance under load.",
            explanation="High-level viva challenge reserved for distinguishing top candidates.",
            sourcePage=source_pages[-1] if source_pages else None
        ),
        VivaQuestionItem(
            id=str(uuid.uuid4()),
            difficulty="Hard",
            question=f"Critique the limitations of {topic}. Under what specific engineering conditions would you deliberately choose not to apply it?",
            modelAnswer="Limitations include computational overhead and increased join or coordination complexity. It is often bypassed in read-heavy analytics pipelines where denormalization is preferred.",
            explanation="Examiners look for candidates who understand where a technique should NOT be applied.",
            sourcePage=None
        )
    ]

    return questions[:payload.count]

@router.post("/evaluate", response_model=VivaEvaluationResponse)
async def evaluate_viva_answer(payload: VivaEvaluateRequest):
    student_ans = payload.studentAnswer.strip()
    if not student_ans:
        return VivaEvaluationResponse(
            score=0,
            accuracyGrade="Needs Improvement",
            feedback="No answer was provided. In an oral viva, silence indicates lack of preparation.",
            suggestions=["Attempt to articulate the core definition even if you are unsure of the details."]
        )

    # If OpenAI is configured, perform LLM evaluation
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            prompt = (
                f"Question: {payload.question}\n"
                f"Model Answer: {payload.modelAnswer}\n"
                f"Student Oral Response: {student_ans}\n\n"
                "Evaluate the student's answer out of 100 as an academic viva examiner. "
                "Output JSON strictly with keys: score (number), accuracyGrade (Excellent, Good, or Needs Improvement), "
                "feedback (string), suggestions (list of strings)."
            )
            res = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                temperature=0.2
            )
            data = json.loads(res.choices[0].message.content)
            return VivaEvaluationResponse(**data)
        except Exception as e:
            print(f"[OpenAI Viva Evaluation fallback]: {e}")

    # Deterministic semantic keyword match evaluation
    model_words = set(re.findall(r'\b[a-zA-Z]{4,}\b', payload.modelAnswer.lower()))
    student_words = set(re.findall(r'\b[a-zA-Z]{4,}\b', student_ans.lower()))

    overlap = model_words.intersection(student_words)
    ratio = len(overlap) / max(1, len(model_words))

    # Length & conceptual depth
    word_count = len(student_ans.split())
    if word_count < 8:
        score = min(40, int(ratio * 70) + 15)
        grade = "Needs Improvement"
        fb = "Your answer is too brief. Expand with specific technical terminology and context."
        sugg = ["Provide an explicit technical definition.", "Mention at least one real-world trade-off."]
    elif ratio > 0.35 or word_count > 30:
        score = min(95, int(65 + (ratio * 50)))
        grade = "Excellent" if score >= 85 else "Good"
        fb = f"Well reasoned answer. You correctly incorporated key principles ({', '.join(list(overlap)[:3]) or 'foundational theory'})."
        sugg = ["Keep answers structured: definition first, then mechanism, then trade-off."]
    else:
        score = min(75, int(45 + (ratio * 40)))
        grade = "Good"
        fb = "Acceptable foundational understanding, but lacks depth on key edge cases and technical terminology."
        sugg = ["Review the precise terminology in the model answer.", "Explain the 'why' behind the mechanism."]

    return VivaEvaluationResponse(
        score=score,
        accuracyGrade=grade,
        feedback=fb,
        suggestions=sugg
    )
