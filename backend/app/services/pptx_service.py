from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from app.core.config import settings

class PptxService:
    @staticmethod
    def generate_presentation(
        filename: str,
        topic: str,
        audience: str,
        slides_data: list
    ) -> str:
        """Generates a clean academic PowerPoint deck with titles, bullet points, and speaker notes."""
        prs = Presentation()
        # Set 16:9 widescreen layout (13.33 x 7.5 inches)
        prs.slide_width = Inches(13.33)
        prs.slide_height = Inches(7.5)

        # Blank slide layout
        blank_slide_layout = prs.slide_layouts[6]

        # Colors
        COLOR_PRIMARY = RGBColor(0x31, 0x5B, 0x85) # #315B85
        COLOR_TEXT_MAIN = RGBColor(0x20, 0x29, 0x38) # #202938
        COLOR_TEXT_MUTED = RGBColor(0x68, 0x73, 0x86) # #687386
        COLOR_BG_CARD = RGBColor(0xF7, 0xF8, 0xFA) # #F7F8FA

        # Slide 1: Title Slide
        slide_1 = prs.slides.add_slide(blank_slide_layout)
        
        # Title text box
        title_box = slide_1.shapes.add_textbox(Inches(1.5), Inches(2.2), Inches(10.33), Inches(2.0))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = topic
        p.alignment = PP_ALIGN.LEFT
        p.font.name = "Arial"
        p.font.size = Pt(40)
        p.font.bold = True
        p.font.color.rgb = COLOR_PRIMARY

        sub_p = tf.add_paragraph()
        sub_p.text = f"Academic Presentation • Target Audience: {audience}\nGenerated via Campus AI Multi-Agent Workspace"
        sub_p.alignment = PP_ALIGN.LEFT
        sub_p.font.name = "Arial"
        sub_p.font.size = Pt(16)
        sub_p.font.color.rgb = COLOR_TEXT_MUTED
        sub_p.space_before = Pt(14)

        # Content Slides
        for slide_item in slides_data:
            slide = prs.slides.add_slide(blank_slide_layout)
            
            # Slide Header (Title & Slide Number)
            header_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.8), Inches(11.33), Inches(1.2))
            htf = header_box.text_frame
            htf.word_wrap = True
            
            hp = htf.paragraphs[0]
            hp.text = slide_item.get("title", f"Slide {slide_item.get('slideNumber', '')}")
            hp.font.name = "Arial"
            hp.font.size = Pt(26)
            hp.font.bold = True
            hp.font.color.rgb = COLOR_PRIMARY

            num_p = htf.add_paragraph()
            num_p.text = f"Section Slide #{slide_item.get('slideNumber', 1)}"
            num_p.font.name = "Arial"
            num_p.font.size = Pt(11)
            num_p.font.color.rgb = COLOR_TEXT_MUTED

            # Content Bullet Points
            content_box = slide.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.33), Inches(4.5))
            ctf = content_box.text_frame
            ctf.word_wrap = True

            bullets = slide_item.get("bulletPoints", [])
            for i, bp in enumerate(bullets):
                p = ctf.paragraphs[0] if i == 0 else ctf.add_paragraph()
                p.text = f"•   {bp.strip()}"
                p.font.name = "Arial"
                p.font.size = Pt(18)
                p.font.color.rgb = COLOR_TEXT_MAIN
                p.space_before = Pt(12)
                p.space_after = Pt(8)

            # Speaker Notes
            notes = slide_item.get("speakerNotes", "")
            if notes and slide.notes_slide:
                notes_tf = slide.notes_slide.notes_text_frame
                notes_tf.text = f"Speaker Notes:\n{notes}"

        # Save presentation
        output_path = Path(settings.STORAGE_PATH) / filename
        prs.save(str(output_path))
        return str(output_path)

pptx_service = PptxService()
