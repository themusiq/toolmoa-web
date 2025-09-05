export const runtime = 'edge';
import { ImageResponse } from '@vercel/og';

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || '툴모아';
  const subtitle = searchParams.get('subtitle') || '간단하지만 강력한 생활 도구';
  const emoji = searchParams.get('emoji') || '🧰';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex',
        background: '#f7f8fb', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
          border:'8px solid #6c47ff', borderRadius: 24, padding: 40, width: '88%',
          background: '#ffffff'
        }}>
          <div style={{ fontSize: 64 }}>{emoji}</div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 10 }}>{title}</div>
          <div style={{ fontSize: 28, color:'#6b7280', marginTop: 8 }}>{subtitle}</div>
          <div style={{ fontSize: 24, color:'#6c47ff', marginTop: 22 }}>toolmoa.kr</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}