import { motion } from 'framer-motion';
import { Activity, ArrowRight, HeartPulse, ShieldCheck, Smartphone, WalletCards, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

const featureCards = [
    {
        icon: ShieldCheck,
        title: {
            en: 'Secure Medical Records',
            fr: 'Dossiers medicaux securises',
            ar: 'سجلات طبية آمنة'
        },
        body: {
            en: 'Protected health information, structured access, and a platform designed to support trust across the care journey.',
            fr: 'Informations de sante protegees, acces structure et plateforme concue pour renforcer la confiance tout au long du parcours de soin.',
            ar: 'معلومات صحية محمية، وصول منظم، ومنصة مصممة لتعزيز الثقة عبر رحلة الرعاية الصحية.'
        }
    },
    {
        icon: WalletCards,
        title: {
            en: 'Instant NFC Access',
            fr: 'Acces NFC instantane',
            ar: 'وصول فوري عبر NFC'
        },
        body: {
            en: 'A smart NFC card creates a fast connection between physical patient identity and the digital health platform.',
            fr: 'Une carte NFC intelligente cree un lien rapide entre l identite physique du patient et la plateforme numerique de sante.',
            ar: 'تُنشئ بطاقة NFC الذكية اتصالاً سريعاً بين الهوية المادية للمريض والمنصة الصحية الرقمية.'
        }
    },
    {
        icon: HeartPulse,
        title: {
            en: 'Better Patient-Doctor Connection',
            fr: 'Meilleure connexion patient-medecin',
            ar: 'تواصل أفضل بين المريض والطبيب'
        },
        body: {
            en: 'Patients and healthcare professionals gain a clearer, more efficient way to access the right information when needed.',
            fr: 'Patients et professionnels de sante beneficient d un acces plus clair et plus efficace aux bonnes informations au bon moment.',
            ar: 'يحصل المرضى والمهنيون الصحيون على طريقة أوضح وأكثر كفاءة للوصول إلى المعلومات المناسبة عند الحاجة.'
        }
    },
    {
        icon: Activity,
        title: {
            en: 'Modern Healthcare Experience',
            fr: 'Experience de sante moderne',
            ar: 'تجربة رعاية صحية حديثة'
        },
        body: {
            en: 'Built for clarity, usability, and confidence across patient onboarding, access, and ongoing healthcare management.',
            fr: 'Concue pour la clarte, la simplicite d usage et la confiance dans l onboarding patient, l acces et la gestion continue.',
            ar: 'مصممة للوضوح وسهولة الاستخدام والثقة عبر تسجيل المرضى والوصول وإدارة الرعاية الصحية المستمرة.'
        }
    }
];

const landingContent = {
    en: {
        metaTitle: 'HayatID | Smart Medical Identity Platform',
        metaDescription: 'HayatID is a smart medical identity platform powered by 2ks technology, offering secure, modern, and accessible healthcare information management.',
        eyebrow: 'HAYATID · POWERED BY 2KS TECHNOLOGY',
        title: 'Smart medical identity for faster, safer healthcare access',
        body: 'HayatID, powered by 2ks Technology, connects smart medical identity with secure, modern, and accessible healthcare interaction.',
        primaryCta: 'Discover HayatID',
        secondaryCta: 'Create Account',
        panelLabel: 'Powered by 2ks Technology',
        panelTitle: 'HayatID Platform',
        panelItems: ['Secure Digital Identity', 'NFC Card Access', 'Connected Health Experience', 'Trusted Medical Access'],
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
        supportTitle: 'The technology behind HayatID',
        supportBody: '2ks Technology powers the HayatID experience by connecting secure digital identity, smart NFC access, and structured healthcare interaction in one seamless system.',
        supportPrimary: 'Create Account',
        supportSecondary: 'Discover HayatID',
        trustLabel: 'WHY HAYATID',
        trustTitle: 'Built for clarity, speed, and trust',
        trustItems: [
            'Built for clarity, speed, and trust.',
            'Designed for patients and healthcare professionals.',
            'Focused on innovation, security, and modern healthcare access.'
        ],
        getCard: 'Get the NFC card',
        proAccess: 'Professional access',
        platformHighlights: 'HayatID platform powered by 2ks',
        platformValue: 'Platform value'
    },
    fr: {
        metaTitle: 'HayatID | Plateforme d identite medicale intelligente',
        metaDescription: 'HayatID est une plateforme d identite medicale intelligente propulsee par la technologie 2ks, offrant une gestion moderne, securisee et accessible des informations de sante.',
        eyebrow: 'HAYATID · PROPULSE PAR 2KS TECHNOLOGY',
        title: 'Une identite medicale intelligente pour un acces aux soins plus rapide et plus sur',
        body: 'HayatID, propulsee par 2ks Technology, connecte l identite medicale intelligente a une interaction de sante securisee, moderne et accessible.',
        primaryCta: 'Decouvrir HayatID',
        secondaryCta: 'Creer un compte',
        panelLabel: 'Propulse par 2ks Technology',
        panelTitle: 'Plateforme HayatID',
        panelItems: ['Identite numerique securisee', 'Acces par carte NFC', 'Experience sante connectee', 'Acces medical fiable'],
        panelBadgeTitle: 'NFC active',
        panelBadgeBody: 'Acces rapide et fluide',
        panelStatOne: 'Acces fiable',
        panelStatOneBody: 'Securite integree',
        panelStatTwo: 'Toujours connecte',
        panelStatTwoBody: 'Concu pour le soin moderne',
        statLabel: 'QUI SOMMES-NOUS',
        statTitle: 'Reinventer l acces medical grace a une identite numerique intelligente',
        statBody: 'HayatID est une plateforme d identite medicale de nouvelle generation concue pour ameliorer la maniere dont les patients et les professionnels de sante accedent aux informations medicales. En combinant la technologie NFC a un environnement numerique securise, HayatID cree une experience de sante plus connectee, plus efficace et plus fiable.',
        highlights: [
            { title: 'Securite par conception', body: 'Une plateforme pensee pour un acces fiable, une meilleure structure des donnees et un usage professionnel.' },
            { title: 'Concue pour l adoption reelle', body: 'Pensee pour les patients, les medecins, les partenaires, les investisseurs et les visiteurs d evenements.' },
            { title: 'Positionnement medical-tech clair', body: 'HayatID presente une experience premium d identite medicale propulsee par la technologie NFC.' }
        ],
        stepsLabel: 'COMMENT CA MARCHE',
        stepsTitle: 'Un parcours fluide, du scan NFC a un acces medical securise',
        steps: [
            { title: 'Touchez la carte intelligente', body: 'La carte NFC HayatID relie l experience physique a un environnement numerique de sante securise.' },
            { title: 'Accedez a des dossiers organises', body: 'Les informations medicales essentielles peuvent etre consultees, gerees et structurees dans une seule plateforme connectee.' },
            { title: 'Continuez en toute confiance', body: 'L experience est simple, moderne et concue pour rendre l acces aux soins plus clair et plus efficace.' }
        ],
        supportLabel: 'PROPULSE PAR 2KS',
        supportTitle: 'La technologie derriere HayatID',
        supportBody: '2ks Technology alimente l experience HayatID en reliant l identite numerique securisee, l acces NFC intelligent et l interaction de sante structuree dans un systeme fluide.',
        supportPrimary: 'Creer un compte',
        supportSecondary: 'Decouvrir HayatID',
        trustLabel: 'POURQUOI HAYATID',
        trustTitle: 'Concu pour la clarte, la rapidite et la confiance',
        trustItems: [
            'Concu pour la clarte, la rapidite et la confiance.',
            'Pense pour les patients et les professionnels de sante.',
            'Centre sur l innovation, la securite et l acces moderne aux soins.'
        ],
        getCard: 'Obtenir la carte NFC',
        proAccess: 'Acces professionnel',
        platformHighlights: 'Plateforme HayatID propulsee par 2ks',
        platformValue: 'Valeur plateforme'
    },
    ar: {
        metaTitle: 'HayatID | منصة الهوية الطبية الذكية',
        metaDescription: 'HayatID هي منصة هوية طبية ذكية مدعومة بتقنية 2ks، توفر إدارة حديثة وآمنة وسهلة الوصول للمعلومات الصحية.',
        eyebrow: 'HAYATID · مدعوم بتقنية 2KS',
        title: 'هوية طبية ذكية لوصول أسرع وأكثر أمانًا إلى الرعاية الصحية',
        body: 'HayatID، المدعومة بتقنية 2ks Technology، تربط الهوية الطبية الذكية بتفاعل صحي آمن وحديث وسهل الوصول.',
        primaryCta: 'اكتشف HayatID',
        secondaryCta: 'إنشاء حساب',
        panelLabel: 'مدعوم بتقنية 2ks Technology',
        panelTitle: 'منصة HayatID',
        panelItems: ['هوية رقمية آمنة', 'وصول عبر بطاقة NFC', 'تجربة صحية مترابطة', 'وصول طبي موثوق'],
        panelBadgeTitle: 'NFC مفعلة',
        panelBadgeBody: 'وصول سريع وسلس',
        panelStatOne: 'وصول موثوق',
        panelStatOneBody: 'الأمان في التصميم',
        panelStatTwo: 'اتصال دائم',
        panelStatTwoBody: 'مصمم للرعاية الحديثة',
        statLabel: 'من نحن',
        statTitle: 'نعيد تعريف الوصول إلى المعلومات الطبية عبر هوية رقمية ذكية',
        statBody: 'HayatID هي منصة هوية طبية من الجيل الجديد مصممة لتحسين طريقة وصول المرضى والمهنيين الصحيين إلى المعلومات الطبية. من خلال الجمع بين تقنية NFC وبيئة رقمية آمنة، تقدم HayatID تجربة صحية أكثر ترابطاً وكفاءة وموثوقية.',
        highlights: [
            { title: 'أمان في البنية', body: 'منصة مصممة للوصول الموثوق وتنظيم البيانات والاستخدام الطبي المهني.' },
            { title: 'مصممة للاستخدام الواقعي', body: 'موجهة للمرضى والأطباء والشركاء والمستثمرين وزوار الفعاليات.' },
            { title: 'هوية طبية بتوجه حديث', body: 'تقدم HayatID تجربة طبية رقمية راقية مدعومة بتقنية NFC الحديثة.' }
        ],
        stepsLabel: 'كيف يعمل',
        stepsTitle: 'تجربة سلسة من لمس بطاقة NFC إلى الوصول الآمن للمعلومات الطبية',
        steps: [
            { title: 'المس البطاقة الذكية', body: 'تربط بطاقة HayatID الذكية بتقنية NFC التجربة المادية بمنصة صحية رقمية آمنة.' },
            { title: 'الوصول إلى سجلات منظمة', body: 'يمكن عرض المعلومات الطبية الأساسية وإدارتها وتنظيمها داخل منصة واحدة مترابطة.' },
            { title: 'تابع بثقة', body: 'التجربة بسيطة وحديثة ومصممة لجعل الوصول إلى الرعاية الصحية أكثر وضوحاً وكفاءة.' }
        ],
        supportLabel: 'مدعوم بواسطة 2ks',
        supportTitle: 'التقنية وراء HayatID',
        supportBody: 'تقنية 2ks تشغل تجربة HayatID عبر ربط الهوية الرقمية الآمنة، ووصول NFC الذكي، والتفاعل الصحي المنظم داخل نظام واحد سلس.',
        supportPrimary: 'إنشاء حساب',
        supportSecondary: 'اكتشف HayatID',
        trustLabel: 'لماذا HayatID',
        trustTitle: 'مصمم ليمنحك الوضوح والسرعة والثقة',
        trustItems: [
            'مبني على الوضوح والسرعة والثقة.',
            'مصمم للمرضى والمهنيين الصحيين.',
            'يركز على الابتكار والأمان والوصول الصحي الحديث.'
        ],
        getCard: 'الحصول على بطاقة NFC',
        proAccess: 'دخول الأطباء',
        platformHighlights: 'منصة HayatID المدعومة بتقنية 2ks',
        platformValue: 'قيمة المنصة'
    }
} as const;

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const content = landingContent[language === 'fr' ? 'fr' : isArabic ? 'ar' : 'en'];

    return (
        <MarketingLayout>
            <PageMeta title={content.metaTitle} description={content.metaDescription} />

            <section className="relative overflow-hidden border-b border-sapphire/20 bg-[radial-gradient(circle_at_top_left,_rgba(15,82,186,0.14),_transparent_32%),linear-gradient(180deg,#E9F4FB_0%,#DDECF7_45%,#F8FBFD_100%)]">
                <div className="absolute inset-0 bg-grid bg-[size:18px_18px] opacity-35" />
                <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-sapphire/10 blur-2xl"
                    animate={{ y: [0, -10, 0], opacity: [0.55, 0.75, 0.55] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 top-28 h-44 w-44 rounded-full bg-white/35 blur-3xl"
                    animate={{ y: [0, 12, 0], opacity: [0.45, 0.7, 0.45] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-24">
                    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className={isArabic ? 'font-arabic text-right' : ''}>
                            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sapphire shadow-sm sm:px-4 sm:text-sm sm:tracking-[0.22em]">
                                <Smartphone className="h-4 w-4" />
                                <p className="truncate">{content.eyebrow}</p>
                            </div>
                            <h1 className="mt-5 max-w-4xl text-[clamp(1.95rem,8vw,3.8rem)] font-semibold leading-[1.08] tracking-tight text-navy">
                                {content.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-navy/75 sm:mt-5 sm:text-lg sm:leading-8">
                                {content.body}
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link
                                    to="/how-it-works"
                                    className="premium-btn-primary w-full gap-2 px-7 py-3.5 sm:w-auto"
                                >
                                    {content.primaryCta}
                                    <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </Link>
                                <Link
                                    to="/register"
                                    className="premium-btn-secondary w-full gap-2 px-7 py-3.5 sm:w-auto"
                                >
                                    {content.secondaryCta}
                                    <ArrowRight className={`h-4 w-4 text-sapphire ${isArabic ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>

                            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
                                <Link to="/checkout" className="premium-btn-secondary w-full gap-2 border-sapphire/20 bg-white/70 px-5 py-3 sm:w-auto">
                                    <WalletCards className="h-4 w-4 text-sapphire" />
                                    {content.getCard}
                                </Link>
                                <Link to="/pro" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-sapphire/15 bg-sapphire/5 px-5 py-3 text-sm font-semibold text-navy/80 transition hover:border-sapphire/35 hover:text-sapphire sm:w-auto">
                                    <ShieldCheck className="h-4 w-4" />
                                    {content.proAccess}
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className={`rounded-[1.6rem] border border-sapphire/20 bg-navy p-3 text-white shadow-panel sm:rounded-[2rem] sm:p-6 ${isArabic ? 'font-arabic' : ''}`}
                        >
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-powder/70">{content.panelLabel}</p>
                                        <p className="mt-2 text-xl font-semibold">{content.panelTitle}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-3 text-powder">
                                        <Smartphone className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-4 rounded-[1.2rem] bg-white p-4 text-navy sm:mt-5 sm:rounded-[1.4rem] sm:p-5">
                                    <p className="text-sm font-semibold text-sapphire">{content.platformHighlights}</p>
                                    <div className="mt-4 grid gap-3 min-[430px]:grid-cols-2">
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

                                <div className="mt-4 grid gap-3 min-[430px]:grid-cols-2">
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

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className={`rounded-[2rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{content.statLabel}</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{content.statTitle}</h2>
                        <p className="mt-4 text-base leading-7 text-navy/72">{content.statBody}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {content.highlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className={`premium-card bg-powder/30 p-5 ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <p className="text-lg font-semibold text-navy">{item.title}</p>
                                <p className="mt-3 text-sm leading-6 text-navy/72">{item.body}</p>
                            </motion.div>
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
                        <div className="grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {content.steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="premium-card bg-slate-50 p-5"
                                >
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sapphire">0{index + 1}</p>
                                    <h3 className="mt-3 text-xl font-semibold text-navy">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-navy/72">{step.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={`mb-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{content.trustLabel}</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{content.trustTitle}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {featureCards.map((card, index) => {
                        const Icon = card.icon;
                        const label = card.title[language === 'fr' ? 'fr' : isArabic ? 'ar' : 'en'];
                        const body = card.body[language === 'fr' ? 'fr' : isArabic ? 'ar' : 'en'];
                        return (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: index * 0.07 }}
                                className={`premium-card p-5 ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <p className="mt-4 text-lg font-semibold text-navy">{label}</p>
                                <p className="mt-3 text-sm leading-6 text-navy/72">{body}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
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
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{content.platformValue}</p>
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
