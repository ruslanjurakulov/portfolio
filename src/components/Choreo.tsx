'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { observeReveals } from '@/lib/reveal';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type RailItem = { id: string; label: string };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * The page's scroll and pointer choreography, one small engine instead of many listeners.
 * Renders the chrome it drives: top progress bar, section rail and the desktop cursor glow.
 *
 * Everything here is progressive enhancement and checks `html.mo` (motion on) when it acts:
 *  - scroll reveals (`.reveal`, `.rt`) get `.in` when they enter the viewport
 *  - `[data-scrub]` sections are measured; their `[data-p]` descendants get a CSS variable `--p` (0..1)
 *    that CSS turns into parallax / line drawing (written on the small consumers only, never on the
 *    whole section, so scrolling does not restyle big subtrees)
 *  - `[data-stack]` cards scale down and dim (inline styles on the card and its `.stack-dim` layer)
 *    while the next card slides over them
 *  - `[data-count]` numbers count up once, from 0 to their real value
 *  - `[data-magnetic]` buttons lean toward the pointer, `[data-spot]` cards get a pointer spotlight
 *  - looping animations inside `[data-live]` blocks are paused while the block is off screen (`data-off`)
 *  - the active section is marked with aria-current on `[data-nav]` links
 * Only transform / opacity / custom properties are written. Pointer effects exist for mouse only.
 */
export function Choreo({ rail }: { rail: RailItem[] }) {
  // Labels change with the language; the engine only cares about the ids.
  const ids = rail.map((r) => r.id).join(',');
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useIso(() => {
    const root = document.documentElement;
    const mo = () => root.classList.contains('mo');
    root.classList.add('js');
    const undo: (() => void)[] = [];

    // 1. Reveals
    undo.push(observeReveals('.reveal, .rt'));

    // 2. Reduced motion changed while the page is open: stop everything at once.
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onMq = () => mq.matches && root.classList.remove('mo');
      mq.addEventListener('change', onMq);
      undo.push(() => mq.removeEventListener('change', onMq));
    } catch {
      /* old browser: the CSS media query still applies */
    }

    // 3. Scroll loop: progress bar + rail, scrubbed elements, stacked cards
    const scrubs = Array.from(document.querySelectorAll<HTMLElement>('[data-scrub]'));
    const targets = new Map<HTMLElement, HTMLElement[]>(
      scrubs.map((el) => [el, Array.from(el.querySelectorAll<HTMLElement>('[data-p]'))]),
    );
    const live = new Set<HTMLElement>();
    const stack = document.querySelector<HTMLElement>('[data-stack]');
    let stackLive = true;
    let raf = 0;

    const resetStack = () => {
      if (!stack) return;
      Array.from(stack.children).forEach((li) => {
        const card = li.firstElementChild as HTMLElement | null;
        if (!card) return;
        card.style.transform = '';
        const dim = card.querySelector<HTMLElement>('.stack-dim');
        if (dim) dim.style.opacity = '';
      });
    };

    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      const sp = max > 0 ? clamp(y / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${sp.toFixed(4)})`;
      if (fill.current) fill.current.style.transform = `scaleY(${sp.toFixed(4)})`;
      root.toggleAttribute('data-scrolled', y > 8);
      if (!mo()) {
        resetStack();
        return;
      }

      live.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mode = el.dataset.scrub;
        let p: number;
        if (mode === 'exit') p = clamp(-r.top / Math.max(1, r.height)); // 0 at top of page, 1 once it has left
        else if (mode === 'through') p = clamp((vh * 0.78 - r.top) / Math.max(1, r.height * 0.8)); // line draws while the block crosses the screen
        else p = clamp((vh - r.top) / (vh + r.height)); // 0 entering, 1 leaving
        const v = p.toFixed(4);
        targets.get(el)?.forEach((t) => t.style.setProperty('--p', v));
      });

      if (stack && stackLive) {
        const items = Array.from(stack.children) as HTMLElement[];
        if (getComputedStyle(items[0]).position === 'sticky') {
          for (let i = 0; i < items.length - 1; i++) {
            const a = items[i].getBoundingClientRect();
            const b = items[i + 1].getBoundingClientRect();
            const p = clamp((a.bottom - b.top) / Math.max(1, a.height * 0.85));
            const card = items[i].firstElementChild as HTMLElement | null;
            if (card) {
              card.style.transform = `scale(${(1 - p * 0.045).toFixed(4)})`;
              const dim = card.querySelector<HTMLElement>('.stack-dim');
              if (dim) dim.style.opacity = (p * 0.5).toFixed(3);
            }
          }
        } else resetStack();
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.target === stack) stackLive = e.isIntersecting;
            else if (e.isIntersecting) live.add(e.target as HTMLElement);
            else live.delete(e.target as HTMLElement);
          });
          schedule();
        },
        { rootMargin: '120px 0px' },
      );
      scrubs.forEach((el) => io.observe(el));
      if (stack) io.observe(stack);
      undo.push(() => io.disconnect());
    } else {
      scrubs.forEach((el) => live.add(el));
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    undo.push(() => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    });
    schedule();

    // 3b. Looping animations only run while visible (keeps scrolling cheap on slow devices)
    const lives = Array.from(document.querySelectorAll<HTMLElement>('[data-live]'));
    if (lives.length && typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => (e.target as HTMLElement).toggleAttribute('data-off', !e.isIntersecting)),
        { rootMargin: '80px 0px' },
      );
      lives.forEach((el) => io.observe(el));
      undo.push(() => io.disconnect());
    }

    // 4. Active section -> aria-current on nav links
    const links = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
    if (typeof IntersectionObserver !== 'undefined') {
      const setActive = (id: string | null) =>
        links.forEach((a) => (a.dataset.nav === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
          // Back above the first section (hero): nothing is current.
          if (window.scrollY < 80) setActive(null);
        },
        { rootMargin: '-42% 0px -55% 0px' },
      );
      ids.split(',').forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
      undo.push(() => io.disconnect());
    }

    // 5. Counters: real numbers only (the value is in the markup); count up once when seen
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    if (counters.length && typeof IntersectionObserver !== 'undefined') {
      const run = (el: HTMLElement) => {
        const to = Number(el.dataset.count);
        if (!Number.isFinite(to) || !mo()) return;
        const t0 = performance.now();
        const d = 900;
        const tick = (now: number) => {
          const k = clamp((now - t0) / d);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
          else el.textContent = String(to);
        };
        el.textContent = '0';
        requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              io.unobserve(e.target);
              run(e.target as HTMLElement);
            }
          }),
        { threshold: 0.6 },
      );
      counters.forEach((el) => io.observe(el));
      undo.push(() => io.disconnect());
    }

    // 6. Pointer effects: mouse only (hover + fine pointer)
    let fine = false;
    try {
      fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    } catch {
      fine = false;
    }
    if (fine) {
      let gx = 0;
      let gy = 0;
      let tx = 0;
      let ty = 0;
      let graf = 0;
      let current: HTMLElement | null = null;
      const magnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));

      const glide = () => {
        graf = 0;
        gx += (tx - gx) * 0.14;
        gy += (ty - gy) * 0.14;
        if (glow.current) glow.current.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
        if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) graf = requestAnimationFrame(glide);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        if (!mo()) {
          glow.current?.classList.remove('on');
          if (current) current.style.translate = '';
          current = null;
          return;
        }
        tx = e.clientX;
        ty = e.clientY;
        if (glow.current && !glow.current.classList.contains('on')) {
          gx = tx;
          gy = ty;
          glow.current.classList.add('on');
        }
        if (!graf) graf = requestAnimationFrame(glide);

        // Magnetic: lean toward the pointer while it is near (40px margin) a magnetic element
        let hit: HTMLElement | null = null;
        for (const m of magnets) {
          const r = m.getBoundingClientRect();
          if (e.clientX > r.left - 40 && e.clientX < r.right + 40 && e.clientY > r.top - 40 && e.clientY < r.bottom + 40) {
            hit = m;
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            m.style.translate = `${clamp(dx * 0.22, -12, 12).toFixed(1)}px ${clamp(dy * 0.3, -9, 9).toFixed(1)}px`;
            break;
          }
        }
        if (current && current !== hit) current.style.translate = '';
        current = hit;

        // Spotlight inside the card under the pointer
        const spot = (e.target as Element).closest<HTMLElement>('[data-spot]');
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty('--sx', `${(e.clientX - r.left).toFixed(0)}px`);
          spot.style.setProperty('--sy', `${(e.clientY - r.top).toFixed(0)}px`);
        }
      };
      const onLeave = (e: MouseEvent) => {
        if (e.relatedTarget) return;
        glow.current?.classList.remove('on');
        if (current) current.style.translate = '';
        current = null;
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      undo.push(() => {
        document.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('mouseleave', onLeave);
        cancelAnimationFrame(graf);
        magnets.forEach((m) => (m.style.translate = ''));
      });
    }

    return () => undo.forEach((fn) => fn());
  }, [ids]);

  return (
    <>
      <div ref={bar} className="pbar" aria-hidden="true" />
      <nav className="rail" aria-hidden="true">
        <span className="rail-track">
          <span ref={fill} className="rail-fill" />
        </span>
        <ol className="m-0 list-none p-0">
          {rail.map((r) => (
            <li key={r.id}>
              <a href={`#${r.id}`} data-nav={r.id} tabIndex={-1}>
                <span className="rail-label">{r.label}</span>
                <span className="rail-dot" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div ref={glow} className="glow" aria-hidden="true" />
    </>
  );
}
