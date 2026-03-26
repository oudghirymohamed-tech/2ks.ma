import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeartPulse } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
export function Navbar() {
    const { copy, language } = useLanguage();
    const { isAuthenticated, logout, user } = useAuth();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';
    const t = (en, fr, ar) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };
    const links = [
        { to: '/', label: t('Home', 'Accueil', 'الرئيسية') },
        { to: '/about', label: t('About Us', 'A propos', 'من نحن') },
        { to: '/how-it-works', label: t('How It Works', 'Comment ca marche', 'كيف يعمل') },
        { to: '/contact', label: t('Contact Us', 'Contact', 'تواصل معنا') }
    ];
    return (_jsx("header", {
        className: "sticky top-0 z-40 border-b border-sapphire/25 bg-ice/90 backdrop-blur-xl", children: _jsxs("div", {
            className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center gap-3 text-navy", children: [_jsx("div", { className: "rounded-2xl bg-navy p-2 text-white", children: _jsx(HeartPulse, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold tracking-tight", children: copy.brand }), _jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-navy/65", children: "SMART MEDICAL IDENTITY PLATFORM" })] })] }), _jsx("nav", { className: "hidden items-center gap-6 lg:flex", children: links.map((link) => (_jsx(NavLink, { to: link.to, className: ({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-sapphire' : 'text-navy/80 hover:text-sapphire'}`, children: link.label }, link.to))) }), _jsxs("div", {
                className: "flex items-center gap-3", children: [_jsx(LanguageSwitcher, {}), isAuthenticated ? (_jsx("button", { type: "button", onClick: logout, className: "hidden text-sm font-semibold text-navy/80 sm:inline-flex", children: t('Logout', 'Deconnexion', 'تسجيل الخروج') })) : (_jsx(Link, { to: "/login", className: "hidden text-sm font-semibold text-navy/80 sm:inline-flex", children: t('Login', 'Connexion', 'تسجيل الدخول') })), _jsx(Link, {
                    to: isAuthenticated && user?.role === 'patient' ? '/dashboard' : '/contact', className: "hidden rounded-full bg-sapphire px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0C43A0] sm:inline-flex", children: isAuthenticated && user?.role === 'patient'
                        ? (isArabic ? 'لوحة المريض' : 'Dashboard')
                        : (isFrench ? 'Devenir un client' : isArabic ? 'كن عميلاً' : 'Become a client')
                })]
            })]
        })
    }));
}
