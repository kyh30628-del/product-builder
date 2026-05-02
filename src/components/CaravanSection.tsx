import React, { useState } from 'react';
import { Truck, Users, Gauge, Bed, Wifi, Zap, ChevronRight, Star, MapPin, Calendar, Thermometer, Coffee, Tv } from 'lucide-react';

interface Caravan {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: string;
  rentalPrice?: string;
  capacity: number;
  length: string;
  weight: string;
  beds: number;
  rating: number;
  reviewCount: number;
  imgClass: string;
  features: string[];
  specs: Record<string, string>;
  description: string;
  badge?: string;
  isRentable?: boolean;
}

const types = [
  { id: '전체', label: '전체', emoji: '🚐' },
  { id: '카라반', label: '카라반', emoji: '🏠' },
  { id: '캠핑카', label: '모터홈', emoji: '🚌' },
  { id: '트럭캠퍼', label: '트럭캠퍼', emoji: '🚛' },
  { id: '밴캠핑', label: '밴캠핑', emoji: '🚐' },
];

const caravans: Caravan[] = [
  {
    id: 1,
    name: '판테라 프리미엄 카라반 6인용',
    brand: 'Pantera',
    type: '카라반',
    price: '45,000,000',
    rentalPrice: '180,000',
    capacity: 6,
    length: '7.5m',
    weight: '1,850kg',
    beds: 3,
    rating: 4.9,
    reviewCount: 234,
    imgClass: 'img-caravan-luxury',
    badge: '🏆 2024 베스트',
    isRentable: true,
    features: ['에어컨', '히터', '주방', '욕실', '거실', 'TV'],
    specs: { '길이': '7.5m', '폭': '2.3m', '높이': '2.8m', '침대수': '3개', '정원': '6인', '무게': '1,850kg' },
    description: '유럽형 풀옵션 카라반으로 최상급 편안함을 제공. 독립형 욕실과 풀 키친이 갖추어져 있어 캠핑이 아닌 이동식 별장 그 자체입니다.',
  },
  {
    id: 2,
    name: '현대 쏠라티 캠핑카 컨버전',
    brand: 'HyundaiConvert',
    type: '캠핑카',
    price: '75,000,000',
    rentalPrice: '250,000',
    capacity: 4,
    length: '5.9m',
    weight: '3,200kg',
    beds: 2,
    rating: 4.8,
    reviewCount: 187,
    imgClass: 'img-caravan-rv',
    badge: '⚡ 신모델',
    isRentable: true,
    features: ['에어컨', '히터', '주방', '욕실', '침대', '소파'],
    specs: { '길이': '5.9m', '폭': '2.0m', '높이': '2.5m', '침대수': '2개', '정원': '4인', '엔진': '2.5 디젤' },
    description: '현대 쏠라티 기반 프리미엄 컨버전 캠핑카. 좁은 도로도 진입 가능한 컴팩트한 크기에 모든 편의시설 탑재.',
  },
  {
    id: 3,
    name: '포터2 하이캠퍼 트럭캠퍼',
    brand: 'HiCamper',
    type: '트럭캠퍼',
    price: '28,000,000',
    rentalPrice: '110,000',
    capacity: 2,
    length: '2.2m',
    weight: '480kg',
    beds: 1,
    rating: 4.7,
    reviewCount: 312,
    imgClass: 'img-caravan-truck',
    isRentable: true,
    features: ['히터', '침대', '소형주방', 'USB충전', '태양광'],
    specs: { '캠퍼길이': '2.2m', '캠퍼폭': '1.8m', '높이': '1.9m', '침대수': '1개', '정원': '2인', '무게': '480kg' },
    description: '포터2 트럭에 탑재하는 경량 캠퍼. 험로도 자유롭게 다닐 수 있어 오지 캠핑에 완벽한 솔루션.',
  },
  {
    id: 4,
    name: '스타리아 캠핑카 럭셔리',
    brand: 'StarCamp',
    type: '밴캠핑',
    price: '65,000,000',
    rentalPrice: '200,000',
    capacity: 4,
    length: '5.1m',
    weight: '2,400kg',
    beds: 2,
    rating: 4.8,
    reviewCount: 278,
    imgClass: 'img-caravan-van',
    badge: '🌟 에디터 픽',
    isRentable: true,
    features: ['에어컨', '히터', '싱크대', '침대변환', '냉장고', 'TV'],
    specs: { '길이': '5.1m', '폭': '1.9m', '높이': '1.8m', '침대수': '2개', '정원': '4인', '엔진': '2.2 디젤' },
    description: '현대 스타리아 기반 감성 캠핑카. 도심에서도 어색하지 않은 세련된 외관과 내부 완성도.',
  },
  {
    id: 5,
    name: '에어스트림 바매트 캠핑트레일러',
    brand: 'Airstream',
    type: '카라반',
    price: '120,000,000',
    rentalPrice: '350,000',
    capacity: 4,
    length: '6.5m',
    weight: '2,100kg',
    beds: 2,
    rating: 5.0,
    reviewCount: 89,
    imgClass: 'img-caravan-luxury',
    badge: '💎 프리미엄',
    isRentable: true,
    features: ['에어컨', '히터', '주방', '욕실', 'TV', '소파', '세탁기'],
    specs: { '길이': '6.5m', '폭': '2.4m', '높이': '2.9m', '침대수': '2개', '정원': '4인', '외관': '알루미늄' },
    description: '미국 에어스트림 브랜드의 아이코닉 알루미늄 쉘 트레일러. 캠핑카의 롤스로이스로 불리는 최고급 모델.',
  },
  {
    id: 6,
    name: '봉고3 미니 캠퍼 DIY',
    brand: 'BongoCamp',
    type: '밴캠핑',
    price: '18,000,000',
    rentalPrice: '85,000',
    capacity: 2,
    length: '4.5m',
    weight: '1,800kg',
    beds: 1,
    rating: 4.5,
    reviewCount: 445,
    imgClass: 'img-caravan-van',
    isRentable: true,
    features: ['히터', '침대', '간이주방', 'USB충전'],
    specs: { '길이': '4.5m', '폭': '1.7m', '높이': '2.0m', '침대수': '1개', '정원': '2인', '엔진': '2.5 디젤' },
    description: '실용적인 1인~2인용 소형 캠퍼. 합리적인 가격으로 시작하는 캠핑카 라이프의 첫 걸음.',
  },
];

const featureIcons: Record<string, React.ReactNode> = {
  '에어컨': <span>❄️</span>,
  '히터': <Thermometer size={13} />,
  '주방': <Coffee size={13} />,
  '욕실': <span>🚿</span>,
  '거실': <span>🛋️</span>,
  'TV': <Tv size={13} />,
  '침대': <Bed size={13} />,
  '소파': <span>🛋️</span>,
  '냉장고': <span>🧊</span>,
  'USB충전': <Zap size={13} />,
  '태양광': <span>☀️</span>,
  '싱크대': <span>🚰</span>,
  '소형주방': <Coffee size={13} />,
  '침대변환': <Bed size={13} />,
  '세탁기': <span>🫧</span>,
  '간이주방': <Coffee size={13} />,
};

export default function CaravanSection() {
  const [activeType, setActiveType] = useState('전체');
  const [selectedCaravan, setSelectedCaravan] = useState<number | null>(null);

  const filtered = activeType === '전체'
    ? caravans
    : caravans.filter(c => c.type === activeType);

  return (
    <section id="caravans" className="section section-alt">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">
            <Truck size={13} />
            CARAVAN & CAMPER
          </div>
          <h2 className="section-title">
            카라반 & <span className="gradient-text">캠핑카</span>
          </h2>
          <p className="section-subtitle">
            이동하는 나만의 집, 카라반과 캠핑카로 대한민국 어디서든 나만의 공간을 만들어보세요
          </p>
        </div>

        {/* Type selector */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '40px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {types.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid',
                borderColor: activeType === type.id ? 'var(--forest-mid)' : 'var(--border)',
                background: activeType === type.id
                  ? 'linear-gradient(135deg, var(--forest-mid), var(--sage))'
                  : 'white',
                color: activeType === type.id ? 'white' : 'var(--text-secondary)',
                fontSize: '15px',
                fontWeight: 700,
                transition: 'all 0.22s var(--ease-out)',
                boxShadow: activeType === type.id ? '0 4px 16px rgba(44,88,64,0.3)' : 'var(--shadow-sm)',
              }}
            >
              <span style={{ fontSize: '18px' }}>{type.emoji}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Caravans grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {filtered.map((caravan, i) => (
            <div
              key={caravan.id}
              className="card"
              style={{
                animation: `fadeUp 0.5s ease ${i * 80}ms both`,
                cursor: 'pointer',
                border: selectedCaravan === caravan.id ? '2px solid var(--sage)' : '1px solid var(--border-light)',
              }}
              onClick={() => setSelectedCaravan(selectedCaravan === caravan.id ? null : caravan.id)}
            >
              {/* Image */}
              <div
                className={caravan.imgClass}
                style={{ height: '220px', position: 'relative', overflow: 'hidden' }}
              >
                {caravan.badge && (
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
                    {caravan.badge}
                  </div>
                )}

                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    <Users size={13} />
                    최대 {caravan.capacity}인
                  </div>
                  <div style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(74,138,98,0.8)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}>
                    {caravan.type}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {caravan.brand}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1.3, marginBottom: '10px', color: 'var(--text-dark)' }}>
                  {caravan.name}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>
                  {caravan.description}
                </p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= caravan.rating ? '#E8A020' : 'none'} stroke={i <= caravan.rating ? '#E8A020' : '#CBD5C0'} strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>{caravan.rating}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>({caravan.reviewCount}개 후기)</span>
                </div>

                {/* Features */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {caravan.features.map(f => (
                    <div key={f} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 9px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(74,138,98,0.08)',
                      color: 'var(--forest-mid)',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: '1px solid rgba(74,138,98,0.15)',
                    }}>
                      {featureIcons[f] || null}
                      {f}
                    </div>
                  ))}
                </div>

                {/* Specs (when selected) */}
                {selectedCaravan === caravan.id && (
                  <div style={{
                    background: 'var(--sand)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    marginBottom: '16px',
                    animation: 'fadeUp 0.25s ease',
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      📐 세부 스펙
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {Object.entries(caravan.specs).map(([key, value]) => (
                        <div key={key}>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{key}</div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price + CTA */}
                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-light)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>구매가</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest)' }}>
                        ₩{caravan.price}
                      </div>
                    </div>
                    {caravan.isRentable && caravan.rentalPrice && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>1박 렌탈</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--sunset)' }}>
                          ₩{caravan.rentalPrice}~
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline" style={{ flex: 1, fontSize: '13px', padding: '10px' }}>
                      상세 보기
                    </button>
                    {caravan.isRentable && (
                      <button className="btn btn-sunset" style={{ flex: 1, fontSize: '13px', padding: '10px', gap: '5px' }}>
                        <Calendar size={14} />
                        렌탈 예약
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips section */}
        <div style={{
          background: 'linear-gradient(135deg, var(--forest-dark) 0%, var(--forest) 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: '48px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(74,138,98,0.1)',
            border: '1px solid rgba(74,138,98,0.15)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-80px',
            left: '20%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(232,104,48,0.08)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
              💡 카라반 입문 가이드
            </div>
            <h3 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 32px)', textAlign: 'center', marginBottom: '12px' }}>
              카라반 처음이세요?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '36px', fontSize: '15px', lineHeight: 1.7 }}>
              카라반 선택부터 운전 팁, 캠핑장 예약까지 전문가가 알려드립니다
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { emoji: '🎓', title: '카라반 입문 가이드', desc: '처음 카라반을 선택하는 방법' },
                { emoji: '🚗', title: '카라반 견인 운전 팁', desc: '안전한 카라반 견인 노하우' },
                { emoji: '⚡', title: '전기·수도 연결', desc: '캠핑장에서 유틸리티 연결법' },
                { emoji: '🏕️', title: '카라반 전용 캠핑장', desc: '카라반 입장 가능한 캠핑장 리스트' },
              ].map((tip, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    transition: 'all 0.25s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{tip.emoji}</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{tip.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
