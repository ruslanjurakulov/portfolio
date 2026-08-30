'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SocialLinksBar } from './SocialLinksBar';
import {
  Send,
  Mail,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  Radio,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#02050b] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.social.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-4">
            {t.social.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.social.subtitle}
          </p>
        </div>

        {/* 9 Social Platform Interactive Matrix */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest">
              {t.social.platformsTitle}
            </h3>
          </div>
          <SocialLinksBar variant="detailed" />
        </div>

        {/* Transmission Portal Form & Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Direct Channel Info Card */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-cyan-500/25 p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Lock className="w-4 h-4" />
                <span>SECURE COMMS PROTOCOL</span>
              </div>

              <h3 className="text-2xl font-mono font-bold text-white mb-3">
                {t.social.directTitle}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-8">
                {t.social.directDesc}
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                    <a
                      href="mailto:ruslanjurakulov9@gmail.com"
                      className="text-sm font-mono text-cyan-300 hover:underline font-semibold"
                    >
                      ruslanjurakulov9@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">TELEGRAM DESK</div>
                    <a
                      href="https://t.me/jurakulov_ruslan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-sky-300 hover:underline font-semibold"
                    >
                      @jurakulov_ruslan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>PGP ENCRYPTION // SHA-256 VERIFIED</span>
            </div>
          </div>

          {/* Interactive Transmission Form */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-cyan-500/25 p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {t.social.formName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {t.social.formEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@nexus.ai"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.social.formMessage}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Initiating communication regarding AI assistant architecture and collaboration..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white font-mono text-sm placeholder:text-slate-600 transition-all outline-none resize-none"
                />
              </div>

              {status === 'success' ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{t.social.formSuccess}</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-sm shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'sending' ? t.social.formSending : t.social.formSubmit}
                  </span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
