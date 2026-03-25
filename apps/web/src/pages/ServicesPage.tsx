import { Building2, HeartPulse, Stethoscope, Users } from 'lucide-react';
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
            title: t('Patient Emergency Identity', 'Identite d\'urgence patient', 'هوية طوارئ للمريض'),
            body: t(
                'NFC-enabled card identity for fast emergency-critical visibility.',
                'Identite carte NFC pour une visibilite immediate des informations vitales.',
                'هوية بطاقة NFC لعرض سريع وفوري للمعلومات الحيوية.'
            )
        },
        {
            icon: Stethoscope,
            title: t('Provider Access Layers', 'Niveaux d\'acces soignants', 'طبقات وصول لمقدمي الرعاية'),
            body: t(
                'Public urgent mode is separated from deeper verified professional access.',
                'Le mode urgent public est separe de l\'acces professionnel verifie.',
                'وضع الطوارئ العام منفصل عن الوصول المهني المتحقق.'
            )
        },
        {
            icon: Users,
            title: t('Family and Contact Readiness', 'Preparation famille et contacts', 'جاهزية العائلة وجهات الاتصال'),
            body: t(
                'Structured emergency notes and contact points for rapid intervention.',
                'Notes d\'urgence structurees et contacts disponibles pour intervention rapide.',
                'ملاحظات طوارئ منظمة ونقاط اتصال للتدخل السريع.'
            )
        },
        {
            icon: Building2,
            title: t('Partner Enablement', 'Activation partenaires', 'تمكين الشركاء'),
            body: t(
                'A presentation-ready framework for clinics, pharmacies, and strategic partners.',
                'Un cadre pret pour presentation aux cliniques, pharmacies et partenaires stratégiques.',
                'إطار جاهز للعرض أمام العيادات والصيدليات والشركاء الاستراتيجيين.'
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

                <div className="mt-10 grid gap-5 md:grid-cols-2">
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
