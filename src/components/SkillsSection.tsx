import React, { useState } from 'react';
import { Code2, Smartphone, Database, Globe, Cpu, Wrench, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractiveTiltCard, PageHeroShowcaseFrame } from './InteractiveTiltCard';

interface TechCategoryPanel {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    name: string;
    role: string;
    appliedIn: string;
  }[];
}

const DEVELOPMENT_PANELS: TechCategoryPanel[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Programming Languages',
    subtitle: 'Python · Dart · C++ · JavaScript · HTML5 · CSS3',
    icon: Code2,
    items: [
      { name: 'Python', role: 'AI Engineering, FastAPI Backends & Automation', appliedIn: 'KB Lifecycle Agent, AI Study Assistant, Lead Scraper' },
      { name: 'Dart', role: 'Cross-Platform Mobile Application Logic', appliedIn: 'Quetta Ride & BizBook Flutter Apps' },
      { name: 'C++', role: 'Data Structures, Algorithms & OOP Foundations', appliedIn: 'BS Computer Science Core Systems' },
      { name: 'JavaScript', role: 'Interactive Web Interfaces & Client Logic', appliedIn: 'Web Admin Dashboards & Portfolio' },
      { name: 'HTML5 & CSS3', role: 'Semantic Markup & Responsive Layouts', appliedIn: 'Modern Web Applications' },
    ],
  },
  {
    id: 'mobile',
    index: '02',
    title: 'Flutter & Mobile Apps',
    subtitle: 'Flutter · Dart · Android · Local Persistence & PDF',
    icon: Smartphone,
    items: [
      { name: 'Flutter', role: 'Multi-screen mobile UI, maps & custom state workflows', appliedIn: 'Quetta Ride (Passenger & Captain Apps) & BizBook' },
      { name: 'Android Development', role: 'Device geolocation, permissions & APK builds', appliedIn: 'Quetta Ride & BizBook' },
      { name: 'Local Persistence & PDF', role: 'Offline-first ledgers & receipt/statement generation', appliedIn: 'BizBook Business Manager' },
    ],
  },
  {
    id: 'web-fullstack',
    index: '03',
    title: 'Web & Full-Stack Dev',
    subtitle: 'FastAPI · REST APIs · Responsive Web · Auth Guards',
    icon: Globe,
    items: [
      { name: 'FastAPI & REST APIs', role: 'Python API routing, validation & LLM service wrappers', appliedIn: 'AI Chatbot & Agent Backends' },
      { name: 'Responsive Web UI', role: 'Modern component architecture & admin dashboards', appliedIn: 'Quetta Ride Web Admin & Portfolio' },
      { name: 'Authentication Systems', role: 'Role-based access guards for passengers, captains & admins', appliedIn: 'Quetta Ride & BizBook' },
    ],
  },
  {
    id: 'databases',
    index: '04',
    title: 'Database Engineering',
    subtitle: 'Firebase · Cloud Firestore · MySQL · Data Modeling',
    icon: Database,
    items: [
      { name: 'Firebase & Cloud Firestore', role: 'Real-time NoSQL document sync & live ride tracking', appliedIn: 'Quetta Ride Dispatch Engine' },
      { name: 'MySQL', role: 'Normalized relational schema design, foreign keys & CRUD', appliedIn: 'Relational Database Systems' },
      { name: 'Data Modeling', role: 'Transactional ledgers, inventory & audit logs', appliedIn: 'BizBook & KB Lifecycle Agent' },
    ],
  },
  {
    id: 'ai-automation',
    index: '05',
    title: 'AI & Workflow Stack',
    subtitle: 'Agentic AI · RAG · n8n · LangChain · Ollama',
    icon: Cpu,
    items: [
      { name: 'Agentic AI & RAG', role: 'Document-grounded Q&A & freshness auditing', appliedIn: 'KB Lifecycle Agent & AI Study Assistant' },
      { name: 'n8n & API Integrations', role: 'Event-driven webhook workflows & Google Sheets sync', appliedIn: 'Automation Lab & Lead Scraper' },
      { name: 'LangChain, Ollama & Streamlit', role: 'Local/cloud model experimentation & rapid AI UIs', appliedIn: 'AI Prototypes & Study Assistant' },
    ],
  },
  {
    id: 'tools',
    index: '06',
    title: 'Engineering Toolchain',
    subtitle: 'GitHub · VS Code · Android Studio · Google AI Studio',
    icon: Wrench,
    items: [
      { name: 'Git & GitHub', role: 'Version control & open-source repository hosting', appliedIn: 'github.com/masoodachakzai4-ui' },
      { name: 'VS Code & Android Studio', role: 'Primary full-stack & mobile development environments', appliedIn: 'All Software Projects' },
      { name: 'Google AI Studio, Claude & Antigravity', role: 'AI-assisted architecture & prompt engineering', appliedIn: 'AI & Full-Stack Workflows' },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('languages');

  const activePanel =
    DEVELOPMENT_PANELS.find((p) => p.id === activeCategoryId) || DEVELOPMENT_PANELS[0];

  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Top Hero Moment: Matches Home Page Layout with Active Sculpted Orbital Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                PAGE 06 · DEVELOPMENT & TECHNOLOGIES
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                style={{ textWrap: 'balance' }}
              >
                Full-Stack, Mobile &{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Database Engineering.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Click any of the six interactive technology boxes below to inspect its applied engineering context in the sculpted showcase frame.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            <PageHeroShowcaseFrame
              badge={`DOMAIN ${activePanel.index} · SELECTED STACK`}
              title={activePanel.title}
              subtitle={activePanel.subtitle}
              statusLeft={`${activePanel.items.length} Core Technologies`}
              statusRight="Project-Verified"
              icon={activePanel.icon}
            >
              <div className="space-y-2 pt-2 border-t border-blue-500/20">
                {activePanel.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{item.name}</span>
                    <span className="text-[11px] font-mono text-sky-400 truncate max-w-[175px]">
                      {item.appliedIn}
                    </span>
                  </div>
                ))}
              </div>
            </PageHeroShowcaseFrame>
          </div>
        </div>

        {/* 6 Interactive 3D-Tilt Technology Domain Boxes (Like Home Page Portal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEVELOPMENT_PANELS.map((panel, idx) => {
            const IconComp = panel.icon;
            const isSelected = panel.id === activeCategoryId;
            return (
              <InteractiveTiltCard
                key={panel.id}
                as="button"
                delay={0.08 + idx * 0.05}
                onClick={() => setActiveCategoryId(panel.id)}
                className={`p-6 sm:p-7 text-left cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-sky-400 bg-blue-600/10 dark:bg-blue-500/20'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                          : 'bg-blue-600/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-sky-400 group-hover:scale-110'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {panel.index}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-sky-400">
                    <span>{panel.items.length} Tools</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white font-display group-hover:translate-x-1 transition-transform">
                    {panel.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-1">
                    {panel.subtitle}
                  </p>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
