import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import {
  User,
  Building2,
  Briefcase,
  Rocket,
  Check,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  const servicesData = translations[lang].services.items;

  const services = [
    {
      icon: User,
      title: servicesData.personal.title,
      description: servicesData.personal.description,
      features: servicesData.personal.features,
      color: 'from-blue-400/20 to-blue-600/20',
      iconColor: 'text-blue-600',
    },
    {
      icon: Building2,
      title: servicesData.business.title,
      description: servicesData.business.description,
      features: servicesData.business.features,
      color: 'from-emerald-400/20 to-emerald-600/20',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Briefcase,
      title: servicesData.freelance.title,
      description: servicesData.freelance.description,
      features: servicesData.freelance.features,
      color: 'from-purple-400/20 to-purple-600/20',
      iconColor: 'text-purple-600',
    },
    {
      icon: Rocket,
      title: servicesData.startup.title,
      description: servicesData.startup.description,
      features: servicesData.startup.features,
      color: 'from-orange-400/20 to-orange-600/20',
      iconColor: 'text-orange-600',
    },
  ];

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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
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
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section section-alt py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-4xl mx-auto mb-16 px-4">
          <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-6">
            {t('services.badge')}
          </span>
          <h2 className="heading-lg text-navy-900 mb-6 leading-tight">
            {t('services.title')}{' '}
            <span className="gradient-text-gold">{t('services.titleAccent')}</span>
          </h2>
          <p className="body-md text-navy-600 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card glass-card p-8 group flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <service.icon size={28} className={service.iconColor} />
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-navy-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-gold-500"
                />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy-900 mb-4">
                {service.title}
              </h3>

              <p className="text-navy-600 text-[15px] leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <ul className="space-y-3.5 border-t border-navy-50/50 pt-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-navy-700 text-sm font-medium">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="mt-20 flex justify-center">
          <div className="glass-card max-w-2xl w-full p-10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 blur-3xl -mr-16 -mt-16 group-hover:bg-gold-400/20 transition-colors" />
            <div className="relative z-10">
              <p className="text-lg sm:text-xl text-navy-900 font-medium mb-6">
                {t('services.ctaIntro')}
              </p>
              <a
                href="#contact"
                className="btn-gold inline-flex items-center gap-3"
              >
                <span>{t('services.ctaButton')}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;