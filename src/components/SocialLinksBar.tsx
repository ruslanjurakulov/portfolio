'use client';

import React from 'react';
import {
  Youtube,
  Github,
  Mail,
  Instagram,
  Facebook,
} from 'lucide-react';

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  handle: string;
  color: string;
  borderColor: string;
  hoverGlow: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Custom crisp SVG components for X, Discord, Telegram, and Threads for exact brand fidelity
const XTwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const ThreadsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.095 5.467 0 12.186 0c6.643 0 11.96 5.176 12.186 11.758h-2.99c-.218-4.935-4.275-8.818-9.196-8.818-5.11 0-9.245 4.136-9.245 9.245 0 5.11 4.135 9.245 9.245 9.245 3.376 0 6.324-1.82 7.915-4.526l2.583 1.517C20.578 21.847 16.666 24 12.186 24zm1.515-6.07c-2.316 0-4.188-1.872-4.188-4.188 0-2.316 1.872-4.188 4.188-4.188 2.316 0 4.188 1.872 4.188 4.188 0 .84-.25 1.622-.682 2.274l-2.094-2.094a1.25 1.25 0 0 0-1.768 0 1.25 1.25 0 0 0 0 1.768l2.094 2.094c-.652.432-1.434.682-2.274.682zm0-2.94a1.248 1.248 0 1 0 0-2.496 1.248 1.248 0 0 0 0 2.496z" />
  </svg>
);

export const socialLinksData: SocialLinkItem[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@ruslan_jurakulov',
    handle: '@ruslan_jurakulov',
    color: 'text-red-400 hover:text-red-300',
    borderColor: 'hover:border-red-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]',
    icon: Youtube,
  },
  {
    id: 'discord',
    name: 'Discord',
    url: 'https://discord.gg/ruslanjurakulov',
    handle: 'ruslanjurakulov',
    color: 'text-indigo-400 hover:text-indigo-300',
    borderColor: 'hover:border-indigo-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]',
    icon: DiscordIcon,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    url: 'https://x.com/jurakulov_r',
    handle: '@jurakulov_r',
    color: 'text-cyan-300 hover:text-cyan-100',
    borderColor: 'hover:border-cyan-400/60',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(0,240,255,0.45)]',
    icon: XTwitterIcon,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    url: 'https://t.me/jurakulov_ruslan',
    handle: '@jurakulov_ruslan',
    color: 'text-sky-400 hover:text-sky-300',
    borderColor: 'hover:border-sky-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]',
    icon: TelegramIcon,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ruslanjurakulov',
    handle: 'ruslanjurakulov',
    color: 'text-emerald-400 hover:text-emerald-300',
    borderColor: 'hover:border-emerald-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]',
    icon: Github,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    url: 'mailto:ruslanjurakulov9@gmail.com',
    handle: 'ruslanjurakulov9@gmail.com',
    color: 'text-amber-400 hover:text-amber-300',
    borderColor: 'hover:border-amber-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]',
    icon: Mail,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/ruslanjurakulov',
    handle: '@ruslanjurakulov',
    color: 'text-pink-400 hover:text-pink-300',
    borderColor: 'hover:border-pink-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]',
    icon: Instagram,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/ruslanjurakulov',
    handle: 'ruslanjurakulov',
    color: 'text-blue-400 hover:text-blue-300',
    borderColor: 'hover:border-blue-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]',
    icon: Facebook,
  },
  {
    id: 'threads',
    name: 'Threads',
    url: 'https://threads.net/@ruslanjurakulov',
    handle: '@ruslanjurakulov',
    color: 'text-purple-400 hover:text-purple-300',
    borderColor: 'hover:border-purple-500/50',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]',
    icon: ThreadsIcon,
  },
];

interface SocialLinksBarProps {
  variant?: 'compact' | 'detailed' | 'grid';
  showLabels?: boolean;
}

export const SocialLinksBar: React.FC<SocialLinksBarProps> = ({
  variant = 'compact',
  showLabels = false,
}) => {
  if (variant === 'detailed') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full">
        {socialLinksData.map(item => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 ${item.borderColor} ${item.hoverGlow} transition-all duration-300 backdrop-blur-md overflow-hidden`}
            >
              {/* Corner cyan accent */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-cyan-400 to-transparent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-cyan-400 to-transparent" />
              </div>

              <div className={`p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/90 group-hover:border-cyan-500/40 ${item.color} transition-all duration-300`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400/50 group-hover:text-cyan-400 transition-colors">
                    ↗
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 truncate group-hover:text-slate-300">
                  {item.handle}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 py-2">
      {socialLinksData.map(item => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name}: ${item.handle}`}
            className={`group relative p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800/90 ${item.borderColor} ${item.hoverGlow} text-slate-400 ${item.color} transition-all duration-300 backdrop-blur-md flex items-center gap-2 shadow-lg`}
          >
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            {showLabels && (
              <span className="text-xs font-mono font-medium text-slate-300 group-hover:text-cyan-300 pr-1">
                {item.name}
              </span>
            )}
            {/* Ambient neon dot */}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#00f0ff]" />
          </a>
        );
      })}
    </div>
  );
};
