import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SpotsSection from './components/SpotsSection';
import EquipmentSection from './components/EquipmentSection';
import ProductsSection from './components/ProductsSection';
import CaravanSection from './components/CaravanSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

const sectionIds = ['hero', 'spots', 'equipment', 'products', 'caravans', 'reviews'];

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand-light)' }}>
      <Header activeSection={activeSection} onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <SpotsSection />
        <EquipmentSection />
        <ProductsSection />
        <CaravanSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
