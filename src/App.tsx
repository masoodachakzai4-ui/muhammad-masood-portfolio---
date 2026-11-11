/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CinematicBackground } from './components/CinematicBackground';
import { IntroSplash } from './components/IntroSplash';
import { Navbar } from './components/Navbar';
import { HomeDashboard, PortfolioPageId } from './components/HomeDashboard';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SystemsArchitectureSection } from './components/SystemsArchitectureSection';
import { SkillsSection } from './components/SkillsSection';
import { GitHubSection } from './components/GitHubSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PERSONAL_INFO } from './data/portfolioData';

const PAGE_SEQUENCE: { id: PortfolioPageId; label: string }[] = [
  { id: 'home', label: '01 · Home Dashboard' },
  { id: 'about', label: '02 · About Me' },
  { id: 'projects', label: '03 · Projects Gallery' },
  { id: 'ai', label: '04 · AI & Agentic Engineering' },
  { id: 'automation', label: '05 · Automation Lab' },
  { id: 'development', label: '06 · Development & Tech' },
  { id: 'education', label: '07 · Education & Experience' },
  { id: 'contact', label: '08 · Direct Contact' },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState<PortfolioPageId>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('masood_portfolio_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [resumeOpen, setResumeOpen] = useState(false);

  // Editable Contact Placeholders
  const [linkedInUrl, setLinkedInUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('masood_linkedin_url');
      if (saved && !saved.includes('[INSERT')) {
        return saved;
      }
      return PERSONAL_INFO.defaultLinkedIn;
    } catch {
      return PERSONAL_INFO.defaultLinkedIn;
    }
  });

  const [whatsAppNumber, setWhatsAppNumber] = useState<string>(() => {
    try {
      return localStorage.getItem('masood_whatsapp_num') || PERSONAL_INFO.defaultWhatsApp;
    } catch {
      return PERSONAL_INFO.defaultWhatsApp;
    }
  });

  const [emailAddress, setEmailAddress] = useState<string>(() => {
    try {
      return localStorage.getItem('masood_email_addr') || PERSONAL_INFO.defaultEmail;
    } catch {
      return PERSONAL_INFO.defaultEmail;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('masood_portfolio_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleNavigate = (page: PortfolioPageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleUpdateContactConfig = (linkedin: string, whatsapp: string, email: string) => {
    setLinkedInUrl(linkedin);
    setWhatsAppNumber(whatsapp);
    setEmailAddress(email);
    try {
      localStorage.setItem('masood_linkedin_url', linkedin);
      localStorage.setItem('masood_whatsapp_num', whatsapp);
      localStorage.setItem('masood_email_addr', email);
    } catch {
      // ignore storage errors
    }
  };

  const currentPageIndex = PAGE_SEQUENCE.findIndex((p) => p.id === activePage);
  const nextPage =
    currentPageIndex >= 0 && currentPageIndex < PAGE_SEQUENCE.length - 1
      ? PAGE_SEQUENCE[currentPageIndex + 1]
      : PAGE_SEQUENCE[0];

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#03050C] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Initial MA Monogram & Electric-Blue Light Sweep Intro */}
      {showSplash && <IntroSplash onComplete={() => setShowSplash(false)} />}

      {/* Living Electric-Blue Energy & Particle Background */}
      <CinematicBackground theme={theme} />

      {/* Floating Rounded Glass Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setResumeOpen(true)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Multi-Page Animated View Container */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subpage Top Return Bar */}
            {activePage !== 'home' && (
              <div className="max-w-[1280px] mx-auto px-6 pt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/85 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/30 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(nextPage.id)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Next: {nextPage.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Page 01: Home Dashboard */}
            {activePage === 'home' && (
              <HomeDashboard
                onNavigate={handleNavigate}
                onOpenResume={() => setResumeOpen(true)}
                linkedInUrl={linkedInUrl}
              />
            )}

            {/* Page 02: About Me */}
            {activePage === 'about' && <AboutSection />}

            {/* Page 03: Projects Gallery */}
            {activePage === 'projects' && <ProjectsSection />}

            {/* Page 04: AI & Agentic Engineering */}
            {activePage === 'ai' && <SystemsArchitectureSection mode="ai" />}

            {/* Page 05: Automation Engineering */}
            {activePage === 'automation' && <SystemsArchitectureSection mode="automation" />}

            {/* Page 06: Development & Technologies */}
            {activePage === 'development' && <SkillsSection />}

            {/* Page 07: Education, Experience & Live GitHub */}
            {activePage === 'education' && (
              <div className="space-y-8">
                <ExperienceEducationSection onOpenResume={() => setResumeOpen(true)} />
                <GitHubSection />
              </div>
            )}

            {/* Page 08: Contact */}
            {activePage === 'contact' && (
              <ContactSection
                linkedInUrl={linkedInUrl}
                whatsAppNumber={whatsAppNumber}
                emailAddress={emailAddress}
                onUpdateContactConfig={handleUpdateContactConfig}
              />
            )}

            {/* Subpage Bottom Chapter Navigation Bar */}
            {activePage !== 'home' && (
              <div className="max-w-[1280px] mx-auto px-6 pb-16 pt-4">
                <div className="p-5 rounded-3xl bg-white/85 dark:bg-[#070B18]/85 backdrop-blur-xl border border-slate-200 dark:border-blue-500/20 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0B1226] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Return to Home Portal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate(nextPage.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-xs font-semibold text-white transition-all cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                  >
                    <span>Continue to {nextPage.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer & Deployment Guide */}
      <div className="relative z-10">
        <Footer onOpenResume={() => setResumeOpen(true)} />
      </div>

      {/* ATS-Friendly Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        emailAddress={emailAddress}
        linkedInUrl={linkedInUrl}
        whatsAppNumber={whatsAppNumber}
      />
    </div>
  );
}
