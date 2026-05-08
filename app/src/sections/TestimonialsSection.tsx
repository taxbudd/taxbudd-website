import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  const testimonials = (t('testimonials.items') as unknown as any[]).map((item, index) => ({
    ...item,
    rating: 5,
    avatar: lang === 'en'
      ? ['IM', 'PP', 'CC'][index]
      : ['IM', 'PP', 'CC'][index]
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section section-alt py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-6">
            {t('testimonials.badge')}
          </span>
          <h2 className="heading-lg text-navy-900 mb-6">
            {t('testimonials.title')} <span className="gradient-text-gold">{t('testimonials.titleAccent')}</span>
          </h2>
          <p className="body-md text-navy-600">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-card p-8 relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                <Quote size={18} className="text-gold-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-gold-400 text-gold-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-navy-700 leading-relaxed mb-8 text-lg">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-white font-display font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-navy-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-navy-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Result Badge */}
              <div className="mt-6 pt-6 border-t border-navy-100">
                <span className="inline-flex items-center px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium">
                  {testimonial.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
