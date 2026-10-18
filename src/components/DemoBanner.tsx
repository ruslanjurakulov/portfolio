import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

// Slim, always-visible notice used on both concept demo pages.
export function DemoBanner() {
  return (
    <aside aria-label="Concept demo notice" className="on-dark bg-[#17181c] text-[#f4f3ee]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-1 text-sm sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <p>
            <strong className="font-semibold">Concept demo, fictional business.</strong>{' '}
            <span className="hidden lg:inline">Everything on this page is invented.</span>
          </p>
          <Link href="/" className="inline-flex min-h-[44px] items-center gap-1 font-medium underline underline-offset-4">
            <span aria-hidden="true">←</span> Back to Ruslan’s portfolio
          </Link>
        </div>
        <ThemeToggle label="Dark theme" className="border-[#f4f3ee]/40 text-[#f4f3ee] hover:bg-white/10" />
      </div>
    </aside>
  );
}
