'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LANGS, dict, type Lang } from '@/data/i18n';
import { site } from '@/data/site';
import { stagger } from '@/lib/stagger';
import { LinkIcon } from './icons';
import { Motion } from './Motion';
import { ThemeToggle } from './ThemeToggle';
import { DevicePreview, type Shots } from './DevicePreview';
import { HeroArt, type PreviewKind } from './previews';

const STORAGE_KEY = 'lang';
const isLang = (v: unknown): v is Lang => v === 'en' || v === 'ru' || v === 'uz';

const container = 'mx-auto w-full max-w-5xl px-4 sm:px-6';
const section = 'py-16 md:py-24';
const h2 = 'text-3xl font-extrabold tracking-tight sm:text-4xl';
const lead = 'mt-3 max-w-2xl text-lg text-muted';
const card = 'rounded-2xl border border-line bg-surface p-6';
const iconBtn =
  'lift press inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-accent text-on-accent shadow-[0_8px_20px_-10px_rgb(var(--accent)/0.9)] hover:brightness-110';
const btnPrimary =
  'group lift press inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-accent px-7 text-lg font-bold text-on-accent shadow-[0_12px_30px_-14px_rgb(var(--accent)/0.8)] hover:opacity-95';
const btnOutline =
  'lift press inline-flex min-h-[56px] items-center justify-center rounded-full border-2 border-ink/70 px-7 text-lg font-semibold hover:bg-ink hover:text-bg';

// Real screenshots of the live site. Set to null to fall back to the drawn placeholder.
const studioShots: Shots | null = null;

const work: { kind: PreviewKind; live: boolean; href: string; url: string; demo?: string; shots?: Shots }[] = [
  { kind: 'studio', live: true, href: site.studio.url, url: 'nightshift-ai.studio', shots: studioShots ?? undefined },
  { kind: 'cafe', live: false, href: '/demos/cafe', url: '/demos/cafe', demo: '/demos/cafe' },
  { kind: 'freelancer', live: false, href: '/demos/freelancer', url: '/demos/freelancer', demo: '/demos/freelancer' },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Portfolio({ year }: { year: number }) {
  const [lang, setLang] = useState<Lang>('en');
  const [fading, setFading] = useState(false);
  const [bar, setBar] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Pick the language after mount: ?lang= wins, then localStorage, default English.
  useEffect(() => {
    let next: Lang = 'en';
    try {
      const q = new URLSearchParams(window.location.search).get('lang');
      if (isLang(q)) next = q;
      else {
        const s = window.localStorage.getItem(STORAGE_KEY);
        if (isLang(s)) next = s;
      }
    } catch {
      /* storage or URL unavailable: stay on English */
    }
    setLang(next);
    return () => window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Mobile call-to-action bar: shown once the hero button has scrolled away, hidden at the contact section.
  useEffect(() => {
    const hero = document.getElementById('hero-cta');
    const contact = document.getElementById('contact');
    if (!hero || !contact || typeof IntersectionObserver === 'undefined') return;
    let heroVisible = true;
    let contactVisible = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroVisible = e.isIntersecting;
        else contactVisible = e.isIntersecting;
      });
      setBar(!heroVisible && !contactVisible);
    });
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  function choose(next: Lang) {
    if (next === lang) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    try {
      const url = new URL(window.location.href);
      if (next === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', next);
      window.history.replaceState(null, '', url);
    } catch {
      /* ignore */
    }
    // Short cross-fade; skipped entirely for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLang(next);
      return;
    }
    setFading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setLang(next);
      setFading(false);
    }, 160);
  }

  const t = dict[lang];
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(t.hero.emailSubject)}&body=${encodeURIComponent(t.hero.emailBody)}`;
  const plainMail = `mailto:${site.email}`;
  const tg = site.telegramUrl;
  const navIds = ['work', 'services', 'process', 'faq', 'contact'] as const;

  return (
    <>
      <Motion />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent"
      >
        {t.skip}
      </a>

      <header className="site-header sticky top-0 z-30">
        <div className={`${container} flex h-16 items-center justify-between gap-3`}>
          <a href="#top" className="group inline-flex min-h-[44px] items-center gap-2.5 whitespace-nowrap font-display text-base font-bold tracking-tight">
            <span
              aria-hidden="true"
              className="tilt flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-[0.95rem] font-extrabold tracking-tighter text-on-accent"
            >
              RJ
            </span>
            <span className="max-[400px]:sr-only">{site.name}</span>
          </a>
          <nav aria-label="Main" className="hidden items-center lg:flex">
            {navIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="navlink inline-flex min-h-[44px] items-center whitespace-nowrap px-4 pb-1 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
          <ThemeToggle label={t.themeLabel} className="border-line bg-surface text-ink hover:text-accent" />
          <div role="group" aria-label={t.langLabel} className="flex items-center rounded-full border border-line bg-surface p-0.5">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                lang={l.code}
                title={l.name}
                aria-pressed={lang === l.code}
                onClick={() => choose(l.code)}
                className={`press min-h-[44px] min-w-[44px] rounded-full px-2 text-sm font-semibold ${
                  lang === l.code ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          </div>
        </div>
      </header>

      <main id="main" className={`lang-fade ${fading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero */}
        <section id="top" className="relative overflow-hidden">
          <div aria-hidden="true" className="blob pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
          <div aria-hidden="true" className="blob blob-2 pointer-events-none absolute -left-40 top-1/2 h-[340px] w-[340px] rounded-full bg-accent/[0.06] blur-3xl" />
          <div className={`${container} relative grid items-center gap-10 pb-14 pt-6 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-16`}>
            <div>
              <p className="rise flex items-center gap-3 font-mono text-sm font-semibold text-accent" style={stagger(0)}>
                <span aria-hidden="true" className="h-0.5 w-8 shrink-0 rounded bg-accent" />
                {t.hero.eyebrow}
              </p>
              <h1
                className="rise mt-4 text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
                style={stagger(1)}
              >
                {t.hero.title}
              </h1>
              <p className="rise mt-5 max-w-xl text-lg text-muted sm:text-xl" style={stagger(2)}>
                {t.hero.sub}
              </p>
              <div className="rise mt-7 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row" style={stagger(3)}>
                <a id="hero-cta" href={tg} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  {t.hero.cta}
                  <span className="nudge-x" aria-hidden="true">
                    →
                  </span>
                </a>
                <a href="#work" className={btnOutline}>
                  {t.hero.ctaWork}
                </a>
              </div>
              <p className="rise mt-3 text-sm text-muted" style={stagger(4)}>
                {t.hero.note}
              </p>
            </div>
            <div className="rise mx-auto w-full max-w-sm md:max-w-none" style={stagger(4)}>
              <HeroArt />
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-line">
          <div className={`${container} ${section}`}>
            <h2 className={`reveal ${h2}`}>{t.work.title}</h2>
            <p className={`reveal ${lead}`} style={stagger(1)}>
              {t.work.intro}
            </p>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {work.map((c, i) => {
                const text = t.work.cards[i];
                const big = i === 0;
                const cta = (
                  <>
                    {text.cta}
                    {c.live ? (
                      <>
                        <span className="nudge-up" aria-hidden="true">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                        <span className="sr-only">{t.work.newTab}</span>
                      </>
                    ) : (
                      <span className="nudge-x" aria-hidden="true">
                        →
                      </span>
                    )}
                  </>
                );
                const ctaCls = `${btnPrimary} mt-6 self-start max-sm:w-full`;
                return (
                  <li key={text.title} className={`reveal ${big ? 'md:col-span-2' : ''}`} style={stagger(i + 2)}>
                    <article
                      className={`group lift flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface ${
                        big ? 'md:grid md:grid-cols-2' : ''
                      }`}
                    >
                      <DevicePreview
                        kind={c.kind}
                        title={text.title}
                        url={c.url}
                        href={c.href}
                        external={c.live}
                        demoSrc={c.demo}
                        shots={c.shots}
                        tall={big}
                        labels={{ ...t.work.preview, open: text.cta, newTab: t.work.newTab }}
                      />
                      <div className="flex flex-1 flex-col p-6 sm:p-8">
                        <span
                          className={`self-start rounded-full px-3 py-1 text-xs font-bold ${
                            c.live ? 'bg-accent text-on-accent' : 'border border-line bg-soft text-ink'
                          }`}
                        >
                          {c.live ? t.work.live : t.work.concept}
                        </span>
                        <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{text.title}</h3>
                        <dl className="mt-5 flex-1 space-y-4">
                          {(['problem', 'built', 'tools', 'shows'] as const).map((k) => (
                            <div key={k}>
                              <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">{t.work.labels[k]}</dt>
                              <dd className="mt-1 text-base text-muted">{text[k]}</dd>
                            </div>
                          ))}
                        </dl>
                        {c.live ? (
                          <a href={c.href} target="_blank" rel="noopener noreferrer" className={ctaCls}>
                            {cta}
                          </a>
                        ) : (
                          <Link href={c.href} className={ctaCls}>
                            {cta}
                          </Link>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t border-line bg-soft/60">
          <div className={`${container} ${section}`}>
            <h2 className={`reveal ${h2}`}>{t.services.title}</h2>
            <p className={`reveal ${lead}`} style={stagger(1)}>
              {t.services.intro}
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.services.items.map((s, i) => (
                <li key={s.title} className="reveal" style={stagger(i % 3)}>
                  <div className={`${card} lift h-full`}>
                    <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                    <p className="mt-2 text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section id="process" className="border-t border-line">
          <div className={`${container} ${section}`}>
            <h2 className={`reveal ${h2}`}>{t.process.title}</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="reveal" style={stagger(i)}>
                  <div className="flex gap-4 md:block">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xl font-extrabold text-on-accent">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold md:mt-4">{s.title}</h3>
                      <p className="mt-2 text-muted">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why work with me */}
        <section id="why" className="border-t border-line bg-soft/60">
          <div className={`${container} ${section}`}>
            <h2 className={`reveal ${h2}`}>{t.why.title}</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {t.why.items.map((s, i) => (
                <li key={s.title} className="reveal" style={stagger(i % 2)}>
                  <div className={`${card} lift flex h-full gap-4`}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Check />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                      <p className="mt-1 text-muted">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-line">
          <div className={`${container} grid gap-8 ${section} md:grid-cols-[1.3fr_0.7fr]`}>
            <div className="reveal">
              <h2 className={h2}>{t.about.title}</h2>
              <p className="mt-5 font-display text-xl font-bold leading-snug sm:text-2xl">{t.about.pitch}</p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {t.about.paragraphs.map((p, i) => (
                  <p key={i}>{i === 0 ? renderStudio(p) : p}</p>
                ))}
              </div>
            </div>
            <dl className="reveal self-start rounded-2xl border border-line bg-surface p-6" style={stagger(1)}>
              {t.about.facts.map((f) => (
                <div key={f.label} className="border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line bg-soft/60">
          <div className={`${container} ${section}`}>
            <h2 className={`reveal ${h2}`}>{t.faq.title}</h2>
            <div className="mt-8 max-w-3xl space-y-3">
              {t.faq.items.map((f, i) => (
                <details key={f.q} className="group reveal rounded-2xl border border-line bg-surface" style={stagger(i)}>
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 text-base text-muted sm:text-lg">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-line">
          <div className={`${container} ${section}`}>
            <h2 className={`reveal ${h2}`}>{t.contact.title}</h2>
            <p className={`reveal ${lead}`} style={stagger(1)}>
              {t.contact.text}
            </p>
            <div className="reveal mt-8 flex flex-col gap-3" style={stagger(2)}>
            <a
              href={tg}
              target="_blank"
              rel="noopener noreferrer"
              className="group lift press flex flex-col gap-1 rounded-3xl bg-accent px-6 py-7 text-on-accent hover:opacity-95 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            >
              <span className="inline-flex items-center gap-3 text-base font-bold uppercase tracking-wider">
                <span className="tilt">
                  <LinkIcon id="telegram" />
                </span>
                {t.contact.telegramCta}
              </span>
              <span className="break-all text-lg font-bold sm:text-2xl">@{site.telegramUser}</span>
            </a>
            <a
              href={mail}
              className="group lift press flex flex-col gap-1 rounded-3xl bg-accent px-6 py-7 text-on-accent hover:opacity-95 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            >
              <span className="inline-flex items-center gap-3 text-base font-bold uppercase tracking-wider">
                <span className="tilt">
                  <LinkIcon id="email" />
                </span>
                {t.contact.emailCta}
              </span>
              <span className="break-all text-lg font-bold sm:text-2xl">{site.email}</span>
            </a>
            </div>
            <p className="reveal mt-10 text-sm font-medium text-muted" style={stagger(3)}>
              {t.contact.channels}
            </p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {site.links.map((l, i) => (
                <li key={l.id} className="reveal" style={stagger(i % 3)}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group lift press flex min-h-[56px] items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2"
                  >
                    <span className="tilt text-accent">
                      <LinkIcon id={l.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-tight">{l.label}</span>
                      <span className="block truncate text-sm text-muted">{l.handle}</span>
                    </span>
                    <span className="sr-only">{t.work.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${container} py-8 max-md:pb-28`}>
          <nav aria-label={t.contact.title}>
            <ul className="grid max-w-xs grid-cols-4 justify-items-start gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <li>
                <a href={plainMail} aria-label={`${t.contact.title}: ${site.email}`} title={site.email} className={iconBtn}>
                  <LinkIcon id="email" />
                </a>
              </li>
              {site.links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${l.label} ${t.work.newTab}`}
                    title={l.label}
                    className={iconBtn}
                  >
                    <LinkIcon id={l.id} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. {t.footer.rights}
            </p>
            <p>{t.footer.built}</p>
          </div>
        </div>
      </footer>

      {/* Compact mobile call-to-action bar (does not cover content: footer has matching padding) */}
      <aside
        aria-label={t.hero.cta}
        aria-hidden={!bar}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 pt-3 backdrop-blur transition-[transform,visibility] duration-300 md:hidden ${
          bar ? 'visible translate-y-0' : 'invisible translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a href={tg} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} w-full`} tabIndex={bar ? 0 : -1}>
          {t.hero.cta}
          <span className="nudge-x" aria-hidden="true">
            →
          </span>
        </a>
      </aside>
    </>
  );
}

// Link the studio name inside the first About paragraph.
function renderStudio(text: string) {
  const name = site.studio.name;
  const i = text.indexOf(name);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a
        href={site.studio.url}
        target="_blank"
        rel="noopener noreferrer"
        className="ulink font-semibold text-accent"
      >
        {name}
      </a>
      {text.slice(i + name.length)}
    </>
  );
}
