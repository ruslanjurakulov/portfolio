'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { JarvisOrbCanvas } from './JarvisOrbCanvas';
import {
  Play,
  Pause,
  Maximize2,
  ZoomIn,
  X,
  Sparkles,
  Terminal,
  Activity,
  Zap,
  Radio,
  FileImage,
  Video as VideoIcon,
  Shield,
  Layers,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

/**
 * ============================================================================
 * CRUCIAL: PROJECT MEDIA CONFIGURATION ARRAY
 * ============================================================================
 * Easily edit or add your media items here!
 * - type: 'video' | 'image'
 * - src: local file path (e.g., '/videos/my-video.mp4') or direct URL / web link
 * - poster: optional fallback thumbnail
 * - title & caption: descriptive information displayed on the card
 * ============================================================================
 */
export const projectMedia = [
  {
    id: 'media-1-video',
    type: 'video' as const,
    title: 'Dynamic AI Core Activation',
    caption:
      "Real-time demonstration of the central 3D holographic AI core. The glowing cyan orb pulsates and expands, visualizing the system's responsive processing state and interactive feedback.",
    src: '/videos/core-activation.mp4',
    poster: '/images/dashboard-screenshot.png',
    badge: 'DYNAMIC 3D ACTIVATION',
    aspectRatio: '16/9',
    tags: ['WebGL Hologram', 'Audio-Reactive', '60 FPS', 'Neural Pulse'],
  },
  {
    id: 'media-2-image',
    type: 'image' as const,
    title: 'Command Dashboard Overview',
    caption:
      'A detailed view of the system interface, featuring the modular side navigation (Live Status, Mission Control, Intelligence), voice transcription diagnostics, and the central data sphere.',
    fileRef: 'Снимок экрана 2026-08-30 200040.jpg',
    src: '/images/dashboard-screenshot.png',
    badge: 'COMMAND DASHBOARD HUD',
    aspectRatio: '16/9',
    tags: ['Modular Navigation', 'Voice Diagnostics', 'Holo Sphere', 'Terminal Bar'],
  },
];

export const MediaShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showScanlines, setShowScanlines] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<(typeof projectMedia)[0] | null>(null);

  const videoItem = projectMedia[0];
  const imageItem = projectMedia[1];

  const handlePulse = () => {
    setPulseCount(prev => prev + 1);
  };

  return (
    <section id="showcase" className="relative py-24 bg-[#02050b] overflow-hidden">
      {/* Background Cyber Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.media.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-4">
            {t.media.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            {t.media.subtitle}
          </p>
        </div>

        {/* Media Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* =========================================================================
              MEDIA ITEM 1 (VIDEO): Dynamic AI Core Activation in High-Tech Terminal
             ========================================================================= */}
          <div className="flex flex-col h-full rounded-3xl bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.12)] hover:shadow-[0_0_45px_rgba(0,240,255,0.25)] transition-all duration-300 backdrop-blur-xl overflow-hidden group">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-cyan-500/25">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500/90 border border-red-400/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/90 border border-yellow-400/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="ml-3 text-[11px] font-mono text-cyan-300 font-bold tracking-wider truncate">
                  {t.media.item1.terminalHeader}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="hidden sm:inline">STREAM: 60FPS</span>
              </div>
            </div>

            {/* Terminal Video & 3D Hologram Container */}
            <div className="relative w-full aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
              {/* Scanline CRT overlay */}
              {showScanlines && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-70" />
              )}

              {/* Interactive Core Hologram Canvas */}
              <JarvisOrbCanvas
                className="w-full h-full"
                interactive={isPlaying}
                pulseTrigger={pulseCount}
              />

              {/* Holographic HUD Corners & Frequency Graphs */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                  {t.media.item1.frequency}
                </div>
              </div>

              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <div className="px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-emerald-300 backdrop-blur-md">
                  {t.media.item1.resonance}
                </div>
              </div>

              {/* Interactive Video / Simulation Controls Bar */}
              <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between p-2 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-lg">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 transition-all flex items-center gap-1.5 text-xs font-mono"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">
                      {isPlaying ? t.media.item1.pauseVideo : t.media.item1.playVideo}
                    </span>
                  </button>

                  <button
                    onClick={handlePulse}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  >
                    <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>{t.media.item1.activatePulse}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowScanlines(!showScanlines)}
                    className={`px-2 py-1 rounded text-[10px] font-mono border transition-all ${
                      showScanlines
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    CRT: {showScanlines ? 'ON' : 'OFF'}
                  </button>

                  <button
                    onClick={() => setLightboxItem(videoItem)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800"
                    title="Fullscreen HUD"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Caption & Metadata */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {t.media.badgeTerminal}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <VideoIcon className="w-3.5 h-3.5 text-cyan-400" />
                    ITEM 01
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {t.media.item1.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {t.media.item1.caption}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {videoItem.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-500/20 text-[11px] font-mono text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              MEDIA ITEM 2 (IMAGE): Command Dashboard Overview Screenshot
             ========================================================================= */}
          <div className="flex flex-col h-full rounded-3xl bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.12)] hover:shadow-[0_0_45px_rgba(0,240,255,0.25)] transition-all duration-300 backdrop-blur-xl overflow-hidden group">
            {/* HUD Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-cyan-500/25">
              <div className="flex items-center gap-2">
                <FileImage className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono text-cyan-300 font-bold tracking-wider truncate">
                  FILE: {imageItem.fileRef}
                </span>
              </div>

              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                1920 × 1080 PNG
              </span>
            </div>

            {/* Image Preview Container with Click-to-Zoom Lightbox */}
            <div
              onClick={() => setLightboxItem(imageItem)}
              className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800/80 group/img"
            >
              <Image
                src={imageItem.src}
                alt={t.media.item2.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                priority
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Hover Inspection Overlay Pill */}
              <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                  <span>{t.media.item2.zoomHint}</span>
                </div>
              </div>

              {/* Corner UI Annotation Badges */}
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <span className="px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                  MODULAR HUD INTERFACE
                </span>
              </div>
            </div>

            {/* Image Caption & Metadata */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {t.media.badgeScreenshot}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <FileImage className="w-3.5 h-3.5 text-cyan-400" />
                    ITEM 02
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {t.media.item2.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-4">
                  {t.media.item2.caption}
                </p>

                {/* Dashboard Callout Highlights */}
                <div className="space-y-2 py-2">
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <span className="text-cyan-400 font-bold">■</span>
                    <span>{t.media.item2.navCallout}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <span className="text-cyan-400 font-bold">■</span>
                    <span>{t.media.item2.sphereCallout}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <span className="text-cyan-400 font-bold">■</span>
                    <span>{t.media.item2.voiceCallout}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {imageItem.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-500/20 text-[11px] font-mono text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FULLSCREEN HUD LIGHTBOX MODAL
         ========================================================================= */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900/95 border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.3)] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-cyan-500/25">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-mono font-bold text-white">
                  {lightboxItem.title}
                </span>
                {lightboxItem.fileRef && (
                  <span className="hidden sm:inline text-xs font-mono text-cyan-400/70">
                    [{lightboxItem.fileRef}]
                  </span>
                )}
              </div>

              <button
                onClick={() => setLightboxItem(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-300 text-xs font-mono transition-all"
              >
                <X className="w-4 h-4" />
                <span>{t.media.lightboxClose}</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="relative flex-1 min-h-[400px] max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
              {lightboxItem.type === 'image' ? (
                <div className="relative w-full h-full min-h-[420px]">
                  <Image
                    src={lightboxItem.src}
                    alt={lightboxItem.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-full h-full min-h-[420px] bg-radial from-slate-900 to-black flex items-center justify-center">
                  <JarvisOrbCanvas className="w-full h-full" interactive={true} />
                </div>
              )}
            </div>

            {/* Modal Caption Footer */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800">
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
