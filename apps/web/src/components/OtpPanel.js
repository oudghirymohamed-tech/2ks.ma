import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldPlus, Smartphone } from 'lucide-react';
import { useState } from 'react';
export function OtpPanel({ patientToken, onRequestOtp, onVerifyOtp }) {
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
    return (_jsxs("div", { className: "rounded-3xl border border-sapphire/25 bg-[#03123C] p-5 text-white", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-sapphire/25 p-3", children: _jsx(ShieldPlus, { className: "h-5 w-5 text-powder" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", children: "Acc\u00E8s professionnel" }), _jsx("p", { className: "text-sm text-white/75", children: "OTP d\u00E9mo, fallback TOTP et code d\u2019urgence en UI only." })] })] }), _jsxs("div", { className: "mt-5 space-y-3", children: [_jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-xs uppercase tracking-[0.2em] text-powder/80", children: "T\u00E9l\u00E9phone professionnel" }), _jsx("input", { value: phone, onChange: (event) => setPhone(event.target.value), className: "w-full rounded-2xl border border-sapphire/25 bg-[#00133A] px-4 py-3 text-sm outline-none ring-0 transition focus:border-sapphire" })] }), _jsxs("button", { type: "button", onClick: handleRequest, disabled: isLoading, className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sapphire/30 bg-sapphire/15 px-4 py-3 text-sm font-semibold transition hover:bg-sapphire/25 disabled:cursor-not-allowed", children: [_jsx(Smartphone, { className: "h-4 w-4" }), "Envoyer OTP demo"] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-xs uppercase tracking-[0.2em] text-powder/80", children: "Code OTP" }), _jsx("input", { value: otp, onChange: (event) => setOtp(event.target.value), className: "w-full rounded-2xl border border-sapphire/25 bg-[#00133A] px-4 py-3 text-sm outline-none transition focus:border-sapphire" })] }), _jsx("button", { type: "button", onClick: handleVerify, disabled: isLoading, className: "w-full rounded-2xl bg-call px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166D2F] disabled:cursor-not-allowed", children: "Ouvrir niveau 1" }), _jsx("div", { className: "rounded-2xl border border-call/30 bg-call/20 p-3 text-sm text-ice", children: status })] })] }));
}
