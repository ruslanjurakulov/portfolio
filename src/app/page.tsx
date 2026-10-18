import { Portfolio } from '@/components/Portfolio';

export default function Page() {
  // Computed once at build time.
  return <Portfolio year={new Date().getFullYear()} />;
}
