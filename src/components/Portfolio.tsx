'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LANGS, dict, type Lang } from '@/data/i18n';
import { site } from '@/data/site';
import { stagger } from '@/lib/stagger';
import { BuildGraphic } from './BuildGraphic';
import { Choreo } from './Choreo';
import { DevicePreview, type Shots } from './DevicePreview';
import { LinkIcon } from './icons';
import { Counter, Rotator, Split } from './Kinetic';
import { MotionToggle } from './MotionToggle';
import { type PreviewKind } from './previews';
import { ServiceIcon } from './ServiceIcon';
import { ThemeToggle } from './ThemeToggle';

const STORAGE_KEY = 'lang';
const isLang = (v: unknown): v is Lang => v === 'en' || v === 'ru' || v === 'uz';

const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6';
const section = 'py-20 md:py-28';
const lead = 'mt-5 max-w-2xl text-lg text-muted';
const iconBtn =
  'lift press inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-accent text-on-accent shadow-[0_8px_20px_-10px_rgb(var(--accent)/0.9)] hover:brightness-110';
const btnPrimary =
  'group shine lift press inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-accent px-7 text-lg font-bold text-on-accent shadow-[0_12px_30px_-14px_rgb(var(--accent)/0.8)] hover:opacity-95';
const btnOutline =
  'lift press inline-flex min-h-[56px] items-center justify-center rounded-full border-2 border-ink/70 px-7 text-lg font-semibold hover:bg-ink hover:text-bg';

// Real screenshots of the live site.
const studioShots: Shots = {
  desktop: { src: '/work/nightshift-desktop.webp', width: 1280, height: 800 },
  phone: { src: '/work/nightshift-phone.webp', width: 780, height: 1688 },
};

const work: { kind: PreviewKind; live: boolean; href: string; url: string; demo?: string; shots?: Shots }[] = [
  { kind: 'studio', live: true, href: site.studio.url, url: 'nightshift-ai.studio', shots: studioShots },
  { kind: 'cafe', live: false, href: '/demos/cafe', url: '/demos/cafe', demo: '/demos/cafe' },
  { kind: 'freelancer', live: false, href: '/demos/freelancer', url: '/demos/freelancer', demo: '/demos/freelancer' },
];

const cssVar = (o: Record<string, string | number>) => o as CSSProperties;

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="ico !h-5 !w-5 !stroke-[3]" aria-hidden="true" focusable="false">
      <path pathLength={1} d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Section title block: index, title (words rise in), drawn rule. Optional intro line. */
function SectionHead({ idx, title, intro }: { idx: string; title: string; intro?: string }) {
  return (
    <header className="rt relative z-[1]">
      <p className="sh-idx" aria-hidden="true">
        {idx} /
      </p>
      <h2 className="sh-title mt-3 max-w-3xl">
        <Split text={title} />
      </h2>
      <span className="sh-line" aria-hidden="true" />
      {intro ? (
        <p className={`reveal ${lead}`} style={stagger(2)}>
          {intro}
        </p>
      ) : null}
    </header>
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
    // Short cross-fade; skipped entirely when motion is off.
    if (!document.documentElement.classList.contains('mo')) {
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
  const rail = [
    { id: 'work', label: t.work.title },
    { id: 'services', label: t.services.title },
    { id: 'process', label: t.process.title },
    { id: 'why', label: t.why.title },
    { id: 'about', label: t.about.title },
    { id: 'faq', label: t.faq.title },
    { id: 'contact', label: t.contact.title },
  ];
  // The only numbers on the page, each counted from real data.
  const liveCount = work.filter((w) => w.live).length;
  const stats = [
    { n: LANGS.length, label: t.stats.languages },
    { n: t.process.steps.length, label: t.stats.steps },
    { n: liveCount, label: t.stats.live },
    { n: work.length - liveCount, label: t.stats.concept },
  ];

  return (
    <>
      <Choreo rail={rail} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent"
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
                data-nav={id}
                className="navlink inline-flex min-h-[44px] items-center whitespace-nowrap px-4 pb-1 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <MotionToggle label={t.motionLabel} className="border-line bg-surface text-ink hover:text-accent" />
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
        <section id="top" data-scrub="exit" data-live className="relative overflow-clip">
          <div aria-hidden="true" data-p className="hero-grid par-2" />
          <div className={`${container} relative grid items-center gap-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8 lg:pb-24 lg:pt-14`}>
            <div>
              <p className="rise flex items-center gap-3 font-mono text-sm font-semibold text-accent" style={stagger(0)}>
                <span aria-hidden="true" className="live-dot shrink-0" />
                {t.hero.eyebrow}
              </p>
              <h1 key={`h-${lang}`} className="hero-title mt-5">
                <Split text={t.hero.title} accent={t.hero.titleAccent} />
              </h1>
              <div key={`r-${lang}`} className="rise mt-6" style={stagger(3)}>
                <Rotator lead={t.hero.build} words={t.hero.words} />
              </div>
              <p className="rise mt-5 max-w-xl text-lg text-muted sm:text-xl" style={stagger(4)}>
                {t.hero.sub}
              </p>
              <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={stagger(5)}>
                <a id="hero-cta" data-magnetic href={tg} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  {t.hero.cta}
                  <span className="nudge-x" aria-hidden="true">
                    →
                  </span>
                </a>
                <a data-magnetic href="#work" className={btnOutline}>
                  {t.hero.ctaWork}
                </a>
              </div>
              <p className="rise mt-3 text-sm text-muted" style={stagger(6)}>
                {t.hero.note}
              </p>
            </div>
            <div className="rise mx-auto w-full max-w-md lg:max-w-none" style={stagger(2)}>
              <BuildGraphic className="block h-auto w-full" />
            </div>
          </div>
        </section>

        {/* Services ticker (the same list as "What I can do"; the second copy is for the loop only) */}
        <section aria-label={t.services.title} data-live className="overflow-hidden py-6">
          <div className="mq -mx-8 w-[calc(100%+4rem)] -rotate-[1.2deg]">
            <div className="mq-track">
              <ul className="mq-list">
                {t.services.items.map((s, i) => (
                  <li key={i}>{s.title}</li>
                ))}
              </ul>
              <ul className="mq-list mq-dup" aria-hidden="true">
                {t.services.items.map((s, i) => (
                  <li key={i}>{s.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* At a glance: true counts only */}
        <section aria-label={t.stats.label} className={`${container} pb-4 pt-8 md:pt-12`}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={i} className="reveal" style={stagger(i)}>
                <Counter value={s.n} />
                <p className="mt-2 max-w-[16ch] text-base font-medium text-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section id="work" data-scrub="full" className="relative overflow-clip">
          <span className="bgnum" data-p aria-hidden="true">
            01
          </span>
          <div className={`${container} ${section} relative`}>
            <SectionHead idx="01" title={t.work.title} intro={t.work.intro} />
            <ul data-stack className="stack mt-12">
              {work.map((c, i) => {
                const text = t.work.cards[i];
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
                  <li key={i} className="reveal" style={cssVar({ '--k': i })}>
                    <article
                      data-spot
                      className="stack-card group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-accent/60 lg:grid lg:grid-cols-[1.08fr_0.92fr]"
                    >
                      <span aria-hidden="true" className="stack-dim" />
                      <DevicePreview
                        kind={c.kind}
                        title={text.title}
                        url={c.url}
                        href={c.href}
                        external={c.live}
                        demoSrc={c.demo}
                        shots={c.shots}
                        labels={{ ...t.work.preview, open: text.cta, newTab: t.work.newTab }}
                      />
                      <div className="relative z-[1] flex flex-1 flex-col p-6 sm:p-8">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              c.live ? 'bg-accent text-on-accent' : 'border border-line bg-soft text-ink'
                            }`}
                          >
                            {c.live ? t.work.live : t.work.concept}
                          </span>
                          <span className="font-mono text-sm font-semibold text-muted" aria-hidden="true">
                            0{i + 1}
                          </span>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{text.title}</h3>
                        <dl className="mt-5 flex-1 space-y-4">
                          {(['problem', 'built', 'tools', 'shows'] as const).map((k) => (
                            <div key={k}>
                              <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">{t.work.labels[k]}</dt>
                              <dd className="mt-1 text-base text-muted">{text[k]}</dd>
                            </div>
                          ))}
                        </dl>
                        {c.live ? (
                          <a data-magnetic href={c.href} target="_blank" rel="noopener noreferrer" className={ctaCls}>
                            {cta}
                          </a>
                        ) : (
                          <Link data-magnetic href={c.href} className={ctaCls}>
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
        <section id="services" data-scrub="full" className="relative overflow-clip border-t border-line bg-soft/60">
          <span className="bgnum" data-p aria-hidden="true">
            02
          </span>
          <div className={`${container} ${section} relative`}>
            <SectionHead idx="02" title={t.services.title} intro={t.services.intro} />
            <ul className="relative z-[1] mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.services.items.map((s, i) => (
                <li key={i} className="reveal" style={stagger(i % 3)}>
                  <div data-spot className="svc lift h-full rounded-2xl border border-line bg-surface p-6 sm:p-7">
                    <div className="relative z-[1]">
                      <ServiceIcon i={i} style={stagger(i % 3)} />
                      <h3 className="mt-5 text-xl font-bold leading-snug">{s.title}</h3>
                      <p className="mt-2 text-muted">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section id="process" data-scrub="full" className="relative overflow-clip border-t border-line">
          <span className="bgnum" data-p aria-hidden="true">
            03
          </span>
          <div className={`${container} ${section} relative`}>
            <SectionHead idx="03" title={t.process.title} />
            <div data-scrub="through" className="relative z-[1] mt-14">
              {/* on wide screens the line between the three steps draws as you scroll */}
              <span aria-hidden="true" className="absolute left-6 right-[calc(33.333%-45px)] top-[23px] hidden h-0.5 bg-line md:block" />
              <span aria-hidden="true" data-p className="steps-line left-6 right-[calc(33.333%-45px)] top-[23px] hidden h-0.5 md:block" />
              <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
                {t.process.steps.map((s, i) => (
                  <li key={i} className="reveal relative" style={stagger(i)}>
                    {i < t.process.steps.length - 1 ? (
                      <span aria-hidden="true" className="absolute -bottom-10 left-[23px] top-12 w-0.5 bg-line md:hidden" />
                    ) : null}
                    <div className="flex gap-5 md:block">
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xl font-bold text-on-accent shadow-[0_0_0_6px_rgb(var(--bg))]">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold md:mt-6">{s.title}</h3>
                        <p className="mt-2 text-muted">{s.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Why work with me */}
        <section id="why" className="relative overflow-clip border-t border-line bg-soft/60">
          <div className={`${container} ${section}`}>
            <SectionHead idx="04" title={t.why.title} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {t.why.items.map((s, i) => (
                <li key={i} className="reveal" style={stagger(i % 2)}>
                  <div data-spot className="lift relative flex h-full gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6">
                    <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Check />
                    </span>
                    <div className="relative z-[1]">
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
          <div className={`${container} ${section}`}>
            <SectionHead idx="05" title={t.about.title} />
            <div className="mt-12 grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
              <div className="reveal">
                <p className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{t.about.pitch}</p>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                  {t.about.paragraphs.map((p, i) => (
                    <p key={i}>{i === 0 ? renderStudio(p) : p}</p>
                  ))}
                </div>
              </div>
              <dl className="reveal self-start rounded-2xl border border-line bg-surface p-6" style={stagger(1)}>
                {t.about.facts.map((f, i) => (
                  <div key={i} className="border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                    <dd className="mt-1 font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line bg-soft/60">
          <div className={`${container} ${section}`}>
            <SectionHead idx="06" title={t.faq.title} />
            <div className="mt-12 max-w-3xl space-y-3">
              {t.faq.items.map((f, i) => (
                <details key={i} className="group reveal rounded-2xl border border-line bg-surface transition-colors open:border-accent/60" style={stagger(i)}>
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M5 12h14" />
                      <path className="faq-vbar" d="M12 5v14" />
                    </svg>
                  </summary>
                  <p className="faq-a px-5 pb-5 text-base text-muted sm:text-lg">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scrub="full" data-live className="deep relative overflow-clip">
          <svg className="rings pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2" viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx="100" cy="100" r="90" stroke="rgb(var(--mint))" strokeOpacity="0.5" strokeWidth="1" style={stagger(i)} />
            ))}
          </svg>
          <div className={`${container} ${section} relative`}>
            <SectionHead idx="07" title={t.contact.title} />
            <p className="reveal mt-5 max-w-2xl text-lg text-on-deep/75" style={stagger(2)}>
              {t.contact.text}
            </p>
            <div className="reveal relative z-[1] mt-10 grid gap-4 lg:grid-cols-2" style={stagger(3)}>
              <a
                data-magnetic
                href={tg}
                target="_blank"
                rel="noopener noreferrer"
                className="group shine lift press flex flex-col gap-2 rounded-3xl bg-mint px-6 py-8 text-deep hover:opacity-95 sm:px-8"
              >
                <span className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                  <span className="tilt">
                    <LinkIcon id="telegram" />
                  </span>
                  {t.contact.telegramCta}
                </span>
                <span className="break-all font-display text-2xl font-bold tracking-tight sm:text-3xl">@{site.telegramUser}</span>
              </a>
              <a
                data-magnetic
                href={mail}
                className="group lift press flex flex-col gap-2 rounded-3xl border-2 border-mint/70 px-6 py-8 text-on-deep hover:bg-mint hover:text-deep sm:px-8"
              >
                <span className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                  <span className="tilt">
                    <LinkIcon id="email" />
                  </span>
                  {t.contact.emailCta}
                </span>
                <span className="break-all font-display text-xl font-bold tracking-tight sm:text-2xl">{site.email}</span>
              </a>
            </div>
            <p className="reveal relative z-[1] mt-12 text-sm font-medium text-on-deep/75" style={stagger(3)}>
              {t.contact.channels}
            </p>
            <ul className="relative z-[1] mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {site.links.map((l, i) => (
                <li key={l.id} className="reveal" style={stagger(i % 3)}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group lift press flex min-h-[56px] items-center gap-3 rounded-xl border border-on-deep/25 bg-on-deep/5 px-4 py-2 hover:bg-on-deep/10"
                  >
                    <span className="tilt text-mint">
                      <LinkIcon id={l.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-tight">{l.label}</span>
                      <span className="block truncate text-sm text-on-deep/75">{l.handle}</span>
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
                <a data-magnetic href={plainMail} aria-label={`${t.contact.title}: ${site.email}`} title={site.email} className={iconBtn}>
                  <LinkIcon id="email" />
                </a>
              </li>
              {site.links.map((l) => (
                <li key={l.id}>
                  <a
                    data-magnetic
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
      <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="ulink font-semibold text-accent">
        {name}
      </a>
      {text.slice(i + name.length)}
    </>
  );
}
