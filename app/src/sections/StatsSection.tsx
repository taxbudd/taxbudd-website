import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type StatItem = {
  numericValue: number;
  suffix: string;
  title: string;
  subtitle: string;
};

const statsContent = {
  fr: [
    {
      numericValue: 18,
      suffix: '+',
      title: "Ans d’expérience",
      subtitle: "Expertise concrète en comptabilité et fiscalité",
    },
    {
      numericValue: 100,
      suffix: '%',
      title: "Virtuel",
      subtitle: "Service à distance partout au Canada",
    },
    {
      numericValue: 48,
      suffix: 'h',
      title: "Réponse rapide",
      subtitle: "Retour dans un délai de deux jours ouvrables",
    },
    {
      numericValue: 100,
      suffix: '%',
      title: "Conformité",
      subtitle: "Approche rigoureuse et professionnelle",
    },
  ],
  en: [
    {
      numericValue: 18,
      suffix: '+',
      title: "Years of Experience",
      subtitle: "Practical expertise in accounting and taxation",
    },
    {
      numericValue: 100,
      suffix: '%',
      title: "Virtual",
      subtitle: "Remote service available across Canada",
    },
    {
      numericValue: 48,
      suffix: 'h',
      title: "Fast Response",
      subtitle: "Reply within two business days",
    },
    {
      numericValue: 100,
      suffix: '%',
      title: "Compliance",
      subtitle: "Rigorous and professional approach",
    },
  ],
};

function AnimatedNumber({
  target,
  suffix = '',
  duration = 1500,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const increment = target / (duration / 16);

    const timer = window.setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        window.clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { lang } = useLanguage();
  const stats: StatItem[] = statsContent[lang as 'fr' | 'en'] || statsContent.fr;

  return (
    <section className="relative overflow-hidden bg-[#0B3C6D] py-20 lg:py-24">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-16 lg:gap-24 text-center">
          {stats.map((stat) => (
            <div key={stat.title} className="flex flex-col items-center">
              <div className="text-5xl font-bold tracking-tight text-[#D4A63C] lg:text-6xl">
                <AnimatedNumber
                  target={stat.numericValue}
                  suffix={stat.suffix}
                />
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                {stat.title}
              </h3>

              <p className="mt-2 max-w-xs text-base leading-7 text-blue-100">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
