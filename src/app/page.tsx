import ReactDOM from 'react-dom';
import { Portfolio } from '@/components/Portfolio';

export default function Page() {
  // One self-hosted OFL variable font (Geologica). Only the Latin subset is preloaded, and only for this
  // page: the concept demos use their own system fonts.
  ReactDOM.preload('/fonts/geologica-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  // Computed once at build time.
  return <Portfolio year={new Date().getFullYear()} />;
}
