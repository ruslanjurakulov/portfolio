'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Radio,
} from 'lucide-react';

interface TechItem {
  title: string;
  category: string;
  desc: string;
  metrics: string;
}

export const FeaturesTechStack: React.FC = () => {
  const { t } = useLanguage();

  const techIcons = [Layers, Code2, Sparkles, Zap, Cpu, Radio];
  const items: TechItem[] = t.features.items || [];

  return (
    <section id="features" className="relative py-24 bg-[#02050b] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.features.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-4">
            {t.features.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.features.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: TechItem, idx: number) => {
            const Icon = techIcons[idx] || Cpu;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-3xl bg-slate-900/50 hover:bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top neon border line */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 group-hover:border-cyan-500/40 text-cyan-400 group-hover:text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-cyan-400 uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/60 border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-mono font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Metrics Pill */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400/90 font-medium">
                    {item.metrics}
                  </span>
                  <span className="text-cyan-400/40 group-hover:text-cyan-400 text-xs font-mono transition-colors">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
