import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function FaqPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const faqs = [
        {
            q: t(
                'Is HayatID already a full medical production platform?',
                'HayatID est-il deja une plateforme medicale de production complete ?',
                'هل HayatID منصة طبية إنتاجية كاملة الآن؟'
            ),
            a: t(
                'Not yet. The current website is a polished public showcase for GITEX with controlled demo flows.',
                'Pas encore. Le site actuel est une vitrine publique premium pour GITEX avec des flux demo controles.',
                'ليس بعد. الموقع الحالي عرض عام احترافي لـ GITEX مع مسارات تجريبية مضبوطة.'
            )
        },
        {
            q: t(
                'What data is shown in urgent mode?',
                'Quelles donnees apparaissent en mode urgent ?',
                'ما البيانات التي تظهر في وضع الطوارئ؟'
            ),
            a: t(
                'Only emergency-critical fields: blood type, allergies, chronic conditions, and emergency notes.',
                'Uniquement les champs critiques: groupe sanguin, allergies, pathologies chroniques et notes d\'urgence.',
                'فقط الحقول الحرجة للطوارئ: فصيلة الدم، الحساسية، الحالات المزمنة، وملاحظات الطوارئ.'
            )
        },
        {
            q: t(
                'Does urgent mode expose full private records?',
                'Le mode urgent expose-t-il le dossier medical complet ?',
                'هل يعرض وضع الطوارئ السجل الطبي الخاص الكامل؟'
            ),
            a: t(
                'No. Full private records are intentionally separated from public urgent access.',
                'Non. Le dossier complet est volontairement separe de l\'acces urgent public.',
                'لا. السجل الخاص الكامل مفصول عمداً عن الوصول العام للطوارئ.'
            )
        },
        {
            q: t(
                'Can this be used for investor and partner presentations?',
                'Peut-on utiliser cette version pour des presentations investisseurs et partenaires ?',
                'هل يمكن استخدام هذه النسخة لعروض المستثمرين والشركاء؟'
            ),
            a: t(
                'Yes. The experience is designed to be premium, clear, and presentation-ready for GITEX.',
                'Oui. L\'experience est concue pour etre premium, claire et prete pour GITEX.',
                'نعم. التجربة مصممة لتكون احترافية وواضحة وجاهزة للعرض في GITEX.'
            )
        },
        {
            q: t(
                'How can I contact the 2ks team?',
                'Comment contacter l\'equipe 2ks ?',
                'كيف يمكن التواصل مع فريق 2ks؟'
            ),
            a: t(
                'Use the Contact Us page to reach us by phone, WhatsApp, or email and request a demo discussion.',
                'Utilisez la page Contact pour nous joindre par telephone, WhatsApp ou email et demander une discussion demo.',
                'استخدم صفحة تواصل معنا للوصول إلينا عبر الهاتف أو واتساب أو البريد الإلكتروني وطلب نقاش حول العرض.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | FAQ', 'HayatID | FAQ', 'HayatID | الأسئلة الشائعة')}
                description={t(
                    'Frequently asked questions about HayatID emergency identity and demo scope.',
                    'Questions frequentes sur HayatID et le perimetre demo.',
                    'أسئلة شائعة حول HayatID ونطاق العرض التجريبي.'
                )}
            />

            <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">FAQ</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t('Frequently asked questions', 'Questions frequentes', 'الأسئلة الشائعة')}
                    </h1>
                </div>

                <div className="mt-10 space-y-4">
                    {faqs.map((item) => (
                        <article
                            key={item.q}
                            className={`rounded-[1.5rem] border border-sapphire/15 bg-white/80 p-5 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}
                        >
                            <h2 className="text-lg font-semibold text-navy">{item.q}</h2>
                            <p className="mt-3 text-sm leading-7 text-navy/75 sm:text-base">{item.a}</p>
                        </article>
                    ))}
                </div>
            </section>
        </MarketingLayout>
    );
}
