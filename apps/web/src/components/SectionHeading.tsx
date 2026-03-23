import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    body: string;
    align?: 'left' | 'center';
    aside?: ReactNode;
}

export function SectionHeading({ eyebrow, title, body, align = 'left', aside }: SectionHeadingProps) {
    return (
        <div className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45 }}
                className="max-w-3xl"
            >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sapphire">{eyebrow}</p>
                <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h2>
                <p className="mt-4 text-base leading-7 text-navy/75 sm:text-lg">{body}</p>
            </motion.div>
            {aside ? <div>{aside}</div> : null}
        </div>
    );
}
