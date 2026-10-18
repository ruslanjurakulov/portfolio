'use client';

import { useEffect, useLayoutEffect } from 'react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Tiny progressive-enhancement helper, renders nothing.
 * - Adds `js` to <html>: only then does the CSS hide `.reveal` elements (no JS = everything visible).
 * - Marks `.reveal` elements `.in` as they scroll into view (CSS does the transition).
 * - Sets `data-scrolled` on <html> after the page scrolls, so the header can gain a background.
 * All motion itself lives in globals.css and is disabled under prefers-reduced-motion.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
    } else {
      const io2 = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              io2.unobserve(en.target);
            }
          }),
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      io = io2;
      const vh = window.innerHeight;
      // Already on screen at load: show immediately (no hidden first frame).
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in');
        else io2.observe(el);
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        root.toggleAttribute('data-scrolled', window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
