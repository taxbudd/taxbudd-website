import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: t('contact.info.emailValue'),
      href: `mailto:${t('contact.info.emailValue')}`,
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: t('contact.info.phoneValue'),
      href: `tel:${t('contact.info.phoneValue')}`,
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.info.locationValue'),
      href: '#',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section section-alt py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-6">
            {t('contact.badge')}
          </span>
          <h2 className="heading-lg text-navy-900 mb-6">
            {t('contact.title')}{' '}
            <span className="gradient-text-gold">{t('contact.titleAccent')}</span>
          </h2>
          <p className="body-md text-navy-600">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8 lg:p-10"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h3 className="heading-sm text-navy-900 mb-3">
                  {t('contact.form.success.title')}
                </h3>
                <p className="text-navy-600">
                  {t('contact.form.success.description')}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-modern"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-modern"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-modern"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-modern"
                      placeholder={t('contact.form.companyPlaceholder')}
                    />
                  </div>
                  <div className="w-full md:col-span-2">
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <div className="relative w-full">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full min-w-0 h-[56px] appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-14 text-[14px] text-slate-700 leading-tight whitespace-nowrap overflow-hidden text-ellipsis flex items-center focus:outline-none focus:ring-2 focus:ring-[#0B2E4F] focus:border-[#0B2E4F] transition"
                      >
                        <option value="" disabled hidden>
                          {t('contact.form.subjectPlaceholder')}
                        </option>
                        {((translations[lang as 'en' | 'fr'] || translations.fr).contact.form as any).subjectOptions.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input-modern resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    t('contact.form.sending')
                  ) : (
                    <>
                      {t('contact.form.send')}
                      <Send size={18} />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-6 glass-card group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={24} className="text-gold-600" />
                </div>
                <div>
                  <p className="text-sm text-navy-500 mb-1">{item.label}</p>
                  <div className="font-display font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                    {Array.isArray(item.value) ? item.value.map((v: string, i: number) => <p key={i}>{v}</p>) : item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Map Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg h-48">
              <img
                src="/images/contact_map_static.jpg"
                alt="Location map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
