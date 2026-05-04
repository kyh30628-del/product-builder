import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const floatingCards = [
  { emoji: '⛺', label: '백패킹', sub: 'MSR Hubba Hubba NX', top: '20%', left: '4%', delay: '0s' },
  { emoji: '🏔️', label: '카라반', sub: 'Airstream Bambi 16RB', top: '18%', right: '4%', delay: '0.5s' },
  { emoji: '🚐', label: '캠핑카', sub: 'VW California Ocean', top: '65%', left: '2%', delay: '0.8s' },
  { emoji: '💺', label: '헬리녹스', sub: 'Chair One 890g', top: '68%', right: '3%', delay: '0.3s' },
];

const steps = [
  { n: '01', label: '5가지 질문' },
  { n: '02', label: '맞춤 분석' },
  { n: '03', label: '추천 완료' },
];

export default function Hero({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #060E0A 0%, #0B2016 25%, #1A3828 55%, #2C5840 80%, #1A3828 100%)',
    }}>
      {/* BG layers */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 20% 40%, rgba(74,138,98,0.16) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 60%, rgba(232,104,48,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 100% 55% at 50% 100%, rgba(11,32,22,0.85) 0%, transparent 50%)
        `,
      }} />

      {/* Stars */}
      {[...Array(36)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 5 === 0 ? '3px' : '1.5px',
          height: i % 5 === 0 ? '3px' : '1.5px',
          borderRadius: '50%', background: 'rgba(255,255,255,0.55)',
          top: `${(i * 7 + 11) % 72}%`,
          left: `${(i * 13 + 5) % 100}%`,
          animation: `pulse ${2.2 + (i % 4) * 0.6}s ease-in-out ${(i % 5) * 0.3}s infinite`,
        }} />
      ))}

      {/* Mountain silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px', overflow: 'hidden', opacity: 0.35 }}>
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d="M0,190 L0,260 L1440,260 L1440,190 L1200,70 L1000,155 L800,35 L600,155 L400,55 L200,170 Z" fill="rgba(11,32,22,0.9)" />
          <path d="M0,220 L0,260 L1440,260 L1440,215 L1300,130 L1100,195 L900,90 L700,182 L500,100 L300,195 L100,142 Z" fill="rgba(6,14,10,0.95)" />
        </svg>
      </div>

      {/* Floating product cards */}
      {floatingCards.map((card, i) => (
        <div key={i} className="hide-on-mobile" style={{
          position: 'absolute',
          top: card.top,
          left: 'left' in card ? card.left : undefined,
          right: 'right' in card ? (card as any).right : undefined,
          padding: '10px 14px',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.14)',
          animation: `float 4.5s ease-in-out ${card.delay} infinite`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.7s',
          minWidth: '150px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>{card.emoji}</span>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {card.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 700 }}>
                {card.sub}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '90px', paddingBottom: '60px', width: '100%' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 20px', borderRadius: 'var(--radius-full)',
            background: 'rgba(74,138,98,0.15)', border: '1px solid rgba(74,138,98,0.35)',
            color: 'var(--mint)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em',
            marginBottom: '28px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>
            <Sparkles size={13} />
            캠핑 장비·카라반·캠핑카 맞춤 추천
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 6.5vw, 72px)',
            fontWeight: 900, color: 'white',
            letterSpacing: '-0.04em', lineHeight: 1.1,
            marginBottom: '22px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s var(--ease-out) 0.2s',
          }}>
            나에게 딱 맞는<br />
            <span style={{
              background: 'linear-gradient(135deg, #7DB896 0%, #4A8A62 40%, #E8A020 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              캠핑 세팅
            </span>{' '}
            찾기
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(15px, 2.2vw, 19px)',
            color: 'rgba(255,255,255,0.62)', lineHeight: 1.75,
            marginBottom: '44px', fontWeight: 400,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s var(--ease-out) 0.35s',
          }}>
            캠핑 스타일·인원·예산·시즌 5가지 질문으로<br />
            세계 유명 브랜드 장비, 카라반, 캠핑카를 맞춤 추천해드립니다
          </p>

          {/* CTA */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out) 0.5s',
          }}>
            <button
              onClick={onStartQuiz}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '20px 44px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, var(--forest-mid) 0%, var(--sage) 60%, #7DB896 100%)',
                color: 'white',
                fontSize: '18px', fontWeight: 800,
                boxShadow: '0 8px 40px rgba(44,88,64,0.55), 0 2px 0 rgba(255,255,255,0.1) inset',
                transition: 'all 0.25s var(--ease-out)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.02)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 60px rgba(44,88,64,0.65), 0 2px 0 rgba(255,255,255,0.1) inset';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(44,88,64,0.55), 0 2px 0 rgba(255,255,255,0.1) inset';
              }}
            >
              <Sparkles size={20} />
              지금 바로 맞춤 추천 받기
              <ArrowRight size={20} />
            </button>

            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontWeight: 500 }}>
              1분이면 충분 • 무료 • 회원가입 불필요
            </p>
          </div>

          {/* How it works */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0', marginTop: '56px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.9s',
          }}>
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  padding: '0 20px',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 800, color: 'var(--mint)',
                    letterSpacing: '0.02em',
                  }}>
                    {s.n}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    width: '32px', height: '1px',
                    background: 'rgba(255,255,255,0.15)',
                    flexShrink: 0,
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        animation: 'fadeIn 1s ease 1.6s both',
      }}>
        <span>Scroll</span>
        <div style={{
          width: '22px', height: '36px', borderRadius: '11px',
          border: '2px solid rgba(255,255,255,0.22)',
          display: 'flex', justifyContent: 'center', paddingTop: '5px',
        }}>
          <div style={{
            width: '3px', height: '7px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.45)',
            animation: 'float 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
