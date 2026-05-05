import React, { useState, useEffect } from 'react';
import { Menu, X, Tent, Truck, Star, Sparkles } from 'lucide-react';
import { ToastFn } from '../App';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onToast: ToastFn;
  onStartQuiz: () => void;
}

const navItems = [
  { id: 'equipment', label: '장비 가이드', icon: <Tent size={15} /> },
  { id: 'caravans', label: '카라반·캠핑카', icon: <Truck size={15} /> },
  { id: 'reviews', label: '캠핑 후기', icon: <Star size={15} /> },
];

export default function Header({ activeSection, onNavigate, onToast, onStartQuiz }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      onToast('이메일과 비밀번호를 모두 입력해주세요.', 'error');
      return;
    }
    // Dummy login for now
    setLoginOpen(false);
    onToast(`'${loginEmail}'님, 환영합니다!`, 'success');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleSignup = () => {
    if (!signupName || !signupEmail || !signupPassword) {
      onToast('이름, 이메일, 비밀번호를 모두 입력해주세요.', 'error');
      return;
    }
    // Dummy signup for now
    setSignupOpen(false);
    onToast('회원가입이 완료되었습니다. 로그인해주세요!', 'success');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setLoginOpen(true);
  };

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
              onClick={() => setLoginOpen(true)}
              style={{
                padding: '9px 20px',
                borderRadius: 'var(--radius-md)',
                background: scrolled ? 'transparent' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--text-secondary)' : 'white',
                border: scrolled ? '1.5px solid var(--border)' : '1.5px solid rgba(255,255,255,0.4)',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              className="hide-mobile"
            >
              로그인
            </button>

            <button
              onClick={onStartQuiz}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
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
              <Sparkles size={14} />
              맞춤 추천
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
          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            onClick={() => { setMobileOpen(false); onStartQuiz(); }}
          >
            <Sparkles size={16} />
            맞춤 추천 받기
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

      {/* Login Modal */}
      {loginOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setLoginOpen(false)}
        >
          <div
            style={{
              background: 'white', borderRadius: '24px',
              padding: '40px', width: '100%', maxWidth: '420px', margin: '20px',
              animation: 'scaleIn 0.25s var(--ease-spring)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>⛺</span>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest)' }}>CampNest 로그인</h2>
              </div>
              <button
                onClick={() => setLoginOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                이메일
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="example@email.com"
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)',
                  fontSize: '14px', color: 'var(--text-dark)', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                비밀번호
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="비밀번호 입력"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)',
                  fontSize: '14px', color: 'var(--text-dark)', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <button
              onClick={handleLogin}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
                color: 'white', borderRadius: 'var(--radius-md)',
                fontSize: '15px', fontWeight: 700,
                boxShadow: '0 4px 16px rgba(44,88,64,0.35)',
                border: 'none', cursor: 'pointer', marginBottom: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              로그인
            </button>

            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
              계정이 없으신가요?{' '}
              <button
                onClick={() => {
                  setLoginOpen(false);
                  setSignupOpen(true);
                }}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--forest-mid)', fontWeight: 700,
                  cursor: 'pointer', fontSize: '13px',
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {signupOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setSignupOpen(false)}
        >
          <div
            style={{
              background: 'white', borderRadius: '24px',
              padding: '40px', width: '100%', maxWidth: '420px', margin: '20px',
              animation: 'scaleIn 0.25s var(--ease-spring)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>⛺</span>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest)' }}>CampNest 회원가입</h2>
              </div>
              <button
                onClick={() => setSignupOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                이름
              </label>
              <input
                type="text"
                value={signupName}
                onChange={e => setSignupName(e.target.value)}
                placeholder="홍길동"
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)',
                  fontSize: '14px', color: 'var(--text-dark)', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                이메일
              </label>
              <input
                type="email"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                placeholder="example@email.com"
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)',
                  fontSize: '14px', color: 'var(--text-dark)', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                비밀번호
              </label>
              <input
                type="password"
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                placeholder="비밀번호 입력"
                onKeyDown={e => e.key === 'Enter' && handleSignup()}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)',
                  fontSize: '14px', color: 'var(--text-dark)', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <button
              onClick={handleSignup}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
                color: 'white', borderRadius: 'var(--radius-md)',
                fontSize: '15px', fontWeight: 700,
                boxShadow: '0 4px 16px rgba(44,88,64,0.35)',
                border: 'none', cursor: 'pointer', marginBottom: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              회원가입
            </button>

            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
              이미 계정이 있으신가요?{' '}
              <button
                onClick={() => {
                  setSignupOpen(false);
                  setLoginOpen(true);
                }}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--forest-mid)', fontWeight: 700,
                  cursor: 'pointer', fontSize: '13px',
                }}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
