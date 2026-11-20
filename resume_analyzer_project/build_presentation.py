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

# Color Palette
DARK_BLUE = RGBColor(15, 23, 42)      # #0f172a
PRIMARY_BLUE = RGBColor(37, 99, 235)  # #2563eb
LIGHT_BG = RGBColor(248, 250, 252)    # #f8fafc
CARD_BG = RGBColor(255, 255, 255)     # #ffffff
TEXT_DARK = RGBColor(15, 23, 42)      # #0f172a
TEXT_MUTED = RGBColor(71, 85, 105)    # #475569
ACCENT_GREEN = RGBColor(22, 163, 74)  # #16a34a
BORDER_COLOR = RGBColor(226, 232, 240)# #e2e8f0

blank_layout = prs.slide_layouts[6]

def add_header(slide, title_text, category_text="DAYANANDA SAGAR UNIVERSITY • CSE 3RD SEMESTER"):
    # Category tag
    cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.35))
    tf_c = cat_box.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = category_text.upper()
    p_c.font.size = Pt(11)
    p_c.font.bold = True
    p_c.font.color.rgb = PRIMARY_BLUE
    
    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.8))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_text
    p_t.font.size = Pt(26)
    p_t.font.bold = True
    p_t.font.color.rgb = DARK_BLUE

# ==========================================
# SLIDE 1: TITLE SLIDE
# ==========================================
s1 = prs.slides.add_slide(blank_layout)
# Background
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = DARK_BLUE
bg1.line.color.rgb = DARK_BLUE

# Title Box
tbox1 = s1.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.333), Inches(2.2))
tf1 = tbox1.text_frame
tf1.word_wrap = True

p1_sub = tf1.paragraphs[0]
p1_sub.text = "BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE & ENGINEERING"
p1_sub.font.size = Pt(14)
p1_sub.font.bold = True
p1_sub.font.color.rgb = PRIMARY_BLUE

p1_main = tf1.add_paragraph()
p1_main.text = "AI Resume Analyzer & Job Matcher"
p1_main.font.size = Pt(40)
p1_main.font.bold = True
p1_main.font.color.rgb = RGBColor(255, 255, 255)

p1_desc = tf1.add_paragraph()
p1_desc.text = "A Transparent, Multi-Domain Resume Section Auditor & Job Qualification Matching Engine"
p1_desc.font.size = Pt(16)
p1_desc.font.color.rgb = RGBColor(203, 213, 225)

# Details Card
card1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(4.3), Inches(11.333), Inches(2.2))
card1.fill.solid()
card1.fill.fore_color.rgb = RGBColor(30, 41, 59)
card1.line.color.rgb = PRIMARY_BLUE

c_tf1 = card1.text_frame
c_tf1.word_wrap = True

cp1 = c_tf1.paragraphs[0]
cp1.text = "Project Team Members:"
cp1.font.bold = True
cp1.font.size = Pt(13)
cp1.font.color.rgb = PRIMARY_BLUE

cp2 = c_tf1.add_paragraph()
cp2.text = "• Geetesh Kumar (ENG25CS0498)    • Bhawesh Kasaudhan (ENG25CS0448)    • Bhavya Khandal (ENG25CS0447)"
cp2.font.size = Pt(14)
cp2.font.color.rgb = RGBColor(255, 255, 255)

cp3 = c_tf1.add_paragraph()
cp3.text = "Supervised by: Prof. Pabitra Kundu (Assistant Professor, Dept. of CSE) | Dayananda Sagar University (2026-2027)"
cp3.font.size = Pt(12)
cp3.font.color.rgb = RGBColor(148, 163, 184)

cp4 = c_tf1.add_paragraph()
cp4.text = "Live Web Application: https://ai-resume-analyzer-t442.vercel.app"
cp4.font.size = Pt(12)
cp4.font.bold = True
cp4.font.color.rgb = RGBColor(56, 189, 248)

# ==========================================
# SLIDE 2: PROBLEM STATEMENT & MOTIVATION
# ==========================================
s2 = prs.slides.add_slide(blank_layout)
add_header(s2, "Problem Definition & Academic Motivation")

# 4 Cards for problems
probs = [
    ("Unstructured Resume Formats", "Undergraduates frequently omit standard sections (Education, Skills, Projects, Experience, Contact) critical for placement screening."),
    ("Opaque Commercial ATS Scanners", "Existing platforms use complex black-box algorithms behind expensive subscriptions, creating frustration and high fees for students."),
    ("Hidden Technical Skill Gaps", "Students struggle to recognize whether their completed coursework and project stacks match specific corporate hiring requirements."),
    ("Lack of Actionable Feedback", "Traditional faculty or peer reviews lack immediate on-demand turnaround, leaving students unprepared for sudden interview calls.")
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
# SLIDE 3: PROPOSED SOLUTION & ARCHITECTURE
# ==========================================
s3 = prs.slides.add_slide(blank_layout)
add_header(s3, "Proposed Solution: AI Resume Analyzer & Job Matcher")

# Left Column: Features
left_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.5), Inches(5.0))
left_box.fill.solid()
left_box.fill.fore_color.rgb = RGBColor(239, 246, 255)
left_box.line.color.rgb = PRIMARY_BLUE

tf_l = left_box.text_frame
tf_l.word_wrap = True
pl0 = tf_l.paragraphs[0]
pl0.text = "🎯 Core Architectural Pillars"
pl0.font.bold = True
pl0.font.size = Pt(16)
pl0.font.color.rgb = PRIMARY_BLUE

sol_points = [
    ("Local PyPDF2 Parsing", "Extracts clean text directly from binary PDF streams without cloud exposure, ensuring 100% data privacy."),
    ("Section Audit Engine", "Evaluates completeness across 5 standard sections: Education, Skills, Projects, Experience, and Contact Info."),
    ("32-Skill Multi-Domain Taxonomy", "Scans technical, analytical, design, marketing, and management skills across engineering disciplines."),
    ("Transparent Math Formula", "Computes exact qualification match: (Matched Skills / Required Skills) * 100 with zero opaque deductions.")
]

for title, desc in sol_points:
    p_t = tf_l.add_paragraph()
    p_t.text = f"• {title}:"
    p_t.font.bold = True
    p_t.font.size = Pt(12)
    p_t.font.color.rgb = DARK_BLUE
    p_d = tf_l.add_paragraph()
    p_d.text = f"  {desc}"
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = TEXT_MUTED

# Right Column: Workflow Diagram Image
s3.shapes.add_picture('resume_analyzer_project/screenshots/fig4_1_workflow.png', Inches(6.6), Inches(2.2), width=Inches(6.0))

# ==========================================
# SLIDE 4: TECHNOLOGY STACK & HIGHLIGHTS
# ==========================================
s4 = prs.slides.add_slide(blank_layout)
add_header(s4, "Technology Stack & System Specifications")

techs = [
    ("Frontend Layer", "HTML5 & CSS3 Variables", "Clean semantic structure, custom CSS3 theme system with Flexbox/Grid responsive layouts."),
    ("Client Interactivity", "Vanilla JavaScript (ES6+)", "Client-side file MIME type checks, strict 5 MB file size caps, and dynamic role filtering."),
    ("Backend Controller", "Python 3 & Flask WSGI", "Lightweight, highly modular micro-framework handling endpoints, sessions, and analytical logic."),
    ("PDF Parsing Engine", "PyPDF2 (v3.0+)", "Pure-Python PDF text extraction directly from in-memory stream buffers without cloud latency."),
    ("Math & Skill Engine", "Set Theory & Regex", "Deterministic pattern matching across 32 domain competencies and formula-based match calculation."),
    ("Deployment & Testing", "Vercel & Pytest", "Automated Pytest unit testing suite and globally distributed Vercel serverless cloud deployment.")
]

for idx, (layer, tech, detail) in enumerate(techs):
    x = Inches(0.8 + (idx % 3) * 3.9)
    y = Inches(1.8 + (idx // 3) * 2.5)
    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.7), Inches(2.2))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = BORDER_COLOR
    
    tf = card.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = layer.upper()
    p1.font.bold = True
    p1.font.size = Pt(10)
    p1.font.color.rgb = PRIMARY_BLUE
    
    p2 = tf.add_paragraph()
    p2.text = tech
    p2.font.bold = True
    p2.font.size = Pt(14)
    p2.font.color.rgb = DARK_BLUE
    
    p3 = tf.add_paragraph()
    p3.text = detail
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 5: 32 MULTI-DOMAIN SKILLS & MATH FORMULA
# ==========================================
s5 = prs.slides.add_slide(blank_layout)
add_header(s5, "32-Skill Detection Engine & Educational Math Formulation")

# Left: 32 Skills Box
sbox = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(6.5), Inches(5.0))
sbox.fill.solid()
sbox.fill.fore_color.rgb = CARD_BG
sbox.line.color.rgb = BORDER_COLOR

s_tf = sbox.text_frame
s_tf.word_wrap = True
sp1 = s_tf.paragraphs[0]
sp1.text = "📋 Predefined Multi-Domain Taxonomy (32 Competencies)"
sp1.font.bold = True
sp1.font.size = Pt(13)
sp1.font.color.rgb = PRIMARY_BLUE

cats = [
    ("Languages", "Python, Java, C, C++, JavaScript"),
    ("Web & Frameworks", "HTML, CSS, React, Flask, Django"),
    ("Data & Databases", "SQL, MySQL, MongoDB, Data Structures, Machine Learning"),
    ("Tools & Analytics", "Git, Excel, Financial Analysis, Accounting, Research"),
    ("Design & Marketing", "UI/UX Design, Graphic Design, SEO, Digital Marketing, Content Writing"),
    ("Management & Soft", "Communication, Problem Solving, Project Management, HR, Sales, Support, Teamwork")
]

for cat_name, skills in cats:
    p = s_tf.add_paragraph()
    p.text = f"• {cat_name}: {skills}"
    p.font.size = Pt(10.5)
    p.font.color.rgb = DARK_BLUE

# Right: Math Formula Card
fbox = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.6), Inches(1.8), Inches(5.0), Inches(5.0))
fbox.fill.solid()
fbox.fill.fore_color.rgb = RGBColor(239, 246, 255)
fbox.line.color.rgb = PRIMARY_BLUE

f_tf = fbox.text_frame
f_tf.word_wrap = True
fp1 = f_tf.paragraphs[0]
fp1.text = "📐 Transparent Mathematical Formulation"
fp1.font.bold = True
fp1.font.size = Pt(14)
fp1.font.color.rgb = PRIMARY_BLUE

fp2 = f_tf.add_paragraph()
fp2.text = "\nMatch Percentage Formula:\nMatch % = ( Matched Skills / Required Skills ) × 100"
fp2.font.bold = True
fp2.font.size = Pt(13)
fp2.font.color.rgb = RGBColor(30, 58, 138)

fp3 = f_tf.add_paragraph()
fp3.text = (
    "\nEducational Value:\n"
    "• Direct visibility into missing required competencies.\n"
    "• Students see immediate quantifiable score jumps by acquiring target tools.\n"
    "• Deterministic reproducibility: zero random or hallucinated grading.\n"
    "• Benchmarked against 17 real-world industry career profiles."
)
fp3.font.size = Pt(11)
fp3.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 6: MODULE 1 - RESUME ANALYZER
# ==========================================
s6 = prs.slides.add_slide(blank_layout)
add_header(s6, "Module 1: Resume Section & Skill Completeness Auditor")

s6.shapes.add_picture('resume_analyzer_project/screenshots/fig_analyzer.png', Inches(0.8), Inches(1.8), width=Inches(7.2))

rbox = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.8), Inches(4.3), Inches(5.0))
rbox.fill.solid()
rbox.fill.fore_color.rgb = CARD_BG
rbox.line.color.rgb = BORDER_COLOR

r_tf = rbox.text_frame
r_tf.word_wrap = True
rp1 = r_tf.paragraphs[0]
rp1.text = "🔍 Key Functional Capabilities"
rp1.font.bold = True
rp1.font.size = Pt(15)
rp1.font.color.rgb = PRIMARY_BLUE

f_points = [
    ("PDF Stream Extraction", "Parses binary documents up to 5 MB using PyPDF2 without writing files to permanent storage."),
    ("Mandatory Section Check", "Evaluates Education, Experience, Projects, Skills, and Contact Info presence."),
    ("Completeness Meter", "Generates educational readiness score indicating placement suitability."),
    ("Detected Skill Badges", "Displays active skill chips for instant candidate self-verification.")
]
for t, d in f_points:
    pt = r_tf.add_paragraph()
    pt.text = f"• {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = DARK_BLUE
    pd = r_tf.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 7: MODULE 2 - JOB MATCHER & ROLE CATALOG
# ==========================================
s7 = prs.slides.add_slide(blank_layout)
add_header(s7, "Module 2: Dynamic Job Matcher & Role Catalog")

s7.shapes.add_picture('resume_analyzer_project/screenshots/fig_matcher.png', Inches(0.8), Inches(1.8), width=Inches(7.2))

mbox = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.8), Inches(4.3), Inches(5.0))
mbox.fill.solid()
mbox.fill.fore_color.rgb = CARD_BG
mbox.line.color.rgb = BORDER_COLOR

m_tf = mbox.text_frame
m_tf.word_wrap = True
mp1 = m_tf.paragraphs[0]
mp1.text = "🎯 Matching & Guidance Features"
mp1.font.bold = True
mp1.font.size = Pt(15)
mp1.font.color.rgb = PRIMARY_BLUE

m_points = [
    ("17 Predefined Industry Roles", "Spans Full-Stack, Python Developer, Data Analyst, UI/UX Designer, Digital Marketer, etc."),
    ("7 Career Domain Filters", "Pill filters for Tech, Analytics, Marketing, Design, HR, Finance, and All Domains."),
    ("Custom Job Description Match", "Paste any corporate job description to extract required skills dynamically."),
    ("Missing Skills Action List", "Highlights missing keywords in red with targeted placement preparation advice.")
]
for t, d in m_points:
    pt = m_tf.add_paragraph()
    pt.text = f"• {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = DARK_BLUE
    pd = m_tf.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 8: EXPERIMENTATION & TEST RESULTS
# ==========================================
s8 = prs.slides.add_slide(blank_layout)
add_header(s8, "Experimental Verification: Test Plan & Results (T1–T10)")

# Table for test cases
rows = 11
cols = 4
top = Inches(1.8)
left = Inches(0.8)
width = Inches(11.7)
height = Inches(4.8)

table_shape = s8.shapes.add_table(rows, cols, left, top, width, height)
tbl = table_shape.table
tbl.columns[0].width = Inches(1.0)
tbl.columns[1].width = Inches(3.6)
tbl.columns[2].width = Inches(5.5)
tbl.columns[3].width = Inches(1.6)

headers = ["Test ID", "Test Scenario / Input", "Observed Behavior & Output", "Verdict"]
for ci, h in enumerate(headers):
    cell = tbl.cell(0, ci)
    cell.fill.solid()
    cell.fill.fore_color.rgb = DARK_BLUE
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = RGBColor(255, 255, 255)

tcases = [
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

for ri, (tid, scn, obs, verd) in enumerate(tcases):
    r_idx = ri + 1
    tbl.cell(r_idx, 0).text = tid
    tbl.cell(r_idx, 1).text = scn
    tbl.cell(r_idx, 2).text = obs
    tbl.cell(r_idx, 3).text = verd
    
    # Format
    for ci in range(4):
        c = tbl.cell(r_idx, ci)
        p = c.text_frame.paragraphs[0]
        p.font.size = Pt(9.5)
        if ci == 3:
            p.font.bold = True
            p.font.color.rgb = ACCENT_GREEN
        elif ci == 0:
            p.font.bold = True

# ==========================================
# SLIDE 9: KEY BENEFITS & COMPARISON
# ==========================================
s9 = prs.slides.add_slide(blank_layout)
add_header(s9, "Academic Merits, Advantages & Future Scope")

# Left Column: Advantages
adv_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
adv_box.fill.solid()
adv_box.fill.fore_color.rgb = RGBColor(240, 253, 244)
adv_box.line.color.rgb = ACCENT_GREEN

atf = adv_box.text_frame
atf.word_wrap = True
ap0 = atf.paragraphs[0]
ap0.text = "⭐ Key Student Benefits & Advantages"
ap0.font.bold = True
ap0.font.size = Pt(14)
ap0.font.color.rgb = ACCENT_GREEN

advs = [
    ("Zero Cost & Zero Paywalls", "100% free for students with no subscription gates or ad trackers."),
    ("100% Privacy & Data Security", "All PDF extraction runs in-memory; zero student resumes stored in databases."),
    ("Sub-500ms Instant Processing", "Lightweight Python Flask and PyPDF2 execution provides instantaneous feedback."),
    ("Demystifies Placement Screening", "Transparent ratio formula allows students to clearly understand their ATS readiness.")
]
for t, d in advs:
    pt = atf.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(11)
    pt.font.color.rgb = DARK_BLUE
    pd = atf.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# Right Column: Future Scope
fut_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
fut_box.fill.solid()
fut_box.fill.fore_color.rgb = RGBColor(239, 246, 255)
fut_box.line.color.rgb = PRIMARY_BLUE

ftf = fut_box.text_frame
ftf.word_wrap = True
fp0 = ftf.paragraphs[0]
fp0.text = "🚀 Future Technical Roadmap"
fp0.font.bold = True
fp0.font.size = Pt(14)
fp0.font.color.rgb = PRIMARY_BLUE

futs = [
    ("Tesseract OCR Integration", "Enable optical character recognition for scanned paper and image-based PDFs."),
    ("Semantic Vector Embeddings", "Incorporate Sentence-BERT for contextual phrase matching beyond exact keywords."),
    ("Automated LaTeX Generator", "One-click export of audited student resumes into university-approved LaTeX code."),
    ("Placement Cell Dashboard", "Institutional analytics for university training & placement officers to track cohort readiness.")
]
for t, d in futs:
    pt = ftf.add_paragraph()
    pt.text = f"• {t}:"
    pt.font.bold = True
    pt.font.size = Pt(11)
    pt.font.color.rgb = DARK_BLUE
    pd = ftf.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 10: DELIVERABLES & CONCLUSION
# ==========================================
s10 = prs.slides.add_slide(blank_layout)
# Dark background for conclusion
bg10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg10.fill.solid()
bg10.fill.fore_color.rgb = DARK_BLUE
bg10.line.color.rgb = DARK_BLUE

cbox = s10.shapes.add_textbox(Inches(1.0), Inches(1.0), Inches(11.333), Inches(5.5))
ctf = cbox.text_frame
ctf.word_wrap = True

cp0 = ctf.paragraphs[0]
cp0.text = "CONCLUSION & PROJECT DELIVERABLES"
cp0.font.size = Pt(16)
cp0.font.bold = True
cp0.font.color.rgb = PRIMARY_BLUE

cp1 = ctf.add_paragraph()
cp1.text = "AI Resume Analyzer & Job Matcher"
cp1.font.size = Pt(36)
cp1.font.bold = True
cp1.font.color.rgb = RGBColor(255, 255, 255)

cp2 = ctf.add_paragraph()
cp2.text = (
    "\n\"By delivering deterministic section completeness audits, a 32-skill detection taxonomy, "
    "and transparent mathematical qualification matching, the platform empowers undergraduate "
    "engineering students to self-audit their resumes and prepare effectively for campus placement drives.\"\n"
)
cp2.font.size = Pt(15)
cp2.font.italic = True
cp2.font.color.rgb = RGBColor(203, 213, 225)

delivs = [
    ("Live Web Application", "https://ai-resume-analyzer-t442.vercel.app (Hosted on Vercel Serverless)"),
    ("Comprehensive Academic Report", "Dayananda Sagar University B.Tech Format (DOCX & PDF with Embedded Diagrams)"),
    ("Technical Presentation Deck", "10 Professional Widescreen Slides Covering Architecture, Math, Testing & Screenshots"),
    ("Source Code & Test Suite", "Modular Python Flask, PyPDF2 Parser, HTML5/CSS3 UI, and Pytest Suite (T1–T10 PASS)")
]

for d_title, d_desc in delivs:
    p = ctf.add_paragraph()
    p.text = f"✔ {d_title}: {d_desc}"
    p.font.size = Pt(13)
    p.font.color.rgb = RGBColor(241, 245, 249)

# Save presentation
out_pptx = 'resume_analyzer_project/AI_Resume_Analyzer_Presentation.pptx'
prs.save(out_pptx)
print('Successfully generated presentation:', out_pptx)
