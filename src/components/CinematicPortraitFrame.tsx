import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, X, MapPin, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const CinematicPortraitFrame: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center select-none"
      >
        {/* Outer Ambient #029D97 Halo & Rotating Orbital Rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full bg-gradient-to-tr from-[#029D97]/28 via-[#1ec9c2]/15 to-transparent blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[330px] h-[330px] sm:w-[410px] sm:h-[410px] rounded-full border border-dashed border-[#029D97]/45 animate-slow-spin"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[365px] h-[365px] sm:w-[448px] sm:h-[448px] rounded-full border border-[#029D97]/25 animate-reverse-slow-spin"
        >
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1ec9c2] shadow-[0_0_14px_#029D97]" />
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#029D97] shadow-[0_0_12px_#029D97]" />
        </div>

        {/* Sculpted Asymmetrical Layered Glass & #029D97 Portrait Pedestal */}
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setViewerOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setViewerOpen(true);
            }
          }}
          aria-label="Inspect larger portrait of Muhammad Masood"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="group relative w-[290px] sm:w-[356px] cursor-pointer rounded-tl-[56px] rounded-br-[56px] rounded-tr-[24px] rounded-bl-[24px] p-[2px] bg-gradient-to-br from-[#1ec9c2]/85 via-[#029D97]/50 to-[#022c2a]/90 shadow-[0_25px_80px_-15px_rgba(2,157,151,0.5)]"
        >
          {/* Inner Sculpted Glass Container */}
          <div className="relative overflow-hidden rounded-tl-[54px] rounded-br-[54px] rounded-tr-[22px] rounded-bl-[22px] bg-white/95 dark:bg-[#050915]/95 backdrop-blur-2xl p-4 sm:p-5 space-y-4">
            {/* Cursor-Responsive Spotlight Inside Frame */}
            <div
              aria-hidden="true"
              style={{
                background: `radial-gradient(280px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(2, 157, 151, 0.24), transparent 70%)`,
              }}
              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            />

            {/* Corner Architectural Accent Brackets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-sky-400/60 rounded-tr-lg"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-blue-500/60 rounded-bl-lg"
            />

            {/* Portrait Image Stage (Unaltered Authentic Portrait) */}
            <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-tl-[42px] rounded-br-[42px] rounded-tr-[16px] rounded-bl-[16px] bg-gradient-to-b from-slate-900 via-[#091328] to-[#040711] border border-blue-500/30 shadow-inner">
              {!imgError ? (
                <img
                  src={PERSONAL_INFO.portraitPath}
                  alt="Muhammad Masood (Masood Achakzai) — Computer Science Developer"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-950 text-white font-display font-bold text-4xl">
                  MA
                </div>
              )}

              {/* Subtle Animated Diagonal Light Sweep on Hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[180%] group-hover:translate-x-[280%] transition-transform duration-1000 ease-out"
              />

              {/* Bottom Measured Contrast Scrim & Expand Affordance */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#03050C]/90 via-[#03050C]/45 to-transparent flex items-end justify-between">
                <div className="text-left">
                  <p className="text-[10px] font-mono tracking-[0.18em] text-sky-400 uppercase">
                    MASOOD ACHAKZAI
                  </p>
                  <p className="text-xs font-semibold text-white">
                    Quetta, Pakistan
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white group-hover:bg-blue-600 group-hover:border-sky-400 transition-colors">
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand</span>
                </span>
              </div>
            </div>

            {/* Minimal Bottom Identity Caption */}
            <div className="relative z-10 flex items-center justify-between px-1 pt-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <span>BSCS · 6th Semester</span>
              <span className="text-blue-600 dark:text-sky-400 font-semibold">AI · Automation · Dev</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Elegant Larger Portrait Lightbox Viewer Modal */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Muhammad Masood Portrait Viewer"
            onClick={() => setViewerOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#070B18] border border-slate-200 dark:border-blue-500/40 p-5 sm:p-6 shadow-[0_0_90px_rgba(37,99,235,0.4)] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3.5">
                <div>
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                    EXECUTIVE PORTRAIT
                  </p>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display">
                    {PERSONAL_INFO.fullName} ({PERSONAL_INFO.professionalName})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setViewerOpen(false)}
                  aria-label="Close portrait viewer"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-950 aspect-square max-h-[420px] mx-auto">
                <img
                  src={PERSONAL_INFO.portraitPath}
                  alt="Muhammad Masood (Masood Achakzai)"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <span>BS Computer Science · 6th Semester</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-blue-600 dark:text-sky-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Quetta, Balochistan, Pakistan</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
