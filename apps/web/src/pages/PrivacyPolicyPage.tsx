import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function PrivacyPolicyPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const sections = [
        {
            title: t('1. Data posture', '1. Positionnement des donnees', '1. نهج البيانات'),
            body: t(
                'The public website is presentation-oriented. Demonstration data is used to explain product behavior.',
                'Le site public est oriente presentation. Des donnees de demonstration sont utilisees pour expliquer le fonctionnement.',
                'الموقع العام مخصص للعرض، ويتم استخدام بيانات تجريبية لشرح سلوك المنتج.'
            )
        },
        {
            title: t('2. Sensitive medical scope', '2. Portee medicale sensible', '2. نطاق البيانات الطبية الحساسة'),
            body: t(
                'Urgent mode is intentionally limited to emergency-critical fields and does not expose full private records.',
                'Le mode urgent est volontairement limite aux champs critiques et n\'expose pas les dossiers prives complets.',
                'وضع الطوارئ محدود عمداً بالحقول الحرجة ولا يعرض السجلات الخاصة الكاملة.'
            )
        },
        {
            title: t('3. Contact requests', '3. Demandes de contact', '3. طلبات التواصل'),
            body: t(
                'Contact form submissions in this phase are for demo and pre-sales coordination with 2ks Digital Solutions.',
                'Les soumissions de contact a ce stade sont destinees a la coordination demo et pre-vente avec 2ks Digital Solutions.',
                'إرسالات نموذج التواصل في هذه المرحلة مخصصة للتنسيق التجريبي وما قبل البيع مع 2ks Digital Solutions.'
            )
        },
        {
            title: t('4. Policy evolution', '4. Evolution de la politique', '4. تطور السياسة'),
            body: t(
                'Privacy controls and data governance will evolve as HayatID transitions toward full production architecture.',
                'Les controles de confidentialite et la gouvernance des donnees evolueront avec la transition vers une architecture de production complete.',
                'ستتطور ضوابط الخصوصية وحوكمة البيانات مع انتقال HayatID إلى بنية إنتاجية كاملة.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Privacy Policy', 'HayatID | Politique de confidentialite', 'HayatID | سياسة الخصوصية')}
                description={t(
                    'Privacy policy for HayatID website and demonstration environment.',
                    'Politique de confidentialite du site HayatID et de l\'environnement de demonstration.',
                    'سياسة الخصوصية لموقع HayatID وبيئة العرض التجريبي.'
                )}
            />

            <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {t('Privacy Policy', 'Politique de confidentialite', 'سياسة الخصوصية')}
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t('Privacy and data handling', 'Confidentialite et traitement des donnees', 'الخصوصية ومعالجة البيانات')}
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
            </section>
        </MarketingLayout>
    );
}
