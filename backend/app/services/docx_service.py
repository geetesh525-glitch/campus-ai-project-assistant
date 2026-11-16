import os
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from app.core.config import settings

class DocxService:
    @staticmethod
    def generate_assignment_document(
        filename: str,
        subject: str,
        topic: str,
        student_name: str,
        sections: list,
        explanation_style: str = "Detailed"
    ) -> str:
        """Generates a professional academic Word assignment document (.docx)."""
        doc = Document()

        # Page margins (1 inch)
        for section in doc.sections:
            section.top_margin = Inches(1.0)
            section.bottom_margin = Inches(1.0)
            section.left_margin = Inches(1.0)
            section.right_margin = Inches(1.0)

        # University Assignment Header
        title_p = doc.add_paragraph()
        title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run_title = title_p.add_run(topic.upper())
        run_title.font.name = "Arial"
        run_title.font.size = Pt(18)
        run_title.font.bold = True
        run_title.font.color.rgb = RGBColor(0x31, 0x5B, 0x85) # Academic primary blue

        meta_p = doc.add_paragraph()
        meta_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run_sub = meta_p.add_run(f"Subject: {subject} | Student: {student_name}\nCampus AI Academic Workspace\n")
        run_sub.font.name = "Arial"
        run_sub.font.size = Pt(10)
        run_sub.font.color.rgb = RGBColor(0x68, 0x73, 0x86)

        doc.add_paragraph().paragraph_format.space_after = Pt(12)

        # Sections
        for sec in sections:
            sec_title = sec.get("title", "Section")
            sec_content = sec.get("content", "")

            # Heading 1
            h = doc.add_heading(sec_title, level=1)
            h.paragraph_format.space_before = Pt(14)
            h.paragraph_format.space_after = Pt(6)
            for r in h.runs:
                r.font.name = "Arial"
                r.font.size = Pt(14)
                r.font.bold = True
                r.font.color.rgb = RGBColor(0x20, 0x29, 0x38)

            # Body Paragraphs
            paragraphs = sec_content.split("\n\n")
            for para_text in paragraphs:
                cleaned = para_text.strip()
                if not cleaned:
                    continue

                if cleaned.startswith("- ") or cleaned.startswith("* "):
                    p = doc.add_paragraph(style='List Bullet')
                    run = p.add_run(cleaned.lstrip("- *"))
                else:
                    p = doc.add_paragraph()
                    run = p.add_run(cleaned)

                run.font.name = "Arial"
                run.font.size = Pt(11)
                p.paragraph_format.line_spacing = 1.15
                p.paragraph_format.space_after = Pt(6)

        # Output filepath
        output_path = Path(settings.STORAGE_PATH) / filename
        doc.save(str(output_path))
        return str(output_path)

docx_service = DocxService()
