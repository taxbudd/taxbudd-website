import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import ProcessSection from './sections/ProcessSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const path = window.location.pathname;
  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Reveal animations for sections
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stagger reveal for cards
      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        const items = container.querySelectorAll('.reveal-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blob blob-1 w-96 h-96 -top-48 -left-48" />
        <div className="blob blob-2 w-[500px] h-[500px] top-1/3 -right-48" />
        <div className="blob blob-3 w-80 h-80 bottom-20 left-1/4" />
      </div>

      {/* Navigation */}
      <Navigation />

      {path === '/privacy' ? (
        <Privacy />
      ) : path === '/terms' ? (
        <Terms />
      ) : (
        <main className="relative z-10">
          <HeroSection />
          <ServicesSection />
          <StatsSection />
          <ProcessSection />
          <TestimonialsSection />
          <PricingSection />
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
