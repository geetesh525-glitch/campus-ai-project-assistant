import React from 'react';
import {
  GraduationCap,
  FileText,
  Search,
  BookOpen,
  Presentation,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  Download
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreFeature: (featureId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onExploreFeature }) => {
  const features = [
    {
      id: 'pdf-analyzer',
      title: 'PDF Analyzer',
      description: 'Upload course material, extract key topics, generate chapter summaries, and query texts with exact page citations using RAG.',
      icon: FileText
    },
    {
      id: 'research',
      title: 'Research Assistant',
      description: 'Synthesize research topics with clear problem statements, structured methodologies, and literature reviews without fabricated references.',
      icon: Search
    },
    {
      id: 'assignments',
      title: 'Assignment Generator',
      description: 'Prepare well-structured academic answers formatted with rigorous explanations, and export directly as editable Word documents (.docx).',
      icon: BookOpen
    },
    {
      id: 'presentations',
      title: 'Presentation Generator',
      description: 'Convert academic notes into professional university slide decks with concise bullet points and complete speaker notes in PowerPoint (.pptx).',
      icon: Presentation
    },
    {
      id: 'viva',
      title: 'Viva Preparation',
      description: 'Practice with tiered oral exam questions (Easy, Medium, Hard) and test your spoken answers against an automated academic examiner.',
      icon: Award
    },
    {
      id: 'study-planner',
      title: 'Study Planner',
      description: 'Track course assignments, set study deadlines, and organize your daily schedule with clear priorities and completion checklists.',
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#202938] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5E9EF]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-[#315B85] flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-semibold text-base text-[#202938]">Campus AI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-[#687386]">
            <a href="#hero" className="hover:text-[#202938] transition-colors">Home</a>
            <a href="#features" className="hover:text-[#202938] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#202938] transition-colors">How It Works</a>
            <a href="#about" className="hover:text-[#202938] transition-colors">About</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={onGetStarted}
              className="text-xs font-medium text-[#687386] hover:text-[#202938] px-3 py-1.5"
            >
              Login
            </button>
            <button
              onClick={onGetStarted}
              className="academic-btn-primary text-xs flex items-center space-x-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAF1F8] border border-[#CBD5E1] text-[#315B85] text-xs font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Built for University Students & Researchers</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#202938] mb-5 leading-tight">
            Your Academic Work, Made Easier.
          </h1>

          <p className="text-base md:text-lg text-[#687386] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            One workspace for assignments, research, presentations, and exam preparation.
            Let intelligent AI agents help you organize and complete your academic work.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-14">
            <button
              onClick={onGetStarted}
              className="academic-btn-primary px-5 py-2.5 text-sm flex items-center space-x-2 shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#features"
              className="academic-btn-secondary px-5 py-2.5 text-sm"
            >
              Explore Features
            </a>
          </div>

          {/* Screenshot-Style Dashboard Preview */}
          <div className="academic-card p-4 rounded-lg border border-[#E5E9EF] shadow-sm max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF] text-xs text-[#687386]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E9EF]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E9EF]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E9EF]"></span>
                <span className="font-medium text-[#202938] ml-2">Campus AI Student Workspace</span>
              </div>
              <span className="bg-[#EAF1F8] text-[#315B85] px-2 py-0.5 rounded text-[11px] font-medium">5 Specialized Agents Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF]">
                <div className="font-semibold text-[#202938] mb-1">1. Planning Agent</div>
                <div className="text-[#687386] text-[11px]">Deconstructs requirements & coordinates execution pipeline.</div>
              </div>
              <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF]">
                <div className="font-semibold text-[#202938] mb-1">2. Research Agent</div>
                <div className="text-[#687386] text-[11px]">Extracts citations & verified page numbers from PDF.</div>
              </div>
              <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF]">
                <div className="font-semibold text-[#202938] mb-1">3. Content Writer</div>
                <div className="text-[#687386] text-[11px]">Drafts assignment solutions and slide deck outlines.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-16 px-6 bg-white border-t border-b border-[#E5E9EF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-[#202938] mb-2">
              Comprehensive Academic Toolset
            </h2>
            <p className="text-sm text-[#687386]">
              Purpose-built tools designed to support your coursework from initial syllabus reading through oral defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  onClick={() => onExploreFeature(f.id)}
                  className="academic-card p-5 academic-card-hover cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded bg-[#EAF1F8] text-[#315B85] flex items-center justify-center mb-3.5 group-hover:bg-[#315B85] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#202938] mb-1.5">{f.title}</h3>
                    <p className="text-xs text-[#687386] leading-relaxed mb-4">{f.description}</p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-[#315B85] group-hover:translate-x-0.5 transition-transform">
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-[#202938] mb-2">How It Works</h2>
            <p className="text-sm text-[#687386]">
              A structured four-step pipeline that guarantees grounded results and academic integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="academic-card p-4">
              <div className="w-7 h-7 rounded bg-[#315B85] text-white flex items-center justify-center text-xs font-semibold mb-3">1</div>
              <h4 className="text-xs font-semibold text-[#202938] mb-1">Upload Material</h4>
              <p className="text-xs text-[#687386]">Upload lecture slides, textbooks, or research papers in PDF format.</p>
            </div>

            <div className="academic-card p-4">
              <div className="w-7 h-7 rounded bg-[#315B85] text-white flex items-center justify-center text-xs font-semibold mb-3">2</div>
              <h4 className="text-xs font-semibold text-[#202938] mb-1">Describe Your Task</h4>
              <p className="text-xs text-[#687386]">Submit your requirements, formatting preferences, or assignment rubric.</p>
            </div>

            <div className="academic-card p-4">
              <div className="w-7 h-7 rounded bg-[#315B85] text-white flex items-center justify-center text-xs font-semibold mb-3">3</div>
              <h4 className="text-xs font-semibold text-[#202938] mb-1">Agents Collaborate</h4>
              <p className="text-xs text-[#687386]">Specialized agents plan, extract verified facts, write, and quality-check.</p>
            </div>

            <div className="academic-card p-4">
              <div className="w-7 h-7 rounded bg-[#315B85] text-white flex items-center justify-center text-xs font-semibold mb-3">4</div>
              <h4 className="text-xs font-semibold text-[#202938] mb-1">Review & Download</h4>
              <p className="text-xs text-[#687386]">Inspect transparent source citations and download real .docx and .pptx files.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 px-6 bg-white border-t border-[#E5E9EF]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-[#202938] mb-3">Academic Rigor & Privacy by Design</h3>
          <p className="text-xs text-[#687386] leading-relaxed mb-6">
            Campus AI is engineered specifically for higher education. All document indexing is performed with exact page-level citations, eliminating hallucinated references. Students maintain complete control over their saved research materials with instant memory deletion options.
          </p>
          <button
            onClick={onGetStarted}
            className="academic-btn-primary text-xs inline-flex items-center space-x-1.5"
          >
            <span>Launch Student Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E9EF] py-8 px-6 text-xs text-[#687386] mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-[#315B85]" />
            <span className="font-semibold text-[#202938]">Campus AI</span>
            <span>— Intelligent Academic Assistant</span>
          </div>
          <div>
            Built with React, TypeScript, FastAPI, PyMuPDF, and CrewAI Multi-Agent Architecture.
          </div>
        </div>
      </footer>
    </div>
  );
};
