import React from 'react';
import { GraduationCap, Cpu, Compass, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { JOURNEY_TIMELINE, PERSONAL_INFO } from '../data/portfolioData';
import { CinematicPortraitFrame } from './CinematicPortraitFrame';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export const AboutSection: React.FC = () => {
  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-20">
        {/* Top Hero Split: Matches Home Page Moment with Sculpted Portrait Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                PAGE 02 · ABOUT MUHAMMAD MASOOD
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                style={{ textWrap: 'balance' }}
              >
                Engineering Intelligent Software &{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Practical Digital Products.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I am a 6th-semester BS Computer Science student and developer based in{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">
                {PERSONAL_INFO.fullLocation}
              </strong>
              . I focus on transforming computer science fundamentals into intelligent AI applications, automated workflows, and cross-platform software.
            </p>

            {/* 3 Interactive 3D-Tilt Identity Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <InteractiveTiltCard delay={0.1} className="p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-blue-600 dark:text-sky-400">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-[10px] font-mono">01</span>
                  </div>
                  <p className="text-sm font-bold text-slate-950 dark:text-white font-display">
                    BS Computer Science
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    6th Semester · Quetta, PK
                  </p>
                </div>
              </InteractiveTiltCard>

              <InteractiveTiltCard delay={0.16} className="p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-blue-600 dark:text-sky-400">
                    <Cpu className="w-5 h-5" />
                    <span className="text-[10px] font-mono">02</span>
                  </div>
                  <p className="text-sm font-bold text-slate-950 dark:text-white font-display">
                    Core Focus
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Agentic AI, n8n, Flutter & DBs
                  </p>
                </div>
              </InteractiveTiltCard>

              <InteractiveTiltCard delay={0.22} className="p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-blue-600 dark:text-sky-400">
                    <Compass className="w-5 h-5" />
                    <span className="text-[10px] font-mono">03</span>
                  </div>
                  <p className="text-sm font-bold text-slate-950 dark:text-white font-display">
                    Mission
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Real-World Digital Impact
                  </p>
                </div>
              </InteractiveTiltCard>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex justify-center">
            <CinematicPortraitFrame />
          </div>
        </div>

        {/* Interactive 3D-Tilt Technical Journey Timeline Boxes */}
        <div className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-blue-500/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                CHRONOLOGICAL PROGRESSION
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white font-display mt-1">
                Technical Journey & Milestones
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Hover any milestone panel for 3D interactive depth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {JOURNEY_TIMELINE.map((step, idx) => (
              <InteractiveTiltCard
                key={idx}
                delay={0.1 + idx * 0.06}
                className="p-6 sm:p-7"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                    <span>{step.period}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>MILESTONE 0{idx + 1}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display group-hover:translate-x-1 transition-transform">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <p className="pt-4 mt-4 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {step.subtitle}
                </p>
              </InteractiveTiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
