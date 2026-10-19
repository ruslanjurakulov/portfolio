import type { CSSProperties } from 'react';

// Small hand-drawn line icons, one per service (same order as the dictionary). pathLength=1 lets
// CSS draw each stroke once when the card appears and again on hover.
const P = { pathLength: 1 } as const;

const ICONS: React.ReactNode[] = [
  // landing page: one long page with a header, a headline and a button
  <>
    <rect {...P} x="9" y="5" width="30" height="38" rx="5" />
    <path {...P} d="M9 14h30" />
    <path {...P} d="M15 22h14" />
    <path {...P} d="M15 28h9" />
    <rect {...P} x="15" y="34" width="12" height="4" rx="2" />
  </>,
  // small business site: a shopfront
  <>
    <path {...P} d="M6 19 10 8h28l4 11z" />
    <path {...P} d="M9 19v21h30V19" />
    <path {...P} d="M19 40V28h10v12" />
  </>,
  // multi-language: a globe
  <>
    <circle {...P} cx="24" cy="24" r="16" />
    <path {...P} d="M8 24h32" />
    <path {...P} d="M24 8c-7 8-7 24 0 32" />
    <path {...P} d="M24 8c7 8 7 24 0 32" />
  </>,
  // basic SEO and fast loading: a bolt
  <path {...P} d="M27 5 11 27h12l-2 16 16-23H25z" />,
  // fixes and changes: a wrench
  <path {...P} d="M33 7a10 10 0 0 0-9 13L8 36a4 4 0 0 0 5.5 5.5L29 25a10 10 0 0 0 13-9l-6.5 5-5.5-1-1-5.5z" />,
  // AI video: a frame with a play triangle and a spark
  <>
    <rect {...P} x="6" y="11" width="32" height="26" rx="6" />
    <path {...P} d="M18 18v12l10-6z" />
    <path {...P} d="M41 5v8M37 9h8" />
  </>,
];

export function ServiceIcon({ i, style }: { i: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className="ico text-accent" aria-hidden="true" focusable="false" style={style}>
      {ICONS[i % ICONS.length]}
    </svg>
  );
}
