import React from 'react';
import { motion } from 'motion/react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: 1.15, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03050C] text-white pointer-events-none overflow-hidden"
    >
      {/* Radial #029D97 Core Glow */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#029D97]/25 blur-[110px]" />

      {/* Animated MA Monogram Reveal with Light Sweep */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-4"
      >
        <div className="relative overflow-hidden w-20 h-20 rounded-2xl bg-gradient-to-br from-[#029D97] to-[#1ec9c2] flex items-center justify-center shadow-[0_0_45px_rgba(2,157,151,0.65)] border border-[#2bd4cd]/40">
          <span className="text-2xl font-mono font-bold tracking-tight text-white">
            MA
          </span>
          {/* Light Sweep Effect */}
          <motion.div
            initial={{ x: '-140%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.85, delay: 0.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12"
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-display font-bold tracking-wide text-white">
            MUHAMMAD MASOOD
          </p>
          <p className="text-[11px] font-mono tracking-[0.2em] text-[#2bd4cd]">
            AI · AUTOMATION · SOFTWARE ENGINEERING
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
