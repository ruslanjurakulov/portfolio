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
          background: 'linear-gradient(135deg, #06201f 0%, #0f766e 100%)',
          color: '#f4f3ee',
        }}
      >
        <div style={{ fontSize: 30, color: '#5eead4', marginBottom: 24 }}>Portfolio</div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>Ruslan Jurakulov</div>
        <div style={{ fontSize: 42, marginTop: 28, maxWidth: 900, color: '#d5f5f0' }}>
          Web developer building fast sites for small businesses
        </div>
      </div>
    ),
    size,
  );
}
