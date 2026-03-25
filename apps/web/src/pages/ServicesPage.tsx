import { Building2, HeartPulse, LogIn, ShieldAlert, Users } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function ServicesPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const services = [
        {
            icon: HeartPulse,
            title: t('Smart NFC Medical Identification', 'Identification medicale NFC intelligente', 'تعريف طبي ذكي عبر NFC'),
            body: t(
                'A modern card-based identity layer that helps people carry emergency-ready medical context.',
                'Une couche d\'identite moderne basee sur carte pour porter un contexte medical d\'urgence.',
                'طبقة هوية حديثة تعتمد على البطاقة لحمل سياق طبي جاهز للطوارئ.'
            )
        },
        {
            icon: ShieldAlert,
            title: t('Quick Urgent Access', 'Acces urgent rapide', 'وصول سريع للطوارئ'),
            body: t(
                'Critical information is surfaced in seconds during emergencies while keeping private depth separated.',
                'Les informations critiques apparaissent en quelques secondes tout en separant les donnees privees.',
                'تظهر المعلومات الحرجة خلال ثوان في الطوارئ مع إبقاء العمق الخاص منفصلاً.'
            )
        },
        {
            icon: LogIn,
            title: t('Simplified Digital Access', 'Acces numerique simplifie', 'وصول رقمي مبسط'),
            body: t(
                'Users move from card interaction to login and account actions through a clear, guided flow.',
                'Les utilisateurs passent de la carte a la connexion via un parcours clair et guide.',
                'ينتقل المستخدم من تفاعل البطاقة إلى تسجيل الدخول عبر مسار واضح وموجه.'
            )
        },
        {
            icon: Users,
            title: t('Support and Onboarding', 'Support et onboarding', 'الدعم والتهيئة'),
            body: t(
                '2ks provides a startup-ready onboarding path for future clients, partners, and field demonstrations.',
                '2ks fournit un parcours d\'onboarding startup-ready pour clients, partenaires et demos terrain.',
                'توفر 2ks مسار تهيئة جاهزاً للشركات الناشئة للعملاء والشركاء والعروض الميدانية.'
            )
        },
        {
            icon: Building2,
            title: t('Partner-Ready Model', 'Modele pret pour partenaires', 'نموذج جاهز للشركاء'),
            body: t(
                'The platform concept is structured for clinics, pharmacies, and ecosystem collaboration.',
                'Le concept est structure pour cliniques, pharmacies et collaboration ecosysteme.',
                'تمت هيكلة المفهوم ليتناسب مع العيادات والصيدليات والتعاون داخل المنظومة.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Services', 'HayatID | Services', 'HayatID | الخدمات')}
                description={t(
                    'Explore HayatID service pillars for emergency identity, providers, and partners.',
                    'Decouvrez les piliers de service HayatID pour patients, soignants et partenaires.',
                    'اكتشف ركائز خدمات HayatID للمرضى ومقدمي الرعاية والشركاء.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {t('Services', 'Services', 'الخدمات')}
                    </p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t(
                            'Service building blocks designed for trust and emergency efficiency.',
                            'Des blocs de service concus pour la confiance et l\'efficacite en urgence.',
                            'مكونات خدمات مصممة للثقة والكفاءة في حالات الطوارئ.'
                        )}
                    </h1>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className={`rounded-[1.8rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold text-navy">{service.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-navy/75 sm:text-base">{service.body}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </MarketingLayout>
    );
}
