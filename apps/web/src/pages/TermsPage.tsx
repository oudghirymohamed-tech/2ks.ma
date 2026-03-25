import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function TermsPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const sections = [
        {
            title: t('1. Purpose of this website', '1. Objet du site', '1. غرض الموقع'),
            body: t(
                'This website is a public-facing startup showcase for HayatID by 2ks Digital Solutions, prepared for presentation and concept validation.',
                'Ce site est une vitrine startup publique pour HayatID par 2ks Digital Solutions, preparee pour presentation et validation de concept.',
                'هذا الموقع عرض شركة ناشئة موجه للجمهور لـ HayatID من 2ks Digital Solutions، ومجهز للعرض والتحقق من المفهوم.'
            )
        },
        {
            title: t('2. Demo/staging limitation', '2. Limitation demo/staging', '2. حدود العرض التجريبي/المرحلي'),
            body: t(
                'Some workflows are demonstration-only and do not represent final production medical operations.',
                'Certains workflows sont uniquement de demonstration et ne representent pas les operations medicales finales.',
                'بعض المسارات مخصصة للعرض فقط ولا تمثل التشغيل الطبي الإنتاجي النهائي.'
            )
        },
        {
            title: t('3. No emergency service replacement', '3. Pas de remplacement des services d\'urgence', '3. ليس بديلاً عن خدمات الطوارئ'),
            body: t(
                'HayatID showcase content does not replace official emergency services, licensed clinical judgment, or legal medical advice.',
                'Le contenu de vitrine HayatID ne remplace pas les services d\'urgence officiels ni un avis medical legal.',
                'محتوى عرض HayatID لا يحل محل خدمات الطوارئ الرسمية أو الحكم السريري المرخص أو المشورة الطبية القانونية.'
            )
        },
        {
            title: t('4. Contact and updates', '4. Contact et mises a jour', '4. التواصل والتحديثات'),
            body: t(
                'Terms may evolve as the platform matures. For current status and partnerships, contact 2ks Digital Solutions.',
                'Les conditions peuvent evoluer avec la maturation de la plateforme. Pour le statut actuel et les partenariats, contactez 2ks Digital Solutions.',
                'قد تتغير الشروط مع تطور المنصة. لمعرفة الحالة الحالية والشراكات، تواصل مع 2ks Digital Solutions.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Terms of Service', 'HayatID | Conditions d\'utilisation', 'HayatID | شروط الاستخدام')}
                description={t(
                    'Terms of service for HayatID public website and demonstration environment.',
                    'Conditions d\'utilisation du site public et de l\'environnement de demonstration HayatID.',
                    'شروط استخدام الموقع العام وبيئة العرض التجريبي لـ HayatID.'
                )}
            />

            <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {t('Terms of Service', 'Conditions d\'utilisation', 'شروط الاستخدام')}
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t('Service terms', 'Conditions de service', 'شروط الخدمة')}
                    </h1>
                </div>

                <div className="mt-10 space-y-4">
                    {sections.map((section) => (
                        <article
                            key={section.title}
                            className={`rounded-[1.5rem] border border-sapphire/15 bg-white/80 p-5 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}
                        >
                            <h2 className="text-lg font-semibold text-navy">{section.title}</h2>
                            <p className="mt-3 text-sm leading-7 text-navy/75 sm:text-base">{section.body}</p>
                        </article>
                    ))}
                </div>

                <div className={`mt-6 rounded-3xl border border-sapphire/15 bg-powder/25 p-4 text-sm text-navy/78 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    {t(
                        'Last updated: March 2026. This legal text is a professional placeholder for the public demo website.',
                        'Derniere mise a jour : mars 2026. Ce texte legal est un placeholder professionnel pour le site de demo public.',
                        'آخر تحديث: مارس 2026. هذا النص القانوني عبارة عن محتوى احترافي مؤقت لموقع العرض العام.'
                    )}
                </div>
            </section>
        </MarketingLayout>
    );
}
