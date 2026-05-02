import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown, Tent, MapPin, Truck, Star, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'spots', label: '캠핑 스팟', icon: <MapPin size={15} /> },
  { id: 'equipment', label: '장비 가이드', icon: <Tent size={15} /> },
  { id: 'products', label: '용품 샵', icon: <ShoppingBag size={15} /> },
  { id: 'caravans', label: '카라반·캠핑카', icon: <Truck size={15} /> },
  { id: 'reviews', label: '커뮤니티 후기', icon: <Star size={15} /> },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(216,232,216,0.6)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(11,32,22,0.06)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '72px', gap: '32px' }}>
          {/* Logo */}
          <button
            onClick={() => handleNav('hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1A3828, #4A8A62)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(26,56,40,0.35)',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '18px' }}>⛺</span>
            </div>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.04em',
              color: scrolled ? 'var(--forest)' : 'white',
              transition: 'color 0.3s',
            }}>
              Camp<span style={{ color: 'var(--sage)' }}>Nest</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flex: 1,
          }} className="desktop-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: activeSection === item.id ? 'rgba(74,138,98,0.12)' : 'transparent',
                  color: activeSection === item.id
                    ? 'var(--forest-mid)'
                    : scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (activeSection !== item.id) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(74,138,98,0.08)';
                    (e.currentTarget as HTMLElement).style.color = scrolled ? 'var(--forest-mid)' : 'white';
                  }
                }}
                onMouseLeave={e => {
                  if (activeSection !== item.id) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)';
                  }
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: scrolled ? 'rgba(74,138,98,0.08)' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--forest-mid)' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Search size={18} />
            </button>

            <button style={{
              padding: '9px 20px',
              borderRadius: 'var(--radius-md)',
              background: scrolled ? 'transparent' : 'rgba(255,255,255,0.15)',
              color: scrolled ? 'var(--text-secondary)' : 'white',
              border: scrolled ? '1.5px solid var(--border)' : '1.5px solid rgba(255,255,255,0.4)',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s',
            }} className="hide-mobile">
              로그인
            </button>

            <button
              onClick={() => handleNav('spots')}
              style={{
                padding: '9px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
                color: 'white',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(44,88,64,0.35)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(44,88,64,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(44,88,64,0.35)';
              }}
              className="hide-mobile"
            >
              스팟 찾기
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: scrolled ? 'rgba(74,138,98,0.08)' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--forest-mid)' : 'white',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="show-mobile"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div style={{
            borderTop: '1px solid var(--border-light)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            padding: '16px 24px',
            animation: 'fadeIn 0.2s ease',
          }}>
            <div className="container">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--sand-light)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 18px',
              }}>
                <Search size={18} color="var(--text-muted)" />
                <input
                  autoFocus
                  placeholder="캠핑장, 장비, 제품 검색..."
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '15px',
                    color: 'var(--text-body)',
                    outline: 'none',
                  }}
                />
                <button onClick={() => setSearchOpen(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>
                  <X size={18} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {['설악산 캠핑장', '글램핑', '겨울 침낭', '카라반 렌탈', '1인 텐트'].map(q => (
                  <button key={q} className="tag" style={{ cursor: 'pointer', fontSize: '13px' }}>{q}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: 'rgba(11,32,22,0.96)',
          backdropFilter: 'blur(24px)',
          animation: 'fadeIn 0.25s ease',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                background: activeSection === item.id ? 'rgba(74,138,98,0.2)' : 'rgba(255,255,255,0.05)',
                color: activeSection === item.id ? 'var(--mint)' : 'rgba(255,255,255,0.8)',
                fontSize: '17px',
                fontWeight: 600,
                textAlign: 'left',
                border: activeSection === item.id ? '1px solid rgba(74,138,98,0.3)' : '1px solid transparent',
                animation: `fadeUp 0.3s ease ${i * 60}ms both`,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            무료로 시작하기
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .hide-mobile { display: inline-flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
