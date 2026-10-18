import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

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
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0e12' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-paint: apply a saved theme before first render so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
