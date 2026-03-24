import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        infoButton: 'More Information',
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
            { title: 'Choose the right path', body: 'Use Urgent for emergency visibility or More Information for the full patient experience.' },
            { title: 'Continue securely', body: 'Patients move into registration, OTP verification, dashboard access, and document management.' }
        ],
        supportTitle: 'Card acquisition stays visible in the demo',
        supportBody: 'Patients can buy the card first or contact the team before account activation, which keeps the startup story realistic and investor-ready.',
        supportPrimary: 'Contact support',
        supportSecondary: 'Start registration'
    },
    fr: {
        metaTitle: '2ks | Page medicale d\'urgence NFC',
        metaDescription: 'Page d\'accueil medicale 2ks avec acces urgent, authentification, et identite d\'urgence via NFC.',
        eyebrow: 'Plateforme medicale NFC 2ks',
        title: 'Acces medical d\'urgence en un geste.',
        body: 'Le patient approche sa carte NFC et 2ks s\'ouvre instantanement avec les bonnes informations d\'urgence, puis un acces securise au compte.',
        urgentLabel: 'Acces urgent',
        urgentBody: 'Afficher immediatement le profil critique: groupe sanguin, allergies, maladies chroniques et notes d\'urgence.',
        infoLabel: 'Plus d\'informations',
        infoBody: 'Continuer vers l\'experience complete: connexion, inscription, OTP, tableau de bord et documents medicaux.',
        urgentButton: 'Urgent',
        infoButton: 'Plus d\'informations',
        buyCard: 'Obtenir la carte NFC',
        statTitle: 'Concue pour une demo mobile realiste.',
        statBody: 'La premiere vue est simple, rapide et fiable pour expliquer le produit en quelques secondes.',
        highlights: [
            { title: 'Couche urgence publique', body: 'Seules les informations vitales apparaissent en premier pour garder la lecture rapide.' },
            { title: 'Parcours patient securise', body: 'Inscription, verification OTP et acces tableau de bord restent dans le flux protege.' },
            { title: 'Trilingue par design', body: 'Francais, anglais et arabe sont pris en charge avec RTL pour l\'arabe.' }
        ],
        emergencyTitle: 'Ce que l\'acces urgent affiche',
        emergencyItems: ['Groupe sanguin', 'Allergies', 'Maladies chroniques', 'Instructions d\'urgence'],
        stepsTitle: 'De la carte NFC a l\'acces compte',
        steps: [
            { title: 'Approcher ou scanner', body: 'La carte 2ks ouvre instantanement la page via NFC ou QR patient.' },
            { title: 'Choisir le bon parcours', body: 'Utilisez Urgent pour l\'urgence ou Plus d\'informations pour l\'experience complete.' },
            { title: 'Continuer en securite', body: 'Le patient passe ensuite par la connexion, OTP, tableau de bord et gestion des documents.' }
        ],
        supportTitle: 'Acquisition de la carte visible pendant la demo',
        supportBody: 'Le patient peut acheter la carte d\'abord ou contacter l\'equipe avant activation du compte.',
        supportPrimary: 'Contacter le support',
        supportSecondary: 'Commencer l\'inscription'
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
};
export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = (en, fr, ar) => {
        if (language === 'ar')
            return ar;
        if (language === 'fr')
            return fr;
        return en;
    };
    const content = landingContent[language];
    return (_jsxs(MarketingLayout, { children: [_jsx(PageMeta, { title: content.metaTitle, description: content.metaDescription }), _jsxs("section", { className: "relative overflow-hidden border-b border-sapphire/20 bg-[radial-gradient(circle_at_top_left,_rgba(15,82,186,0.14),_transparent_32%),linear-gradient(180deg,#E9F4FB_0%,#DDECF7_45%,#F8FBFD_100%)]", children: [_jsx("div", { className: "absolute inset-0 bg-grid bg-[size:18px_18px] opacity-35" }), _jsx("div", { className: "absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" }), _jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20", children: _jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, className: isArabic ? 'font-arabic text-right' : '', children: [_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sapphire shadow-sm sm:text-sm", children: [_jsx(Languages, { className: "h-4 w-4" }), content.eyebrow] }), _jsx("h1", { className: "mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl", children: content.title }), _jsx("p", { className: "mt-5 max-w-2xl text-base leading-7 text-navy/75 sm:text-lg sm:leading-8", children: content.body }), _jsxs("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: [_jsxs(Link, { to: "/u/demo-token", className: "group rounded-[1.75rem] border border-emergency/20 bg-[linear-gradient(180deg,#D74A3C_0%,#C0392B_100%)] p-5 text-white shadow-panel transition hover:-translate-y-0.5", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-white/75", children: content.urgentLabel }), _jsx("p", { className: "mt-3 text-2xl font-semibold", children: content.urgentButton })] }), _jsx("div", { className: "rounded-2xl bg-white/15 p-3", children: _jsx(Siren, { className: "h-6 w-6" }) })] }), _jsx("p", { className: "mt-4 max-w-sm text-sm leading-6 text-white/80", children: content.urgentBody }), _jsxs("span", { className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white", children: [content.urgentButton, _jsx(ArrowRight, { className: `h-4 w-4 transition group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-y-0' : ''}` })] })] }), _jsxs(Link, { to: "/login", className: "group rounded-[1.75rem] border border-sapphire/20 bg-white/80 p-5 text-navy shadow-soft backdrop-blur transition hover:-translate-y-0.5", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-sapphire/70", children: content.infoLabel }), _jsx("p", { className: "mt-3 text-2xl font-semibold text-navy", children: content.infoButton })] }), _jsx("div", { className: "rounded-2xl bg-sapphire/10 p-3 text-sapphire", children: _jsx(HeartPulse, { className: "h-6 w-6" }) })] }), _jsx("p", { className: "mt-4 max-w-sm text-sm leading-6 text-navy/72", children: content.infoBody }), _jsxs("span", { className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sapphire", children: [content.infoButton, _jsx(ArrowRight, { className: `h-4 w-4 transition group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-y-0' : ''}` })] })] })] }), _jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [_jsxs(Link, { to: "/checkout", className: "inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white/70 px-5 py-3 text-sm font-semibold text-navy transition hover:border-sapphire hover:bg-white", children: [_jsx(WalletCards, { className: "h-4 w-4 text-sapphire" }), content.buyCard] }), _jsxs(Link, { to: "/pro", className: "inline-flex items-center gap-2 rounded-full border border-sapphire/15 bg-sapphire/5 px-5 py-3 text-sm font-semibold text-navy/80 transition hover:border-sapphire/35 hover:text-sapphire", children: [_jsx(ShieldCheck, { className: "h-4 w-4" }), t('Professional access', 'Acces professionnel', 'دخول الأطباء')] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 }, className: `rounded-[2rem] border border-sapphire/20 bg-navy p-4 text-white shadow-panel sm:p-6 ${isArabic ? 'font-arabic' : ''}`, children: _jsxs("div", { className: "rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-powder/70", children: "2ks NFC" }), _jsx("p", { className: "mt-2 text-xl font-semibold", children: t('Emergency-ready patient card', 'Carte patient prete pour l\'urgence', 'بطاقة طبية جاهزة للطوارئ') })] }), _jsx("div", { className: "rounded-2xl bg-white/10 p-3 text-powder", children: _jsx(Smartphone, { className: "h-6 w-6" }) })] }), _jsxs("div", { className: "mt-5 rounded-[1.4rem] bg-white p-4 text-navy sm:p-5", children: [_jsx("p", { className: "text-sm font-semibold text-sapphire", children: content.emergencyTitle }), _jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: content.emergencyItems.map((item) => (_jsx("div", { className: "rounded-2xl border border-slate-200 bg-slate-50 p-3", children: _jsx("p", { className: "text-sm font-semibold", children: item }) }, item))) }), _jsxs("div", { className: "mt-4 rounded-2xl border border-emergency/15 bg-[#FFF4F2] p-4", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-emergency/80", children: t('Public emergency mode', 'Mode urgence public', 'وضع الطوارئ العام') }), _jsx("p", { className: "mt-2 text-sm leading-6 text-navy/75", children: t('A fast life-saving preview without exposing the full protected record.', 'Un apercu vital rapide sans exposer le dossier complet protege.', 'عرض سريع للمعلومات المنقذة للحياة بدون كشف الملفات الخاصة أو السجل الكامل.') })] })] }), _jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [_jsxs("div", { className: "rounded-[1.4rem] border border-white/10 bg-white/5 p-4", children: [_jsx(Phone, { className: "h-5 w-5 text-powder" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-white", children: "OTP" }), _jsx("p", { className: "mt-2 text-sm leading-6 text-white/70", children: t('Phone verification before opening the private dashboard or editing the profile.', 'Verification telephone avant ouverture du tableau de bord prive ou modification du profil.', 'التحقق عبر الهاتف قبل فتح لوحة المريض أو تعديل الملف.') })] }), _jsxs("div", { className: "rounded-[1.4rem] border border-white/10 bg-white/5 p-4", children: [_jsx(Languages, { className: "h-5 w-5 text-powder" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-white", children: "EN / FR / AR" }), _jsx("p", { className: "mt-2 text-sm leading-6 text-white/70", children: t('English, French, and Arabic are designed for a clear mobile-first presentation.', 'Le francais, l\'anglais et l\'arabe sont concus pour une presentation mobile claire.', 'دعم كامل للعربية والإنجليزية والفرنسية مع تجربة واضحة على الهاتف.') })] })] })] }) })] }) })] }), _jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20", children: _jsxs("div", { className: "grid gap-5 lg:grid-cols-[0.95fr_1.05fr]", children: [_jsxs("div", { className: `rounded-[2rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75", children: t('Demo priority', 'Priorite demo', 'أولوية العرض') }), _jsx("h2", { className: "mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl", children: content.statTitle }), _jsx("p", { className: "mt-4 text-base leading-7 text-navy/72", children: content.statBody })] }), _jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: content.highlights.map((item) => (_jsxs("div", { className: `rounded-[1.75rem] border border-sapphire/15 bg-powder/30 p-5 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsx("p", { className: "text-lg font-semibold text-navy", children: item.title }), _jsx("p", { className: "mt-3 text-sm leading-6 text-navy/72", children: item.body })] }, item.title))) })] }) }), _jsx("section", { className: "border-y border-sapphire/15 bg-white/75", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20", children: _jsxs("div", { className: `flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsxs("div", { className: "max-w-2xl", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75", children: t('User journey', 'Parcours utilisateur', 'تجربة المستخدم') }), _jsx("h2", { className: "mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl", children: content.stepsTitle })] }), _jsx("div", { className: "grid max-w-3xl gap-4 lg:grid-cols-3", children: content.steps.map((step, index) => (_jsxs("div", { className: "rounded-[1.75rem] border border-sapphire/15 bg-slate-50 p-5", children: [_jsxs("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-sapphire", children: ["0", index + 1] }), _jsx("h3", { className: "mt-3 text-xl font-semibold text-navy", children: step.title }), _jsx("p", { className: "mt-3 text-sm leading-6 text-navy/72", children: step.body })] }, step.title))) })] }) }) }), _jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20", children: _jsxs("div", { className: "grid gap-5 lg:grid-cols-[1.05fr_0.95fr]", children: [_jsxs("div", { className: `rounded-[2rem] bg-navy p-6 text-white shadow-panel sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-powder/80", children: t('Card acquisition', 'Acquisition de la carte', 'الحصول على البطاقة') }), _jsx("h2", { className: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl", children: content.supportTitle }), _jsx("p", { className: "mt-4 max-w-2xl text-base leading-7 text-white/75", children: content.supportBody }), _jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [_jsxs(Link, { to: "/checkout", className: "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100", children: [_jsx(Phone, { className: "h-4 w-4" }), content.supportPrimary] }), _jsxs(Link, { to: "/register", className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15", children: [_jsx(ArrowRight, { className: `h-4 w-4 ${isArabic ? 'rotate-180' : ''}` }), content.supportSecondary] })] })] }), _jsxs("div", { className: `rounded-[2rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-sapphire/75", children: t('Urgent-first design', 'Conception orientee urgence', 'مسار الطوارئ أولاً') }), _jsx("div", { className: "mt-5 space-y-4", children: [
                                        t('A prominent urgent button is visible above the fold.', 'Un bouton urgent proeminent est visible des le premier ecran.', 'زر طوارئ ظاهر مباشرة فوق الطية الأولى.'),
                                        t('Public emergency information is separated from the private account flow.', 'Les informations publiques d\'urgence sont separees du parcours compte prive.', 'المعلومات العامة منفصلة عن الحساب والملفات الخاصة.'),
                                        t('The layout is tuned for mobile first, then scales to larger screens.', 'La mise en page est optimisee mobile d\'abord puis s\'adapte aux grands ecrans.', 'الواجهة تستجيب بسلاسة على الهاتف قبل الشاشات الكبيرة.')
                                    ].map((item) => (_jsx("div", { className: "rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-navy/78", children: item }, item))) })] })] }) })] }));
}
