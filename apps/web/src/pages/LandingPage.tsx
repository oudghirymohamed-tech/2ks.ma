import { motion } from 'framer-motion';
import { ArrowRight, HeartPulse, Languages, Phone, ShieldCheck, Smartphone, Siren, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

const landingContent = {
    en: {
        metaTitle: '2ks | NFC medical emergency landing page',
        metaDescription: 'Bilingual medical startup landing page for 2ks with urgent access, onboarding, and NFC-powered emergency identity.',
        eyebrow: '2ks medical NFC platform',
        title: 'Emergency medical access in one tap.',
        body: 'A patient taps the NFC card and 2ks opens instantly with the right emergency details, clear next steps, and a secure path to the full account experience.',
        urgentLabel: 'Urgent access',
        urgentBody: 'Show the critical profile immediately: blood type, allergies, chronic conditions, and emergency notes.',
        infoLabel: 'More information',
        infoBody: 'Continue to the main experience for login, registration, OTP verification, dashboard access, and medical documents.',
        urgentButton: 'Urgent',
        infoButton: 'Plus d\'informations',
        buyCard: 'Get the NFC card',
        statTitle: 'Built for a live demo that feels real on mobile.',
        statBody: 'The first view is intentionally simple, fast, and trustworthy so a patient, family member, or clinician understands the product in seconds.',
        highlights: [
            { title: 'Public emergency layer', body: 'Only the urgent essentials appear first, so the emergency flow stays readable under pressure.' },
            { title: 'Secure patient journey', body: 'Registration, OTP verification, and dashboard access remain in the protected product flow.' },
            { title: 'Bilingual by design', body: 'English and Arabic layouts are designed together, including RTL support for Arabic.' }
        ],
        emergencyTitle: 'What urgent access reveals',
        emergencyItems: ['Blood type', 'Allergies', 'Chronic diseases', 'Emergency instructions'],
        stepsTitle: 'From NFC tap to account access',
        steps: [
            { title: 'Tap or scan', body: 'The 2ks card opens the landing page instantly from the patient NFC or QR identifier.' },
            { title: 'Choose the right path', body: 'Use Urgent for emergency visibility or Plus d\'informations for the full patient experience.' },
            { title: 'Continue securely', body: 'Patients move into registration, OTP verification, dashboard access, and document management.' }
        ],
        supportTitle: 'Card acquisition stays visible in the demo',
        supportBody: 'Patients can buy the card first or contact the team before account activation, which keeps the startup story realistic and investor-ready.',
        supportPrimary: 'Contact support',
        supportSecondary: 'Start registration'
    },
    ar: {
        metaTitle: '2ks | واجهة طبية للطوارئ عبر NFC',
        metaDescription: 'واجهة ثنائية اللغة لمنصة 2ks الطبية مع زر طوارئ واضح ومسار معلومات كامل وتجربة مهيأة للهاتف.',
        eyebrow: 'منصة 2ks الطبية عبر NFC',
        title: 'الوصول الطبي العاجل بلمسة واحدة.',
        body: 'عند لمس بطاقة المريض NFC تفتح منصة 2ks فوراً وتعرض معلومات الطوارئ المناسبة مع مسار واضح وآمن للوصول إلى الحساب الكامل.',
        urgentLabel: 'وصول الطوارئ',
        urgentBody: 'إظهار المعلومات الحرجة فوراً مثل فصيلة الدم والحساسية والأمراض المزمنة وملاحظات الطوارئ.',
        infoLabel: 'معلومات إضافية',
        infoBody: 'الانتقال إلى التجربة الكاملة التي تشمل تسجيل الدخول والتسجيل والتحقق عبر OTP ولوحة المريض والوثائق الطبية.',
        urgentButton: 'طوارئ',
        infoButton: 'مزيد من المعلومات',
        buyCard: 'الحصول على بطاقة NFC',
        statTitle: 'واجهة عرض قوية ومهيأة للهاتف من أول شاشة.',
        statBody: 'تم تصميم الصفحة الأولى لتكون واضحة وسريعة وموثوقة حتى يفهم المريض أو العائلة أو الطبيب الفكرة خلال ثوانٍ.',
        highlights: [
            { title: 'طبقة طوارئ عامة', body: 'يتم عرض المعلومات الحيوية فقط أولاً حتى يبقى مسار الطوارئ سريعاً وسهل القراءة.' },
            { title: 'رحلة مريض آمنة', body: 'يبقى التسجيل والتحقق عبر OTP ولوحة المريض ضمن المسار المحمي داخل المنتج.' },
            { title: 'ثنائية اللغة فعلياً', body: 'تم تصميم الإنجليزية والعربية معاً مع دعم RTL الكامل للواجهة العربية.' }
        ],
        emergencyTitle: 'ما الذي يظهر في وضع الطوارئ',
        emergencyItems: ['فصيلة الدم', 'الحساسية', 'الأمراض المزمنة', 'تعليمات الطوارئ'],
        stepsTitle: 'من البطاقة إلى الحساب',
        steps: [
            { title: 'لمس أو مسح البطاقة', body: 'تفتح بطاقة 2ks صفحة البداية فوراً من خلال NFC أو QR الخاص بالمريض.' },
            { title: 'اختيار المسار المناسب', body: 'استخدم زر طوارئ للوصول السريع أو زر مزيد من المعلومات للدخول إلى التجربة الكاملة.' },
            { title: 'متابعة آمنة', body: 'ينتقل المريض بعد ذلك إلى التسجيل والتحقق عبر OTP ولوحة التحكم وإدارة الملفات الطبية.' }
        ],
        supportTitle: 'الحصول على البطاقة حاضر بوضوح في العرض',
        supportBody: 'يمكن للمريض شراء البطاقة أولاً أو التواصل مع الفريق قبل تفعيل الحساب، وهذا يجعل القصة التجارية أكثر واقعية وجاهزة للعرض.',
        supportPrimary: 'تواصل مع الدعم',
        supportSecondary: 'ابدأ التسجيل'
    }
} as const;

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    // Generated by Copilot: keep English as the fallback while Arabic drives RTL layout.
    const content = landingContent[isArabic ? 'ar' : 'en'];

    return (
        <MarketingLayout>
            <PageMeta title={content.metaTitle} description={content.metaDescription} />

            <section className="relative overflow-hidden border-b border-sapphire/20 bg-[radial-gradient(circle_at_top_left,_rgba(15,82,186,0.14),_transparent_32%),linear-gradient(180deg,#E9F4FB_0%,#DDECF7_45%,#F8FBFD_100%)]">
                <div className="absolute inset-0 bg-grid bg-[size:18px_18px] opacity-35" />
                <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
                <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                    <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className={isArabic ? 'font-arabic text-right' : ''}>
                            <div className="inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sapphire shadow-sm sm:text-sm">
                                <Languages className="h-4 w-4" />
                                {content.eyebrow}
                            </div>
                            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
                                {content.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-navy/75 sm:text-lg sm:leading-8">
                                {content.body}
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                <Link
                                    to="/u/demo-token"
                                    className="group rounded-[1.75rem] border border-emergency/20 bg-[linear-gradient(180deg,#D74A3C_0%,#C0392B_100%)] p-5 text-white shadow-panel transition hover:-translate-y-0.5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">{content.urgentLabel}</p>
                                            <p className="mt-3 text-2xl font-semibold">{content.urgentButton}</p>
                                        </div>
                                        <div className="rounded-2xl bg-white/15 p-3">
                                            <Siren className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">{content.urgentBody}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                                        {content.urgentButton}
                                        <ArrowRight className={`h-4 w-4 transition group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-y-0' : ''}`} />
                                    </span>
                                </Link>

                                <Link
                                    to="/register"
                                    className="group rounded-[1.75rem] border border-sapphire/20 bg-white/80 p-5 text-navy shadow-soft backdrop-blur transition hover:-translate-y-0.5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sapphire/70">{content.infoLabel}</p>
                                            <p className="mt-3 text-2xl font-semibold text-navy">{content.infoButton}</p>
                                        </div>
                                        <div className="rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                            <HeartPulse className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <p className="mt-4 max-w-sm text-sm leading-6 text-navy/72">{content.infoBody}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sapphire">
                                        {content.infoButton}
                                        <ArrowRight className={`h-4 w-4 transition group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-y-0' : ''}`} />
                                    </span>
                                </Link>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link to="/checkout" className="inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-5 py-3 text-sm font-semibold text-navy transition hover:border-sapphire hover:bg-white">
                                    <WalletCards className="h-4 w-4 text-sapphire" />
                                    {content.buyCard}
                                </Link>
                                <Link to="/pro" className="inline-flex items-center gap-2 rounded-full border border-sapphire/15 bg-sapphire/5 px-5 py-3 text-sm font-semibold text-navy/80 transition hover:border-sapphire/35 hover:text-sapphire">
                                    <ShieldCheck className="h-4 w-4" />
                                    {isArabic ? 'دخول الأطباء' : 'Professional access'}
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
                                        <p className="text-xs uppercase tracking-[0.2em] text-powder/70">2ks NFC</p>
                                        <p className="mt-2 text-xl font-semibold">{isArabic ? 'بطاقة طبية جاهزة للطوارئ' : 'Emergency-ready patient card'}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-3 text-powder">
                                        <Smartphone className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-5 rounded-[1.4rem] bg-white p-4 text-navy sm:p-5">
                                    <p className="text-sm font-semibold text-sapphire">{content.emergencyTitle}</p>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {content.emergencyItems.map((item) => (
                                            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-sm font-semibold">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 rounded-2xl border border-emergency/15 bg-[#FFF4F2] p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emergency/80">{isArabic ? 'وضع الطوارئ العام' : 'Public emergency mode'}</p>
                                        <p className="mt-2 text-sm leading-6 text-navy/75">
                                            {isArabic
                                                ? 'عرض سريع للمعلومات المنقذة للحياة بدون كشف الملفات الخاصة أو السجل الكامل.'
                                                : 'A fast life-saving preview without exposing the full protected record.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                                        <Phone className="h-5 w-5 text-powder" />
                                        <p className="mt-3 text-sm font-semibold text-white">OTP</p>
                                        <p className="mt-2 text-sm leading-6 text-white/70">
                                            {isArabic ? 'التحقق عبر الهاتف قبل فتح لوحة المريض أو تعديل الملف.' : 'Phone verification before opening the private dashboard or editing the profile.'}
                                        </p>
                                    </div>
                                    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                                        <Languages className="h-5 w-5 text-powder" />
                                        <p className="mt-3 text-sm font-semibold text-white">EN / AR</p>
                                        <p className="mt-2 text-sm leading-6 text-white/70">
                                            {isArabic ? 'دعم كامل للعربية والإنجليزية مع تجربة واضحة على الهاتف.' : 'English and Arabic are both designed for a clear mobile-first presentation.'}
                                        </p>
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
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{isArabic ? 'أولوية العرض' : 'Demo priority'}</p>
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
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{isArabic ? 'تجربة المستخدم' : 'User journey'}</p>
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
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className={`rounded-[2rem] bg-navy p-6 text-white shadow-panel sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-powder/80">{isArabic ? 'الحصول على البطاقة' : 'Card acquisition'}</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{content.supportTitle}</h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{content.supportBody}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link to="/checkout" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100">
                                <Phone className="h-4 w-4" />
                                {content.supportPrimary}
                            </Link>
                            <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                {content.supportSecondary}
                            </Link>
                        </div>
                    </div>

                    <div className={`rounded-[2rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75">{isArabic ? 'مسار الطوارئ أولاً' : 'Urgent-first design'}</p>
                        <div className="mt-5 space-y-4">
                            {[
                                isArabic ? 'زر طوارئ ظاهر مباشرة فوق الطية الأولى.' : 'A prominent urgent button is visible above the fold.',
                                isArabic ? 'المعلومات العامة منفصلة عن الحساب والملفات الخاصة.' : 'Public emergency information is separated from the private account flow.',
                                isArabic ? 'الواجهة تستجيب بسلاسة على الهاتف قبل الشاشات الكبيرة.' : 'The layout is tuned for mobile first, then scales to larger screens.'
                            ].map((item) => (
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
