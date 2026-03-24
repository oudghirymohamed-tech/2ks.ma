import { CheckCircle2, RefreshCw, Send, ShieldCheck, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface PhoneVerificationCardProps {
    phone: string;
    onPhoneChange: (value: string) => void;
    isVerified: boolean;
    onVerifiedChange: (value: boolean) => void;
    copy?: {
        badgeTitle: string;
        helper: string;
        verifiedLabel: string;
        pendingLabel: string;
        phoneInputLabel: string;
        sendCodeButton: string;
        sendingCodeButton: string;
        codeSentMessage: string;
        verifyCodeButton: string;
        verifyingCodeButton: string;
        resendCodeButton: string;
        resendInLabel: string;
        incorrectCodeLabel: string;
        verifiedMessage: string;
    };
}

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function PhoneVerificationCard({
    phone,
    onPhoneChange,
    isVerified,
    onVerifiedChange,
    copy
}: PhoneVerificationCardProps) {
    const labels = copy ?? {
        badgeTitle: 'Vérification du numéro',
        helper: 'La vérification du téléphone est obligatoire avant la création du compte',
        verifiedLabel: 'Numéro vérifié',
        pendingLabel: 'En attente',
        phoneInputLabel: 'Entrez votre numéro de téléphone',
        sendCodeButton: 'Envoyer le code',
        sendingCodeButton: 'Envoi...',
        codeSentMessage: 'Nous avons envoyé un code à 6 chiffres',
        verifyCodeButton: 'Vérifier le code',
        verifyingCodeButton: 'Vérification...',
        resendCodeButton: 'Renvoyer le code',
        resendInLabel: 'Renvoyer dans',
        incorrectCodeLabel: 'Code incorrect',
        verifiedMessage: 'Numéro vérifié'
    };

    const [otp, setOtp] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const canSendCode = useMemo(() => phone.trim().length >= 8 && !isSending, [phone, isSending]);

    useEffect(() => {
        if (resendTimer <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setResendTimer((current) => Math.max(0, current - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);

    function resetStatusMessages() {
        setInfoMessage('');
        setErrorMessage('');
    }

    function handlePhoneChange(value: string) {
        onPhoneChange(value);

        if (isVerified) {
            onVerifiedChange(false);
        }

        setOtp('');
        setIsCodeSent(false);
        setResendTimer(0);
        resetStatusMessages();
    }

    async function handleSendCode() {
        if (!canSendCode) {
            return;
        }

        setIsSending(true);
        resetStatusMessages();

        const delay = 1000 + Math.floor(Math.random() * 1000);
        await wait(delay);

        setIsSending(false);
        setIsCodeSent(true);
        setResendTimer(30);
        onVerifiedChange(false);
        setInfoMessage('Nous avons envoyé un code à 6 chiffres');
    }

    async function handleVerifyCode() {
        if (otp.length !== 6) {
            setErrorMessage(labels.incorrectCodeLabel);
            return;
        }

        setIsVerifying(true);
        resetStatusMessages();
        await wait(500);

        if (otp === '123456') {
            onVerifiedChange(true);
            setErrorMessage('');
            setInfoMessage(labels.verifiedMessage);
        } else {
            onVerifiedChange(false);
            setErrorMessage(labels.incorrectCodeLabel);
        }

        setIsVerifying(false);
    }

    async function handleResendCode() {
        if (resendTimer > 0 || isSending) {
            return;
        }

        await handleSendCode();
    }

    return (
        <div className="rounded-[1.7rem] border border-sapphire/25 bg-powder/20 p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sapphire">{labels.badgeTitle}</p>
                    <p className="mt-2 text-sm leading-6 text-navy/75">
                        {labels.helper}
                    </p>
                </div>
                {isVerified ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-call/35 bg-call/20 px-3 py-1 text-xs font-semibold text-call">
                        <CheckCircle2 className="h-4 w-4" />
                        {labels.verifiedLabel}
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-sapphire/25 bg-sapphire/10 px-3 py-1 text-xs font-semibold text-sapphire">
                        <ShieldCheck className="h-4 w-4" />
                        {labels.pendingLabel}
                    </span>
                )}
            </div>

            <div className="mt-5 space-y-4">
                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-navy">{labels.phoneInputLabel}</span>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            value={phone}
                            onChange={(event) => handlePhoneChange(event.target.value)}
                            className="w-full rounded-2xl border border-sapphire/25 bg-white px-4 py-3 outline-none transition focus:border-sapphire"
                        />
                        <button
                            type="button"
                            onClick={handleSendCode}
                            disabled={!canSendCode}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-sapphire px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                            {isSending ? labels.sendingCodeButton : labels.sendCodeButton}
                        </button>
                    </div>
                </label>

                {isCodeSent ? (
                    <div className="rounded-2xl border border-sapphire/20 bg-sapphire/10 p-4">
                        <p className="text-sm font-medium text-sapphire">{labels.codeSentMessage}</p>
                        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                            <input
                                value={otp}
                                onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="123456"
                                inputMode="numeric"
                                className="w-full rounded-2xl border border-sapphire/25 bg-white px-4 py-3 tracking-[0.3em] outline-none transition focus:border-sapphire"
                            />
                            <button
                                type="button"
                                onClick={handleVerifyCode}
                                disabled={isVerifying}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-call px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166D2F] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isVerifying ? labels.verifyingCodeButton : labels.verifyCodeButton}
                            </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={resendTimer > 0 || isSending}
                                className="inline-flex items-center gap-2 rounded-full border border-sapphire/30 bg-white px-3 py-1.5 text-xs font-semibold text-sapphire transition hover:bg-powder/30 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <RefreshCw className="h-3.5 w-3.5" />
                                {labels.resendCodeButton}
                            </button>
                            {resendTimer > 0 ? <p className="text-xs text-navy/65">{labels.resendInLabel} {resendTimer}s</p> : null}
                        </div>
                    </div>
                ) : null}

                {errorMessage ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-emergency/35 bg-emergency/15 px-4 py-2 text-sm font-semibold text-emergency">
                        <XCircle className="h-4 w-4" />
                        {errorMessage}
                    </div>
                ) : null}

                {infoMessage && !errorMessage ? (
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${isVerified ? 'border border-call/35 bg-call/20 text-call' : 'border border-sapphire/30 bg-sapphire/10 text-sapphire'}`}>
                        <CheckCircle2 className="h-4 w-4" />
                        {infoMessage}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
