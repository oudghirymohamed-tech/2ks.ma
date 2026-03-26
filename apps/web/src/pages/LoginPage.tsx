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
                description={getLabel('Clean login demo flow for HayatID account access.', 'Flux de connexion demo clair pour l acces au compte HayatID.', 'تدفق تسجيل دخول تجريبي واضح للوصول إلى حساب HayatID.')}
            />
            <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
                <div className={`premium-card p-7 sm:p-9 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="inline-flex rounded-full border border-sapphire/20 bg-sapphire/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sapphire">
                        {getLabel('Demo / Staging', 'Demo / Staging', 'تجريبي / مرحلي')}
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {getLabel('Login', 'Connexion', 'تسجيل الدخول')}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-navy">
                        {getLabel('Sign in to your 2ks account', 'Connectez-vous à votre compte 2ks', 'الدخول إلى حسابك في 2ks')}
                    </h1>
                    <p className="mt-3 text-sm leading-7 text-navy/70">
                        {getLabel('Use only your email or phone number and password to continue.', 'Utilisez uniquement votre email ou telephone et votre mot de passe pour continuer.', 'استخدم البريد الإلكتروني أو رقم الهاتف مع كلمة المرور للمتابعة.')}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">
                                {getLabel('Phone or email', 'Telephone ou email', 'الهاتف أو البريد الإلكتروني')}
                            </span>
                            <input
                                value={loginValue}
                                onChange={(event) => setLoginValue(event.target.value)}
                                required
                                placeholder={getLabel('you@example.com or +212...', 'email@exemple.com ou +212...', 'you@example.com أو +212...')}
                                className="premium-input"
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
                                placeholder={getLabel('Enter your password', 'Saisissez votre mot de passe', 'أدخل كلمة المرور')}
                                className="premium-input"
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
                            className="premium-btn-primary w-full rounded-2xl disabled:cursor-not-allowed disabled:opacity-60"
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
