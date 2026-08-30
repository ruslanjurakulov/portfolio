'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, Server, Cpu, Radio, Shield } from 'lucide-react';

interface PipelineStep {
  title: string;
  desc: string;
  tech: string;
}

export const ArchitectureDiagram: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const icons = [Mic, Server, Cpu, Radio];
  const steps: PipelineStep[] = t.architecture.steps || [];

  return (
    <div className="w-full rounded-2xl bg-slate-900/60 border border-cyan-500/20 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.08)]">
      {/* Top Architecture HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {t.architecture.sectionTag}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
            {t.architecture.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {t.architecture.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>ZERO-BUFFER STREAMING</span>
        </div>
      </div>

      {/* Step Selector & Pipeline Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        {steps.map((step: PipelineStep, idx: number) => {
          const Icon = icons[idx] || Cpu;
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`relative text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[160px] group ${
                isActive
                  ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60'
              }`}
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg border ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_#00f0ff]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-cyan-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-900 text-slate-500'
                }`}>
                  0{idx + 1}
                </span>
              </div>

              <div>
                <h4 className={`text-sm font-mono font-bold transition-colors ${
                  isActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'
                }`}>
                  {step.title}
                </h4>
                <span className="text-[11px] font-mono text-cyan-400/80 block mt-1">
                  {step.tech}
                </span>
              </div>

              {/* Connected Line Marker */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-[9px] text-cyan-400 font-mono">
                  →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Details Box */}
      {steps[activeStep] && (
        <div className="rounded-xl bg-slate-950/90 border border-cyan-500/30 p-5 backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hidden sm:block">
              {React.createElement(icons[activeStep] || Cpu, { className: 'w-6 h-6' })}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  STAGE 0{activeStep + 1} // PIPELINE DEEP DIVE
                </span>
                <span className="text-[10px] font-mono text-slate-500">•</span>
                <span className="text-xs font-mono text-emerald-400">STATUS: OPTIMIZED</span>
              </div>
              <h4 className="text-base sm:text-lg font-mono font-bold text-white mb-2">
                {steps[activeStep].title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {steps[activeStep].desc}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-cyan-300">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20">
                  STACK: {steps[activeStep].tech}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20 text-emerald-400">
                  LATENCY: &lt; 12ms
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
