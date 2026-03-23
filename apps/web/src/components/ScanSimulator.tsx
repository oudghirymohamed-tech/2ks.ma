import { motion } from 'framer-motion';
import { ArrowRight, QrCode, ScanLine, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ScanSimulator() {
    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-sapphire/30 bg-navy p-5 text-white shadow-panel">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,82,186,0.28),_transparent_40%),linear-gradient(135deg,rgba(214,230,243,0.05),transparent)]" />
            <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-3xl border border-sapphire/25 bg-powder/10 p-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-powder">Live scan</p>
                        <p className="mt-2 text-lg font-semibold">Emergency card preview</p>
                    </div>
                    <QrCode className="h-8 w-8 text-powder" />
                </div>

                <div className="relative mx-auto mt-2 flex h-[360px] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[2rem] border border-sapphire/20 bg-[#00071A] p-4">
                    <div className="absolute inset-4 rounded-[1.5rem] border border-sapphire/25" />
                    <motion.div
                        initial={{ y: -120 }}
                        animate={{ y: 220 }}
                        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.4, ease: 'easeInOut' }}
                        className="absolute left-6 right-6 h-10 rounded-full bg-gradient-to-r from-transparent via-sapphire/70 to-transparent blur-sm"
                    />
                    <div className="relative flex h-full w-full flex-col rounded-[1.6rem] border border-sapphire/20 bg-[#000926] p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="rounded-full bg-emergency px-3 py-1 text-xs font-semibold">Emergency mode</span>
                            <ScanLine className="h-5 w-5 text-powder" />
                        </div>
                        <div className="rounded-3xl bg-emergency p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Blood type</p>
                            <p className="mt-2 text-5xl font-semibold">O+</p>
                        </div>
                        <div className="mt-4 rounded-3xl bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Allergies</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="rounded-full bg-allergy px-3 py-1 text-sm font-semibold text-slate-950">Pénicilline</span>
                                <span className="rounded-full bg-allergy px-3 py-1 text-sm font-semibold text-slate-950">Arachides</span>
                            </div>
                        </div>
                        <div className="mt-auto flex items-center gap-3 rounded-3xl border border-sapphire/25 bg-sapphire/15 p-4 text-sm text-ice">
                            <ShieldCheck className="h-5 w-5 shrink-0 text-powder" />
                            Level 1 professionnel via OTP pour détails avancés.
                        </div>
                    </div>
                </div>

                <Link
                    to="/u/demo-token"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sapphire px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0]"
                >
                    Open scan demo
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
