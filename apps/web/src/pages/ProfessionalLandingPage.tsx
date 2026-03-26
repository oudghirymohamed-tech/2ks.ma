import { ArrowRight, BookOpenText, Building2, ShieldCheck, Stethoscope, UserRoundSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { useAuth } from '../context/AuthContext';

const capabilityCards = [
    {
        key: 'visit-tracking',
        Icon: UserRoundSearch,
        en: {
            title: 'Visit tracking and continuity',
            body: 'Track patient interactions over time with role-scoped history for doctor and pharmacist spaces.'
        },
        fr: {
            title: 'Suivi des visites et continuite',
            body: 'Suivez les interactions patient dans le temps avec un historique limite a chaque espace professionnel.'
        },
        ar: {
            title: 'تتبع الزيارات واستمرارية الرعاية',
            body: 'متابعة تفاعل المريض عبر الزمن مع سجل مقيّد حسب مساحة الطبيب أو الصيدلي.'
        }
    },
    {
        key: 'shared-review',
        Icon: BookOpenText,
        en: {
            title: 'Shared information review',
            body: 'Review only authorized emergency identity details and patient-shared files for each visit.'
        },
        fr: {
            title: 'Revue des informations partagees',
            body: 'Consultez uniquement les donnees autorisees et les fichiers partages par le patient pour chaque visite.'
        },
        ar: {
            title: 'مراجعة المعلومات المشتركة',
            body: 'عرض البيانات المصرح بها فقط والملفات التي شاركها المريض لكل زيارة.'
        }
    },
    {
        key: 'records-management',
        Icon: ShieldCheck,
        en: {
            title: 'Professional record management',
            body: 'Create visit notes, assign recommendations or prescriptions, and maintain a reliable care trail.'
        },
        fr: {
            title: 'Gestion des dossiers professionnels',
            body: 'Ajoutez des notes de visite, attribuez des recommandations ou prescriptions et gardez une trace fiable.'
        },
        ar: {
            title: 'إدارة السجل المهني',
            body: 'إضافة ملاحظات الزيارة وإسناد التوصيات أو الوصفات مع مسار متابعة مهني موثوق.'
        }
    }
];

export function ProfessionalLandingPage() {
    const { language } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const canOpenWorkspace = isAuthenticated && (user?.role === 'doctor' || user?.role === 'pharmacist' || user?.role === 'admin');

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Professional Portal', 'HayatID | Portail professionnel', 'HayatID | البوابة المهنية')}
                description={t(
                    'Serious digital workspace for doctors and pharmacists with visit tracking, shared data review, and professional records management.',
                    'Espace de travail numerique pour medecins et pharmaciens avec suivi des visites, revue partagee et gestion des dossiers.',
                    'مساحة عمل رقمية احترافية للأطباء والصيادلة لتتبع الزيارات ومراجعة البيانات المشتركة وإدارة السجل المهني.'
                )}
            />
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sapphire">{t('Professional Portal', 'Portail professionnel', 'البوابة المهنية')}</p>
                        <h1 className="mt-4 text-[clamp(2rem,8vw,3.2rem)] font-semibold tracking-tight text-slate-950">
                            {t(
                                'A trusted workspace for doctors and pharmacists',
                                'Un espace fiable pour medecins et pharmaciens',
                                'مساحة موثوقة للأطباء والصيادلة'
                            )}
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            {t(
                                'Built for continuity of care, this portal gives each professional role a clear, secure, and role-scoped patient interaction workspace.',
                                'Concu pour la continuite des soins, ce portail offre a chaque role professionnel un espace patient clair, securise et limite.',
                                'مصممة لاستمرارية الرعاية، تمنح هذه البوابة لكل دور مهني مساحة واضحة وآمنة ومحددة لتفاعلات المرضى.'
                            )}
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Link
                                to={canOpenWorkspace ? '/pro/dashboard' : '/pro/login'}
                                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-sapphire px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0] sm:w-auto"
                            >
                                {canOpenWorkspace
                                    ? t('Open workspace', 'Ouvrir l espace', 'فتح مساحة العمل')
                                    : t('Professional login', 'Connexion professionnelle', 'دخول مهني')}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/pro/register?role=doctor" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sapphire/60 sm:w-auto">
                                <Stethoscope className="h-4 w-4" />
                                {t('Doctor registration', 'Inscription medecin', 'تسجيل طبيب')}
                            </Link>
                            <Link to="/pro/register?role=pharmacist" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sapphire/60 sm:w-auto">
                                <Building2 className="h-4 w-4" />
                                {t('Pharmacist registration', 'Inscription pharmacien', 'تسجيل صيدلي')}
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-navy p-6 text-white shadow-panel sm:p-8">
                        <div className="grid gap-4">
                            {capabilityCards.map((card) => (
                                <div key={card.key} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <div className="inline-flex rounded-2xl bg-white/10 p-3">
                                        <card.Icon className="h-5 w-5 text-powder" />
                                    </div>
                                    <p className="mt-4 text-lg font-semibold">
                                        {language === 'ar' ? card.ar.title : language === 'fr' ? card.fr.title : card.en.title}
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-white/75">
                                        {language === 'ar' ? card.ar.body : language === 'fr' ? card.fr.body : card.en.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
