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
        <header className="sticky top-0 z-40 border-b border-sapphire/25 bg-ice/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-3 text-navy">
                    <div className="rounded-2xl bg-navy p-2 text-white">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold tracking-tight">{copy.brand}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-navy/65">2KS emergency identity</p>
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
                    <Link to="/pro" className="hidden text-sm font-semibold text-navy/80 sm:inline-flex">
                        {copy.navLogin}
                    </Link>
                    <Link
                        to="/register"
                        className="inline-flex rounded-full bg-sapphire px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0C43A0]"
                    >
                        {copy.navPrimary}
                    </Link>
                </div>
            </div>
        </header>
    );
}
