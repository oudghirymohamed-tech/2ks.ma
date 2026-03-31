import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Globe,
    HeartPulse,
    Instagram,
    Linkedin,
    Lock,
    Mail,
    Menu,
    Shield,
    Smartphone,
    Sparkles,
    Users,
    Wifi,
    X,
    Zap,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

const content = {
    en: {
        metaTitle: 'HayatID | Smart Medical Identity - Coming Soon',
        metaDescription: 'HayatID is the next-generation medical identity platform. Secure NFC-enabled smart cards for faster, safer healthcare access.',
        nav: {
            about: 'About',
            howItWorks: 'How It Works',
            whyItMatters: 'Why It Matters',
            team: 'Team',
            contact: 'Contact',
        },
        hero: {
            badge: 'Launching Soon',
            headline: 'Your Medical Identity,',
            headlineAccent: 'Reimagined',
            subheadline: 'Smart. Secure. Life-Saving.',
            description: 'HayatID is a next-generation medical identity platform that puts your critical health information at your fingertips—accessible instantly when it matters most.',
            cta: 'Join the Waitlist',
            ctaSecondary: 'Learn More',
        },
        about: {
            label: 'About HayatID',
            title: 'Medical Identity for the Modern Era',
            description: 'HayatID bridges the gap between you and your medical data. Our NFC-enabled smart cards store your essential health information securely, allowing healthcare providers to access critical data with a single tap.',
            features: [
                { icon: Shield, title: 'Bank-Grade Security', desc: 'Your medical data protected with enterprise-level encryption and secure protocols.' },
                { icon: Smartphone, title: 'NFC Smart Cards', desc: 'Tap to instantly share your medical profile with authorized healthcare providers.' },
                { icon: Globe, title: 'Universal Access', desc: 'Works across borders—your medical identity travels with you, everywhere.' },
                { icon: Zap, title: 'Instant Response', desc: 'Emergency responders get critical info in seconds, not minutes.' },
            ],
        },
        howItWorks: {
            label: 'How It Works',
            title: 'Simple. Seamless. Secure.',
            steps: [
                { number: '01', title: 'Create Your Profile', desc: 'Sign up and enter your medical information through our secure portal. Add allergies, medications, emergency contacts, and more.' },
                { number: '02', title: 'Receive Your Card', desc: 'Get your personalized NFC-enabled HayatID card delivered to your door. Activate it in seconds.' },
                { number: '03', title: 'Tap to Share', desc: 'Healthcare providers tap your card to instantly access your medical profile. No apps needed on their end.' },
                { number: '04', title: 'Stay Updated', desc: 'Update your information anytime through our app. Changes sync instantly to your card.' },
            ],
        },
        whyItMatters: {
            label: 'Why It Matters',
            title: 'Every Second Counts in an Emergency',
            stats: [
                { value: '70%', label: 'of medical errors are due to miscommunication' },
                { value: '30%', label: 'of patients cannot communicate in emergencies' },
                { value: '15min', label: 'average time to access medical records' },
            ],
            description: 'HayatID eliminates these barriers. Your critical health information is always accessible, accurate, and up-to-date—giving healthcare providers the data they need to make life-saving decisions.',
            benefits: [
                'Instant access to allergies and medications',
                'Emergency contacts notified automatically',
                'Medical history available in seconds',
                'Works even when you cannot speak',
            ],
        },
        team: {
            label: 'Our Team',
            title: 'Meet the Founders',
            description: 'A passionate team dedicated to transforming healthcare access through innovation and technology.',
            members: [
                { name: 'Lamani Mohamed Nacer', role: 'CEO', bio: 'Visionary leader driving the future of medical identity solutions.' },
                { name: 'Ennaim Kaoutar', role: 'CMO', bio: 'Marketing strategist building the HayatID brand and community.' },
                { name: 'Erraoudi Kenza', role: 'COO', bio: 'Operations expert ensuring seamless delivery and execution.' },
            ],
        },
        contact: {
            label: 'Contact Us',
            title: 'Get in Touch',
            description: 'Have questions? We would love to hear from you. Reach out and our team will respond within 24 hours.',
            form: {
                name: 'Your Name',
                email: 'Email Address',
                message: 'Your Message',
                submit: 'Send Message',
                submitting: 'Sending...',
                success: 'Message sent successfully!',
            },
            info: {
                email: 'hayatid.contact@gmail.com',
                instagram: '@hayatid',
                linkedin: 'HayatID',
            },
        },
        footer: {
            tagline: 'Your medical identity, always with you.',
            copyright: 'HayatID. All rights reserved.',
            poweredBy: 'Powered by 2ks Technology',
        },
        waitlist: {
            title: 'Be the First to Know',
            description: 'Join our waitlist and get early access when we launch.',
            placeholder: 'Enter your email',
            cta: 'Join Waitlist',
            submitting: 'Joining...',
            success: 'You are on the list!',
            privacy: 'We respect your privacy. No spam, ever.',
        },
    },
    fr: {
        metaTitle: 'HayatID | Identite Medicale Intelligente - Bientot Disponible',
        metaDescription: 'HayatID est la plateforme d identite medicale de nouvelle generation.',
        nav: {
            about: 'A Propos',
            howItWorks: 'Comment ca Marche',
            whyItMatters: 'Pourquoi',
            team: 'Equipe',
            contact: 'Contact',
        },
        hero: {
            badge: 'Lancement Imminent',
            headline: 'Votre Identite Medicale,',
            headlineAccent: 'Reinventee',
            subheadline: 'Intelligente. Securisee. Vitale.',
            description: 'HayatID est une plateforme d identite medicale de nouvelle generation qui met vos informations de sante critiques a portee de main.',
            cta: 'Rejoindre la Liste',
            ctaSecondary: 'En Savoir Plus',
        },
        about: {
            label: 'A Propos',
            title: 'L Identite Medicale pour l Ere Moderne',
            description: 'HayatID comble le fosse entre vous et vos donnees medicales. Nos cartes intelligentes NFC stockent vos informations de sante essentielles en toute securite.',
            features: [
                { icon: Shield, title: 'Securite Bancaire', desc: 'Vos donnees medicales protegees avec un chiffrement de niveau entreprise.' },
                { icon: Smartphone, title: 'Cartes NFC', desc: 'Touchez pour partager instantanement votre profil medical.' },
                { icon: Globe, title: 'Acces Universel', desc: 'Fonctionne partout dans le monde.' },
                { icon: Zap, title: 'Reponse Instantanee', desc: 'Les secours obtiennent les infos critiques en secondes.' },
            ],
        },
        howItWorks: {
            label: 'Comment ca Marche',
            title: 'Simple. Fluide. Securise.',
            steps: [
                { number: '01', title: 'Creez Votre Profil', desc: 'Inscrivez-vous et entrez vos informations medicales via notre portail securise.' },
                { number: '02', title: 'Recevez Votre Carte', desc: 'Obtenez votre carte HayatID personnalisee livree chez vous.' },
                { number: '03', title: 'Touchez pour Partager', desc: 'Les professionnels de sante touchent votre carte pour acceder a votre profil.' },
                { number: '04', title: 'Restez a Jour', desc: 'Mettez a jour vos informations a tout moment via notre application.' },
            ],
        },
        whyItMatters: {
            label: 'Pourquoi',
            title: 'Chaque Seconde Compte en Urgence',
            stats: [
                { value: '70%', label: 'des erreurs medicales sont dues a la mauvaise communication' },
                { value: '30%', label: 'des patients ne peuvent pas communiquer en urgence' },
                { value: '15min', label: 'temps moyen pour acceder aux dossiers medicaux' },
            ],
            description: 'HayatID elimine ces barrieres. Vos informations de sante critiques sont toujours accessibles et a jour.',
            benefits: [
                'Acces instantane aux allergies et medicaments',
                'Contacts d urgence notifies automatiquement',
                'Historique medical disponible en secondes',
                'Fonctionne meme quand vous ne pouvez pas parler',
            ],
        },
        team: {
            label: 'Notre Equipe',
            title: 'Rencontrez les Fondateurs',
            description: 'Une equipe passionnee dediee a transformer l acces aux soins de sante par l innovation et la technologie.',
            members: [
                { name: 'Lamani Mohamed Nacer', role: 'PDG', bio: 'Leader visionnaire guidant l avenir des solutions d identite medicale.' },
                { name: 'Ennaim Kaoutar', role: 'Directrice Marketing', bio: 'Stratege marketing construisant la marque et la communaute HayatID.' },
                { name: 'Erraoudi Kenza', role: 'Directrice des Operations', bio: 'Experte en operations assurant une execution fluide.' },
            ],
        },
        contact: {
            label: 'Contact',
            title: 'Contactez-Nous',
            description: 'Des questions? Nous serions ravis de vous entendre.',
            form: {
                name: 'Votre Nom',
                email: 'Adresse Email',
                message: 'Votre Message',
                submit: 'Envoyer',
                submitting: 'Envoi...',
                success: 'Message envoye!',
            },
            info: {
                email: 'hayatid.contact@gmail.com',
                instagram: '@hayatid',
                linkedin: 'HayatID',
            },
        },
        footer: {
            tagline: 'Votre identite medicale, toujours avec vous.',
            copyright: 'HayatID. Tous droits reserves.',
            poweredBy: 'Propulse par 2ks Technology',
        },
        waitlist: {
            title: 'Soyez le Premier Informe',
            description: 'Rejoignez notre liste d attente pour un acces anticipe.',
            placeholder: 'Entrez votre email',
            cta: 'Rejoindre',
            submitting: 'Inscription...',
            success: 'Vous etes sur la liste!',
            privacy: 'Nous respectons votre vie privee.',
        },
    },
    ar: {
        metaTitle: 'HayatID | الهوية الطبية الذكية - قريباً',
        metaDescription: 'HayatID هي منصة الهوية الطبية من الجيل الجديد.',
        nav: {
            about: 'عن HayatID',
            howItWorks: 'كيف يعمل',
            whyItMatters: 'لماذا يهم',
            team: 'الفريق',
            contact: 'اتصل بنا',
        },
        hero: {
            badge: 'الإطلاق قريباً',
            headline: 'هويتك الطبية،',
            headlineAccent: 'مُعاد تصورها',
            subheadline: 'ذكية. آمنة. منقذة للحياة.',
            description: 'HayatID هي منصة هوية طبية من الجيل الجديد تضع معلوماتك الصحية الحرجة في متناول يدك—متاحة فوراً عندما يكون الأمر مهماً.',
            cta: 'انضم لقائمة الانتظار',
            ctaSecondary: 'اعرف المزيد',
        },
        about: {
            label: 'عن HayatID',
            title: 'الهوية الطبية للعصر الحديث',
            description: 'HayatID تسد الفجوة بينك وبين بياناتك الطبية. بطاقاتنا الذكية بتقنية NFC تخزن معلوماتك الصحية الأساسية بشكل آمن.',
            features: [
                { icon: Shield, title: 'أمان بنكي', desc: 'بياناتك الطبية محمية بتشفير مؤسسي.' },
                { icon: Smartphone, title: 'بطاقات NFC ذكية', desc: 'المس لمشاركة ملفك الطبي فوراً.' },
                { icon: Globe, title: 'وصول عالمي', desc: 'تعمل عبر الحدود—هويتك الطبية تسافر معك.' },
                { icon: Zap, title: 'استجابة فورية', desc: 'المسعفون يحصلون على المعلومات الحرجة في ثوانٍ.' },
            ],
        },
        howItWorks: {
            label: 'كيف يعمل',
            title: 'بسيط. سلس. آمن.',
            steps: [
                { number: '01', title: 'أنشئ ملفك', desc: 'سجل وأدخل معلوماتك الطبية عبر بوابتنا الآمنة.' },
                { number: '02', title: 'استلم بطاقتك', desc: 'احصل على بطاقة HayatID الشخصية مُسلّمة لبابك.' },
                { number: '03', title: 'المس للمشاركة', desc: 'مقدمو الرعاية الصحية يلمسون بطاقتك للوصول لملفك.' },
                { number: '04', title: 'ابقَ محدثاً', desc: 'حدّث معلوماتك في أي وقت عبر تطبيقنا.' },
            ],
        },
        whyItMatters: {
            label: 'لماذا يهم',
            title: 'كل ثانية مهمة في الطوارئ',
            stats: [
                { value: '70%', label: 'من الأخطاء الطبية بسبب سوء التواصل' },
                { value: '30%', label: 'من المرضى لا يستطيعون التواصل في الطوارئ' },
                { value: '15 دقيقة', label: 'متوسط الوقت للوصول للسجلات الطبية' },
            ],
            description: 'HayatID تزيل هذه الحواجز. معلوماتك الصحية الحرجة متاحة دائماً ودقيقة ومحدثة.',
            benefits: [
                'وصول فوري للحساسية والأدوية',
                'إشعار جهات الاتصال الطارئة تلقائياً',
                'التاريخ الطبي متاح في ثوانٍ',
                'يعمل حتى عندما لا تستطيع التحدث',
            ],
        },
        team: {
            label: 'فريقنا',
            title: 'تعرف على المؤسسين',
            description: 'فريق شغوف مكرس لتحويل الوصول إلى الرعاية الصحية من خلال الابتكار والتكنولوجيا.',
            members: [
                { name: 'لعماني محمد ناصر', role: 'الرئيس التنفيذي', bio: 'قائد صاحب رؤية يقود مستقبل حلول الهوية الطبية.' },
                { name: 'النعيم كوثر', role: 'مديرة التسويق', bio: 'استراتيجية تسويق تبني علامة HayatID ومجتمعها.' },
                { name: 'الراودي كنزة', role: 'مديرة العمليات', bio: 'خبيرة عمليات تضمن التنفيذ السلس.' },
            ],
        },
        contact: {
            label: 'اتصل بنا',
            title: 'تواصل معنا',
            description: 'لديك أسئلة؟ نحب أن نسمع منك.',
            form: {
                name: 'اسمك',
                email: 'البريد الإلكتروني',
                message: 'رسالتك',
                submit: 'إرسال الرسالة',
                submitting: 'جاري الإرسال...',
                success: 'تم إرسال الرسالة!',
            },
            info: {
                email: 'hayatid.contact@gmail.com',
                instagram: '@hayatid',
                linkedin: 'HayatID',
            },
        },
        footer: {
            tagline: 'هويتك الطبية، دائماً معك.',
            copyright: 'HayatID. جميع الحقوق محفوظة.',
            poweredBy: 'مدعوم بتقنية 2ks',
        },
        waitlist: {
            title: 'كن أول من يعرف',
            description: 'انضم لقائمة الانتظار واحصل على وصول مبكر.',
            placeholder: 'أدخل بريدك الإلكتروني',
            cta: 'انضم للقائمة',
            submitting: 'جاري الانضمام...',
            success: 'أنت في القائمة!',
            privacy: 'نحترم خصوصيتك. لا رسائل مزعجة.',
        },
    },
} as const;

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.12 } },
};

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = content[language] || content.en;

    const [email, setEmail] = useState('');
    const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    const handleWaitlistSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setWaitlistStatus('submitting');
        setTimeout(() => {
            setWaitlistStatus('success');
            setEmail('');
        }, 1500);
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;
        setContactStatus('submitting');
        setTimeout(() => {
            setContactStatus('success');
            setContactForm({ name: '', email: '', message: '' });
        }, 1500);
    };

    const navLinks = [
        { href: '#about', label: t.nav.about },
        { href: '#how-it-works', label: t.nav.howItWorks },
        { href: '#why-it-matters', label: t.nav.whyItMatters },
        { href: '#team', label: t.nav.team },
        { href: '#contact', label: t.nav.contact },
    ];

    return (
        <div className={`relative min-h-screen bg-navy ${isArabic ? 'font-arabic' : 'font-sans'}`} dir={isArabic ? 'rtl' : 'ltr'}>
            <PageMeta title={t.metaTitle} description={t.metaDescription} />

            {/* Navbar */}
            <nav className="fixed left-0 right-0 top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-white/[0.08] bg-navy/80 px-4 backdrop-blur-xl sm:px-6 lg:h-[4.5rem]">
                        <a href="#" className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sapphire to-sapphire/80">
                                <HeartPulse className="h-5 w-5 text-white" />
                                <div className="absolute inset-0 rounded-xl bg-sapphire/50 blur-lg" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">HayatID</span>
                        </a>

                        <div className="hidden items-center gap-1 lg:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="#waitlist"
                                className="hidden rounded-xl bg-sapphire px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sapphire/25 transition-all hover:bg-sapphire/90 hover:shadow-sapphire/40 sm:inline-flex"
                            >
                                {t.hero.cta}
                            </a>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white lg:hidden"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 rounded-2xl border border-white/[0.08] bg-navy/95 p-4 backdrop-blur-xl lg:hidden"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#waitlist"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 block rounded-xl bg-sapphire px-4 py-3 text-center text-sm font-semibold text-white"
                            >
                                {t.hero.cta}
                            </a>
                        </motion.div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
                {/* Animated Background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* Primary glow */}
                    <div className="absolute left-1/2 top-1/4 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sapphire/30 blur-[150px]" />
                    {/* Secondary glows */}
                    <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full bg-sapphire/20 blur-[120px]" />
                    <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/15 blur-[100px]" />
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(15,82,186,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,82,186,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
                </div>

                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-32"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-sm font-medium text-white/80">{t.hero.badge}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mx-auto max-w-5xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                    >
                        {t.hero.headline}
                        <br />
                        <span className="bg-gradient-to-r from-sapphire via-blue-400 to-sapphire bg-clip-text text-transparent">
                            {t.hero.headlineAccent}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-8 text-lg font-medium tracking-wide text-sapphire sm:text-xl md:text-2xl"
                    >
                        {t.hero.subheadline}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/50 sm:text-lg"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <a
                            href="#waitlist"
                            className="group inline-flex items-center gap-2 rounded-xl bg-sapphire px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-sapphire/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-sapphire/50"
                        >
                            {t.hero.cta}
                            <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-0.5 ${isArabic ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                        </a>
                        <a
                            href="#about"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                        >
                            {t.hero.ctaSecondary}
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-12 w-7 items-start justify-center rounded-full border border-white/[0.15] p-2"
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-2.5 w-1.5 rounded-full bg-white/70"
                        />
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.span variants={fadeInUp} className="inline-block rounded-full bg-sapphire/10 px-4 py-2 text-sm font-semibold text-sapphire">
                            {t.about.label}
                        </motion.span>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                            {t.about.title}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-navy/60">
                            {t.about.description}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {t.about.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="group relative rounded-3xl border border-slate-200/80 bg-white p-8 transition-all duration-500 hover:border-sapphire/20 hover:shadow-2xl hover:shadow-sapphire/[0.08]"
                            >
                                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sapphire/10 to-sapphire/5 text-sapphire transition-all duration-500 group-hover:scale-110 group-hover:from-sapphire group-hover:to-sapphire/80 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sapphire/30">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-navy">{feature.title}</h3>
                                <p className="mt-3 leading-relaxed text-navy/60">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative overflow-hidden bg-navy py-24 lg:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-sapphire/15 blur-[150px]" />
                    <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-sapphire/10 blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.span variants={fadeInUp} className="inline-block rounded-full border border-sapphire/30 bg-sapphire/10 px-4 py-2 text-sm font-semibold text-sapphire">
                            {t.howItWorks.label}
                        </motion.span>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {t.howItWorks.title}
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {t.howItWorks.steps.map((step, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05]"
                            >
                                <span className="text-5xl font-bold text-white/10 transition-colors group-hover:text-sapphire/30">{step.number}</span>
                                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                                <p className="mt-3 leading-relaxed text-white/50">{step.desc}</p>
                                {i < t.howItWorks.steps.length - 1 && (
                                    <div className={`absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-white/20 to-transparent lg:block ${isArabic ? '-left-3 -right-auto rotate-180' : ''}`} />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why It Matters Section */}
            <section id="why-it-matters" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} className="inline-block rounded-full bg-sapphire/10 px-4 py-2 text-sm font-semibold text-sapphire">
                                {t.whyItMatters.label}
                            </motion.span>
                            <motion.h2 variants={fadeInUp} className="mt-6 text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                                {t.whyItMatters.title}
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="mt-6 text-pretty text-lg leading-relaxed text-navy/60">
                                {t.whyItMatters.description}
                            </motion.p>

                            <motion.ul variants={fadeInUp} className="mt-10 space-y-5">
                                {t.whyItMatters.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        <span className="text-navy/80">{benefit}</span>
                                    </li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                            className="grid gap-5"
                        >
                            {t.whyItMatters.stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="group rounded-3xl border border-slate-200/80 bg-white p-8 transition-all duration-500 hover:border-sapphire/20 hover:shadow-xl hover:shadow-sapphire/[0.06]"
                                >
                                    <span className="bg-gradient-to-r from-sapphire to-blue-400 bg-clip-text text-5xl font-bold text-transparent">{stat.value}</span>
                                    <p className="mt-3 text-navy/60">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="relative overflow-hidden bg-navy py-24 lg:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sapphire/10 blur-[150px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.span variants={fadeInUp} className="inline-block rounded-full border border-sapphire/30 bg-sapphire/10 px-4 py-2 text-sm font-semibold text-sapphire">
                            {t.team.label}
                        </motion.span>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {t.team.title}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
                            {t.team.description}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {t.team.members.map((member, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05]"
                            >
                                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sapphire/30 to-sapphire/10">
                                    <Users className="h-10 w-10 text-sapphire" />
                                    <div className="absolute inset-0 rounded-full bg-sapphire/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-white">{member.name}</h3>
                                <p className="mt-1 text-sm font-medium text-sapphire">{member.role}</p>
                                <p className="mt-4 text-sm leading-relaxed text-white/50">{member.bio}</p>
                                <div className="mt-5 flex justify-center">
                                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-white/40 transition-all hover:bg-white/[0.1] hover:text-white">
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Waitlist Section */}
            <section id="waitlist" className="relative overflow-hidden bg-sapphire py-24 lg:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/15 blur-[150px]" />
                    <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-white/10 blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                                <Sparkles className="h-8 w-8 text-white" />
                                <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl" />
                            </div>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {t.waitlist.title}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mt-6 text-lg leading-relaxed text-white/80">
                            {t.waitlist.description}
                        </motion.p>

                        <motion.form
                            variants={fadeInUp}
                            onSubmit={handleWaitlistSubmit}
                            className="mt-10"
                        >
                            {waitlistStatus === 'success' ? (
                                <div className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white/20 px-8 py-5 text-white backdrop-blur-sm">
                                    <CheckCircle2 className="h-6 w-6" />
                                    <span className="text-lg font-semibold">{t.waitlist.success}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t.waitlist.placeholder}
                                        required
                                        className="flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-6 py-4 text-white outline-none placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 sm:max-w-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={waitlistStatus === 'submitting'}
                                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-sapphire shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-black/30 disabled:opacity-70"
                                    >
                                        {waitlistStatus === 'submitting' ? t.waitlist.submitting : t.waitlist.cta}
                                        <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-0.5 ${isArabic ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                                    </button>
                                </div>
                            )}
                        </motion.form>

                        <motion.p variants={fadeInUp} className="mt-5 flex items-center justify-center gap-2 text-sm text-white/60">
                            <Lock className="h-4 w-4" />
                            {t.waitlist.privacy}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} className="inline-block rounded-full bg-sapphire/10 px-4 py-2 text-sm font-semibold text-sapphire">
                                {t.contact.label}
                            </motion.span>
                            <motion.h2 variants={fadeInUp} className="mt-6 text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                                {t.contact.title}
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="mt-6 text-pretty text-lg leading-relaxed text-navy/60">
                                {t.contact.description}
                            </motion.p>

                            <motion.div variants={fadeInUp} className="mt-12 space-y-5">
                                <a href="mailto:hayatid.contact@gmail.com" className="group flex items-center gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sapphire/10 text-sapphire transition-all duration-300 group-hover:bg-sapphire group-hover:text-white group-hover:shadow-lg group-hover:shadow-sapphire/30">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-navy/50">Email</p>
                                        <p className="font-medium text-navy">{t.contact.info.email}</p>
                                    </div>
                                </a>
                                <a href="https://instagram.com/hayatid" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sapphire/10 text-sapphire transition-all duration-300 group-hover:bg-sapphire group-hover:text-white group-hover:shadow-lg group-hover:shadow-sapphire/30">
                                        <Instagram className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-navy/50">Instagram</p>
                                        <p className="font-medium text-navy">{t.contact.info.instagram}</p>
                                    </div>
                                </a>
                                <a href="https://linkedin.com/company/hayatid" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sapphire/10 text-sapphire transition-all duration-300 group-hover:bg-sapphire group-hover:text-white group-hover:shadow-lg group-hover:shadow-sapphire/30">
                                        <Linkedin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-navy/50">LinkedIn</p>
                                        <p className="font-medium text-navy">{t.contact.info.linkedin}</p>
                                    </div>
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            <motion.form
                                variants={fadeInUp}
                                onSubmit={handleContactSubmit}
                                className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 lg:p-10"
                            >
                                {contactStatus === 'success' ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                                        </div>
                                        <p className="mt-4 text-xl font-semibold text-navy">{t.contact.form.success}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-navy/70">{t.contact.form.name}</label>
                                            <input
                                                type="text"
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-navy outline-none transition-all focus:border-sapphire focus:bg-white focus:ring-4 focus:ring-sapphire/10"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-navy/70">{t.contact.form.email}</label>
                                            <input
                                                type="email"
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-navy outline-none transition-all focus:border-sapphire focus:bg-white focus:ring-4 focus:ring-sapphire/10"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-navy/70">{t.contact.form.message}</label>
                                            <textarea
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                required
                                                rows={5}
                                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-navy outline-none transition-all focus:border-sapphire focus:bg-white focus:ring-4 focus:ring-sapphire/10"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={contactStatus === 'submitting'}
                                            className="group w-full rounded-xl bg-sapphire px-8 py-4 font-semibold text-white shadow-lg shadow-sapphire/25 transition-all duration-300 hover:bg-sapphire/90 hover:shadow-sapphire/40 disabled:opacity-70"
                                        >
                                            {contactStatus === 'submitting' ? t.contact.form.submitting : t.contact.form.submit}
                                        </button>
                                    </div>
                                )}
                            </motion.form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-navy py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <a href="#" className="flex items-center gap-3">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sapphire to-sapphire/80">
                                <HeartPulse className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">HayatID</span>
                        </a>
                        <p className="mt-6 max-w-md text-white/50">{t.footer.tagline}</p>
                        <div className="mt-8 flex gap-4">
                            <a href="https://instagram.com/hayatid" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-white/50 transition-all hover:bg-white/[0.1] hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/company/hayatid" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-white/50 transition-all hover:bg-white/[0.1] hover:text-white">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="mailto:hayatid.contact@gmail.com" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-white/50 transition-all hover:bg-white/[0.1] hover:text-white">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/[0.08] pt-8 text-sm text-white/40">
                            <p>&copy; 2024 {t.footer.copyright}</p>
                            <p>{t.footer.poweredBy}</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
