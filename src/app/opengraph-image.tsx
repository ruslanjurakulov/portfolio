import { ImageResponse } from 'next/og';

export const alt = 'Ruslan Jurakulov, web developer for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Flat deep-green card: the name, then one plain sentence. No gradient, no ornament.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
          background: '#082622',
          color: '#e8f4ef',
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>Ruslan Jurakulov</div>
        <div style={{ fontSize: 44, marginTop: 32, maxWidth: 900, color: '#5eead4' }}>
          Web developer building fast sites for small businesses
        </div>
      </div>
    ),
    size,
  );
}
