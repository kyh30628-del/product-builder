import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sliders, ChevronRight, ArrowRight, Wind, Thermometer, Sun } from 'lucide-react';

const floatingTags = [
  { label: '⛺ 글램핑', top: '22%', left: '5%', delay: '0s' },
  { label: '🏔️ 산악캠핑', top: '15%', right: '8%', delay: '0.4s' },
  { label: '🌊 해변캠핑', top: '65%', left: '3%', delay: '0.8s' },
  { label: '🚐 카라반', top: '72%', right: '5%', delay: '0.2s' },
  { label: '🌲 숲속캠핑', top: '40%', left: '1%', delay: '0.6s' },
  { label: '⭐ 4.9 추천', top: '35%', right: '2%', delay: '1s' },
];

const stats = [
  { value: '5,200+', label: '등록 캠핑장', icon: '📍' },
  { value: '18,000+', label: '실제 후기', icon: '✍️' },
  { value: '900+', label: '장비 & 제품', icon: '🎒' },
  { value: '240+', label: '카라반 & 캠핑카', icon: '🚐' },
];

const searchTypes = ['캠핑장', '글램핑', '카라반', '캠핑카'];
const regions = ['전국', '수도권', '강원도', '경상도', '전라도', '충청도', '제주도'];

export default function Hero({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('캠핑장');
  const [activeRegion, setActiveRegion] = useState('전국');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = () => {
    onNavigate('spots');
    const el = document.getElementById('spots');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #060E0A 0%, #0B2016 25%, #1A3828 50%, #2C5840 75%, #1A3828 100%)',
      }}
    >
      {/* Animated background layers */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(74,138,98,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(232,104,48,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 100% 60% at 50% 100%, rgba(11,32,22,0.8) 0%, transparent 50%)
        `,
      }} />

      {/* Stars/particles */}
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 5 === 0 ? '3px' : '1.5px',
          height: i % 5 === 0 ? '3px' : '1.5px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.6)',
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 100}%`,
          animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
        }} />
      ))}

      {/* Floating landscape silhouette */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '280px',
        overflow: 'hidden',
        opacity: 0.4,
      }}>
        <svg viewBox="0 0 1440 280" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path d="M0,200 L0,280 L1440,280 L1440,200 L1200,80 L1000,160 L800,40 L600,160 L400,60 L200,180 Z" fill="rgba(11,32,22,0.9)" />
          <path d="M0,230 L0,280 L1440,280 L1440,220 L1300,140 L1100,200 L900,100 L700,190 L500,110 L300,200 L100,150 Z" fill="rgba(6,14,10,0.95)" />
        </svg>
      </div>

      {/* Floating tags */}
      {floatingTags.map((tag, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: tag.top,
            left: 'left' in tag ? tag.left : undefined,
            right: 'right' in tag ? (tag as any).right : undefined,
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            animation: `float 4s ease-in-out ${tag.delay} infinite`,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
          className="hide-on-mobile"
        >
          {tag.label}
        </div>
      ))}

      {/* Main content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '80px', paddingBottom: '60px', width: '100%' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>

          {/* Label badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(74,138,98,0.15)',
              border: '1px solid rgba(74,138,98,0.35)',
              color: 'var(--mint)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '28px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s var(--ease-out) 0.1s',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--mint)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            🇰🇷 대한민국 No.1 캠핑 플랫폼
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(38px, 7vw, 80px)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: '24px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s var(--ease-out) 0.2s',
            }}
          >
            자연과 함께하는<br />
            <span style={{
              background: 'linear-gradient(135deg, #7DB896 0%, #4A8A62 40%, #E8A020 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              완벽한 캠핑
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.75,
              marginBottom: '44px',
              fontWeight: 400,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s var(--ease-out) 0.35s',
            }}
          >
            5,200개 캠핑장부터 카라반·캠핑카까지,<br />
            스팟 발견부터 장비 구매, 리얼 후기까지 한 곳에서.
          </p>

          {/* Search box */}
          <div
            style={{
              background: 'rgba(255,255,255,0.97)',
              borderRadius: 'var(--radius-xl)',
              padding: '8px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.6)',
              marginBottom: '20px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s var(--ease-out) 0.5s',
            }}
          >
            {/* Type tabs */}
            <div style={{
              display: 'flex',
              gap: '4px',
              padding: '6px 8px',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '4px',
            }}>
              {searchTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: activeType === t ? 'var(--forest-mid)' : 'transparent',
                    color: activeType === t ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              padding: '4px',
            }}>
              {/* Location input */}
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
              }}>
                <MapPin size={20} color="var(--sage)" style={{ flexShrink: 0 }} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="지역 또는 캠핑장 이름"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    color: 'var(--text-dark)',
                    background: 'transparent',
                    fontWeight: 500,
                  }}
                />
              </div>

              {/* Divider */}
              <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />

              {/* Region select */}
              <select
                value={activeRegion}
                onChange={e => setActiveRegion(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                }}
              >
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>

              {/* Search button */}
              <button
                onClick={handleSearch}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
                  color: 'white',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '15px',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(44,88,64,0.4)',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(44,88,64,0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(44,88,64,0.4)';
                }}
              >
                <Search size={18} />
                <span className="hide-on-mobile">검색하기</span>
              </button>
            </div>
          </div>

          {/* Quick suggestions */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.8s',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500 }}>인기 검색:</span>
            {['설악산', '제주 해변', '가평 글램핑', '카라반 렌탈', '겨울 캠핑'].map(q => (
              <button
                key={q}
                onClick={handleSearch}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '13px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            maxWidth: '900px',
            margin: '56px auto 0',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out) 0.9s',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 16px',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div className="stat-number" style={{ color: 'white', fontSize: '28px', marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        animation: 'fadeIn 1s ease 1.5s both',
      }}>
        <span>Scroll</span>
        <div style={{
          width: '24px',
          height: '40px',
          borderRadius: '12px',
          border: '2px solid rgba(255,255,255,0.25)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px',
        }}>
          <div style={{
            width: '4px',
            height: '8px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.5)',
            animation: 'float 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
