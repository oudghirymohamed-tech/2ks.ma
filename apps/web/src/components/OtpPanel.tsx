import { ShieldPlus, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface OtpPanelProps {
    patientToken: string;
    onRequestOtp: (phone: string, token: string) => Promise<{ message?: string; reference?: string }>;
    onVerifyOtp: (otp: string) => Promise<{ status: string }>;
}

export function OtpPanel({ patientToken, onRequestOtp, onVerifyOtp }: OtpPanelProps) {
    const [phone, setPhone] = useState('+212611223344');
    const [otp, setOtp] = useState('2026');
    const [status, setStatus] = useState('Envoyer un OTP de démonstration pour ouvrir le niveau 1.');
    const [isLoading, setIsLoading] = useState(false);

    async function handleRequest() {
        setIsLoading(true);
        const response = await onRequestOtp(phone, patientToken);
        setStatus(response.message ?? 'OTP envoyé.');
        setIsLoading(false);
    }

    async function handleVerify() {
        setIsLoading(true);
        const response = await onVerifyOtp(otp);
        setStatus(response.status === 'verified' ? 'Accès niveau 1 accordé.' : 'OTP invalide.');
        setIsLoading(false);
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
            <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                    <ShieldPlus className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                    <p className="text-sm font-semibold">Accès professionnel</p>
                    <p className="text-sm text-white/60">OTP démo, fallback TOTP et code d’urgence en UI only.</p>
                </div>
            </div>
            <div className="mt-5 space-y-3">
                <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">Téléphone professionnel</span>
                    <input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#101826] px-4 py-3 text-sm outline-none ring-0 transition focus:border-emerald-300"
                    />
                </label>
                <button
                    type="button"
                    onClick={handleRequest}
                    disabled={isLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15 disabled:cursor-not-allowed"
                >
                    <Smartphone className="h-4 w-4" />
                    Envoyer OTP demo
                </button>
                <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50">Code OTP</span>
                    <input
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#101826] px-4 py-3 text-sm outline-none transition focus:border-emerald-300"
                    />
                </label>
                <button
                    type="button"
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed"
                >
                    Ouvrir niveau 1
                </button>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-100">{status}</div>
            </div>
        </div>
    );
}
