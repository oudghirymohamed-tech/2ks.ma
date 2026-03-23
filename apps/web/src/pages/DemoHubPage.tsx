import { ArrowRight, Building2, HeartPulse, ShieldCheck, Stethoscope, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';

const flows = [
    { title: 'Landing page', body: 'Investor and booth storytelling entry point.', to: '/', icon: HeartPulse },
    { title: 'Patient registration', body: 'Multi-step onboarding with emergency preview.', to: '/register', icon: HeartPulse },
    { title: 'Patient dashboard', body: 'QR card, access history and privacy actions.', to: '/dashboard', icon: ShieldCheck },
    { title: 'Emergency scan', body: 'Adult emergency page demo.', to: '/u/demo-token', icon: Stethoscope },
    { title: 'Minor emergency scan', body: 'Guardian banner state for a minor profile.', to: '/u/demo-minor', icon: Stethoscope },
    { title: 'Professional landing', body: 'Level 0 vs level 1 explanation.', to: '/pro', icon: UserCog },
    { title: 'Professional dashboard', body: 'KYC, delegations and audit history.', to: '/pro/dashboard', icon: UserCog },
    { title: 'B2B partners', body: 'Founder offers for clinics and pharmacies.', to: '/b2b', icon: Building2 },
    { title: 'Admin demo', body: 'Mock KYC queue and suspicious activity panel.', to: '/admin', icon: UserCog }
];

export function DemoHubPage() {
    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Demo hub"
                description="Presentation hub with links to every HayatID startup demo flow for Gitex Africa 2026."
            />
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Presentation page</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">Demo hub for booth flow and live storytelling.</h1>
                    <p className="mt-5 text-lg leading-8 text-slate-600">Chaque carte ouvre un parcours concret pour accélérer une démo investisseur, incubateur ou partenaire terrain.</p>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {flows.map((flow) => {
                        const Icon = flow.icon;
                        return (
                            <Link key={flow.to} to={flow.to} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-slate-300">
                                <div className="inline-flex rounded-2xl bg-slate-950 p-3 text-white">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h2 className="mt-5 text-xl font-semibold text-slate-950">{flow.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{flow.body}</p>
                                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                    Ouvrir
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </MarketingLayout>
    );
}
