import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { lang } = useLanguage();

  return (
    <main className="relative z-10 pt-32 pb-24 px-6 lg:px-12 max-w-4xl mx-auto w-full min-h-[70vh]">
      {lang === 'fr' ? (
        <>
          <h1 className="text-4xl font-bold text-slate-900 mb-8 mt-12">Conditions d’utilisation</h1>
          <div className="prose prose-lg text-slate-600 space-y-4">
            <p>Les informations présentées sur ce site sont fournies à titre informatif seulement.</p>
            <p>TaxBudd ne garantit pas que ces informations sont complètes ou adaptées à votre situation.</p>
            <p>L’utilisation du site ne constitue pas une relation professionnelle.</p>
            <p>Une relation officielle est établie uniquement après acceptation d’un mandat.</p>
            <p>Les tarifs affichés sont indicatifs et peuvent varier.</p>
            <p>TaxBudd ne peut être tenu responsable des décisions prises sur la base du site.</p>
            <p>Le contenu du site est protégé et ne peut être reproduit sans autorisation.</p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-slate-900 mb-8 mt-12">Terms of Use</h1>
          <div className="prose prose-lg text-slate-600 space-y-4">
            <p>The information on this website is provided for informational purposes only.</p>
            <p>TaxBudd does not guarantee that the information is complete or applicable to your situation.</p>
            <p>Use of this site does not create a professional relationship.</p>
            <p>Such a relationship is only established after formal engagement.</p>
            <p>Pricing is indicative and may vary.</p>
            <p>TaxBudd is not responsible for decisions made based on this site.</p>
            <p>All content is protected and may not be reproduced without permission.</p>
          </div>
        </>
      )}
    </main>
  );
}
