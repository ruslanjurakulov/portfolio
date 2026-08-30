'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { JarvisOrbCanvas } from './JarvisOrbCanvas';
import {
  Activity,
  Terminal as TerminalIcon,
  Play,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Radio,
  Cpu,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [pulseCount, setPulseCount] = useState(0);

  const handleTriggerPulse = () => {
    setPulseCount(prev => prev + 1);
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#02050b] via-[#040a17] to-[#02050b]">
      {/* Background Cyber Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Top Case Study Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-xl mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span className="text-xs font-mono font-semibold tracking-wider">
            {t.hero.badge}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Project Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-black tracking-tight text-white mb-3 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            {t.hero.title}
          </span>
        </h1>

        {/* Tagline */}
        <div className="text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400 font-semibold tracking-wide mb-6 flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
          <span>{t.hero.tagline}</span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>

        {/* Overview Description */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-10 text-balance">
          {t.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#overview"
            className="group relative px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-sm shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:bg-cyan-400 transition-all duration-300 flex items-center gap-2.5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Layers className="w-4 h-4" />
            <span>{t.hero.ctaCaseStudy}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#showcase"
            className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-cyan-300 font-mono font-bold text-sm border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>{t.hero.ctaShowcase}</span>
          </a>

          <a
            href="#terminal"
            className="px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white font-mono text-sm border border-slate-700/60 hover:border-slate-500 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
          >
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span>{t.hero.ctaTerminal}</span>
          </a>
        </div>

        {/* Central Holographic Showcase Showcase Container */}
        <div className="relative w-full max-w-5xl rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-cyan-500/10 shadow-[0_0_60px_rgba(0,240,255,0.2)]">
          {/* Glass Inner Frame */}
          <div className="relative w-full rounded-[22px] bg-slate-950/90 backdrop-blur-2xl border border-cyan-500/20 overflow-hidden">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400" />
                <span className="ml-3 text-xs font-mono text-cyan-400/90 font-semibold tracking-wider">
                  R.U.S.L.A.N. // HOLOGRAPHIC DATA CORE SIMULATION
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTriggerPulse}
                  className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>{t.hero.orbInstruction.split('•')[2] || 'PULSE'}</span>
                </button>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>3D GL: ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Canvas Interactive Viewport */}
            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] bg-radial from-slate-900/50 via-slate-950 to-[#02050b] flex items-center justify-center">
              <JarvisOrbCanvas
                className="w-full h-full"
                interactive={true}
                pulseTrigger={pulseCount}
              />

              {/* Hologram Overlay Telemetry Coordinates */}
              <div className="absolute top-6 left-6 pointer-events-none hidden md:flex flex-col gap-2 font-mono text-left">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
                  <div className="text-[10px] text-cyan-400/70">NEURAL CORE</div>
                  <div className="text-xs text-white font-bold">SYNAPSE 4.2</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
                  <div className="text-[10px] text-cyan-400/70">ORBITAL AXIS</div>
                  <div className="text-xs text-cyan-300 font-bold">360° DUAL ROTATION</div>
                </div>
              </div>

              <div className="absolute top-6 right-6 pointer-events-none hidden md:flex flex-col gap-2 font-mono text-right">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
                  <div className="text-[10px] text-emerald-400/80">LATENCY BENCHMARK</div>
                  <div className="text-xs text-emerald-300 font-bold">18 MS EDGE</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/20 backdrop-blur-md">
                  <div className="text-[10px] text-cyan-400/70">BUFFER CAPACITY</div>
                  <div className="text-xs text-cyan-300 font-bold">128K TOKENS</div>
                </div>
              </div>

              {/* Bottom Interactive Prompt */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/20 text-[11px] font-mono text-cyan-300/80 backdrop-blur-md">
                  {t.hero.orbInstruction}
                </div>
                <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                  {t.hero.orbInteractiveHint}
                </div>
              </div>
            </div>

            {/* Bottom HUD Telemetry Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan-500/20 border-t border-cyan-500/20">
              <div className="bg-slate-950/90 p-4 flex flex-col items-center sm:items-start text-left">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  {t.hero.statusCore}
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {t.hero.statusCoreVal}
                </span>
              </div>

              <div className="bg-slate-950/90 p-4 flex flex-col items-center sm:items-start text-left">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  {t.hero.statusLoad}
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white mt-0.5">
                  {t.hero.statusLoadVal}
                </span>
              </div>

              <div className="bg-slate-950/90 p-4 flex flex-col items-center sm:items-start text-left">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  {t.hero.statusLatency}
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-emerald-400 mt-0.5">
                  {t.hero.statusLatencyVal}
                </span>
              </div>

              <div className="bg-slate-950/90 p-4 flex flex-col items-center sm:items-start text-left">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  {t.hero.statusFps}
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-cyan-400 mt-0.5">
                  {t.hero.statusFpsVal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
