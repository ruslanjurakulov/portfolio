import type { CSSProperties } from 'react';

// Index used by the CSS to stagger reveal / entrance delays (--i * 70-90ms).
export const stagger = (i: number) => ({ ['--i' as string]: i }) as CSSProperties;
