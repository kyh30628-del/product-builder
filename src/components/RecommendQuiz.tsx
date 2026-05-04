import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { QuizAnswers, Style, GroupSize, Budget, Season, Priority } from '../data/products';

interface Props {
  onComplete: (answers: QuizAnswers) => void;
  onClose: () => void;
}

interface Step {
  id: keyof QuizAnswers;
  title: string;
  subtitle: string;
  options: { value: string; emoji: string; label: string; desc: string }[];
}

const steps: Step[] = [
  {
    id: 'style',
    title: '어떤 캠핑을 즐기시나요?',
    subtitle: '선호하는 캠핑 스타일을 선택해주세요',
    options: [
      { value: 'backpacking', emoji: '🎒', label: '백패킹', desc: '산악·장거리, 최대한 가볍게' },
      { value: 'auto', emoji: '🚗', label: '오토캠핑', desc: '차로 이동, 편하게 짐 싣고' },
      { value: 'glamping', emoji: '✨', label: '글램핑', desc: '편안하고 감성적인 캠핑' },
      { value: 'caravan', emoji: '🚐', label: '카라반·캠핑카', desc: '이동식 집에서 캠핑 라이프' },
    ],
  },
  {
    id: 'group',
    title: '함께 캠핑하는 인원은?',
    subtitle: '주로 함께 가는 인원 수를 선택해주세요',
    options: [
      { value: 'solo', emoji: '🧍', label: '나 혼자', desc: '1인 솔로 캠핑' },
      { value: 'duo', emoji: '👫', label: '2인', desc: '커플·친구 듀오' },
      { value: 'family', emoji: '👨‍👩‍👧', label: '3~4인 가족', desc: '부부+아이 가족 캠핑' },
      { value: 'large', emoji: '👥', label: '5인 이상', desc: '친구 모임·대가족' },
    ],
  },
  {
    id: 'budget',
    title: '장비 예산은 얼마나 생각하시나요?',
    subtitle: '구매 가능한 총 예산을 선택해주세요',
    options: [
      { value: 'low', emoji: '💰', label: '50만원 이하', desc: '가성비 위주로 시작' },
      { value: 'mid', emoji: '💰💰', label: '50~200만원', desc: '가격·품질 균형 추구' },
      { value: 'high', emoji: '💰💰💰', label: '200~500만원', desc: '검증된 브랜드 제품' },
      { value: 'premium', emoji: '💎', label: '500만원 이상', desc: '최고 품질만 고집' },
    ],
  },
  {
    id: 'season',
    title: '주로 어느 계절에 캠핑하시나요?',
    subtitle: '가장 많이 캠핑하는 계절을 선택해주세요',
    options: [
      { value: 'spring_fall', emoji: '🌸', label: '봄·가을', desc: '선선한 날씨가 최고' },
      { value: 'summer', emoji: '☀️', label: '여름', desc: '여름 휴가 캠핑 위주' },
      { value: 'winter', emoji: '❄️', label: '겨울', desc: '겨울 설캠핑도 즐겨요' },
      { value: 'all', emoji: '🍃', label: '사계절 모두', desc: '계절 상관없이 캠핑' },
    ],
  },
  {
    id: 'priority',
    title: '장비 선택 시 가장 중요한 것은?',
    subtitle: '나에게 가장 중요한 가치를 선택해주세요',
    options: [
      { value: 'light', emoji: '⚖️', label: '가벼운 무게', desc: '1g이라도 가볍게' },
      { value: 'durable', emoji: '🛡️', label: '내구성·방수', desc: '오래 쓸 수 있는 것' },
      { value: 'convenient', emoji: '✅', label: '편의성', desc: '설치·사용이 편한 것' },
      { value: 'value', emoji: '💸', label: '가성비', desc: '가격 대비 최고 성능' },
    ],
  },
];

export default function RecommendQuiz({ onComplete, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const current = steps[step];
  const progress = ((step) / steps.length) * 100;

  const choose = (value: string) => setSelected(value);

  const next = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected as any };
    setAnswers(newAnswers);

    if (step === steps.length - 1) {
      onComplete(newAnswers as QuizAnswers);
      return;
    }
    setDirection('forward');
    setSelected(null);
    setStep(s => s + 1);
  };

  const back = () => {
    if (step === 0) { onClose(); return; }
    setDirection('back');
    setSelected(answers[steps[step - 1].id] as string ?? null);
    setStep(s => s - 1);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(6,14,10,0.92)',
      backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{
        width: '100%', maxWidth: '640px',
        background: 'white',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
        animation: 'scaleIn 0.3s var(--ease-spring)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 60%, var(--sage) 100%)',
          padding: '28px 32px 24px',
          position: 'relative',
        }}>
          {/* Progress bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'rgba(255,255,255,0.15)',
          }}>
            <div style={{
              height: '100%',
              width: `${((step + 1) / steps.length) * 100}%`,
              background: 'var(--mint)',
              transition: 'width 0.5s var(--ease-out)',
              borderRadius: '0 4px 4px 0',
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={18} color="white" />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>
                맞춤 추천 {step + 1} / {steps.length}
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            >
              <X size={18} color="white" />
            </button>
          </div>

          <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.02em' }}>
            {current.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 400 }}>
            {current.subtitle}
          </p>
        </div>

        {/* Options */}
        <div style={{ padding: '24px 28px', background: 'var(--sand-light)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '24px',
          }}>
            {current.options.map((opt) => {
              const isActive = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => choose(opt.value)}
                  style={{
                    padding: '20px 18px',
                    borderRadius: '18px',
                    border: `2px solid ${isActive ? 'var(--sage)' : 'var(--border)'}`,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(44,88,64,0.08), rgba(74,138,98,0.12))'
                      : 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s var(--ease-out)',
                    boxShadow: isActive ? '0 0 0 4px rgba(74,138,98,0.12)' : 'var(--shadow-xs)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--mint-light)';
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{opt.emoji}</div>
                  <div style={{
                    fontSize: '15px', fontWeight: 700,
                    color: isActive ? 'var(--forest-mid)' : 'var(--text-dark)',
                    marginBottom: '4px',
                  }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {opt.desc}
                  </div>
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'var(--sage)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={back}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '14px 22px',
                borderRadius: 'var(--radius-md)',
                background: 'white',
                border: '1.5px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '14px', fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--sage)';
                (e.currentTarget as HTMLElement).style.color = 'var(--forest-mid)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              <ArrowLeft size={16} />
              {step === 0 ? '닫기' : '이전'}
            </button>

            <button
              onClick={next}
              disabled={!selected}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: selected
                  ? 'linear-gradient(135deg, var(--forest-mid), var(--sage))'
                  : 'var(--border)',
                color: selected ? 'white' : 'var(--text-muted)',
                fontSize: '15px', fontWeight: 700,
                transition: 'all 0.25s var(--ease-out)',
                boxShadow: selected ? '0 4px 16px rgba(44,88,64,0.35)' : 'none',
                transform: selected ? 'none' : 'none',
                cursor: selected ? 'pointer' : 'not-allowed',
              }}
            >
              {step === steps.length - 1 ? (
                <>
                  <Sparkles size={16} />
                  추천 결과 보기
                </>
              ) : (
                <>
                  다음
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '20px' }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: i === step ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i <= step ? 'var(--sage)' : 'var(--border)',
                transition: 'all 0.3s var(--ease-out)',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
