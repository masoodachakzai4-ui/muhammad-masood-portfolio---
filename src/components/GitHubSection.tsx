import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, GitBranch, Star, RefreshCw, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export const GitHubSection: React.FC = () => {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}`),
        fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=6`),
      ]);

      if (!userRes.ok) {
        throw new Error(`GitHub API returned status ${userRes.status}`);
      }

      const userData: GitHubUser = await userRes.json();
      setProfile(userData);

      if (reposRes.ok) {
        const reposData: GitHubRepo[] = await reposRes.json();
        setRepos(Array.isArray(reposData) ? reposData : []);
      }
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : 'Unable to reach live GitHub API right now. Showing verified profile reference.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-slate-200/80 dark:border-blue-500/15 pt-10">
          <div className="space-y-1.5">
            <p className="text-xs font-mono tracking-wider text-blue-600 dark:text-sky-400">
              LIVE GITHUB REPOSITORY FEED
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white font-display">
              Open Source & Public Repositories (@{PERSONAL_INFO.githubUsername})
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={fetchGitHubData}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#070B18] border border-slate-200 dark:border-blue-500/25 rounded-xl hover:border-blue-500 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-xl transition-all whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Repositories Grid with 3D InteractiveTiltCards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-40 rounded-3xl bg-white/90 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/20 p-6 animate-pulse flex flex-col justify-between"
              >
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, idx) => (
              <InteractiveTiltCard key={repo.id} delay={0.05 + idx * 0.04} className="p-6">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors font-display truncate">
                        {repo.name}
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {repo.description || 'Public repository by Masood Achakzai.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-blue-600 dark:text-sky-400">
                      {repo.language || `Repos (${profile?.public_repos ?? 0})`}
                    </span>
                    <div className="flex items-center gap-3 tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitBranch className="w-3.5 h-3.5" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              </InteractiveTiltCard>
            ))}
          </div>
        ) : (
          <InteractiveTiltCard className="p-7">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-sky-400">
                  <Code2 className="w-4 h-4" />
                  <span>VERIFIED GITHUB ACCOUNT · REPOSITORY INDEX</span>
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display">
                  Explore Source Code & Project Uploads on GitHub
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {apiError
                    ? `Live API notice: ${apiError}. View repositories directly on GitHub.`
                    : 'Public repositories are managed under github.com/masoodachakzai4-ui.'}
                </p>
              </div>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl whitespace-nowrap shrink-0"
              >
                <Github className="w-4 h-4" />
                <span>Open github.com/masoodachakzai4-ui</span>
              </a>
            </div>
          </InteractiveTiltCard>
        )}
      </div>
    </section>
  );
};
