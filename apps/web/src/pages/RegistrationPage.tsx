import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';

const stepTitles = ['Identité', 'Infos médicales', 'Consentement'];

export function RegistrationPage() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        fullName: 'Salma El Idrissi',
        city: 'Marrakech',
        phone: '+212 6 61 44 88 12',
        bloodType: 'O+',
        allergies: 'Pénicilline, Arachides',
        conditions: 'Diabète de type 1',
        medications: 'Insuline rapide, Insuline basale',
        consent: true,
        later: true
    });

    const previewAllergies = useMemo(
        () => form.allergies.split(',').map((item) => item.trim()).filter(Boolean),
        [form.allergies]
    );

    const canAdvance = step < stepTitles.length - 1;

    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Patient registration demo"
                description="Multi-step patient registration demo for HayatID with identity, medical info, consent, and generated emergency preview."
            />
            <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-panel">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Patient onboarding</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Créer un profil d’urgence en quelques minutes.</h1>
                        <p className="mt-4 text-base leading-7 text-white/70">
                            Le flow reste simple, rassurant et progressif. Le patient comprend que certaines informations peuvent être complétées plus tard.
                        </p>
                        <div className="mt-8 space-y-4">
                            {stepTitles.map((title, index) => (
                                <div key={title} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${index <= step ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-white/60'}`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{title}</p>
                                        <p className="text-sm text-white/60">{index === step ? 'Étape active' : index < step ? 'Complétée' : 'À venir'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Étape {step + 1}</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">{stepTitles[step]}</h2>
                                </div>
                                <div className="text-sm text-slate-500">Profil demo sécurisé</div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    className="space-y-5"
                                >
                                    {step === 0 ? (
                                        <>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Nom complet</span>
                                                <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Ville</span>
                                                <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Téléphone contact principal</span>
                                                <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                        </>
                                    ) : null}

                                    {step === 1 ? (
                                        <>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Groupe sanguin</span>
                                                <input value={form.bloodType} onChange={(event) => setForm({ ...form, bloodType: event.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Allergies</span>
                                                <textarea value={form.allergies} onChange={(event) => setForm({ ...form, allergies: event.target.value })} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Conditions chroniques</span>
                                                <textarea value={form.conditions} onChange={(event) => setForm({ ...form, conditions: event.target.value })} rows={2} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">Médications</span>
                                                <textarea value={form.medications} onChange={(event) => setForm({ ...form, medications: event.target.value })} rows={2} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950" />
                                            </label>
                                        </>
                                    ) : null}

                                    {step === 2 ? (
                                        <>
                                            <label className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-canvas p-5">
                                                <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-1 h-4 w-4" />
                                                <span className="text-sm leading-7 text-slate-700">Je comprends qu’il s’agit d’un profil d’urgence et que les professionnels accèdent via un backend sécurisé, jamais directement depuis le frontend.</span>
                                            </label>
                                            <label className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-canvas p-5">
                                                <input type="checkbox" checked={form.later} onChange={(event) => setForm({ ...form, later: event.target.checked })} className="mt-1 h-4 w-4" />
                                                <span className="text-sm leading-7 text-slate-700">Je peux compléter mes informations plus tard sans bloquer la création initiale de ma carte.</span>
                                            </label>
                                            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
                                                Après inscription, une preview d’urgence est générée immédiatement pour illustrer la valeur du produit.
                                            </div>
                                        </>
                                    ) : null}
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep((current) => Math.max(0, current - 1))}
                                    disabled={step === 0}
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Retour
                                </button>
                                {canAdvance ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep((current) => Math.min(stepTitles.length - 1, current + 1))}
                                        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Suivant
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                                        Voir le dashboard
                                        <CheckCircle2 className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-950 p-3 text-white">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Emergency preview</p>
                                    <p className="text-lg font-semibold text-slate-950">Généré après inscription</p>
                                </div>
                            </div>
                            <div className="mt-6 rounded-[2rem] bg-slate-950 p-5 text-white">
                                <div className="rounded-3xl bg-emergency p-5">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">Blood type</p>
                                    <p className="mt-2 text-5xl font-semibold">{form.bloodType}</p>
                                </div>
                                <div className="mt-4 rounded-3xl bg-white/5 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Allergies</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {previewAllergies.map((allergy) => (
                                            <span key={allergy} className="rounded-full bg-allergy px-3 py-1 text-sm font-semibold text-slate-950">{allergy}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 rounded-3xl bg-white/5 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Contact</p>
                                    <p className="mt-2 text-base font-medium">{form.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
