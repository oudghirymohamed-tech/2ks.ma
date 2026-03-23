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
            className="rounded-3xl border border-sapphire/20 bg-powder/50 p-6 shadow-soft"
        >
            <p className="text-sm font-medium text-navy/70">{label}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-navy">{value}</p>
            <p className="mt-3 text-sm leading-6 text-navy/75">{note}</p>
        </motion.article>
    );
}
