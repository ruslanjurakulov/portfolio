/**
 * PROJECT MEDIA CONFIGURATION
 * -------------------------------------------------------------
 * Easily add or edit your media assets below!
 * Supported types: 'video' | 'image'
 * For videos: specify 'src' (local path like '/videos/my-video.mp4' or web URL/YouTube/Vimeo embed)
 * For images: specify 'src' (local path like '/images/screenshot.jpg' or web URL)
 * -------------------------------------------------------------
 */

export interface ProjectMediaItem {
  id: string;
  type: 'video' | 'image';
  title: string;
  caption: string;
  src: string;
  poster?: string;
  badge?: string;
  tags?: string[];
  fileRef?: string;
  aspectRatio?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projectMedia: ProjectMediaItem[] = [
  {
    id: 'media-1-video',
    type: 'video',
    title: 'Dynamic AI Core Activation',
    caption: "Real-time demonstration of the central 3D holographic AI core. The glowing cyan orb pulsates and expands, visualizing the system's responsive processing state and interactive feedback.",
    src: '/videos/core-activation.mp4',
    poster: '/images/dashboard-screenshot.png',
    badge: '3D HOLOGRAPHIC CORE',
    tags: ['WebGL Shaders', 'Audio Reactive', '60 FPS', 'Real-Time Neural Feedback'],
    aspectRatio: '16/9',
    metrics: [
      { label: 'RENDER FREQUENCY', value: '60.0 FPS' },
      { label: 'HOLO MATRIX DENSITY', value: '14,400 PTS' },
      { label: 'AUDIO COGNITION SYNC', value: '< 2.4 ms' },
      { label: 'STATE', value: 'NOMINAL / ACTIVE' }
    ]
  },
  {
    id: 'media-2-image',
    type: 'image',
    title: 'Command Dashboard Overview',
    caption: 'A detailed view of the system interface, featuring the modular side navigation (Live Status, Mission Control, Intelligence), voice transcription diagnostics, and the central data sphere.',
    src: '/images/dashboard-screenshot.png',
    fileRef: 'Снимок экрана 2026-08-30 200040.jpg',
    badge: 'MISSION CONTROL HUD',
    tags: ['Modular Sidebar', 'Voice Diagnostics', 'Data Sphere HUD', 'Control Bar'],
    aspectRatio: '16/9',
    metrics: [
      { label: 'UI ARCHITECTURE', value: 'Next.js App Router' },
      { label: 'MODULES', value: '6 Telemetry Panels' },
      { label: 'AUDIO SUBSYSTEM', value: 'Web Speech API' },
      { label: 'COLOR SPECTRUM', value: 'Cyan Neon #00f0ff' }
    ]
  }
];
