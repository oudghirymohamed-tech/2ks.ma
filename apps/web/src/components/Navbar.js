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
    const links = [
        { to: '#home', label: isArabic ? 'الرئيسية' : 'Home' },
        { to: '#about', label: isArabic ? 'طوارئ' : 'About Us' },
        { to: '#how-it-works', label: isArabic ? 'التسجيل' : 'How It Works' },
        { to: '#contact', label: isArabic ? 'لوحة المريض' : 'Contact Us' }
    ];
    return (_jsx("header", {
        className: "sticky top-0 z-40 border-b border-sapphire/25 bg-ice/90 backdrop-blur-xl", children: _jsxs("div", {
            className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center gap-3 text-navy", children: [_jsx("div", { className: "rounded-2xl bg-navy p-2 text-white", children: _jsx(HeartPulse, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold tracking-tight", children: copy.brand }), _jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-navy/65", children: "2KS emergency platform" })] })] }), _jsx("nav", { className: "hidden items-center gap-6 lg:flex", children: links.map((link) => (_jsx(NavLink, { to: link.to, className: ({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-sapphire' : 'text-navy/80 hover:text-sapphire'}`, children: link.label }, link.to))) }), _jsxs("div", {
                className: "flex items-center gap-3", children: [_jsx(LanguageSwitcher, {}), isAuthenticated ? (_jsx("button", { type: "button", onClick: logout, className: "hidden text-sm font-semibold text-navy/80 sm:inline-flex", children: isArabic ? 'تسجيل الخروج' : 'Logout' })) : (_jsx(Link, { to: "/login", className: "hidden text-sm font-semibold text-navy/80 sm:inline-flex", children: copy.navLogin })), _jsx(Link, {
                    to: isAuthenticated && user?.role === 'patient' ? '/dashboard' : '/register', className: "inline-flex rounded-full bg-sapphire px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0C43A0]", children: isAuthenticated && user?.role === 'patient'
                        ? isArabic
                            ? 'لوحة المريض'
                            : 'Dashboard'
                        : copy.navPrimary
                })]
            })]
        })
    }));
}
