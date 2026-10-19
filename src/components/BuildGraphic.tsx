import type { CSSProperties, ReactNode } from 'react';
import './build-graphic.css';

const vars = (o: Record<string, string | number>) => o as CSSProperties;

/** One block of the page being assembled: it flies in (offset fx, fy, rotation fr), strokes draw, fills flood. */
function Block({ n, fx, fy, fr, children }: { n: number; fx: number; fy: number; fr: number; children: ReactNode }) {
  return (
    <g className={`bk b${n}`} style={vars({ '--fx': `${fx}px`, '--fy': `${fy}px`, '--fr': `${fr}deg` })}>
      {children}
    </g>
  );
}

// Every drawn shape: pathLength=1 lets CSS draw the stroke with one dash value.
const S = { pathLength: 1 } as const;

/**
 * Authored motion graphic: a page assembling itself from blocks on a blueprint ruler, then a scan
 * line passes over it, a check stamps in, and a 3-station timeline (the three steps of "How it
 * works") fills. One shared 10 s loop. Pure inline SVG + CSS keyframes (build-graphic.css and
 * globals.css). Decorative: hidden from assistive tech. Without motion it shows the finished page.
 */
export function BuildGraphic({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 430" className={`bgfx ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="bg-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.1" fill="rgb(var(--muted))" opacity="0.5" />
        </pattern>
        <linearGradient id="bg-scan" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgb(var(--accent))" stopOpacity="0" />
          <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* back layer: dot grid (parallax) */}
      <g data-p className="par-2">
        <rect x="10" y="10" width="500" height="350" fill="url(#bg-dots)" opacity="0.55" />
      </g>

      {/* registration marks + ruler */}
      <g className="marks">
        <path className="s g" {...S} d="M24 36V12h24M496 36V12h-24M24 336v24h24M496 336v24h-24" />
        <path className="s g" d="M60 22h400" style={{ strokeDasharray: '2 8' }} />
      </g>

      <g data-p className="par-3">
        {/* 0 nav */}
        <Block n={0} fx={-34} fy={-26} fr={-3}>
          <rect className="s k" {...S} x="60" y="44" width="400" height="28" rx="9" />
          <circle className="s a fx" {...S} cx="80" cy="58" r="6" />
          <rect className="s m fx" {...S} x="350" y="54" width="24" height="8" rx="4" />
          <rect className="s m fx" {...S} x="382" y="54" width="24" height="8" rx="4" />
          <rect className="s m fx" {...S} x="414" y="54" width="24" height="8" rx="4" />
        </Block>

        {/* 1 headline */}
        <Block n={1} fx={-44} fy={12} fr={2}>
          <rect className="s k fx" {...S} x="60" y="94" width="238" height="24" rx="7" />
          <rect className="s a fx" {...S} x="60" y="126" width="168" height="24" rx="7" />
        </Block>

        {/* 2 copy lines */}
        <Block n={2} fx={-28} fy={22} fr={0}>
          <rect className="s m fx" {...S} x="60" y="166" width="214" height="7" rx="3.5" />
          <rect className="s m fx" {...S} x="60" y="180" width="170" height="7" rx="3.5" />
        </Block>

        {/* 3 call to action */}
        <Block n={3} fx={-18} fy={34} fr={-2}>
          <rect className="s a fx" {...S} x="60" y="202" width="116" height="36" rx="18" />
          <path className="s k" {...S} style={{ stroke: 'rgb(var(--on-accent))' }} d="M132 220h24m-8-8 8 8-8 8" />
        </Block>

        {/* 4 hero visual: sun + signal arcs */}
        <Block n={4} fx={54} fy={-30} fr={4}>
          <rect className="s k" {...S} x="326" y="94" width="134" height="144" rx="18" />
          <circle className="s a fx" {...S} cx="380" cy="142" r="22" />
          <path className="s k" {...S} d="M338 214a42 42 0 0 1 84 0" />
          <path className="s k" {...S} d="M350 214a30 30 0 0 1 60 0" />
          <path className="s a" {...S} d="M362 214a18 18 0 0 1 36 0" />
        </Block>

        {/* 5-7 cards */}
        {[60, 198, 336].map((x, i) => (
          <Block key={x} n={5 + i} fx={0} fy={42} fr={i === 1 ? 0 : i === 0 ? -2 : 2}>
            <rect className="s k" {...S} x={x} y="262" width="124" height="58" rx="12" />
            <circle className="s a fx" {...S} cx={x + 20} cy="282" r="6" />
            <rect className="s k fx" {...S} x={x + 36} y="279" width="56" height="6" rx="3" />
            <rect className="s m fx" {...S} x={x + 16} y="298" width="86" height="6" rx="3" />
          </Block>
        ))}

        {/* 8 language chips */}
        <Block n={8} fx={0} fy={-22} fr={0}>
          {['UZ', 'RU', 'EN'].map((l, i) => (
            <g key={l}>
              <rect className="s k fs" {...S} x={332 + i * 42} y="226" width="38" height="22" rx="11" />
              <text className="chip" x={351 + i * 42} y="241" textAnchor="middle">
                {l}
              </text>
            </g>
          ))}
        </Block>
      </g>

      {/* scan line sweeping over the finished page */}
      <g data-p className="par-3">
        <g className="scan" style={{ opacity: 0 }}>
          <rect x="22" y="38" width="40" height="290" fill="url(#bg-scan)" />
          <path d="M62 34v298" stroke="rgb(var(--accent))" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* check stamp */}
      <g className="done">
        <circle className="s a" {...S} cx="486" cy="22" r="14" />
        <path className="s a" {...S} d="m479 22.5 5 5 9-10" />
      </g>

      {/* timeline: three stations = the three steps of "How it works" */}
      <g className="tl">
        <path className="s g" {...S} d="M60 392H460" />
        <path className="s a tl-fill" {...S} d="M60 392H460" />
        <circle className="s k fs" {...S} cx="60" cy="392" r="7" />
        <circle className="s a fx st1" {...S} cx="60" cy="392" r="7" />
        <circle className="s k fs" {...S} cx="260" cy="392" r="7" />
        <circle className="s a fx st2" {...S} cx="260" cy="392" r="7" />
        <circle className="s k fs" {...S} cx="460" cy="392" r="7" />
        <circle className="s a fx st3" {...S} cx="460" cy="392" r="7" />
        <text className="lbl" x="60" y="420" textAnchor="middle">
          01
        </text>
        <text className="lbl" x="260" y="420" textAnchor="middle">
          02
        </text>
        <text className="lbl" x="460" y="420" textAnchor="middle">
          03
        </text>
        <g className="ph">
          <circle cx="60" cy="392" r="12" fill="rgb(var(--accent))" opacity="0.25" />
          <circle cx="60" cy="392" r="4.5" fill="rgb(var(--accent))" />
        </g>
      </g>
    </svg>
  );
}
