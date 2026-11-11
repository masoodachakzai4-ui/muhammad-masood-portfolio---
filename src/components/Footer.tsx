import React, { useState } from 'react';
import { ArrowUp, Terminal, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/80 dark:bg-[#03050C]/90 backdrop-blur-xl text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-blue-500/15">
      <div className="max-w-[1280px] mx-auto px-6 py-12 space-y-8">
        {/* Deployment & Local Run Guide Accordion */}
        <div className="rounded-3xl bg-white/90 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/20 p-5">
          <button
            type="button"
            onClick={() => setShowDeployGuide((prev) => !prev)}
            className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
              <div>
                <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                  PORTFOLIO DOCUMENTATION & DEPLOYMENT GUIDE
                </p>
                <p className="text-sm font-bold text-slate-950 dark:text-white font-display">
                  How to Run Locally, Push to GitHub & Deploy to Vercel / Custom Domain
                </p>
              </div>
            </div>
            {showDeployGuide ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showDeployGuide && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2">
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  01. RUN LOCALLY
                </p>
                <pre className="p-3 rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-200 dark:border-blue-500/20 font-mono text-[11px] overflow-x-auto text-slate-800 dark:text-slate-200">
{`npm install
npm run dev
# Opens on http://localhost:3000`}
                </pre>
              </div>

              <div className="space-y-2">
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  02. UPLOAD TO GITHUB
                </p>
                <pre className="p-3 rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-200 dark:border-blue-500/20 font-mono text-[11px] overflow-x-auto text-slate-800 dark:text-slate-200">
{`git init
git add .
git commit -m "feat: portfolio launch"
git branch -M main
git remote add origin https://github.com/masoodachakzai4-ui/portfolio.git
git push -u origin main`}
                </pre>
              </div>

              <div className="space-y-2">
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  03. DEPLOY ON VERCEL
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Import your GitHub repository on <strong>vercel.com/new</strong>. Framework preset: <strong>Vite</strong>, Build command: <code className="font-mono">npm run build</code>, Output directory: <code className="font-mono">dist</code>. Click Deploy for an instant HTTPS production URL.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-slate-200/80 dark:border-blue-500/15 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {PERSONAL_INFO.fullName} ({PERSONAL_INFO.professionalName})
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              {PERSONAL_INFO.title} · {PERSONAL_INFO.fullLocation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ATS Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              GitHub
            </a>

            <a
              href={PERSONAL_INFO.defaultLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              LinkedIn
            </a>

            <a
              href={PERSONAL_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              Instagram
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
