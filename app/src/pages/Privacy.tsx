import { useLanguage } from '../context/LanguageContext';

export default function Privacy() {
  const { lang } = useLanguage();

  return (
    <main className="relative z-10 pt-32 pb-24 px-6 lg:px-12 max-w-4xl mx-auto w-full min-h-[70vh]">
      {lang === 'fr' ? (
        <>
          <h1 className="text-4xl font-bold text-slate-900 mb-8 mt-12">Politique de confidentialité</h1>
          <div className="prose prose-lg text-slate-600">
            <p className="mb-4">Chez TaxBudd, nous accordons une grande importance à la protection de vos renseignements personnels.</p>
            <p className="mb-4">Les informations que vous nous transmettez via ce site (formulaire de contact, courriel, etc.) sont utilisées uniquement dans le but de :</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Répondre à vos demandes</li>
              <li>Fournir nos services comptables et fiscaux</li>
              <li>Assurer un suivi professionnel avec vous</li>
            </ul>
            <p className="mb-4">Nous ne vendons, ne louons et ne partageons jamais vos informations personnelles avec des tiers à des fins commerciales.</p>
            <p className="mb-4">Certaines données peuvent être hébergées ou traitées via des outils sécurisés utilisés dans le cadre de nos opérations.</p>
            <p className="mb-4">Nous mettons en place des mesures raisonnables pour protéger vos informations.</p>
            <p className="mb-4">Vous pouvez demander l'accès, la correction ou la suppression de vos données en nous contactant.</p>
            <p className="mt-8"><strong>Contact : info@taxbudd.ca</strong></p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-slate-900 mb-8 mt-12">Privacy Policy</h1>
          <div className="prose prose-lg text-slate-600">
            <p className="mb-4">At TaxBudd, we take the protection of your personal information seriously.</p>
            <p className="mb-4">Any information you provide through this website is used solely to:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Respond to your inquiries</li>
              <li>Deliver accounting and tax services</li>
              <li>Maintain professional communication</li>
            </ul>
            <p className="mb-4">We do not sell or share your personal information for commercial purposes.</p>
            <p className="mb-4">Some data may be processed using secure third-party tools.</p>
            <p className="mb-4">We implement reasonable security measures to protect your information.</p>
            <p className="mb-4">You may request access or deletion of your data at any time.</p>
            <p className="mt-8"><strong>Contact: info@taxbudd.ca</strong></p>
          </div>
        </>
      )}
    </main>
  );
}
