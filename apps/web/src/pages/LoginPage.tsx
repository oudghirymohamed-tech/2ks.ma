import { AlertCircle, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function LoginPage() {
    const navigate = useNavigate();
    const { setSession } = useAuth();
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';

    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // DEMO: GITEX demo account support with exact credentials
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await loginApi(loginValue, password);
            setSession(result.token, result.user);

            if (result.user.role === 'doctor') {
                navigate('/pro/dashboard');
                return;
            }

            navigate('/dashboard');
        } catch (requestError) {
            const errorMsg = requestError instanceof Error ? requestError.message : 'Unable to login.';
            const translatedError = isFrench ? 'Impossible de se connecter.' : isArabic ? 'لا يمكن تسجيل الدخول.' : errorMsg;
            setError(translatedError);
        } finally {
            setIsLoading(false);
        }
    }

    const getLabel = (enText: string, frText: string, arText: string) => {
        if (isFrench) return frText;
        if (isArabic) return arText;
        return enText;
    };

    return (
        <MarketingLayout>
            <PageMeta
                title={getLabel('2ks | Login', '2ks | Connexion', '2ks | تسجيل الدخول')}
                description={getLabel('Secure login for patient, doctor, and partner access.', 'Connexion sécurisée pour patients, doctors et partenaires.', 'تسجيل دخول آمن للمرضى والأطباء والشركاء.')}
            />
            <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
                <div className={`rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-9 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {getLabel('Login', 'Connexion', 'تسجيل الدخول')}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-navy">
                        {getLabel('Sign in to your 2ks account', 'Connectez-vous à votre compte 2ks', 'الدخول إلى حسابك في 2ks')}
                    </h1>
                    <p className="mt-3 text-sm leading-7 text-navy/70">
                        {getLabel('Use your phone/email and password to access your account.', 'Utilisez votre email et mot de passe.', 'استخدم رقم الهاتف أو البريد مع كلمة المرور.')}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">
                                {getLabel('Phone or email', 'Email', 'الهاتف أو البريد')}
                            </span>
                            <input
                                value={loginValue}
                                onChange={(event) => setLoginValue(event.target.value)}
                                required
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">
                                {getLabel('Password', 'Mot de passe', 'كلمة المرور')}
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                minLength={8}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire"
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
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sapphire px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <LogIn className="h-4 w-4" />
                            {isLoading
                                ? getLabel('Signing in...', 'Connexion en cours...', 'جارٍ تسجيل الدخول...')
                                : getLabel('Sign in', 'Se connecter', 'دخول')}
                        </button>
                    </form>
                </div>
            </section>
        </MarketingLayout>
    );
}
