'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Monitor, Smartphone } from 'lucide-react';
import { WorkPreview, type PreviewKind } from './previews';

export type Shot = { src: string; width: number; height: number };
export type Shots = { desktop: Shot; phone: Shot };
type View = 'desktop' | 'phone';

// React 18 has no `inert` prop; the attribute is written as a plain string.
const INERT = { inert: '' as unknown as boolean };

const BASE = { desktop: { w: 1280 }, phone: { w: 390 } };

export type PreviewLabels = {
  group: string;
  phone: string;
  desktop: string;
  shotDesktop: string;
  shotPhone: string;
  open: string;
  newTab?: string;
};

type Props = {
  kind: PreviewKind;
  title: string;
  url: string;
  href: string;
  external: boolean;
  /** Same-origin page shown live inside the frames (concept demos). */
  demoSrc?: string;
  /** Real screenshots (live product). Without them the drawn placeholder is used. */
  shots?: Shots;
  labels: PreviewLabels;
};

function useBox() {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, box] as const;
}

// What is drawn inside one screen: screenshot, or drawn placeholder, plus a live iframe on top for demos.
function Screen({
  view,
  className,
  mount,
  demoSrc,
  title,
  kind,
  shot,
  alt,
  posterTitle,
}: {
  view: View;
  className: string;
  mount: boolean;
  demoSrc?: string;
  title: string;
  kind: PreviewKind;
  shot?: Shot;
  alt: string;
  posterTitle: string;
}) {
  const [ref, box] = useBox();
  const [loaded, setLoaded] = useState(false);
  const scale = box.w / BASE[view].w;
  return (
    <div ref={ref} className={`relative overflow-hidden bg-soft ${className}`}>
      {shot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover object-top"
        />
      ) : (
        <WorkPreview kind={kind} title={posterTitle} />
      )}
      {demoSrc && mount && box.w > 0 && (
        <div
          aria-hidden="true"
          {...INERT}
          className={`absolute inset-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <iframe
            src={demoSrc}
            title={title}
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute left-0 top-0 max-w-none border-0 bg-white"
            style={{ width: BASE[view].w, height: box.h / scale, transform: `scale(${scale})`, transformOrigin: '0 0' }}
          />
        </div>
      )}
    </div>
  );
}

export function DevicePreview({ kind, title, url, href, external, demoSrc, shots, labels }: Props) {
  // Desktop without JS and on wide screens; phone on narrow screens once JS is running.
  const [view, setView] = useState<View>('desktop');
  const [near, setNear] = useState(false);
  const [seen, setSeen] = useState<Record<View, boolean>>({ desktop: false, phone: false });
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (window.matchMedia('(max-width: 767px)').matches) setView('phone');
    } catch {
      /* keep desktop */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) setSeen((s) => (s[view] ? s : { ...s, [view]: true }));
  }, [view, ready]);

  // Start loading the live demo shortly before the card scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frame = (v: View) =>
    `frame absolute inset-0 ${view === v ? 'opacity-100 scale-100' : 'pointer-events-none scale-95 opacity-0'}`;
  const hidden = (v: View) => (view === v ? {} : { 'aria-hidden': true as const, ...INERT });

  const linkCls =
    'lift press inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-bold text-bg';
  const linkInner = (
    <>
      {labels.open}
      {external ? (
        <>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{labels.newTab}</span>
        </>
      ) : (
        <span aria-hidden="true">→</span>
      )}
    </>
  );

  return (
    <div ref={root} className="flex flex-col border-b border-line bg-surface lg:border-b-0 lg:border-r">
      <div className="relative aspect-square overflow-hidden bg-soft sm:aspect-[4/3] lg:aspect-auto lg:min-h-[26rem] lg:flex-1">
        {/* Desktop: browser frame */}
        <div className={frame('desktop')} {...hidden('desktop')}>
          <div className="flex h-full items-center justify-center p-4">
            <div className="w-full overflow-hidden rounded-xl border border-line bg-surface shadow-[0_18px_40px_-20px_rgb(0_0_0/0.45)]">
              <div className="flex items-center gap-1.5 bg-soft px-3 py-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="ml-2 min-w-0 truncate rounded-full bg-surface px-3 font-mono text-[11px] leading-5 text-muted">{url}</span>
              </div>
              <Screen
                view="desktop"
                className="aspect-[1280/800] w-full"
                mount={near && seen.desktop}
                demoSrc={demoSrc}
                title={`${title}, ${labels.desktop}`}
                kind={kind}
                shot={shots?.desktop}
                alt={labels.shotDesktop}
                posterTitle={title}
              />
            </div>
          </div>
        </div>

        {/* Phone: portrait device frame */}
        <div className={frame('phone')} {...hidden('phone')}>
          <div className="flex h-full items-center justify-center p-4">
            <div className="relative aspect-[390/844] h-full max-w-full rounded-[1.75rem] bg-[#15161c] p-[6px] shadow-[0_18px_40px_-20px_rgb(0_0_0/0.55)] ring-1 ring-line">
              <Screen
                view="phone"
                className="h-full w-full rounded-[1.35rem]"
                mount={near && seen.phone}
                demoSrc={demoSrc}
                title={`${title}, ${labels.phone}`}
                kind={kind}
                shot={shots?.phone}
                alt={labels.shotPhone}
                posterTitle={title}
              />
              <span aria-hidden="true" className="absolute left-1/2 top-[11px] h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/70" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2">
        <div role="group" aria-label={labels.group} className="flex rounded-full border border-line bg-surface p-0.5">
          {(['phone', 'desktop'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              aria-label={labels[v]}
              title={labels[v]}
              onClick={() => setView(v)}
              className={`press flex h-11 w-11 items-center justify-center rounded-full ${
                view === v ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {v === 'phone' ? <Smartphone className="h-5 w-5" aria-hidden="true" /> : <Monitor className="h-5 w-5" aria-hidden="true" />}
            </button>
          ))}
        </div>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
            {linkInner}
          </a>
        ) : (
          <Link href={href} className={linkCls}>
            {linkInner}
          </Link>
        )}
      </div>
    </div>
  );
}
