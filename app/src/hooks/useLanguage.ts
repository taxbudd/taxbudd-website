import { useLanguage as useLanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

export const useLanguage = () => {
    const { lang, setLang, t } = useLanguageContext();
    
    return {
        lang,
        setLang,
        t: translations[lang],
        translate: t
    };
};
