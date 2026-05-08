import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 }
      );

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // Badges
      tl.fromTo(
        badgesRef.current?.children || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      // Hero image
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1 },
        '-=0.8'
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-4xl lg:max-w-3xl xl:max-w-4xl">
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="heading-lg text-navy-900 mb-8"
            >
              {t('hero.headline')}{' '}
              <span className="gradient-text-gold">{t('hero.headlineAccent')}</span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="body-lg text-navy-600 mb-8 whitespace-pre-line"
            >
              {t('hero.subheadline')}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-10">
              <button onClick={scrollToContact} className="btn-primary group">
                <span className="flex items-center gap-2">
                  {t('hero.bookConsultation')}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
              <button onClick={scrollToServices} className="btn-secondary">
                {t('hero.viewServices')}
              </button>
            </div>

            {/* Trust Badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-4">
              {[
                t('hero.stats.experience'),
                t('hero.stats.virtual'),
                t('hero.stats.compliance'),
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 text-sm text-navy-600"
                >
                  <CheckCircle2 size={16} className="text-gold-500" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero_office_collaboration.jpg"
                  alt="Professional team"
                  className="w-full h-[600px] object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 glass-card p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-white">
                      $
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-navy-900">
                      {t('hero.stats.savings')}
                    </p>
                    <p className="text-sm text-navy-500">{t('hero.stats.savingsLabel')}</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-navy-700">
                    Available Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
