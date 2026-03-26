import { AlertCircle, Building2, LogIn, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { loginProfessionalAccount, type ProfessionalRole } from '../services/api';

export function ProfessionalLoginPage() {
    const { language } = useLanguage();
    const { setSession } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const roleParam = searchParams.get('role');
    const role: ProfessionalRole = roleParam === 'pharmacist' ? 'pharmacist' : 'doctor';

    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await loginProfessionalAccount(loginValue, password, role);
            setSession(result.token, result.user);
            navigate('/pro/dashboard');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t('Unable to login.', 'Connexion impossible.', 'تعذر تسجيل الدخول.'));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Professional Login', 'HayatID | Connexion professionnelle', 'HayatID | دخول مهني')}
                description={t('Separate secure login for doctors and pharmacists.', 'Connexion separee et securisee pour medecins et pharmaciens.', 'تسجيل دخول منفصل وآمن للأطباء والصيادلة.')}
            />

            <section className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className={`premium-card p-6 sm:p-9 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">{t('Professional Login', 'Connexion professionnelle', 'دخول مهني')}</p>
                    <h1 className="mt-3 text-2xl font-semibold text-navy sm:text-3xl">{role === 'doctor' ? t('Doctor Space', 'Espace medecin', 'مساحة الطبيب') : t('Pharmacist Space', 'Espace pharmacien', 'مساحة الصيدلي')}</h1>
                    <p className="mt-3 text-sm leading-7 text-navy/70">{t('This login flow is separate from patient accounts and card purchase.', 'Ce flux est separe des comptes patients et de l achat de carte.', 'هذا المسار منفصل عن حسابات المرضى وشراء البطاقة.')}</p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setSearchParams({ role: 'doctor' })}
                            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${role === 'doctor' ? 'border-sapphire bg-sapphire/10 text-sapphire' : 'border-slate-200 text-navy/75 hover:border-sapphire/40'}`}
                        >
                            <Stethoscope className="h-4 w-4" />
                            {t('Doctor', 'Medecin', 'طبيب')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setSearchParams({ role: 'pharmacist' })}
                            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${role === 'pharmacist' ? 'border-sapphire bg-sapphire/10 text-sapphire' : 'border-slate-200 text-navy/75 hover:border-sapphire/40'}`}
                        >
                            <Building2 className="h-4 w-4" />
                            {t('Pharmacist', 'Pharmacien', 'صيدلي')}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">{t('Email address', 'Adresse email', 'البريد الإلكتروني')}</span>
                            <input
                                value={loginValue}
                                onChange={(event) => setLoginValue(event.target.value)}
                                required
                                className="premium-input"
                                placeholder={role === 'doctor' ? 'doctor@hayatid.info' : 'pharmacist@hayatid.info'}
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">{t('Password', 'Mot de passe', 'كلمة المرور')}</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                className="premium-input"
                                placeholder={role === 'doctor' ? 'DoctorAccess123' : 'PharmaAccess123'}
                            />
                        </label>

                        {error ? (
                            <div className="inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-4 py-2 text-sm font-semibold text-emergency">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="premium-btn-primary w-full rounded-2xl disabled:opacity-60"
                        >
                            <LogIn className="h-4 w-4" />
                            {isLoading ? t('Signing in...', 'Connexion...', 'جارٍ تسجيل الدخول...') : t('Sign in to professional space', 'Se connecter a l espace professionnel', 'الدخول إلى المساحة المهنية')}
                        </button>
                    </form>

                    <div className="mt-5 text-sm text-navy/70">
                        {t('No account yet?', 'Pas encore de compte ?', 'ليس لديك حساب بعد؟')}{' '}
                        <Link to={`/pro/register?role=${role}`} className="font-semibold text-sapphire hover:underline">
                            {t('Create professional account', 'Creer un compte professionnel', 'إنشاء حساب مهني')}
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
