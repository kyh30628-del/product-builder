import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronRight, Package } from 'lucide-react';
import { ToastFn } from '../App';

interface Equipment {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  imgClass: string;
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
  difficulty: '입문' | '중급' | '전문';
  description: string;
}

const categories = [
  { id: '전체', label: '전체', emoji: '🎒' },
  { id: '텐트', label: '텐트', emoji: '⛺' },
  { id: '침낭', label: '침낭', emoji: '🛏️' },
  { id: '랜턴', label: '랜턴', emoji: '🔦' },
  { id: '버너', label: '버너·코펠', emoji: '🍳' },
  { id: '의자', label: '의자·테이블', emoji: '🪑' },
  { id: '해먹', label: '해먹·타프', emoji: '🌿' },
  { id: '매트', label: '매트·패드', emoji: '🛌' },
];

const items: Equipment[] = [
  {
    id: 1,
    name: 'MSR 허블허블 4인용 돔텐트',
    brand: 'MSR',
    category: '텐트',
    price: '720,000',
    rating: 4.9,
    reviewCount: 1243,
    imgClass: 'img-product-tent',
    tags: ['4인용', '3시즌', '방수'],
    isNew: true,
    difficulty: '입문',
    description: '가볍고 튼튼한 올시즌 돔텐트. 설치가 쉬워 초보자도 OK.',
  },
  {
    id: 2,
    name: '코베아 팔라스 터널텐트 8인용',
    brand: 'KOVEA',
    category: '텐트',
    price: '589,000',
    originalPrice: '720,000',
    rating: 4.7,
    reviewCount: 876,
    imgClass: 'img-product-tent',
    tags: ['대형', '터널형', '거실형'],
    isSale: true,
    difficulty: '중급',
    description: '넓은 거실형 구조로 가족 캠핑에 완벽. 바람막이 우수.',
  },
  {
    id: 3,
    name: '스노우피크 오기 프로 침낭',
    brand: 'Snow Peak',
    category: '침낭',
    price: '389,000',
    rating: 4.8,
    reviewCount: 654,
    imgClass: 'img-product-bag',
    tags: ['동계', '-10°C', '머미형'],
    isNew: false,
    difficulty: '전문',
    description: '극한의 추위에도 따뜻한 프리미엄 구스다운 동계 침낭.',
  },
  {
    id: 4,
    name: '네이처하이크 경량 슬리핑백',
    brand: 'Naturehike',
    category: '침낭',
    price: '89,000',
    originalPrice: '129,000',
    rating: 4.5,
    reviewCount: 2341,
    imgClass: 'img-product-bag',
    tags: ['경량', '여름', '봉투형'],
    isSale: true,
    difficulty: '입문',
    description: '가성비 최고의 입문용 침낭. 하계 캠핑에 딱.',
  },
  {
    id: 5,
    name: '스노우피크 기가파워 랜턴',
    brand: 'Snow Peak',
    category: '랜턴',
    price: '156,000',
    rating: 4.9,
    reviewCount: 987,
    imgClass: 'img-product-lamp',
    tags: ['가스', '220루멘', '경량'],
    isNew: true,
    difficulty: '입문',
    description: '아름다운 맨틀 불빛으로 감성 캠핑의 필수품. 컴팩트 디자인.',
  },
  {
    id: 6,
    name: 'BRS 타이탄 싱글버너',
    brand: 'BRS',
    category: '버너',
    price: '48,000',
    originalPrice: '68,000',
    rating: 4.6,
    reviewCount: 3421,
    imgClass: 'img-product-stove',
    tags: ['경량', '컴팩트', '파워'],
    isSale: true,
    difficulty: '입문',
    description: '25g의 초경량 싱글버너. 백패킹의 필수품.',
  },
  {
    id: 7,
    name: '헬리녹스 체어원 홈',
    brand: 'Helinox',
    category: '의자',
    price: '219,000',
    rating: 4.8,
    reviewCount: 4521,
    imgClass: 'img-product-chair',
    tags: ['경량', '폴딩', '내구성'],
    difficulty: '입문',
    description: '캠핑 체어의 정석. 알루미늄 합금으로 가볍고 튼튼.',
  },
  {
    id: 8,
    name: 'ENO 더블네스트 해먹',
    brand: 'ENO',
    category: '해먹',
    price: '79,000',
    rating: 4.7,
    reviewCount: 1654,
    imgClass: 'img-product-tent',
    tags: ['2인용', '나일론', '방수'],
    isNew: true,
    difficulty: '입문',
    description: '두 명이 편안하게 누울 수 있는 넓은 해먹. 설치 초간단.',
  },
];

const difficultyColors = {
  '입문': { bg: 'rgba(88,152,200,0.1)', color: '#1A5880', border: 'rgba(88,152,200,0.25)' },
  '중급': { bg: 'rgba(232,160,32,0.1)', color: '#9A6800', border: 'rgba(232,160,32,0.25)' },
  '전문': { bg: 'rgba(232,104,48,0.1)', color: '#A03010', border: 'rgba(232,104,48,0.25)' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#E8A020' : 'none'} stroke={i <= Math.round(rating) ? '#E8A020' : '#CBD5C0'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function EquipmentSection({ onToast, onStartQuiz }: { onToast?: ToastFn; onStartQuiz?: () => void }) {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const filtered = activeCategory === '전체'
    ? items
    : items.filter(i => i.category === activeCategory);

  const toggleLike = (id: number) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="equipment" className="section section-alt">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">
            <Package size={13} />
            EQUIPMENT GUIDE
          </div>
          <h2 className="section-title">
            캠핑 <span className="gradient-text">장비 가이드</span>
          </h2>
          <p className="section-subtitle">
            전문가가 직접 테스트한 장비 리뷰와 추천으로 나에게 맞는 캠핑 장비를 찾아보세요
          </p>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '36px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid',
                borderColor: activeCategory === cat.id ? 'var(--forest-mid)' : 'var(--border)',
                background: activeCategory === cat.id
                  ? 'linear-gradient(135deg, var(--forest-mid), var(--sage))'
                  : 'white',
                color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.22s var(--ease-out)',
                boxShadow: activeCategory === cat.id ? '0 4px 14px rgba(44,88,64,0.3)' : 'var(--shadow-xs)',
              }}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="card"
              style={{
                animation: `fadeUp 0.4s ease ${i * 60}ms both`,
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div
                className={item.imgClass}
                style={{ height: '180px', position: 'relative', overflow: 'hidden' }}
              >
                {/* Badges */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {item.isNew && (
                    <span className="badge badge-new" style={{ fontSize: '11px' }}>NEW</span>
                  )}
                  {item.isSale && (
                    <span className="badge badge-sale" style={{ fontSize: '11px' }}>SALE</span>
                  )}
                </div>

                {/* Like button */}
                <button
                  onClick={() => toggleLike(item.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.35)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Heart
                    size={14}
                    fill={likedItems.has(item.id) ? '#FF4444' : 'none'}
                    color={likedItems.has(item.id) ? '#FF4444' : 'white'}
                  />
                </button>

                {/* Difficulty */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: difficultyColors[item.difficulty].bg,
                  color: difficultyColors[item.difficulty].color,
                  border: `1px solid ${difficultyColors[item.difficulty].border}`,
                  fontSize: '11px',
                  fontWeight: 700,
                  backdropFilter: 'blur(8px)',
                }}>
                  {item.difficulty}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  {item.brand}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.35, marginBottom: '8px', color: 'var(--text-dark)' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '12px' }}>
                  {item.description}
                </p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <StarRating rating={item.rating} />
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.rating}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({item.reviewCount.toLocaleString()})</span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {item.tags.map(t => (
                    <span key={t} className="tag" style={{ fontSize: '11px', padding: '3px 8px' }}>{t}</span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                }}>
                  <div>
                    {item.originalPrice && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₩{item.originalPrice}
                      </div>
                    )}
                    <div style={{ fontSize: '18px', fontWeight: 800, color: item.isSale ? 'var(--sunset)' : 'var(--forest)' }}>
                      ₩{item.price}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ gap: '5px', padding: '8px 14px' }}
                    onClick={() => onToast?.(`${item.name}을(를) 장바구니에 담았습니다! 🛒`, 'success')}
                  >
                    <ShoppingCart size={13} />
                    구매
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buying guide CTA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {[
            { emoji: '🎯', title: '나에게 맞는 장비 추천', desc: '5가지 질문으로 스타일·예산에 맞는 최적 장비를 AI가 추천해드립니다', color: 'var(--sky-light)', accent: '#1A5880', cta: true },
            { emoji: '🏔️', title: '백패킹 경량화 세팅', desc: '산악 백패킹을 위한 초경량 장비 조합 가이드', color: 'rgba(74,138,98,0.08)', accent: 'var(--forest-mid)', cta: false },
            { emoji: '✨', title: '감성 글램핑 아이템', desc: '인스타 감성 캠핑을 위한 프리미엄 아이템 컬렉션', color: 'var(--amber-light)', accent: '#9A6800', cta: false },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => item.cta ? onStartQuiz?.() : onToast?.(`${item.title} 가이드를 준비 중입니다!`, 'info')}
              style={{
                background: item.color,
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                border: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{item.emoji}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: item.accent, marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                {item.desc}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                fontWeight: 700,
                color: item.accent,
              }}>
                {item.cta ? '추천 받기' : '가이드 보기'} <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
