import { HeartPulse, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
    const { copy, language } = useLanguage();
    const { isAuthenticated, logout, user } = useAuth();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const links = [
        { to: '/', label: t('Home', 'Accueil', 'الرئيسية') },
        { to: '/about', label: t('About Us', 'A propos', 'من نحن') },
        { to: '/how-it-works', label: t('How It Works', 'Comment ca marche', 'كيف يعمل') },
        { to: '/services', label: t('Services', 'Services', 'الخدمات') },
        { to: '/contact', label: t('Contact Us', 'Contact', 'تواصل معنا') },
        { to: '/register', label: t('Create Account', 'Creer un compte', 'إنشاء حساب') },
        { to: '/login', label: t('Login', 'Connexion', 'تسجيل الدخول') }
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-sapphire/25 bg-ice/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-3 text-navy">
                    <div className="rounded-2xl bg-navy p-2 text-white">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold tracking-tight">{copy.brand}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-navy/65">SMART MEDICAL IDENTITY PLATFORM</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 lg:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-sm font-medium transition ${isActive ? 'text-sapphire' : 'text-navy/80 hover:text-sapphire'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={logout}
                            className="hidden text-sm font-semibold text-navy/80 sm:inline-flex"
                        >
                            {t('Logout', 'Deconnexion', 'تسجيل الخروج')}
                        </button>
                    ) : (
                        <Link to="/login" className="hidden text-sm font-semibold text-navy/80 sm:inline-flex">
                            {t('Login', 'Connexion', 'تسجيل الدخول')}
                        </Link>
                    )}
                    <Link
                        to={isAuthenticated && user?.role === 'patient' ? '/dashboard' : '/contact'}
                        className="hidden rounded-full bg-sapphire px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0C43A0] sm:inline-flex"
                    >
                        {isAuthenticated && user?.role === 'patient'
                            ? isArabic
                                ? 'لوحة المريض'
                                : 'Dashboard'
                            : isFrench
                                ? 'Devenir un client'
                                : isArabic
                                    ? 'كن عميلاً'
                                    : 'Become a client'}
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((current) => !current)}
                        className="inline-flex rounded-xl border border-sapphire/20 bg-white/70 p-2 text-navy lg:hidden"
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen ? (
                <nav className="border-t border-sapphire/20 bg-white/80 px-4 py-4 lg:hidden sm:px-6">
                    <div className="flex flex-col gap-3">
                        <Link
                            to={isAuthenticated && user?.role === 'patient' ? '/dashboard' : '/contact'}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-flex items-center justify-center rounded-full bg-sapphire px-4 py-2.5 text-sm font-semibold text-white"
                        >
                            {isAuthenticated && user?.role === 'patient'
                                ? isArabic
                                    ? 'لوحة المريض'
                                    : 'Dashboard'
                                : isFrench
                                    ? 'Devenir un client'
                                    : isArabic
                                        ? 'كن عميلاً'
                                        : 'Become a client'}
                        </Link>
                        {links.map((link) => (
                            <NavLink
                                key={`mobile-${link.to}`}
                                to={link.to}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-sapphire/10 text-sapphire' : 'text-navy/85 hover:bg-sapphire/5'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            ) : null}
        </header>
    );
}
