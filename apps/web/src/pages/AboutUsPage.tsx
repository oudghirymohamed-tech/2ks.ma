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
            icon: Target,
            title: t('Mission', 'Mission', 'المهمة'),
            body: t(
                'Make emergency medical identity clear, fast, and accessible with NFC-powered patient cards.',
                'Rendre l\'identite medicale d\'urgence claire, rapide et accessible via des cartes patients NFC.',
                'جعل الهوية الطبية للطوارئ واضحة وسريعة ومتاحة عبر بطاقات المرضى بتقنية NFC.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('Trust Model', 'Modele de confiance', 'نموذج الثقة'),
            body: t(
                'Urgent access reveals only life-critical data while private records remain protected behind controlled workflows.',
                'L\'acces urgent n\'affiche que les donnees vitales, tandis que les donnees privees restent protegees.',
                'يعرض وضع الطوارئ البيانات الحيوية فقط، بينما تبقى البيانات الخاصة محمية ضمن مسارات مضبوطة.'
            )
        },
        {
            icon: Users,
            title: t('Audience', 'Audience', 'الفئة المستهدفة'),
            body: t(
                'Built for patients, families, providers, and partner institutions seeking practical emergency readiness.',
                'Concu pour les patients, familles, soignants et institutions partenaires cherchant une vraie preparedness.',
                'مصمم للمرضى والعائلات ومقدمي الرعاية والشركاء الباحثين عن جاهزية طوارئ عملية.'
            )
        },
        {
            icon: Building2,
            title: t('Company', 'Entreprise', 'الشركة'),
            body: t(
                'HayatID is a concept by 2ks Digital Solutions, prepared as a premium public showcase for GITEX.',
                'HayatID est un concept de 2ks Digital Solutions, prepare comme vitrine premium pour GITEX.',
                'HayatID هو مفهوم من 2ks Digital Solutions، ومجهز كعرض احترافي متميز لـ GITEX.'
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
                            'A medical-tech identity concept designed for speed, trust, and clarity in emergencies.',
                            'Un concept d\'identite medical-tech concu pour la vitesse, la confiance et la clarte en urgence.',
                            'مفهوم هوية طبية تقنية مصمم للسرعة والثقة والوضوح في حالات الطوارئ.'
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
