import React, { useState } from 'react';
import { ArrowLeft, Heart, ExternalLink, Users, Bed, RefreshCw, Star, Package, Truck } from 'lucide-react';
import { QuizAnswers, GearProduct, VehicleProduct, getRecommendations } from '../data/products';
import { ToastFn } from '../App';

interface Props {
  answers: QuizAnswers;
  onRetake: () => void;
  onBack: () => void;
  onToast: ToastFn;
}

const styleLabels: Record<string, string> = {
  backpacking: '🎒 백패킹',
  auto: '🚗 오토캠핑',
  glamping: '✨ 글램핑',
  caravan: '🚐 카라반·캠핑카',
};
const groupLabels: Record<string, string> = {
  solo: '🧍 1인', duo: '👫 2인', family: '👨‍👩‍👧 3~4인', large: '👥 5인+',
};
const budgetLabels: Record<string, string> = {
  low: '💰 ~50만원', mid: '💰💰 50~200만원', high: '💰💰💰 200~500만원', premium: '💎 500만원+',
};
const seasonLabels: Record<string, string> = {
  spring_fall: '🌸 봄·가을', summer: '☀️ 여름', winter: '❄️ 겨울', all: '🍃 사계절',
};
const priorityLabels: Record<string, string> = {
  light: '⚖️ 경량성', durable: '🛡️ 내구성', convenient: '✅ 편의성', value: '💸 가성비',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#E8A020' : 'none'}
          stroke={i <= Math.round(rating) ? '#E8A020' : '#CBD5C0'}
          strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function GearCard({ item, onToast }: { item: GearProduct; onToast: ToastFn }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="card" style={{ overflow: 'hidden', cursor: 'default' }}>
      <div className={item.imgClass} style={{ height: '160px', position: 'relative' }}>
        <button
          onClick={() => { setLiked(l => !l); onToast(liked ? '위시리스트에서 제거했습니다.' : `${item.name} 위시리스트 추가!`, liked ? 'info' : 'success'); }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Heart size={14} fill={liked ? '#FF4444' : 'none'} color={liked ? '#FF4444' : 'white'} />
        </button>
        <div style={{
          position: 'absolute', bottom: '10px', left: '10px',
          padding: '3px 10px', borderRadius: 'var(--radius-full)',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
          color: 'white', fontSize: '11px', fontWeight: 700,
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          {item.category}
        </div>
        {item.weight && (
          <div style={{
            position: 'absolute', bottom: '10px', right: '10px',
            padding: '3px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(74,138,98,0.8)',
            color: 'white', fontSize: '11px', fontWeight: 700,
          }}>
            {item.weight}
          </div>
        )}
      </div>

      <div style={{ padding: '14px' }}>
        <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
          {item.brand}
        </div>
        <h3 style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.35, marginBottom: '6px', color: 'var(--text-dark)' }}>
          {item.name}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '10px' }}>
          {item.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Stars rating={item.rating} />
          <span style={{ fontSize: '12px', fontWeight: 700 }}>{item.rating}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({item.reviewCount.toLocaleString()})</span>
        </div>

        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {item.tags.map(t => (
            <span key={t} className="tag" style={{ fontSize: '10px', padding: '2px 7px' }}>{t}</span>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '10px', borderTop: '1px solid var(--border-light)',
        }}>
          <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--forest)' }}>
            ₩{item.priceDisplay}
          </span>
          <a
            href={item.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '7px 12px', borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
              color: 'white', fontSize: '12px', fontWeight: 700,
              boxShadow: '0 2px 8px rgba(44,88,64,0.3)',
            }}
          >
            <ExternalLink size={11} />
            구매
          </a>
        </div>
      </div>
    </div>
  );
}

function VehicleCard({ item, onToast }: { item: VehicleProduct; onToast: ToastFn }) {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className={item.imgClass} style={{ height: '200px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          padding: '4px 10px', borderRadius: 'var(--radius-full)',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          color: 'white', fontSize: '11px', fontWeight: 700,
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          {item.country}
        </div>
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          display: 'flex', gap: '6px',
        }}>
          <div style={{
            padding: '4px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(74,138,98,0.85)',
            color: 'white', fontSize: '11px', fontWeight: 700,
          }}>
            {item.type}
          </div>
          <button
            onClick={() => { setLiked(l => !l); onToast(liked ? '위시리스트에서 제거했습니다.' : `${item.name} 위시리스트 추가!`, liked ? 'info' : 'success'); }}
            style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Heart size={12} fill={liked ? '#FF4444' : 'none'} color={liked ? '#FF4444' : 'white'} />
          </button>
        </div>
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          display: 'flex', gap: '8px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: '11px', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <Users size={11} />
            최대 {item.capacity}인
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 10px', borderRadius: 'var(--radius-full)',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: '11px', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <Bed size={11} />
            침대 {item.beds}개
          </div>
        </div>
      </div>

      <div style={{ padding: '18px' }}>
        <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
          {item.brand}
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.3, marginBottom: '8px', color: 'var(--text-dark)' }}>
          {item.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
          {item.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Stars rating={item.rating} />
          <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.rating}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({item.reviewCount.toLocaleString()}개 후기)</span>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {item.features.map(f => (
            <span key={f} style={{
              padding: '3px 9px', borderRadius: 'var(--radius-full)',
              background: 'rgba(74,138,98,0.08)', color: 'var(--forest-mid)',
              fontSize: '11px', fontWeight: 600,
              border: '1px solid rgba(74,138,98,0.15)',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Specs */}
        <div style={{
          display: 'flex', gap: '16px',
          padding: '10px 14px',
          background: 'var(--sand)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '14px',
          fontSize: '12px',
        }}>
          <div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>전장</div>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{item.length}</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>정원</div>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{item.capacity}인</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>침대</div>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{item.beds}개</div>
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          paddingTop: '12px', borderTop: '1px solid var(--border-light)',
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>구매가</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--forest)', lineHeight: 1 }}>
              {item.priceDisplay}
            </div>
            {item.rentalDisplay && (
              <div style={{ fontSize: '12px', color: 'var(--sunset)', fontWeight: 600, marginTop: '3px' }}>
                렌탈 {item.rentalDisplay}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onToast(`${item.name} 정보 페이지로 이동합니다.`, 'info')}
            >
              상세
            </button>
            {item.rentalDisplay && (
              <button
                className="btn btn-sunset btn-sm"
                onClick={() => onToast(`${item.name} 렌탈 예약이 접수되었습니다! 🎉`, 'success')}
              >
                렌탈 예약
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendResults({ answers, onRetake, onBack, onToast }: Props) {
  const [tab, setTab] = useState<'gear' | 'caravan' | 'campervan'>('gear');
  const { gear, caravans, campervans } = getRecommendations(answers);

  const tabs = [
    { id: 'gear' as const, label: '캠핑 장비', icon: <Package size={15} />, count: gear.length },
    { id: 'caravan' as const, label: '카라반', icon: <Truck size={15} />, count: caravans.length },
    { id: 'campervan' as const, label: '캠핑카', icon: <span style={{ fontSize: '15px' }}>🚐</span>, count: campervans.length },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand-light)' }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: '0 2px 20px rgba(11,32,22,0.06)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '16px' }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: 'var(--radius-md)',
              background: 'var(--sand)', color: 'var(--text-secondary)',
              fontSize: '13px', fontWeight: 600,
              border: '1px solid var(--border)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--sage)'; (e.currentTarget as HTMLElement).style.color = 'var(--forest-mid)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            <ArrowLeft size={14} />
            홈으로
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>
              ⛺ 나만의 캠핑 추천 결과
            </div>
          </div>

          <button
            onClick={onRetake}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
              color: 'white', fontSize: '13px', fontWeight: 600,
              boxShadow: '0 2px 10px rgba(44,88,64,0.3)',
            }}
          >
            <RefreshCw size={13} />
            다시 추천
          </button>
        </div>
      </div>

      {/* Hero summary */}
      <div style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 60%, var(--sage) 100%)',
        padding: '48px 0 56px',
      }}>
        <div className="container">
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 14px', borderRadius: 'var(--radius-full)',
              background: 'rgba(125,184,150,0.2)', border: '1px solid rgba(125,184,150,0.35)',
              color: 'var(--mint)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em',
            }}>
              ✨ AI 맞춤 분석 완료
            </span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em' }}>
            당신에게 딱 맞는<br />캠핑 세팅을 찾았어요
          </h1>

          {/* Answer pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              styleLabels[answers.style],
              groupLabels[answers.group],
              budgetLabels[answers.budget],
              seasonLabels[answers.season],
              priorityLabels[answers.priority],
            ].map(label => (
              <span key={label} style={{
                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 600,
              }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky', top: '64px', zIndex: 90,
      }}>
        <div className="container" style={{ display: 'flex', gap: '0' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '16px 24px',
                fontSize: '14px', fontWeight: 700,
                color: tab === t.id ? 'var(--forest-mid)' : 'var(--text-secondary)',
                borderBottom: `2.5px solid ${tab === t.id ? 'var(--sage)' : 'transparent'}`,
                background: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {t.icon}
              {t.label}
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '20px', height: '20px', borderRadius: '50%',
                background: tab === t.id ? 'var(--sage)' : 'var(--border)',
                color: tab === t.id ? 'white' : 'var(--text-muted)',
                fontSize: '11px', fontWeight: 700,
              }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {tab === 'gear' && (
          <div>
            {gear.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <p>조건에 맞는 장비를 찾지 못했어요. 다시 추천받아보세요!</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>
                    추천 캠핑 장비 <span style={{ color: 'var(--sage)' }}>{gear.length}개</span>
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    선택한 조건에 최적화된 세계 유명 브랜드 장비를 선별했습니다
                  </p>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '18px',
                }}>
                  {gear.map((item, i) => (
                    <div key={item.id} style={{ animation: `fadeUp 0.4s ease ${i * 60}ms both` }}>
                      <GearCard item={item} onToast={onToast} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'caravan' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>
                추천 카라반 <span style={{ color: 'var(--sage)' }}>{caravans.length}개</span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                실제 출시된 카라반 중 조건에 맞는 모델만 엄선했습니다
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {caravans.map((item, i) => (
                <div key={item.id} style={{ animation: `fadeUp 0.4s ease ${i * 80}ms both` }}>
                  <VehicleCard item={item} onToast={onToast} />
                </div>
              ))}
            </div>

            {/* Rental tip */}
            <div style={{
              marginTop: '40px', padding: '28px 32px',
              background: 'linear-gradient(135deg, var(--sky-light), white)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(88,152,200,0.2)',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>💡</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--sky)', marginBottom: '8px' }}>
                구매 전 렌탈 먼저 경험해보세요
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                카라반 구매는 큰 결정입니다. 각 모델별 렌탈 서비스로 먼저 직접 경험해보고,
                나에게 맞는 사이즈와 사양을 확인한 후 구매를 결정하세요.
                국내 주요 카라반 캠핑장에서 렌탈 예약이 가능합니다.
              </p>
            </div>
          </div>
        )}

        {tab === 'campervan' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>
                추천 캠핑카 <span style={{ color: 'var(--sage)' }}>{campervans.length}개</span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                국내외 공식 판매 캠핑카 중 조건에 맞는 모델을 추천합니다
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {campervans.map((item, i) => (
                <div key={item.id} style={{ animation: `fadeUp 0.4s ease ${i * 80}ms both` }}>
                  <VehicleCard item={item} onToast={onToast} />
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '40px', padding: '28px 32px',
              background: 'linear-gradient(135deg, var(--amber-light), white)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(232,160,32,0.2)',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔑</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#9A6800', marginBottom: '8px' }}>
                캠핑카 구매 전 체크리스트
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px', marginTop: '12px',
              }}>
                {['1종 보통 면허로 운전 가능 (총중량 3.5t 이하)', '캠핑장 예약 시 캠핑카 입장 여부 확인', '보험은 일반 자동차 보험으로 가입 가능', '공식 딜러 시승 프로그램 활용 권장'].map(tip => (
                  <div key={tip} style={{
                    display: 'flex', gap: '8px',
                    padding: '10px 14px',
                    background: 'rgba(232,160,32,0.06)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px', color: 'var(--text-body)', lineHeight: 1.5,
                  }}>
                    <span style={{ color: '#9A6800', flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
