import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, CreditCard, Phone, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { registerPatient, requestOtp, verifyCard, verifyOtp } from '../services/api';
const WHATSAPP_URL = 'https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20commander%20une%20carte%20NFC%202KS';
const PHONE_URL = 'tel:+212600000000';
const registrationCopy = {
    en: {
        metaTitle: '2ks | Patient registration',
        metaDescription: 'NFC-card-first patient onboarding with OTP and emergency profile setup.',
        badge: 'Patient onboarding',
        title: 'Create your 2ks emergency profile.',
        intro: 'Patients must activate an NFC card before account creation. OTP verification is mandatory before registration completion.',
        active: 'Active step',
        done: 'Completed',
        pending: 'Upcoming',
        secureLabel: 'Beta registration',
        back: 'Back',
        next: 'Next',
        finish: 'Create account',
        loading: 'Processing...',
        accountBlocked: 'Account creation requires card activation, OTP verification, and consent.',
        cardStepTitle: 'Activate NFC card first',
        cardStepBody: 'Use your card serial and activation code to unlock registration.',
        serial: 'Card serial',
        activationCode: 'Activation code',
        verifyCard: 'Verify card',
        cardVerified: 'Card verified. You can continue registration.',
        cardNotVerified: 'Card verification is required.',
        orderCard: 'Order NFC card',
        supportTitle: 'Need help obtaining the card?',
        supportBody: 'You can order online or contact support before creating your account.',
        whatsapp: 'Contact on WhatsApp',
        call: 'Call support',
        identityTitle: 'Identity and OTP verification',
        fullName: 'Full name',
        city: 'City',
        age: 'Age',
        phone: 'Phone number',
        emergencyName: 'Emergency contact name',
        emergencyRelation: 'Emergency contact relation',
        password: 'Password',
        requestOtp: 'Send OTP',
        verifyOtp: 'Verify OTP',
        otpCode: 'OTP code',
        otpSent: 'OTP sent successfully.',
        otpVerified: 'Phone verified successfully.',
        medicalTitle: 'Emergency medical details',
        bloodType: 'Blood type',
        allergies: 'Allergies',
        conditions: 'Chronic conditions',
        medications: 'Medications',
        instructions: 'Emergency instructions',
        consentTitle: 'Consent and readiness',
        consentA: 'I understand emergency and private access are separated by backend authorization.',
        consentB: 'I agree to continue profile completion after account creation when needed.',
        previewTitle: 'Emergency preview',
        previewSubtitle: 'Generated from your form',
        bloodTypeBadge: 'Blood type',
        allergiesBadge: 'Allergies',
        contactBadge: 'Emergency contact',
        stepTitles: ['Activate card', 'Identity + OTP', 'Medical details', 'Consent']
    },
    ar: {
        metaTitle: '2ks | تسجيل المريض',
        metaDescription: 'مسار تسجيل يبدأ بتفعيل بطاقة NFC ثم التحقق عبر OTP ثم إنشاء الحساب.',
        badge: 'تهيئة المريض',
        title: 'أنشئ ملف الطوارئ الخاص بك في 2ks.',
        intro: 'يجب تفعيل بطاقة NFC أولاً قبل إنشاء الحساب. التحقق عبر OTP إلزامي قبل إكمال التسجيل.',
        active: 'الخطوة الحالية',
        done: 'مكتملة',
        pending: 'قادمة',
        secureLabel: 'تسجيل نسخة بيتا',
        back: 'رجوع',
        next: 'التالي',
        finish: 'إنشاء الحساب',
        loading: 'جارٍ المعالجة...',
        accountBlocked: 'إنشاء الحساب يتطلب تفعيل البطاقة والتحقق عبر OTP والموافقة.',
        cardStepTitle: 'فعّل بطاقة NFC أولاً',
        cardStepBody: 'أدخل الرقم التسلسلي ورمز التفعيل لفتح التسجيل.',
        serial: 'الرقم التسلسلي للبطاقة',
        activationCode: 'رمز التفعيل',
        verifyCard: 'تحقق من البطاقة',
        cardVerified: 'تم التحقق من البطاقة ويمكنك متابعة التسجيل.',
        cardNotVerified: 'التحقق من البطاقة إلزامي.',
        orderCard: 'طلب بطاقة NFC',
        supportTitle: 'تحتاج مساعدة للحصول على البطاقة؟',
        supportBody: 'يمكنك الطلب عبر الإنترنت أو التواصل مع الدعم قبل إنشاء الحساب.',
        whatsapp: 'تواصل عبر واتساب',
        call: 'اتصل بالدعم',
        identityTitle: 'الهوية والتحقق عبر OTP',
        fullName: 'الاسم الكامل',
        city: 'المدينة',
        age: 'العمر',
        phone: 'رقم الهاتف',
        emergencyName: 'اسم جهة اتصال الطوارئ',
        emergencyRelation: 'صلة القرابة',
        password: 'كلمة المرور',
        requestOtp: 'إرسال OTP',
        verifyOtp: 'تحقق من OTP',
        otpCode: 'رمز OTP',
        otpSent: 'تم إرسال رمز OTP بنجاح.',
        otpVerified: 'تم التحقق من الهاتف بنجاح.',
        medicalTitle: 'معلومات الطوارئ الطبية',
        bloodType: 'فصيلة الدم',
        allergies: 'الحساسية',
        conditions: 'الأمراض المزمنة',
        medications: 'الأدوية',
        instructions: 'تعليمات الطوارئ',
        consentTitle: 'الموافقة والاستعداد',
        consentA: 'أفهم أن الوصول للطوارئ منفصل عن الوصول الخاص عبر صلاحيات الخلفية.',
        consentB: 'أوافق على استكمال باقي الملف بعد إنشاء الحساب عند الحاجة.',
        previewTitle: 'معاينة الطوارئ',
        previewSubtitle: 'تم إنشاؤها من بياناتك',
        bloodTypeBadge: 'فصيلة الدم',
        allergiesBadge: 'الحساسية',
        contactBadge: 'جهة اتصال الطوارئ',
        stepTitles: ['تفعيل البطاقة', 'الهوية + OTP', 'المعلومات الطبية', 'الموافقة']
    }
};
export function RegistrationPage() {
    const { language } = useLanguage();
    const { setSession } = useAuth();
    const navigate = useNavigate();
    const isArabic = language === 'ar';
    const copy = registrationCopy[isArabic ? 'ar' : 'en'];
    const stepKeys = ['card', 'identity', 'medical', 'consent'];
    const [step, setStep] = useState(0);
    const [cardId, setCardId] = useState('');
    const [otpId, setOtpId] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [isCardVerified, setIsCardVerified] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        serial: '2KS-BETA-NEW',
        activationCode: 'ACT-2026',
        fullName: isArabic ? 'مريض جديد' : 'New Patient',
        city: isArabic ? 'مراكش' : 'Marrakech',
        age: '30',
        phone: '+212600112233',
        emergencyContactName: isArabic ? 'جهة اتصال' : 'Emergency Contact',
        emergencyContactRelation: isArabic ? 'قريب' : 'Relative',
        password: 'Password123',
        bloodType: 'O+',
        allergies: isArabic ? 'البنسلين' : 'Penicillin',
        conditions: isArabic ? 'لا يوجد' : 'None',
        medications: isArabic ? 'لا يوجد' : 'None',
        instructions: isArabic ? 'الاتصال بالإسعاف فوراً' : 'Call emergency services immediately.',
        consent: true,
        later: true
    });
    const previewAllergies = useMemo(() => form.allergies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean), [form.allergies]);
    const currentStep = stepKeys[step];
    const canAdvance = step < stepKeys.length - 1;
    const canGoBack = step > 0;
    const canLeaveCardStep = isCardVerified;
    const canLeaveIdentityStep = form.fullName.trim().length >= 3 && form.city.trim().length >= 2 && isPhoneVerified && otpId.length > 0;
    const canLeaveMedicalStep = form.bloodType.trim().length > 0;
    const canLeaveConsentStep = form.consent;
    const canGoNext = (currentStep === 'card' && canLeaveCardStep) ||
        (currentStep === 'identity' && canLeaveIdentityStep) ||
        (currentStep === 'medical' && canLeaveMedicalStep);
    const canFinishRegistration = currentStep === 'consent' && isCardVerified && isPhoneVerified && canLeaveConsentStep && cardId && otpId;
    function readApiError(error) {
        if (error && typeof error === 'object' && 'message' in error) {
            return String(error.message);
        }
        return isArabic ? 'حدث خطأ غير متوقع.' : 'Unexpected error occurred.';
    }
    async function handleVerifyCard() {
        setErrorMessage('');
        setStatusMessage('');
        setIsSubmitting(true);
        try {
            const result = await verifyCard(form.serial, form.activationCode);
            setCardId(result.cardId);
            setIsCardVerified(true);
            setStatusMessage(copy.cardVerified);
        }
        catch (error) {
            setIsCardVerified(false);
            setErrorMessage(readApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    async function handleRequestOtp() {
        setErrorMessage('');
        setStatusMessage('');
        setIsSubmitting(true);
        try {
            const result = await requestOtp(form.phone, form.phone, 'patient-registration');
            setOtpId(result.otpId);
            setStatusMessage(`${copy.otpSent}${result.debugCode ? ` (${result.debugCode})` : ''}`);
        }
        catch (error) {
            setErrorMessage(readApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    async function handleVerifyOtp() {
        if (!otpId || otpCode.length !== 6) {
            setErrorMessage(isArabic ? 'أدخل رمز OTP مكون من 6 أرقام.' : 'Enter a 6 digit OTP code.');
            return;
        }
        setErrorMessage('');
        setStatusMessage('');
        setIsSubmitting(true);
        try {
            await verifyOtp(otpId, otpCode);
            setIsPhoneVerified(true);
            setStatusMessage(copy.otpVerified);
        }
        catch (error) {
            setIsPhoneVerified(false);
            setErrorMessage(readApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    async function handleCreateAccount() {
        if (!canFinishRegistration) {
            return;
        }
        setErrorMessage('');
        setStatusMessage('');
        setIsSubmitting(true);
        try {
            const result = await registerPatient({
                cardId,
                otpId,
                fullName: form.fullName,
                city: form.city,
                language: isArabic ? 'ar' : 'en',
                age: Number(form.age) || 30,
                isMinor: Number(form.age) < 18,
                phone: form.phone,
                emergencyContactName: form.emergencyContactName,
                emergencyContactRelation: form.emergencyContactRelation,
                password: form.password,
                bloodType: form.bloodType,
                allergies: form.allergies,
                chronicConditions: form.conditions,
                medications: form.medications,
                emergencyInstructions: form.instructions
            });
            setSession(result.token, result.user);
            navigate('/dashboard');
        }
        catch (error) {
            setErrorMessage(readApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsxs(MarketingLayout, { children: [_jsx(PageMeta, { title: copy.metaTitle, description: copy.metaDescription }), _jsx("section", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14", children: _jsxs("div", { className: "grid gap-8 lg:grid-cols-[0.86fr_1.14fr]", children: [_jsxs("div", { className: `rounded-[2rem] bg-navy p-7 text-white shadow-panel ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200", children: copy.badge }), _jsx("h1", { className: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl", children: copy.title }), _jsx("p", { className: "mt-4 text-sm leading-7 text-white/75 sm:text-base", children: copy.intro }), _jsx("div", { className: "mt-7 space-y-3", children: copy.stepTitles.map((title, index) => (_jsxs("div", { className: "flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4", children: [_jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${index <= step ? 'bg-emerald-300 text-navy' : 'bg-white/10 text-white/60'}`, children: index + 1 }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: title }), _jsx("p", { className: "text-xs text-white/65", children: index === step ? copy.active : index < step ? copy.done : copy.pending })] })] }, title))) })] }), _jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.06fr_0.94fr]", children: [_jsxs("div", { className: `rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsxs("div", { className: "mb-7 flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-sapphire", children: isArabic ? `الخطوة ${step + 1}` : `Step ${step + 1}` }), _jsx("h2", { className: "mt-2 text-2xl font-semibold text-navy", children: copy.stepTitles[step] })] }), _jsx("div", { className: "text-sm text-navy/55", children: copy.secureLabel })] }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, className: "space-y-5", children: [currentStep === 'card' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "rounded-3xl border border-sapphire/20 bg-powder/20 p-5", children: [_jsx("p", { className: "text-lg font-semibold text-navy", children: copy.cardStepTitle }), _jsx("p", { className: "mt-2 text-sm leading-7 text-navy/72", children: copy.cardStepBody }), _jsxs("div", { className: "mt-4 grid gap-4", children: [_jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.serial }), _jsx("input", { value: form.serial, onChange: (event) => setForm({ ...form, serial: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.activationCode }), _jsx("input", { value: form.activationCode, onChange: (event) => setForm({ ...form, activationCode: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("button", { type: "button", onClick: handleVerifyCard, disabled: isSubmitting, className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-sapphire px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0] disabled:opacity-60", children: [_jsx(ShieldCheck, { className: "h-4 w-4" }), isSubmitting ? copy.loading : copy.verifyCard] })] }), _jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: _jsxs(Link, { to: "/checkout", className: "inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-sapphire", children: [_jsx(CreditCard, { className: "h-4 w-4" }), copy.orderCard] }) })] }), _jsxs("div", { className: "rounded-3xl border border-slate-200 bg-canvas p-5", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-sapphire/80", children: copy.supportTitle }), _jsx("p", { className: "mt-2 text-sm leading-7 text-navy/72", children: copy.supportBody }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-3", children: [_jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-full bg-call px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#156E2F]", children: [_jsx(Phone, { className: "h-4 w-4" }), copy.whatsapp] }), _jsxs("a", { href: PHONE_URL, className: "inline-flex items-center gap-2 rounded-full border border-sapphire/25 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-sapphire", children: [_jsx(Phone, { className: "h-4 w-4 text-sapphire" }), copy.call] })] })] })] })) : null, currentStep === 'identity' ? (_jsx(_Fragment, { children: _jsxs("div", { className: "rounded-3xl border border-slate-200 bg-canvas p-5", children: [_jsx("p", { className: "text-lg font-semibold text-navy", children: copy.identityTitle }), _jsxs("div", { className: "mt-4 grid gap-4", children: [_jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.fullName }), _jsx("input", { value: form.fullName, onChange: (event) => setForm({ ...form, fullName: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.city }), _jsx("input", { value: form.city, onChange: (event) => setForm({ ...form, city: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.age }), _jsx("input", { inputMode: "numeric", value: form.age, onChange: (event) => setForm({ ...form, age: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.phone }), _jsx("input", { value: form.phone, onChange: (event) => setForm({ ...form, phone: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.emergencyName }), _jsx("input", { value: form.emergencyContactName, onChange: (event) => setForm({ ...form, emergencyContactName: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.emergencyRelation }), _jsx("input", { value: form.emergencyContactRelation, onChange: (event) => setForm({ ...form, emergencyContactRelation: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.password }), _jsx("input", { type: "password", value: form.password, onChange: (event) => setForm({ ...form, password: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] })] }), _jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-[1fr_auto]", children: [_jsx("button", { type: "button", onClick: handleRequestOtp, disabled: isSubmitting, className: "rounded-2xl border border-sapphire/25 bg-white px-4 py-3 text-sm font-semibold text-sapphire transition hover:bg-sapphire/10 disabled:opacity-60", children: copy.requestOtp }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { value: otpCode, onChange: (event) => setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 6)), placeholder: "123456", className: "w-32 rounded-2xl border border-slate-200 px-3 py-3 text-center tracking-[0.25em] outline-none transition focus:border-slate-900" }), _jsx("button", { type: "button", onClick: handleVerifyOtp, disabled: isSubmitting || !otpId, className: "rounded-2xl bg-call px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166D2F] disabled:opacity-60", children: copy.verifyOtp })] })] })] }) })) : null, currentStep === 'medical' ? (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-lg font-semibold text-navy", children: copy.medicalTitle }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.bloodType }), _jsx("input", { value: form.bloodType, onChange: (event) => setForm({ ...form, bloodType: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.allergies }), _jsx("textarea", { value: form.allergies, onChange: (event) => setForm({ ...form, allergies: event.target.value }), rows: 3, className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.conditions }), _jsx("textarea", { value: form.conditions, onChange: (event) => setForm({ ...form, conditions: event.target.value }), rows: 2, className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.medications }), _jsx("textarea", { value: form.medications, onChange: (event) => setForm({ ...form, medications: event.target.value }), rows: 2, className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: copy.instructions }), _jsx("textarea", { value: form.instructions, onChange: (event) => setForm({ ...form, instructions: event.target.value }), rows: 2, className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] })] })) : null, currentStep === 'consent' ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-lg font-semibold text-navy", children: copy.consentTitle }), _jsxs("label", { className: "flex items-start gap-3 rounded-3xl border border-slate-200 bg-canvas p-5", children: [_jsx("input", { type: "checkbox", checked: form.consent, onChange: (event) => setForm({ ...form, consent: event.target.checked }), className: "mt-1 h-4 w-4" }), _jsx("span", { className: "text-sm leading-7 text-slate-700", children: copy.consentA })] }), _jsxs("label", { className: "flex items-start gap-3 rounded-3xl border border-slate-200 bg-canvas p-5", children: [_jsx("input", { type: "checkbox", checked: form.later, onChange: (event) => setForm({ ...form, later: event.target.checked }), className: "mt-1 h-4 w-4" }), _jsx("span", { className: "text-sm leading-7 text-slate-700", children: copy.consentB })] })] })) : null] }, currentStep) }), statusMessage ? (_jsxs("div", { className: "mt-5 inline-flex items-center gap-2 rounded-full border border-call/30 bg-call/10 px-4 py-2 text-sm font-semibold text-call", children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), statusMessage] })) : null, errorMessage ? (_jsxs("div", { className: "mt-5 inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-4 py-2 text-sm font-semibold text-emergency", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), errorMessage] })) : null, _jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-between gap-3", children: [_jsxs("button", { type: "button", onClick: () => setStep((current) => Math.max(0, current - 1)), disabled: !canGoBack, className: "inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40", children: [_jsx(ChevronLeft, { className: `h-4 w-4 ${isArabic ? 'rotate-180' : ''}` }), copy.back] }), canAdvance ? (_jsxs("button", { type: "button", onClick: () => canGoNext && setStep((current) => Math.min(stepKeys.length - 1, current + 1)), disabled: !canGoNext, className: "inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001A4A] disabled:cursor-not-allowed disabled:opacity-50", children: [copy.next, _jsx(ChevronRight, { className: `h-4 w-4 ${isArabic ? 'rotate-180' : ''}` })] })) : (_jsxs("button", { type: "button", onClick: handleCreateAccount, disabled: !canFinishRegistration || isSubmitting, className: "inline-flex items-center gap-2 rounded-full bg-call px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#166D2F] disabled:cursor-not-allowed disabled:opacity-50", children: [isSubmitting ? copy.loading : copy.finish, _jsx(CheckCircle2, { className: "h-4 w-4" })] }))] }), !canFinishRegistration && currentStep === 'consent' ? (_jsx("div", { className: "mt-4 rounded-2xl border border-emergency/30 bg-emergency/10 px-4 py-3 text-sm font-medium text-emergency", children: copy.accountBlocked })) : null] }), _jsxs("div", { className: `rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-navy p-3 text-white", children: _jsx(ShieldCheck, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: copy.previewTitle }), _jsx("p", { className: "text-lg font-semibold text-navy", children: copy.previewSubtitle })] })] }), _jsxs("div", { className: "mt-6 rounded-[2rem] bg-navy p-5 text-white", children: [_jsxs("div", { className: "rounded-3xl bg-emergency p-5", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-white/70", children: copy.bloodTypeBadge }), _jsx("p", { className: "mt-2 text-5xl font-semibold", children: form.bloodType })] }), _jsxs("div", { className: "mt-4 rounded-3xl bg-white/5 p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-white/55", children: copy.allergiesBadge }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: previewAllergies.map((allergy) => (_jsx("span", { className: "rounded-full bg-allergy px-3 py-1 text-sm font-semibold text-slate-950", children: allergy }, allergy))) })] }), _jsxs("div", { className: "mt-4 rounded-3xl bg-white/5 p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-white/55", children: copy.contactBadge }), _jsx("p", { className: "mt-2 text-base font-medium", children: form.phone })] })] })] })] })] }) })] }));
}
