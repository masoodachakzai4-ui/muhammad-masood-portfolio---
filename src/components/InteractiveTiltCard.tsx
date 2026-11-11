import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  tiltStrength?: number;
  as?: 'div' | 'button' | 'article';
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
  onClick,
  delay = 0,
  tiltStrength = 5,
  as = 'div',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hoverState, setHoverState] = useState({
    rotateX: 0,
    rotateY: 0,
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const rotateX = ((relY - rect.height / 2) / (rect.height / 2)) * -tiltStrength;
    const rotateY = ((relX - rect.width / 2) / (rect.width / 2)) * tiltStrength;

    setHoverState({
      rotateX,
      rotateY,
      x: (relX / rect.width) * 100,
      y: (relY / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setHoverState({ rotateX: 0, rotateY: 0, x: 50, y: 50, active: false });
  };

  const Component = motion[as] as any;

  return (
    <Component
      ref={cardRef}
      type={as === 'button' ? 'button' : undefined}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.48, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${hoverState.rotateX}deg) rotateY(${hoverState.rotateY}deg) scale(${
          hoverState.active ? 1.015 : 1
        })`,
        transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative overflow-hidden rounded-3xl bg-white/85 dark:bg-[#070B18]/85 backdrop-blur-xl border border-slate-200/90 dark:border-[#029D97]/25 hover:border-[#029D97] dark:hover:border-[#029D97] shadow-[0_10px_35px_rgba(0,0,0,0.16)] hover:shadow-[0_18px_55px_rgba(2,157,151,0.32)] transition-colors ${className}`}
    >
      {/* Cursor-Following Radial #029D97 Spotlight */}
      <div
        aria-hidden="true"
        style={{
          opacity: hoverState.active ? 1 : 0,
          background: `radial-gradient(280px circle at ${hoverState.x}% ${hoverState.y}%, rgba(2, 157, 151, 0.22), transparent 75%)`,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
      />

      {/* Subtle Diagonal Light Sweep on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#029D97]/15 to-transparent -skew-x-12 -translate-x-[220%] group-hover:translate-x-[360%] transition-transform duration-1000 ease-out"
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </Component>
  );
};

interface PageHeroShowcaseFrameProps {
  badge: string;
  title: string;
  subtitle: string;
  statusLeft: string;
  statusRight: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}

export const PageHeroShowcaseFrame: React.FC<PageHeroShowcaseFrameProps> = ({
  badge,
  title,
  subtitle,
  statusLeft,
  statusRight,
  icon: Icon,
  children,
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setTilt({
      rotateX,
      rotateY,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center select-none py-4"
    >
      {/* Ambient #029D97 Halo & Rotating Orbital Energy Rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-[#029D97]/28 via-[#1ec9c2]/15 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[300px] h-[300px] sm:w-[370px] sm:h-[370px] rounded-full border border-dashed border-[#029D97]/45 animate-slow-spin"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[335px] h-[335px] sm:w-[408px] sm:h-[408px] rounded-full border border-[#029D97]/25 animate-reverse-slow-spin"
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#1ec9c2] shadow-[0_0_14px_#029D97]" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#029D97] shadow-[0_0_12px_#029D97]" />
      </div>

      {/* Asymmetrical Sculpted Glass & #029D97 Frame */}
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group relative w-full max-w-[360px] rounded-tl-[52px] rounded-br-[52px] rounded-tr-[22px] rounded-bl-[22px] p-[2px] bg-gradient-to-br from-[#1ec9c2]/85 via-[#029D97]/50 to-[#022c2a]/90 shadow-[0_25px_80px_-15px_rgba(2,157,151,0.5)]"
      >
        <div className="relative overflow-hidden rounded-tl-[50px] rounded-br-[50px] rounded-tr-[20px] rounded-bl-[20px] bg-white/95 dark:bg-[#050915]/95 backdrop-blur-2xl p-5 sm:p-6 space-y-5">
          {/* Cursor Spotlight */}
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(260px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(2, 157, 151, 0.24), transparent 70%)`,
            }}
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          />

          {/* Corner Brackets */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-[#029D97]/70 rounded-tr-md"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-[#029D97]/70 rounded-bl-md"
          />

          {/* Inner Sculpted Visual Stage */}
          <div className="relative rounded-tl-[36px] rounded-br-[36px] rounded-tr-[14px] rounded-bl-[14px] bg-gradient-to-b from-slate-900 via-[#041d1c] to-[#040711] border border-[#029D97]/35 p-5 text-white space-y-4 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono tracking-[0.18em] text-[#2bd4cd] uppercase font-semibold">
                {badge}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#029D97] flex items-center justify-center text-white shadow-[0_0_20px_rgba(2,157,151,0.55)] group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-white">
                {title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {children && <div className="pt-1">{children}</div>}
          </div>

          {/* Bottom Caption */}
          <div className="relative z-10 flex items-center justify-between px-1 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span>{statusLeft}</span>
            <span className="text-[#029D97] dark:text-[#2bd4cd] font-semibold">{statusRight}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
