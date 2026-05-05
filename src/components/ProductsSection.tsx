import React, { useState, useMemo } from 'react';
import { ShoppingCart, Heart, ChevronRight } from 'lucide-react';
import { ToastFn } from '../App';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imgClass: string;
  badge?: string;
  isNew?: boolean;
  isBest?: boolean;
  isSale?: boolean;
  discount?: number;
  tags: string[];
}

const productCategories = [
  { id: '전체', label: '전체 상품' },
  { id: '텐트', label: '텐트' },
  { id: '취침', label: '침낭·매트' },
  { id: '조명', label: '조명·랜턴' },
  { id: '취사', label: '버너·취사도구' },
  { id: '가구', label: '의자·테이블' },
  { id: '의류', label: '캠핑 의류' },
  { id: '액세서리', label: '액세서리' },
];

const sortOptions = ['인기순', '최신순', '낮은가격순', '높은가격순', '평점순'];

const products: Product[] = [
  { id: 1, name: 'MSR 엘릭서4 4인용 텐트', brand: 'MSR', category: '텐트', price: 680000, rating: 4.9, reviewCount: 1892, imgClass: 'img-product-tent', badge: '🥇 베스트셀러', isBest: true, tags: ['방수', '4인용', '3시즌'] },
  { id: 2, name: '스노우피크 랜드락 쉘터', brand: 'Snow Peak', category: '텐트', price: 1280000, originalPrice: 1480000, rating: 4.8, reviewCount: 543, imgClass: 'img-product-tent', isSale: true, discount: 14, tags: ['쉘터', '대형', '프리미엄'] },
  { id: 3, name: 'MSR 리액터 스토브 시스템', brand: 'MSR', category: '취사', price: 189000, rating: 4.7, reviewCount: 1234, imgClass: 'img-product-stove', isNew: true, tags: ['일체형', '경량', '바람막이'] },
  { id: 4, name: '헬리녹스 그라운드 체어', brand: 'Helinox', category: '가구', price: 159000, originalPrice: 189000, rating: 4.8, reviewCount: 2341, imgClass: 'img-product-chair', isSale: true, discount: 16, tags: ['경량', '로우체어', '감성'] },
  { id: 5, name: '블랙다이아몬드 폴라로 500', brand: 'Black Diamond', category: '취침', price: 320000, rating: 4.9, reviewCount: 687, imgClass: 'img-product-bag', badge: '⭐ 편집장 추천', tags: ['동계', '구스다운', '-15°C'] },
  { id: 6, name: '코베아 캠프5 듀얼버너', brand: 'KOVEA', category: '취사', price: 128000, originalPrice: 158000, rating: 4.6, reviewCount: 3421, imgClass: 'img-product-stove', isSale: true, discount: 19, tags: ['2구버너', '가스', '이중불'] },
  { id: 7, name: '스노우피크 오제로 마그컵', brand: 'Snow Peak', category: '액세서리', price: 38000, rating: 4.7, reviewCount: 5621, imgClass: 'img-product-lamp', isNew: true, tags: ['티타늄', '경량', '450ml'] },
  { id: 8, name: '루메나 N9X 랜턴 블랙', brand: 'LUMENA', category: '조명', price: 89000, originalPrice: 110000, rating: 4.8, reviewCount: 8932, imgClass: 'img-product-lamp', badge: '🔥 인기폭발', isSale: true, discount: 19, tags: ['LED', '충전식', '방수'] },
  { id: 9, name: '헬리녹스 테이블 원 하드탑', brand: 'Helinox', category: '가구', price: 228000, rating: 4.7, reviewCount: 1543, imgClass: 'img-product-chair', tags: ['경량', '알루미늄', '4단폴딩'] },
  { id: 10, name: '파타고니아 나노퍼프 재킷', brand: 'Patagonia', category: '의류', price: 298000, rating: 4.9, reviewCount: 4521, imgClass: 'img-product-bag', isNew: true, tags: ['경량', '보온', '패킹가능'] },
  { id: 11, name: '씨투서밋 에어 매트리스 R', brand: 'Sea to Summit', category: '취침', price: 189000, rating: 4.8, reviewCount: 987, imgClass: 'img-product-bag', tags: ['에어매트', 'R3.5', '자충식'] },
  { id: 12, name: '프리뮤스 라이터 멀티버너', brand: 'Primus', category: '취사', price: 78000, originalPrice: 98000, rating: 4.5, reviewCount: 2134, imgClass: 'img-product-stove', isSale: true, discount: 20, tags: ['컴팩트', '가스', '점화기내장'] },
];

function StarRating({ rating, small }: { rating: number; small?: boolean }) {
  const size = small ? 11 : 13;
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#E8A020' : 'none'} stroke={i <= Math.round(rating) ? '#E8A020' : '#CBD5C0'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductsSection({ onToast }: { onToast?: ToastFn }) {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeSort, setActiveSort] = useState('인기순');
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const base = activeCategory === '전체'
      ? [...products]
      : products.filter(p => p.category === activeCategory);
    switch (activeSort) {
      case '낮은가격순': return base.sort((a, b) => a.price - b.price);
      case '높은가격순': return base.sort((a, b) => b.price - a.price);
      case '평점순': return base.sort((a, b) => b.rating - a.rating);
      case '최신순': return base.filter(p => p.isNew).concat(base.filter(p => !p.isNew));
      default: return base;
    }
  }, [activeCategory, activeSort]);

  const addToCart = (id: number) => {
    setCart(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="products" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">
            <ShoppingCart size={13} />
            CAMP SHOP
          </div>
          <h2 className="section-title">
            캠핑 <span className="gradient-text">용품 쇼핑</span>
          </h2>
          <p className="section-subtitle">
            검증된 캠핑 브랜드의 인기 상품을 최저가로. 전문가 후기와 함께 올바른 선택을 하세요
          </p>
        </div>

        {/* Top banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '36px',
        }}>
          {[
            { icon: '🚚', title: '무료 배송', desc: '5만원 이상 구매 시', color: 'rgba(88,152,200,0.08)' },
            { icon: '🔄', title: '30일 무료 반품', desc: '미개봉 상품에 한함', color: 'rgba(74,138,98,0.08)' },
            { icon: '🏷️', title: '회원 특가', desc: '회원가입 시 10% 할인', color: 'var(--amber-light)' },
          ].map((b, i) => (
            <div key={i} style={{
              background: b.color,
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              border: '1px solid rgba(0,0,0,0.05)',
            }}>
              <span style={{ fontSize: '28px' }}>{b.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{b.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter + Sort row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {productCategories.map(cat => (
              <button
                key={cat.id}
                className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{ fontSize: '13px', padding: '7px 14px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={activeSort}
            onChange={e => setActiveSort(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border)',
              background: 'white',
              color: 'var(--text-body)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          >
            {sortOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Products grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="card"
              style={{
                animation: `fadeUp 0.4s ease ${i * 50}ms both`,
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div
                className={product.imgClass}
                style={{ height: '200px', position: 'relative', overflow: 'hidden' }}
              >
                {/* Badges */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {product.badge && (
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(8px)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                      {product.badge}
                    </span>
                  )}
                  {product.isNew && <span className="badge badge-new" style={{ fontSize: '11px' }}>NEW</span>}
                  {product.isSale && product.discount && (
                    <span className="badge badge-sale" style={{ fontSize: '11px' }}>-{product.discount}%</span>
                  )}
                </div>

                {/* Like */}
                <button
                  onClick={e => { e.stopPropagation(); toggleLike(product.id); }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.35)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Heart size={14} fill={liked.has(product.id) ? '#FF4444' : 'none'} color={liked.has(product.id) ? '#FF4444' : 'white'} />
                </button>

                {/* Brand bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(8px)',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}>
                  {product.brand}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.4, marginBottom: '8px', color: 'var(--text-dark)' }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <StarRating rating={product.rating} small />
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{product.rating}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({product.reviewCount.toLocaleString()})</span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {product.tags.map(t => (
                    <span key={t} style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--sand)',
                      color: 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: 500,
                      border: '1px solid var(--border)',
                    }}>{t}</span>
                  ))}
                </div>

                {/* Price row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-light)',
                }}>
                  <div>
                    {product.originalPrice && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₩{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: product.isSale ? 'var(--sunset)' : 'var(--forest)',
                    }}>
                      ₩{product.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: cart.has(product.id)
                        ? 'linear-gradient(135deg, var(--sage), var(--mint))'
                        : 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(44,88,64,0.3)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <ShoppingCart size={13} />
                    {cart.has(product.id) ? '담김 ✓' : '장바구니'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart count floating */}
        {cart.size > 0 && (
          <div
            onClick={() => onToast?.(`장바구니에 ${cart.size}개 상품이 있습니다. 결제 페이지는 준비 중!`, 'info')}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              zIndex: 100,
              background: 'linear-gradient(135deg, var(--forest), var(--sage))',
              color: 'white',
              borderRadius: 'var(--radius-full)',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 32px rgba(26,56,40,0.4)',
              cursor: 'pointer',
              animation: 'scaleIn 0.3s var(--ease-spring)',
              fontWeight: 700,
              fontSize: '15px',
            }}
          >
            <ShoppingCart size={18} />
            장바구니 {cart.size}개
            <span style={{
              background: 'var(--amber)',
              color: 'white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 800,
            }}>
              {cart.size}
            </span>
          </div>
        )}

        {/* View all CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-primary btn-lg"
            style={{ gap: '10px' }}
            onClick={() => onToast?.('전체 상품 페이지는 준비 중입니다. 곧 오픈됩니다! 🛍️', 'info')}
          >
            전체 상품 보기
            <ChevronRight size={18} />
          </button>
          <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
            현재 1,240개 캠핑 상품이 등록되어 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}
