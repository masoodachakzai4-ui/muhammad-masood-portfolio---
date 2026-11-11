import React, { useState, useRef } from 'react';
import {
  User,
  FolderGit2,
  Cpu,
  Workflow,
  Code2,
  GraduationCap,
  Mail,
  FileText,
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Compass,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CinematicPortraitFrame } from './CinematicPortraitFrame';

export type PortfolioPageId =
  | 'home'
  | 'about'
  | 'projects'
  | 'ai'
  | 'automation'
  | 'development'
  | 'education'
  | 'contact';

interface HomeDashboardProps {
  onNavigate: (page: PortfolioPageId) => void;
  onOpenResume: () => void;
  linkedInUrl: string;
}

interface NavBoxConfig {
  id: PortfolioPageId | 'resume';
  index: string;
  title: string;
  subtitle: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAVIGATION_BOXES: NavBoxConfig[] = [
  {
    id: 'about',
    index: '01',
    title: 'ABOUT ME',
    subtitle: 'Background, CS journey & engineering goals',
    meta: 'Biography · Timeline',
    icon: User,
  },
  {
    id: 'projects',
    index: '02',
    title: 'PROJECTS',
    subtitle: 'Quetta Ride, KB Lifecycle Agent, BizBook & more',
    meta: '6 Case Studies · Live Demo',
    icon: FolderGit2,
  },
  {
    id: 'ai',
    index: '03',
    title: 'AI ENGINEERING',
    subtitle: 'Agentic AI, RAG pipelines, LLMs & intelligent systems',
    meta: 'Interactive Agent Pipeline',
    icon: Cpu,
  },
  {
    id: 'automation',
    index: '04',
    title: 'AUTOMATION',
    subtitle: 'n8n orchestration, API integrations & lead pipelines',
    meta: '3 Live Workflow Demos',
    icon: Workflow,
  },
  {
    id: 'development',
    index: '05',
    title: 'DEVELOPMENT',
    subtitle: 'Full-Stack Web, Flutter Mobile, Python, C++ & Databases',
    meta: 'Interactive Tech Stack',
    icon: Code2,
  },
  {
    id: 'education',
    index: '06',
    title: 'EDUCATION',
    subtitle: 'BS Computer Science (6th Sem) & technical milestones',
    meta: 'Quetta, Pakistan · GitHub',
    icon: GraduationCap,
  },
  {
    id: 'contact',
    index: '07',
    title: 'CONTACT',
    subtitle: 'WhatsApp, LinkedIn, GitHub, Email & direct inquiry',
    meta: 'Verified Channels',
    icon: Mail,
  },
  {
    id: 'resume',
    index: '08',
    title: 'RESUME',
    subtitle: 'ATS-friendly executive CV & instant PDF export',
    meta: 'Print PDF · Download MD',
    icon: FileText,
  },
];

interface InteractiveNavTileProps {
  box: NavBoxConfig;
  idx: number;
  onSelect: () => void;
}

const InteractiveNavTile: React.FC<InteractiveNavTileProps> = ({ box, idx, onSelect }) => {
  const tileRef = useRef<HTMLButtonElement | null>(null);
  const [hoverState, setHoverState] = useState({
    rotateX: 0,
    rotateY: 0,
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const rotateX = ((relY - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((relX - rect.width / 2) / (rect.width / 2)) * 5;

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

  const IconComponent = box.icon;

  return (
    <motion.button
      ref={tileRef}
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + idx * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform: `perspective(900px) rotateX(${hoverState.rotateX}deg) rotateY(${hoverState.rotateY}deg) scale(${
          hoverState.active ? 1.015 : 1
        })`,
        transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative w-full text-left rounded-3xl p-6 sm:p-7 bg-white/85 dark:bg-[#070B18]/85 backdrop-blur-xl border border-slate-200/90 dark:border-[#029D97]/25 hover:border-[#029D97] dark:hover:border-[#1ec9c2] shadow-[0_10px_35px_rgba(0,0,0,0.16)] hover:shadow-[0_15px_50px_rgba(2,157,151,0.32)] cursor-pointer overflow-hidden flex flex-col justify-between gap-5"
    >
      {/* Cursor-Following Radial #029D97 Spotlight */}
      <div
        aria-hidden="true"
        style={{
          opacity: hoverState.active ? 1 : 0,
          background: `radial-gradient(260px circle at ${hoverState.x}% ${hoverState.y}%, rgba(2, 157, 151, 0.22), transparent 75%)`,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
      />

      {/* Top Row: Index, Icon & Launch Arrow */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#029D97]/15 dark:bg-[#029D97]/20 border border-[#029D97]/35 flex items-center justify-center text-[#029D97] dark:text-[#2bd4cd] group-hover:scale-110 group-hover:bg-[#029D97] group-hover:text-white transition-all duration-200 shadow-xs">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:text-[#029D97] dark:group-hover:text-[#2bd4cd] transition-colors">
            {box.index}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:text-[#029D97] dark:group-hover:text-[#2bd4cd] transition-colors">
          <span>{box.meta}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* Bottom Row: Title & Concise 1-Line Description */}
      <div className="relative z-10 space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white font-display transition-transform duration-200 group-hover:translate-x-1">
          {box.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-1">
          {box.subtitle}
        </p>
      </div>
    </motion.button>
  );
};

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onOpenResume,
  linkedInUrl,
}) => {
  const navGridRef = useRef<HTMLDivElement | null>(null);

  const isLinkedInConfigured =
    linkedInUrl &&
    !linkedInUrl.includes('[INSERT') &&
    (linkedInUrl.startsWith('http://') || linkedInUrl.startsWith('https://'));

  const handleExploreClick = () => {
    navGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-8 pb-24 space-y-20">
      {/* =====================================================================
          HERO STAGE — MINIMAL, SPACIOUS, CINEMATIC
      ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-4 lg:pt-8">
        {/* Left Column: Minimal Executive Identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Identity & Role Line */}
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-[0.2em] text-[#029D97] dark:text-[#2bd4cd] uppercase font-semibold">
              {PERSONAL_INFO.fullName} · Computer Science Developer
            </p>
            <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              AI Engineering · Automation · Software Development
            </p>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl xl:text-[3.75rem] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] font-display"
            style={{ textWrap: 'balance' }}
          >
            Building Intelligent Solutions{' '}
            <span className="bg-gradient-to-r from-[#029D97] via-[#1ec9c2] to-[#2bd4cd] bg-clip-text text-transparent">
              for the Future.
            </span>
          </h1>

          {/* One Short Professional Introduction */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            I design and engineer AI-powered applications, autonomous agent workflows, cross-platform Flutter apps, and scalable software systems that solve real-world problems.
          </p>

          {/* Academic Information Line */}
          <p className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
            BS Computer Science · 6th Semester · Quetta, Pakistan
          </p>

          {/* Primary Buttons & Social Icons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              type="button"
              onClick={handleExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#029D97] hover:bg-[#02837e] rounded-2xl transition-all shadow-[0_0_30px_rgba(2,157,151,0.48)] cursor-pointer whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>Explore My Portfolio</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white/85 dark:bg-[#0B1021]/90 hover:bg-slate-100 dark:hover:bg-[#0f1b24] border border-slate-300 dark:border-[#029D97]/35 rounded-2xl transition-colors cursor-pointer whitespace-nowrap shrink-0 backdrop-blur-md"
            >
              <Mail className="w-4 h-4 text-[#029D97] dark:text-[#2bd4cd]" />
              <span>Contact Me</span>
            </button>

            {/* Clean Social Media Icons */}
            <div className="flex items-center gap-2.5 pl-1">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-2xl bg-white/80 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              {isLinkedInConfigured ? (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-2xl bg-white/80 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  aria-label="Configure LinkedIn in Contact Page"
                  className="p-3 rounded-2xl bg-white/80 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              )}

              <a
                href={PERSONAL_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-3 rounded-2xl bg-white/80 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:border-blue-500 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Sculpted Cinematic Portrait Frame */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <CinematicPortraitFrame />
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE NAVIGATION BOXES (2x4 PORTAL GRID)
      ===================================================================== */}
      <section ref={navGridRef} className="space-y-6 pt-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 dark:border-blue-500/15 pb-4">
          <div>
            <p className="text-xs font-mono tracking-wider text-blue-600 dark:text-sky-400">
              INTERACTIVE PORTFOLIO PORTAL
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white font-display">
              Select a Chapter to Explore
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Click any panel to launch its dedicated interactive experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {NAVIGATION_BOXES.map((box, idx) => (
            <InteractiveNavTile
              key={box.id}
              box={box}
              idx={idx}
              onSelect={() => {
                if (box.id === 'resume') {
                  onOpenResume();
                } else {
                  onNavigate(box.id);
                }
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
