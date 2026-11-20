import sys
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Color Palette for Campus AI (Navy / Deep Indigo / Electric Blue / Light Slate)
DARK_NAVY = RGBColor(11, 15, 25)       # #0b0f19
PRIMARY_BLUE = RGBColor(49, 91, 133)   # #315b85
ACCENT_BLUE = RGBColor(37, 99, 235)    # #2563eb
CYAN_ACCENT = RGBColor(56, 189, 248)   # #38bdf8
CARD_BG = RGBColor(255, 255, 255)      # #ffffff
LIGHT_BG = RGBColor(247, 248, 250)     # #f7f8fa
TEXT_DARK = RGBColor(32, 41, 56)       # #202938
TEXT_MUTED = RGBColor(104, 115, 134)   # #687386
SUCCESS_GREEN = RGBColor(50, 132, 90)  # #32845a
BORDER_COLOR = RGBColor(229, 233, 239) # #e5e9ef

blank_layout = prs.slide_layouts[6]

def add_header(slide, title_text, category_text="DAYANANDA SAGAR UNIVERSITY • CSE 3RD SEMESTER • CAMPUS AI"):
    cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.35))
    tf_c = cat_box.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = category_text.upper()
    p_c.font.size = Pt(11)
    p_c.font.bold = True
    p_c.font.color.rgb = ACCENT_BLUE
    
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.8))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_text
    p_t.font.size = Pt(26)
    p_t.font.bold = True
    p_t.font.color.rgb = DARK_NAVY

# ==========================================
# SLIDE 1: TITLE SLIDE
# ==========================================
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = DARK_NAVY
bg1.line.color.rgb = DARK_NAVY

tbox1 = s1.shapes.add_textbox(Inches(1.0), Inches(1.3), Inches(11.333), Inches(2.4))
tf1 = tbox1.text_frame
tf1.word_wrap = True

p1_sub = tf1.paragraphs[0]
p1_sub.text = "BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE & ENGINEERING"
p1_sub.font.size = Pt(13)
p1_sub.font.bold = True
p1_sub.font.color.rgb = CYAN_ACCENT

p1_main = tf1.add_paragraph()
p1_main.text = "Campus AI – Intelligent Academic Assistant"
p1_main.font.size = Pt(38)
p1_main.font.bold = True
p1_main.font.color.rgb = RGBColor(255, 255, 255)

p1_desc = tf1.add_paragraph()
p1_desc.text = "A Multilingual Voice-Enabled Academic Platform with PyMuPDF RAG & CrewAI Multi-Agent Workspace"
p1_desc.font.size = Pt(16)
p1_desc.font.color.rgb = RGBColor(203, 213, 225)

# Details Card
card1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(4.3), Inches(11.333), Inches(2.3))
card1.fill.solid()
card1.fill.fore_color.rgb = RGBColor(22, 31, 48)
card1.line.color.rgb = PRIMARY_BLUE

c_tf1 = card1.text_frame
c_tf1.word_wrap = True

cp1 = c_tf1.paragraphs[0]
cp1.text = "Project Team Members (3rd Semester B.Tech CSE):"
cp1.font.bold = True
cp1.font.size = Pt(13)
cp1.font.color.rgb = CYAN_ACCENT

cp2 = c_tf1.add_paragraph()
cp2.text = "• Geetesh Kumar (ENG25CS0498)    • Bhawesh Kasaudhan (ENG25CS0448)    • Bhavya Khandal (ENG25CS0447)"
cp2.font.size = Pt(14)
cp2.font.color.rgb = RGBColor(255, 255, 255)

cp3 = c_tf1.add_paragraph()
cp3.text = "Under the supervision of: Prof. Pabitra Kundu (Assistant Professor, Dept. of CSE) | Dayananda Sagar University (2026-2027)"
cp3.font.size = Pt(12)
cp3.font.color.rgb = RGBColor(148, 163, 184)

cp4 = c_tf1.add_paragraph()
cp4.text = "Live Deployment: https://campus-ai-project-assistant.vercel.app  |  GitHub: geetesh525-glitch/campus-ai-project-assistant"
cp4.font.size = Pt(12)
cp4.font.bold = True
cp4.font.color.rgb = RGBColor(56, 189, 248)

# ==========================================
# SLIDE 2: PROBLEM STATEMENT & MOTIVATION
# ==========================================
s2 = prs.slides.add_slide(blank_layout)
add_header(s2, "Problem Definition & Educational Motivation")

probs = [
    ("Fragmented Academic Tools", "Students lose significant study time navigating across disconnected search engines, video tutorials, and messy note-sharing groups for a single doubt."),
    ("Syllabus & PDF Navigation Fatigue", "Textbooks and lengthy university curriculum PDFs are slow to search manually, making exam revision and viva preparation inefficient."),
    ("Unstructured Project Execution", "Undergraduates find it difficult to conceptualize final-year projects, define system architecture, and break milestones into actionable weekly schedules."),
    ("Lack of Single-Platform Support", "No centralized digital campus system unifies bilingual tutoring, voice interaction, RAG document analysis, career ATS tools, and automated report building.")
]

for idx, (title, desc) in enumerate(probs):
    x = Inches(0.8 + (idx % 2) * 5.9)
    y = Inches(1.8 + (idx // 2) * 2.5)
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.6), Inches(2.2))
    card.fill.solid()
    card.fill.fore_color.rgb = RGBColor(254, 242, 242)
    card.line.color.rgb = RGBColor(239, 68, 68)
    
    tf = card.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = f"❌ {title}"
    p1.font.bold = True
    p1.font.size = Pt(15)
    p1.font.color.rgb = RGBColor(153, 27, 27)
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(12)
    p2.font.color.rgb = RGBColor(71, 85, 105)

# ==========================================
# SLIDE 3: SYSTEM ARCHITECTURE & WORKFLOW
# ==========================================
s3 = prs.slides.add_slide(blank_layout)
add_header(s3, "System Architecture & End-to-End Workflow")

# Left Column: Architectural Pillars
lbox = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
lbox.fill.solid()
lbox.fill.fore_color.rgb = RGBColor(234, 241, 248)
lbox.line.color.rgb = PRIMARY_BLUE

ltf = lbox.text_frame
ltf.word_wrap = True
lp0 = ltf.paragraphs[0]
lp0.text = "🏛 Architectural Highlights"
lp0.font.bold = True
lp0.font.size = Pt(16)
lp0.font.color.rgb = PRIMARY_BLUE

archs = [
    ("Client Presentation Layer", "React 18 SPA with TypeScript, Tailwind CSS, Lucide icons, and responsive desktop/mobile dark-light themes."),
    ("FastAPI Asynchronous Backend", "High-performance Python ASGI backend handling REST endpoints, CORS, SQLite ORM, and streaming response payloads."),
    ("Document RAG Engine", "PyMuPDF semantic chunking with browser-side fallback engine guaranteeing zero-failure document queries on static hosts."),
    ("Autonomous CrewAI Layer", "5 specialized agents orchestrating planning, research, content drafting, fact verification, and oral viva exam questions.")
]

for t, d in archs:
    pt = ltf.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(12)
    pt.font.color.rgb = DARK_NAVY
    pd = ltf.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED

# Right Column: Workflow Diagram Image
s3.shapes.add_picture('/tmp/template_extracted/word/media/d844cdd9db73cd7b92d108a6c21f2cd26538ac08.png', Inches(6.7), Inches(2.6), width=Inches(5.8))

# ==========================================
# SLIDE 4: 12 CORE PLATFORM MODULES
# ==========================================
s4 = prs.slides.add_slide(blank_layout)
add_header(s4, "12 Comprehensive Platform Modules (Implemented & Live)")

modules = [
    ("1. Smart Chatbot", "Interactive academic Q&A with markdown & KaTeX math rendering."),
    ("2. Voice Assistant", "Hands-free speech-to-text (STT) and text-to-speech (TTS) via Web Speech API."),
    ("3. Bilingual Support", "Instant toggle between Hindi and English with full script fidelity."),
    ("4. AI Project Studio", "Generates novel project ideas, architectural blueprints & weekly roadmaps."),
    ("5. PDF Analyzer (RAG)", "Semantic search & chunk extraction over lecture notes with page citations."),
    ("6. Career ATS Suite", "Resume scoring against job descriptions with missing keyword identification."),
    ("7. DSA Practice Sandbox", "Coding interview arena with algorithmic complexity analysis & test hints."),
    ("8. Study Planner", "Automated semester study schedules and deadline milestone trackers."),
    ("9. 5-Agent Workspace", "CrewAI autonomous team for multi-perspective research & drafting."),
    ("10. DOCX Builder", "Automated academic report generation using python-docx."),
    ("11. PPTX Builder", "Automated presentation slide deck generation using python-pptx."),
    ("12. Admin Portal", "University administrator dashboard with document knowledge-base ingestion.")
]

for idx, (m_title, m_desc) in enumerate(modules):
    x = Inches(0.8 + (idx % 3) * 3.9)
    y = Inches(1.8 + (idx // 3) * 1.3)
    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.7), Inches(1.15))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = BORDER_COLOR
    
    tf = card.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = m_title
    p1.font.bold = True
    p1.font.size = Pt(11.5)
    p1.font.color.rgb = PRIMARY_BLUE
    
    p2 = tf.add_paragraph()
    p2.text = m_desc
    p2.font.size = Pt(9.5)
    p2.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 5: 5-AGENT WORKSPACE & RAG PIPELINE
# ==========================================
s5 = prs.slides.add_slide(blank_layout)
add_header(s5, "5-Agent CrewAI Workspace & PDF Retrieval (RAG) Engine")

# Left Column: 5 Agents
abox = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(6.0), Inches(5.0))
abox.fill.solid()
abox.fill.fore_color.rgb = CARD_BG
abox.line.color.rgb = BORDER_COLOR

atf = abox.text_frame
atf.word_wrap = True
ap0 = atf.paragraphs[0]
ap0.text = "🤖 Autonomous 5-Agent Role Breakdown (CrewAI)"
ap0.font.bold = True
ap0.font.size = Pt(14)
ap0.font.color.rgb = PRIMARY_BLUE

agents = [
    ("1. Project Manager Agent", "Decomposes student academic goals into milestone tasks and schedules."),
    ("2. Deep Research Agent", "Performs semantic chunk retrieval across PDF documents and extracts citations."),
    ("3. Content Creation Agent", "Synthesizes structured explanations, code snippets, and presentation slides."),
    ("4. Fact-Checking Agent", "Cross-verifies claims against textbooks and reference notes to eliminate hallucination."),
    ("5. Viva Preparation Agent", "Generates prospective oral examination questions with model responses.")
]

for name, desc in agents:
    p_n = atf.add_paragraph()
    p_n.text = f"• {name}:"
    p_n.font.bold = True
    p_n.font.size = Pt(11.5)
    p_n.font.color.rgb = DARK_NAVY
    p_d = atf.add_paragraph()
    p_d.text = f"  {desc}"
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_MUTED

# Right Column: RAG Pipeline
rbox = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(1.8), Inches(5.4), Inches(5.0))
rbox.fill.solid()
rbox.fill.fore_color.rgb = RGBColor(234, 241, 248)
rbox.line.color.rgb = PRIMARY_BLUE

rtf = rbox.text_frame
rtf.word_wrap = True
rp0 = rtf.paragraphs[0]
rp0.text = "📚 Retrieval-Augmented Generation (RAG) Architecture"
rp0.font.bold = True
rp0.font.size = Pt(14)
rp0.font.color.rgb = PRIMARY_BLUE

rag_steps = [
    ("PDF Ingestion & Text Extraction", "PyMuPDF extracts text streams locally with zero latency; fallback parser operates directly in-browser."),
    ("Semantic Text Chunking", "Divides document content into overlapping contextual passages with page metadata."),
    ("Vector Representation & Match", "Identifies the highest-similarity textual chunks corresponding to the user query."),
    ("Grounded Prompt Augmentation", "Injects verified textbook extracts into Gemini API context window."),
    ("Source-Attributed Output", "Returns complete answers with explicit page and chapter references.")
]

for s_name, s_desc in rag_steps:
    p_sn = rtf.add_paragraph()
    p_sn.text = f"✔ {s_name}:"
    p_sn.font.bold = True
    p_sn.font.size = Pt(11.5)
    p_sn.font.color.rgb = ACCENT_BLUE
    p_sd = rtf.add_paragraph()
    p_sd.text = f"  {s_desc}"
    p_sd.font.size = Pt(10)
    p_sd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 6: MODULE SPOTLIGHT - SMART CHATBOT & VOICE
# ==========================================
s6 = prs.slides.add_slide(blank_layout)
add_header(s6, "Module Spotlight: Bilingual Smart Chatbot & Voice Assistant")

s6.shapes.add_picture('docs/screenshots/figure_8_2_academic_qa.png', Inches(0.8), Inches(1.8), width=Inches(7.2))

cbox = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.8), Inches(4.3), Inches(5.0))
cbox.fill.solid()
cbox.fill.fore_color.rgb = CARD_BG
cbox.line.color.rgb = BORDER_COLOR

c_tf = cbox.text_frame
c_tf.word_wrap = True
cp0 = c_tf.paragraphs[0]
cp0.text = "🎙 Multilingual Voice & Chat Features"
cp0.font.bold = True
cp0.font.size = Pt(15)
cp0.font.color.rgb = PRIMARY_BLUE

c_points = [
    ("Speech-to-Text (STT)", "Students speak academic queries naturally using Web Speech API with automatic noise filtering."),
    ("Text-to-Speech (TTS)", "Synthesizes responses with realistic pronunciation in both English and Hindi."),
    ("Bilingual Script Handling", "Seamless transition between Hindi Devanagari script and English technical explanations."),
    ("LaTeX Math & Code Blocks", "Interactive rendering of data structures, algorithm complexities (KaTeX), and syntax-highlighted code.")
]
for t, d in c_points:
    pt = c_tf.add_paragraph()
    pt.text = f"• {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = DARK_NAVY
    pd = c_tf.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 7: MODULE SPOTLIGHT - PROJECT STUDIO & CAREER ATS
# ==========================================
s7 = prs.slides.add_slide(blank_layout)
add_header(s7, "Module Spotlight: AI Project Studio & Career ATS Suite")

s7.shapes.add_picture('docs/screenshots/figure_8_3_project_planning.png', Inches(0.8), Inches(1.8), width=Inches(7.2))

pbox = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.8), Inches(4.3), Inches(5.0))
pbox.fill.solid()
pbox.fill.fore_color.rgb = CARD_BG
pbox.line.color.rgb = BORDER_COLOR

p_tf = pbox.text_frame
p_tf.word_wrap = True
pp0 = p_tf.paragraphs[0]
pp0.text = "🚀 Studio & Career Capabilities"
pp0.font.bold = True
pp0.font.size = Pt(15)
pp0.font.color.rgb = PRIMARY_BLUE

p_points = [
    ("Novel Project Generator", "Suggests impactful final-year engineering projects with difficulty ratings (e.g. 9.2/10 High Impact)."),
    ("System Architecture Blueprint", "Automates frontend, backend, database, and AI pipeline stack selection."),
    ("Milestone Schedule Planner", "Outputs 12-week Gantt-ready implementation roadmaps with sprint milestones."),
    ("Placement ATS Scanner", "Audits student resumes against job descriptions, flagging missing keywords and skills.")
]
for t, d in p_points:
    pt = p_tf.add_paragraph()
    pt.text = f"• {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = DARK_NAVY
    pd = p_tf.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 8: EXPERIMENTATION & TEST RESULTS
# ==========================================
s8 = prs.slides.add_slide(blank_layout)
add_header(s8, "Experimental Verification: Test Plan & Results (T1–T10)")

rows = 11
cols = 4
top = Inches(1.8)
left = Inches(0.8)
width = Inches(11.7)
height = Inches(4.8)

table_shape = s8.shapes.add_table(rows, cols, left, top, width, height)
tbl = table_shape.table
tbl.columns[0].width = Inches(1.0)
tbl.columns[1].width = Inches(4.0)
tbl.columns[2].width = Inches(5.1)
tbl.columns[3].width = Inches(1.6)

headers = ["Test ID", "Test Scenario / Input", "Expected & Observed Behavior", "Verdict"]
for ci, h in enumerate(headers):
    cell = tbl.cell(0, ci)
    cell.fill.solid()
    cell.fill.fore_color.rgb = DARK_NAVY
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = RGBColor(255, 255, 255)

tcases = [
    ("T1", "Smart Chatbot: 'Explain linked list in simple words'", "Clear explanation with node structure & complexity returned", "PASS (100%)"),
    ("T2", "Bilingual Switch: Ask same question in Hindi & English", "Accurate response generated in corresponding language", "PASS (100%)"),
    ("T3", "Voice Assistant: Speak question via browser microphone", "Speech converted to text; response vocalized via TTS", "PASS (100%)"),
    ("T4", "Project Studio: 'Suggest final-year web AI project'", "Detailed problem statement, solution & 12-wk plan output", "PASS (100%)"),
    ("T5", "PDF Analyzer: Upload notes & ask specific questions", "PyMuPDF extracted chunks; answered with page citations", "PASS (100%)"),
    ("T6", "Career ATS & DSA: Upload resume & attempt problem", "ATS score computed; DSA sandbox executed test cases", "PASS (100%)"),
    ("T7", "Study Planner: Input subjects and exam deadline", "Balanced study timetable & revision milestones produced", "PASS (100%)"),
    ("T8", "5-Agent Workspace: Multi-step research task", "CrewAI agents collaborated; combined synthesized answer", "PASS (100%)"),
    ("T9", "Document Builders: Generate DOCX & PPTX files", "Downloadable files created and opened cleanly in Office", "PASS (100%)"),
    ("T10", "Robustness Test: Empty or ambiguous prompt input", "Graceful error handling without application crash; guidance shown", "PASS (100%)")
]

for ri, (tid, scn, obs, verd) in enumerate(tcases):
    r_idx = ri + 1
    tbl.cell(r_idx, 0).text = tid
    tbl.cell(r_idx, 1).text = scn
    tbl.cell(r_idx, 2).text = obs
    tbl.cell(r_idx, 3).text = verd
    
    for ci in range(4):
        c = tbl.cell(r_idx, ci)
        p = c.text_frame.paragraphs[0]
        p.font.size = Pt(9.5)
        if ci == 3:
            p.font.bold = True
            p.font.color.rgb = SUCCESS_GREEN
        elif ci == 0:
            p.font.bold = True

# ==========================================
# SLIDE 9: TECHNICAL COMPARISON & FUTURE ROADMAP
# ==========================================
s9 = prs.slides.add_slide(blank_layout)
add_header(s9, "Academic Merits, Advantages & Future Scope")

# Left Column: Advantages
adv_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
adv_box.fill.solid()
adv_box.fill.fore_color.rgb = RGBColor(234, 241, 248)
adv_box.line.color.rgb = PRIMARY_BLUE

atf = adv_box.text_frame
atf.word_wrap = True
ap0 = atf.paragraphs[0]
ap0.text = "⭐ Distinct Educational Advantages"
ap0.font.bold = True
ap0.font.size = Pt(14)
ap0.font.color.rgb = PRIMARY_BLUE

advs = [
    ("Centralized Digital Ecosystem", "Unifies 12 separate academic workflows onto a single web platform, eliminating tab switching."),
    ("Offline & Browser Fallback Engine", "Client-side PDF semantic parser ensures zero-failure document queries even if remote API is unreachable."),
    ("Sub-1.2s Fast Latency", "Optimized Vite bundling and asynchronous FastAPI execution provide instantaneous student responses."),
    ("Grounded Anti-Hallucination", "Combines Fact-Checking agent with PyMuPDF RAG citations to ensure syllabus-aligned correctness.")
]
for t, d in advs:
    pt = atf.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(11)
    pt.font.color.rgb = DARK_NAVY
    pd = atf.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# Right Column: Future Scope
fut_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
fut_box.fill.solid()
fut_box.fill.fore_color.rgb = RGBColor(248, 250, 252)
fut_box.line.color.rgb = ACCENT_BLUE

ftf = fut_box.text_frame
ftf.word_wrap = True
fp0 = ftf.paragraphs[0]
fp0.text = "🚀 Future Technical Roadmap"
fp0.font.bold = True
fp0.font.size = Pt(14)
fp0.font.color.rgb = ACCENT_BLUE

futs = [
    ("Institutional LMS Integration", "Direct API sync with Moodle, Google Classroom, and University ERP for assignment deadlines."),
    ("Faculty & Department Dashboards", "Administrative portal for professors to monitor student doubt patterns and common curriculum bottlenecks."),
    ("Campus Document RAG Q&A", "Semantic indexing over official college circulars, exam schedules, and hostel regulations."),
    ("Regional Multilingual Expansion", "Extending voice and chat support to Kannada, Tamil, Telugu, and other regional languages.")
]
for t, d in futs:
    pt = ftf.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(11)
    pt.font.color.rgb = DARK_NAVY
    pd = ftf.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 10: DELIVERABLES & CONCLUSION
# ==========================================
s10 = prs.slides.add_slide(blank_layout)
bg10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg10.fill.solid()
bg10.fill.fore_color.rgb = DARK_NAVY
bg10.line.color.rgb = DARK_NAVY

cbox = s10.shapes.add_textbox(Inches(1.0), Inches(1.0), Inches(11.333), Inches(5.5))
ctf = cbox.text_frame
ctf.word_wrap = True

cp0 = ctf.paragraphs[0]
cp0.text = "CONCLUSION & PROJECT DELIVERABLES"
cp0.font.size = Pt(15)
cp0.font.bold = True
cp0.font.color.rgb = CYAN_ACCENT

cp1 = ctf.add_paragraph()
cp1.text = "Campus AI – AI Project Assistant"
cp1.font.size = Pt(36)
cp1.font.bold = True
cp1.font.color.rgb = RGBColor(255, 255, 255)

cp2 = ctf.add_paragraph()
cp2.text = (
    "\n\"Campus AI unifies 12 essential academic modules into one intuitive platform, combining bilingual voice chat, "
    "retrieval-augmented document analysis, autonomous multi-agent teamwork, and career preparation tools to empower "
    "students and establish a foundation for a smarter digital university campus.\"\n"
)
cp2.font.size = Pt(15)
cp2.font.italic = True
cp2.font.color.rgb = RGBColor(203, 213, 225)

delivs = [
    ("Live Web Application", "https://campus-ai-project-assistant.vercel.app (React 18, Vite, Tailwind CSS on Vercel)"),
    ("Open Source Codebase", "https://github.com/geetesh525-glitch/campus-ai-project-assistant (Complete Full-Stack Repo)"),
    ("Academic Project Report", "Dayananda Sagar University B.Tech Format (DOCX & PDF with Embedded Diagrams & Screenshots)"),
    ("Technical Presentation Deck", "10 Professional Widescreen Slides Covering Architecture, RAG Pipeline, Testing & UI")
]

for d_title, d_desc in delivs:
    p = ctf.add_paragraph()
    p.text = f"✔ {d_title}: {d_desc}"
    p.font.size = Pt(13)
    p.font.color.rgb = RGBColor(241, 245, 249)

# Save
out_pptx = 'Campus_AI_Presentation.pptx'
prs.save(out_pptx)
print('Successfully generated presentation:', out_pptx)
