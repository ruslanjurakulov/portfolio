import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Ruslan AI Assistant // R.U.S.L.A.N. Personal Intelligence System',
  description: 'Futuristic portfolio case study for R.U.S.L.A.N. Personal Intelligence System - a voice and chat-enabled AI assistant built with Next.js App Router, 3D WebGL Hologram, and bi-directional speech diagnostics.',
  keywords: ['Ruslan AI', 'Jarvis Orb', 'Next.js App Router', '3D Hologram WebGL', 'AI Assistant Case Study', 'Ruslan Jurakulov'],
  authors: [{ name: 'Ruslan Jurakulov' }],
};

export const viewport: Viewport = {
  themeColor: '#02050b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#02050b] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
