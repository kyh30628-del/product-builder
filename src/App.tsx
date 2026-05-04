import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EquipmentSection from './components/EquipmentSection';
import CaravanSection from './components/CaravanSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import RecommendQuiz from './components/RecommendQuiz';
import RecommendResults from './components/RecommendResults';
import { QuizAnswers } from './data/products';

export type ToastType = 'success' | 'info' | 'error';
export type ToastFn = (message: string, type?: ToastType) => void;

interface ToastItem { id: number; message: string; type: ToastType; }
type AppView = 'landing' | 'results';

const sectionIds = ['hero', 'equipment', 'caravans', 'reviews'];

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback<ToastFn>((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setShowQuiz(false);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setShowQuiz(true);
    setView('landing');
  };

  const handleBackToLanding = () => {
    setView('landing');
    setQuizAnswers(null);
  };

  useEffect(() => {
    if (view !== 'landing') return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) setActiveSection(entry.target.id);
      }),
      { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' }
    );
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [view]);

  if (view === 'results' && quizAnswers) {
    return (
      <>
        <RecommendResults
          answers={quizAnswers}
          onRetake={handleRetake}
          onBack={handleBackToLanding}
          onToast={showToast}
        />
        {showQuiz && (
          <RecommendQuiz
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
          />
        )}
        <Toasts toasts={toasts} />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand-light)' }}>
      <Header
        activeSection={activeSection}
        onNavigate={id => {
          setActiveSection(id);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onToast={showToast}
        onStartQuiz={() => setShowQuiz(true)}
      />
      <main>
        <Hero onStartQuiz={() => setShowQuiz(true)} />
        <EquipmentSection onToast={showToast} onStartQuiz={() => setShowQuiz(true)} />
        <CaravanSection onToast={showToast} onStartQuiz={() => setShowQuiz(true)} />
        <ReviewsSection onToast={showToast} />
      </main>
      <Footer />

      {showQuiz && (
        <RecommendQuiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
      <Toasts toasts={toasts} />
    </div>
  );
}

function Toasts({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div style={{
      position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px',
      alignItems: 'center', pointerEvents: 'none',
    }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          padding: '13px 22px', borderRadius: '14px',
          background: toast.type === 'success' ? 'rgba(26,56,40,0.96)' : toast.type === 'error' ? 'rgba(139,26,26,0.96)' : 'rgba(26,48,80,0.96)',
          color: 'white', fontSize: '14px', fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(74,138,98,0.5)' : toast.type === 'error' ? 'rgba(255,100,100,0.3)' : 'rgba(100,150,255,0.3)'}`,
          display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'fadeUp 0.3s ease',
          backdropFilter: 'blur(16px)', whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '16px' }}>
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default App;
