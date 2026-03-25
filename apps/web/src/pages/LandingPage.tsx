import { motion } from 'framer-motion';
import { Activity, ArrowRight, HeartPulse, ShieldCheck, Smartphone, Stethoscope, UserCheck, WalletCards, Wifi, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

const featureCards = [
    {
        icon: ShieldCheck,
        title: 'Secure Medical Records',
        body: 'All patient data is protected with strong encryption and strict access controls, ensuring only authorized users can view sensitive medical information.',
    },
    {
        icon: Zap,
        title: 'Instant NFC Access',
        body: 'A single tap of the HayatID card opens the digital health profile instantly — no delays, no friction, no manual entry required.',
    },
    {
        icon: HeartPulse,
        title: 'Better Patient-Doctor Connection',
        body: 'HayatID bridges the gap between patients and professionals by making medical records easier to access and share in a structured, secure environment.',
    },
    {
        icon: Activity,
        title: 'Modern Healthcare Experience',
        body: 'Designed for today\'s expectations — HayatID brings clarity, speed, and reliability to every step of the healthcare journey.',
    },
];

const howItWorksSteps = [
    {
        step: '01',
        title: 'Tap the NFC Card',
        body: 'The patient taps or scans the HayatID card, instantly connecting to the secure digital health platform.',
    },
    {
        step: '02',
        title: 'Access the Health Profile',
        body: 'Relevant medical records, prescriptions, and documents are organized and available in one structured digital space.',
    },
    {
        step: '03',
        title: 'Manage and Share Securely',
        body: 'Patients and healthcare professionals can view and manage health information quickly, reliably, and with full privacy controls.',
    },
];

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Smart Medical Identity Platform by 2ks"
                description="HayatID connects a smart NFC card to a secure digital health platform, making essential medical information accessible, organized, and ready when it matters most."
            />

            {/* ── 1. HERO ───────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden border-b border-sapphire/20 bg-[radial-gradient(circle_at_top_left,_rgba(15,82,186,0.14),_transparent_32%),linear-gradient(180deg,#E9F4FB_0%,#DDECF7_45%,#F8FBFD_100%)]">
                <div className="absolute inset-0 bg-grid bg-[size:18px_18px] opacity-35" />
                <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={isArabic ? 'font-arabic text-right' : ''}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-sapphire/25 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sapphire shadow-sm">
                                <Smartphone className="h-3.5 w-3.5" />
                                Smart Medical Identity Platform
                            </div>

                            <h1 className="mt-6 max-w-xl text-5xl font-bold leading-[1.08] tracking-tight text-navy sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                                Smart medical identity for faster, safer healthcare access
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-navy/68 sm:text-lg sm:leading-8">
                                HayatID, powered by 2ks technology, connects a smart NFC card to a secure digital health platform — making essential medical information accessible, organized, and ready when it matters most.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    to="/how-it-works"
                                    className="inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#1661D0_0%,#0F52BA_100%)] px-8 py-4 text-sm font-semibold text-white shadow-[0_3px_18px_rgba(15,82,186,0.38)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(15,82,186,0.45)]"
                                >
                                    Discover HayatID
                                    <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2.5 rounded-full border border-sapphire/30 bg-white/80 px-8 py-4 text-sm font-semibold text-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sapphire hover:bg-white"
                                >
                                    Create Account
                                    <ArrowRight className={`h-4 w-4 text-sapphire ${isArabic ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.12 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-sm">
                                <div className="rounded-3xl border border-sapphire/20 bg-navy p-6 shadow-panel sm:p-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-powder/60">2ks Technology</p>
                                            <p className="mt-1.5 text-2xl font-bold text-white">HayatID</p>
                                        </div>
                                        <div className="rounded-2xl bg-sapphire/30 p-3">
                                            <WalletCards className="h-6 w-6 text-powder" />
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-powder/70">Medical Profile</p>
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            {['Blood Type', 'Allergies', 'Conditions', 'Medications'].map((item) => (
                                                <div key={item} className="rounded-xl border border-white/8 bg-white/5 px-3 py-2.5">
                                                    <p className="text-xs text-white/50">• {item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-sapphire/30 bg-sapphire/15 px-4 py-3">
                                        <Wifi className="h-5 w-5 text-powder" />
                                        <div>
                                            <p className="text-xs font-semibold text-white">NFC Ready</p>
                                            <p className="text-xs text-white/55">Tap to access instantly</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
                                            <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                            <p className="mt-2 text-xs font-semibold text-white">Encrypted</p>
                                            <p className="mt-0.5 text-xs text-white/50">End-to-end secure</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
                                            <HeartPulse className="h-5 w-5 text-red-400" />
                                            <p className="mt-2 text-xs font-semibold text-white">Always Ready</p>
                                            <p className="mt-0.5 text-xs text-white/50">24/7 accessible</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-4 -left-4 rounded-2xl border border-sapphire/20 bg-white px-4 py-3 shadow-soft">
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sapphire">Powered by</p>
                                    <p className="text-base font-bold text-navy">2ks</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ── 2. WHO WE ARE ────────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="grid gap-12 lg:grid-cols-2 lg:items-center"
                >
                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sapphire/70">Who We Are</p>
                        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
                            Redefining medical access through smart digital identity
                        </h2>
                        <p className="mt-5 text-base leading-7 text-navy/68 sm:text-lg sm:leading-8">
                            HayatID is a next-generation medical identity platform designed to improve the way patients and healthcare professionals access medical information. By combining NFC technology with a secure digital environment, HayatID creates a more connected, efficient, and reliable healthcare experience.
                        </p>
                        <div className="mt-7">
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 rounded-full border border-sapphire/25 bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-sapphire"
                            >
                                Learn about HayatID
                                <ArrowRight className={`h-4 w-4 text-sapphire ${isArabic ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sapphire/70">Medical Records</p>
                        <div className="mt-4 space-y-3">
                            {['Blood Analysis', 'Radiology Report', 'Prescription', 'Medical History', 'Vaccination Record'].map((item) => (
                                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-sapphire" />
                                        <p className="text-sm font-medium text-navy">{item}</p>
                                    </div>
                                    <span className="text-xs font-medium text-navy/40">Secure ✓</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── 3. HOW IT WORKS ──────────────────────────────────────────── */}
            <section className="border-y border-sapphire/15 bg-white/60">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`max-w-2xl ${isArabic ? 'font-arabic text-right' : ''}`}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sapphire/70">How It Works</p>
                        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
                            A seamless journey from NFC tap to secure medical access
                        </h2>
                        <p className="mt-5 text-base leading-7 text-navy/68 sm:text-lg sm:leading-8">
                            With a single tap, the HayatID card connects users to a secure digital platform where essential medical information can be viewed, managed, and shared more efficiently. The experience is designed to be simple, fast, and accessible.
                        </p>
                    </motion.div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-3">
                        {howItWorksSteps.map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1 }}
                                className={`rounded-[1.75rem] border border-sapphire/15 bg-gradient-to-b from-white to-[#F0F7FF] p-6 shadow-soft sm:p-7 ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.28em] text-sapphire">{item.step}</p>
                                <h3 className="mt-4 text-xl font-semibold leading-snug text-navy">{item.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-navy/65">{item.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. WHY HAYATID ───────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`text-center ${isArabic ? 'font-arabic' : ''}`}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sapphire/70">Why HayatID</p>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Built for clarity, speed, and trust</h2>
                </motion.div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featureCards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                            className={`rounded-[1.75rem] border border-sapphire/15 bg-gradient-to-b from-white to-[#F0F7FF] p-6 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`}
                        >
                            <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                <card.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-navy">{card.title}</h3>
                            <p className="mt-2.5 text-sm leading-6 text-navy/65">{card.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 5. POWERED BY 2KS ────────────────────────────────────────── */}
            <section className="border-y border-sapphire/15 bg-white/60">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="overflow-hidden rounded-3xl bg-navy shadow-panel"
                    >
                        <div className="grid lg:grid-cols-2">
                            <div className={`p-8 sm:p-12 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-powder/60">Powered by 2ks</p>
                                <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                                    The technology behind a smarter healthcare experience
                                </h2>
                                <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                                    2ks is the digital technology layer that powers HayatID. It enables secure interaction between the NFC medical card and the online platform, helping transform healthcare access into a smoother, smarter, and more modern experience.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy transition hover:bg-ice"
                                    >
                                        Create Account
                                        <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                    </Link>
                                    <Link
                                        to="/how-it-works"
                                        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                                    >
                                        How It Works
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center justify-center bg-white/[0.04] p-8 sm:p-12">
                                <div className="w-full max-w-xs space-y-4">
                                    {[
                                        { icon: WalletCards, label: 'NFC Smart Card', value: 'Physical + Digital' },
                                        { icon: ShieldCheck, label: 'Data Security', value: 'End-to-End Encrypted' },
                                        { icon: Activity, label: 'Platform Speed', value: 'Instant Access' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                            <div className="rounded-xl bg-sapphire/30 p-2.5 text-powder">
                                                <stat.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{stat.label}</p>
                                                <p className="mt-0.5 text-sm font-semibold text-white">{stat.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── 6. WHO IT SERVES ─────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="grid gap-10 lg:grid-cols-2 lg:items-center"
                >
                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sapphire/70">Who It Serves</p>
                        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
                            Designed for patients and healthcare professionals
                        </h2>
                        <p className="mt-5 text-base leading-7 text-navy/68 sm:text-lg sm:leading-8">
                            HayatID helps patients keep their medical information organized and accessible, while giving healthcare professionals a more efficient way to view relevant health records in a secure and structured environment.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#1661D0_0%,#0F52BA_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_2px_14px_rgba(15,82,186,0.32)] transition hover:-translate-y-0.5"
                            >
                                Create Account
                                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                            </Link>
                            <Link
                                to="/pro"
                                className="inline-flex items-center gap-2.5 rounded-full border border-sapphire/25 bg-white px-7 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-sapphire"
                            >
                                Professional Access
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.75rem] border border-sapphire/15 bg-gradient-to-b from-white to-[#F0F7FF] p-6 shadow-soft">
                            <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                <UserCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-navy">For Patients</h3>
                            <p className="mt-2.5 text-sm leading-6 text-navy/65">
                                One secure place for all medical records — accessible with a single tap whenever needed, by you or your care team.
                            </p>
                        </div>
                        <div className="rounded-[1.75rem] border border-sapphire/15 bg-gradient-to-b from-white to-[#F0F7FF] p-6 shadow-soft">
                            <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-navy">For Professionals</h3>
                            <p className="mt-2.5 text-sm leading-6 text-navy/65">
                                Fast, structured access to relevant patient data — reducing time spent on paperwork and improving the quality of care.
                            </p>
                        </div>
                        <div className="col-span-full rounded-[1.75rem] border border-sapphire/20 bg-navy p-6 text-white shadow-panel">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-powder/70">Built for everyone in the care journey</p>
                            <p className="mt-3 text-sm leading-6 text-white/70">
                                From first-time patients to seasoned clinicians — HayatID is designed to be intuitive, secure, and immediately useful at every level of the healthcare system.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

        </MarketingLayout>
    );
}
