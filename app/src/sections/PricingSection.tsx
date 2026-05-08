import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  
  const currentLang = (lang as 'en' | 'fr') || 'fr';
  const packages = translations[currentLang].pricing.packages;

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
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
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

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
            {t('pricing.badge')}
          </span>
          <h2 className="heading-lg text-navy-900 mb-6">
            {t('pricing.title')}{' '}
            <span className="gradient-text-gold">{t('pricing.titleAccent')}</span>
          </h2>
          <p className="body-md text-navy-600">
            {t('pricing.description')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="pricing-card group h-full flex flex-col relative rounded-3xl p-8 bg-[#FCFCFA] border border-navy-100 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#0B2E4F] hover:shadow-2xl hover:border-[#0B2E4F]"
            >
              {/* Header */}
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold mb-2 text-navy-900 group-hover:text-white transition-colors duration-300">
                  {pkg.name}
                </h3>
                <p className="text-sm text-navy-500 group-hover:text-navy-300 transition-colors duration-300">
                  {pkg.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-baseline">
                {pkg.currencyPrefix && <span className="text-sm align-top text-navy-900 group-hover:text-white transition-colors duration-300">{pkg.currencyPrefix}</span>}
                <span className="text-5xl font-display font-bold text-navy-900 group-hover:text-white transition-colors duration-300">
                  {pkg.price}
                </span>
                {pkg.currencySuffix && <span className="text-sm align-top text-navy-900 group-hover:text-white transition-colors duration-300">{pkg.currencySuffix}</span>}
                {pkg.period && (
                  <span className="text-sm ml-2 text-navy-500 group-hover:text-navy-300 transition-colors duration-300">
                    {pkg.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gold-100 group-hover:bg-gold-500 transition-colors duration-300">
                      <Check
                        size={12}
                        className="text-gold-600 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-sm text-navy-600 group-hover:text-navy-200 transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className="mt-auto w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-navy-900 text-white group-hover:bg-gold-500 group-hover:shadow-glow hover:!bg-gold-400"
              >
                {pkg.cta}
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-navy-500 mt-12 text-sm">
          {t('pricing.bottomNote')}{' '}
          <button
            onClick={scrollToContact}
            className="text-gold-600 font-medium hover:underline"
          >
            {t('pricing.contactUs')}
          </button>{' '}
          {t('pricing.enterpriseNote')}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
