import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Star, Camera, Filter, TrendingUp, Award, Users } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  avatar: string;
  location: string;
  date: string;
  rating: number;
  spotName: string;
  spotType: string;
  title: string;
  content: string;
  likes: number;
  imgGradient: string;
  tags: string[];
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    author: '박서준',
    avatar: '🧑‍🦱',
    location: '서울',
    date: '2024.04.15',
    rating: 5,
    spotName: '설악산 오색 오토캠핑장',
    spotType: '일반캠핑',
    title: '인생 캠핑! 정말 완벽한 3박 4일',
    content: '설악산 오색 캠핑장은 정말이지 대한민국 최고의 캠핑장이라 해도 과언이 아닙니다. 계곡 소리를 들으며 잠드는 경험, 아침에 일어나 설악산 봉우리를 바라보는 느낌... 말로는 표현이 안 됩니다. 시설도 매우 깨끗하고 관리가 잘 되어 있었습니다. 특히 화장실과 샤워실이 생각보다 훨씬 좋았어요. 꼭 다시 오고 싶은 곳!',
    likes: 284,
    imgGradient: 'img-mountain',
    tags: ['가족캠핑', '계곡', '3박4일'],
    verified: true,
  },
  {
    id: 2,
    author: '김민지',
    avatar: '👩‍🦰',
    location: '부산',
    date: '2024.04.08',
    rating: 5,
    spotName: '제주 협재 해변 캠핑장',
    spotType: '해변캠핑',
    title: '협재 바다를 눈앞에서 🌊 꿈같은 2박',
    content: '제주 협재는 에메랄드 빛 바다로 유명하지만 캠핑장에서 바라보는 협재 바다는 차원이 달라요. 아침에 텐트에서 눈을 뜨면 바로 파도 소리가 들리고, 창밖으로 에메랄드 바다가 펼쳐집니다. 글램핑 돔 텐트가 너무 예뻐서 사진도 잘 나오고, 스탭분들도 너무 친절하셨어요. 단점이라면 인기가 너무 많아 예약이 힘들다는 것... 미리 예약하세요!',
    likes: 341,
    imgGradient: 'img-beach',
    tags: ['글램핑', '커플여행', '제주'],
    verified: true,
  },
  {
    id: 3,
    author: '이준혁',
    avatar: '🧔',
    location: '대구',
    date: '2024.03.28',
    rating: 4.5,
    spotName: '지리산 달궁 오토캠핑장',
    spotType: '산악캠핑',
    title: '지리산에서의 별밤 - 인생샷 건짐',
    content: '지리산 달궁 캠핑장은 빛공해가 없어서 별이 정말 잘 보입니다. 은하수를 맨눈으로 봤어요! 캠핑장 입구의 계곡도 정말 깨끗하고, 물도 엄청 차갑습니다. 4월 초인데도 밤에는 꽤 추웠어요. 동계 침낭 꼭 챙기세요. 화장실은 조금 오래됐지만 청결하게 관리되고 있었습니다. 자연 그대로의 캠핑을 원하신다면 강력 추천!',
    likes: 189,
    imgGradient: 'img-valley',
    tags: ['솔로캠핑', '별보기', '자연'],
    verified: true,
  },
  {
    id: 4,
    author: '최수연',
    avatar: '👩‍🦳',
    location: '인천',
    date: '2024.04.20',
    rating: 5,
    spotName: '남이섬 포레스트 글램핑',
    spotType: '글램핑',
    title: '캠핑 초보도 완벽히 즐길 수 있는 글램핑',
    content: '캠핑 장비가 하나도 없는데 글램핑을 처음 도전했습니다. 모든 것이 세팅되어 있고, 침구도 호텔 못지 않게 좋았습니다. 메타세콰이아 길을 새벽에 혼자 걸었는데 너무 감동적이었어요. 조식 신청했는데 아침 식사도 맛있었고, 직원분들이 친절해서 모르는 것이 있어도 다 알려주셨어요. 비용이 조금 있지만 충분히 값어치 합니다!',
    likes: 467,
    imgGradient: 'img-forest',
    tags: ['글램핑', '첫캠핑', '커플'],
    verified: true,
  },
  {
    id: 5,
    author: '정태민',
    avatar: '🧑‍🦲',
    location: '수원',
    date: '2024.04.12',
    rating: 4.5,
    spotName: '양양 서피비치 캠핑장',
    spotType: '해변캠핑',
    title: '서핑하고 캠핑하고! 이게 진짜 청춘이지',
    content: '서피비치에서 서핑 강습 받고 바로 옆 캠핑장에서 캠핑까지. 이게 진짜 여름 여행이죠. 파도 소리 들으며 바베큐 하고, 맥주 한 캔씩 하면서 친구들과 보낸 주말이 최고였습니다. 시설은 기본적이지만 충분하고, 편의점이나 식당이 가까워서 불편함이 없었어요. 다음에는 서핑 보드 렌탈 해서 더 즐겨볼 계획!',
    likes: 223,
    imgGradient: 'img-sunset',
    tags: ['서핑', '친구여행', '여름'],
    verified: false,
  },
  {
    id: 6,
    author: '한채원',
    avatar: '👩',
    location: '서울',
    date: '2024.04.18',
    rating: 5,
    spotName: '가평 아침고요 카라반 캠핑장',
    spotType: '카라반',
    title: '카라반 캠핑, 이제 텐트는 못 쓸 것 같아요',
    content: '카라반 캠핑을 처음 경험해봤는데 완전 반했습니다. 에어컨, 냉장고, 침대, 화장실까지 모두 갖춰진 이동식 집이라니... 가평 아침고요의 정원 뷰와 함께 즐기는 카라반 캠핑은 정말 럭셔리 캠핑의 정수입니다. 아이 있는 가정에도 최적! 아이가 모기 걱정 없이 편안하게 잘 수 있어서 온 가족이 만족했어요.',
    likes: 312,
    imgGradient: 'img-caravan-luxury',
    tags: ['카라반', '가족캠핑', '럭셔리'],
    verified: true,
  },
];

const ratingStats = [
  { stars: 5, count: 8420, pct: 72 },
  { stars: 4, count: 2180, pct: 18 },
  { stars: 3, count: 820, pct: 7 },
  { stars: 2, count: 234, pct: 2 },
  { stars: 1, count: 118, pct: 1 },
];

const filterTags = ['전체', '일반캠핑', '글램핑', '해변캠핑', '산악캠핑', '카라반'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => {
        const filled = i <= Math.floor(rating);
        const half = !filled && i <= rating + 0.5;
        return (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24"
            fill={filled ? '#E8A020' : 'none'}
            stroke={filled || half ? '#E8A020' : '#CBD5C0'}
            strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const filtered = activeFilter === '전체'
    ? reviews
    : reviews.filter(r => r.spotType === activeFilter);

  const toggleLike = (id: number) => {
    setLikedReviews(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="reviews" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">
            <MessageSquare size={13} />
            COMMUNITY REVIEWS
          </div>
          <h2 className="section-title">
            캠퍼들의 <span className="gradient-text">리얼 후기</span>
          </h2>
          <p className="section-subtitle">
            실제로 다녀온 캠퍼들의 생생한 후기. 꾸미지 않은 진짜 경험을 공유합니다
          </p>
        </div>

        {/* Rating overview */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          marginBottom: '40px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '40px',
          alignItems: 'center',
        }}>
          {/* Overall score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '72px',
              fontWeight: 900,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.05em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, var(--forest-mid), var(--sage))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
            }}>
              4.8
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#E8A020" stroke="#E8A020" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
              총 11,772개 후기
            </div>
          </div>

          {/* Rating bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ratingStats.map(s => (
              <div key={s.stars} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  width: '50px',
                  flexShrink: 0,
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                }}>
                  {s.stars}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8A020">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: 'var(--sand)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${s.pct}%`,
                    background: s.stars >= 4
                      ? 'linear-gradient(90deg, var(--sage), var(--mint))'
                      : s.stars === 3
                      ? 'var(--amber)'
                      : 'var(--sunset)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.8s var(--ease-out)',
                  }} />
                </div>
                <div style={{ width: '45px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'right' }}>
                  {s.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '36px' }}>
          {[
            { icon: '✍️', value: '18,000+', label: '누적 후기' },
            { icon: '📸', value: '52,000+', label: '후기 사진' },
            { icon: '👤', value: '9,200+', label: '리뷰어' },
            { icon: '⭐', value: '4.8/5.0', label: '평균 평점' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xs)',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--forest)', letterSpacing: '-0.03em' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="filter-bar" style={{ marginBottom: '32px' }}>
          {filterTags.map(tag => (
            <button
              key={tag}
              className={`filter-chip ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {filtered.map((review, i) => (
            <div
              key={review.id}
              className="card"
              style={{
                padding: '24px',
                animation: `fadeUp 0.5s ease ${i * 80}ms both`,
              }}
            >
              {/* Photo strip */}
              <div
                className={review.imgGradient}
                style={{
                  height: '120px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '18px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(74,138,98,0.8)',
                    fontSize: '11px',
                  }}>
                    {review.spotType}
                  </span>
                  {review.spotName}
                </div>
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--sand), var(--mint-light))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    border: '2px solid var(--border)',
                  }}>
                    {review.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>{review.author}</span>
                      {review.verified && (
                        <span style={{
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(74,138,98,0.1)',
                          color: 'var(--sage)',
                          fontSize: '10px',
                          fontWeight: 700,
                          border: '1px solid rgba(74,138,98,0.2)',
                        }}>
                          ✓ 인증
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{review.location} · {review.date}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {/* Title */}
              <h4 style={{ fontSize: '15px', fontWeight: 800, lineHeight: 1.35, marginBottom: '10px', color: 'var(--text-dark)' }}>
                {review.title}
              </h4>

              {/* Content */}
              <p style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '14px',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {review.content}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {review.tags.map(t => (
                  <span key={t} className="tag" style={{ fontSize: '11px', padding: '3px 8px' }}>#{t}</span>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-light)',
              }}>
                <button
                  onClick={() => toggleLike(review.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: likedReviews.has(review.id) ? 'rgba(44,88,64,0.08)' : 'transparent',
                    border: '1px solid',
                    borderColor: likedReviews.has(review.id) ? 'rgba(44,88,64,0.2)' : 'var(--border)',
                    color: likedReviews.has(review.id) ? 'var(--forest-mid)' : 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <ThumbsUp size={13} />
                  도움돼요 {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}>
                  <MessageSquare size={13} />
                  전체 보기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write review CTA */}
        <div style={{
          background: 'linear-gradient(135deg, var(--sage) 0%, var(--forest-mid) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
              나의 캠핑 후기를 공유해보세요
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>
              후기를 남기면 캠프코인을 적립해드려요.<br />
              다른 캠퍼들에게도 도움이 됩니다!
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button className="btn btn-ghost btn-lg">
              후기 보기
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: 'var(--radius-lg)',
              background: 'white',
              color: 'var(--forest-mid)',
              fontSize: '15px',
              fontWeight: 800,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer',
            }}>
              ✍️ 후기 작성하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
