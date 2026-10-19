import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Ruslan Jurakulov, web developer for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// A flat deep-green card with one teal circle (public/og/og-card.jpg, 1200x630). The name and one plain
// sentence sit on the dark left side; no gradient.
export default async function OpenGraphImage() {
  const card = await readFile(join(process.cwd(), 'public/og/og-card.jpg'));
  const src = `data:image/jpeg;base64,${card.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#0d312b', color: '#e8f4ef' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={1200} height={630} alt="" style={{ position: 'absolute', left: 0, top: 0, width: 1200, height: 630 }} />
        <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, width: 640, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 80 }}>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -4, display: 'flex', flexDirection: 'column' }}>
            <span>Ruslan</span>
            <span>Jurakulov</span>
          </div>
          <div style={{ fontSize: 38, marginTop: 28, color: '#5eead4', lineHeight: 1.25 }}>Web developer building fast sites for small businesses</div>
        </div>
      </div>
    ),
    size,
  );
}
