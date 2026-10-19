import ReactDOM from 'react-dom';
import { Portfolio } from '@/components/Portfolio';

export default function Page() {
  // One self-hosted OFL variable font (Geologica). Only the Latin subset is preloaded, and only for this
  // page: the concept demos use their own system fonts.
  ReactDOM.preload('/fonts/geologica-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  // The first picture is the largest thing on the first screen: fetch it as early as the font.
  ReactDOM.preload('/work/nightshift-phone.webp', { as: 'image', type: 'image/webp', fetchPriority: 'high' });
  // Computed once at build time.
  return <Portfolio year={new Date().getFullYear()} />;
}
