import React, { useState, useEffect } from 'react';
import { Sun, Moon, FileText, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioPageId } from './HomeDashboard';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
  activePage: PortfolioPageId;
  onNavigate: (page: PortfolioPageId) => void;
}

const NAV_ITEMS: { label: string; id: PortfolioPageId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'AI Engineering', id: 'ai' },
  { label: 'Automation', id: 'automation' },
  { label: 'Development', id: 'development' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenResume,
  activePage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quettaTime, setQuettaTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setQuettaTime(`${formatter.format(new Date())} PKT`);
      } catch {
        setQuettaTime('');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 pt-3 pb-2 pointer-events-none">
      {/* Floating Rounded Glass Navigation Bar (Strict 3-Zone Contract) */}
      <div className="pointer-events-auto max-w-[1320px] mx-auto flex items-center justify-between gap-6 px-5 py-3 rounded-2xl bg-white/80 dark:bg-[#070B16]/80 backdrop-blur-xl border border-slate-200/80 dark:border-blue-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.28)] transition-colors">
        {/* Zone 1: Custom MA Monogram & Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 font-display cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#029D97] to-[#1ec9c2] text-white text-xs font-mono font-bold shadow-[0_0_16px_rgba(2,157,151,0.5)]">
            MA
          </span>
          <span>Masood Achakzai</span>
        </button>

        {/* Zone 2: Single-Line Navigation Links with Animated Active Indicator */}
        <nav
          aria-label="Primary Page Navigation"
          className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1.5 px-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-slate-950 dark:hover:text-white ${
                  isActive ? 'text-blue-600 dark:text-sky-400 font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Back to Home (when on subpage), Theme Toggle & Resume Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {activePage !== 'home' ? (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 dark:bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          ) : (
            quettaTime && (
              <span className="hidden md:inline-block text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums pr-1 whitespace-nowrap">
                {quettaTime}
              </span>
            )
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-sky-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#029D97] to-[#04b8b1] hover:from-[#03b5ae] hover:to-[#1ec9c2] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_20px_rgba(2,157,151,0.4)]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto xl:hidden max-w-[1320px] mx-auto mt-2 rounded-2xl bg-white/95 dark:bg-[#070B16]/95 backdrop-blur-xl border border-slate-200 dark:border-blue-500/20 p-5 shadow-2xl space-y-4"
          >
            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(item.id);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activePage === item.id
                      ? 'bg-blue-600/15 text-blue-600 dark:text-sky-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              {quettaTime && (
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  Quetta: {quettaTime}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View & Print ATS Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
