import { BadgeCheck, Clock3, ShieldCheck, TimerReset } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { getActiveDelegations, getProfessionalAccessHistory, getProfessionalMe } from '../services/api';
import type { AccessLog, Professional } from '../types/demo';
import { formatDate } from '../utils/format';

export function ProfessionalDashboardPage() {
    const [professional, setProfessional] = useState<Professional | null>(null);
    const [history, setHistory] = useState<AccessLog[]>([]);
    const [delegations, setDelegations] = useState<Professional['activeDelegations']>([]);

    useEffect(() => {
        getProfessionalMe().then(setProfessional);
        getProfessionalAccessHistory().then((data) => setHistory(data as AccessLog[]));
        getActiveDelegations().then((data) => setDelegations(data as Professional['activeDelegations']));
    }, []);

    if (!professional) {
        return <MarketingLayout><div className="px-6 py-20">Chargement du dashboard professionnel...</div></MarketingLayout>;
    }

    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Professional dashboard demo"
                description="Professional dashboard demo with KYC status, access history, active delegations, and realistic emergency access states."
            />
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Professional dashboard</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{professional.fullName}</h1>
                        <p className="mt-4 text-base leading-7 text-slate-600">{professional.profession} · Région {professional.licenseRegion}</p>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                <p className="mt-4 text-sm text-slate-500">KYC status</p>
                                <p className="mt-1 text-2xl font-semibold text-slate-950">{professional.kycStatus}</p>
                            </div>
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <BadgeCheck className="h-6 w-6 text-emerald-600" />
                                <p className="mt-4 text-sm text-slate-500">Accesses this month</p>
                                <p className="mt-1 text-2xl font-semibold text-slate-950">{history.length}</p>
                            </div>
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <Clock3 className="h-6 w-6 text-emerald-600" />
                                <p className="mt-4 text-sm text-slate-500">Active delegations</p>
                                <p className="mt-1 text-2xl font-semibold text-slate-950">{delegations.length}</p>
                            </div>
                        </div>

                        <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Access history</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">Journal des accès</h2>
                                </div>
                                <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Audit demo</div>
                            </div>
                            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                                    <thead className="bg-canvas text-slate-500">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Acteur</th>
                                            <th className="px-4 py-3 font-medium">Lieu</th>
                                            <th className="px-4 py-3 font-medium">Niveau</th>
                                            <th className="px-4 py-3 font-medium">Horodatage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {history.map((entry) => (
                                            <tr key={entry.id}>
                                                <td className="px-4 py-4 font-medium text-slate-950">{entry.actor}</td>
                                                <td className="px-4 py-4 text-slate-600">{entry.location}</td>
                                                <td className="px-4 py-4 text-slate-600">{entry.accessLevel}</td>
                                                <td className="px-4 py-4 text-slate-600">{formatDate(entry.timestamp)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </article>
                    </div>

                    <div className="space-y-6">
                        <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-panel">
                            <div className="flex items-center gap-3">
                                <TimerReset className="h-5 w-5 text-emerald-300" />
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Active delegation</p>
                                    <p className="text-xl font-semibold">Patients autorisés temporairement</p>
                                </div>
                            </div>
                            <div className="mt-5 space-y-4">
                                {delegations.map((delegation) => (
                                    <div key={delegation.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                                        <p className="font-medium text-white">{delegation.patientName}</p>
                                        <p className="mt-1 text-sm text-white/65">{delegation.scope}</p>
                                        <p className="mt-2 text-sm text-emerald-200">Expire: {formatDate(delegation.expiresAt)}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Fallback states</p>
                            <div className="mt-5 grid gap-4">
                                {[
                                    ['OTP', 'Validé sur mobile professionnel'],
                                    ['TOTP', 'État visuel disponible pour futur hardening'],
                                    ['Emergency code', 'Mode exceptionnel UI only pour démonstration']
                                ].map(([title, body]) => (
                                    <div key={title} className="rounded-3xl border border-slate-200 bg-canvas p-4">
                                        <p className="font-medium text-slate-950">{title}</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
