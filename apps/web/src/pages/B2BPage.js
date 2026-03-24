import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        organizationType: 'clinic'
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
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Submission failed');
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsxs(MarketingLayout, { children: [_jsx(PageMeta, { title: "2ks | B2B onboarding", description: "B2B onboarding flow for clinics and pharmacies with separate partner intake." }), _jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_0.9fr]", children: [_jsxs("div", { className: isArabic ? 'font-arabic text-right' : '', children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700", children: "Partners / B2B" }), _jsx("h1", { className: "mt-4 text-5xl font-semibold tracking-tight text-slate-950", children: isArabic
                                            ? 'تهيئة شركاء B2B منفصلة عن المرضى والأطباء.'
                                            : 'Separate B2B onboarding for clinics and pharmacies.' }), _jsx("p", { className: "mt-5 max-w-2xl text-lg leading-8 text-slate-600", children: isArabic
                                            ? 'يتم جمع بيانات المؤسسة وجهة الاتصال لإطلاق بيئة بيتا بشكل منظم.'
                                            : 'Collect organization and contact information to activate beta onboarding cleanly.' }), _jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-2", children: [
                                            ['Adoption', 'Simple front-office activation for pilot teams.'],
                                            ['Trust layer', 'Professional verification and access traceability.'],
                                            ['Pilot-ready', 'Designed for staged regional rollout.'],
                                            ['Narrative', 'Strong partner narrative for live demos.']
                                        ].map(([title, body]) => (_jsxs("div", { className: "rounded-3xl border border-slate-200 bg-white p-5 shadow-soft", children: [_jsx(ShieldCheck, { className: "h-5 w-5 text-emerald-600" }), _jsx("p", { className: "mt-4 font-semibold text-slate-950", children: title }), _jsx("p", { className: "mt-2 text-sm leading-6 text-slate-600", children: body })] }, title))) }), _jsxs("div", { className: "mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: isArabic ? 'نموذج تهيئة B2B' : 'B2B onboarding form' }), _jsxs("div", { className: "mt-4 grid gap-3", children: [[
                                                        ['organizationName', isArabic ? 'اسم المؤسسة' : 'Organization name'],
                                                        ['contactName', isArabic ? 'اسم جهة الاتصال' : 'Contact name'],
                                                        ['contactPhone', isArabic ? 'هاتف جهة الاتصال' : 'Contact phone'],
                                                        ['contactEmail', isArabic ? 'البريد الإلكتروني' : 'Contact email']
                                                    ].map(([key, label]) => (_jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: label }), _jsx("input", { value: form[key], onChange: (event) => setForm({ ...form, [key]: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" })] }, key))), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-slate-700", children: isArabic ? 'نوع المؤسسة' : 'Organization type' }), _jsxs("select", { value: form.organizationType, onChange: (event) => setForm({ ...form, organizationType: event.target.value }), className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900", children: [_jsx("option", { value: "clinic", children: isArabic ? 'عيادة' : 'Clinic' }), _jsx("option", { value: "pharmacy", children: isArabic ? 'صيدلية' : 'Pharmacy' }), _jsx("option", { value: "other", children: isArabic ? 'أخرى' : 'Other' })] })] })] }), _jsx("button", { type: "button", onClick: handleSubmit, disabled: isSubmitting, className: "mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white", children: isSubmitting ? (isArabic ? 'جارٍ الإرسال...' : 'Submitting...') : (isArabic ? 'إرسال الطلب' : 'Submit onboarding') }), status ? _jsx("p", { className: "mt-3 text-sm font-semibold text-call", children: status }) : null, error ? (_jsxs("p", { className: "mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emergency", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), error] })) : null] })] }), _jsxs("div", { className: "rounded-[2rem] bg-slate-950 p-8 text-white shadow-panel", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-white/10 p-3", children: _jsx(Handshake, { className: "h-5 w-5 text-emerald-300" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-white/60", children: "Founder partner offer" }), _jsx("p", { className: "text-xl font-semibold", children: "Book partnership discussion" })] })] }), _jsx("div", { className: "mt-6 space-y-4", children: ['Pilot launch', 'Operational onboarding', 'Partner branding', 'Integration roadmap'].map((item) => (_jsx("div", { className: "rounded-3xl border border-white/10 bg-white/5 p-4", children: item }, item))) })] })] }), _jsx("div", { className: "mt-12 grid gap-6 lg:grid-cols-3", children: partnerOffers.map((offer) => (_jsxs("div", { className: "rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: offer.title }), _jsx("p", { className: "mt-4 text-4xl font-semibold text-slate-950", children: offer.price }), _jsx("p", { className: "mt-3 text-base leading-7 text-slate-600", children: offer.description }), _jsx("div", { className: "mt-5 space-y-3 text-sm text-slate-700", children: offer.bullets.map((bullet) => (_jsxs("div", { className: "inline-flex items-center gap-2", children: [_jsx(Building2, { className: "h-4 w-4 text-emerald-600" }), bullet] }, bullet))) })] }, offer.title))) }), _jsxs("div", { className: "mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("h2", { className: "text-2xl font-semibold text-slate-950", children: isArabic ? 'الخطوة التالية' : 'Next step' }), _jsx("p", { className: "mt-3 max-w-3xl text-base leading-7 text-slate-600", children: isArabic
                                    ? 'ابدأ بمسار الطوارئ ثم فعّل مسار الشراكة عبر نموذج B2B.'
                                    : 'Start with emergency flow demonstration, then activate partner onboarding through the B2B intake.' }), _jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [_jsxs(Link, { to: "/demo", className: "inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white", children: [isArabic ? 'فتح مركز العرض' : 'Open demo hub', _jsx(ArrowRight, { className: "h-4 w-4" })] }), _jsx(Link, { to: "/u/demo-token", className: "inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700", children: isArabic ? 'عرض مسار الطوارئ' : 'View emergency scan' })] })] })] })] }));
}
