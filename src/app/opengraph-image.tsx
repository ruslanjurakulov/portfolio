import { ImageResponse } from 'next/og';

export const alt = 'Ruslan Jurakulov, web developer for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 90,
          background: 'linear-gradient(135deg, #14152b 0%, #2a2699 100%)',
          color: '#f4f3ee',
        }}
      >
        <div style={{ fontSize: 30, color: '#a5b4fc', marginBottom: 24 }}>Portfolio</div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>Ruslan Jurakulov</div>
        <div style={{ fontSize: 42, marginTop: 28, maxWidth: 900, color: '#d9dcf5' }}>
          Web developer building fast sites for small businesses
        </div>
      </div>
    ),
    size,
  );
}
