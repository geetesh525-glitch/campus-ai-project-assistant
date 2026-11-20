import sys
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Premium Color Palette
NAVY_BG = RGBColor(15, 23, 42)        # #0f172a (Deep Slate / Navy)
SLATE_SURFACE = RGBColor(30, 41, 59)   # #1e293b (Card Surface Dark)
LIGHT_SURFACE = RGBColor(255, 255, 255)# #ffffff (Card Surface Light)
PAGE_BG = RGBColor(248, 250, 252)      # #f8fafc (Soft Body Background)
BRAND_BLUE = RGBColor(37, 99, 235)     # #2563eb (Primary Royal Blue)
CYAN_ACCENT = RGBColor(56, 189, 248)   # #38bdf8 (Vibrant Cyan)
TEXT_DARK = RGBColor(15, 23, 42)       # #0f172a (Heading Text)
TEXT_MUTED = RGBColor(71, 85, 105)     # #475569 (Secondary Text)
SUCCESS_GREEN = RGBColor(22, 163, 74)  # #16a34a (Verified / Pass)
BORDER_LIGHT = RGBColor(226, 232, 240) # #e2e8f0 (Card Border)
WHITE = RGBColor(255, 255, 255)

blank_layout = prs.slide_layouts[6]

def create_slide_base(prs, title, kicker="DAYANANDA SAGAR UNIVERSITY • CSE 3RD SEMESTER • AI RESUME ANALYZER"):
    slide = prs.slides.add_slide(blank_layout)
    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = PAGE_BG
    bg.line.fill.background()
    
    # Top banner bar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = BRAND_BLUE
    top_bar.line.fill.background()

    # Kicker
    k_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.7), Inches(0.35))
    k_tf = k_box.text_frame
    k_tf.word_wrap = True
    k_tf.margin_top = k_tf.margin_bottom = k_tf.margin_left = k_tf.margin_right = 0
    p_k = k_tf.paragraphs[0]
    p_k.text = kicker.upper()
    p_k.font.size = Pt(10)
    p_k.font.bold = True
    p_k.font.color.rgb = BRAND_BLUE

    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.7), Inches(0.75))
    t_tf = t_box.text_frame
    t_tf.word_wrap = True
    t_tf.margin_top = t_tf.margin_bottom = t_tf.margin_left = t_tf.margin_right = 0
    p_t = t_tf.paragraphs[0]
    p_t.text = title
    p_t.font.size = Pt(24)
    p_t.font.bold = True
    p_t.font.color.rgb = TEXT_DARK

    return slide

# ========================================================
# SLIDE 1: HERO TITLE SLIDE (Deep Dark Executive Theme)
# ========================================================
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = NAVY_BG
bg1.line.fill.background()

# Top Accent Strip
acc = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.18))
acc.fill.solid()
acc.fill.fore_color.rgb = BRAND_BLUE
acc.line.fill.background()

# Title Content Box
tbox1 = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(2.6))
tf1 = tbox1.text_frame
tf1.word_wrap = True
tf1.margin_left = tf1.margin_right = tf1.margin_top = tf1.margin_bottom = 0

p1 = tf1.paragraphs[0]
p1.text = "DAYANANDA SAGAR UNIVERSITY • SCHOOL OF ENGINEERING"
p1.font.size = Pt(12)
p1.font.bold = True
p1.font.color.rgb = CYAN_ACCENT

p2 = tf1.add_paragraph()
p2.text = "AI Resume Analyzer & Job Matcher"
p2.font.size = Pt(38)
p2.font.bold = True
p2.font.color.rgb = WHITE

p3 = tf1.add_paragraph()
p3.text = "A Multi-Domain Resume Section Auditor, 32-Skill Detection Engine & Dynamic Role Matcher"
p3.font.size = Pt(16)
p3.font.color.rgb = RGBColor(203, 213, 225)

# 2 Column Info Cards
# Left Card: Student Team
c_left = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(4.0), Inches(5.5), Inches(2.7))
c_left.fill.solid()
c_left.fill.fore_color.rgb = SLATE_SURFACE
c_left.line.color.rgb = RGBColor(51, 65, 85)
c_left.line.width = Pt(1)

cl_tf = c_left.text_frame
cl_tf.word_wrap = True
cl_p0 = cl_tf.paragraphs[0]
cl_p0.text = "🎓 PROJECT TEAM (3rd Sem B.Tech CSE)"
cl_p0.font.bold = True
cl_p0.font.size = Pt(12)
cl_p0.font.color.rgb = CYAN_ACCENT

members = [
    ("Geetesh Kumar", "ENG25CS0498"),
    ("Bhawesh Kasaudhan", "ENG25CS0448"),
    ("Devi Kedareshwari", "ENG25CS0482")
]
for name, usn in members:
    p = cl_tf.add_paragraph()
    p.text = f"• {name}  ({usn})"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = WHITE

# Right Card: Academic Guidance & Links
c_right = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(4.0), Inches(5.5), Inches(2.7))
c_right.fill.solid()
c_right.fill.fore_color.rgb = SLATE_SURFACE
c_right.line.color.rgb = RGBColor(51, 65, 85)
c_right.line.width = Pt(1)

cr_tf = c_right.text_frame
cr_tf.word_wrap = True
cr_p0 = cr_tf.paragraphs[0]
cr_p0.text = "👨‍🏫 ACADEMIC SUPERVISION & DEPLOYMENT"
cr_p0.font.bold = True
cr_p0.font.size = Pt(12)
cr_p0.font.color.rgb = CYAN_ACCENT

p_sup = cr_tf.add_paragraph()
p_sup.text = "Supervised by:"
p_sup.font.size = Pt(11)
p_sup.font.color.rgb = RGBColor(148, 163, 184)

p_sup_name = cr_tf.add_paragraph()
p_sup_name.text = "Prof. Pabitra Kundu"
p_sup_name.font.size = Pt(15)
p_sup_name.font.bold = True
p_sup_name.font.color.rgb = WHITE

p_sup_des = cr_tf.add_paragraph()
p_sup_des.text = "Assistant Professor, Dept. of CSE (2026-2027)"
p_sup_des.font.size = Pt(11)
p_sup_des.font.color.rgb = RGBColor(203, 213, 225)

p_link = cr_tf.add_paragraph()
p_link.text = "🔗 Live App: https://ai-resume-analyzer-t442.vercel.app"
p_link.font.size = Pt(11.5)
p_link.font.bold = True
p_link.font.color.rgb = CYAN_ACCENT

# ========================================================
# SLIDE 2: PROBLEM STATEMENT & MOTIVATION
# ========================================================
s2 = create_slide_base(prs, "Problem Definition & Educational Motivation")

cards_data = [
    ("Unstructured Resume Formats", "Undergraduate students frequently omit standard technical sections (Education, Skills, Experience, Projects, Contact Info), leading to instant rejection by automated ATS filters.", "⚠️ Placement Screening Risk"),
    ("Opaque Commercial ATS Software", "Commercial resume evaluators hide scoring criteria behind paywalls, subscription models, and complex metrics that confuse entry-level job seekers.", "💰 Paywalls & Inaccessibility"),
    ("Unclear Technical Skill Gaps", "Students struggle to recognize whether their completed academic projects and coursework align with specific job descriptions across modern software engineering stacks.", "🔍 Undetected Skill Gaps"),
    ("Lack of Instant Turnaround", "Traditional manual reviews by faculty or mentors require days to schedule, leaving students without timely feedback before campus recruitment drives.", "⏱ Slow Turnaround Time")
]

for idx, (head, body, tag) in enumerate(cards_data):
    x = Inches(0.8 + (idx % 2) * 5.95)
    y = Inches(1.65 + (idx // 2) * 2.6)
    
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.75), Inches(2.35))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_SURFACE
    card.line.color.rgb = BORDER_LIGHT
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    
    p_tag = tf.paragraphs[0]
    p_tag.text = tag.upper()
    p_tag.font.size = Pt(9.5)
    p_tag.font.bold = True
    p_tag.font.color.rgb = RGBColor(220, 38, 38)
    
    p_h = tf.add_paragraph()
    p_h.text = head
    p_h.font.size = Pt(15)
    p_h.font.bold = True
    p_h.font.color.rgb = TEXT_DARK
    
    p_b = tf.add_paragraph()
    p_b.text = body
    p_b.font.size = Pt(11)
    p_b.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 3: PROPOSED SOLUTION & ARCHITECTURE
# ========================================================
s3 = create_slide_base(prs, "Proposed Solution: Lightweight & Privacy-Safe Architecture")

# Left Column (Core Features Card)
left_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(5.4), Inches(5.2))
left_card.fill.solid()
left_card.fill.fore_color.rgb = LIGHT_SURFACE
left_card.line.color.rgb = BRAND_BLUE
left_card.line.width = Pt(1.5)

ltf = left_card.text_frame
ltf.word_wrap = True

lp0 = ltf.paragraphs[0]
lp0.text = "🎯 Architectural Pillars"
lp0.font.bold = True
lp0.font.size = Pt(15)
lp0.font.color.rgb = BRAND_BLUE

sol_bullets = [
    ("Local PyPDF2 Stream Parsing", "Extracts plain text in-memory from standard PDF documents with zero cloud storage, ensuring complete student data privacy."),
    ("Section Completeness Auditor", "Evaluates structural readiness across 5 vital sections (Education, Skills, Experience, Projects, Contact Info) with a visual progress meter."),
    ("32-Skill Multi-Domain Engine", "Detects technical, analytical, marketing, design, and management proficiencies without requiring manual entry."),
    ("Deterministic Ratio Matching", "Uses exact set-theory formula: (Matched Skills / Required Skills) × 100 with zero black-box deductions.")
]

for title, desc in sol_bullets:
    pt = ltf.add_paragraph()
    pt.text = f"✔ {title}"
    pt.font.bold = True
    pt.font.size = Pt(12)
    pt.font.color.rgb = TEXT_DARK
    pd = ltf.add_paragraph()
    pd.text = desc
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED

# Right Column: Workflow Diagram
s3.shapes.add_picture('resume_analyzer_project/screenshots/fig4_1_workflow.png', Inches(6.5), Inches(2.2), width=Inches(6.0))

# ========================================================
# SLIDE 4: TECHNOLOGY STACK & SYSTEM SPECIFICATIONS
# ========================================================
s4 = create_slide_base(prs, "Technology Stack & Technical Architecture")

tech_cards = [
    ("Frontend UI", "HTML5 & CSS3 Variables", "Clean semantic structure, custom CSS3 variable styling with responsive Flexbox and Grid layouts."),
    ("Client-Side Logic", "Vanilla JavaScript (ES6+)", "Client-side MIME type validation, strict 5 MB file size caps, and dynamic catalog filtering."),
    ("Backend Controller", "Python 3 & Flask WSGI", "Lightweight, modular micro-framework handling HTTP routing, sessions, and analytical algorithms."),
    ("PDF Parsing Engine", "PyPDF2 (v3.0+)", "Pure-Python PDF text extraction directly from in-memory stream buffers without cloud latency."),
    ("Skill Detection", "Rule-Based Regex Engine", "Case-insensitive pattern matching across 32 domain competencies spanning tech, design, and business."),
    ("Deployment & Tests", "Vercel & Pytest Suite", "Automated Pytest unit testing suite (T1–T10) and globally distributed Vercel serverless cloud hosting.")
]

for idx, (layer, tech, detail) in enumerate(tech_cards):
    x = Inches(0.8 + (idx % 3) * 3.95)
    y = Inches(1.65 + (idx // 3) * 2.6)
    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.8), Inches(2.35))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_SURFACE
    card.line.color.rgb = BORDER_LIGHT
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    
    p1 = tf.paragraphs[0]
    p1.text = layer.upper()
    p1.font.bold = True
    p1.font.size = Pt(10)
    p1.font.color.rgb = BRAND_BLUE
    
    p2 = tf.add_paragraph()
    p2.text = tech
    p2.font.bold = True
    p2.font.size = Pt(14)
    p2.font.color.rgb = TEXT_DARK
    
    p3 = tf.add_paragraph()
    p3.text = detail
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 5: 32 MULTI-DOMAIN SKILLS & MATH FORMULA
# ========================================================
s5 = create_slide_base(prs, "32-Skill Detection Engine & Transparent Math Formulation")

# Left Box: 32 Skills Taxonomy
s_card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(6.5), Inches(5.2))
s_card.fill.solid()
s_card.fill.fore_color.rgb = LIGHT_SURFACE
s_card.line.color.rgb = BORDER_LIGHT
s_card.line.width = Pt(1.5)

stf = s_card.text_frame
stf.word_wrap = True

sp0 = stf.paragraphs[0]
sp0.text = "📋 32 Predefined Domain Competencies"
sp0.font.bold = True
sp0.font.size = Pt(13)
sp0.font.color.rgb = BRAND_BLUE

categories = [
    ("Programming Languages", "Python, Java, C, C++, JavaScript"),
    ("Web & Frameworks", "HTML, CSS, React, Flask, Django"),
    ("Data & Databases", "SQL, MySQL, MongoDB, Data Structures, Machine Learning"),
    ("Tools & Analytics", "Git, Excel, Financial Analysis, Accounting, Research"),
    ("Design & Marketing", "UI/UX Design, Graphic Design, SEO, Digital Marketing, Content Writing"),
    ("Management & Soft", "Communication, Problem Solving, Project Management, HR, Sales, Support, Teamwork")
]

for cname, slist in categories:
    p = stf.add_paragraph()
    p.text = f"• {cname}: {slist}"
    p.font.size = Pt(10.5)
    p.font.color.rgb = TEXT_DARK

# Right Box: Math Formula & Educational Impact
f_card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.6), Inches(1.65), Inches(4.9), Inches(5.2))
f_card.fill.solid()
f_card.fill.fore_color.rgb = RGBColor(239, 246, 255)
f_card.line.color.rgb = BRAND_BLUE
f_card.line.width = Pt(1.5)

ftf = f_card.text_frame
ftf.word_wrap = True

fp0 = ftf.paragraphs[0]
fp0.text = "📐 Transparent Mathematical Formulation"
fp0.font.bold = True
fp0.font.size = Pt(14)
fp0.font.color.rgb = BRAND_BLUE

fp1 = ftf.add_paragraph()
fp1.text = "\nCore Matching Formula:\nMatch % = ( Matched Skills / Required Skills ) × 100"
fp1.font.bold = True
fp1.font.size = Pt(13)
fp1.font.color.rgb = RGBColor(30, 58, 138)

fp2 = ftf.add_paragraph()
fp2.text = (
    "\nStudent Benefits:\n"
    "• Direct visibility into missing required competencies.\n"
    "• Students see immediate quantifiable score jumps by acquiring target tools.\n"
    "• Deterministic reproducibility: zero random or hallucinated grading.\n"
    "• Benchmarked against 17 real-world industry career profiles."
)
fp2.font.size = Pt(11)
fp2.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 6: MODULE 1 - RESUME ANALYZER SPOTLIGHT
# ========================================================
s6 = create_slide_base(prs, "Module 1 Spotlight: Resume Section & Skill Completeness Auditor")

s6.shapes.add_picture('resume_analyzer_project/screenshots/fig_analyzer.png', Inches(0.8), Inches(1.65), width=Inches(7.2))

r_card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.65), Inches(4.2), Inches(5.2))
r_card.fill.solid()
r_card.fill.fore_color.rgb = LIGHT_SURFACE
r_card.line.color.rgb = BORDER_LIGHT
r_card.line.width = Pt(1.5)

rtf = r_card.text_frame
rtf.word_wrap = True

rp0 = rtf.paragraphs[0]
rp0.text = "🔍 Resume Audit Highlights"
rp0.font.bold = True
rp0.font.size = Pt(14)
rp0.font.color.rgb = BRAND_BLUE

r_bullets = [
    ("Local PDF Stream Parser", "Processes PDF files up to 5 MB using PyPDF2 without writing files to disk, ensuring privacy."),
    ("5-Section Structure Check", "Audits presence of Education, Skills, Experience, Projects, and Contact details."),
    ("Completeness Score Meter", "Computes an overall educational score showing student readiness for campus drives."),
    ("Extracted Skill Badges", "Displays detected skills as clear badge chips for instant candidate verification.")
]

for t, d in r_bullets:
    pt = rtf.add_paragraph()
    pt.text = f"✔ {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_DARK
    pd = rtf.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 7: MODULE 2 - JOB MATCHER SPOTLIGHT
# ========================================================
s7 = create_slide_base(prs, "Module 2 Spotlight: Dynamic Job Matcher & Role Catalog")

s7.shapes.add_picture('resume_analyzer_project/screenshots/fig_matcher.png', Inches(0.8), Inches(1.65), width=Inches(7.2))

m_card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.65), Inches(4.2), Inches(5.2))
m_card.fill.solid()
m_card.fill.fore_color.rgb = LIGHT_SURFACE
m_card.line.color.rgb = BORDER_LIGHT
m_card.line.width = Pt(1.5)

mtf = m_card.text_frame
mtf.word_wrap = True

mp0 = mtf.paragraphs[0]
mp0.text = "🎯 Matching & Guidance Features"
mp0.font.bold = True
mp0.font.size = Pt(14)
mp0.font.color.rgb = BRAND_BLUE

m_bullets = [
    ("17 Industry Role Profiles", "Spans Full-Stack, Python Developer, Data Analyst, UI/UX Designer, Digital Marketer, etc."),
    ("7 Domain Filter Pills", "Instant filtering across Tech, Analytics, Marketing, Design, HR, Finance, and All Domains."),
    ("Custom Job Description Match", "Allows students to paste any target company job posting to test qualification match."),
    ("Targeted Learning Advice", "Displays missing competencies in red with actionable guidance on what to learn next.")
]

for t, d in m_bullets:
    pt = mtf.add_paragraph()
    pt.text = f"✔ {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_DARK
    pd = mtf.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 8: EXPERIMENTATION & TEST RESULTS (T1–T10)
# ========================================================
s8 = create_slide_base(prs, "Experimental Verification: Test Plan & Matrix (T1–T10)")

rows = 11
cols = 4
top = Inches(1.65)
left = Inches(0.8)
width = Inches(11.7)
height = Inches(5.1)

table_shape = s8.shapes.add_table(rows, cols, left, top, width, height)
tbl = table_shape.table
tbl.columns[0].width = Inches(1.0)
tbl.columns[1].width = Inches(4.0)
tbl.columns[2].width = Inches(5.1)
tbl.columns[3].width = Inches(1.6)

headers = ["Test ID", "Test Scenario / Input", "Observed Behavior & Output", "Verdict"]
for ci, h in enumerate(headers):
    cell = tbl.cell(0, ci)
    cell.fill.solid()
    cell.fill.fore_color.rgb = NAVY_BG
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = WHITE

test_data = [
    ("T1", "Upload valid PDF resume (< 5 MB)", "PyPDF2 extracted clean text; complete skills & score rendered", "PASS (100%)"),
    ("T2", "Upload non-PDF document (.docx / .txt)", "Client-side validation blocked upload; warning banner shown", "PASS (100%)"),
    ("T3", "Upload oversized PDF (> 5 MB)", "Strict 5 MB size cap enforced before upload; bandwidth saved", "PASS (100%)"),
    ("T4", "Scanned / image-only PDF with no text", "Safely caught without server error; prompted selectable text", "PASS (100%)"),
    ("T5", "Resume missing Projects section", "Section penalty deducted accurately; completeness updated", "PASS (100%)"),
    ("T6", "Resume with Python, SQL, Git", "Competencies detected and rendered as green skill badges", "PASS (100%)"),
    ("T7", "Job Matcher: Junior Python Developer", "Exact match % computed: (Matched / Required) * 100", "PASS (100%)"),
    ("T8", "Custom pasted job description", "Extracted skills from custom text; computed live match fit", "PASS (100%)"),
    ("T9", "Dynamic Domain Filter: Tech & Software", "DOM dynamically updated role cards matching selected domain", "PASS (100%)"),
    ("T10", "Offline execution without Gemini key", "All parsing, section audits, and job matching ran locally", "PASS (100%)")
]

for ri, (tid, scn, obs, verd) in enumerate(test_data):
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

# ========================================================
# SLIDE 9: ACADEMIC MERITS & FUTURE ROADMAP
# ========================================================
s9 = create_slide_base(prs, "Academic Merits, Comparative Advantages & Future Roadmap")

# Left Card: Merits
l_card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(5.6), Inches(5.2))
l_card.fill.solid()
l_card.fill.fore_color.rgb = RGBColor(240, 253, 244)
l_card.line.color.rgb = SUCCESS_GREEN
l_card.line.width = Pt(1.5)

ltf9 = l_card.text_frame
ltf9.word_wrap = True

lp09 = ltf9.paragraphs[0]
lp09.text = "⭐ Key Student Benefits & Advantages"
lp09.font.bold = True
lp09.font.size = Pt(14)
lp09.font.color.rgb = SUCCESS_GREEN

merits = [
    ("Zero Cost & Zero Paywalls", "100% free for students with no subscription gates, ads, or hidden charges."),
    ("100% Privacy & Data Security", "All PDF extraction runs in-memory; zero student resumes stored in external databases."),
    ("Sub-350ms Instant Processing", "Lightweight Python Flask and PyPDF2 execution provides instantaneous feedback."),
    ("Demystifies Placement Screening", "Transparent ratio formula allows students to clearly understand their ATS readiness.")
]

for t, d in merits:
    pt = ltf9.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(11)
    pt.font.color.rgb = TEXT_DARK
    pd = ltf9.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# Right Card: Roadmap
r_card9 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.65), Inches(5.7), Inches(5.2))
r_card9.fill.solid()
r_card9.fill.fore_color.rgb = RGBColor(239, 246, 255)
r_card9.line.color.rgb = BRAND_BLUE
r_card9.line.width = Pt(1.5)

rtf9 = r_card9.text_frame
rtf9.word_wrap = True

rp09 = rtf9.paragraphs[0]
rp09.text = "🚀 Future Technical Roadmap"
rp09.font.bold = True
rp09.font.size = Pt(14)
rp09.font.color.rgb = BRAND_BLUE

futs = [
    ("Tesseract OCR Integration", "Enable optical character recognition for scanned paper and image-based PDFs."),
    ("Semantic Vector Embeddings", "Incorporate Sentence-BERT for contextual phrase matching beyond exact keywords."),
    ("Automated LaTeX Generator", "One-click export of audited student resumes into university-approved LaTeX code."),
    ("Placement Cell Dashboard", "Institutional analytics for university training & placement officers to track cohort readiness.")
]

for t, d in futs:
    pt = rtf9.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(11)
    pt.font.color.rgb = TEXT_DARK
    pd = rtf9.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 10: DELIVERABLES & CONCLUSION (Dark Theme)
# ========================================================
s10 = prs.slides.add_slide(blank_layout)
bg10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg10.fill.solid()
bg10.fill.fore_color.rgb = NAVY_BG
bg10.line.fill.background()

cbox10 = s10.shapes.add_textbox(Inches(1.0), Inches(0.9), Inches(11.333), Inches(5.8))
ctf10 = cbox10.text_frame
ctf10.word_wrap = True
ctf10.margin_left = ctf10.margin_right = ctf10.margin_top = ctf10.margin_bottom = 0

cp010 = ctf10.paragraphs[0]
cp010.text = "PROJECT DELIVERABLES & CONCLUSION"
cp010.font.size = Pt(14)
cp010.font.bold = True
cp010.font.color.rgb = CYAN_ACCENT

cp110 = ctf10.add_paragraph()
cp110.text = "AI Resume Analyzer & Job Matcher"
cp110.font.size = Pt(36)
cp110.font.bold = True
cp110.font.color.rgb = WHITE

cp210 = ctf10.add_paragraph()
cp210.text = (
    "\n\"By delivering deterministic section completeness audits, a 32-skill detection taxonomy, "
    "and transparent mathematical qualification matching, the platform empowers undergraduate "
    "engineering students to self-audit their resumes and prepare effectively for campus placement drives.\"\n"
)
cp210.font.size = Pt(14.5)
cp210.font.italic = True
cp210.font.color.rgb = RGBColor(203, 213, 225)

delivs = [
    ("Live Web Application", "https://ai-resume-analyzer-t442.vercel.app (Hosted on Vercel Serverless Edge Runtime)"),
    ("Comprehensive Academic Report", "Dayananda Sagar University B.Tech Format (DOCX & PDF with Embedded Diagrams & Screenshots)"),
    ("Technical Presentation Deck", "10 Professional Widescreen Slides Covering Architecture, Math, Testing & Screenshots"),
    ("Source Code & Test Suite", "Modular Python Flask, PyPDF2 Parser, HTML5/CSS3 UI, and Pytest Suite (T1–T10 100% PASS)")
]

for d_title, d_desc in delivs:
    p = ctf10.add_paragraph()
    p.text = f"✔ {d_title}: {d_desc}"
    p.font.size = Pt(13)
    p.font.color.rgb = RGBColor(241, 245, 249)

out_pptx = 'resume_analyzer_project/AI_Resume_Analyzer_Presentation.pptx'
prs.save(out_pptx)
print('Successfully generated premium presentation:', out_pptx)
