'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LANGS, dict, type Lang } from '@/data/i18n';
import { site } from '@/data/site';
import { stagger } from '@/lib/stagger';
import { Choreo } from './Choreo';
import { LinkIcon } from './icons';
import { MotionToggle } from './MotionToggle';
import { Stage, type StageProject } from './Stage';
import { ThemeToggle } from './ThemeToggle';
import { Words } from './Words';

const STORAGE_KEY = 'lang';
const isLang = (v: unknown): v is Lang => v === 'en' || v === 'ru' || v === 'uz';

// Real screenshots (taken at 390x844 @2x and 1280x800): the live product and the two concept demos.
// NightShift's phone screenshot is one screen (390x844 at 2x). The demos' are taller (390x1560 at 1.6x) so the
// picture has something to scroll through.
const shot = (name: string, view: 'phone' | 'desktop') =>
  view === 'phone'
    ? name === 'nightshift'
      ? { src: `/work/${name}-phone.webp`, width: 780, height: 1688 }
      : { src: `/work/${name}-phone.webp`, width: 624, height: 2496 }
    : { src: `/work/${name}-desktop.webp`, width: 1280, height: 800 };

const work: { shots: string; live: boolean; href: string; from?: number }[] = [
  // The phone view starts below NightShift's own (wrapped) header: 418 of 1688 pixels.
  { shots: 'nightshift', live: true, href: site.studio.url, from: 418 / 1688 },
  { shots: 'cafe', live: false, href: '/demos/cafe' },
  { shots: 'freelancer', live: false, href: '/demos/freelancer' },
];

export function Portfolio({ year }: { year: number }) {
  const [lang, setLang] = useState<Lang>('en');
  const [fading, setFading] = useState(false);
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

  const projects: StageProject[] = work.map((w, i) => ({
    title: t.work.cards[i].title,
    status: w.live ? t.work.live : t.work.concept,
    phone: shot(w.shots, 'phone'),
    desktop: shot(w.shots, 'desktop'),
    altPhone: t.work.cards[i].shotPhone,
    altDesktop: t.work.cards[i].shotDesktop,
    from: w.from,
    href: w.href,
    external: w.live,
    linkLabel: t.work.cards[i].cta,
  }));

  const stageLabels = { group: t.work.preview.group, phone: t.work.preview.phone, desktop: t.work.preview.desktop };

  const langButtons = (cls: string) => (
    <div role="group" aria-label={t.langLabel} className={cls}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-pressed={lang === l.code}
          onClick={() => choose(l.code)}
          className="lang-btn press"
        >
          {cls === 'langs-xl' ? l.name : l.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="pf">
      <Choreo ids={[...navIds]} />
      <a href="#main" className="skip">
        {t.skip}
      </a>

      <header className="hdr">
        <div className="hdr-in">
          <a href="#top" className="wordmark">
            <span className="max-[479px]:sr-only">{site.name}</span>
            <span className="min-[480px]:hidden" aria-hidden="true">
              RJ
            </span>
          </a>
          <nav aria-label="Main" className="nav">
            {navIds.map((id) => (
              <a key={id} href={`#${id}`} data-nav={id}>
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <div className="tools">
            <MotionToggle label={t.motionLabel} />
            <ThemeToggle label={t.themeLabel} />
            {langButtons('langs')}
          </div>
        </div>
      </header>

      <main id="main" className={`lang-fade ${fading ? 'opacity-0' : 'opacity-100'}`}>
        {/* The split: the picture stays on the left while the text moves on the right */}
        <div className="split">
          <div className="stage-cell">
            <Stage projects={projects} labels={stageLabels} className="max-lg:hidden" />
          </div>

          <div className="col">
            <section id="top" data-stage="0" className="hero">
              <div className="hero-top">
                <h1 key={`h-${lang}`} className="t-display hero-title">
                  <Words text={t.hero.title} />
                </h1>
                <p className="lead rise" style={stagger(4)}>
                  {t.hero.sub}
                </p>
                <div className="hero-actions rise" style={stagger(5)}>
                  <a id="hero-cta" href={tg} target="_blank" rel="noopener noreferrer" className="btn btn-accent press">
                    {t.hero.cta}
                    <span className="nudge-x" aria-hidden="true">
                      →
                    </span>
                    <span className="sr-only">{t.work.newTab}</span>
                  </a>
                  <a href="#work" className="link">
                    {t.hero.ctaWork}
                  </a>
                </div>
                <p className="note rise" style={stagger(6)}>
                  {t.hero.note}
                </p>
              </div>
              <Stage mode="solo" projects={[projects[0]]} labels={stageLabels} className="lg:hidden" />
              <div className="hero-langs rise" style={stagger(7)}>
                {langButtons('langs-xl')}
              </div>
            </section>

            <section id="work" aria-labelledby="work-h">
              <header data-stage="0" className="work-head">
                <h2 id="work-h" className="t-head r-title">
                  <Words text={t.work.title} />
                </h2>
                <p className="lead rv" style={stagger(2)}>
                  {t.work.intro}
                </p>
              </header>
              {work.map((w, i) => {
                const text = t.work.cards[i];
                const inner = (
                  <>
                    {text.cta}
                    {w.live ? (
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
                return (
                  <article key={i} data-stage={i} className="proj" aria-labelledby={`proj-${i}`}>
                    <Stage mode="solo" projects={[projects[i]]} labels={stageLabels} className="lg:hidden" />
                    <h3 id={`proj-${i}`} className="t-lead proj-title r-title">
                      <Words text={text.title} />
                    </h3>
                    <p className="proj-status rv" style={stagger(1)}>
                      {w.live ? t.work.live : t.work.concept}
                    </p>
                    <dl className="facts">
                      {(['problem', 'built', 'tools', 'shows'] as const).map((k, n) => (
                        <div key={k} className="rv" style={stagger(n + 2)}>
                          <dt>{t.work.labels[k]}</dt>
                          <dd>{text[k]}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="rv" style={stagger(6)}>
                      {w.live ? (
                        <a href={w.href} target="_blank" rel="noopener noreferrer" className="btn btn-ink press">
                          {inner}
                        </a>
                      ) : (
                        <Link href={w.href} className="btn btn-ink press">
                          {inner}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>

        {/* Services: a plain list on a field of its own */}
        <section id="services" aria-labelledby="services-h" className="sec field-soft">
          <div className="wrap services">
            <header className="sec-head">
              <h2 id="services-h" className="t-head r-title">
                <Words text={t.services.title} />
              </h2>
              <p className="lead rv" style={stagger(2)}>
                {t.services.intro}
              </p>
            </header>
            <ul className="svc-list">
              {t.services.items.map((s, i) => (
                <li key={i} className="rv" style={stagger(i % 3)}>
                  <h3 className="t-lead">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works: the three steps, the bar fills as they pass */}
        <section id="process" aria-labelledby="process-h" className="sec field-deep">
          <div className="wrap process">
            <header className="sec-head">
              <h2 id="process-h" className="t-head r-title">
                <Words text={t.process.title} />
              </h2>
            </header>
            <div className="steps" data-scrub="through">
              <span aria-hidden="true" className="steps-track">
                <span className="steps-fill" />
              </span>
              <ol>
                {t.process.steps.map((s, i) => (
                  <li key={i} className="rv" style={stagger(0)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/process/process-${i + 1}.webp`} width={800} height={800} alt="" loading="lazy" decoding="async" className="step-pic" fetchPriority="low" />
                    <h3 className="t-lead">{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Why work with me */}
        <section id="why" aria-labelledby="why-h" className="sec">
          <div className="wrap">
            <header className="sec-head">
              <h2 id="why-h" className="t-head r-title">
                <Words text={t.why.title} />
              </h2>
            </header>
            <ul className="why-list">
              {t.why.items.map((s, i) => (
                <li key={i} className="rv" style={stagger(i)}>
                  <h3 className="t-lead">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-h" className="sec field-soft">
          <div className="wrap about">
            <header className="sec-head">
              <h2 id="about-h" className="t-head r-title">
                <Words text={t.about.title} />
              </h2>
            </header>
            <p className="pitch rv" style={stagger(1)}>
              {t.about.pitch}
            </p>
            <div className="about-body">
              <div className="rv" style={stagger(2)}>
                {t.about.paragraphs.map((p, i) => (
                  <p key={i}>{i === 0 ? renderStudio(p) : p}</p>
                ))}
              </div>
              <dl className="about-facts rv" style={stagger(3)}>
                {t.about.facts.map((f, i) => (
                  <div key={i}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* FAQ: every answer is on the page, nothing to open */}
        <section id="faq" aria-labelledby="faq-h" className="sec">
          <div className="wrap faq">
            <header className="sec-head">
              <h2 id="faq-h" className="t-head r-title">
                <Words text={t.faq.title} />
              </h2>
            </header>
            <div className="faq-list">
              {t.faq.items.map((f, i) => (
                <div key={i} className="rv" style={stagger(i % 2)}>
                  <h3 className="t-lead">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact: the handle is the display line */}
        <section id="contact" aria-labelledby="contact-h" className="sec field-deep contact">
          <div className="wrap">
            <header className="sec-head">
              <h2 id="contact-h" className="t-head r-title">
                <Words text={t.contact.title} />
              </h2>
              <p className="lead rv" style={stagger(2)}>
                {t.contact.text}
              </p>
            </header>
            <div className="handle-wrap" data-scrub="arrive">
              <a href={tg} target="_blank" rel="noopener noreferrer" className="handle press">
                <span className="handle-line">@{site.telegramUser}</span>
                <span className="handle-cta">
                  {t.contact.telegramCta}
                  <span className="nudge-x" aria-hidden="true">
                    →
                  </span>
                  <span className="sr-only">{t.work.newTab}</span>
                </span>
              </a>
            </div>
            <div className="contact-more">
              <a href={mail} className="mail press">
                <span>{t.contact.emailCta}</span>
                <strong>{site.email}</strong>
              </a>
              <div className="rv" style={stagger(1)}>
                <p>{t.contact.channels}</p>
                <ul>
                  {site.links.map((l) => (
                    <li key={l.id}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="chan">
                        <strong>{l.label}</strong>
                        <span>{l.handle}</span>
                        <span className="sr-only">{t.work.newTab}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <nav aria-label={t.contact.title} className="foot-icons">
            <ul>
              <li>
                <a href={plainMail} aria-label={`${t.contact.title}: ${site.email}`} title={site.email} className="icon-btn press">
                  <LinkIcon id="email" />
                </a>
              </li>
              {site.links.map((l) => (
                <li key={l.id}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.label} ${t.work.newTab}`} title={l.label} className="icon-btn press">
                    <LinkIcon id={l.id} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Sections" className="foot-nav">
            {navIds.map((id) => (
              <a key={id} href={`#${id}`}>
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <p className="foot-name" aria-hidden="true">
            <span>{site.name}</span>
          </p>
          <div className="foot-legal">
            <p>
              © {year} {site.name}. {t.footer.rights}
            </p>
            <p>{t.footer.built}</p>
          </div>
        </div>
      </footer>
    </div>
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
      <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="ulink">
        {name}
      </a>
      {text.slice(i + name.length)}
    </>
  );
}
