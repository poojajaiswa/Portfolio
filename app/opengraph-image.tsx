import { ImageResponse } from 'next/og';
import { site } from '@/lib/config';

export const alt = `${site.name} — Data Scientist & AI/ML Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social share card, generated at build time — no external image needed. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px',
          background: '#05070D',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* accent glows */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(96,165,250,0.35), rgba(5,7,13,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            right: -160,
            width: 660,
            height: 660,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(139,92,246,0.32), rgba(5,7,13,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,#60A5FA,#8B5CF6)',
              color: '#fff',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              color: '#60A5FA',
              fontSize: 20,
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            {site.name}
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 74,
            lineHeight: 1.08,
            fontWeight: 700,
            color: '#E8EDF7',
            maxWidth: 940,
          }}
        >
          Building Intelligent Solutions Through Data &amp; AI.
        </div>

        <div style={{ marginTop: 34, fontSize: 27, color: '#8F9DB6' }}>
          Data Scientist · AI/ML Engineer · Generative AI · Agentic AI
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 44 }}>
          {['Python', 'LLMs', 'RAG', 'Agentic AI', 'MLOps'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '11px 22px',
                borderRadius: 12,
                border: '1px solid rgba(96,165,250,0.35)',
                background: 'rgba(96,165,250,0.10)',
                color: '#C7D6F0',
                fontSize: 21,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
