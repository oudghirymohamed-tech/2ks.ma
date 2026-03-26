import { HeartPulse, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const links = [
        { to: '/', label: t('Home', 'Accueil', 'الرئيسية') },
        { to: '/about', label: t('About Us', 'À propos', 'من نحن') },
        { to: '/how-it-works', label: t('How It Works', 'Comment ça marche', 'كيف يعمل') },
        { to: '/contact', label: t('Contact Us', 'Contact', 'تواصل معنا') },
    ];

    const dashboardHref =
        isAuthenticated && (user?.role === 'doctor' || user?.role === 'pharmacist')
            ? '/pro/dashboard'
            : isAuthenticated && user?.role === 'patient'
                ? '/dashboard'
                : '/contact';

    const dashboardLabel =
        isAuthenticated && (user?.role === 'doctor' || user?.role === 'pharmacist')
            ? t('Professional Space', 'Espace professionnel', 'المساحة المهنية')
            : isAuthenticated && user?.role === 'patient'
                ? isArabic
                    ? 'لوحة المريض'
                    : 'Dashboard'
                : isFrench
                    ? 'Devenir un client'
                    : isArabic
                        ? 'كن عميلاً'
                        : 'Become a client';

    return (
        <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'border-sapphire/25 bg-ice/85 shadow-[0_10px_28px_rgba(0,9,38,0.11)]' : 'border-sapphire/15 bg-ice/70'}`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-3 text-navy transition hover:opacity-95">
                    <div className="rounded-2xl bg-navy p-2 text-white shadow-[0_8px_20px_rgba(0,9,38,0.24)]">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold tracking-tight">{copy.brand}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-navy/65">
                            {t('Smart medical identity platform', 'Plateforme d identite medicale intelligente', 'منصة الهوية الطبية الذكية')}
                        </p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 lg:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `group relative text-sm font-medium transition ${isActive ? 'text-sapphire' : 'text-navy/80 hover:text-sapphire'}`
                            }
                        >
                            {({ isActive }) => (
                                <span className="relative inline-flex flex-col">
                                    <span>{link.label}</span>
                                    <span className={`mt-1 h-0.5 rounded-full bg-sapphire transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </span>
                            )}
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
                        to={dashboardHref}
                        className="premium-btn-primary hidden px-4 py-2.5 sm:inline-flex"
                    >
                        {dashboardLabel}
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((current) => !current)}
                        className="inline-flex rounded-xl border border-sapphire/20 bg-white/80 p-2 text-navy shadow-sm transition hover:border-sapphire/35 hover:bg-white lg:hidden"
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen ? (
                <nav className="border-t border-sapphire/20 bg-white/85 px-4 py-4 backdrop-blur lg:hidden sm:px-6">
                    <div className="flex flex-col gap-3">
                        <Link
                            to={dashboardHref}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="premium-btn-primary"
                        >
                            {dashboardLabel}
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
