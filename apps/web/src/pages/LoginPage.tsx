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

    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            setError(requestError instanceof Error ? requestError.message : 'Unable to login.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <MarketingLayout>
            <PageMeta title="2ks | Login" description="Secure login for patient, doctor, and partner access." />
            <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
                <div className={`rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-9 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {isArabic ? 'تسجيل الدخول' : 'Login'}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-navy">
                        {isArabic ? 'الدخول إلى حسابك في 2ks' : 'Sign in to your 2ks account'}
                    </h1>
                    <p className="mt-3 text-sm leading-7 text-navy/70">
                        {isArabic
                            ? 'استخدم رقم الهاتف أو البريد المرتبط بالحساب مع كلمة المرور.'
                            : 'Use your phone/email and password to access your account.'}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">{isArabic ? 'الهاتف أو البريد' : 'Phone or email'}</span>
                            <input
                                value={loginValue}
                                onChange={(event) => setLoginValue(event.target.value)}
                                required
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-navy">{isArabic ? 'كلمة المرور' : 'Password'}</span>
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
                                ? isArabic
                                    ? 'جارٍ تسجيل الدخول...'
                                    : 'Signing in...'
                                : isArabic
                                    ? 'دخول'
                                    : 'Sign in'}
                        </button>
                    </form>
                </div>
            </section>
        </MarketingLayout>
    );
}
