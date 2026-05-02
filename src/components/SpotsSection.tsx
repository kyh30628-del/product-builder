import React, { useState } from 'react';
import { MapPin, Star, Heart, Wifi, Zap, Droplets, Flame, ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';

interface Spot {
  id: number;
  name: string;
  location: string;
  region: string;
  type: string;
  rating: number;
  reviewCount: number;
  price: string;
  imgClass: string;
  tags: string[];
  amenities: string[];
  badge?: string;
  description: string;
}

const spots: Spot[] = [
  {
    id: 1,
    name: '설악산 오색 오토캠핑장',
    location: '강원도 양양군',
    region: '강원도',
    type: '일반',
    rating: 4.9,
    reviewCount: 2847,
    price: '38,000',
    imgClass: 'img-mountain',
    tags: ['산악', '계곡', '자연경관'],
    amenities: ['전기', '화장실', '샤워실', '와이파이'],
    badge: '🏆 Best Pick',
    description: '설악산 국립공원 내 최고의 자연 경관을 자랑하는 캠핑장. 계곡 소리와 함께하는 힐링 캠핑.',
  },
  {
    id: 2,
    name: '제주 협재 해변 캠핑장',
    location: '제주특별자치도 제주시',
    region: '제주도',
    type: '글램핑',
    rating: 4.8,
    reviewCount: 1923,
    price: '65,000',
    imgClass: 'img-beach',
    tags: ['해변', '일몰', '스노클링'],
    amenities: ['전기', '화장실', '샤워실', 'BBQ'],
    badge: '🌊 해변 인기',
    description: '에메랄드빛 협재 해변 바로 앞에 위치. 석양이 아름다운 제주 최고의 해변 캠핑 명소.',
  },
  {
    id: 3,
    name: '남이섬 포레스트 캠핑장',
    location: '경기도 가평군',
    region: '수도권',
    type: '글램핑',
    rating: 4.7,
    reviewCount: 3412,
    price: '85,000',
    imgClass: 'img-forest',
    tags: ['섬', '글램핑', '메타세콰이아'],
    amenities: ['전기', '화장실', '샤워실', '와이파이', 'BBQ'],
    badge: '✨ 글램핑 추천',
    description: '수도권에서 가장 쉽게 갈 수 있는 섬 캠핑. 메타세콰이아 숲길과 함께하는 로맨틱 글램핑.',
  },
  {
    id: 4,
    name: '지리산 달궁 오토캠핑장',
    location: '전라남도 구례군',
    region: '전라도',
    type: '일반',
    rating: 4.8,
    reviewCount: 1654,
    price: '22,000',
    imgClass: 'img-valley',
    tags: ['산악', '계곡', '별보기'],
    amenities: ['전기', '화장실', '샤워실'],
    description: '지리산 자락의 맑은 계곡과 함께하는 자연 캠핑. 밤하늘 별이 가득한 대자연 속 힐링.',
  },
  {
    id: 5,
    name: '양양 서피비치 캠핑장',
    location: '강원도 양양군',
    region: '강원도',
    type: '일반',
    rating: 4.6,
    reviewCount: 2108,
    price: '35,000',
    imgClass: 'img-sunset',
    tags: ['해변', '서핑', '청춘'],
    amenities: ['전기', '화장실', '샤워실', 'BBQ', '와이파이'],
    badge: '🏄 서핑 명소',
    description: '대한민국 서핑 성지 서피비치 바로 옆. 파도 소리와 함께 즐기는 청춘 캠핑.',
  },
  {
    id: 6,
    name: '경주 감포 해변 캠핑장',
    location: '경상북도 경주시',
    region: '경상도',
    type: '일반',
    rating: 4.5,
    reviewCount: 987,
    price: '25,000',
    imgClass: 'img-beach',
    tags: ['해변', '역사', '일출'],
    amenities: ['전기', '화장실', '샤워실'],
    description: '신라 천년의 역사도시 경주에서 즐기는 해변 캠핑. 아름다운 동해 일출이 압권.',
  },
  {
    id: 7,
    name: '가평 아침고요 캠핑장',
    location: '경기도 가평군',
    region: '수도권',
    type: '카라반',
    rating: 4.7,
    reviewCount: 2233,
    price: '95,000',
    imgClass: 'img-forest',
    tags: ['카라반', '정원', '힐링'],
    amenities: ['전기', '화장실', '샤워실', '와이파이', 'BBQ'],
    badge: '🌸 사계절 인기',
    description: '아름다운 정원이 있는 아침고요수목원 인근. 카라반과 함께하는 럭셔리 캠핑.',
  },
  {
    id: 8,
    name: '강릉 경포 솔밭 캠핑장',
    location: '강원도 강릉시',
    region: '강원도',
    type: '일반',
    rating: 4.6,
    reviewCount: 1876,
    price: '28,000',
    imgClass: 'img-beach',
    tags: ['해변', '솔밭', '경포대'],
    amenities: ['전기', '화장실', '샤워실'],
    description: '경포해변 옆 아름다운 소나무 숲 캠핑장. 파도 소리와 솔바람이 가득한 낭만 캠핑.',
  },
];

const regionFilters = ['전체', '수도권', '강원도', '경상도', '전라도', '충청도', '제주도'];
const typeFilters = ['전체', '일반', '글램핑', '카라반'];
const amenityFilters = ['전기', '화장실', '샤워실', 'BBQ', '와이파이'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#E8A020' : 'none'} stroke={i <= Math.round(rating) ? '#E8A020' : '#CBD5C0'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const amenityIcons: Record<string, React.ReactNode> = {
  '전기': <Zap size={13} />,
  '화장실': <span>🚻</span>,
  '샤워실': <Droplets size={13} />,
  'BBQ': <Flame size={13} />,
  '와이파이': <Wifi size={13} />,
};

export default function SpotsSection() {
  const [activeRegion, setActiveRegion] = useState('전체');
  const [activeType, setActiveType] = useState('전체');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const filtered = spots.filter(s => {
    const regionOk = activeRegion === '전체' || s.region === activeRegion;
    const typeOk = activeType === '전체' || s.type === activeType;
    return regionOk && typeOk;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="spots" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">
            <MapPin size={13} />
            CAMP SPOTS
          </div>
          <h2 className="section-title">
            대한민국 최고의 <span className="gradient-text">캠핑 스팟</span>
          </h2>
          <p className="section-subtitle">
            전국 5,200개 캠핑장 중 실제 후기를 기반으로 엄선된 프리미엄 캠핑 스팟을 만나보세요
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <SlidersHorizontal size={16} color="var(--text-secondary)" />
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>지역 필터</span>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {filtered.length}개 스팟 검색됨
            </span>
          </div>
          <div className="filter-bar">
            {regionFilters.map(r => (
              <button
                key={r}
                className={`filter-chip ${activeRegion === r ? 'active' : ''}`}
                onClick={() => setActiveRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="filter-bar">
            {typeFilters.map(t => (
              <button
                key={t}
                className={`filter-chip ${activeType === t ? 'active' : ''}`}
                onClick={() => setActiveType(t)}
                style={{ padding: '6px 14px', fontSize: '13px' }}
              >
                {t === '전체' ? '모든 유형' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Spots grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}>
          {displayed.map((spot, i) => (
            <div
              key={spot.id}
              className="card"
              style={{
                animation: `fadeUp 0.5s ease ${i * 80}ms both`,
                cursor: 'pointer',
              }}
            >
              {/* Image area */}
              <div
                className={spot.imgClass}
                style={{
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Badge */}
                {spot.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    {spot.badge}
                  </div>
                )}

                {/* Like button */}
                <button
                  onClick={e => { e.stopPropagation(); toggleLike(spot.id); }}
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <Heart
                    size={16}
                    fill={liked.has(spot.id) ? '#FF4444' : 'none'}
                    color={liked.has(spot.id) ? '#FF4444' : 'white'}
                  />
                </button>

                {/* Type badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                }}>
                  {spot.type}
                </div>

                {/* Location overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  <MapPin size={12} />
                  {spot.location}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-dark)', flex: 1 }}>
                    {spot.name}
                  </h3>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                  {spot.description}
                </p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <StarRating rating={spot.rating} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>{spot.rating}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>({spot.reviewCount.toLocaleString()}개 후기)</span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {spot.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Amenities */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {spot.amenities.map(a => (
                    <div key={a} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(74,138,98,0.08)',
                      color: 'var(--forest-mid)',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: '1px solid rgba(74,138,98,0.15)',
                    }}>
                      {amenityIcons[a] || null}
                      {a}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-light)',
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>1박 기준</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--forest)' }}>₩{spot.price}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>~</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                    예약하기
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        {filtered.length > 6 && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline"
              style={{ gap: '8px' }}
            >
              {showAll ? '접기' : `전체 ${filtered.length}개 스팟 보기`}
              <ChevronRight size={16} style={{ transform: showAll ? 'rotate(270deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }} />
            </button>
          </div>
        )}

        {/* Map CTA */}
        <div style={{
          marginTop: '48px',
          background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--mint)',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              🗺️ 지도 검색
            </div>
            <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '8px', fontWeight: 800 }}>
              지도로 캠핑장 찾기
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.6 }}>
              전국 캠핑장을 지도에서 직접 확인하고<br />내 위치 주변 최적의 스팟을 발견하세요
            </p>
          </div>
          <button className="btn" style={{
            padding: '14px 32px',
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 700,
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}>
            지도로 보기 →
          </button>
        </div>
      </div>
    </section>
  );
}
