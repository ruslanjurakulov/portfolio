'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

export type Shot = { src: string; width: number; height: number };
export type StageProject = {
  title: string;
  status: string;
  phone: Shot;
  desktop: Shot;
  altPhone: string;
  altDesktop: string;
  /** Where the phone view starts, as a fraction of the screenshot's height (skips a header that is not worth showing large). */
  from?: number;
  /** The picture opens the project: the live site (new tab) or the concept demo. */
  href: string;
  external: boolean;
  linkLabel: string;
};
type View = 'phone' | 'desktop';

// React 18 has no `inert` prop; the attribute is written as a plain string.
const INERT = { inert: '' as unknown as boolean };

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/**
 * The owner's real screenshots, one layer per project.
 *
 * mode "sticky" (wide screens): the half of the screen that stays. As the text beside it moves from one
 *   project to the next, the picture changes with it. Elements of the text column opt in with
 *   data-stage="<project index>".
 * mode "solo" (phones and tablets): one picture inside its own project, in the flow of the page.
 *
 * In the phone view the screenshot scrolls itself, locked to the page's scroll (--pan, 0..1, written to the
 * visible layer only). Transform only; it stands still when animations are paused or reduced. Each project
 * has its own phone / desktop switch. Without script the first layer simply stays in place, fully visible.
 */
export function Stage({
  projects,
  labels,
  mode = 'sticky',
  className = '',
}: {
  projects: StageProject[];
  labels: { group: string; phone: string; desktop: string };
  mode?: 'sticky' | 'solo';
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [views, setViews] = useState<View[]>(() => projects.map(() => 'phone'));
  const root = useRef<HTMLDivElement>(null);
  const pic = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const viewsRef = useRef(views);
  viewsRef.current = views;

  useEffect(() => {
    const html = document.documentElement;
    const mo = () => html.classList.contains('mo');
    const chapters = mode === 'sticky' ? Array.from(document.querySelectorAll<HTMLElement>('[data-stage]')) : [];
    if (!root.current || !pic.current || (mode === 'sticky' && !chapters.length)) return;
    let raf = 0;

    // How far each phone screenshot can travel: from its start offset to its last row.
    const measure = () => {
      const h = pic.current?.clientHeight ?? 0;
      layers.current.forEach((l, i) => {
        const img = l?.querySelector<HTMLElement>('.shot-phone');
        if (!l || !img) return;
        const from = Math.max(0, Math.min(img.offsetHeight - h, (projects[i].from ?? 0) * img.offsetHeight));
        l.style.setProperty('--from', `${from}px`);
        l.style.setProperty('--range', `${Math.max(0, img.offsetHeight - h - from)}px`);
      });
    };

    const frame = () => {
      raf = 0;
      const box = root.current!.getBoundingClientRect();
      if (box.width === 0) return; // this stage is not shown at this width
      const vh = window.innerHeight;
      const y = window.scrollY;

      if (mode === 'solo') {
        const p = mo() && viewsRef.current[0] === 'phone' ? clamp((vh * 0.9 - box.top) / (vh * 0.9 + box.height * 0.2)) : 0;
        layers.current[0]?.style.setProperty('--pan', p.toFixed(4));
        return;
      }

      // The line the reader is "at": the middle of the screen beside the picture.
      const line = vh * 0.5;
      let cur = 0;
      const group: Record<number, { top: number; bottom: number }> = {};
      for (const el of chapters) {
        const i = Number(el.dataset.stage);
        const r = el.getBoundingClientRect();
        const g = group[i];
        group[i] = g ? { top: Math.min(g.top, r.top), bottom: Math.max(g.bottom, r.bottom) } : { top: r.top, bottom: r.bottom };
        if (r.top <= line) cur = i;
      }
      if (cur !== activeRef.current) {
        activeRef.current = cur;
        setActive(cur);
      }
      const g = group[cur];
      const layer = layers.current[cur];
      if (g && layer) {
        // 0 when the reader's line reaches the top of this project's text (or at the top of the page, for the
        // first), 1 when it reaches the bottom: the screenshot scrolls exactly as far as the reader has.
        const start = Math.max(0, g.top + y - line);
        const end = g.bottom + y - line;
        const p = mo() && viewsRef.current[cur] === 'phone' ? clamp((y - start) / Math.max(1, end - start)) : 0;
        layer.style.setProperty('--pan', p.toFixed(4));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(onResize);
      ro.observe(pic.current);
    }
    // Images arrive after the first measure.
    const imgs = Array.from(root.current.querySelectorAll('img'));
    imgs.forEach((img) => img.addEventListener('load', measure));
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      imgs.forEach((img) => img.removeEventListener('load', measure));
      ro?.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length, mode]);

  const setView = (i: number, v: View) => {
    setViews((cur) => cur.map((x, k) => (k === i ? v : x)));
    layers.current[i]?.style.setProperty('--pan', '0');
  };

  const cur = projects[active];

  return (
    <div ref={root} className={`stage ${mode === 'solo' ? 'stage-solo' : ''} ${className}`} data-active={active}>
      <div ref={pic} className="stage-pic">
        {projects.map((p, i) => {
          const pics = (
            <>
              {/* eslint-disable @next/next/no-img-element */}
              <img
                className="shot-phone"
                src={p.phone.src}
                width={p.phone.width}
                height={p.phone.height}
                alt={p.altPhone}
                aria-hidden={views[i] === 'phone' ? undefined : true}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                decoding="async"
              />
              <img
                className="shot-desk"
                src={p.desktop.src}
                width={p.desktop.width}
                height={p.desktop.height}
                alt={p.altDesktop}
                aria-hidden={views[i] === 'desktop' ? undefined : true}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
              {/* eslint-enable @next/next/no-img-element */}
            </>
          );
          const label = `${p.linkLabel}: ${p.title}`;
          const on = i === active;
          return (
            <div
              key={i}
              ref={(el) => {
                layers.current[i] = el;
              }}
              className="shot"
              data-on={on ? '' : undefined}
              data-view={views[i]}
              {...(on ? {} : { 'aria-hidden': true as const, ...INERT })}
            >
              {p.external ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="shot-link" aria-label={label} tabIndex={on ? 0 : -1}>
                  {pics}
                </a>
              ) : (
                <Link href={p.href} className="shot-link" aria-label={label} tabIndex={on ? 0 : -1}>
                  {pics}
                </Link>
              )}
            </div>
          );
        })}
        {mode === 'sticky' ? <span className="stage-veil" aria-hidden="true" /> : null}
      </div>
      <div className="stage-dock">
        <p className="stage-cap">
          <strong>{cur.title}</strong>
          <span>{cur.status}</span>
        </p>
        <div role="group" aria-label={labels.group} className="seg">
          {(['phone', 'desktop'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={views[active] === v}
              aria-label={labels[v]}
              title={labels[v]}
              onClick={() => setView(active, v)}
              className="seg-btn press"
            >
              {v === 'phone' ? <Smartphone className="h-5 w-5" aria-hidden="true" /> : <Monitor className="h-5 w-5" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
