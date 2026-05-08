import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 bg-navy-950 text-white py-16">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => window.location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.location.href = '/'}>
              <img
                src="/images/taxbudd-logo.png"
                alt="TaxBudd CPA"
                className="h-16 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-navy-300 max-w-md mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="opacity-50 cursor-default w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="opacity-50 cursor-default w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.services'), id: 'services' },
                { label: t('nav.process'), id: 'approach' },
                { label: t('nav.pricing'), id: 'pricing' },
                { label: t('nav.contact'), id: 'contact' }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={window.location.pathname === '/' ? `#${item.id}` : `/#${item.id}`}
                    className="text-navy-300 hover:text-gold-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-navy-300">
                <Mail size={18} className="text-gold-400" />
                <a href="mailto:info@taxbudd.ca" className="hover:text-white transition-colors">
                  info@taxbudd.ca
                </a>
              </li>
              <li className="flex items-center gap-3 text-navy-300">
                <Phone size={18} className="text-gold-400" />
                <a href="tel:+14389307155" className="hover:text-white transition-colors">
                  +1 (438) 930-7155
                </a>
              </li>
              <li className="flex items-start gap-3 text-navy-300">
                <MapPin size={18} className="text-gold-400 flex-shrink-0 mt-1" />
                <span>Laval, Québec, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm">
            © {currentYear} TaxBudd. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-navy-400 hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="/terms" className="text-navy-400 hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
