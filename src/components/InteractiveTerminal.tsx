'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, CornerDownLeft, Trash2 } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'user' | 'system' | 'success' | 'warning' | 'info';
  text: string;
  time: string;
}

export const InteractiveTerminal: React.FC = () => {
  const { t } = useLanguage();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'INITIALIZING R.U.S.L.A.N. PERSONAL INTELLIGENCE KERNEL 2.6.4-STABLE...',
      time: '00:00:01',
    },
    {
      id: 'init-2',
      type: 'success',
      text: 'ALL TELEMETRY GAUGES ONLINE // VOICE SYNTHESIS READY // 3D CANVAS LINKED',
      time: '00:00:02',
    },
    {
      id: 'init-3',
      type: 'info',
      text: t.terminal.welcomeMsg,
      time: '00:00:03',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const getTimeString = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const time = getTimeString();
    const userLine: TerminalLine = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: `> ${cmd}`,
      time,
    };

    let responseLines: TerminalLine[] = [];

    switch (cleanCmd) {
      case 'help':
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'info',
            text: 'AVAILABLE SYSTEM COMMANDS:',
            time,
          },
          {
            id: `sys-${Date.now()}-2`,
            type: 'system',
            text: '  • status        : Query live CPU, memory, edge latency and core vitals',
            time,
          },
          {
            id: `sys-${Date.now()}-3`,
            type: 'system',
            text: '  • activate-core : Initiate 3D holographic neural core frequency pulse',
            time,
          },
          {
            id: `sys-${Date.now()}-4`,
            type: 'system',
            text: '  • diagnostics   : Run comprehensive diagnostic suite across all modules',
            time,
          },
          {
            id: `sys-${Date.now()}-5`,
            type: 'system',
            text: '  • voice-test    : Trigger Web Speech API voice synthesis test',
            time,
          },
          {
            id: `sys-${Date.now()}-6`,
            type: 'system',
            text: '  • scan          : Perform spatial radar sweep of active sensors',
            time,
          },
          {
            id: `sys-${Date.now()}-7`,
            type: 'system',
            text: '  • clear         : Clear terminal console history',
            time,
          },
        ];
        break;

      case 'status':
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'success',
            text: '== R.U.S.L.A.N. SYSTEM STATUS TELEMETRY ==',
            time,
          },
          {
            id: `sys-${Date.now()}-2`,
            type: 'info',
            text: '  • CORE STATE     : ACTIVE (99.98% uptime)',
            time,
          },
          {
            id: `sys-${Date.now()}-3`,
            type: 'info',
            text: '  • NEURAL LATENCY : 18ms (Edge Node: Global Mesh)',
            time,
          },
          {
            id: `sys-${Date.now()}-4`,
            type: 'info',
            text: '  • 3D MATRIX      : 14,400 coordinate particles @ 60.0 FPS',
            time,
          },
          {
            id: `sys-${Date.now()}-5`,
            type: 'info',
            text: '  • MEMORY VECTORS : 128,000 contextual token buffer',
            time,
          },
          {
            id: `sys-${Date.now()}-6`,
            type: 'info',
            text: '  • AUDIO SUBSYSTEM: SYNCHRONIZED [Web Speech API]',
            time,
          },
        ];
        break;

      case 'activate-core':
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'warning',
            text: '>> INITIATING RESONANCE OVERDRIVE SEQUENCE...',
            time,
          },
          {
            id: `sys-${Date.now()}-2`,
            type: 'success',
            text: '>> 3D HOLOGRAPHIC SPHERE EXPANDED TO 1.42x // FREQUENCY: 432.8 Hz',
            time,
          },
          {
            id: `sys-${Date.now()}-3`,
            type: 'info',
            text: '>> SYNAPSE CONDUCTION OPTIMAL. NEURAL CORE PULSING.',
            time,
          },
        ];
        break;

      case 'diagnostics':
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'system',
            text: 'RUNNING AUTOMATED DIAGNOSTIC SUITE...',
            time,
          },
          {
            id: `sys-${Date.now()}-2`,
            type: 'success',
            text: '[PASS] Next.js App Router Server Actions: 0.4ms latency',
            time,
          },
          {
            id: `sys-${Date.now()}-3`,
            type: 'success',
            text: '[PASS] Canvas 3D Orbital Calculations: 60 FPS verified',
            time,
          },
          {
            id: `sys-${Date.now()}-4`,
            type: 'success',
            text: '[PASS] Multi-Language i18n Dictionary: EN / RU / UZ loaded',
            time,
          },
          {
            id: `sys-${Date.now()}-5`,
            type: 'success',
            text: '[PASS] All 9 Social Network Transmission Gateways verified',
            time,
          },
        ];
        break;

      case 'voice-test':
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'info',
            text: 'VOICE SYNTHESIS TEST TRIGGERED:',
            time,
          },
          {
            id: `sys-${Date.now()}-2`,
            type: 'success',
            text: '"Greetings. I am R.U.S.L.A.N., your personal intelligence system. All commands operational."',
            time,
          },
        ];
        break;

      case 'scan':
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'system',
            text: 'COMMENCING 360° SPATIAL RADAR SWEEP...',
            time,
          },
          {
            id: `sys-${Date.now()}-2`,
            type: 'info',
            text: 'SECTOR A-01: CLEAR • SECTOR B-04: STABLE • CORE SYNAPSE: SECURE',
            time,
          },
        ];
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseLines = [
          {
            id: `sys-${Date.now()}-1`,
            type: 'warning',
            text: `COMMAND NOT RECOGNIZED: "${cmd}". Type "help" for valid commands.`,
            time,
          },
        ];
        break;
    }

    setHistory(prev => [...prev, userLine, ...responseLines]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const suggestions: string[] = t.terminal.suggestions || [];

  return (
    <section id="terminal" className="relative py-24 bg-[#02050b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.terminal.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-4">
            {t.terminal.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.terminal.subtitle}
          </p>
        </div>

        {/* Terminal Container */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden backdrop-blur-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/90" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
              <span className="ml-3 text-xs font-mono text-cyan-300 font-bold tracking-wider">
                {t.terminal.header}
              </span>
            </div>

            <button
              onClick={() => setHistory([])}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-xs flex items-center gap-1 font-mono transition-colors"
              title="Clear Console"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.terminal.btnClear}</span>
            </button>
          </div>

          {/* Console Log Body */}
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm h-[320px] sm:h-[380px] overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-cyan-500/30">
            {history.map((line: TerminalLine) => {
              let color = 'text-slate-300';
              if (line.type === 'user') color = 'text-cyan-300 font-bold';
              if (line.type === 'success') color = 'text-emerald-400 font-semibold';
              if (line.type === 'warning') color = 'text-amber-400';
              if (line.type === 'info') color = 'text-cyan-400/90';

              return (
                <div key={line.id} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[10px] text-slate-500 select-none">[{line.time}]</span>
                  <span className={`${color} break-words whitespace-pre-wrap flex-1`}>
                    {line.text}
                  </span>
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-5 py-2.5 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
              QUICK COMMANDS:
            </span>
            {suggestions.map((s: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleCommand(s)}
                className="px-2.5 py-1 rounded-md bg-slate-950/80 hover:bg-cyan-500/20 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 transition-all whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Command Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3.5 bg-slate-950 border-t border-cyan-500/20"
          >
            <span className="text-cyan-400 font-mono font-bold pl-2">&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={t.terminal.inputPlaceholder}
              className="flex-1 bg-transparent border-0 text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <span>{t.terminal.btnExecute}</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
