import { AlertCircle, ArrowRight, Building2, Handshake, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { partnerOffers } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { onboardB2B } from '../services/api';

export function B2BPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const [form, setForm] = useState({
        organizationName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        organizationType: 'clinic' as 'clinic' | 'pharmacy' | 'other'
    });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit() {
        setError('');
        setStatus('');
        setIsSubmitting(true);

        try {
            const response = await onboardB2B(form);
            setStatus(`Onboarding submitted: ${response.status}`);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Submission failed');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <MarketingLayout>
            <PageMeta
                title="2ks | B2B onboarding"
                description="B2B onboarding flow for clinics and pharmacies with separate partner intake."
            />
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Partners / B2B</p>
                        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
                            {isArabic
                                ? 'تهيئة شركاء B2B منفصلة عن المرضى والأطباء.'
                                : 'Separate B2B onboarding for clinics and pharmacies.'}
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            {isArabic
                                ? 'يتم جمع بيانات المؤسسة وجهة الاتصال لإطلاق بيئة بيتا بشكل منظم.'
                                : 'Collect organization and contact information to activate beta onboarding cleanly.'}
                        </p>

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            {[
                                ['Adoption', 'Simple front-office activation for pilot teams.'],
                                ['Trust layer', 'Professional verification and access traceability.'],
                                ['Pilot-ready', 'Designed for staged regional rollout.'],
                                ['Narrative', 'Strong partner narrative for live demos.']
                            ].map(([title, body]) => (
                                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                    <p className="mt-4 font-semibold text-slate-950">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                                {isArabic ? 'نموذج تهيئة B2B' : 'B2B onboarding form'}
                            </p>
                            <div className="mt-4 grid gap-3">
                                {[
                                    ['organizationName', isArabic ? 'اسم المؤسسة' : 'Organization name'],
                                    ['contactName', isArabic ? 'اسم جهة الاتصال' : 'Contact name'],
                                    ['contactPhone', isArabic ? 'هاتف جهة الاتصال' : 'Contact phone'],
                                    ['contactEmail', isArabic ? 'البريد الإلكتروني' : 'Contact email']
                                ].map(([key, label]) => (
                                    <label key={key} className="block">
                                        <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
                                        <input
                                            value={form[key as keyof typeof form] as string}
                                            onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                                        />
                                    </label>
                                ))}
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-slate-700">
                                        {isArabic ? 'نوع المؤسسة' : 'Organization type'}
                                    </span>
                                    <select
                                        value={form.organizationType}
                                        onChange={(event) =>
                                            setForm({ ...form, organizationType: event.target.value as 'clinic' | 'pharmacy' | 'other' })
                                        }
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900"
                                    >
                                        <option value="clinic">{isArabic ? 'عيادة' : 'Clinic'}</option>
                                        <option value="pharmacy">{isArabic ? 'صيدلية' : 'Pharmacy'}</option>
                                        <option value="other">{isArabic ? 'أخرى' : 'Other'}</option>
                                    </select>
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                            >
                                {isSubmitting ? (isArabic ? 'جارٍ الإرسال...' : 'Submitting...') : (isArabic ? 'إرسال الطلب' : 'Submit onboarding')}
                            </button>
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
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-white/10 p-3">
                                <Handshake className="h-5 w-5 text-emerald-300" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Founder partner offer</p>
                                <p className="text-xl font-semibold">Book partnership discussion</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {['Pilot launch', 'Operational onboarding', 'Partner branding', 'Integration roadmap'].map((item) => (
                                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4">{item}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {partnerOffers.map((offer) => (
                        <div key={offer.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{offer.title}</p>
                            <p className="mt-4 text-4xl font-semibold text-slate-950">{offer.price}</p>
                            <p className="mt-3 text-base leading-7 text-slate-600">{offer.description}</p>
                            <div className="mt-5 space-y-3 text-sm text-slate-700">
                                {offer.bullets.map((bullet) => (
                                    <div key={bullet} className="inline-flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-emerald-600" />
                                        {bullet}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
                    <h2 className="text-2xl font-semibold text-slate-950">{isArabic ? 'الخطوة التالية' : 'Next step'}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                        {isArabic
                            ? 'ابدأ بمسار الطوارئ ثم فعّل مسار الشراكة عبر نموذج B2B.'
                            : 'Start with emergency flow demonstration, then activate partner onboarding through the B2B intake.'}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/demo" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                            {isArabic ? 'فتح مركز العرض' : 'Open demo hub'}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/card/demo-token" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
                            {isArabic ? 'عرض مسار الطوارئ' : 'View emergency scan'}
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
