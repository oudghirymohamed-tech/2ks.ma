import { motion } from 'framer-motion';

interface StatCardProps {
    label: string;
    value: string;
    note: string;
}

export function StatCard({ label, value, note }: StatCardProps) {
    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="rounded-3xl border border-white/60 bg-white p-6 shadow-soft"
        >
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{note}</p>
        </motion.article>
    );
}
