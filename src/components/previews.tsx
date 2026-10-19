// Typographic placeholder shown inside a Work-card frame until the real screenshot or live demo is there
// (and for visitors without JavaScript). It borrows the colours of the thing it stands for. Decorative.

export type PreviewKind = 'studio' | 'cafe' | 'freelancer';

const THEME: Record<PreviewKind, string> = { studio: '', cafe: 'theme-cafe', freelancer: 'theme-freelancer' };

export function WorkPreview({ kind, title }: { kind: PreviewKind; title: string }) {
  return (
    <div className={`poster ${THEME[kind]}`} aria-hidden="true">
      <span className="poster-mark" />
      <span className="poster-title">{title}</span>
    </div>
  );
}
