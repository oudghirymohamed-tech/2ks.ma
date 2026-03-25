import { ArrowRight, CreditCard, Link as LinkIcon, LogIn, ShieldAlert, Smartphone } from 'lucide-react';
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
            title: t('1. Obtain an NFC card', '1. Obtenir une carte NFC', '1. الحصول على بطاقة NFC'),
            body: t(
                'The user receives a 2ks NFC medical card designed for fast emergency identification.',
                'L\'utilisateur recoit une carte medicale NFC 2ks concue pour une identification d\'urgence rapide.',
                'يتلقى المستخدم بطاقة 2ks الطبية بتقنية NFC والمصممة للتعريف السريع في الطوارئ.'
            )
        },
        {
            icon: LinkIcon,
            title: t('2. Link the card to the user', '2. Lier la carte a l\'utilisateur', '2. ربط البطاقة بالمستخدم'),
            body: t(
                'The profile is connected to the card through a guided onboarding flow.',
                'Le profil est relie a la carte via un parcours d\'onboarding guide.',
                'يتم ربط الملف الشخصي بالبطاقة عبر مسار تهيئة موجه.'
            )
        },
        {
            icon: Smartphone,
            title: t('3. Scan or open on phone', '3. Scanner ou ouvrir sur telephone', '3. المسح أو الفتح على الهاتف'),
            body: t(
                'A tap or scan opens the card experience instantly on a mobile device.',
                'Un tap ou scan ouvre instantanement l\'experience carte sur mobile.',
                'يفتح اللمس أو المسح تجربة البطاقة فوراً على الهاتف.'
            )
        },
        {
            icon: LogIn,
            title: t('4. Access login', '4. Acceder a la connexion', '4. الوصول إلى تسجيل الدخول'),
            body: t(
                'Users can continue to the login interface for the protected account journey.',
                'Les utilisateurs poursuivent vers l\'interface de connexion pour le parcours compte protege.',
                'يمكن للمستخدم متابعة تسجيل الدخول للوصول إلى مسار الحساب المحمي.'
            )
        },
        {
            icon: ShieldAlert,
            title: t('5. Use Urgent in emergencies', '5. Utiliser Urgent en cas d\'urgence', '5. استخدام Urgent في الطوارئ'),
            body: t(
                'In emergency situations, Urgent highlights only life-critical fields for fast action.',
                'En cas d\'urgence, Urgent affiche uniquement les champs vitaux pour une action rapide.',
                'في حالات الطوارئ، يعرض زر Urgent الحقول الحيوية فقط لتصرف سريع.'
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
                            'A simple five-step journey from card setup to urgent emergency access.',
                            'Un parcours simple en cinq etapes, de la configuration carte a l\'acces urgent.',
                            'رحلة بسيطة من خمس خطوات من إعداد البطاقة إلى وصول الطوارئ العاجل.'
                        )}
                    </h1>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                        <Link to="/card/demo-token" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy">
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
