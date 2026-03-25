import { Building2, ShieldCheck, Target, Users } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function AboutUsPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const pillars = [
        {
            icon: Building2,
            title: t('Who We Are', 'Qui nous sommes', 'من نحن'),
            body: t(
                '2ks Digital Solutions is building HayatID as a medical-tech concept focused on practical emergency readiness for patients and care teams.',
                '2ks Digital Solutions developpe HayatID comme un concept medical-tech axe sur une preparedness d\'urgence pratique pour patients et soignants.',
                'تطور 2ks Digital Solutions مشروع HayatID كمفهوم طبي تقني يركز على جاهزية طوارئ عملية للمرضى وفرق الرعاية.'
            )
        },
        {
            icon: Target,
            title: t('Mission', 'Mission', 'المهمة'),
            body: t(
                'Our mission is to make emergency medical identity fast, understandable, and trustworthy using NFC-enabled card experiences.',
                'Notre mission est de rendre l\'identite medicale d\'urgence rapide, comprehensible et fiable via des experiences carte NFC.',
                'مهمتنا هي جعل الهوية الطبية للطوارئ سريعة ومفهومة وموثوقة عبر تجارب بطاقات NFC.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('Vision', 'Vision', 'الرؤية'),
            body: t(
                'We aim to become a trusted digital health identity layer where urgent data is instantly available and private medical depth stays protected.',
                'Nous visons une couche d\'identite sante de confiance ou les donnees urgentes sont immediates et les donnees privees restent protegees.',
                'نطمح لأن نصبح طبقة موثوقة للهوية الصحية الرقمية حيث تتوفر بيانات الطوارئ فوراً وتبقى الخصوصية محمية.'
            )
        },
        {
            icon: Users,
            title: t('Startup Focus', 'Orientation startup', 'توجه الشركة الناشئة'),
            body: t(
                'HayatID is presented as a premium startup showcase for GITEX to validate market demand, build trust, and accelerate partnerships.',
                'HayatID est presente comme vitrine startup premium pour GITEX afin de valider la demande, renforcer la confiance et accelerer les partenariats.',
                'يتم تقديم HayatID كعرض شركة ناشئة متميز لـ GITEX للتحقق من الطلب وبناء الثقة وتسريع الشراكات.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | About Us', 'HayatID | A propos', 'HayatID | من نحن')}
                description={t(
                    'About HayatID by 2ks Digital Solutions and our mission for trusted emergency identity.',
                    'Presentation de HayatID par 2ks Digital Solutions et de notre mission.',
                    'تعرف على HayatID من 2ks Digital Solutions ورسالتنا لهوية طوارئ موثوقة.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {t('About HayatID', 'A propos de HayatID', 'عن HayatID')}
                    </p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t(
                            'The startup behind a smarter medical NFC card experience.',
                            'La startup derriere une experience carte NFC medicale plus intelligente.',
                            'الشركة الناشئة وراء تجربة بطاقة NFC طبية أكثر ذكاءً.'
                        )}
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg">
                        {t(
                            'HayatID is a public-facing startup showcase, not yet a full production medical platform. The objective is to present the model professionally, explain the product logic clearly, and open collaboration with partners and potential clients.',
                            'HayatID est une vitrine startup publique, pas encore une plateforme medicale de production complete. L\'objectif est de presenter le modele de facon professionnelle, expliquer le produit clairement et ouvrir la collaboration avec partenaires et clients potentiels.',
                            'HayatID هو عرض شركة ناشئة موجه للجمهور، وليس بعد منصة طبية إنتاجية كاملة. الهدف هو تقديم النموذج باحترافية، وشرح منطق المنتج بوضوح، وفتح باب التعاون مع الشركاء والعملاء المحتملين.'
                        )}
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;

                        return (
                            <article
                                key={pillar.title}
                                className={`rounded-[1.8rem] border border-sapphire/15 bg-white/75 p-6 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold text-navy">{pillar.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-navy/75 sm:text-base">{pillar.body}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </MarketingLayout>
    );
}
