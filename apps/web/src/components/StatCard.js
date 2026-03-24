import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function StatCard({ label, value, note }) {
    return (_jsxs(motion.article, { whileHover: { y: -6 }, transition: { type: 'spring', stiffness: 220, damping: 22 }, className: "rounded-3xl border border-sapphire/20 bg-powder/50 p-6 shadow-soft", children: [_jsx("p", { className: "text-sm font-medium text-navy/70", children: label }), _jsx("p", { className: "mt-3 text-4xl font-semibold tracking-tight text-navy", children: value }), _jsx("p", { className: "mt-3 text-sm leading-6 text-navy/75", children: note })] }));
}
