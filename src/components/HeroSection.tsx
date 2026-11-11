import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  Download,
  Github,
  Linkedin,
  MessageCircle,
  Maximize2,
  X,
  MapPin,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, buildWhatsAppUrl, isValidLinkedInUrl } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
  linkedInUrl: string;
  whatsAppNumber: string;
  onPromptConfigureContact: () => void;
}

const HEADLINE_WORDS_PART_1 = ['Engineering', 'Intelligent', 'Systems.'];
const HEADLINE_WORDS_PART_2 = ['Building', 'Extraordinary', 'Digital', 'Experiences.'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  linkedInUrl,
  whatsAppNumber,
  onPromptConfigureContact,
}) => {
  const [imgError, setImgError] = useState(false);
  const [portraitLightboxOpen, setPortraitLightboxOpen] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const waHref = buildWhatsAppUrl(whatsAppNumber);
  const hasLinkedIn = isValidLinkedInUrl(linkedInUrl);

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 10 });
  };

  const handlePortraitMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-200/80 dark:border-blue-500/15"
    >
      {/* Ambient Electric-Blue Horizon Light Arc & Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[480px] bg-gradient-to-b from-blue-600/25 via-sky-500/12 to-transparent blur-[130px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 w-[140%] h-[340px] rounded-[100%] border-t border-sky-400/35 dark:border-sky-400/40 bg-gradient-to-b from-blue-600/15 via-blue-950/10 to-transparent shadow-[0_-25px_90px_rgba(37,99,235,0.3)]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Staggered Word-by-Word Typography & Interactive Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7">
            {/* Top Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.18em] text-blue-600 dark:text-sky-400 font-semibold"
            >
              <span>{PERSONAL_INFO.heroKicker}</span>
            </motion.div>

            {/* Word-by-Word Staggered Display Headline */}
            <h1
              className="text-4xl sm:text-5xl xl:text-[3.65rem] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] font-display"
              style={{ textWrap: 'balance' }}
            >
              {HEADLINE_WORDS_PART_1.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.45, delay: 0.08 * idx }}
                  className="inline-block mr-[0.26em]"
                >
                  {word}
                </motion.span>
              ))}
              <br className="hidden sm:inline" />
              {HEADLINE_WORDS_PART_2.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.45, delay: 0.24 + 0.08 * idx }}
                  className="inline-block mr-[0.26em] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Concise Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
            >
              {PERSONAL_INFO.heroSubtitle}
            </motion.p>

            {/* Magnetic-Style CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1"
            >
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.45)] whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-[#0B1021]/90 hover:bg-slate-100 dark:hover:bg-[#111832] border border-slate-300 dark:border-blue-500/30 hover:border-blue-500/60 rounded-xl transition-colors whitespace-nowrap shrink-0 backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <span>Discover My Journey</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 border border-transparent hover:border-blue-500/30 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Resume / CV</span>
              </motion.button>
            </motion.div>

            {/* Verified Academic Row + Direct GitHub, LinkedIn & WhatsApp Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="w-full pt-6 border-t border-slate-200/80 dark:border-blue-500/20 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-4 text-xs font-mono text-slate-600 dark:text-slate-400"
            >
              <span className="font-semibold text-slate-900 dark:text-white">
                {PERSONAL_INFO.education}
              </span>
              <span aria-hidden="true" className="text-blue-500">·</span>
              <span>{PERSONAL_INFO.academicStatus}</span>
              <span aria-hidden="true" className="text-blue-500">·</span>
              <span>{PERSONAL_INFO.location}</span>
              <span aria-hidden="true" className="text-blue-500">·</span>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <span aria-hidden="true" className="text-blue-500">·</span>

              {/* LinkedIn */}
              {hasLinkedIn ? (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onPromptConfigureContact}
                  className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                  <span>LinkedIn</span>
                </button>
              )}

              <span aria-hidden="true" className="text-blue-500">·</span>

              {/* WhatsApp */}
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onPromptConfigureContact}
                  className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait Monolith with Parallax Tilt & Click-to-Expand Lightbox */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              onClick={() => setPortraitLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPortraitLightboxOpen(true);
                }
              }}
              aria-label="Open full-resolution portrait presentation of Muhammad Masood"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="group relative w-full max-w-[400px] rounded-[2rem] p-5 bg-white/85 dark:bg-[#070C1A]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-blue-500/35 hover:border-sky-400/80 shadow-[0_20px_80px_rgba(37,99,235,0.24)] cursor-pointer select-none"
            >
              {/* Subtle Ambient Rim Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-[2.2rem] bg-gradient-to-b from-blue-500/20 via-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              />

              {/* Editorial Portrait Stage */}
              <div className="relative w-full aspect-[4/4.3] rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#070B18] to-[#03050C] border border-slate-200/60 dark:border-blue-500/25 flex items-center justify-center">
                {/* Concentric Electric-Blue Orbital Rings Behind Portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute w-72 h-72 rounded-full border border-dashed border-sky-400/30 animate-slow-spin"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute w-60 h-60 rounded-full border border-blue-500/25 animate-reverse-slow-spin"
                />

                {/* Authentic Unaltered Photograph */}
                {!imgError ? (
                  <img
                    src={PERSONAL_INFO.portraitPath}
                    alt="Muhammad Masood (Masood Achakzai) — Computer Science Developer & AI Engineer"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="relative z-10 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-950 text-white font-display font-bold text-4xl">
                    MA
                  </div>
                )}

                {/* Subtle Bottom Gradient Scrim for Legible Caption */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#03050C]/90 via-[#03050C]/45 to-transparent z-20"
                />

                {/* Hover Expand Affordance */}
                <div className="absolute top-3.5 right-3.5 z-20 p-2 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 text-white/85 group-hover:text-sky-300 group-hover:border-sky-400/50 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Portrait Overlay Identity */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-2 text-left">
                  <div>
                    <p className="text-[11px] font-mono tracking-widest text-sky-400 uppercase">
                      {PERSONAL_INFO.professionalName}
                    </p>
                    <h2 className="text-lg font-bold text-white font-display leading-tight">
                      {PERSONAL_INFO.fullName}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-sky-300 transition-colors">
                    Click to Inspect
                  </span>
                </div>
              </div>

              {/* Concise Brand Statement Below Frame */}
              <div className="pt-4 px-1 flex items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
                <span className="italic">"{PERSONAL_INFO.brandStatement}"</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Click-to-View Full Portrait Presentation Modal */}
      <AnimatePresence>
        {portraitLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPortraitLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Muhammad Masood Executive Portrait Presentation"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#070B18] border border-slate-200 dark:border-blue-500/35 p-6 sm:p-8 shadow-[0_0_90px_rgba(37,99,235,0.35)] space-y-6"
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                    EXECUTIVE PROFILE PRESENTATION
                  </p>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white font-display">
                    {PERSONAL_INFO.fullName} ({PERSONAL_INFO.professionalName})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPortraitLightboxOpen(false)}
                  aria-label="Close portrait presentation"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-blue-500/30 bg-[#050914] aspect-square">
                  <img
                    src={PERSONAL_INFO.portraitPath}
                    alt="Muhammad Masood (Masood Achakzai)"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="sm:col-span-6 space-y-4 text-left">
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                    {PERSONAL_INFO.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {PERSONAL_INFO.heroIntroduction}
                  </p>
                  <div className="pt-2 space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      <span>{PERSONAL_INFO.education} ({PERSONAL_INFO.academicStatus})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{PERSONAL_INFO.fullLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>AI · Agentic Systems · n8n · Flutter · Databases</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
