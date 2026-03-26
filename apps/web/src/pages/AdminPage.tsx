import { Check, Search, ShieldAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { getPendingKyc, getSuspiciousAccess, validateKyc } from '../services/api';
import { formatDate } from '../utils/format';

interface PendingKycItem {
    professionalId: string;
    name: string;
    role: string;
    submittedAt: string;
    clinic: string;
}

interface SuspiciousItem {
    id: string;
    patient: string;
    actor: string;
    location: string;
    timestamp: string;
    reason: string;
}

export function AdminPage() {
    const [queue, setQueue] = useState<PendingKycItem[]>([]);
    const [suspicious, setSuspicious] = useState<SuspiciousItem[]>([]);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        getPendingKyc().then((data) => setQueue(data as PendingKycItem[]));
        getSuspiciousAccess().then((data) => setSuspicious(data as SuspiciousItem[]));
    }, []);

    async function handleDecision(professionalId: string, decision: 'validated' | 'rejected') {
        const result = await validateKyc(professionalId, decision);
        setStatusMessage(`KYC ${result.status} for ${professionalId}`);
        setQueue((current) => current.filter((item) => item.professionalId !== professionalId));
    }

    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Admin operations"
                description="Admin interface with pending KYC validation queue, patient access request form, and suspicious recent access monitoring."
            />
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Admin operations</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Operational trust layer</h1>
                    </div>
                    {statusMessage ? <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">{statusMessage}</div> : null}
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Pending KYC queue</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">Professionnels à valider</h2>
                                </div>
                                <span className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-slate-700">{queue.length} en attente</span>
                            </div>
                            <div className="mt-6 space-y-4">
                                {queue.map((item) => (
                                    <div key={item.professionalId} className="rounded-[1.5rem] border border-slate-200 bg-canvas p-5">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                                                <p className="mt-1 text-sm text-slate-600">{item.role} · {item.clinic}</p>
                                                <p className="mt-2 text-sm text-slate-500">Soumis le {formatDate(item.submittedAt)}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => handleDecision(item.professionalId, 'validated')} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                                                    <Check className="h-4 w-4" />
                                                    Valider
                                                </button>
                                                <button type="button" onClick={() => handleDecision(item.professionalId, 'rejected')} className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-white">
                                                    <X className="h-4 w-4" />
                                                    Rejeter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Patient access request</p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Recherche opérateur</h2>
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <input placeholder="Patient token" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                <input placeholder="Motif de consultation" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                            </div>
                            <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                                <Search className="h-4 w-4" />
                                Ouvrir une demande
                            </button>
                        </article>
                    </div>

                    <div className="space-y-6">
                        <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-panel">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="h-5 w-5 text-emerald-300" />
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Suspicious recent access</p>
                                    <p className="text-xl font-semibold">Monitoring panel</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {suspicious.map((item) => (
                                    <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                                        <p className="font-medium text-white">{item.patient}</p>
                                        <p className="mt-1 text-sm text-white/70">{item.actor} · {item.location}</p>
                                        <p className="mt-2 text-sm text-white/55">{item.reason}</p>
                                        <p className="mt-2 text-sm text-emerald-200">{formatDate(item.timestamp)}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Internal posture</p>
                            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                                <div className="rounded-3xl bg-canvas p-4">Admin view is intentionally scoped and avoids direct credential or patient-level privileged actions from the frontend.</div>
                                <div className="rounded-3xl bg-canvas p-4">Real production escalation would require audited actions, role policy enforcement, and backend-only access to protected records.</div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
