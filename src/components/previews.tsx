// Small inline-SVG previews for the Work cards and the hero. Decorative only.

export function HeroArt() {
  const stars: [number, number, number][] = [[146, 82, 1.4], [204, 96, 1.2], [152, 138, 1.1], [208, 150, 1.5], [180, 74, 1]];
  const phoneStars: [number, number, number][] = [[288, 132, 1.5], [366, 128, 1.2], [296, 196, 1.2], [372, 214, 1.6], [336, 140, 1]];
  return (
    <svg viewBox="0 0 420 340" className="float h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-night" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#051c20" />
          <stop offset="1" stopColor="#0f5f5a" />
        </linearGradient>
      </defs>
      {/* browser window: a video studio with a script, a vertical video and a timeline */}
      <rect x="10" y="20" width="330" height="240" rx="16" className="fill-surface stroke-line" strokeWidth="2" />
      <path d="M10 36a16 16 0 0 1 16-16h298a16 16 0 0 1 16 16v20H10z" className="fill-soft" />
      <circle cx="32" cy="38" r="5" className="fill-line" />
      <circle cx="50" cy="38" r="5" className="fill-line" />
      <circle cx="68" cy="38" r="5" className="fill-line" />
      <rect x="92" y="30" width="150" height="16" rx="8" className="fill-surface" />
      <text x="167" y="41.5" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9.5" className="fill-muted">
        nightshift-ai.studio
      </text>
      {/* steps */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${i * 30})`}>
          {i < 3 ? (
            <>
              <circle cx="34" cy="80" r="8" className="fill-accent" />
              <path d="m30.5 80 2.6 2.6 4.6-5" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-on-accent" />
            </>
          ) : (
            <circle cx="34" cy="80" r="7" className="fill-none stroke-line" strokeWidth="2" />
          )}
          <rect x="50" y="76" width={[62, 48, 56, 44][i]} height="8" rx="4" className={i < 3 ? 'fill-ink' : 'fill-line'} />
        </g>
      ))}
      {/* vertical video */}
      <rect x="130" y="66" width="92" height="152" rx="10" fill="url(#hero-night)" />
      <circle cx="176" cy="116" r="17" fill="#ccfbf1" />
      <circle cx="184" cy="110" r="15" fill="#0a3a3d" />
      {stars.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#ccfbf1" opacity="0.8" />
      ))}
      <rect x="142" y="178" width="68" height="9" rx="4.5" fill="#fff" opacity="0.92" />
      <rect x="152" y="193" width="48" height="9" rx="4.5" fill="#5eead4" />
      {/* timeline */}
      <rect x="26" y="232" width="296" height="16" rx="8" className="fill-soft" />
      <g className="fill-accent">
        {Array.from({ length: 24 }, (_, i) => (
          <rect key={i} x={32 + i * 8} y={240 - 2 - ((i * 7) % 5) * 1.6} width="3.4" height={4 + ((i * 7) % 5) * 3.2} rx="1.7" opacity={i < 15 ? 1 : 0.35} />
        ))}
      </g>
      {/* phone with the same video */}
      <rect x="262" y="104" width="132" height="226" rx="22" className="fill-surface stroke-ink" strokeWidth="3" />
      <rect x="272" y="114" width="112" height="206" rx="14" fill="url(#hero-night)" />
      <rect x="306" y="120" width="44" height="6" rx="3" fill="#000" opacity="0.5" />
      <circle cx="328" cy="178" r="26" fill="#ccfbf1" />
      <circle cx="340" cy="168" r="22" fill="#0a3a3d" />
      {phoneStars.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#ccfbf1" opacity="0.8" />
      ))}
      <rect x="284" y="254" width="88" height="11" rx="5.5" fill="#fff" opacity="0.92" />
      <rect x="296" y="271" width="64" height="11" rx="5.5" fill="#5eead4" />
      <rect x="284" y="298" width="88" height="4" rx="2" fill="#fff" opacity="0.25" />
      <rect x="284" y="298" width="46" height="4" rx="2" fill="#5eead4" />
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

export function WorkPreview({ kind, className = 'block h-auto w-full' }: { kind: PreviewKind; className?: string }) {
  return (
    <svg viewBox="0 0 320 180" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {kind === 'studio' && (
        <>
          <defs>
            <linearGradient id="wp-studio" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#051c20" />
              <stop offset="1" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#wp-studio)" />
          <rect x="116" y="14" width="88" height="128" rx="12" fill="#04191c" stroke="#5eead4" strokeWidth="2" />
          <circle cx="160" cy="68" r="20" fill="#5eead4" opacity="0.95" />
          <path d="M154 58l16 10-16 10z" fill="#04191c" />
          <rect x="128" y="104" width="64" height="9" rx="4.5" fill="#fff" opacity="0.9" />
          <rect x="140" y="118" width="40" height="9" rx="4.5" fill="#fff" opacity="0.6" />
          <g fill="#5eead4" opacity="0.85">
            {[22, 40, 58, 76, 94, 226, 244, 262, 280, 298].map((x, i) => (
              <rect key={x} x={x} y={90 - ((i * 13) % 30)} width="8" height={20 + ((i * 13) % 30) * 2} rx="4" transform="translate(0 -4)" />
            ))}
          </g>
          <rect x="24" y="156" width="272" height="6" rx="3" fill="#fff" opacity="0.25" />
          <rect x="24" y="156" width="150" height="6" rx="3" fill="#5eead4" />
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
