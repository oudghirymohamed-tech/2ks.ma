import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BRAND_NAV_ORDER, BRAND_ROUTE_PATHS, type BrandRouteKey } from '../config/brandRoutes';
import { useLanguage } from '../context/LanguageContext';
import type { ReactNode } from 'react';

interface BrandSiteLayoutProps {
    children: ReactNode;
}

export function BrandSiteLayout({ children }: BrandSiteLayoutProps) {
    const { language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const navLabelByKey: Record<BrandRouteKey, string> = {
        home: t('Home', 'Accueil', 'الرئيسية'),
        about: t('About', 'A propos', 'حول'),
        howItWorks: t('How It Works', 'Fonctionnement', 'كيف يعمل'),
        whyItMatters: t('Why It Matters', 'Pourquoi c est important', 'لماذا يهم'),
        team: t('Team', 'Equipe', 'الفريق'),
        contact: t('Contact', 'Contact', 'تواصل')
    };

    const navItems = BRAND_NAV_ORDER.map((key) => ({
        to: BRAND_ROUTE_PATHS[key],
        label: navLabelByKey[key]
    }));

    const languageOptions = ['en', 'fr', 'ar'] as const;

    return (
        <div className="font-ui min-h-screen bg-[#041225] text-white">
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#041125_0%,#061733_34%,#071a3a_62%,#06162e_100%)]" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(56,145,255,0.22),transparent_26%),radial-gradient(circle_at_84%_12%,rgba(126,205,255,0.14),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(74,132,255,0.16),transparent_34%)]" />

                <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06162de8] backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <Link to="/" className="inline-flex min-w-0 items-center gap-3">
                            <span className="relative">
                                <span className="absolute inset-0 rounded-2xl bg-sky-300/20 blur-md" />
                                <img src="/favicon.svg" alt="HayatID logo" width="44" height="44" className="relative h-11 w-11 rounded-2xl" fetchPriority="high" />
                            </span>
                            <span className={`min-w-0 ${isArabic ? 'font-arabic text-right' : ''}`}>
                                <span className="font-editorial block truncate text-[1.05rem] font-medium tracking-[0.01em] text-white sm:text-[1.2rem]">HayatID</span>
                                <span className="block truncate text-[0.68rem] uppercase tracking-[0.28em] text-sky-100/60 sm:text-[0.72rem]">
                                    Powered by 2KS
                                </span>
                            </span>
                        </Link>

                        <nav className="hidden items-center gap-6 lg:flex">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `interactive-link text-sm font-medium tracking-[0.03em] transition ${isActive ? 'text-white' : 'text-slate-200/84 hover:text-white'}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-3 lg:flex">
                            <div className="inline-flex rounded-full border border-white/12 bg-white/6 p-1 backdrop-blur">
                                {languageOptions.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setLanguage(option)}
                                        className={`min-h-[36px] rounded-full px-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${language === option ? 'bg-white text-[#041225]' : 'text-slate-200/76 hover:bg-white/8 hover:text-white'}`}
                                        aria-pressed={language === option}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 lg:hidden">
                            <div className="inline-flex rounded-full border border-white/12 bg-white/6 p-1 backdrop-blur">
                                {languageOptions.map((option) => (
                                    <button
                                        key={`mobile-${option}`}
                                        type="button"
                                        onClick={() => setLanguage(option)}
                                        className={`min-h-[36px] rounded-full px-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition ${language === option ? 'bg-white text-[#041225]' : 'text-slate-200/76 hover:bg-white/8 hover:text-white'}`}
                                        aria-pressed={language === option}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((current) => !current)}
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white transition hover:bg-white/12"
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen ? (
                        <nav className="border-t border-white/10 px-4 py-4 lg:hidden sm:px-6">
                            <div className="flex flex-col gap-2 rounded-[1.5rem] border border-white/10 bg-white/6 p-3 backdrop-blur-xl">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={`mobile-${item.to}`}
                                        to={item.to}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-white/14 text-white' : 'text-slate-100 hover:bg-white/8'}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </nav>
                    ) : null}
                </header>

                <main key={location.pathname} className="brand-page-enter motion-page">{children}</main>

                <footer className="border-t border-white/8 bg-[#030d1b]">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:px-8">
                        <div className={isArabic ? 'font-arabic text-right' : ''}>
                            <div className="inline-flex items-center gap-3">
                                <img src="/favicon.svg" alt="HayatID logo" width="48" height="48" className="h-12 w-12 rounded-2xl" loading="lazy" />
                                <div>
                                    <p className="font-editorial text-[1.35rem] font-medium tracking-[0.01em] text-white">HayatID</p>
                                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-sky-100/56">Powered by 2KS</p>
                                </div>
                            </div>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300/72">
                                {t(
                                    'A modern medical identity concept focused on clarity, trust, and accessible information in critical moments.',
                                    'Un concept moderne d identite medicale centre sur la clarte, la confiance et l accessibilite de l information dans les moments critiques.',
                                    'مفهوم حديث للهوية الطبية يركز على الوضوح والثقة وإتاحة المعلومات في اللحظات الحرجة.'
                                )}
                            </p>
                        </div>

                        <div className={`grid gap-5 sm:grid-cols-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/50">{t('Navigation', 'Navigation', 'التنقل')}</p>
                                <div className="mt-4 grid gap-3">
                                    {navItems.map((item) => (
                                        <NavLink key={`footer-${item.to}`} to={item.to} className="interactive-link text-sm text-slate-200/72 transition hover:text-white">
                                            {item.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/50">{t('Contact', 'Contact', 'التواصل')}</p>
                                <div className="mt-4 grid gap-3 text-sm text-slate-200/72">
                                    <a href="mailto:hayatid.contact@gmail.com" className="interactive-link transition hover:text-white">hayatid.contact@gmail.com</a>
                                    <a href="https://www.instagram.com/hayatid.ma?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="interactive-link transition hover:text-white">Instagram</a>
                                    <a href="https://www.linkedin.com/company/2ks-ma/" target="_blank" rel="noreferrer" className="interactive-link transition hover:text-white">LinkedIn</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
