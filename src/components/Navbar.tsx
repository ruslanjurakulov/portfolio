'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Cpu,
  Globe,
  Menu,
  X,
  ChevronDown,
  Terminal,
  Layers,
  Sparkles,
  Radio,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentLanguage, setLanguage, t, languages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#overview', label: t.nav.overview, icon: Layers },
    { href: '#architecture', label: t.nav.architecture, icon: Cpu },
    { href: '#showcase', label: t.nav.showcase, icon: ImageIcon },
    { href: '#features', label: t.nav.features, icon: Sparkles },
    { href: '#terminal', label: t.nav.terminal, icon: Terminal },
    { href: '#contact', label: t.nav.contact, icon: Share2 },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,240,255,0.08)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300">
            <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f0ff]" />
            <div className="absolute inset-0 rounded-xl border border-cyan-400/20 animate-ping opacity-25" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                R.U.S.L.A.N.
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">
                AI CORE
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400/80 group-hover:text-slate-300 transition-colors hidden sm:block">
              PERSONAL INTELLIGENCE SYSTEM
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          {navLinks.map(link => {
            return (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-200"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Status Badge & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
              {t.nav.statusActive}
            </span>
          </div>

          {/* Futuristic Language Selector */}
          <div className="relative">
            {/* Desktop Segmented Selector */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900/80 border border-cyan-500/25 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              {languages.map(lang => {
                const isActive = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`relative px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <span className="text-xs">{lang.flag}</span>
                    <span>{lang.short}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Dropdown Button */}
            <div className="md:hidden">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md"
              >
                <span>
                  {languages.find(l => l.code === currentLanguage)?.flag}
                </span>
                <span className="font-bold">
                  {languages.find(l => l.code === currentLanguage)?.short}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl p-1 z-50 animate-fadeIn">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-mono text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
