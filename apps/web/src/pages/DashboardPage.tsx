import { Download, Lock, QrCode, ShieldAlert, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { getPatientProfile, revokeCard } from '../services/api';
import type { Patient } from '../types/demo';
import { formatDate } from '../utils/format';

export function DashboardPage() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [cardMessage, setCardMessage] = useState('Carte active');

    useEffect(() => {
        getPatientProfile('demo-patient-a').then(setPatient);
    }, []);

    async function handleRevoke() {
        if (!patient) {
            return;
        }

        const result = await revokeCard(patient.nfcCard.id);
        setCardMessage(`Carte ${result.status}`);
        setPatient({ ...patient, nfcCard: { ...patient.nfcCard, status: 'revoked' } });
    }

    if (!patient) {
        return <MarketingLayout><div className="px-6 py-20">Chargement du dashboard patient...</div></MarketingLayout>;
    }

    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Patient dashboard demo"
                description="Patient dashboard demo with QR card preview, NFC status, access timeline, privacy actions, and editable emergency summary cards."
            />
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Patient dashboard</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Bonjour, {patient.fullName}.</h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                            Cette vue montre comment le patient garde la main sur sa carte, son résumé médical et l’historique des accès professionnels.
                        </p>

                        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Complétion du profil</p>
                                    <p className="mt-2 text-3xl font-semibold text-slate-950">{patient.profileCompletion}%</p>
                                </div>
                                <div className="text-right text-sm text-slate-500">Certaines données peuvent être ajoutées plus tard.</div>
                            </div>
                            <div className="mt-5 h-3 rounded-full bg-slate-100">
                                <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{ width: `${patient.profileCompletion}%` }} />
                            </div>
                        </div>

                        <div className="mt-8 grid gap-6 xl:grid-cols-2">
                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">QR card preview</p>
                                        <h2 className="mt-2 text-xl font-semibold text-slate-950">Carte d’urgence</h2>
                                    </div>
                                    <QrCode className="h-6 w-6 text-slate-900" />
                                </div>
                                <div className="mt-5 rounded-[1.75rem] bg-slate-950 p-6 text-white">
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">QR token</p>
                                    <p className="mt-3 text-2xl font-semibold">{patient.nfcCard.qrToken}</p>
                                    <p className="mt-4 text-sm text-white/65">Dernier scan: {formatDate(patient.nfcCard.lastScannedAt)}</p>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">
                                        <Download className="h-4 w-4" />
                                        Télécharger le QR
                                    </button>
                                    <button type="button" onClick={handleRevoke} className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2.5 text-sm font-semibold text-white">
                                        <Trash2 className="h-4 w-4" />
                                        Révoquer la carte
                                    </button>
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">NFC status</p>
                                <h2 className="mt-2 text-xl font-semibold text-slate-950">{cardMessage}</h2>
                                <div className="mt-5 space-y-4">
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-4">
                                        <p className="text-sm text-slate-500">Émise le</p>
                                        <p className="mt-1 font-semibold text-slate-950">{formatDate(patient.nfcCard.issuedAt)}</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-4">
                                        <p className="text-sm text-slate-500">Statut</p>
                                        <p className="mt-1 font-semibold capitalize text-slate-950">{patient.nfcCard.status}</p>
                                    </div>
                                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
                                        Révocation demo uniquement. En production, cette action serait journalisée côté backend avec confirmation forte.
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className="mt-8 grid gap-6 xl:grid-cols-2">
                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <h2 className="text-xl font-semibold text-slate-950">Résumé médical</h2>
                                <div className="mt-5 space-y-4">
                                    <div className="rounded-3xl bg-canvas p-4">
                                        <p className="text-sm text-slate-500">Allergies</p>
                                        <p className="mt-1 font-medium text-slate-950">{patient.medicalProfile.allergies.join(', ')}</p>
                                    </div>
                                    <div className="rounded-3xl bg-canvas p-4">
                                        <p className="text-sm text-slate-500">Conditions chroniques</p>
                                        <p className="mt-1 font-medium text-slate-950">{patient.medicalProfile.chronicConditions.join(', ')}</p>
                                    </div>
                                    <div className="rounded-3xl bg-canvas p-4">
                                        <p className="text-sm text-slate-500">Médications</p>
                                        <p className="mt-1 font-medium text-slate-950">{patient.medicalProfile.medications.join(', ')}</p>
                                    </div>
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <h2 className="text-xl font-semibold text-slate-950">Droits et confidentialité</h2>
                                <div className="mt-5 space-y-4">
                                    {[
                                        ['Exporter mes données', 'Préparer une exportation structurée pour usage patient.'],
                                        ['Voir les accès', 'Comprendre qui a consulté mon profil et quand.'],
                                        ['Réviser les consentements', 'Gérer les autorisations non urgentes.']
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

                    <div className="space-y-6">
                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-950 p-3 text-white">
                                    <ShieldAlert className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Access history</p>
                                    <p className="text-xl font-semibold text-slate-950">Timeline patient</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {patient.accessLogs.map((log) => (
                                    <div key={log.id} className="relative rounded-3xl border border-slate-200 bg-canvas p-4 pl-6">
                                        <div className="absolute left-0 top-6 h-10 w-1 rounded-full bg-emerald-500" />
                                        <p className="font-medium text-slate-950">{log.actor}</p>
                                        <p className="mt-1 text-sm text-slate-500">{log.role} · {log.location}</p>
                                        <p className="mt-2 text-sm text-slate-600">{formatDate(log.timestamp)}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-panel">
                            <div className="flex items-center gap-3">
                                <Lock className="h-5 w-5 text-emerald-300" />
                                <p className="font-semibold">Architecture privacy-first</p>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-white/70">
                                Les données sensibles sont supposées transiter via l’API backend. Le frontend affiche uniquement les réponses mockées d’un service qui simule cette architecture future.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
