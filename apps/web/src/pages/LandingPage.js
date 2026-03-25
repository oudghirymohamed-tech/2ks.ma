import { motion } from 'framer-motion';
import { Activity, ArrowRight, HeartPulse, ShieldCheck, Smartphone, WalletCards, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

const featureCards = [
    {
        icon: ShieldCheck,
        title: 'Secure Medical Records',
        body: 'Protected health information, structured access, and a platform designed to support trust across the care journey.'
    },
    {
        icon: WalletCards,
        title: 'Instant NFC Access',
        body: 'A smart NFC card creates a fast connection between the physical patient identity and the digital health platform.'
    },
    {
        icon: HeartPulse,
        title: 'Better Patient-Doctor Connection',
        body: 'Patients and healthcare professionals gain a clearer, more efficient way to access the right information when needed.'
    },
    {
        icon: Activity,
        title: 'Modern Healthcare Experience',
        body: 'Built for clarity, usability, and confidence across patient onboarding, access, and ongoing healthcare management.'
    }
];

const landingContent = {
    en: {
        metaTitle: 'HayatID | Smart Medical Identity Platform',
        metaDescription: 'HayatID is a smart medical identity platform powered by 2ks technology, offering secure, modern, and accessible healthcare information management.',
        eyebrow: 'SMART MEDICAL IDENTITY PLATFORM',
        title: 'Smart medical identity for faster, safer healthcare access',
        body: 'HayatID, powered by 2ks technology, connects a smart NFC card to a secure digital health platform, making essential medical information accessible, organized, and ready when it matters most.',
        primaryCta: 'Discover HayatID',
        secondaryCta: 'Create Account',
        panelLabel: '2ks Technology',
        panelTitle: 'Connected medical identity',
        panelItems: ['Medical Records', 'NFC Card Access', 'Secure Profile', 'Digital Health Space'],
        panelBadgeTitle: 'NFC Enabled',
        panelBadgeBody: 'Fast and seamless access',
        panelStatOne: 'Trusted Access',
        panelStatOneBody: 'Secure by design',
        panelStatTwo: 'Always Connected',
        panelStatTwoBody: 'Built for modern care',
        statLabel: 'WHO WE ARE',
        statTitle: 'Redefining medical access through smart digital identity',
        statBody: 'HayatID is a next-generation medical identity platform designed to improve the way patients and healthcare professionals access medical information. By combining NFC technology with a secure digital environment, HayatID creates a more connected, efficient, and reliable healthcare experience.',
        highlights: [
            { title: 'Secure by architecture', body: 'A platform designed around trusted access, better structure, and professional healthcare usability.' },
            { title: 'Built for real-world adoption', body: 'Created for patients, doctors, partners, investors, and event visitors who need instant product clarity.' },
            { title: 'Clear medical-tech positioning', body: 'HayatID presents a premium healthcare identity experience powered by modern NFC-enabled technology.' }
        ],
        stepsLabel: 'HOW IT WORKS',
        stepsTitle: 'A seamless journey from NFC tap to secure medical access',
        steps: [
            { title: 'Tap the smart card', body: 'The HayatID NFC card connects the physical card experience to a secure digital health environment.' },
            { title: 'Access organized records', body: 'Essential medical information can be viewed, managed, and structured in one connected platform.' },
            { title: 'Continue with confidence', body: 'The experience is simple, modern, and built to make healthcare access clearer and more efficient.' }
        ],
        supportLabel: 'POWERED BY 2KS',
        supportTitle: 'The technology behind a smarter healthcare experience',
        supportBody: '2ks is the digital technology layer that powers HayatID. It enables secure interaction between the NFC medical card and the online platform, helping transform healthcare access into a smoother, smarter, and more modern experience.',
        supportPrimary: 'Create Account',
        supportSecondary: 'Discover HayatID',
        trustLabel: 'WHY HAYATID',
        trustItems: [
            'Built for clarity, speed, and trust.',
            'Designed for patients and healthcare professionals.',
            'Focused on innovation, security, and modern healthcare access.'
        ]
    },
    fr: {
        metaTitle: 'HayatID | Plateforme d\'identite medicale intelligente',
        metaDescription: 'HayatID est une plateforme d\'identite medicale intelligente propulsee par la technologie 2ks, offrant une gestion moderne, securisee et accessible des informations de sante.',
        eyebrow: 'PLATEFORME D\'IDENTITE MEDICALE INTELLIGENTE',
        title: 'Une identite medicale intelligente pour un acces aux soins plus rapide et plus sur',
        body: 'HayatID, propulsee par la technologie 2ks, relie une carte NFC intelligente a une plateforme de sante numerique securisee, afin de rendre les informations medicales essentielles plus accessibles, mieux organisees et disponibles au bon moment.',
        primaryCta: 'Decouvrir HayatID',
        secondaryCta: 'Creer un compte',
        panelLabel: 'Technologie 2ks',
        panelTitle: 'Identite medicale connectee',
        panelItems: ['Dossiers medicaux', 'Acces par carte NFC', 'Profil securise', 'Espace sante numerique'],
        panelBadgeTitle: 'NFC active',
        panelBadgeBody: 'Acces rapide et fluide',
        panelStatOne: 'Acces fiable',
        panelStatOneBody: 'Securite integree',
        panelStatTwo: 'Toujours connecte',
        panelStatTwoBody: 'Concu pour le soin moderne',
        statLabel: 'QUI SOMMES-NOUS',
        statTitle: 'Repenser l\'acces medical grace a l\'identite numerique intelligente',
        statBody: 'HayatID est une plateforme d\'identite medicale de nouvelle generation concue pour ameliorer la maniere dont les patients et les professionnels de sante accedent aux informations medicales. En combinant la technologie NFC a un environnement numerique securise, HayatID cree une experience de sante plus connectee, plus efficace et plus fiable.',
        highlights: [
            { title: 'Securite par conception', body: 'Une plateforme pensee pour un acces fiable, une meilleure structure des donnees et un usage professionnel.' },
            { title: 'Concue pour l\'adoption reelle', body: 'Pensee pour les patients, les medecins, les partenaires, les investisseurs et les visiteurs d\'evenements.' },
            { title: 'Positionnement medical-tech clair', body: 'HayatID presente une experience premium d\'identite medicale propulsee par la technologie NFC.' }
        ],
        stepsLabel: 'COMMENT CA MARCHE',
        stepsTitle: 'Un parcours fluide du geste NFC a l\'acces medical securise',
        steps: [
            { title: 'Touchez la carte intelligente', body: 'La carte NFC HayatID relie l\'experience physique a un environnement numerique de sante securise.' },
            { title: 'Accedez a des dossiers organises', body: 'Les informations medicales essentielles peuvent etre consultees, gerees et structurees dans une seule plateforme connectee.' },
            { title: 'Continuez en toute confiance', body: 'L\'experience est simple, moderne et concue pour rendre l\'acces aux soins plus clair et plus efficace.' }
        ],
        supportLabel: 'PROPULSE PAR 2KS',
        supportTitle: 'La technologie derriere une experience de sante plus intelligente',
        supportBody: '2ks est la couche technologique numerique qui alimente HayatID. Elle permet une interaction securisee entre la carte medicale NFC et la plateforme en ligne, pour transformer l\'acces aux soins en une experience plus fluide, plus intelligente et plus moderne.',
        supportPrimary: 'Creer un compte',
        supportSecondary: 'Decouvrir HayatID',
        trustLabel: 'POURQUOI HAYATID',
        trustItems: [
            'Concu pour la clarte, la rapidite et la confiance.',
            'Pense pour les patients et les professionnels de sante.',
            'Centre sur l\'innovation, la securite et l\'acces moderne aux soins.'
        ]
    },
    ar: {
        metaTitle: 'HayatID | منصة الهوية الطبية الذكية',
        metaDescription: 'HayatID هي منصة هوية طبية ذكية مدعومة بتقنية 2ks، توفر إدارة حديثة وآمنة وسهلة الوصول للمعلومات الصحية.',
        eyebrow: 'منصة الهوية الطبية الذكية',
        title: 'هوية طبية ذكية لوصول صحي أسرع وأكثر أماناً',
        body: 'HayatID، المدعومة بتقنية 2ks، تربط بطاقة NFC ذكية بمنصة صحية رقمية آمنة، مما يجعل المعلومات الطبية الأساسية أكثر سهولة في الوصول وأكثر تنظيماً وجاهزة عندما يكون الأمر مهماً.',
        primaryCta: 'اكتشف HayatID',
        secondaryCta: 'إنشاء حساب',
        panelLabel: 'تقنية 2ks',
        panelTitle: 'هوية طبية مترابطة',
        panelItems: ['السجلات الطبية', 'الوصول عبر بطاقة NFC', 'ملف آمن', 'مساحة صحية رقمية'],
        panelBadgeTitle: 'NFC مفعلة',
        panelBadgeBody: 'وصول سريع وسلس',
        panelStatOne: 'وصول موثوق',
        panelStatOneBody: 'الأمان في التصميم',
        panelStatTwo: 'اتصال دائم',
        panelStatTwoBody: 'مصمم للرعاية الحديثة',
        statLabel: 'من نحن',
        statTitle: 'إعادة تعريف الوصول الطبي عبر الهوية الرقمية الذكية',
        statBody: 'HayatID هي منصة هوية طبية من الجيل الجديد مصممة لتحسين طريقة وصول المرضى والمهنيين الصحيين إلى المعلومات الطبية. من خلال الجمع بين تقنية NFC وبيئة رقمية آمنة، تقدم HayatID تجربة صحية أكثر ترابطاً وكفاءة وموثوقية.',
        highlights: [
            { title: 'أمان في البنية', body: 'منصة مصممة للوصول الموثوق وتنظيم البيانات والاستخدام الطبي المهني.' },
            { title: 'مصممة للاستخدام الواقعي', body: 'موجهة للمرضى والأطباء والشركاء والمستثمرين وزوار الفعاليات.' },
            { title: 'هوية طبية بتوجه حديث', body: 'تقدم HayatID تجربة طبية رقمية راقية مدعومة بتقنية NFC الحديثة.' }
        ],
        stepsLabel: 'كيف يعمل',
        stepsTitle: 'رحلة سلسة من لمس البطاقة إلى الوصول الطبي الآمن',
        steps: [
            { title: 'المس البطاقة الذكية', body: 'تربط بطاقة HayatID الذكية بتقنية NFC التجربة المادية بمنصة صحية رقمية آمنة.' },
            { title: 'الوصول إلى سجلات منظمة', body: 'يمكن عرض المعلومات الطبية الأساسية وإدارتها وتنظيمها داخل منصة واحدة مترابطة.' },
            { title: 'تابع بثقة', body: 'التجربة بسيطة وحديثة ومصممة لجعل الوصول إلى الرعاية الصحية أكثر وضوحاً وكفاءة.' }
        ],
        supportLabel: 'مدعوم بواسطة 2ks',
        supportTitle: 'التقنية وراء تجربة صحية أكثر ذكاءً',
        supportBody: '2ks هي الطبقة التقنية الرقمية التي تشغل HayatID. وهي تتيح تفاعلاً آمناً بين البطاقة الطبية NFC والمنصة الرقمية، مما يحول الوصول الصحي إلى تجربة أكثر سلاسة وذكاءً وحداثة.',
        supportPrimary: 'إنشاء حساب',
        supportSecondary: 'اكتشف HayatID',
        trustLabel: 'لماذا HayatID',
        trustItems: [
            'مبنية على الوضوح والسرعة والثقة.',
            'مصممة للمرضى والمهنيين الصحيين.',
            'تركز على الابتكار والأمان والوصول الصحي الحديث.'
        ]
    }
};

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = (en, fr, ar) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };
    const content = landingContent[language];

    return (
        <MarketingLayout>
            <PageMeta title={content.metaTitle} description={content.metaDescription} />

            <section className="relative overflow-hidden border-b border-sapphire/20 bg-[radial-gradient(circle_at_top_left,_rgba(15,82,186,0.14),_transparent_32%),linear-gradient(180deg,#E9F4FB_0%,#DDECF7_45%,#F8FBFD_100%)]">
                <div className="absolute inset-0 bg-grid bg-[size:18px_18px] opacity-35" />
                <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
                <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className={isArabic ? 'font-arabic text-right' : ''}>
                            <div className="inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sapphire shadow-sm sm:text-sm">
                                <Smartphone className="h-4 w-4" />
                                <p>{content.eyebrow}</p>
                            </div>
                            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
                                {content.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-navy/75 sm:text-lg sm:leading-8">
                                {content.body}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link
                                    to="/how-it-works"
                                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#0F52BA_0%,#0C43A0_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-panel transition hover:-translate-y-0.5"
                                >
                                    {content.primaryCta}
                                    <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/80 px-7 py-3.5 text-sm font-semibold text-navy shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-sapphire/35"
                                >
                                    {content.secondaryCta}
                                    <ArrowRight className={`h-4 w-4 text-sapphire ${isArabic ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link to="/checkout" className="inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-5 py-3 text-sm font-semibold text-navy transition hover:border-sapphire hover:bg-white">
                                    <WalletCards className="h-4 w-4 text-sapphire" />
                                    {t('Get the NFC card', 'Obtenir la carte NFC', 'الحصول على بطاقة NFC')}
                                </Link>
                                <Link to="/pro" className="inline-flex items-center gap-2 rounded-full border border-sapphire/15 bg-sapphire/5 px-5 py-3 text-sm font-semibold text-navy/80 transition hover:border-sapphire/35 hover:text-sapphire">
                                    <ShieldCheck className="h-4 w-4" />
                                    {t('Professional access', 'Acces professionnel', 'دخول الأطباء')}
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className={`rounded-[2rem] border border-sapphire/20 bg-navy p-4 text-white shadow-panel sm:p-6 ${isArabic ? 'font-arabic' : ''}`}
                        >
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-powder/70">{content.panelLabel}</p>
                                        <p className="mt-2 text-xl font-semibold">{content.panelTitle}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-3 text-powder">
                                        <Smartphone className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-5 rounded-[1.4rem] bg-white p-4 text-navy sm:p-5">
                                    <p className="text-sm font-semibold text-sapphire">{t('Platform highlights', 'Points forts de la plateforme', 'أبرز مميزات المنصة')}</p>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {content.panelItems.map((item) => (
                                            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-sm font-semibold">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 rounded-2xl border border-sapphire/15 bg-[#EEF5FF] p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sapphire/80">{content.panelBadgeTitle}</p>
                                        <p className="mt-2 text-sm leading-6 text-navy/75">{content.panelBadgeBody}</p>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                                        <ShieldCheck className="h-5 w-5 text-powder" />
                                        <p className="mt-3 text-sm font-semibold text-white">{content.panelStatOne}</p>
                                        <p className="mt-2 text-sm leading-6 text-white/70">{content.panelStatOneBody}</p>
                                    </div>
                                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                                        <Wifi className="h-5 w-5 text-powder" />
                                        <p className="mt-3 text-sm font-semibold text-white">{content.panelStatTwo}</p>
                                        <p className="mt-2 text-sm leading-6 text-white/70">{content.panelStatTwoBody}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className={`rounded-[2rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{content.statLabel}</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{content.statTitle}</h2>
                        <p className="mt-4 text-base leading-7 text-navy/72">{content.statBody}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {content.highlights.map((item) => (
                            <div key={item.title} className={`rounded-[1.75rem] border border-sapphire/15 bg-powder/30 p-5 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <p className="text-lg font-semibold text-navy">{item.title}</p>
                                <p className="mt-3 text-sm leading-6 text-navy/72">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-sapphire/15 bg-white/75">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <div className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{content.stepsLabel}</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{content.stepsTitle}</h2>
                        </div>
                        <div className="grid max-w-3xl gap-4 lg:grid-cols-3">
                            {content.steps.map((step, index) => (
                                <div key={step.title} className="rounded-[1.75rem] border border-sapphire/15 bg-slate-50 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sapphire">0{index + 1}</p>
                                    <h3 className="mt-3 text-xl font-semibold text-navy">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-navy/72">{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={`mb-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{content.trustLabel}</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{t('Built for clarity, speed, and trust', 'Concu pour la clarte, la rapidite et la confiance', 'مبني على الوضوح والسرعة والثقة')}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {featureCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div key={card.title} className={`rounded-[1.75rem] border border-sapphire/15 bg-white/80 p-5 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <p className="mt-4 text-lg font-semibold text-navy">{card.title}</p>
                                <p className="mt-3 text-sm leading-6 text-navy/72">{card.body}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className={`rounded-[2rem] bg-navy p-6 text-white shadow-panel sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-powder/80">{content.supportLabel}</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{content.supportTitle}</h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{content.supportBody}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100">
                                <WalletCards className="h-4 w-4" />
                                {content.supportPrimary}
                            </Link>
                            <Link to="/how-it-works" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                {content.supportSecondary}
                            </Link>
                        </div>
                    </div>

                    <div className={`rounded-[2rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{t('Platform value', 'Valeur plateforme', 'قيمة المنصة')}</p>
                        <div className="mt-5 space-y-4">
                            {content.trustItems.map((item) => (
                                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-navy/78">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}