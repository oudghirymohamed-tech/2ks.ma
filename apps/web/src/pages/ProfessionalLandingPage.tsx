import { ArrowRight, BadgeCheck, LockKeyhole, Smartphone, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';

const professionalCards = [
    { title: 'Niveau 0', body: 'Visible au premier scan: groupe sanguin, allergies, instructions, contact.', Icon: UserCheck },
    { title: 'Niveau 1', body: 'Déverrouillé via OTP demo, avec historique, délégations et audit.', Icon: BadgeCheck },
    { title: 'Fallbacks', body: 'TOTP et emergency code présents comme états UI pour la narration produit.', Icon: Smartphone }
];

export function ProfessionalLandingPage() {
    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Professional access demo"
                description="Professional landing page demo explaining level 0 and level 1 access, OTP verification, and trusted access history for doctors and pharmacists."
            />
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Professional experience</p>
                        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">Conçu pour aider vite, sans perdre la traçabilité.</h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            Le niveau 0 rassure par sa simplicité. Le niveau 1 ajoute une couche de vérification qui rend l’expérience crédible pour médecins, pharmaciens et juges techniques.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/pro/dashboard" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                Ouvrir le dashboard pro
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/u/demo-token" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700">
                                Tester le scan public
                                <LockKeyhole className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-panel">
                        <div className="grid gap-4">
                            {professionalCards.map(({ title, body, Icon }) => (
                                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <div className="inline-flex rounded-2xl bg-white/10 p-3">
                                        <Icon className="h-5 w-5 text-emerald-300" />
                                    </div>
                                    <p className="mt-4 text-lg font-semibold">{title}</p>
                                    <p className="mt-2 text-sm leading-7 text-white/65">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
