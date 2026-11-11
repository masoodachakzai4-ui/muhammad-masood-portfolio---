import React from 'react';
import { X, Printer, Download, Mail, MapPin, Github } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailAddress: string;
  linkedInUrl: string;
  whatsAppNumber: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  emailAddress,
  linkedInUrl,
  whatsAppNumber,
}) => {
  if (!isOpen) return null;

  const cleanEmail =
    emailAddress && !emailAddress.includes('[INSERT')
      ? emailAddress
      : PERSONAL_INFO.defaultEmail;

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadMarkdownResume = () => {
    const resumeText = `# ${PERSONAL_INFO.fullName} (${PERSONAL_INFO.professionalName})
${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Email: ${cleanEmail}
GitHub: ${PERSONAL_INFO.githubUrl}
LinkedIn: ${linkedInUrl}
WhatsApp: ${whatsAppNumber}

## PROFESSIONAL SUMMARY
${PERSONAL_INFO.heroIntroduction}

## EDUCATION
- ${PERSONAL_INFO.education} (${PERSONAL_INFO.academicStatus})
  Location: ${PERSONAL_INFO.location}

## TECHNICAL SKILLS
${SKILL_CATEGORIES.map(
  (cat) => `- ${cat.category}: ${cat.skills.map((s) => s.name).join(', ')}`
).join('\n')}

## FEATURED ENGINEERING PROJECTS
${PROJECTS_DATA.map(
  (p) => `### ${p.index}. ${p.title} (${p.stackSummary})
- Overview: ${p.overview}
- Contribution: ${p.myContribution}
- Key Features: ${p.implementedFeatures.join('; ')}`
).join('\n\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Muhammad_Masood_Achakzai_Resume.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0B0C0E] border border-zinc-200 dark:border-zinc-800 shadow-2xl my-auto">
        {/* Top Action Bar (Hidden when printing) */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-zinc-50/95 dark:bg-[#0B0C0E]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-0.5">
            <h2 id="resume-modal-title" className="text-base font-bold text-zinc-950 dark:text-white font-display">
              ATS-Friendly Technical Resume & CV
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Use "Save / Print as PDF" for a formatted ATS document or download the structured Markdown CV.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Save / Print as PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdownResume}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD File</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable ATS Resume Sheet */}
        <div
          id="ats-resume-printable"
          className="p-8 sm:p-12 space-y-8 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-[#0B0C0E]"
        >
          {/* Resume Header */}
          <div className="border-b border-zinc-300 dark:border-zinc-800 pb-6 space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              {PERSONAL_INFO.fullName} ({PERSONAL_INFO.professionalName})
            </h1>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {PERSONAL_INFO.title}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {PERSONAL_INFO.location}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {cleanEmail}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                github.com/masoodachakzai4-ui
              </span>
            </div>
          </div>

          {/* Executive Biography */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Professional Profile
            </h3>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {PERSONAL_INFO.heroIntroduction}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Education
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <p className="text-sm font-bold text-zinc-950 dark:text-white">
                {PERSONAL_INFO.education} — {PERSONAL_INFO.academicStatus}
              </p>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {PERSONAL_INFO.location}
              </p>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Focus Areas: Artificial Intelligence, Software Engineering, Database Systems (MySQL & Firestore), Data Structures & Algorithms (C++), Full-Stack & Mobile Development.
            </p>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Technical Skills & Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((group) => (
                <div key={group.id} className="space-y-0.5">
                  <span className="font-bold text-zinc-900 dark:text-white">{group.category}: </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {group.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Selected Software & AI Engineering Projects
            </h3>
            <div className="space-y-4">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="space-y-1 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="text-sm font-bold text-zinc-950 dark:text-white">
                      {proj.title} — <span className="font-normal text-zinc-600 dark:text-zinc-400">{proj.subtitle}</span>
                    </p>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 shrink-0">
                      {proj.stackSummary}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {proj.myContribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
