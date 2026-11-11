import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Github,
  X,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  Car,
  Bot,
  BookOpen,
  Briefcase,
  MessageSquareCode,
  DatabaseZap,
  FolderGit2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, ProjectCaseStudy } from '../data/portfolioData';
import { InteractiveTiltCard, PageHeroShowcaseFrame } from './InteractiveTiltCard';

const FILTER_TABS: ('All' | 'AI & Agents' | 'Mobile & Flutter' | 'Automation')[] = [
  'All',
  'AI & Agents',
  'Mobile & Flutter',
  'Automation',
];

const PROJECT_VISUAL_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    diagramLabel: string;
  }
> = {
  'quetta-ride': {
    icon: Car,
    gradient: 'from-blue-600/25 via-sky-500/10 to-transparent',
    diagramLabel: 'Passenger App · Captain App · Web Admin · Firestore',
  },
  'kb-lifecycle-agent': {
    icon: Bot,
    gradient: 'from-sky-500/25 via-indigo-600/10 to-transparent',
    diagramLabel: 'Doc Ingestion · RAG Freshness Audit · Gap Detection',
  },
  'ai-study-assistant': {
    icon: BookOpen,
    gradient: 'from-indigo-600/25 via-blue-500/10 to-transparent',
    diagramLabel: 'PDF Parser · Grounded Q&A · Quiz & Flashcard Engine',
  },
  bizbook: {
    icon: Briefcase,
    gradient: 'from-blue-500/25 via-cyan-500/10 to-transparent',
    diagramLabel: 'Inventory · Ledgers · Sales & Purchases · PDF Reports',
  },
  'ai-chatbot': {
    icon: MessageSquareCode,
    gradient: 'from-sky-600/25 via-blue-600/10 to-transparent',
    diagramLabel: 'Multi-Turn Session Memory · LLM API · Markdown UI',
  },
  'b2b-lead-scraper': {
    icon: DatabaseZap,
    gradient: 'from-cyan-500/25 via-blue-600/10 to-transparent',
    diagramLabel: 'Python Scraper · Deduplication · CSV & Sheets Pipeline',
  },
};

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI & Agents' | 'Mobile & Flutter' | 'Automation'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [customLinks, setCustomLinks] = useState<Record<string, { github: string; demo: string }>>(() => {
    try {
      const saved = localStorage.getItem('masood_portfolio_project_links');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [editingLinks, setEditingLinks] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveLink = (projectId: string, field: 'github' | 'demo', value: string) => {
    setCustomLinks((prev) => {
      const next = {
        ...prev,
        [projectId]: {
          github: field === 'github' ? value : prev[projectId]?.github ?? '',
          demo: field === 'demo' ? value : prev[projectId]?.demo ?? '',
        },
      };
      try {
        localStorage.setItem('masood_portfolio_project_links', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.filterGroup === activeFilter);

  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Top Hero Moment: Matches Home Page Layout with Sculpted Orbital Showcase Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                PAGE 03 · FEATURED PROJECT GALLERY
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                style={{ textWrap: 'balance' }}
              >
                Six Real-World{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Software & AI Systems.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Explore six engineered applications spanning multi-role ride-hailing platforms, autonomous documentation lifecycle agents, educational RAG assistants, and business automation pipelines.
            </p>

            {/* Interactive Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-[#070B18] rounded-2xl border border-slate-300/60 dark:border-blue-500/25 w-fit"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeFilter === tab
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tab === 'All' ? 'All Systems (6)' : tab}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-5">
            <PageHeroShowcaseFrame
              badge="LIVE DEPLOYMENT SPOTLIGHT"
              title="KB Lifecycle Agent"
              subtitle="Autonomous AI agent detecting outdated documentation & knowledge gaps."
              statusLeft="6 Featured Systems"
              statusRight="Case Studies Ready"
              icon={FolderGit2}
            >
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-blue-500/20">
                <a
                  href="https://ai-powered-knowledge-base-lifecycle.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:underline"
                >
                  <span>Launch Live Vercel App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(PROJECTS_DATA[1])}
                  className="text-[11px] font-mono text-white/80 hover:text-white underline cursor-pointer"
                >
                  Inspect Architecture
                </button>
              </div>
            </PageHeroShowcaseFrame>
          </div>
        </div>

        {/* 6 Interactive 3D-Tilt Project Navigation Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const demoUrl = customLinks[project.id]?.demo || project.liveDemoUrl;
            const visualMeta = PROJECT_VISUAL_META[project.id] || PROJECT_VISUAL_META['quetta-ride'];
            const VisualIcon = visualMeta.icon;

            return (
              <InteractiveTiltCard
                key={project.id}
                delay={0.08 + idx * 0.05}
                className="p-6"
              >
                <div className="space-y-5">
                  {/* 1. Attractive Architectural Visual Header */}
                  <div
                    onClick={() => {
                      setSelectedProject(project);
                      setEditingLinks(false);
                    }}
                    className={`relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br ${visualMeta.gradient} bg-slate-100 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/25 p-4 flex flex-col justify-between cursor-pointer`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-600 dark:text-sky-400 font-bold">
                        PROJECT {project.index}
                      </span>
                      {demoUrl && (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          LIVE DEMO READY
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/15 dark:bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white transition-all">
                        <VisualIcon className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-snug">
                        {visualMeta.diagramLabel}
                      </p>
                    </div>
                  </div>

                  {/* 2. Project Name & 3. One-Line Description */}
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display group-hover:translate-x-1 transition-transform">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* 4. Technology Tags & 5. View Project Button */}
                <div className="space-y-4 pt-4 mt-5 border-t border-slate-200/70 dark:border-slate-800/80">
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {project.stackSummary}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(project);
                        setEditingLinks(false);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-blue-600 dark:text-sky-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/35 rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      </div>

      {/* Animated Case Study Modal with Full Preserved Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#070B18] border border-slate-200 dark:border-blue-500/30 p-6 sm:p-8 shadow-[0_0_80px_rgba(37,99,235,0.25)] space-y-8 my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-600 dark:text-sky-400">
                    <span>CASE STUDY {selectedProject.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 dark:text-slate-400">{selectedProject.statusNote}</span>
                  </div>
                  <h2
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white font-display"
                  >
                    {selectedProject.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close case study modal"
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Problem, Overview & My Contribution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/20 space-y-2">
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">01. PROBLEM BEING SOLVED</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.problemSolved}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/20 space-y-2">
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">02. PROJECT OVERVIEW</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.overview}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/20 space-y-2">
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">03. MY CONTRIBUTION</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.myContribution}
                  </p>
                </div>
              </div>

              {selectedProject.specialHighlight && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono text-blue-600 dark:text-sky-400 uppercase">
                    {selectedProject.specialHighlight.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.specialHighlight.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/20 space-y-1"
                      >
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Architecture Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display">
                  System Architecture & Data Flow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.architectureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/20 space-y-1.5"
                    >
                      <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                        LAYER 0{idx + 1} · {step.layer.toUpperCase()}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {step.component}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implemented Features & Status Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-950 dark:text-white font-display">
                    Key Features & Capabilities
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.implementedFeatures.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-1" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-950 dark:text-white font-display">
                    Implementation Status & Production Scope
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200/80 dark:border-blue-500/20 space-y-3">
                    {selectedProject.roadmapOrProductionNotes.map((note, idx) => (
                      <p key={idx} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        • {note}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      TECHNOLOGIES USED
                    </h4>
                    <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
                      {selectedProject.technologies.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Links & Editable URL Drawer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={customLinks[selectedProject.id]?.github || selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                    >
                      <Github className="w-4 h-4" />
                      <span>Open GitHub Repository</span>
                    </a>

                    {(customLinks[selectedProject.id]?.demo || selectedProject.liveDemoUrl) ? (
                      <a
                        href={customLinks[selectedProject.id]?.demo || selectedProject.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-xl transition-all whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Live Demo</span>
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Live Demo: [Placeholder — Configure URL when deployed]
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingLinks((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{editingLinks ? 'Hide Link Settings' : 'Configure Exact Repo / Demo URLs'}</span>
                  </button>
                </div>

                {editingLinks && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040711] border border-slate-200 dark:border-blue-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-slate-600 dark:text-slate-400">
                        Specific GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={customLinks[selectedProject.id]?.github ?? selectedProject.githubUrl}
                        onChange={(e) => handleSaveLink(selectedProject.id, 'github', e.target.value)}
                        placeholder="https://github.com/masoodachakzai4-ui/repo-name"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-slate-600 dark:text-slate-400">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={customLinks[selectedProject.id]?.demo ?? selectedProject.liveDemoUrl}
                        onChange={(e) => handleSaveLink(selectedProject.id, 'demo', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
