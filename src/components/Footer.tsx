'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SocialLinksBar } from './SocialLinksBar';
import { ArrowUp, Radio, Shield, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#010308] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background Cyber Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Footer Matrix: Brand, Quick Nav, Social Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 items-center">
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-mono font-bold shadow-[0_0_10px_#00f0ff]">
                R
              </div>
              <span className="font-mono font-bold text-lg text-white tracking-wider">
                R.U.S.L.A.N. // AI
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono max-w-sm mt-1">
              Personal Intelligence System engineered with Next.js App Router, 3D WebGL Hologram, and Bi-Directional Voice Pipeline.
            </p>
          </div>

          {/* Social Bar (9 Platforms Horizontal Bar) */}
          <div className="md:col-span-8 flex flex-col items-center md:items-end">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
              OFFICIAL TRANSMISSION CHANNELS
            </span>
            <SocialLinksBar variant="compact" />
          </div>
        </div>

        {/* Middle Navigation Fast Anchors */}
        <div className="py-6 border-b border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#overview" className="hover:text-cyan-300 transition-colors">
              {t.nav.overview}
            </a>
            <a href="#architecture" className="hover:text-cyan-300 transition-colors">
              {t.nav.architecture}
            </a>
            <a href="#showcase" className="hover:text-cyan-300 transition-colors">
              {t.nav.showcase}
            </a>
            <a href="#features" className="hover:text-cyan-300 transition-colors">
              {t.nav.features}
            </a>
            <a href="#terminal" className="hover:text-cyan-300 transition-colors">
              {t.nav.terminal}
            </a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">
              {t.nav.contact}
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 transition-all text-xs font-mono shadow-[0_0_10px_rgba(0,240,255,0.15)]"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Telemetry & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">{t.footer.systemTelemetry}</span>
          </div>

          <div className="text-center sm:text-right text-slate-400">
            {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
