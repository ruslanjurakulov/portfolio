'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import {
  Layers,
  Sparkles,
  Cpu,
  Mic,
  Activity,
  Box,
  Terminal,
  Compass,
  Zap,
} from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="overview" className="relative py-24 bg-[#02050b] overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.overview.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-4">
            {t.overview.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.overview.subtitle}
          </p>
        </div>

        {/* Narrative Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
            <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
              01 // THE VISION
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.overview.p1}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
            <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
              02 // HYBRID STACK
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.overview.p2}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
            <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
              03 // REAL-TIME HUD
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.overview.p3}
            </p>
          </div>
        </div>

        {/* Highlight Focus Cards: Next.js App Router & JarvisOrb UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Card 1: Next.js App Router Architecture */}
          <div className="group relative p-8 rounded-3xl bg-slate-900/60 hover:bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                  CORE INFRASTRUCTURE
                </span>
                <h3 className="text-xl font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {t.overview.cards.nextjsTitle}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
              {t.overview.cards.nextjsDesc}
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs text-slate-300">
              <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-300">
                React Server Components
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-300">
                Streaming SSR
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-300">
                Edge Handlers
              </span>
            </div>
          </div>

          {/* Card 2: Custom "JarvisOrb" Interactive UI */}
          <div className="group relative p-8 rounded-3xl bg-slate-900/60 hover:bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-500/20 transition-all" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/40 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-teal-400 font-bold uppercase">
                  3D INTERFACE ENGINEERING
                </span>
                <h3 className="text-xl font-mono font-bold text-white group-hover:text-teal-300 transition-colors">
                  {t.overview.cards.orbTitle}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
              {t.overview.cards.orbDesc}
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs text-slate-300">
              <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-teal-300">
                HTML5 Canvas 3D
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-teal-300">
                Orbital Mathematics
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-teal-300">
                Audio Waveform Sync
              </span>
            </div>
          </div>
        </div>

        {/* Architecture Section Hook */}
        <div id="architecture">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
};
