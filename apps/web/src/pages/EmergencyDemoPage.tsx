import { AlertTriangle, LockKeyhole, PhoneCall, ShieldAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OtpPanel } from '../components/OtpPanel';
import { PageMeta } from '../components/PageMeta';
import { getPublicEmergencyProfile, requestProfessionalOtp, verifyProfessionalOtp } from '../services/api';
import type { PublicEmergencyResponse } from '../types/demo';

export function EmergencyDemoPage() {
    const { token = 'demo-token' } = useParams();
    const [profile, setProfile] = useState<PublicEmergencyResponse | null>(null);
    const [levelOneOpen, setLevelOneOpen] = useState(false);

    useEffect(() => {
        getPublicEmergencyProfile(token).then(setProfile);
    }, [token]);

    async function handleVerify(otp: string) {
        const result = await verifyProfessionalOtp(otp, 'pro-demo-1', token);
        setLevelOneOpen(result.status === 'verified');
        return { status: result.status };
    }

    if (!profile) {
        return <div className="min-h-screen bg-shell px-6 py-20 text-white">Chargement du profil d’urgence...</div>;
    }

    const patient = profile.patient;
    const details = [
        { title: 'Implants', values: patient.medicalProfile.implants },
        { title: 'Conditions chroniques', values: patient.medicalProfile.chronicConditions },
        { title: 'Médications', values: patient.medicalProfile.medications }
    ];

    return (
        <div className="min-h-screen bg-shell text-white">
            <PageMeta
                title="HayatID | Emergency scan demo"
                description="Mobile-first emergency scan demo with blood type, allergies, instructions, emergency contact, and professional OTP level access."
            />
            <main className="mx-auto max-w-xl px-4 pb-28 pt-4 sm:px-6">
                <section className="sticky top-0 z-20 -mx-4 border-b border-white/10 bg-shell/95 px-4 pb-4 pt-2 backdrop-blur sm:-mx-6 sm:px-6">
                    <div className="rounded-[1.8rem] bg-emergency p-5 shadow-panel">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">Emergency access</p>
                        <h1 className="mt-3 text-2xl font-semibold">Vital profile visible immediately</h1>
                        <p className="mt-2 text-sm leading-6 text-white/80">Demo data only. Public emergency level shown below.</p>
                    </div>
                </section>

                {patient.isMinor && patient.guardianRelationship ? (
                    <section className="mt-4 rounded-[1.6rem] bg-minor p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Patient mineur</p>
                        <p className="mt-2 text-base font-semibold">Contacter le représentant légal: {patient.guardianRelationship.guardianName}</p>
                        <p className="mt-1 text-sm text-white/80">{patient.guardianRelationship.relation} · {patient.guardianRelationship.phone}</p>
                    </section>
                ) : null}

                <section className="mt-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Blood type</p>
                    <p className="mt-3 text-7xl font-semibold leading-none text-white">{patient.medicalProfile.bloodType}</p>
                </section>

                <section className="mt-4 rounded-[2rem] border border-orange-400/20 bg-orange-400/10 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-orange-200">Allergies</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {patient.medicalProfile.allergies.map((allergy) => (
                            <span key={allergy} className="rounded-full bg-allergy px-3 py-1.5 text-sm font-semibold text-slate-950">{allergy}</span>
                        ))}
                    </div>
                </section>

                {patient.medicalProfile.g6pd ? (
                    <section className="mt-4 rounded-[1.6rem] border border-amber-400/20 bg-amber-400/10 p-5 text-amber-50">
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Alerte G6PD</p>
                        <p className="mt-2 text-base font-semibold">Déficit G6PD signalé. Vérifier avant administration de molécules à risque.</p>
                    </section>
                ) : null}

                {details.map((detail) => (
                    <section key={detail.title} className="mt-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/45">{detail.title}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {detail.values.length > 0 ? (
                                detail.values.map((value) => (
                                    <span key={value} className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">{value}</span>
                                ))
                            ) : (
                                <span className="text-sm text-white/60">Aucun élément déclaré.</span>
                            )}
                        </div>
                    </section>
                ))}

                <section className="mt-4 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
                    <div className="flex items-center gap-3 text-emerald-100">
                        <ShieldAlert className="h-5 w-5" />
                        <p className="text-sm font-semibold uppercase tracking-[0.22em]">Instructions pour témoin</p>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-emerald-50/90">
                        {patient.medicalProfile.emergencyInstructions.map((instruction) => (
                            <li key={instruction} className="rounded-2xl bg-black/10 px-4 py-3">{instruction}</li>
                        ))}
                    </ul>
                </section>

                <section className="mt-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75">
                    <p className="font-semibold text-white">Medical disclaimer</p>
                    <p className="mt-2">Ces informations sont fournies à titre d’aide d’urgence et ne remplacent pas une évaluation médicale. Vérifier toute décision clinique selon le contexte réel.</p>
                </section>

                <section className="mt-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Emergency contact</p>
                    <p className="mt-3 text-xl font-semibold">{patient.emergencyContact.name}</p>
                    <p className="mt-1 text-sm text-white/70">{patient.emergencyContact.relation}</p>
                    <a href={`tel:${patient.emergencyContact.phone.replace(/\s/g, '')}`} className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                        {patient.emergencyContact.phone}
                    </a>
                </section>

                <section className="mt-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Advance directives</p>
                    <p className="mt-3 text-sm leading-7 text-white/75">{patient.medicalProfile.advanceDirectives}</p>
                </section>

                <section className="mt-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <button
                        type="button"
                        onClick={() => setLevelOneOpen((current) => !current)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80"
                    >
                        <LockKeyhole className="h-4 w-4" />
                        Accès professionnel
                    </button>
                    <p className="mt-2 text-sm leading-6 text-white/55">Secondaire et discret par défaut. Déverrouillage demo via OTP code 2026.</p>
                    <div className="mt-4">
                        <OtpPanel patientToken={token} onRequestOtp={requestProfessionalOtp} onVerifyOtp={handleVerify} />
                    </div>
                    {levelOneOpen ? (
                        <div className="mt-4 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-50">
                            Niveau 1 ouvert. Dans un vrai produit, ce contenu viendrait exclusivement d’un backend vérifié avec audit renforcé.
                        </div>
                    ) : null}
                </section>

                <Link to="/demo" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70">
                    <AlertTriangle className="h-4 w-4" />
                    Retour au hub de démonstration
                </Link>
            </main>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-shell/95 p-4 backdrop-blur">
                <div className="mx-auto max-w-xl">
                    <a
                        href="tel:112"
                        className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-call px-6 text-base font-semibold text-white shadow-panel"
                    >
                        <PhoneCall className="h-5 w-5" />
                        Call emergency
                    </a>
                </div>
            </div>
        </div>
    );
}
