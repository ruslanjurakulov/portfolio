import type { Metadata } from 'next';

// Concept demos are samples, not real businesses: keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
