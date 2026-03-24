import { HeartPulse } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
    const { copy, language } = useLanguage();
    const { isAuthenticated, logout, user } = useAuth();
    const isArabic = language === 'ar';
    const links = [
        { to: '/', label: isArabic ? 'الرئيسية' : 'Home' },
        { to: '/u/demo-token', label: isArabic ? 'طوارئ' : 'Urgent' },
        { to: '/register', label: isArabic ? 'التسجيل' : 'Register' },
        { to: '/dashboard', label: isArabic ? 'لوحة المريض' : 'Dashboard' }
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
                        <p className="text-xs uppercase tracking-[0.2em] text-navy/65">2KS emergency platform</p>
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
                            {isArabic ? 'تسجيل الخروج' : 'Logout'}
                        </button>
                    ) : (
                        <Link to="/login" className="hidden text-sm font-semibold text-navy/80 sm:inline-flex">
                            {copy.navLogin}
                        </Link>
                    )}
                    <Link
                        to={isAuthenticated && user?.role === 'patient' ? '/dashboard' : '/register'}
                        className="inline-flex rounded-full bg-sapphire px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0C43A0]"
                    >
                        {isAuthenticated && user?.role === 'patient'
                            ? isArabic
                                ? 'لوحة المريض'
                                : 'Dashboard'
                            : copy.navPrimary}
                    </Link>
                </div>
            </div>
        </header>
    );
}
