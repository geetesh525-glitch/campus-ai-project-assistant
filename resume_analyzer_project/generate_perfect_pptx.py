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

# Professional Palette
NAVY_BG = RGBColor(15, 23, 42)          # #0f172a
SLATE_CARD = RGBColor(30, 41, 59)       # #1e293b
LIGHT_BG = RGBColor(248, 250, 252)      # #f8fafc (Clean light background)
CARD_BG = RGBColor(255, 255, 255)       # Pure white
BORDER_LIGHT = RGBColor(226, 232, 240)  # #e2e8f0
BRAND_BLUE = RGBColor(37, 99, 235)      # #2563eb
CYAN_ACCENT = RGBColor(56, 189, 248)    # #38bdf8
TEXT_DARK = RGBColor(15, 23, 42)        # #0f172a
TEXT_BODY = RGBColor(51, 65, 85)        # #334155
TEXT_MUTED = RGBColor(100, 116, 139)    # #64748b
SUCCESS_GREEN = RGBColor(22, 163, 74)   # #16a34a
SUCCESS_BG = RGBColor(240, 253, 244)    # #f0fdf4
DANGER_RED = RGBColor(220, 38, 38)      # #dc2626
BLUE_CARD_BG = RGBColor(239, 246, 255)  # #eff6ff
WHITE = RGBColor(255, 255, 255)

blank_layout = prs.slide_layouts[6]

def create_header(slide, title, kicker="DAYANANDA SAGAR UNIVERSITY • CSE 3RD SEMESTER • AI RESUME ANALYZER"):
    # Base background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = LIGHT_BG
    bg.line.fill.background()
    
    # Top blue accent strip
    top_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
    top_strip.fill.solid()
    top_strip.fill.fore_color.rgb = BRAND_BLUE
    top_strip.line.fill.background()
    
    # Kicker
    k_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.733), Inches(0.3))
    ktf = k_box.text_frame
    ktf.word_wrap = True
    ktf.vertical_anchor = MSO_ANCHOR.TOP
    ktf.margin_top = ktf.margin_bottom = ktf.margin_left = ktf.margin_right = 0
    pk = ktf.paragraphs[0]
    pk.text = kicker.upper()
    pk.font.size = Pt(10)
    pk.font.bold = True
    pk.font.color.rgb = BRAND_BLUE

    # Slide Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.733), Inches(0.65))
    ttf = t_box.text_frame
    ttf.word_wrap = True
    ttf.vertical_anchor = MSO_ANCHOR.TOP
    ttf.margin_top = ttf.margin_bottom = ttf.margin_left = ttf.margin_right = 0
    pt = ttf.paragraphs[0]
    pt.text = title
    pt.font.size = Pt(22)
    pt.font.bold = True
    pt.font.color.rgb = TEXT_DARK
    return slide

def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=BORDER_LIGHT, border_width=1.0):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()
    tf = shape.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.margin_top = Inches(0.25)
    tf.margin_bottom = Inches(0.2)
    tf.margin_left = Inches(0.25)
    tf.margin_right = Inches(0.25)
    return shape, tf

# ========================================================
# SLIDE 1: HERO TITLE SLIDE (Dark Executive Theme)
# ========================================================
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = NAVY_BG
bg1.line.fill.background()

acc1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.18))
acc1.fill.solid()
acc1.fill.fore_color.rgb = BRAND_BLUE
acc1.line.fill.background()

tbox1 = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(2.6))
tf1 = tbox1.text_frame
tf1.word_wrap = True
tf1.vertical_anchor = MSO_ANCHOR.TOP
tf1.margin_left = tf1.margin_right = tf1.margin_top = tf1.margin_bottom = 0

p1 = tf1.paragraphs[0]
p1.text = "DAYANANDA SAGAR UNIVERSITY • SCHOOL OF ENGINEERING"
p1.font.size = Pt(12)
p1.font.bold = True
p1.font.color.rgb = CYAN_ACCENT

p2 = tf1.add_paragraph()
p2.text = "AI Resume Analyzer & Job Matcher"
p2.font.size = Pt(36)
p2.font.bold = True
p2.font.color.rgb = WHITE
p2.space_before = Pt(6)

p3 = tf1.add_paragraph()
p3.text = "A Multi-Domain Resume Section Auditor, 32-Skill Detection Engine & Dynamic Role Matcher"
p3.font.size = Pt(15)
p3.font.color.rgb = RGBColor(203, 213, 225)
p3.space_before = Pt(8)

# Team Card
card_team, tf_team = add_card(s1, Inches(1.0), Inches(4.0), Inches(5.5), Inches(2.7), bg_color=SLATE_CARD, border_color=RGBColor(51, 65, 85))
p_th = tf_team.paragraphs[0]
p_th.text = "🎓 PROJECT TEAM (3rd Sem B.Tech CSE)"
p_th.font.bold = True
p_th.font.size = Pt(12)
p_th.font.color.rgb = CYAN_ACCENT
p_th.space_after = Pt(10)

team = [
    ("Geetesh Kumar", "ENG25CS0498"),
    ("Bhawesh Kasaudhan", "ENG25CS0448"),
    ("Devi Kedareshwari", "ENG25CS0482")
]
for name, usn in team:
    p = tf_team.add_paragraph()
    p.text = f"• {name}  ({usn})"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.space_after = Pt(4)

# Supervisor Card
card_sup, tf_sup = add_card(s1, Inches(6.8), Inches(4.0), Inches(5.5), Inches(2.7), bg_color=SLATE_CARD, border_color=RGBColor(51, 65, 85))
p_sh = tf_sup.paragraphs[0]
p_sh.text = "👨‍🏫 ACADEMIC GUIDANCE & DEPLOYMENT"
p_sh.font.bold = True
p_sh.font.size = Pt(12)
p_sh.font.color.rgb = CYAN_ACCENT
p_sh.space_after = Pt(8)

p_sn = tf_sup.add_paragraph()
p_sn.text = "Supervised by:"
p_sn.font.size = Pt(11)
p_sn.font.color.rgb = RGBColor(148, 163, 184)

p_prof = tf_sup.add_paragraph()
p_prof.text = "Prof. Pabitra Kundu"
p_prof.font.size = Pt(15)
p_prof.font.bold = True
p_prof.font.color.rgb = WHITE

p_dept = tf_sup.add_paragraph()
p_dept.text = "Assistant Professor, Dept. of CSE (2026-2027)"
p_dept.font.size = Pt(11)
p_dept.font.color.rgb = RGBColor(203, 213, 225)
p_dept.space_after = Pt(10)

p_url = tf_sup.add_paragraph()
p_url.text = "🔗 Live App: https://ai-resume-analyzer-t442.vercel.app"
p_url.font.size = Pt(11.5)
p_url.font.bold = True
p_url.font.color.rgb = CYAN_ACCENT

# ========================================================
# SLIDE 2: PROBLEM DEFINITION & MOTIVATION
# ========================================================
s2 = prs.slides.add_slide(blank_layout)
create_header(s2, "Problem Definition & Educational Motivation")

cards_data = [
    ("Unstructured Resume Formats", "Undergraduate students frequently omit standard technical sections (Education, Skills, Experience, Projects, Contact Info), leading to instant rejection by automated ATS filters.", "⚠️ PLACEMENT SCREENING RISK"),
    ("Opaque Commercial ATS Software", "Commercial resume evaluators hide scoring criteria behind paywalls, subscription models, and complex metrics that confuse entry-level job seekers.", "💰 PAYWALLS & INACCESSIBILITY"),
    ("Unclear Technical Skill Gaps", "Students struggle to recognize whether their completed academic projects and coursework align with specific job descriptions across modern software engineering stacks.", "🔍 UNDETECTED SKILL GAPS"),
    ("Lack of Instant Turnaround", "Traditional manual reviews by faculty or mentors require days to schedule, leaving students without timely feedback before campus recruitment drives.", "⏱ SLOW TURNAROUND TIME")
]

for idx, (head, body, tag) in enumerate(cards_data):
    x = Inches(0.8 + (idx % 2) * 5.95)
    y = Inches(1.6 + (idx // 2) * 2.7)
    card, tf = add_card(s2, x, y, Inches(5.75), Inches(2.45))
    
    p_tag = tf.paragraphs[0]
    p_tag.text = tag
    p_tag.font.size = Pt(10)
    p_tag.font.bold = True
    p_tag.font.color.rgb = DANGER_RED
    p_tag.space_after = Pt(4)
    
    p_h = tf.add_paragraph()
    p_h.text = head
    p_h.font.size = Pt(15)
    p_h.font.bold = True
    p_h.font.color.rgb = TEXT_DARK
    p_h.space_after = Pt(6)
    
    p_b = tf.add_paragraph()
    p_b.text = body
    p_b.font.size = Pt(11)
    p_b.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 3: PROPOSED SOLUTION & WORKFLOW
# ========================================================
s3 = prs.slides.add_slide(blank_layout)
create_header(s3, "Proposed Solution: Lightweight & Privacy-Safe Architecture")

# Left Column (Core Features Card)
c3_left, tf3 = add_card(s3, Inches(0.8), Inches(1.6), Inches(5.5), Inches(5.3))
p_h3 = tf3.paragraphs[0]
p_h3.text = "🎯 Core Architectural Pillars"
p_h3.font.bold = True
p_h3.font.size = Pt(15)
p_h3.font.color.rgb = BRAND_BLUE
p_h3.space_after = Pt(8)

sol_bullets = [
    ("Local PyPDF2 Stream Parsing", "Extracts plain text in-memory from standard PDF documents with zero cloud storage, ensuring complete student data privacy."),
    ("Section Completeness Auditor", "Evaluates structural readiness across 5 vital sections (Education, Skills, Experience, Projects, Contact Info) with a visual progress meter."),
    ("32-Skill Multi-Domain Engine", "Detects technical, analytical, marketing, design, and management proficiencies without requiring manual entry."),
    ("Deterministic Ratio Matching", "Uses exact set-theory formula: (Matched Skills / Required Skills) × 100 with zero black-box deductions.")
]

for title, desc in sol_bullets:
    pt = tf3.add_paragraph()
    pt.text = f"✔ {title}"
    pt.font.bold = True
    pt.font.size = Pt(12)
    pt.font.color.rgb = TEXT_DARK
    pd = tf3.add_paragraph()
    pd.text = desc
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(6)

# Right Column Container (Workflow Diagram Frame)
c3_right, tf3_r = add_card(s3, Inches(6.5), Inches(1.6), Inches(6.033), Inches(5.3))
p_rh = tf3_r.paragraphs[0]
p_rh.text = "🔄 End-to-End Execution Pipeline"
p_rh.font.bold = True
p_rh.font.size = Pt(14)
p_rh.font.color.rgb = BRAND_BLUE
p_rh.space_after = Pt(8)

p_rd = tf3_r.add_paragraph()
p_rd.text = "Client Upload → In-Memory PyPDF2 Extraction → Regex Skill & Section Parsing → Match Calculation → Instant Feedback"
p_rd.font.size = Pt(10.5)
p_rd.font.color.rgb = TEXT_MUTED
p_rd.space_after = Pt(14)

# Embedded Workflow Image inside container
s3.shapes.add_picture('resume_analyzer_project/screenshots/fig4_1_workflow.png', Inches(6.75), Inches(2.95), width=Inches(5.5))

# ========================================================
# SLIDE 4: TECHNOLOGY STACK & SYSTEM SPECIFICATIONS
# ========================================================
s4 = prs.slides.add_slide(blank_layout)
create_header(s4, "Technology Stack & Technical Architecture")

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
    y = Inches(1.6 + (idx // 3) * 2.7)
    card, tf = add_card(s4, x, y, Inches(3.8), Inches(2.45))
    
    p1 = tf.paragraphs[0]
    p1.text = layer.upper()
    p1.font.bold = True
    p1.font.size = Pt(10)
    p1.font.color.rgb = BRAND_BLUE
    p1.space_after = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = tech
    p2.font.bold = True
    p2.font.size = Pt(14)
    p2.font.color.rgb = TEXT_DARK
    p2.space_after = Pt(6)
    
    p3 = tf.add_paragraph()
    p3.text = detail
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = TEXT_MUTED

# ========================================================
# SLIDE 5: 32 MULTI-DOMAIN SKILLS & MATH FORMULA
# ========================================================
s5 = prs.slides.add_slide(blank_layout)
create_header(s5, "32-Skill Detection Engine & Transparent Math Formulation")

# Left Box: 32 Skills Taxonomy (Clean structured card)
c5_left, tf5_l = add_card(s5, Inches(0.8), Inches(1.6), Inches(5.75), Inches(5.3))
p5_lh = tf5_l.paragraphs[0]
p5_lh.text = "📋 32 Predefined Domain Competencies"
p5_lh.font.bold = True
p5_lh.font.size = Pt(14)
p5_lh.font.color.rgb = BRAND_BLUE
p5_lh.space_after = Pt(6)

categories = [
    ("Programming Languages", "Python, Java, C, C++, JavaScript"),
    ("Web & Frameworks", "HTML, CSS, React, Flask, Django"),
    ("Data & Databases", "SQL, MySQL, MongoDB, Data Structures, Machine Learning"),
    ("Tools & Analytics", "Git, Excel, Financial Analysis, Accounting, Research"),
    ("Design & Marketing", "UI/UX Design, Graphic Design, SEO, Digital Marketing, Content Writing"),
    ("Management & Soft", "Communication, Problem Solving, Project Management, HR, Sales, Teamwork")
]

for cname, slist in categories:
    p = tf5_l.add_paragraph()
    p.text = f"• {cname}:"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = TEXT_DARK
    p_desc = tf5_l.add_paragraph()
    p_desc.text = f"  {slist}"
    p_desc.font.size = Pt(10)
    p_desc.font.color.rgb = TEXT_MUTED
    p_desc.space_after = Pt(4)

# Right Box: Math Formula & Educational Impact
c5_right, tf5_r = add_card(s5, Inches(6.75), Inches(1.6), Inches(5.75), Inches(5.3), bg_color=WHITE)
p5_rh = tf5_r.paragraphs[0]
p5_rh.text = "📐 Transparent Mathematical Formulation"
p5_rh.font.bold = True
p5_rh.font.size = Pt(14)
p5_rh.font.color.rgb = BRAND_BLUE
p5_rh.space_after = Pt(10)

# Inner Formula Banner
f_box, tf_fb = add_card(s5, Inches(7.0), Inches(2.25), Inches(5.25), Inches(1.15), bg_color=BLUE_CARD_BG, border_color=BRAND_BLUE, border_width=1.5)
pfb = tf_fb.paragraphs[0]
pfb.text = "Core Matching Formula:"
pfb.font.size = Pt(11)
pfb.font.bold = True
pfb.font.color.rgb = BRAND_BLUE

pfb2 = tf_fb.add_paragraph()
pfb2.text = "Match % = ( Matched Skills / Required Skills ) × 100"
pfb2.font.size = Pt(13)
pfb2.font.bold = True
pfb2.font.color.rgb = RGBColor(30, 58, 138)
pfb2.space_before = Pt(4)

# Below formula: Student Benefits
benefits_box = s5.shapes.add_textbox(Inches(7.0), Inches(3.6), Inches(5.25), Inches(3.1))
btf = benefits_box.text_frame
btf.word_wrap = True
btf.vertical_anchor = MSO_ANCHOR.TOP
btf.margin_top = btf.margin_bottom = btf.margin_left = btf.margin_right = 0

bp0 = btf.paragraphs[0]
bp0.text = "Key Educational & Student Advantages:"
bp0.font.bold = True
bp0.font.size = Pt(12)
bp0.font.color.rgb = TEXT_DARK
bp0.space_after = Pt(6)

bens = [
    ("Direct Skill Gap Visibility", "Students immediately identify what required tools or libraries are missing."),
    ("Quantifiable Score Jumps", "Adding verifiable coursework competencies yields immediate percentage gains."),
    ("Deterministic Reproducibility", "Zero stochastic hallucinations; repeated audits yield identical scores."),
    ("17 Industry Profiles", "Benchmarked against real corporate job requirements across 7 domains.")
]

for b_title, b_desc in bens:
    p = btf.add_paragraph()
    p.text = f"✔ {b_title}: {b_desc}"
    p.font.size = Pt(10.5)
    p.font.color.rgb = TEXT_BODY
    p.space_after = Pt(6)

# ========================================================
# SLIDE 6: MODULE 1 SPOTLIGHT - RESUME ANALYZER
# ========================================================
s6 = prs.slides.add_slide(blank_layout)
create_header(s6, "Module 1 Spotlight: Resume Section & Skill Completeness Auditor")

# Left Column: Browser Mockup Frame
c6_mock, tf6_m = add_card(s6, Inches(0.8), Inches(1.6), Inches(6.8), Inches(5.3))
p_mock = tf6_m.paragraphs[0]
p_mock.text = "🌐 Live UI: https://ai-resume-analyzer-t442.vercel.app/resume"
p_mock.font.size = Pt(10)
p_mock.font.bold = True
p_mock.font.color.rgb = BRAND_BLUE
p_mock.space_after = Pt(6)

# Add Screenshot inside frame
s6.shapes.add_picture('resume_analyzer_project/screenshots/fig_analyzer.png', Inches(1.0), Inches(2.15), width=Inches(6.4))

# Right Column: Highlights Card
c6_right, tf6_r = add_card(s6, Inches(7.8), Inches(1.6), Inches(4.733), Inches(5.3))
p6_rh = tf6_r.paragraphs[0]
p6_rh.text = "🔍 Resume Audit Highlights"
p6_rh.font.bold = True
p6_rh.font.size = Pt(14)
p6_rh.font.color.rgb = BRAND_BLUE
p6_rh.space_after = Pt(10)

r_bullets = [
    ("Local PDF Stream Parser", "Processes PDF files up to 5 MB using PyPDF2 without writing files to disk, guaranteeing 100% data privacy."),
    ("5-Section Structure Check", "Audits presence of Education, Skills, Experience, Projects, and Contact details."),
    ("Completeness Score Meter", "Computes an overall educational score showing student readiness for campus drives."),
    ("Extracted Skill Badges", "Displays detected skills as clear badge chips for instant candidate verification.")
]

for t, d in r_bullets:
    pt = tf6_r.add_paragraph()
    pt.text = f"✔ {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_DARK
    pd = tf6_r.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(8)

# ========================================================
# SLIDE 7: MODULE 2 SPOTLIGHT - JOB MATCHER
# ========================================================
s7 = prs.slides.add_slide(blank_layout)
create_header(s7, "Module 2 Spotlight: Dynamic Job Matcher & Role Catalog")

# Left Column: Browser Mockup Frame
c7_mock, tf7_m = add_card(s7, Inches(0.8), Inches(1.6), Inches(6.8), Inches(5.3))
p_m7 = tf7_m.paragraphs[0]
p_m7.text = "🌐 Live UI: https://ai-resume-analyzer-t442.vercel.app/jobs"
p_m7.font.size = Pt(10)
p_m7.font.bold = True
p_m7.font.color.rgb = BRAND_BLUE
p_m7.space_after = Pt(6)

# Add Screenshot inside frame
s7.shapes.add_picture('resume_analyzer_project/screenshots/fig_matcher.png', Inches(1.0), Inches(2.15), width=Inches(6.4))

# Right Column: Features Card
c7_right, tf7_r = add_card(s7, Inches(7.8), Inches(1.6), Inches(4.733), Inches(5.3))
p7_rh = tf7_r.paragraphs[0]
p7_rh.text = "🎯 Matching & Guidance Features"
p7_rh.font.bold = True
p7_rh.font.size = Pt(14)
p7_rh.font.color.rgb = BRAND_BLUE
p7_rh.space_after = Pt(10)

m_bullets = [
    ("17 Industry Role Profiles", "Spans Full-Stack, Python Developer, Data Analyst, UI/UX Designer, Digital Marketer, etc."),
    ("7 Domain Filter Pills", "Instant filtering across Tech, Analytics, Marketing, Design, HR, Finance, and All Domains."),
    ("Custom Job Description Match", "Allows students to paste any target company job posting to test qualification match."),
    ("Targeted Learning Advice", "Displays missing competencies in red with actionable guidance on what to learn next.")
]

for t, d in m_bullets:
    pt = tf7_r.add_paragraph()
    pt.text = f"✔ {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_DARK
    pd = tf7_r.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(8)

# ========================================================
# SLIDE 8: EXPERIMENTAL VERIFICATION & TEST PLAN (T1–T10)
# ========================================================
s8 = prs.slides.add_slide(blank_layout)
create_header(s8, "Experimental Verification: Test Plan & Matrix (T1–T10)")

# 4 Stat KPI Callout Cards across the top
kpis = [
    ("10 / 10 (100%)", "TEST PASS RATE", SUCCESS_GREEN, SUCCESS_BG),
    ("< 350 ms", "AVERAGE PARSE LATENCY", BRAND_BLUE, BLUE_CARD_BG),
    ("0 MB DISK", "ZERO FILE RETENTION", BRAND_BLUE, BLUE_CARD_BG),
    ("100% PRIVATE", "IN-MEMORY RUNTIME", SUCCESS_GREEN, SUCCESS_BG)
]

for i, (val, lbl, color, bg_col) in enumerate(kpis):
    x = Inches(0.8 + i * 2.98)
    card_kpi, tf_kpi = add_card(s8, x, Inches(1.5), Inches(2.8), Inches(0.95), bg_color=bg_col, border_color=color)
    p_val = tf_kpi.paragraphs[0]
    p_val.text = val
    p_val.font.size = Pt(16)
    p_val.font.bold = True
    p_val.font.color.rgb = color
    p_lbl = tf_kpi.add_paragraph()
    p_lbl.text = lbl
    p_lbl.font.size = Pt(9)
    p_lbl.font.bold = True
    p_lbl.font.color.rgb = TEXT_DARK

# Left Table Card: Functional Tests (T1 - T5)
c8_left, tf8_l = add_card(s8, Inches(0.8), Inches(2.6), Inches(5.75), Inches(4.3))
p8_lh = tf8_l.paragraphs[0]
p8_lh.text = "🧪 Functional & Parsing Test Matrix (T1–T5)"
p8_lh.font.bold = True
p8_lh.font.size = Pt(13)
p8_lh.font.color.rgb = BRAND_BLUE
p8_lh.space_after = Pt(6)

t_left = [
    ("T1: Valid PDF Upload (< 5 MB)", "PyPDF2 extracted clean text; complete skills & score rendered", "PASS 100%"),
    ("T2: Non-PDF Upload Block (.docx)", "Client-side MIME validation safely blocked file with alert", "PASS 100%"),
    ("T3: Oversized PDF File (> 5 MB)", "Strict 5 MB size cap enforced before upload; bandwidth saved", "PASS 100%"),
    ("T4: Scanned / Image-Only PDF", "Safely caught without server error; prompted selectable text", "PASS 100%"),
    ("T5: Missing Mandatory Sections", "Section penalty deducted accurately; completeness meter updated", "PASS 100%")
]

for t_name, t_obs, t_ver in t_left:
    p = tf8_l.add_paragraph()
    p.text = f"✔ {t_name} — {t_ver}"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = TEXT_DARK
    pd = tf8_l.add_paragraph()
    pd.text = f"   Result: {t_obs}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(4)

# Right Table Card: Matching & Edge Case Tests (T6 - T10)
c8_right, tf8_r = add_card(s8, Inches(6.75), Inches(2.6), Inches(5.75), Inches(4.3))
p8_rh = tf8_r.paragraphs[0]
p8_rh.text = "⚙ Matching Engine & Robustness Tests (T6–T10)"
p8_rh.font.bold = True
p8_rh.font.size = Pt(13)
p8_rh.font.color.rgb = BRAND_BLUE
p8_rh.space_after = Pt(6)

t_right = [
    ("T6: 32-Skill Regex Detection", "Detected Python, SQL, Git & rendered as green skill badges", "PASS 100%"),
    ("T7: Catalog Role Matching", "Exact formula: (Matched Skills / Required Skills) * 100", "PASS 100%"),
    ("T8: Custom Job Description", "Extracted skills from custom pasted text; computed live fit", "PASS 100%"),
    ("T9: Dynamic Domain Filters", "DOM dynamically updated role cards without page refresh", "PASS 100%"),
    ("T10: Offline Fallback Execution", "All parsing, section audits & job matching ran locally without API", "PASS 100%")
]

for t_name, t_obs, t_ver in t_right:
    p = tf8_r.add_paragraph()
    p.text = f"✔ {t_name} — {t_ver}"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = TEXT_DARK
    pd = tf8_r.add_paragraph()
    pd.text = f"   Result: {t_obs}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(4)

# ========================================================
# SLIDE 9: ACADEMIC MERITS & FUTURE ROADMAP
# ========================================================
s9 = prs.slides.add_slide(blank_layout)
create_header(s9, "Academic Merits, Comparative Advantages & Future Roadmap")

# Left Card: Academic & Student Merits
c9_left, tf9_l = add_card(s9, Inches(0.8), Inches(1.6), Inches(5.75), Inches(5.3), bg_color=CARD_BG, border_color=SUCCESS_GREEN, border_width=1.5)
p9_lh = tf9_l.paragraphs[0]
p9_lh.text = "⭐ Key Student Benefits & Advantages"
p9_lh.font.bold = True
p9_lh.font.size = Pt(14)
p9_lh.font.color.rgb = SUCCESS_GREEN
p9_lh.space_after = Pt(10)

merits = [
    ("Zero Cost & Zero Paywalls", "100% free for students with no subscription gates, ad interruptions, or hidden charges."),
    ("100% Privacy & Data Security", "All PDF extraction runs strictly in-memory; zero student resumes stored in external databases."),
    ("Sub-350ms Instant Turnaround", "Lightweight Python Flask and PyPDF2 execution provides instantaneous real-time feedback."),
    ("Demystifies Campus Placement Screening", "Transparent ratio formula allows students to clearly understand their ATS readiness and fix omissions.")
]

for t, d in merits:
    pt = tf9_l.add_paragraph()
    pt.text = f"✔ {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_DARK
    pd = tf9_l.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(8)

# Right Card: Future Roadmap
c9_right, tf9_r = add_card(s9, Inches(6.75), Inches(1.6), Inches(5.75), Inches(5.3), bg_color=CARD_BG, border_color=BRAND_BLUE, border_width=1.5)
p9_rh = tf9_r.paragraphs[0]
p9_rh.text = "🚀 Future Technical Roadmap"
p9_rh.font.bold = True
p9_rh.font.size = Pt(14)
p9_rh.font.color.rgb = BRAND_BLUE
p9_rh.space_after = Pt(10)

futs = [
    ("Tesseract OCR Integration", "Enable optical character recognition for scanned paper and image-based PDF resumes."),
    ("Semantic Vector Embeddings", "Incorporate Sentence-BERT for contextual phrase matching beyond exact keyword detection."),
    ("Automated LaTeX Generator", "One-click export of audited student resumes into university-approved LaTeX code."),
    ("Placement Cell Dashboard", "Institutional analytics for university training & placement officers to track cohort readiness.")
]

for t, d in futs:
    pt = tf9_r.add_paragraph()
    pt.text = f"✔ {t}"
    pt.font.bold = True
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_DARK
    pd = tf9_r.add_paragraph()
    pd.text = d
    pd.font.size = Pt(10.5)
    pd.font.color.rgb = TEXT_MUTED
    pd.space_after = Pt(8)

# ========================================================
# SLIDE 10: DELIVERABLES & CONCLUSION
# ========================================================
s10 = prs.slides.add_slide(blank_layout)
create_header(s10, "Project Deliverables & Academic Conclusion")

# Top Summary Quote Banner
c10_top, tf10_t = add_card(s10, Inches(0.8), Inches(1.5), Inches(11.733), Inches(1.15), bg_color=BLUE_CARD_BG, border_color=BRAND_BLUE, border_width=1.5)
p10_qh = tf10_t.paragraphs[0]
p10_qh.text = "🎯 Academic Vision & Impact"
p10_qh.font.size = Pt(11)
p10_qh.font.bold = True
p10_qh.font.color.rgb = BRAND_BLUE

p10_qt = tf10_t.add_paragraph()
p10_qt.text = "\"By delivering deterministic section completeness audits, a 32-skill detection taxonomy, and transparent mathematical qualification matching, the platform empowers undergraduate students to self-audit their resumes and prepare effectively for campus placement drives.\""
p10_qt.font.size = Pt(11.5)
p10_qt.font.italic = True
p10_qt.font.color.rgb = RGBColor(30, 58, 138)
p10_qt.space_before = Pt(3)

# 4 Deliverables Cards (2 x 2 grid)
deliv_cards = [
    ("🌐 Live Web Application", "Hosted on Vercel Serverless Edge Runtime with 99.9% uptime and zero server maintenance overhead.", "https://ai-resume-analyzer-t442.vercel.app"),
    ("📄 Academic Project Report", "Comprehensive 26-page report strictly formatted to Dayananda Sagar University B.Tech CSE standards (DOCX & PDF).", "Complete with TOC, LOF, and 8 System Figures"),
    ("📊 Executive Presentation Deck", "10-slide widescreen presentation deck detailing problem analysis, system architecture, math, tests, and live screenshots.", "Aligned layout, executive palette & clean cards"),
    ("💻 Source Code & Test Suite", "Modular Python Flask backend, PyPDF2 stream parser, responsive HTML5/CSS3 frontend, and automated Pytest suite (T1–T10).", "100% Pass Rate across all verification scenarios")
]

for idx, (title, desc, meta) in enumerate(deliv_cards):
    x = Inches(0.8 + (idx % 2) * 5.95)
    y = Inches(2.8 + (idx // 2) * 2.0)
    card, tf = add_card(s10, x, y, Inches(5.75), Inches(1.85))
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.bold = True
    p_t.font.size = Pt(13)
    p_t.font.color.rgb = BRAND_BLUE
    p_t.space_after = Pt(4)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_BODY
    p_d.space_after = Pt(4)
    
    p_m = tf.add_paragraph()
    p_m.text = f"• {meta}"
    p_m.font.size = Pt(9.5)
    p_m.font.bold = True
    p_m.font.color.rgb = TEXT_MUTED

# Bottom University Footer Strip
f_box = s10.shapes.add_textbox(Inches(0.8), Inches(6.9), Inches(11.733), Inches(0.4))
ftf = f_box.text_frame
ftf.word_wrap = True
ftf.vertical_anchor = MSO_ANCHOR.TOP
ftf.margin_top = ftf.margin_bottom = ftf.margin_left = ftf.margin_right = 0
pf = ftf.paragraphs[0]
pf.text = "Dayananda Sagar University • School of Engineering • Department of Computer Science & Engineering (2026-2027)"
pf.font.size = Pt(10)
pf.font.bold = True
pf.font.color.rgb = TEXT_MUTED
pf.alignment = PP_ALIGN.CENTER

out_pptx = 'resume_analyzer_project/AI_Resume_Analyzer_Presentation.pptx'
prs.save(out_pptx)
print('Successfully generated perfect presentation:', out_pptx)
