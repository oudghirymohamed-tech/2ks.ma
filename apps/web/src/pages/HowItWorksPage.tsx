import { ArrowRight, CreditCard, ShieldAlert, ShieldCheck, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function HowItWorksPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const steps = [
        {
            icon: CreditCard,
            title: t('1. Card is tapped or scanned', '1. Carte scannee ou approchee', '1. يتم لمس البطاقة أو مسحها'),
            body: t(
                'A HayatID NFC card or QR opens a card-related page immediately.',
                'Une carte NFC ou QR HayatID ouvre instantanement une page liee a la carte.',
                'تفتح بطاقة NFC أو QR الخاصة بـ HayatID صفحة مرتبطة بالبطاقة فوراً.'
            )
        },
        {
            icon: ShieldAlert,
            title: t('2. Urgent mode appears first', '2. Mode urgent en premier', '2. يظهر وضع الطوارئ أولاً'),
            body: t(
                'Emergency-critical fields are visible instantly: blood type, allergies, chronic conditions, emergency notes.',
                'Les informations critiques apparaissent instantanement: groupe sanguin, allergies, pathologies chroniques, notes d\'urgence.',
                'تظهر بيانات الطوارئ الحرجة فوراً: فصيلة الدم، الحساسية، الحالات المزمنة، ملاحظات الطوارئ.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('3. Protected journey continues', '3. Le parcours protege continue', '3. يستمر المسار المحمي'),
            body: t(
                'Login and account onboarding continue through controlled demo/staging workflows.',
                'La connexion et l\'onboarding continuent via des workflows demo/staging controles.',
                'يتابع تسجيل الدخول وإنشاء الحساب عبر مسارات تجريبية/مرحلية مضبوطة.'
            )
        },
        {
            icon: Smartphone,
            title: t('4. Investor-ready presentation', '4. Presentation prete investisseur', '4. عرض جاهز للمستثمرين'),
            body: t(
                'The experience is designed for mobile-first clarity, trust signaling, and booth storytelling.',
                'L\'experience est concue pour la clarte mobile-first, la confiance et le storytelling salon.',
                'التجربة مصممة لوضوح الهاتف أولاً، وبناء الثقة، وسرد قصصي مناسب للمعارض.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | How It Works', 'HayatID | Comment ca marche', 'HayatID | كيف يعمل')}
                description={t(
                    'Discover how HayatID NFC emergency identity works from scan to urgent view and protected workflows.',
                    'Decouvrez le fonctionnement de HayatID de la carte NFC jusqu\'a l\'acces urgent et au parcours protege.',
                    'اكتشف كيف تعمل هوية HayatID من مسح البطاقة حتى عرض الطوارئ والمسار المحمي.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {t('How It Works', 'Comment ca marche', 'كيف يعمل')}
                    </p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t(
                            'A clear four-step model from card interaction to emergency-ready visibility.',
                            'Un modele clair en quatre etapes de l\'interaction carte a la visibilite d\'urgence.',
                            'نموذج واضح من أربع خطوات من تفاعل البطاقة إلى عرض جاهز للطوارئ.'
                        )}
                    </h1>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <article
                                key={step.title}
                                className={`rounded-[1.8rem] border border-sapphire/15 bg-powder/25 p-6 ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold text-navy">{step.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-navy/75 sm:text-base">{step.body}</p>
                            </article>
                        );
                    })}
                </div>

                <div className={`mt-10 rounded-[2rem] bg-navy p-7 text-white sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <h2 className="text-2xl font-semibold sm:text-3xl">
                        {t(
                            'See the flow live in the demo environment.',
                            'Voir le flux en direct dans l\'environnement de demo.',
                            'شاهد المسار مباشرة داخل بيئة العرض التجريبي.'
                        )}
                    </h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/u/demo-token" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy">
                            {t('Open NFC card demo', 'Ouvrir la demo NFC', 'فتح عرض بطاقة NFC')}
                            <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                            {t('Open create account demo', 'Ouvrir la demo d\'inscription', 'فتح عرض إنشاء الحساب')}
                            <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
