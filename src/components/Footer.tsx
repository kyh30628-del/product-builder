import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Youtube, Facebook, Twitter, ChevronRight, ArrowRight } from 'lucide-react';

const footerLinks = {
  '캠핑 정보': ['캠핑장 찾기', '지도 검색', '지역별 캠핑장', '시즌별 추천', '캠핑 날씨'],
  '장비 & 제품': ['장비 가이드', '브랜드 리스트', '용품 쇼핑', '중고 장터', '장비 리뷰'],
  '카라반 & 캠핑카': ['카라반 구매', '캠핑카 구매', '렌탈 예약', '캠핑카 가이드', '견인 팁'],
  '커뮤니티': ['후기 게시판', '캠핑 모임', '포토갤러리', '캠핑 꿀팁', '1:1 문의'],
};

const certBadges = [
  { label: '한국관광공사 공식 파트너', emoji: '🏛️' },
  { label: '환경부 에코캠핑 인증', emoji: '🌿' },
  { label: '캠핑 안전 우수 플랫폼', emoji: '🛡️' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: 'var(--forest-dark)', color: 'rgba(255,255,255,0.75)' }}>
      {/* Newsletter section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)',
        padding: '56px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            flexWrap: 'wrap',
          }}>
            <div style={{ maxWidth: '480px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--mint)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                📬 뉴스레터
              </div>
              <h3 style={{
                color: 'white',
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 800,
                marginBottom: '10px',
                letterSpacing: '-0.03em',
              }}>
                최신 캠핑 정보를 받아보세요
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.65 }}>
                매주 엄선된 캠핑장 추천, 신제품 리뷰, 시즌 캠핑 팁을<br />
                이메일로 받아보세요. 언제든 구독 취소 가능.
              </p>
            </div>

            <div style={{ minWidth: '320px', flex: 1, maxWidth: '480px' }}>
              {subscribed ? (
                <div style={{
                  background: 'rgba(74,138,98,0.2)',
                  border: '1px solid rgba(74,138,98,0.4)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  textAlign: 'center',
                  animation: 'scaleIn 0.4s var(--ease-spring)',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
                    구독 완료!
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                    다음 주 뉴스레터부터 받아보실 수 있습니다
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '6px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '10px', padding: '8px 12px' }}>
                      <Mail size={17} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0 }} />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="이메일 주소를 입력하세요"
                        required
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          color: 'white',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, var(--sage), var(--mint))',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 14px rgba(74,138,98,0.4)',
                        transition: 'all 0.2s',
                      }}
                    >
                      구독하기
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '10px', textAlign: 'center' }}>
                    스팸 없음. 매주 한 번만. 언제든 취소 가능.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: '64px 0 40px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px repeat(4, 1fr)',
            gap: '40px',
            marginBottom: '56px',
          }}>
            {/* Brand column */}
            <div>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  ⛺
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: '22px',
                  letterSpacing: '-0.04em',
                  color: 'white',
                }}>
                  Camp<span style={{ color: 'var(--mint)' }}>Nest</span>
                </span>
              </div>

              <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: '24px' }}>
                대한민국 No.1 캠핑 플랫폼.<br />
                5,200개 캠핑장, 900개 장비 정보,<br />
                18,000개 실제 후기를 한 곳에서.
              </p>

              {/* Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  { icon: <Mail size={14} />, text: 'hello@campnest.kr' },
                  { icon: <Phone size={14} />, text: '1588-0000' },
                  { icon: <MapPin size={14} />, text: '서울특별시 강남구 캠핑로 1' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { icon: <Instagram size={17} />, label: 'Instagram' },
                  { icon: <Youtube size={17} />, label: 'YouTube' },
                  { icon: <Facebook size={17} />, label: 'Facebook' },
                  { icon: <Twitter size={17} />, label: 'Twitter' },
                ].map((s, i) => (
                  <button
                    key={i}
                    title={s.label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(74,138,98,0.25)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--mint)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,138,98,0.4)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '18px',
                  letterSpacing: '0.02em',
                }}>
                  {title}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.45)',
                          transition: 'color 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--mint)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}>
            {certBadges.map((badge, i) => (
              <div key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '12px',
                fontWeight: 500,
              }}>
                {badge.emoji} {badge.label}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '24px' }} />

          {/* Bottom row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              © 2024 CampNest Inc. All rights reserved. | 사업자등록번호: 123-45-67890 | 통신판매업신고: 2024-서울강남-0000
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['이용약관', '개인정보처리방침', '쿠키 정책', '사업자 정보'].map(item => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.3)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer > div > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer > div > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
