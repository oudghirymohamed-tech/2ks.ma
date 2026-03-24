import { AlertCircle, ArrowRight, BadgeCheck, LockKeyhole, Smartphone, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { onboardDoctor, requestOtp, verifyOtp } from '../services/api';

const professionalCards = [
    { title: 'Level 0', body: 'Visible at first scan: blood type, allergies, emergency instructions, and contact.', Icon: UserCheck },
    { title: 'Level 1', body: 'Unlocked after OTP verification with traceability and access history.', Icon: BadgeCheck },
    { title: 'Hardening', body: 'Ready for future stronger verification modes beyond beta.', Icon: Smartphone }
];

export function ProfessionalLandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const [form, setForm] = useState({
        fullName: '',
        phone: '',
        email: '',
        profession: '',
        licenseRegion: ''
    });
    const [otpId, setOtpId] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleRequestOtp() {
        setError('');
        setStatus('');
        setIsSubmitting(true);

        try {
            const response = await requestOtp(form.phone, form.phone, 'doctor-onboarding');
            setOtpId(response.otpId);
            setStatus(`OTP sent${response.debugCode ? ` (${response.debugCode})` : ''}`);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'OTP request failed');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleSubmitOnboarding() {
        setError('');
        setStatus('');
        setIsSubmitting(true);

        try {
            if (!otpId || otpCode.length !== 6) {
                throw new Error('Verify OTP before submitting onboarding.');
            }

            await verifyOtp(otpId, otpCode);
            const result = await onboardDoctor({ ...form, otpId });
            setStatus(`Onboarding submitted: ${result.status}`);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Onboarding failed');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <MarketingLayout>
            <PageMeta
                title="2ks | Doctor onboarding"
                description="Doctor onboarding flow with OTP verification and separate professional registration."
            />
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                            {isArabic ? 'مسار الأطباء' : 'Professional experience'}
                        </p>
                        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
                            {isArabic ? 'تهيئة منفصلة للأطباء ضمن نسخة بيتا.' : 'Separate onboarding flow for doctors in beta.'}
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            {isArabic
                                ? 'الطبيب يمر عبر تحقق OTP ثم يرسل بياناته المهنية للمراجعة.'
                                : 'Doctors complete OTP verification, then submit professional onboarding for review.'}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/pro/dashboard" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                {isArabic ? 'لوحة الطبيب' : 'Open pro dashboard'}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/u/demo-token" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700">
                                {isArabic ? 'اختبار المسح العام' : 'Test public scan'}
                                <LockKeyhole className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                                {isArabic ? 'نموذج تهيئة الطبيب' : 'Doctor onboarding form'}
                            </p>
                            <div className="mt-4 grid gap-3">
                                {[
                                    ['fullName', isArabic ? 'الاسم الكامل' : 'Full name'],
                                    ['phone', isArabic ? 'الهاتف' : 'Phone'],
                                    ['email', isArabic ? 'البريد الإلكتروني' : 'Email'],
                                    ['profession', isArabic ? 'التخصص' : 'Profession'],
                                    ['licenseRegion', isArabic ? 'منطقة الترخيص' : 'License region']
                                ].map(([key, label]) => (
                                    <label key={key} className="block">
                                        <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
                                        <input
                                            value={form[key as keyof typeof form]}
                                            onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                                        />
                                    </label>
                                ))}
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                                <button
                                    type="button"
                                    onClick={handleRequestOtp}
                                    disabled={isSubmitting}
                                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                                >
                                    {isArabic ? 'إرسال OTP' : 'Send OTP'}
                                </button>
                                <input
                                    value={otpCode}
                                    onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="123456"
                                    className="rounded-2xl border border-slate-200 px-4 py-3 text-center tracking-[0.25em] outline-none transition focus:border-slate-900"
                                />
                                <button
                                    type="button"
                                    onClick={handleSubmitOnboarding}
                                    disabled={isSubmitting}
                                    className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                                >
                                    {isArabic ? 'إرسال' : 'Submit'}
                                </button>
                            </div>

                            {status ? <p className="mt-3 text-sm font-semibold text-call">{status}</p> : null}
                            {error ? (
                                <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emergency">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-panel">
                        <div className="grid gap-4">
                            {professionalCards.map(({ title, body, Icon }) => (
                                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <div className="inline-flex rounded-2xl bg-white/10 p-3">
                                        <Icon className="h-5 w-5 text-emerald-300" />
                                    </div>
                                    <p className="mt-4 text-lg font-semibold">{title}</p>
                                    <p className="mt-2 text-sm leading-7 text-white/65">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
