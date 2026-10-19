'use client';

import { useEffect, useLayoutEffect } from 'react';
import { observeReveals } from '@/lib/reveal';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * The page's scroll choreography, one small engine, renders nothing.
 * Everything here is progressive enhancement. The CSS only hides or moves things while <html> has
 * `js` (set here, after hydration) and `mo` (motion on: set by the pre-paint script unless the visitor
 * asked for reduced motion or paused animations). Without them the page is complete and still.
 *  - `.rv` blocks and `.r-title` headings get `.in` once, when they scroll into view
 *  - `[data-scrub]` blocks get a CSS variable `--p` (0..1) while they cross the screen, which CSS turns into
 *    a bar that fills or a line that grows (written on that element only, transform-driven in CSS)
 *  - the section that is on screen is marked with aria-current on the matching `[data-nav]` link
 * The phone-screenshot stage has its own loop (see Stage).
 */
export function Choreo({ ids }: { ids: string[] }) {
  const key = ids.join(',');

  useIso(() => {
    const root = document.documentElement;
    const mo = () => root.classList.contains('mo');
    root.classList.add('js');
    const undo: (() => void)[] = [];

    // 1. Reveals
    undo.push(observeReveals('.rv, .r-title'));

    // 2. Reduced motion switched on while the page is open: stop everything at once.
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onMq = () => mq.matches && root.classList.remove('mo');
      mq.addEventListener('change', onMq);
      undo.push(() => mq.removeEventListener('change', onMq));
    } catch {
      /* old browser: the CSS media query still applies */
    }

    // 3. Scrubbed blocks
    const scrubs = Array.from(document.querySelectorAll<HTMLElement>('[data-scrub]'));
    const live = new Set<HTMLElement>();
    let raf = 0;
    const frame = () => {
      raf = 0;
      if (!mo()) return;
      const vh = window.innerHeight;
      live.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mode = el.dataset.scrub;
        // "through": 0 when the block's top reaches 80% of the screen, 1 when its bottom reaches 60%
        // "arrive": 0 when it enters at the bottom, 1 when its top is at 35% of the screen
        const p =
          mode === 'arrive'
            ? clamp((vh - r.top) / (vh * 0.65))
            : clamp((vh * 0.8 - r.top) / Math.max(1, r.height + vh * 0.8 - vh * 0.6));
        el.style.setProperty('--p', p.toFixed(4));
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    if (scrubs.length && typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => (e.isIntersecting ? live.add(e.target as HTMLElement) : live.delete(e.target as HTMLElement)));
          schedule();
        },
        { rootMargin: '80px 0px' },
      );
      scrubs.forEach((el) => io.observe(el));
      undo.push(() => io.disconnect());
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    undo.push(() => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    });
    schedule();

    // 4. Current section -> aria-current on the nav links
    const links = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
    if (links.length && typeof IntersectionObserver !== 'undefined') {
      const setActive = (id: string | null) =>
        links.forEach((a) => (a.dataset.nav === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
          if (window.scrollY < 80) setActive(null);
        },
        { rootMargin: '-42% 0px -55% 0px' },
      );
      key.split(',').forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
      undo.push(() => io.disconnect());
    }

    return () => undo.forEach((fn) => fn());
  }, [key]);

  return null;
}
