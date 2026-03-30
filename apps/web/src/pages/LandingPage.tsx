import { motion } from 'framer-motion';
import { ArrowRight, HeartPulse, Shield, Smartphone, Wifi } from 'lucide-react';
import { useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

const content = {
    en: {
        metaTitle: 'HayatID | Smart Medical Identity - Coming Soon',
        metaDescription: 'HayatID is the next-generation medical identity platform. Secure NFC-enabled smart cards for faster, safer healthcare access.',
        announcement: 'Launching Soon',
        headline: 'The future of medical identity',
        subheadline: 'Smart. Secure. Seamless.',
        description: 'HayatID connects your medical identity to a secure digital ecosystem. One tap for instant, trusted healthcare access.',
        emailPlaceholder: 'Enter your email',
        cta: 'Get Early Access',
        submitting: 'Joining...',
        success: 'You are on the list!',
        features: [
            { icon: Shield, title: 'Bank-Grade Security', desc: 'Your medical data protected with enterprise encryption' },
            { icon: Smartphone, title: 'NFC Smart Cards', desc: 'Tap to access your complete medical profile instantly' },
            { icon: Wifi, title: 'Always Connected', desc: 'Seamless sync across all healthcare providers' },
        ],
        poweredBy: 'Powered by 2ks Technology',
        privacyNote: 'We respect your privacy. No spam, ever.',
    },
    fr: {
        metaTitle: 'HayatID | Identite Medicale Intelligente - Bientot Disponible',
        metaDescription: 'HayatID est la plateforme d identite medicale de nouvelle generation. Cartes intelligentes NFC pour un acces aux soins plus rapide et plus sur.',
        announcement: 'Lancement Imminent',
        headline: 'L avenir de l identite medicale',
        subheadline: 'Intelligente. Securisee. Fluide.',
        description: 'HayatID connecte votre identite medicale a un ecosysteme numerique securise. Un seul geste pour un acces instantane et fiable aux soins.',
        emailPlaceholder: 'Entrez votre email',
        cta: 'Acces Anticipe',
        submitting: 'Inscription...',
        success: 'Vous etes sur la liste!',
        features: [
            { icon: Shield, title: 'Securite Bancaire', desc: 'Vos donnees medicales protegees par un chiffrement enterprise' },
            { icon: Smartphone, title: 'Cartes NFC', desc: 'Touchez pour acceder a votre profil medical instantanement' },
            { icon: Wifi, title: 'Toujours Connecte', desc: 'Synchronisation fluide entre tous les prestataires de sante' },
        ],
        poweredBy: 'Propulse par 2ks Technology',
        privacyNote: 'Nous respectons votre vie privee. Aucun spam.',
    },
    ar: {
        metaTitle: 'HayatID | الهوية الطبية الذكية - قريباً',
        metaDescription: 'HayatID هي منصة الهوية الطبية من الجيل الجديد. بطاقات ذكية بتقنية NFC لوصول أسرع وأكثر أماناً للرعاية الصحية.',
        announcement: 'الإطلاق قريباً',
        headline: 'مستقبل الهوية الطبية',
        subheadline: 'ذكية. آمنة. سلسة.',
        description: 'HayatID تربط هويتك الطبية بنظام رقمي آمن. لمسة واحدة للوصول الفوري والموثوق للرعاية الصحية.',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        cta: 'احصل على وصول مبكر',
        submitting: 'جاري الانضمام...',
        success: 'أنت في القائمة!',
        features: [
            { icon: Shield, title: 'أمان بنكي', desc: 'بياناتك الطبية محمية بتشفير مؤسسي' },
            { icon: Smartphone, title: 'بطاقات NFC ذكية', desc: 'المس للوصول إلى ملفك الطبي فوراً' },
            { icon: Wifi, title: 'اتصال دائم', desc: 'مزامنة سلسة عبر جميع مقدمي الرعاية الصحية' },
        ],
        poweredBy: 'مدعوم بتقنية 2ks',
        privacyNote: 'نحترم خصوصيتك. لا رسائل مزعجة أبداً.',
    },
} as const;

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = content[language] || content.en;

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <div className={`relative min-h-screen overflow-hidden bg-[#FAFAF8] ${isArabic ? 'font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
            <PageMeta title={t.metaTitle} description={t.metaDescription} />

            {/* Subtle Background Elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sapphire/3 blur-3xl" />
            </div>

            {/* Header */}
            <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8 lg:py-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white shadow-lg">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold tracking-tight text-navy">HayatID</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-navy/50">{t.poweredBy}</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
                <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center py-16 text-center lg:py-24">
                    {/* Announcement Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white px-5 py-2.5 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            <span className="text-sm font-medium text-navy/80">{t.announcement}</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        {t.headline}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 text-xl font-medium text-sapphire sm:text-2xl md:text-3xl"
                    >
                        {t.subheadline}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-navy/60 sm:text-xl"
                    >
                        {t.description}
                    </motion.p>

                    {/* Email Signup Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        onSubmit={handleSubmit}
                        className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                    >
                        {status === 'success' ? (
                            <div className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-50 px-6 py-4 text-emerald-700">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">{t.success}</span>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.emailPlaceholder}
                                    required
                                    className="flex-1 rounded-full border border-slate-200 bg-white px-6 py-4 text-navy outline-none transition placeholder:text-navy/40 focus:border-sapphire focus:ring-4 focus:ring-sapphire/10"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-navy/90 disabled:opacity-70"
                                >
                                    {status === 'submitting' ? t.submitting : t.cta}
                                    <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </button>
                            </>
                        )}
                    </motion.form>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-4 text-sm text-navy/40"
                    >
                        {t.privacyNote}
                    </motion.p>
                </div>
            </main>

            {/* Features Section */}
            <section className="relative z-10 border-t border-slate-200/80 bg-white/50 backdrop-blur-sm">
                <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {t.features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group rounded-3xl border border-slate-200/80 bg-white p-8 transition hover:border-sapphire/20 hover:shadow-lg"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sapphire/5 text-sapphire transition group-hover:bg-sapphire group-hover:text-white">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-navy">{feature.title}</h3>
                                <p className="mt-2 leading-relaxed text-navy/60">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-200/80 bg-white/30">
                <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 text-sm text-navy/50">
                            <HeartPulse className="h-4 w-4" />
                            <span>HayatID</span>
                            <span className="mx-2">·</span>
                            <span>{t.poweredBy}</span>
                        </div>
                        <p className="text-sm text-navy/40">
                            © {new Date().getFullYear()} HayatID. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
