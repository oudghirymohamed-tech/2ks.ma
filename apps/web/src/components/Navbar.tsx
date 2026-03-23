import { HeartPulse } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const links = [
    { to: '/dashboard', label: 'Patient' },
    { to: '/pro', label: 'Professionnels' },
    { to: '/b2b', label: 'B2B' },
    { to: '/admin', label: 'Admin' }
];

export function Navbar() {
    const { copy } = useLanguage();

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-canvas/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-3 text-slate-950">
                    <div className="rounded-2xl bg-slate-950 p-2 text-white">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold tracking-tight">{copy.brand}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">2KS emergency identity</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 lg:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-sm font-medium transition ${isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <Link to="/pro" className="hidden text-sm font-semibold text-slate-700 sm:inline-flex">
                        {copy.navLogin}
                    </Link>
                    <Link
                        to="/register"
                        className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        {copy.navPrimary}
                    </Link>
                </div>
            </div>
        </header>
    );
}
