import type { Metadata } from 'next';
import { DemoBanner } from '@/components/DemoBanner';
import { Motion } from '@/components/Motion';
import { stagger } from '@/lib/stagger';

export const metadata: Metadata = {
  title: 'Nur Cafe (concept demo)',
  description: 'Concept demo: a fictional cafe landing page made as a sample by Ruslan Jurakulov. Not a real business.',
  openGraph: { title: 'Nur Cafe (concept demo)', description: 'A fictional cafe landing page, made as a sample.' },
};

const container = 'mx-auto w-full max-w-5xl px-4 sm:px-6';

const menu = [
  { name: 'Cardamom flat white', tag: 'Hot', text: 'Double espresso, silky milk and a pinch of cardamom.' },
  { name: 'Saffron honey latte', tag: 'Hot', text: 'Warm, floral and gently sweet. Our made-up signature.' },
  { name: 'Pomegranate tonic', tag: 'Cold', text: 'Sparkling tonic, pomegranate and a squeeze of lemon.' },
  { name: 'Pistachio croissant', tag: 'Pastry', text: 'Flaky layers with a green, nutty cream centre.' },
  { name: 'Walnut and date cake', tag: 'Pastry', text: 'Dense, moist and not too sweet. Good with black tea.' },
  { name: 'Mint tea for two', tag: 'Tea', text: 'A pot of black tea with fresh mint and two small glasses.' },
];

const hours = [
  ['Monday to Friday', '07:30 – 18:00'],
  ['Saturday', '08:30 – 20:00'],
  ['Sunday', '09:00 – 16:00'],
];

const field =
  'mt-1 block min-h-[48px] w-full rounded-xl border border-ink/40 bg-surface px-4 py-3 text-ink placeholder:text-muted';

function Cup() {
  return (
    <svg viewBox="0 0 320 300" className="float h-auto w-full" aria-hidden="true" focusable="false">
      <circle cx="160" cy="160" r="130" className="fill-soft" />
      <ellipse cx="160" cy="262" rx="110" ry="14" className="fill-ink" opacity="0.12" />
      <g className="stroke-muted" fill="none" strokeWidth="6" strokeLinecap="round">
        <path className="steam" d="M126 118c-12-16 12-26 0-44" />
        <path className="steam" d="M160 112c-12-16 12-26 0-44" />
        <path className="steam" d="M194 118c-12-16 12-26 0-44" />
      </g>
      <path d="M72 140h176v44a88 88 0 0 1-88 88 88 88 0 0 1-88-88z" className="fill-accent" />
      <path d="M248 156h14a28 28 0 0 1 0 56h-22" fill="none" className="stroke-accent" strokeWidth="14" />
      <ellipse cx="160" cy="140" rx="88" ry="14" className="fill-ink" opacity="0.85" />
      <path d="M140 140c8 6 32 6 40 0" className="stroke-soft" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function CafeDemo() {
  return (
    <div className="theme-cafe min-h-screen bg-bg text-ink">
      <Motion />
      <DemoBanner />

      <header className="border-b border-line">
        <div className={`${container} flex min-h-[64px] items-center justify-between gap-2`}>
          <a href="#top" className="inline-flex min-h-[44px] items-center whitespace-nowrap font-display text-2xl font-bold">
            Nur Cafe
          </a>
          <nav aria-label="Cafe" className="flex items-center">
            {[
              ['Menu', '#menu'],
              ['Hours', '#hours'],
              ['Visit', '#visit'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="inline-flex min-h-[44px] items-center px-3 text-sm font-semibold text-muted hover:text-ink sm:px-4 sm:text-base"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="top">
          <div className={`${container} grid items-center gap-8 py-12 md:grid-cols-2 md:py-20`}>
            <div>
              <p className="rise text-sm font-semibold uppercase tracking-[0.18em] text-accent" style={stagger(0)}>Coffee, tea and baking</p>
              <h1 className="rise mt-4 text-5xl font-bold leading-[1.05] sm:text-6xl" style={stagger(1)}>Slow mornings, good coffee.</h1>
              <p className="rise mt-5 max-w-md text-lg text-muted" style={stagger(2)}>
                A small neighbourhood cafe for long chats, quiet laptops and warm pastries. (An invented place, to show what a cafe site can look like.)
              </p>
              <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={stagger(3)}>
                <a
                  href="#menu"
                  className="lift press inline-flex min-h-[48px] items-center justify-center rounded-lg bg-accent px-6 font-semibold text-on-accent hover:opacity-90"
                >
                  See the menu
                </a>
                <a
                  href="#visit"
                  className="lift press inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-ink/70 px-6 font-semibold hover:bg-ink hover:text-bg"
                >
                  Find us
                </a>
              </div>
            </div>
            <div className="rise mx-auto w-full max-w-xs md:max-w-sm" style={stagger(2)}>
              <Cup />
            </div>
          </div>
        </section>

        <section id="menu" className="border-t border-line bg-soft">
          <div className={`${container} py-16 md:py-20`}>
            <h2 className="reveal text-4xl font-bold">Menu highlights</h2>
            <p className="mt-3 text-muted">A sample menu with invented items. No prices on this concept page.</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {menu.map((m, i) => (
                <li key={m.name} className="reveal" style={stagger(i % 3)}>
                  <div className="lift h-full rounded-xl border border-line bg-surface p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{m.tag}</span>
                  <h3 className="mt-2 text-2xl font-bold leading-tight">{m.name}</h3>
                  <p className="mt-2 text-muted">{m.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="border-t border-line">
          <div className={`${container} grid gap-6 py-16 md:grid-cols-2 md:py-20`}>
            <h2 className="reveal text-4xl font-bold">About Nur Cafe</h2>
            <div className="reveal space-y-4 text-lg text-muted" style={stagger(1)}>
              <p>
                Nur Cafe does not exist. It is a fictional business made up for this sample, so there is no real story, owner or address here.
              </p>
              <p>
                On a real project this section would hold the owner’s own words and photos: how the place started, what makes it different and who works there.
              </p>
            </div>
          </div>
        </section>

        <section id="hours" className="border-t border-line bg-soft">
          <div className={`${container} grid gap-8 py-16 md:grid-cols-2 md:py-20`}>
            <div>
              <h2 className="reveal text-4xl font-bold">Opening hours</h2>
              <p className="mt-3 text-muted">Sample hours for the concept.</p>
            </div>
            <dl className="reveal rounded-xl border border-line bg-surface px-6" style={stagger(1)}>
              {hours.map(([day, time]) => (
                <div key={day} className="flex items-baseline justify-between gap-4 border-b border-line py-4 last:border-0">
                  <dt className="font-semibold">{day}</dt>
                  <dd className="text-muted">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="visit" className="border-t border-line">
          <div className={`${container} grid gap-10 py-16 md:grid-cols-2 md:py-20`}>
            <div>
              <h2 className="reveal text-4xl font-bold">Visit and contact</h2>
              <p className="mt-4 text-lg text-muted">
                Address placeholder: your street, your city. There is no real address in this demo.
              </p>
              <svg
                viewBox="0 0 320 180"
                className="mt-6 h-auto w-full rounded-xl border border-line"
                role="img"
                aria-label="Placeholder map, not a real location"
              >
                <rect width="320" height="180" className="fill-soft" />
                <path d="M0 120h320M0 60h320M90 0v180M210 0v180" className="stroke-line" strokeWidth="10" />
                <path d="M160 40a22 22 0 0 1 22 22c0 18-22 42-22 42s-22-24-22-42a22 22 0 0 1 22-22z" className="fill-accent" />
                <circle cx="160" cy="62" r="8" className="fill-surface" />
              </svg>
            </div>
            <form className="reveal rounded-xl border border-line bg-surface p-6" style={stagger(1)} aria-describedby="demo-note">
              <div>
                <label htmlFor="c-name" className="font-semibold">
                  Name
                </label>
                <input id="c-name" name="name" type="text" autoComplete="name" className={field} />
              </div>
              <div className="mt-4">
                <label htmlFor="c-email" className="font-semibold">
                  Email
                </label>
                <input id="c-email" name="email" type="email" autoComplete="email" className={field} />
              </div>
              <div className="mt-4">
                <label htmlFor="c-msg" className="font-semibold">
                  Message
                </label>
                <textarea id="c-msg" name="message" rows={4} className={field} />
              </div>
              <button
                type="submit"
                disabled
                className="mt-6 inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-lg bg-muted/30 px-6 font-semibold text-muted"
              >
                Send message (disabled)
              </button>
              <p id="demo-note" className="mt-3 text-sm text-muted">
                Demo form, nothing is sent.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${container} py-8 text-sm text-muted`}>
          <p>Nur Cafe is a concept demo and a fictional business. Not a real cafe.</p>
        </div>
      </footer>
    </div>
  );
}
