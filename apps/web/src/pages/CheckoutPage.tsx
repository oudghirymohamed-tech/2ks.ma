import { motion, AnimatePresence } from 'framer-motion';
import {
    BadgeCheck,
    CreditCard,
    Phone,
    ShieldCheck,
    Smartphone,
    Wallet,
    ArrowRight,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { PageMeta } from '../components/PageMeta';

const PRODUCT_PRICE = '299 MAD';
const WHATSAPP_URL =
    'https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20commander%20une%20carte%20NFC%202KS';
const PHONE_URL = 'tel:+212600000000';

const benefits = [
    "Accès d'urgence rapide",
    'Profil médical sécurisé',
    'Carte NFC personnalisée',
];

const paymentMethods = [
    { id: 'card', label: 'Carte bancaire', Icon: CreditCard },
    { id: 'paypal', label: 'PayPal', Icon: Wallet },
    { id: 'mobile', label: 'Apple Pay / Google Pay', Icon: Smartphone },
];

type PayState = 'idle' | 'loading' | 'success';

export function CheckoutPage() {
    const [selectedMethod, setSelectedMethod] = useState<string>('card');
    const [payState, setPayState] = useState<PayState>('idle');

    function handlePay() {
        if (payState !== 'idle') return;
        setPayState('loading');
        const delay = 1000 + Math.random() * 800;
        setTimeout(() => setPayState('success'), delay);
    }

    return (
        <MarketingLayout>
            <PageMeta
                title="Commander ma carte NFC | HayatID"
                description="Commandez votre carte NFC médicale HayatID pour un accès d'urgence rapide et sécurisé à vos informations de santé."
            />

            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="mb-10 text-center">
                    <span className="inline-flex rounded-full border border-sapphire/30 bg-powder/45 px-4 py-2 text-sm font-semibold text-sapphire shadow-sm">
                        Commande
                    </span>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        Commander ma carte NFC
                    </h1>
                    <p className="mt-3 text-lg text-navy/70">
                        Choisissez votre méthode de commande préférée
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
                    {/* ── Product card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-start rounded-[2rem] border border-sapphire/20 bg-powder/40 p-7 shadow-soft"
                    >
                        <div className="inline-flex rounded-2xl bg-sapphire/10 p-4">
                            <ShieldCheck className="h-7 w-7 text-sapphire" />
                        </div>
                        <h2 className="mt-5 text-2xl font-semibold text-navy">
                            Carte NFC médicale
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-navy/70">
                            Accès rapide aux informations médicales en cas d'urgence
                        </p>

                        <ul className="mt-6 flex flex-col gap-3">
                            {benefits.map((b) => (
                                <li key={b} className="flex items-center gap-3 text-sm text-navy/85">
                                    <BadgeCheck className="h-4 w-4 shrink-0 text-sapphire" />
                                    {b}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 border-t border-sapphire/15 pt-6">
                            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50">
                                Prix
                            </p>
                            <p className="mt-1 text-3xl font-semibold text-navy">
                                {PRODUCT_PRICE}
                            </p>
                            <p className="mt-1 text-xs text-navy/55">
                                Livraison incluse · Paiement sécurisé
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Right column ── */}
                    <div className="flex flex-col gap-5">
                        {/* ─── SECTION A — Online payment ─── */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="rounded-[2rem] border border-sapphire/20 bg-white/60 p-7 shadow-soft backdrop-blur"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sapphire">
                                Paiement en ligne
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-navy">
                                Méthode de paiement
                            </h3>

                            <AnimatePresence mode="wait">
                                {payState !== 'success' ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {/* Method selector */}
                                        <div className="mt-5 flex flex-col gap-3">
                                            {paymentMethods.map(({ id, label, Icon }) => (
                                                <button
                                                    key={id}
                                                    onClick={() => setSelectedMethod(id)}
                                                    className={[
                                                        'flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition',
                                                        selectedMethod === id
                                                            ? 'border-sapphire bg-sapphire/8 shadow-md'
                                                            : 'border-sapphire/20 bg-powder/20 hover:border-sapphire/50',
                                                    ].join(' ')}
                                                >
                                                    <div
                                                        className={[
                                                            'flex h-9 w-9 items-center justify-center rounded-xl',
                                                            selectedMethod === id
                                                                ? 'bg-sapphire text-white'
                                                                : 'bg-powder/60 text-navy/60',
                                                        ].join(' ')}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span
                                                        className={[
                                                            'text-sm font-medium',
                                                            selectedMethod === id
                                                                ? 'text-sapphire'
                                                                : 'text-navy/75',
                                                        ].join(' ')}
                                                    >
                                                        {label}
                                                    </span>
                                                    {selectedMethod === id && (
                                                        <CheckCircle2 className="ml-auto h-4 w-4 text-sapphire" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Pay button */}
                                        <button
                                            onClick={handlePay}
                                            disabled={payState === 'loading'}
                                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-sapphire px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0C43A0] disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {payState === 'loading' ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Traitement en cours…
                                                </>
                                            ) : (
                                                <>
                                                    Payer maintenant · {PRODUCT_PRICE}
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>

                                        <p className="mt-3 text-center text-xs text-navy/45">
                                            Simulation de paiement — aucune donnée bancaire requise
                                        </p>
                                    </motion.div>
                                ) : (
                                    /* Success state */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-call/30 bg-call/8 px-6 py-8 text-center"
                                    >
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-call/15">
                                            <CheckCircle2 className="h-7 w-7 text-call" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-navy">
                                                Paiement confirmé
                                            </p>
                                            <p className="mt-1 text-sm text-navy/65">
                                                Votre carte a bien été commandée
                                            </p>
                                        </div>
                                        <Link
                                            to="/register"
                                            className="mt-2 inline-flex items-center gap-2 rounded-full bg-sapphire px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0]"
                                        >
                                            Créer mon compte
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* ─── SECTION B — Contact order ─── */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.16 }}
                            className="rounded-[2rem] border border-sapphire/20 bg-white/60 p-7 shadow-soft backdrop-blur"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sapphire">
                                Commander via contact
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-navy">
                                Vous préférez nous contacter directement ?
                            </h3>
                            <p className="mt-1 text-sm text-navy/65">
                                Vous pouvez également commander votre carte directement
                            </p>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                {/* WhatsApp */}
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-call px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#156E2F]"
                                >
                                    {/* WhatsApp SVG icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Commander via WhatsApp
                                </a>

                                {/* Phone */}
                                <a
                                    href={PHONE_URL}
                                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-sapphire/30 bg-powder/40 px-5 py-4 text-sm font-semibold text-navy transition hover:border-sapphire hover:bg-powder/60"
                                >
                                    <Phone className="h-4 w-4 text-sapphire" />
                                    Appeler maintenant
                                </a>
                            </div>

                            <p className="mt-4 text-center text-xs font-medium text-navy/55">
                                Support disponible · Livraison rapide
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
