import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

type StepKey = 'card' | 'personal' | 'account' | 'review' | 'success';

const registrationCopy = {
    en: {
        metaTitle: 'Create your smart medical identity',
        metaDescription: 'Try the HayatID registration experience in demo mode without a physical card.',
        badge: 'Demo registration',
        title: 'Create your smart medical identity',
        intro: 'Try the HayatID registration experience in demo mode without a physical card.',
        note: 'This is a demonstration experience. No real card is required.',
        active: 'Active step',
        done: 'Completed',
        pending: 'Upcoming',
        back: 'Back',
        next: 'Continue',
        finish: 'Create demo account',
        loading: 'Processing...',
        cardStepTitle: 'Verify Card',
        cardStepBody: 'Use the button below to simulate successful card verification and continue to the next step.',
        verifyCard: 'Verify Card',
        cardVerified: 'Demo card verified successfully',
        personalStepTitle: 'Personal Information',
        accountStepTitle: 'Account Setup',
        reviewStepTitle: 'Review / Confirmation',
        reviewHint: 'Please confirm your details before creating your demo account.',
        successStepTitle: 'Success',
        fullName: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        editHint: 'Use Back if you need to edit any information.',
        accountSuccess: 'Demo account created successfully',
        mismatch: 'Password and confirmation must match.',
        invalid: 'Please complete all required fields correctly.',
        invalidEmail: 'Please enter a valid email address.',
        invalidPhone: 'Please enter a valid phone number.',
        openDemo: 'Open demo hub',
        stepTitles: ['Verify card', 'Personal information', 'Account setup', 'Review', 'Success'] as string[]
    },
    fr: {
        metaTitle: 'Creez votre identite medicale intelligente',
        metaDescription: 'Essayez l experience d inscription HayatID en mode demo sans carte physique.',
        badge: 'Inscription demo',
        title: 'Creez votre identite medicale intelligente',
        intro: 'Essayez l experience d inscription HayatID en mode demo sans carte physique.',
        note: 'Ceci est une experience de demonstration. Aucune carte reelle n est requise.',
        active: 'Etape active',
        done: 'Terminee',
        pending: 'A venir',
        back: 'Retour',
        next: 'Continuer',
        finish: 'Creer un compte demo',
        loading: 'Traitement...',
        cardStepTitle: 'Verifier la carte',
        cardStepBody: 'Utilisez le bouton ci-dessous pour simuler une verification reussie puis continuer.',
        verifyCard: 'Verifier la carte',
        cardVerified: 'Carte demo verifiee avec succes',
        personalStepTitle: 'Informations personnelles',
        accountStepTitle: 'Configuration du compte',
        reviewStepTitle: 'Revue / Confirmation',
        reviewHint: 'Veuillez confirmer vos informations avant de creer le compte demo.',
        successStepTitle: 'Succes',
        fullName: 'Nom complet',
        phone: 'Numero de telephone',
        email: 'Adresse email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        editHint: 'Utilisez Retour si vous voulez modifier des informations.',
        accountSuccess: 'Compte demo cree avec succes',
        mismatch: 'Le mot de passe et la confirmation doivent correspondre.',
        invalid: 'Veuillez remplir correctement tous les champs obligatoires.',
        invalidEmail: 'Veuillez saisir une adresse email valide.',
        invalidPhone: 'Veuillez saisir un numero de telephone valide.',
        openDemo: 'Ouvrir le hub demo',
        stepTitles: ['Verification carte', 'Informations personnelles', 'Configuration compte', 'Revue', 'Succes'] as string[]
    },
    ar: {
        metaTitle: 'انشئ هويتك الطبية الذكية',
        metaDescription: 'جرب تجربة التسجيل في HayatID بوضع العرض دون الحاجة الى بطاقة فعلية.',
        badge: 'تسجيل تجريبي',
        title: 'انشئ هويتك الطبية الذكية',
        intro: 'جرب تجربة التسجيل في HayatID بوضع العرض دون الحاجة الى بطاقة فعلية.',
        note: 'هذه تجربة عرض توضيحية. لا حاجة الى بطاقة حقيقية.',
        active: 'الخطوة الحالية',
        done: 'مكتملة',
        pending: 'قادمة',
        back: 'رجوع',
        next: 'متابعة',
        finish: 'انشاء حساب تجريبي',
        loading: 'جار المعالجة...',
        cardStepTitle: 'التحقق من البطاقة',
        cardStepBody: 'استخدم الزر ادناه لمحاكاة تحقق ناجح من البطاقة ثم تابع.',
        verifyCard: 'تحقق من البطاقة',
        cardVerified: 'تم التحقق من البطاقة التجريبية بنجاح',
        personalStepTitle: 'المعلومات الشخصية',
        accountStepTitle: 'اعداد الحساب',
        reviewStepTitle: 'المراجعة / التأكيد',
        reviewHint: 'يرجى تأكيد البيانات قبل انشاء الحساب التجريبي.',
        successStepTitle: 'نجاح',
        fullName: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        email: 'البريد الالكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        editHint: 'استخدم زر الرجوع اذا كنت تريد تعديل اي بيانات.',
        accountSuccess: 'تم انشاء الحساب التجريبي بنجاح',
        mismatch: 'يجب ان تتطابق كلمة المرور مع التأكيد.',
        invalid: 'يرجى اكمال جميع الحقول المطلوبة بشكل صحيح.',
        invalidEmail: 'يرجى ادخال بريد الكتروني صحيح.',
        invalidPhone: 'يرجى ادخال رقم هاتف صحيح.',
        openDemo: 'فتح مركز العرض',
        stepTitles: ['التحقق من البطاقة', 'المعلومات الشخصية', 'اعداد الحساب', 'المراجعة', 'نجاح'] as string[]
    }
} as const;

export function RegistrationPage() {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const isArabic = language === 'ar';
    const copy = registrationCopy[language === 'fr' ? 'fr' : isArabic ? 'ar' : 'en'];

    const isDemoMode = true;
    const steps: StepKey[] = ['card', 'personal', 'account', 'review', 'success'];

    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCardVerified, setIsCardVerified] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [form, setForm] = useState({
        fullName: isArabic ? 'مستخدم تجريبي' : 'Demo User',
        phone: '+212600112233',
        email: 'demo@hayatid.info',
        password: 'Password123',
        confirmPassword: 'Password123'
    });

    const currentStep = steps[step];
    const canGoBack = step > 0;
    const canAdvance = step < steps.length - 1;

    const canLeaveCardStep = isCardVerified;
    const canLeavePersonalStep =
        form.fullName.trim().length > 2 &&
        /^\+?[0-9\s-]{7,}$/.test(form.phone.trim()) &&
        form.email.includes('@');
    const canLeaveAccountStep = form.password.length >= 6 && form.confirmPassword.length >= 6;

    const canGoNext =
        (currentStep === 'card' && canLeaveCardStep) ||
        (currentStep === 'personal' && canLeavePersonalStep) ||
        (currentStep === 'account' && canLeaveAccountStep);
    const canFinish = currentStep === 'review';

    function validateCurrentStep() {
        if (currentStep === 'personal') {
            if (form.fullName.trim().length <= 2 || form.phone.trim().length <= 6 || form.email.trim().length <= 3) {
                setErrorMessage(copy.invalid);
                return false;
            }

            if (!/^\+?[0-9\s-]{7,}$/.test(form.phone.trim())) {
                setErrorMessage(copy.invalidPhone);
                return false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
                setErrorMessage(copy.invalidEmail);
                return false;
            }
        }

        if (currentStep === 'account') {
            if (!canLeaveAccountStep) {
                setErrorMessage(copy.invalid);
                return false;
            }

            if (form.password !== form.confirmPassword) {
                setErrorMessage(copy.mismatch);
                return false;
            }
        }

        return true;
    }

    async function handleVerifyCard() {
        setErrorMessage('');
        setStatusMessage('');
        setIsSubmitting(true);

        try {
            if (isDemoMode) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setIsCardVerified(true);
                setStatusMessage(copy.cardVerified);
                setStep(1);
                return;
            }
        } catch {
            setErrorMessage(isArabic ? 'تعذر التحقق من البطاقة.' : 'Unable to verify card.');
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleNext() {
        setErrorMessage('');
        setStatusMessage('');

        if (!validateCurrentStep()) {
            return;
        }

        if (canGoNext) {
            setStep((current) => Math.min(steps.length - 1, current + 1));
        }
    }

    async function handleCreateDemoAccount() {
        if (!canFinish) {
            setErrorMessage(copy.invalid);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setErrorMessage(copy.mismatch);
            return;
        }

        setErrorMessage('');
        setStatusMessage('');
        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            setStatusMessage(copy.accountSuccess);
            setStep(4);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <MarketingLayout>
            <PageMeta title={copy.metaTitle} description={copy.metaDescription} />

            <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
                    <div className={`rounded-[2rem] bg-navy p-7 text-white shadow-panel ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">{copy.badge}</p>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{copy.title}</h1>
                        <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">{copy.intro}</p>
                        <p className="mt-4 rounded-2xl border border-emerald-200/25 bg-emerald-200/10 px-4 py-3 text-sm text-emerald-100">{copy.note}</p>

                        <div className="mt-7 space-y-3">
                            {copy.stepTitles.map((title, index) => (
                                <div key={title} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${index <= step ? 'bg-emerald-300 text-navy' : 'bg-white/10 text-white/60'}`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{title}</p>
                                        <p className="text-xs text-white/65">
                                            {index === step ? copy.active : index < step ? copy.done : copy.pending}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`premium-card p-6 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <div className="mb-7 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sapphire">
                                    {isArabic ? `الخطوة ${step + 1}` : `Step ${step + 1}`}
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-navy">{copy.stepTitles[step]}</h2>
                            </div>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sapphire/70">
                                {isDemoMode ? 'Demo Mode' : 'Live'}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                className="space-y-5"
                            >
                                {currentStep === 'card' ? (
                                    <div className="rounded-3xl border border-sapphire/20 bg-powder/20 p-5 shadow-sm">
                                        <p className="text-lg font-semibold text-navy">{copy.cardStepTitle}</p>
                                        <p className="mt-2 text-sm leading-7 text-navy/72">{copy.cardStepBody}</p>
                                        <button
                                            type="button"
                                            onClick={handleVerifyCard}
                                            disabled={isSubmitting}
                                            className="premium-btn-primary mt-5 gap-2 rounded-2xl disabled:opacity-60"
                                        >
                                            <ShieldCheck className="h-4 w-4" />
                                            {isSubmitting ? copy.loading : copy.verifyCard}
                                        </button>
                                    </div>
                                ) : null}

                                {currentStep === 'personal' ? (
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-5 shadow-sm">
                                        <p className="text-lg font-semibold text-navy">{copy.personalStepTitle}</p>
                                        <div className="mt-4 grid gap-4">
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">{copy.fullName}</span>
                                                <input
                                                    value={form.fullName}
                                                    onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                                                    className="premium-input"
                                                />
                                            </label>

                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">{copy.phone}</span>
                                                <input
                                                    value={form.phone}
                                                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                                                    className="premium-input"
                                                />
                                            </label>

                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">{copy.email}</span>
                                                <input
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                                                    className="premium-input"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : null}

                                {currentStep === 'account' ? (
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-5 shadow-sm">
                                        <p className="text-lg font-semibold text-navy">{copy.accountStepTitle}</p>
                                        <div className="mt-4 grid gap-4">
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">{copy.password}</span>
                                                <input
                                                    type="password"
                                                    value={form.password}
                                                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                                                    className="premium-input"
                                                />
                                            </label>

                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">{copy.confirmPassword}</span>
                                                <input
                                                    type="password"
                                                    value={form.confirmPassword}
                                                    onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                                                    className="premium-input"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : null}

                                {currentStep === 'review' ? (
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-5 shadow-sm">
                                        <p className="text-lg font-semibold text-navy">{copy.reviewStepTitle}</p>
                                        <p className="mt-2 text-sm leading-7 text-navy/72">{copy.reviewHint}</p>
                                        <div className="mt-4 grid gap-3 rounded-2xl border border-sapphire/15 bg-white p-4">
                                            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 text-sm">
                                                <span className="font-medium text-navy/70">{copy.fullName}</span>
                                                <span className="font-semibold text-navy">{form.fullName}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 text-sm">
                                                <span className="font-medium text-navy/70">{copy.phone}</span>
                                                <span className="font-semibold text-navy">{form.phone}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 text-sm">
                                                <span className="font-medium text-navy/70">{copy.email}</span>
                                                <span className="font-semibold text-navy">{form.email}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-sm">
                                                <span className="font-medium text-navy/70">{copy.password}</span>
                                                <span className="font-semibold text-navy">{'*'.repeat(Math.min(form.password.length, 10))}</span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-sapphire/75">{copy.editHint}</p>
                                    </div>
                                ) : null}

                                {currentStep === 'success' ? (
                                    <div className="rounded-3xl border border-call/25 bg-call/10 p-5 shadow-sm">
                                        <p className="text-lg font-semibold text-call">{copy.successStepTitle}</p>
                                        <p className="mt-2 text-sm leading-7 text-call">{copy.accountSuccess}</p>
                                        <div className="mt-5 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/demo')}
                                                className="premium-btn-primary gap-2"
                                            >
                                                <CreditCard className="h-4 w-4" />
                                                {copy.openDemo}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </motion.div>
                        </AnimatePresence>

                        {statusMessage ? (
                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-call/30 bg-call/10 px-4 py-2 text-sm font-semibold text-call">
                                <CheckCircle2 className="h-4 w-4" />
                                {statusMessage}
                            </div>
                        ) : null}

                        {errorMessage ? (
                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-4 py-2 text-sm font-semibold text-emergency">
                                <AlertCircle className="h-4 w-4" />
                                {errorMessage}
                            </div>
                        ) : null}

                        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setStep((current) => Math.max(0, current - 1))}
                                disabled={!canGoBack || isSubmitting || currentStep === 'success'}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                {copy.back}
                            </button>

                            {canAdvance && currentStep !== 'review' ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!canGoNext || isSubmitting}
                                    className="premium-btn-primary gap-2 bg-navy disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {copy.next}
                                    <ChevronRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </button>
                            ) : currentStep === 'review' ? (
                                <button
                                    type="button"
                                    onClick={handleCreateDemoAccount}
                                    disabled={!canFinish || isSubmitting}
                                    className="inline-flex items-center gap-2 rounded-full bg-call px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#166D2F] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? copy.loading : copy.finish}
                                    <CheckCircle2 className="h-4 w-4" />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
