import React, { useState } from 'react';
import { GraduationCap, Award, SlidersHorizontal, FileText, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { InteractiveTiltCard, PageHeroShowcaseFrame } from './InteractiveTiltCard';

interface ExperienceEducationSectionProps {
  onOpenResume: () => void;
}

export const ExperienceEducationSection: React.FC<ExperienceEducationSectionProps> = ({
  onOpenResume,
}) => {
  const [universityName, setUniversityName] = useState<string>(() => {
    try {
      return localStorage.getItem('masood_university_name') || '[INSERT UNIVERSITY NAME, QUETTA]';
    } catch {
      return '[INSERT UNIVERSITY NAME, QUETTA]';
    }
  });
  const [expectedGrad, setExpectedGrad] = useState<string>(() => {
    try {
      return localStorage.getItem('masood_grad_year') || '[INSERT EXPECTED GRADUATION YEAR, e.g., 2027]';
    } catch {
      return '[INSERT EXPECTED GRADUATION YEAR, e.g., 2027]';
    }
  });
  const [certificationNote, setCertificationNote] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('masood_cert_note') ||
        '[INSERT VERIFIED CERTIFICATIONS OR COURSES — e.g., Python, AI Engineering, Flutter, Database Design]'
      );
    } catch {
      return '[INSERT VERIFIED CERTIFICATIONS OR COURSES]';
    }
  });
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const handleSaveAcademic = (u: string, g: string, c: string) => {
    setUniversityName(u);
    setExpectedGrad(g);
    setCertificationNote(c);
    try {
      localStorage.setItem('masood_university_name', u);
      localStorage.setItem('masood_grad_year', g);
      localStorage.setItem('masood_cert_note', c);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Top Hero Moment: Matches Home Page Layout with Sculpted Orbital Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                PAGE 07 · EDUCATION & EXPERIENCE
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                style={{ textWrap: 'balance' }}
              >
                Academic Standing &{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Applied Project Engineering.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Verified undergraduate standing in Computer Science alongside independent research and software engineering across AI, automation, and cross-platform mobile systems.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                <FileText className="w-4 h-4" />
                <span>Open ATS Resume / CV</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditingDetails((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/85 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/30 rounded-2xl hover:border-blue-500 transition-colors cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>{isEditingDetails ? 'Done Customizing' : 'Customize Placeholders'}</span>
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-5">
            <PageHeroShowcaseFrame
              badge="ACADEMIC STANDING"
              title="BS Computer Science"
              subtitle="6th Semester Undergraduate · Quetta, Balochistan, Pakistan"
              statusLeft="Active CS Student"
              statusRight="6 Core Projects"
              icon={GraduationCap}
            >
              <div className="p-3 rounded-xl bg-blue-950/50 border border-sky-400/30 font-mono text-[11px] text-sky-300">
                Core Focus: AI, Data Structures, OOP (C++), Databases & Software Engineering
              </div>
            </PageHeroShowcaseFrame>
          </div>
        </div>

        {/* Editable Placeholder Drawer */}
        {isEditingDetails && (
          <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#070B18]/95 border border-blue-500/40 space-y-4">
            <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
              EDITABLE ACADEMIC & CERTIFICATION PLACEHOLDERS (SAVED LOCALLY IN BROWSER)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  University / Institution Name
                </label>
                <input
                  type="text"
                  value={universityName}
                  onChange={(e) => handleSaveAcademic(e.target.value, expectedGrad, certificationNote)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Academic Dates / Expected Graduation
                </label>
                <input
                  type="text"
                  value={expectedGrad}
                  onChange={(e) => handleSaveAcademic(universityName, e.target.value, certificationNote)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Certifications / Technical Courses
                </label>
                <input
                  type="text"
                  value={certificationNote}
                  onChange={(e) => handleSaveAcademic(universityName, expectedGrad, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#040711] border border-slate-300 dark:border-blue-500/30 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3 Interactive 3D-Tilt Credential & Experience Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Education */}
          <InteractiveTiltCard delay={0.08} className="p-6 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                <span>01 · ACADEMIC DEGREE</span>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  {PERSONAL_INFO.education}
                </h2>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {PERSONAL_INFO.academicStatus} · {PERSONAL_INFO.fullLocation}
                </p>
              </div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Institution: {universityName}<br />
                Timeline: {expectedGrad}
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-200/70 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
              Status: Active 6th Semester Student
            </div>
          </InteractiveTiltCard>

          {/* Card 2: Practical Project Engineering */}
          <InteractiveTiltCard delay={0.14} className="p-6 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                <span>02 · APPLIED R&D</span>
                <Code2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  Independent Systems Developer
                </h2>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  AI, Automation & Mobile Engineering
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Engineered <strong>Quetta Ride</strong>, deployed the <strong>AI-Powered Knowledge Base Lifecycle Agent</strong>, and built <strong>AI Study Assistant</strong>, <strong>BizBook</strong>, <strong>AI Chatbot</strong>, and <strong>B2B Lead Scraper</strong>.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-200/70 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
              Focus: Real-World Problem Solving
            </div>
          </InteractiveTiltCard>

          {/* Card 3: Certifications & Professional Development */}
          <InteractiveTiltCard delay={0.2} className="p-6 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                <span>03 · CREDENTIALS</span>
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                  Certifications & Courses
                </h2>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Editable Credential Slot
                </p>
              </div>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-300 p-3 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200 dark:border-blue-500/20">
                {certificationNote}
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-200/70 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
              Customizable via Placeholders button
            </div>
          </InteractiveTiltCard>
        </div>
      </div>
    </section>
  );
};
