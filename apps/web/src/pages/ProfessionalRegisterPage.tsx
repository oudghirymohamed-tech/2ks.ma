import { Building2, CheckCircle2, IdCard, ShieldCheck, Stethoscope } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { registerProfessionalAccount, type ProfessionalRole } from '../services/api';

export function ProfessionalRegisterPage() {
    const { language } = useLanguage();
    const { setSession } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const roleParam = searchParams.get('role');

    const initialRole: ProfessionalRole = roleParam === 'pharmacist' ? 'pharmacist' : 'doctor';
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const [form, setForm] = useState({
        fullName: '',
        professionType: initialRole as ProfessionalRole,
        phone: '',
        email: '',
        password: '',
        workplaceName: '',
        professionalAddress: '',
        specialty: '',
        licenseNumber: '',
        profilePhotoUrl: ''
    });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const roleTitle = useMemo(
        () =>
            form.professionType === 'doctor'
                ? t('Doctor Space', 'Espace medecin', 'مساحة الطبيب')
                : t('Pharmacist Space', 'Espace pharmacien', 'مساحة الصيدلي'),
        [form.professionType, language]
    );

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError('');
        setStatus('');
        setIsSubmitting(true);

        try {
            const result = await registerProfessionalAccount({
                ...form,
                specialty: form.professionType === 'doctor' ? form.specialty : ''
            });
            setSession(result.token, result.user);
            setStatus(t('Professional account created successfully.', 'Compte professionnel cree avec succes.', 'تم إنشاء الحساب المهني بنجاح.'));
            navigate('/pro/dashboard');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t('Unable to register account.', 'Impossible de creer le compte.', 'تعذر إنشاء الحساب.'));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Professional Registration', 'HayatID | Inscription professionnelle', 'HayatID | التسجيل المهني')}
                description={t(
                    'Official professional onboarding for doctors and pharmacists without NFC card purchase.',
                    'Inscription professionnelle officielle pour medecins et pharmaciens sans achat de carte NFC.',
                    'تهيئة مهنية رسمية للأطباء والصيادلة دون شراء بطاقة NFC.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                    <div className={`rounded-[2rem] bg-navy p-7 text-white shadow-panel sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-powder/80">{t('Professional Portal', 'Portail professionnel', 'البوابة المهنية')}</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t('Official registration for doctors and pharmacists', 'Inscription officielle pour medecins et pharmaciens', 'تسجيل رسمي للأطباء والصيادلة')}</h1>
                        <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                            {t(
                                'Create your professional account independently from patient card purchase. Access only the patients linked to your work sessions.',
                                'Creez votre compte professionnel independamment de l achat de carte patient. Accedez uniquement aux patients lies a vos sessions de travail.',
                                'أنشئ حسابك المهني بشكل مستقل عن شراء بطاقة المرضى، مع وصول يقتصر على المرضى المرتبطين بجلسات عملك.'
                            )}
                        </p>
                        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-powder/70">{t('Current profile', 'Profil actuel', 'الملف الحالي')}</p>
                            <p className="mt-2 text-2xl font-semibold">{roleTitle}</p>
                            <p className="mt-2 text-sm text-white/70">{t('No NFC card purchase required.', 'Aucun achat de carte NFC requis.', 'لا يتطلب شراء بطاقة NFC.')}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                                {t('Patient Space', 'Espace patient', 'مساحة المريض')}
                            </Link>
                            <Link to="/pro/login" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100">
                                {t('Professional Login', 'Connexion professionnelle', 'دخول مهني')}
                            </Link>
                        </div>
                    </div>

                    <div className={`premium-card p-7 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm({ ...form, professionType: 'doctor' });
                                        setSearchParams({ role: 'doctor' });
                                    }}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${form.professionType === 'doctor' ? 'border-sapphire bg-sapphire/10 text-sapphire' : 'border-slate-200 text-navy/70 hover:border-sapphire/40'}`}
                                >
                                    <Stethoscope className="h-4 w-4" />
                                    {t('Doctor', 'Medecin', 'طبيب')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm({ ...form, professionType: 'pharmacist' });
                                        setSearchParams({ role: 'pharmacist' });
                                    }}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${form.professionType === 'pharmacist' ? 'border-sapphire bg-sapphire/10 text-sapphire' : 'border-slate-200 text-navy/70 hover:border-sapphire/40'}`}
                                >
                                    <Building2 className="h-4 w-4" />
                                    {t('Pharmacist', 'Pharmacien', 'صيدلي')}
                                </button>
                            </div>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Full name', 'Nom complet', 'الاسم الكامل')}</span>
                                <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Phone number', 'Numero de telephone', 'رقم الهاتف')}</span>
                                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Email address', 'Adresse email', 'البريد الإلكتروني')}</span>
                                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Password', 'Mot de passe', 'كلمة المرور')}</span>
                                <input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Workplace / clinic / pharmacy name', 'Nom du lieu de travail / clinique / pharmacie', 'اسم مكان العمل / العيادة / الصيدلية')}</span>
                                <input required value={form.workplaceName} onChange={(e) => setForm({ ...form, workplaceName: e.target.value })} className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Professional address', 'Adresse professionnelle', 'العنوان المهني')}</span>
                                <input required value={form.professionalAddress} onChange={(e) => setForm({ ...form, professionalAddress: e.target.value })} className="premium-input" />
                            </label>

                            {form.professionType === 'doctor' ? (
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-navy">{t('Specialty', 'Specialite', 'التخصص')}</span>
                                    <input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="premium-input" />
                                </label>
                            ) : null}

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('License or professional ID number', 'Numero de licence ou identifiant professionnel', 'رقم الرخصة أو المعرّف المهني')}</span>
                                <input required value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} className="premium-input" />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Optional profile photo', 'Photo de profil (optionnelle)', 'صورة الملف الشخصي (اختياري)')}</span>
                                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, profilePhotoUrl: e.target.files?.[0]?.name || '' })} className="premium-input text-sm file:mr-4 file:rounded-full file:border-0 file:bg-sapphire/10 file:px-3 file:py-1.5 file:font-semibold file:text-sapphire" />
                            </label>

                            {status ? (
                                <p className="inline-flex items-center gap-2 rounded-full border border-call/30 bg-call/10 px-4 py-2 text-sm font-semibold text-call">
                                    <CheckCircle2 className="h-4 w-4" />
                                    {status}
                                </p>
                            ) : null}
                            {error ? (
                                <p className="inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-4 py-2 text-sm font-semibold text-emergency">
                                    <ShieldCheck className="h-4 w-4" />
                                    {error}
                                </p>
                            ) : null}

                            <button type="submit" disabled={isSubmitting} className="premium-btn-primary w-full rounded-2xl disabled:opacity-60">
                                <IdCard className="h-4 w-4" />
                                {isSubmitting ? t('Processing...', 'Traitement...', 'جارٍ المعالجة...') : t('Create professional account', 'Creer un compte professionnel', 'إنشاء حساب مهني')}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
