import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function SectionHeading({ eyebrow, title, body, align = 'left', aside }) {
    return (_jsxs("div", { className: `flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'}`, children: [_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.4 }, transition: { duration: 0.45 }, className: "max-w-3xl", children: [_jsx("p", { className: "mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sapphire", children: eyebrow }), _jsx("h2", { className: "text-3xl font-semibold tracking-tight text-navy sm:text-4xl", children: title }), _jsx("p", { className: "mt-4 text-base leading-7 text-navy/75 sm:text-lg", children: body })] }), aside ? _jsx("div", { children: aside }) : null] }));
}
