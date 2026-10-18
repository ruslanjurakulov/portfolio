import type { Metadata } from 'next';
import { DemoBanner } from '@/components/DemoBanner';
import { Motion } from '@/components/Motion';
import { stagger } from '@/lib/stagger';

export const metadata: Metadata = {
  title: 'Aylin Demo (concept demo)',
  description: 'Concept demo: a fictional freelance designer portfolio made as a sample by Ruslan Jurakulov. Not a real person.',
  openGraph: { title: 'Aylin Demo (concept demo)', description: 'A fictional freelance designer site, made as a sample.' },
};

const container = 'mx-auto w-full max-w-5xl px-4 sm:px-6';
const box = 'border-2 border-ink shadow-[4px_4px_0_0_rgb(var(--ink))]';

const skills = [
  'Brand identity',
  'Interface design',
  'Prototyping',
  'Design systems',
  'Illustration',
  'Accessibility reviews',
];

const projects = [
  {
    name: 'Harbor',
    kind: 'Banking app concept',
    text: 'A calm mobile banking flow with large numbers and plain language.',
    art: 'a',
  },
  {
    name: 'Fernwood',
    kind: 'Plant shop branding',
    text: 'Logo, colour and packaging ideas for an imaginary plant shop.',
    art: 'b',
  },
  {
    name: 'Tidepool',
    kind: 'Meal planner UI',
    text: 'A weekly planner that turns a shopping list into a simple checklist.',
    art: 'c',
  },
];

function Art({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 320 160" className="h-auto w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {kind === 'a' && (
        <>
          <rect width="320" height="160" fill="#ffe14d" />
          <rect x="110" y="14" width="100" height="150" rx="16" fill="#0b0b0f" />
          <rect x="120" y="30" width="80" height="40" rx="8" fill="#ff5a5f" />
          <rect x="120" y="80" width="56" height="8" rx="4" fill="#f5f5f7" />
          <rect x="120" y="96" width="80" height="8" rx="4" fill="#f5f5f7" opacity="0.4" />
          <rect x="120" y="112" width="70" height="8" rx="4" fill="#f5f5f7" opacity="0.4" />
        </>
      )}
      {kind === 'b' && (
        <>
          <rect width="320" height="160" fill="#ff5a5f" />
          <circle cx="110" cy="80" r="54" fill="#0b0b0f" />
          <path d="M110 128V74M110 90c-22-4-30-18-28-32 20 0 30 12 28 32zm0 8c18-2 28-14 26-28-18 0-28 10-26 28z" stroke="#ffe14d" strokeWidth="5" fill="#ffe14d" strokeLinejoin="round" />
          <rect x="190" y="50" width="90" height="12" rx="6" fill="#0b0b0f" />
          <rect x="190" y="74" width="60" height="8" rx="4" fill="#0b0b0f" opacity="0.5" />
        </>
      )}
      {kind === 'c' && (
        <>
          <rect width="320" height="160" fill="#f5f5f7" />
          <rect x="30" y="24" width="260" height="112" rx="14" fill="#fff" stroke="#0b0b0f" strokeWidth="3" />
          {[48, 72, 96].map((y, i) => (
            <g key={y}>
              <rect x="48" y={y} width="16" height="16" rx="4" fill={i < 2 ? '#ff5a5f' : '#fff'} stroke="#0b0b0f" strokeWidth="3" />
              <rect x="76" y={y + 4} width={150 - i * 24} height="8" rx="4" fill="#0b0b0f" opacity="0.75" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export default function FreelancerDemo() {
  return (
    <div className="theme-freelancer min-h-screen bg-bg text-ink">
      <Motion />
      <DemoBanner />

      <header className="border-b-2 border-ink">
        <div className={`${container} flex min-h-[64px] items-center justify-between gap-2`}>
          <a href="#top" className="inline-flex min-h-[44px] items-center whitespace-nowrap text-xl font-extrabold">
            Aylin Demo
          </a>
          <nav aria-label="Designer" className="flex items-center">
            {[
              ['Skills', '#skills'],
              ['Projects', '#projects'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="inline-flex min-h-[44px] items-center px-2.5 text-sm font-bold underline-offset-4 hover:underline sm:px-4 sm:text-base"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="top">
          <div className={`${container} py-14 md:py-24`}>
            <p className="rise inline-block rounded-full border-2 border-ink bg-soft px-4 py-1 font-mono text-sm font-bold text-[#0b0b0f]" style={stagger(0)}>
              Freelance designer (fictional)
            </p>
            <h1 className="rise mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] sm:text-7xl" style={stagger(1)}>
              Hi, I’m Aylin. I design{' '}
              <span className="rounded-lg bg-accent px-2 text-on-accent">clear</span>, friendly interfaces.
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-muted" style={stagger(2)}>
              This is an invented designer, made up to show how a personal portfolio can look. Nothing here is a real person or a real client.
            </p>
            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={stagger(3)}>
              <a
                href="#projects"
                className={`${box} lift press inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-6 font-bold text-on-accent`}
              >
                See projects
              </a>
              <a
                href="#contact"
                className={`${box} lift press inline-flex min-h-[48px] items-center justify-center rounded-xl bg-surface px-6 font-bold`}
              >
                Say hello
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="border-y-2 border-ink bg-soft text-[#0b0b0f]">
          <div className={`${container} py-14 md:py-20`}>
            <h2 className="reveal text-4xl font-extrabold">Skills</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <li key={s} className="reveal" style={stagger(i)}>
                  <span className="chip lift inline-block rounded-full border-2 border-[#0b0b0f] bg-white px-5 py-2 text-base font-bold shadow-[3px_3px_0_0_#0b0b0f]">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects">
          <div className={`${container} py-14 md:py-20`}>
            <h2 className="reveal text-4xl font-extrabold">Sample projects</h2>
            <p className="mt-3 text-muted">Three invented projects. None of these were made for a real client.</p>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.map((p, i) => (
                <li key={p.name} className="reveal" style={stagger(i)}>
                  <div className={`${box} lift flex h-full flex-col overflow-hidden rounded-2xl bg-surface`}>
                  <div className="border-b-2 border-ink">
                    <Art kind={p.art} />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted">{p.kind}</p>
                    <h3 className="mt-1 text-2xl font-extrabold">{p.name}</h3>
                    <p className="mt-2 text-muted">{p.text}</p>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="border-t-2 border-ink">
          <div className={`${container} py-14 md:py-20`}>
            <h2 className="reveal text-4xl font-extrabold">Contact</h2>
            <p className="mt-3 max-w-xl text-muted">
              These are placeholders, not real accounts. A real site would link to the designer’s email and profiles here.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {['Email: hello@example.com', 'Profile: @aylin.demo', 'Portfolio: example.com/aylin'].map((c, i) => (
                <li
                  key={c}
                  style={stagger(i)}
                  className="reveal flex min-h-[56px] items-center rounded-xl border-2 border-dashed border-ink bg-surface px-4 py-3 font-mono text-sm font-bold"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-ink">
        <div className={`${container} py-8 text-sm text-muted`}>
          <p>Aylin Demo is a concept demo and a fictional person. Not a real designer.</p>
        </div>
      </footer>
    </div>
  );
}
