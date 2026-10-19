'use client';

import { useEffect, useState } from 'react';

const KEY = 'theme';

/**
 * Light/dark toggle. Default follows the system (prefers-color-scheme); a click sets
 * <html data-theme> and remembers it in localStorage. The matching pre-paint script
 * lives in the root layout, so there is no flash of the wrong theme.
 */
export function ThemeToggle({ label, className = '' }: { label: string; className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const explicit = document.documentElement.dataset.theme;
    setDark(explicit ? explicit === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  function toggle() {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setDark(!dark);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* private mode or blocked storage: the choice just won't persist */
    }
  }

  const svg = { viewBox: '0 0 24 24', className: 'h-5 w-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false } as const;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      className={`tool press ${className}`}
    >
      <svg {...svg} className="i-moon h-5 w-5">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg {...svg} className="i-sun h-5 w-5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
