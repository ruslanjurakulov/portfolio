import type { Metadata, Viewport } from 'next';
import './globals.css';

// Canonical public address, used for share-preview (og:image) URLs. Set NEXT_PUBLIC_SITE_URL when a custom domain is connected.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-ruslan-jurakulov.vercel.app';

const title = 'Ruslan Jurakulov: web developer for small businesses';
const description =
  'Ruslan Jurakulov builds fast, modern websites for small businesses: landing pages, multi-language sites (uz/ru/en) and fixes. Founder of NightShift AI Studio. Based in Uzbekistan.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: 'Ruslan Jurakulov',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f1f5f2' },
    { media: '(prefers-color-scheme: dark)', color: '#090e0d' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-paint: apply a saved theme and decide whether motion is on (class `mo`) before first render. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement,o=false;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t;o=localStorage.getItem('motion')==='off'}catch(e){}try{if(!o&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('mo')}catch(e){}})()",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
