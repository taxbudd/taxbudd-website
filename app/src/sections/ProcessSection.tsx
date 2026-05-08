import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, FolderOpen, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      title: t('process.steps.discovery.title'),
      description: t('process.steps.discovery.description'),
      icon: MessageSquare,
    },
    {
      number: '02',
      title: t('process.steps.setup.title'),
      description: t('process.steps.setup.description'),
      icon: FolderOpen,
    },
    {
      number: '03',
      title: t('process.steps.support.title'),
      description: t('process.steps.support.description'),
      icon: Rocket,
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
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      const stepItems = stepsRef.current?.querySelectorAll('.process-step-item');
      if (stepItems) {
        gsap.fromTo(
          stepItems,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, x: 50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="section py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            {/* Heading */}
            <div ref={headingRef} className="mb-12">
              <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
                {t('process.badge')}
              </span>
              <h2 className="heading-lg text-navy-900 mb-6">
                {t('process.title')}{' '}
                <span className="gradient-text-gold">{t('process.titleAccent')}</span>
              </h2>
              <p className="body-md text-navy-600">
                {t('process.description')}
              </p>
            </div>

            {/* Steps */}
            <div ref={stepsRef} className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="process-step-item flex gap-6 group"
                >
                  {/* Number & Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <step.icon size={24} className="text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-gold-300 to-transparent mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-gold-500">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed text-justify">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/process_desk_overhead.jpg"
                alt="Our process"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 glass-card p-6 shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <span className="font-display font-semibold text-navy-900">
                  {t('process.floating.title')}
                </span>
              </div>
              <p className="text-sm text-navy-600">
                {t('process.floating.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
