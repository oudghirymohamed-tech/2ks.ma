import { ArrowRight, Building2, Handshake, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { partnerOffers } from '../data/mockData';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function B2BPage() {
    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | B2B partner demo"
                description="Partner page demo for clinics and pharmacies with founder offers, onboarding narrative, and partnership CTA."
            />
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Partners / B2B</p>
                        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">Pour les cliniques, pharmacies et partenaires fondateurs.</h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            L’enjeu n’est pas seulement le scan. C’est l’intégration d’un réflexe d’urgence clair dans un parcours réel de soins et d’orientation patient.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            {[
                                ['Adoption terrain', 'Activation simple en front office et comptoir.'],
                                ['Trust layer', 'Vérification professionnelle et traçabilité des accès.'],
                                ['Pilotable', 'Déploiement pilote Marrakech 2026 avec accompagnement fondateur.'],
                                ['Narration produit', 'Très démonstratif en salon, incubateur et rendez-vous partenaires.']
                            ].map(([title, body]) => (
                                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                    <p className="mt-4 font-semibold text-slate-950">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-panel">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-white/10 p-3">
                                <Handshake className="h-5 w-5 text-emerald-300" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Founder partner offer</p>
                                <p className="text-xl font-semibold">Book partnership discussion</p>
                            </div>
                        </div>
                        <p className="mt-5 text-sm leading-7 text-white/70">
                            Positionner HayatID comme une couche d’urgence crédible entre patient, structure de soin et professionnel de confiance.
                        </p>
                        <div className="mt-6 space-y-4">
                            {['Pilote cadré', 'Formation initiale', 'Branding partenaire fondateur', 'Roadmap d’intégration future'].map((item) => (
                                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4">{item}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {partnerOffers.map((offer) => (
                        <div key={offer.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{offer.title}</p>
                            <p className="mt-4 text-4xl font-semibold text-slate-950">{offer.price}</p>
                            <p className="mt-3 text-base leading-7 text-slate-600">{offer.description}</p>
                            <div className="mt-5 space-y-3 text-sm text-slate-700">
                                {offer.bullets.map((bullet) => (
                                    <div key={bullet} className="inline-flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-emerald-600" />
                                        {bullet}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
                    <h2 className="text-2xl font-semibold text-slate-950">Prochaine étape</h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                        Démontrer le scan, rassurer sur la gouvernance d’accès, puis ouvrir un échange sur le pilote fondateur et les besoins d’intégration locale.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/demo" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                            Ouvrir le demo hub
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/u/demo-token" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
                            Voir le scan d’urgence
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
