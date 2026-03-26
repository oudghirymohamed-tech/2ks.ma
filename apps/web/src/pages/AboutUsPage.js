import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, ShieldCheck, Smartphone, Users } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function AboutUsPage() {
    const points = [
        'Smart NFC-enabled medical identity',
        'Secure and structured health information access',
        'Better patient and healthcare professional interaction',
        'Modern, intuitive healthcare experience'
    ];

    const icons = [Smartphone, ShieldCheck, Users, CheckCircle2];

    return _jsx(MarketingLayout, {
        children: _jsxs('section', {
            className: 'mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20',
            children: [
                _jsx(PageMeta, {
                    title: 'About Us',
                    description: 'Learn about HayatID, our mission, and how smart digital identity improves healthcare access.'
                }),
                _jsx('p', {
                    className: 'text-sm font-semibold uppercase tracking-[0.22em] text-sapphire',
                    children: 'About Us'
                }),
                _jsx('h1', {
                    className: 'mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl',
                    children: 'Redefining medical access through smart digital identity'
                }),
                _jsx('p', {
                    className: 'mt-5 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg',
                    children: 'HayatID is a smart medical identity platform powered by 2ks technology. It is designed to make healthcare information more accessible, secure, and organized for patients and healthcare professionals.'
                }),
                _jsxs('div', {
                    className: 'mt-10 grid gap-5 lg:grid-cols-2',
                    children: [
                        _jsxs('article', {
                            className: 'rounded-[1.8rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8',
                            children: [
                                _jsx('h2', {
                                    className: 'text-2xl font-semibold text-navy sm:text-3xl',
                                    children: 'Our Mission'
                                }),
                                _jsx('p', {
                                    className: 'mt-4 text-sm leading-7 text-navy/75 sm:text-base',
                                    children: 'Our mission is to simplify medical access through a secure digital identity system connected to NFC technology, helping improve communication, speed, and trust in healthcare experiences.'
                                })
                            ]
                        }),
                        _jsxs('article', {
                            className: 'rounded-[1.8rem] border border-sapphire/15 bg-powder/25 p-6 shadow-soft sm:p-8',
                            children: [
                                _jsx('h2', {
                                    className: 'text-2xl font-semibold text-navy sm:text-3xl',
                                    children: 'What Makes HayatID Different'
                                }),
                                _jsx('div', {
                                    className: 'mt-5 grid gap-3',
                                    children: points.map((point, index) => {
                                        const Icon = icons[index];
                                        return _jsxs('div', {
                                            className: 'flex items-start gap-3 rounded-2xl border border-sapphire/15 bg-white/90 p-4',
                                            children: [
                                                _jsx('span', {
                                                    className: 'mt-0.5 rounded-xl bg-sapphire/10 p-2 text-sapphire',
                                                    children: _jsx(Icon, { className: 'h-4 w-4' })
                                                }),
                                                _jsx('p', {
                                                    className: 'text-sm leading-6 text-navy/80',
                                                    children: point
                                                })
                                            ]
                                        }, point);
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
