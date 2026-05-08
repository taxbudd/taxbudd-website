import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.process'), href: '#approach' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center rounded-full p-1 border transition-all duration-300 bg-navy-900 border-navy-800">
      <button
        onClick={() => setLang('fr')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'fr'
          ? 'bg-gold-500 text-white shadow-md'
          : 'text-navy-300 hover:text-white'
          }`}
      >
        FR
      </button>
      <span className="px-1 text-[10px] font-light text-navy-700">/</span>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en'
          ? 'bg-gold-500 text-white shadow-md'
          : 'text-navy-300 hover:text-white'
          }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-navy-950/95 backdrop-blur-xl shadow-lg ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== '/') {
                  window.location.href = '/';
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center"
            >
              <img
                src="/images/taxbudd-logo.png"
                alt="TaxBudd CPA"
                className="h-16 lg:h-20 w-auto object-contain transition-all duration-300"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link text-white hover:text-gold-400"
                >
                  {link.label}
                </button>
              ))}

              <div className="flex items-center gap-4 border-l border-navy-800 pl-8 transition-colors duration-300">
                <LanguageSwitcher />
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-gold text-sm whitespace-nowrap"
                >
                  {t('nav.bookCall')}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl transition-colors hover:bg-navy-800"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-navy-900/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-white text-2xl font-display font-medium hover:text-gold-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-gold mt-4"
          >
            {t('nav.bookCall')}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
