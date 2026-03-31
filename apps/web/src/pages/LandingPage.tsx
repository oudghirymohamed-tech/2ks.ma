import { Menu, ArrowRight, ShieldCheck, ScanSearch, HeartPulse, RadioTower, Mail, Instagram, Linkedin, X } from 'lucide-react';
import { useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

const homeContent = {
    en: {
        metaTitle: 'HayatID | Modern Medical Identity',
        metaDescription:
            'HayatID is a modern medical identity concept designed to present essential health information with clarity, trust, and accessibility in critical moments.',
        nav: {
            about: 'About',
            howItWorks: 'How It Works',
            whyItMatters: 'Why It Matters',
            team: 'Team',
            contact: 'Contact'
        },
        brandSignature: 'Powered by 2KS',
        heroEyebrow: 'Medical identity, designed with institutional clarity',
        heroTitle: 'A premium medical identity experience built for trust in critical moments.',
        heroBody:
            'HayatID is a modern medical identity concept designed to present essential health information with clarity, trust, and accessibility when every second matters.',
        primaryCta: 'Discover HayatID',
        secondaryCta: 'Contact Us',
        heroVisualTitle: 'Signal-led identity architecture',
        heroVisualBody:
            'Structured health signals, resilient access paths, and a calm presentation layer shaped for real-world medical contexts.',
        heroVisualPoints: ['Clear emergency context', 'Accessible health essentials', 'Designed for instant recognition'],
        heroTags: ['Health-tech', 'Identity clarity', 'Institutional design'],
        aboutLabel: 'About HayatID',
        aboutTitle: 'A refined concept for presenting medical essentials with confidence.',
        aboutBody:
            'HayatID brings together physical identity, structured health information, and a modern presentation layer so essential medical details can be understood quickly and responsibly. The concept focuses on clarity, reassurance, and trusted access rather than digital noise.',
        aboutHighlights: [
            {
                title: 'Trust-first experience',
                body: 'Every element is designed to feel credible, calm, and immediately understandable.'
            },
            {
                title: 'Accessible by design',
                body: 'Critical information is organized to reduce friction and support fast interpretation.'
            },
            {
                title: 'Powered by 2KS',
                body: 'The HayatID concept is backed by the product vision and execution discipline of 2KS.'
            }
        ],
        howLabel: 'How it works',
        howTitle: 'A simple journey from identity touchpoint to essential health context.',
        steps: [
            {
                title: 'A patient carries a HayatID identifier',
                body: 'The identity object acts as the physical starting point for a clear and consistent medical information experience.'
            },
            {
                title: 'Essential information is presented with structure',
                body: 'Relevant health details are arranged to be read quickly, without clutter or unnecessary complexity.'
            },
            {
                title: 'Critical moments become easier to navigate',
                body: 'The result is a calmer, more reliable interaction around the information that matters most.'
            }
        ],
        whyLabel: 'Why it matters',
        whyTitle: 'Designed to make important information easier to trust, faster to understand, and harder to miss.',
        whyItems: [
            {
                title: 'Clarity under pressure',
                body: 'HayatID focuses attention on essential medical context when time, accuracy, and readability are critical.'
            },
            {
                title: 'A more reassuring identity layer',
                body: 'The visual language is calm and professional, helping the experience feel dependable from the first glance.'
            },
            {
                title: 'A stronger bridge between physical and digital',
                body: 'HayatID connects a tangible identifier to a structured digital presentation that remains simple to access.'
            }
        ],
        teamLabel: 'Team',
        teamTitle: 'The people leading HayatID.',
        teamMembers: [
            {
                name: 'Lamani Mohamed Nacer',
                role: 'CEO',
                bio: 'Leading the strategic vision of HayatID.'
            },
            {
                name: 'Ennaim Kaoutar',
                role: 'CMO',
                bio: 'Building the brand, communication, and outreach.'
            },
            {
                name: 'Erraoudi Kenza',
                role: 'COO',
                bio: 'Driving operations and project execution.'
            }
        ],
        contactLabel: 'Contact CTA',
        contactTitle: 'Start the conversation with HayatID.',
        contactBody:
            'For institutional introductions, partnerships, product discussions, or media inquiries, contact the HayatID team directly.',
        contactPrimary: 'Email HayatID',
        contactSecondary: 'View LinkedIn',
        footerNavigation: 'Navigation',
        footerContact: 'Contact',
        footerNote:
            'HayatID is a modern medical identity concept focused on clarity, trust, and accessibility in critical moments.',
        footerRights: '© 2026 HayatID. All rights reserved.'
    },
    fr: {
        metaTitle: 'HayatID | Identite medicale moderne',
        metaDescription:
            'HayatID est un concept moderne d identite medicale concu pour presenter les informations de sante essentielles avec clarte, confiance et accessibilite dans les moments critiques.',
        nav: {
            about: 'A propos',
            howItWorks: 'Fonctionnement',
            whyItMatters: 'Pourquoi c est important',
            team: 'Equipe',
            contact: 'Contact'
        },
        brandSignature: 'Powered by 2KS',
        heroEyebrow: 'Une identite medicale pensee avec une clarte institutionnelle',
        heroTitle: 'Une experience premium d identite medicale concue pour inspirer confiance dans les moments critiques.',
        heroBody:
            'HayatID est un concept moderne d identite medicale concu pour presenter les informations de sante essentielles avec clarte, confiance et accessibilite lorsque chaque seconde compte.',
        primaryCta: 'Decouvrir HayatID',
        secondaryCta: 'Nous contacter',
        heroVisualTitle: 'Une architecture d identite guidee par le signal',
        heroVisualBody:
            'Des signaux de sante structures, des chemins d acces resilients et une couche de presentation apaisante adaptee aux contextes medicaux reels.',
        heroVisualPoints: ['Contexte d urgence lisible', 'Informations essentielles accessibles', 'Concu pour une reconnaissance immediate'],
        heroTags: ['Health-tech', 'Clarification identitaire', 'Design institutionnel'],
        aboutLabel: 'A propos de HayatID',
        aboutTitle: 'Un concept raffine pour presenter l essentiel medical avec assurance.',
        aboutBody:
            'HayatID relie une identite physique, des informations de sante structurees et une couche de presentation moderne afin que les details medicaux essentiels puissent etre compris rapidement et avec responsabilite. Le concept privilegie la clarte, le sentiment de confiance et un acces fiable.',
        aboutHighlights: [
            {
                title: 'Une experience fondee sur la confiance',
                body: 'Chaque element est pense pour etre credible, calme et immediatement comprehensible.'
            },
            {
                title: 'Accessible par conception',
                body: 'Les informations critiques sont organisees pour limiter la friction et faciliter la lecture.'
            },
            {
                title: 'Propulse par 2KS',
                body: 'Le concept HayatID s appuie sur la vision produit et la rigueur d execution de 2KS.'
            }
        ],
        howLabel: 'Comment ca marche',
        howTitle: 'Un parcours simple, du point de contact identitaire a l essentiel medical.',
        steps: [
            {
                title: 'Le patient dispose d un identifiant HayatID',
                body: 'L objet d identite devient le point de depart physique d une experience medicale claire et coherente.'
            },
            {
                title: 'Les informations essentielles sont presentees avec structure',
                body: 'Les details de sante pertinents sont organises pour etre lus rapidement, sans surcharge inutile.'
            },
            {
                title: 'Les moments critiques deviennent plus simples a gerer',
                body: 'Le resultat est une interaction plus sereine et plus fiable autour de l information qui compte vraiment.'
            }
        ],
        whyLabel: 'Pourquoi c est important',
        whyTitle: 'Concu pour rendre l information importante plus fiable, plus rapide a comprendre et plus difficile a manquer.',
        whyItems: [
            {
                title: 'De la clarte sous pression',
                body: 'HayatID met l attention sur le contexte medical essentiel lorsque le temps, la precision et la lisibilite sont decisifs.'
            },
            {
                title: 'Une couche d identite plus rassurante',
                body: 'Le langage visuel est sobre et professionnel, afin que l experience inspire confiance des le premier regard.'
            },
            {
                title: 'Un meilleur lien entre physique et numerique',
                body: 'HayatID relie un identifiant tangible a une presentation digitale structuree et simple d acces.'
            }
        ],
        teamLabel: 'Equipe',
        teamTitle: 'L equipe qui porte HayatID.',
        teamMembers: [
            {
                name: 'Lamani Mohamed Nacer',
                role: 'CEO',
                bio: 'Pilote la vision strategique de HayatID.'
            },
            {
                name: 'Ennaim Kaoutar',
                role: 'CMO',
                bio: 'Construit la marque, la communication et le rayonnement.'
            },
            {
                name: 'Erraoudi Kenza',
                role: 'COO',
                bio: 'Conduit les operations et l execution du projet.'
            }
        ],
        contactLabel: 'Prendre contact',
        contactTitle: 'Engagez la conversation avec HayatID.',
        contactBody:
            'Pour les mises en relation institutionnelles, les partenariats, les discussions produit ou les demandes media, contactez directement l equipe HayatID.',
        contactPrimary: 'Envoyer un email',
        contactSecondary: 'Voir LinkedIn',
        footerNavigation: 'Navigation',
        footerContact: 'Contact',
        footerNote:
            'HayatID est un concept moderne d identite medicale centre sur la clarte, la confiance et l accessibilite dans les moments critiques.',
        footerRights: '© 2026 HayatID. Tous droits reserves.'
    },
    ar: {
        metaTitle: 'HayatID | هوية طبية حديثة',
        metaDescription:
            'HayatID هو مفهوم حديث للهوية الطبية صُمم لتقديم المعلومات الصحية الأساسية بوضوح وثقة وسهولة وصول في اللحظات الحرجة.',
        nav: {
            about: 'حول HayatID',
            howItWorks: 'كيف يعمل',
            whyItMatters: 'لماذا يهم',
            team: 'الفريق',
            contact: 'تواصل'
        },
        brandSignature: 'Powered by 2KS',
        heroEyebrow: 'هوية طبية مصممة بوضوح مؤسسي',
        heroTitle: 'تجربة هوية طبية راقية بُنيت على الثقة في اللحظات الحرجة.',
        heroBody:
            'HayatID هو مفهوم حديث للهوية الطبية صُمم لتقديم المعلومات الصحية الأساسية بوضوح وثقة وسهولة وصول عندما تكون كل ثانية مهمة.',
        primaryCta: 'اكتشف HayatID',
        secondaryCta: 'تواصل معنا',
        heroVisualTitle: 'بنية هوية تقودها الإشارة',
        heroVisualBody:
            'إشارات صحية منظمة، ومسارات وصول مرنة، وطبقة عرض هادئة صُممت لتناسب السياقات الطبية الواقعية.',
        heroVisualPoints: ['سياق طارئ واضح', 'معلومات صحية أساسية سهلة الوصول', 'مصمم لتمييز فوري'],
        heroTags: ['تقنية صحية', 'وضوح الهوية', 'تصميم مؤسسي'],
        aboutLabel: 'حول HayatID',
        aboutTitle: 'مفهوم متقن لعرض الأساسيات الطبية بثقة.',
        aboutBody:
            'يجمع HayatID بين هوية مادية ومعلومات صحية منظمة وطبقة عرض حديثة حتى يمكن فهم التفاصيل الطبية الأساسية بسرعة وبشكل مسؤول. يركز المفهوم على الوضوح والطمأنينة والوصول الموثوق بدلاً من الضجيج الرقمي.',
        aboutHighlights: [
            {
                title: 'تجربة تنطلق من الثقة',
                body: 'كل عنصر صُمم ليبدو موثوقاً وهادئاً وسهل الفهم من النظرة الأولى.'
            },
            {
                title: 'سهولة وصول في التصميم',
                body: 'يتم تنظيم المعلومات الحرجة لتقليل الاحتكاك ودعم القراءة السريعة.'
            },
            {
                title: 'بدعم من 2KS',
                body: 'يرتكز مفهوم HayatID على رؤية 2KS للمنتج وانضباطها في التنفيذ.'
            }
        ],
        howLabel: 'كيف يعمل',
        howTitle: 'رحلة بسيطة من نقطة الهوية إلى السياق الصحي الأساسي.',
        steps: [
            {
                title: 'يحمل المريض معرف HayatID',
                body: 'يشكل عنصر الهوية نقطة الانطلاق المادية لتجربة معلومات طبية واضحة ومتسقة.'
            },
            {
                title: 'تُعرض المعلومات الأساسية بشكل منظم',
                body: 'يتم ترتيب التفاصيل الصحية المهمة لتُقرأ بسرعة من دون ازدحام أو تعقيد غير ضروري.'
            },
            {
                title: 'تصبح اللحظات الحرجة أسهل في التعامل',
                body: 'النتيجة هي تفاعل أكثر هدوءاً وموثوقية حول المعلومات التي تهم فعلاً.'
            }
        ],
        whyLabel: 'لماذا يهم',
        whyTitle: 'مصمم ليجعل المعلومات المهمة أوضح وأسرع فهماً وأصعب تجاهلاً.',
        whyItems: [
            {
                title: 'وضوح تحت الضغط',
                body: 'يركز HayatID الانتباه على السياق الطبي الأساسي عندما يكون الوقت والدقة وسهولة القراءة عوامل حاسمة.'
            },
            {
                title: 'طبقة هوية أكثر طمأنينة',
                body: 'اللغة البصرية هادئة ومهنية لتمنح التجربة إحساساً بالاعتمادية منذ النظرة الأولى.'
            },
            {
                title: 'جسر أقوى بين المادي والرقمي',
                body: 'يربط HayatID معرفاً ملموساً بطبقة رقمية منظمة وسهلة الوصول.'
            }
        ],
        teamLabel: 'الفريق',
        teamTitle: 'الفريق الذي يقود HayatID.',
        teamMembers: [
            {
                name: 'Lamani Mohamed Nacer',
                role: 'CEO',
                bio: 'يقود الرؤية الاستراتيجية لـ HayatID.'
            },
            {
                name: 'Ennaim Kaoutar',
                role: 'CMO',
                bio: 'تبني العلامة والتواصل والانتشار.'
            },
            {
                name: 'Erraoudi Kenza',
                role: 'COO',
                bio: 'تدير العمليات وتنفيذ المشروع.'
            }
        ],
        contactLabel: 'دعوة للتواصل',
        contactTitle: 'ابدأ الحوار مع HayatID.',
        contactBody:
            'للتعريفات المؤسسية والشراكات والنقاشات المتعلقة بالمنتج أو الاستفسارات الإعلامية، تواصل مباشرة مع فريق HayatID.',
        contactPrimary: 'راسل HayatID',
        contactSecondary: 'عرض LinkedIn',
        footerNavigation: 'التنقل',
        footerContact: 'التواصل',
        footerNote:
            'HayatID هو مفهوم حديث للهوية الطبية يركز على الوضوح والثقة وسهولة الوصول في اللحظات الحرجة.',
        footerRights: '© 2026 HayatID. جميع الحقوق محفوظة.'
    }
} as const;

const heroIcons = [ShieldCheck, HeartPulse, RadioTower] as const;
const stepIcons = [ScanSearch, ShieldCheck, HeartPulse] as const;
const teamAccents = ['from-[#7ed1ff] to-[#3b82f6]', 'from-[#78f3d3] to-[#2563eb]', 'from-[#b7c7ff] to-[#4f46e5]'] as const;

const contactLinks = {
    instagram:
        'https://www.instagram.com/hayatid.ma?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    linkedin: 'https://www.linkedin.com/company/2ks-ma/',
    email: 'mailto:hayatid.contact@gmail.com'
} as const;

export function LandingPage() {
    const { language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isArabic = language === 'ar';
    const content = homeContent[language === 'fr' ? 'fr' : isArabic ? 'ar' : 'en'];

    const navItems = [
        { href: '#about', label: content.nav.about },
        { href: '#how-it-works', label: content.nav.howItWorks },
        { href: '#why-it-matters', label: content.nav.whyItMatters },
        { href: '#team', label: content.nav.team },
        { href: '#contact', label: content.nav.contact }
    ];

    const languageOptions = ['en', 'fr', 'ar'] as const;

    return (
        <div className="min-h-screen bg-[#041225] text-white">
            <PageMeta title={content.metaTitle} description={content.metaDescription} />

            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#041225_0%,#071a35_36%,#06162d_100%)]" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(73,134,255,0.24),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(108,226,255,0.14),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_35%)]" />
                <div className="absolute inset-x-0 top-0 -z-10 h-[540px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

                <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06162dd9] backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <a href="#top" className="inline-flex min-w-0 items-center gap-3">
                            <img src="/favicon.svg" alt="HayatID logo" width="44" height="44" className="h-11 w-11 rounded-2xl" fetchPriority="high" />
                            <span className={`min-w-0 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <span className="block truncate text-base font-semibold tracking-[0.01em] text-white sm:text-lg">HayatID</span>
                                <span className="block truncate text-[0.68rem] uppercase tracking-[0.28em] text-sky-100/60 sm:text-[0.72rem]">
                                    {content.brandSignature}
                                </span>
                            </span>
                        </a>

                        <nav className="hidden items-center gap-7 lg:flex">
                            {navItems.map((item) => (
                                <a key={item.href} href={item.href} className="text-sm font-medium text-slate-200/84 transition hover:text-white">
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-3 lg:flex">
                            <div className="inline-flex rounded-full border border-white/12 bg-white/6 p-1 backdrop-blur">
                                {languageOptions.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setLanguage(option)}
                                        className={`min-h-[36px] rounded-full px-3 text-xs font-semibold uppercase tracking-[0.18em] transition ${language === option ? 'bg-white text-[#041225]' : 'text-slate-200/76 hover:bg-white/8 hover:text-white'}`}
                                        aria-pressed={language === option}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <a
                                href="#contact"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/12"
                            >
                                {content.secondaryCta}
                            </a>
                        </div>

                        <div className="flex items-center gap-2 lg:hidden">
                            <div className="inline-flex rounded-full border border-white/12 bg-white/6 p-1 backdrop-blur">
                                {languageOptions.map((option) => (
                                    <button
                                        key={`mobile-${option}`}
                                        type="button"
                                        onClick={() => setLanguage(option)}
                                        className={`min-h-[36px] rounded-full px-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition ${language === option ? 'bg-white text-[#041225]' : 'text-slate-200/76 hover:bg-white/8 hover:text-white'}`}
                                        aria-pressed={language === option}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((current) => !current)}
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white transition hover:bg-white/12"
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen ? (
                        <nav className="border-t border-white/10 px-4 py-4 lg:hidden sm:px-6">
                            <div className="flex flex-col gap-2 rounded-[1.5rem] border border-white/10 bg-white/6 p-3 backdrop-blur-xl">
                                {navItems.map((item) => (
                                    <a
                                        key={`mobile-${item.href}`}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/8"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#041225]"
                                >
                                    {content.secondaryCta}
                                </a>
                            </div>
                        </nav>
                    ) : null}
                </header>

                <main id="top">
                    <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center xl:gap-16">
                            <div className={isArabic ? 'font-arabic text-right' : ''}>
                                <div className="inline-flex items-center rounded-full border border-sky-200/12 bg-white/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sky-100/72">
                                    {content.heroEyebrow}
                                </div>
                                <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,8vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                                    {content.heroTitle}
                                </h1>
                                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200/78 sm:text-lg">
                                    {content.heroBody}
                                </p>
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                    <a
                                        href="#about"
                                        className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f5f9ff_0%,#cfe7ff_100%)] px-7 text-sm font-semibold text-[#041225] shadow-[0_14px_40px_rgba(117,194,255,0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_18px_44px_rgba(117,194,255,0.24)]"
                                    >
                                        {content.primaryCta}
                                        <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                    </a>
                                    <a
                                        href="#contact"
                                        className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/14 bg-white/6 px-7 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/10"
                                    >
                                        {content.secondaryCta}
                                    </a>
                                </div>
                                <div className="mt-10 flex flex-wrap gap-3 text-sm text-sky-50/80">
                                    {content.heroTags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute left-1/2 top-[12%] h-48 w-48 -translate-x-1/2 rounded-full bg-sky-300/18 blur-3xl" />
                                <div className="absolute right-[8%] top-[18%] h-32 w-32 rounded-full bg-blue-500/18 blur-3xl" />
                                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.32)] sm:p-7">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.13),transparent_42%)]" />
                                    <div className="relative space-y-5">
                                        <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-[#081c37]/90 p-4 sm:p-5">
                                            <div className={isArabic ? 'font-arabic text-right' : ''}>
                                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/54">{content.heroVisualTitle}</p>
                                                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-200/78">{content.heroVisualBody}</p>
                                            </div>
                                            <img src="/favicon.svg" alt="HayatID emblem" width="72" height="72" className="h-[72px] w-[72px] shrink-0 rounded-[1.5rem]" />
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                                            <div className="rounded-[1.6rem] border border-sky-200/10 bg-[linear-gradient(180deg,rgba(12,40,74,0.95),rgba(5,18,37,0.95))] p-5">
                                                <div className="relative mx-auto flex aspect-[1/1.02] max-w-[320px] items-center justify-center overflow-hidden rounded-[1.7rem] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(118,201,255,0.2),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
                                                    <div className="absolute h-[86%] w-[86%] rounded-full border border-sky-200/18" />
                                                    <div className="absolute h-[64%] w-[64%] rounded-full border border-sky-200/14" />
                                                    <div className="absolute h-[40%] w-[40%] rounded-full border border-sky-200/18" />
                                                    <div className="absolute left-[18%] top-[24%] h-2.5 w-2.5 rounded-full bg-sky-200 shadow-[0_0_18px_rgba(186,230,253,0.65)]" />
                                                    <div className="absolute bottom-[20%] right-[20%] h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(125,211,252,0.56)]" />
                                                    <div className="rounded-[1.8rem] border border-white/14 bg-white/10 p-5 backdrop-blur">
                                                        <img src="/favicon.svg" alt="HayatID logo mark" width="96" height="96" className="h-24 w-24 rounded-[1.8rem]" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {content.heroVisualPoints.map((point, index) => {
                                                    const Icon = heroIcons[index];

                                                    return (
                                                        <div key={point} className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                                                            <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                                                                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                                                                    <Icon className="h-5 w-5" />
                                                                </span>
                                                                <p className="text-sm leading-6 text-slate-200/84">{point}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="about" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:gap-8">
                            <div className={`rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/64">{content.aboutLabel}</p>
                                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                                    {content.aboutTitle}
                                </h2>
                                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200/76">{content.aboutBody}</p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                                {content.aboutHighlights.map((item) => (
                                    <article key={item.title} className={`rounded-[1.65rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                        <p className="text-lg font-semibold text-white">{item.title}</p>
                                        <p className="mt-3 text-sm leading-7 text-slate-200/70">{item.body}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                        <div className={`max-w-3xl ${isArabic ? 'font-arabic text-right' : ''}`}>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/64">{content.howLabel}</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{content.howTitle}</h2>
                        </div>
                        <div className="mt-8 grid gap-4 lg:grid-cols-3">
                            {content.steps.map((step, index) => {
                                const Icon = stepIcons[index];

                                return (
                                    <article key={step.title} className={`rounded-[1.75rem] border border-white/10 bg-[#081b35]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${isArabic ? 'font-arabic text-right' : ''}`}>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/56">0{index + 1}</span>
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sky-100">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                        </div>
                                        <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
                                        <p className="mt-4 text-sm leading-7 text-slate-200/72">{step.body}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section id="why-it-matters" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,27,53,0.96),rgba(5,18,37,0.96))] p-6 sm:p-8 lg:p-10">
                            <div className={`max-w-3xl ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/64">{content.whyLabel}</p>
                                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{content.whyTitle}</h2>
                            </div>
                            <div className="mt-8 grid gap-4 lg:grid-cols-3">
                                {content.whyItems.map((item) => (
                                    <article key={item.title} className={`rounded-[1.6rem] border border-white/10 bg-white/6 p-5 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                        <p className="text-lg font-semibold text-white">{item.title}</p>
                                        <p className="mt-3 text-sm leading-7 text-slate-200/72">{item.body}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="team" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                        <div className={`max-w-3xl ${isArabic ? 'font-arabic text-right' : ''}`}>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/64">{content.teamLabel}</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{content.teamTitle}</h2>
                        </div>
                        <div className="mt-8 grid gap-4 lg:grid-cols-3">
                            {content.teamMembers.map((member, index) => (
                                <article key={member.name} className={`rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-6 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                    <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${teamAccents[index]}`} />
                                    <div className="mt-6 flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{member.name}</h3>
                                            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/60">{member.role}</p>
                                        </div>
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sky-100">
                                            <ShieldCheck className="h-5 w-5" />
                                        </span>
                                    </div>
                                    <p className="mt-5 text-sm leading-7 text-slate-200/72">{member.bio}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                        <div className="overflow-hidden rounded-[2.1rem] border border-sky-200/10 bg-[linear-gradient(135deg,rgba(10,33,63,0.98),rgba(7,24,46,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                            <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-10 lg:py-12">
                                <div className={isArabic ? 'font-arabic text-right' : ''}>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/64">{content.contactLabel}</p>
                                    <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{content.contactTitle}</h2>
                                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/78">{content.contactBody}</p>
                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                        <a
                                            href={contactLinks.email}
                                            className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f5f9ff_0%,#cfe7ff_100%)] px-7 text-sm font-semibold text-[#041225] transition hover:translate-y-[-1px]"
                                        >
                                            <Mail className="h-4 w-4" />
                                            {content.contactPrimary}
                                        </a>
                                        <a
                                            href={contactLinks.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-white/14 bg-white/6 px-7 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/10"
                                        >
                                            <Linkedin className="h-4 w-4" />
                                            {content.contactSecondary}
                                        </a>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <a href={contactLinks.email} className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5 transition hover:bg-white/8">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sky-100">
                                                <Mail className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/56">Email</p>
                                                <p className="mt-2 text-sm font-semibold text-white">hayatid.contact@gmail.com</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href={contactLinks.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5 transition hover:bg-white/8"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sky-100">
                                                <Instagram className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/56">Instagram</p>
                                                <p className="mt-2 text-sm font-semibold text-white">@hayatid.ma</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href={contactLinks.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5 transition hover:bg-white/8"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sky-100">
                                                <Linkedin className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/56">LinkedIn</p>
                                                <p className="mt-2 text-sm font-semibold text-white">2KS</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-white/8 bg-[#030d1b]">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:px-8">
                        <div className={isArabic ? 'font-arabic text-right' : ''}>
                            <div className="inline-flex items-center gap-3">
                                <img src="/favicon.svg" alt="HayatID logo" width="48" height="48" className="h-12 w-12 rounded-2xl" loading="lazy" />
                                <div>
                                    <p className="text-lg font-semibold tracking-[0.01em] text-white">HayatID</p>
                                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-sky-100/56">{content.brandSignature}</p>
                                </div>
                            </div>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300/72">{content.footerNote}</p>
                        </div>

                        <div className={`grid gap-5 sm:grid-cols-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/50">{content.footerNavigation}</p>
                                <div className="mt-4 grid gap-3">
                                    {navItems.map((item) => (
                                        <a key={`footer-${item.href}`} href={item.href} className="text-sm text-slate-200/72 transition hover:text-white">
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/50">{content.footerContact}</p>
                                <div className="mt-4 grid gap-3 text-sm text-slate-200/72">
                                    <a href={contactLinks.email} className="transition hover:text-white">
                                        hayatid.contact@gmail.com
                                    </a>
                                    <a href={contactLinks.instagram} target="_blank" rel="noreferrer" className="transition hover:text-white">
                                        Instagram
                                    </a>
                                    <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/8">
                        <div className={`mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-300/52 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
                            <p>{content.footerRights}</p>
                            <p>{content.brandSignature}</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
