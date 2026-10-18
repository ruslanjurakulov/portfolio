// Small inline-SVG previews for the Work cards and the hero. Decorative only.

export function HeroArt() {
  return (
    <svg viewBox="0 0 420 340" className="float h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0.95" />
          <stop offset="1" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      {/* browser window */}
      <rect x="10" y="20" width="330" height="240" rx="16" className="fill-surface stroke-line" strokeWidth="2" />
      <path d="M10 36a16 16 0 0 1 16-16h298a16 16 0 0 1 16 16v20H10z" className="fill-soft" />
      <circle cx="32" cy="38" r="5" className="fill-line" />
      <circle cx="50" cy="38" r="5" className="fill-line" />
      <circle cx="68" cy="38" r="5" className="fill-line" />
      <rect x="34" y="80" width="170" height="14" rx="7" className="fill-ink" />
      <rect x="34" y="104" width="120" height="14" rx="7" className="fill-ink" />
      <rect x="34" y="136" width="230" height="8" rx="4" className="fill-line" />
      <rect x="34" y="152" width="200" height="8" rx="4" className="fill-line" />
      <rect x="34" y="190" width="96" height="30" rx="15" className="fill-accent" />
      <rect x="142" y="190" width="80" height="30" rx="15" className="fill-none stroke-line" strokeWidth="2" />
      <rect x="236" y="76" width="86" height="104" rx="12" fill="url(#hero-g)" />
      <circle cx="279" cy="116" r="16" className="fill-surface" opacity="0.9" />
      <path d="M252 168c8-20 20-26 27-26s19 6 27 26z" className="fill-surface" opacity="0.9" />
      {/* phone */}
      <rect x="262" y="104" width="132" height="226" rx="22" className="fill-surface stroke-ink" strokeWidth="3" />
      <rect x="306" y="112" width="44" height="6" rx="3" className="fill-ink" />
      <rect x="278" y="136" width="100" height="70" rx="12" fill="url(#hero-g)" />
      <rect x="278" y="220" width="84" height="10" rx="5" className="fill-ink" />
      <rect x="278" y="240" width="100" height="6" rx="3" className="fill-line" />
      <rect x="278" y="254" width="72" height="6" rx="3" className="fill-line" />
      <rect x="278" y="280" width="100" height="28" rx="14" className="fill-accent" />
      {/* language chips */}
      <g fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fontWeight="700">
        <rect x="18" y="282" width="44" height="28" rx="14" className="fill-surface stroke-line" strokeWidth="2" />
        <text x="40" y="301" textAnchor="middle" className="fill-ink">UZ</text>
        <rect x="70" y="282" width="44" height="28" rx="14" className="fill-surface stroke-line" strokeWidth="2" />
        <text x="92" y="301" textAnchor="middle" className="fill-ink">RU</text>
        <rect x="122" y="282" width="44" height="28" rx="14" className="fill-surface stroke-line" strokeWidth="2" />
        <text x="144" y="301" textAnchor="middle" className="fill-ink">EN</text>
      </g>
    </svg>
  );
}

export type PreviewKind = 'studio' | 'cafe' | 'freelancer';

export function WorkPreview({ kind }: { kind: PreviewKind }) {
  return (
    <svg viewBox="0 0 320 180" className="block h-auto w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {kind === 'studio' && (
        <>
          <defs>
            <linearGradient id="wp-studio" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1b1a4a" />
              <stop offset="1" stopColor="#4b2bb8" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#wp-studio)" />
          <rect x="116" y="14" width="88" height="128" rx="12" fill="#0d0e24" stroke="#a5b4fc" strokeWidth="2" />
          <circle cx="160" cy="68" r="20" fill="#a5b4fc" opacity="0.95" />
          <path d="M154 58l16 10-16 10z" fill="#0d0e24" />
          <rect x="128" y="104" width="64" height="9" rx="4.5" fill="#fff" opacity="0.9" />
          <rect x="140" y="118" width="40" height="9" rx="4.5" fill="#fff" opacity="0.6" />
          <g fill="#a5b4fc" opacity="0.85">
            {[22, 40, 58, 76, 94, 226, 244, 262, 280, 298].map((x, i) => (
              <rect key={x} x={x} y={90 - ((i * 13) % 30)} width="8" height={20 + ((i * 13) % 30) * 2} rx="4" transform="translate(0 -4)" />
            ))}
          </g>
          <rect x="24" y="156" width="272" height="6" rx="3" fill="#fff" opacity="0.25" />
          <rect x="24" y="156" width="150" height="6" rx="3" fill="#a5b4fc" />
        </>
      )}
      {kind === 'cafe' && (
        <>
          <rect width="320" height="180" fill="#fbf3e6" />
          <rect x="0" y="0" width="320" height="26" fill="#f4e4ca" />
          <rect x="16" y="9" width="52" height="8" rx="4" fill="#2b1d14" />
          <rect x="226" y="9" width="24" height="8" rx="4" fill="#6a5648" opacity="0.6" />
          <rect x="260" y="9" width="24" height="8" rx="4" fill="#6a5648" opacity="0.6" />
          <rect x="20" y="52" width="140" height="14" rx="7" fill="#2b1d14" />
          <rect x="20" y="74" width="100" height="14" rx="7" fill="#2b1d14" />
          <rect x="20" y="102" width="150" height="7" rx="3.5" fill="#6a5648" opacity="0.5" />
          <rect x="20" y="116" width="120" height="7" rx="3.5" fill="#6a5648" opacity="0.5" />
          <rect x="20" y="138" width="70" height="22" rx="11" fill="#a8431f" />
          <circle cx="248" cy="104" r="52" fill="#f4e4ca" />
          <path d="M222 92h52v14a26 26 0 0 1-26 26 26 26 0 0 1-26-26z" fill="#a8431f" />
          <path d="M274 98h6a8 8 0 0 1 0 16h-8" fill="none" stroke="#a8431f" strokeWidth="5" />
          <path d="M238 80c-4-6 4-10 0-16m16 16c-4-6 4-10 0-16" fill="none" stroke="#6a5648" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </>
      )}
      {kind === 'freelancer' && (
        <>
          <rect width="320" height="180" fill="#f5f5f7" />
          <rect x="22" y="26" width="132" height="86" rx="10" fill="#ff5a5f" stroke="#0b0b0f" strokeWidth="3" />
          <circle cx="88" cy="69" r="22" fill="#ffe14d" stroke="#0b0b0f" strokeWidth="3" />
          <rect x="170" y="44" width="74" height="74" rx="10" fill="#ffe14d" stroke="#0b0b0f" strokeWidth="3" />
          <path d="M184 104l23-44 23 44z" fill="#0b0b0f" />
          <rect x="258" y="26" width="40" height="40" rx="20" fill="#0b0b0f" />
          <rect x="22" y="130" width="120" height="14" rx="7" fill="#0b0b0f" />
          <rect x="22" y="152" width="84" height="8" rx="4" fill="#0b0b0f" opacity="0.35" />
          <rect x="226" y="136" width="72" height="26" rx="13" fill="#0b0b0f" />
        </>
      )}
    </svg>
  );
}

// Browser-style frame around a preview: gives the Work cards a "real site" feel.
export function Frame({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-b border-line bg-surface ${className}`}>
      <div className="flex items-center gap-1.5 bg-soft px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 min-w-0 truncate rounded-full bg-surface px-3 py-0.5 font-mono text-xs text-muted">{url}</span>
      </div>
      <div className="flex-1 overflow-hidden bg-soft md:flex md:items-center">
        <div className="zoom w-full">{children}</div>
      </div>
    </div>
  );
}
