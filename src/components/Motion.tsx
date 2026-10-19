'use client';

import { useEffect, useLayoutEffect } from 'react';
import { observeReveals } from '@/lib/reveal';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Light progressive-enhancement helper for the concept demo pages, renders nothing.
 * - Adds `js` to <html>: only then (and only with motion on) does the CSS hide `.reveal` elements.
 * - Marks `.reveal` elements `.in` as they scroll into view.
 * The portfolio itself uses the fuller <Choreo /> instead.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    document.documentElement.classList.add('js');
    return observeReveals();
  }, []);
  return null;
}
