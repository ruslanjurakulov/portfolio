'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProjectOverview } from '@/components/ProjectOverview';
import { MediaShowcase } from '@/components/MediaShowcase';
import { FeaturesTechStack } from '@/components/FeaturesTechStack';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#02050b] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Top HUD Navigation Bar */}
      <Navbar />

      {/* Hero Section with Interactive 3D Jarvis Hologram */}
      <Hero />

      {/* Project Overview & Architecture Deep-Dive */}
      <ProjectOverview />

      {/* Dynamic Media Showcase (Video Terminal & Dashboard Screenshot) */}
      <MediaShowcase />

      {/* Core Capabilities & Tech Stack Grid */}
      <FeaturesTechStack />

      {/* Interactive System CLI Console */}
      <InteractiveTerminal />

      {/* Social Links Matrix & Secure Transmission Contact Portal */}
      <ContactSection />

      {/* Cyber Telemetry Footer */}
      <Footer />
    </main>
  );
}
