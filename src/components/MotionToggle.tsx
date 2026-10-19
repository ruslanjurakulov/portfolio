'use client';

import { useEffect, useState } from 'react';

const KEY = 'motion';

/**
 * Pause / resume all decorative animation (WCAG 2.2.2). The site already honours the OS setting
 * "reduce motion"; this button is for everyone else. State lives in <html class="mo"> (read by all
 * CSS) and in localStorage; the pre-paint script in the root layout applies it before first paint.
 */
export function MotionToggle({ label, className = '' }: { label: string; className?: string }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(!document.documentElement.classList.contains('mo'));
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !paused;
    root.classList.toggle('mo', !next);
    setPaused(next);
    try {
      window.localStorage.setItem(KEY, next ? 'off' : 'on');
    } catch {
      /* private mode or blocked storage: the choice just won't persist */
    }
  }

  const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false } as const;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={paused}
      title={label}
      className={`tool motion-toggle press ${className}`}
    >
      <svg {...svg} className="i-pause h-5 w-5">
        <path d="M9 5v14M15 5v14" />
      </svg>
      <svg {...svg} className="i-play h-5 w-5">
        <path d="M7 4.5v15l12-7.5z" />
      </svg>
    </button>
  );
}
