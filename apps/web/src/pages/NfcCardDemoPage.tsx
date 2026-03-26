import { AlertCircle, ArrowRight, CreditCard, LogIn, Siren } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getPublicEmergencyProfile, login as loginApi } from '../services/api';
import type { PublicEmergencyResponse } from '../types/demo';

export function NfcCardDemoPage() {
    const { token = 'demo-token' } = useParams();
    const navigate = useNavigate();
    const { setSession } = useAuth();
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';

    const [profile, setProfile] = useState<PublicEmergencyResponse | null>(null);
    const [loadError, setLoadError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getPublicEmergencyProfile(token)
            .then((result) => {
                setProfile(result);
                setLoginValue(result.patient.emergencyContact.phone);
            })
            .catch((requestError) => {
                setLoadError(requestError instanceof Error ? requestError.message : 'Unable to load card.');
            });
    }, [token]);

    function t(en: string, fr: string, ar: string) {
        if (isArabic) return ar;
        if (isFrench) return fr;
        return en;
    }

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        setLoginError('');
        setIsSubmitting(true);

        try {
            // DEMO/STAGING ONLY: this card-linked login uses demo API fallback credentials and seed data.
            const result = await loginApi(loginValue, password);
            setSession(result.token, result.user);

            if (result.user.role === 'doctor') {
                navigate('/pro/dashboard');
                return;
            }

            navigate('/dashboard');
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : 'Unable to login from card.';
            setLoginError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loadError) {
        return <div className="min-h-screen bg-navy px-6 py-16 text-white">{loadError}</div>;
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-navy px-6 py-16 text-white">
                {isArabic ? 'جارٍ تحميل بطاقة NFC...' : 'Loading NFC card...'}
            </div>
        );
    }

    const patient = profile.patient;

    return (
        <div className={`min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,82,186,0.2),_transparent_32%),linear-gradient(180deg,#000926_0%,#00184A_100%)] text-white ${isArabic ? 'font-arabic text-right' : ''}`}>
            <PageMeta
                title="2ks | NFC card access"
                description="NFC card experience with card-linked login and urgent emergency access."
            />

            <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-16">
                <section className="rounded-[2rem] border border-sapphire/25 bg-white/5 p-6 shadow-panel sm:p-8">
                    <div className="inline-flex rounded-full border border-powder/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-powder">
                        {t('Secure card scan', 'Scan carte securise', 'مسح بطاقة آمن')}
                    </div>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {t('NFC Card Identity', 'Identite de carte NFC', 'هوية بطاقة NFC')}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                        {t(
                            'This page presents a scanned medical card and connects identity, login, and urgent emergency access in one flow.',
                            'Cette page presente une carte medicale scannee et relie identite, connexion et acces urgent dans un seul flux.',
                            'تعرض هذه الصفحة بطاقة طبية ممسوحة وتربط الهوية وتسجيل الدخول والوصول العاجل في مسار واحد.'
                        )}
                    </p>

                    <div className="mt-6 rounded-[1.8rem] border border-powder/20 bg-navy/80 p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-powder/80">{t('Card Owner', 'Titulaire', 'مالك البطاقة')}</p>
                                <p className="mt-2 text-2xl font-semibold">{patient.fullName}</p>
                                <p className="mt-2 text-sm text-white/75">{patient.city}</p>
                            </div>
                            <div className="rounded-2xl bg-sapphire/20 p-3 text-powder">
                                <CreditCard className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-sapphire/20 bg-sapphire/10 p-4 text-sm text-powder/95">
                            <p>{t('Card status', 'Statut carte', 'حالة البطاقة')}: <span className="font-semibold uppercase">{patient.nfcCard.status}</span></p>
                            <p className="mt-1">{t('Token', 'Token', 'الرمز')}: <span className="font-semibold">{profile.token}</span></p>
                        </div>
                    </div>

                    <Link
                        to={`/u/${encodeURIComponent(profile.token)}`}
                        className="mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[linear-gradient(180deg,#D74A3C_0%,#C0392B_100%)] px-6 text-base font-semibold text-white shadow-panel transition hover:-translate-y-0.5"
                    >
                        <Siren className="h-5 w-5" />
                        {t('Urgent', 'Urgent', 'طوارئ')}
                        <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                    </Link>
                </section>

                <section className="rounded-[2rem] border border-sapphire/25 bg-white p-6 text-navy shadow-soft sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sapphire">{t('Card login', 'Connexion carte', 'تسجيل دخول البطاقة')}</p>
                    <h2 className="mt-3 text-2xl font-semibold">
                        {t('Login from scanned card', 'Connexion depuis la carte scannee', 'تسجيل الدخول من البطاقة الممسوحة')}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-navy/72">
                        {t(
                            'Use email/phone and password to continue the protected journey after NFC scan.',
                            'Utilisez email/telephone et mot de passe pour poursuivre le parcours protege apres scan NFC.',
                            'استخدم البريد/الهاتف وكلمة المرور لمتابعة المسار المحمي بعد مسح NFC.'
                        )}
                    </p>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">{t('Email or phone', 'Email ou telephone', 'البريد أو الهاتف')}</span>
                            <input
                                value={loginValue}
                                onChange={(event) => setLoginValue(event.target.value)}
                                required
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">{t('Password', 'Mot de passe', 'كلمة المرور')}</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                minLength={8}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire"
                            />
                        </label>

                        {loginError ? (
                            <div className="inline-flex items-center gap-2 rounded-full border border-emergency/25 bg-emergency/10 px-4 py-2 text-sm font-semibold text-emergency">
                                <AlertCircle className="h-4 w-4" />
                                {loginError}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sapphire px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <LogIn className="h-4 w-4" />
                            {isSubmitting ? t('Signing in...', 'Connexion...', 'جارٍ تسجيل الدخول...') : t('Sign in', 'Se connecter', 'دخول')}
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
