import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, CircleCheckBig, ShieldCheck, Smartphone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function HowItWorksPage() {
    const steps = [
        {
            title: 'Step 1: Tap the NFC Card',
            text: 'The user taps the HayatID card using a compatible smartphone.',
            icon: Smartphone
        },
        {
            title: 'Step 2: Access the Secure Profile',
            text: 'The platform opens a secure digital medical identity experience linked to the patient profile.',
            icon: ShieldCheck
        },
        {
            title: 'Step 3: View Essential Information',
            text: 'Relevant medical information becomes available in a clear, structured, and professional interface.',
            icon: CircleCheckBig
        },
        {
            title: 'Step 4: Continue to the Full Platform',
            text: 'Users and healthcare professionals can continue to the full platform for broader access and management.',
            icon: Users
        }
    ];

    return _jsx(MarketingLayout, {
        children: _jsxs('section', {
            className: 'mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20',
            children: [
                _jsx(PageMeta, {
                    title: 'How It Works',
                    description: 'See how HayatID links NFC identity with secure medical access in a simple step-by-step flow.'
                }),
                _jsx('p', {
                    className: 'text-sm font-semibold uppercase tracking-[0.22em] text-sapphire',
                    children: 'How It Works'
                }),
                _jsx('h1', {
                    className: 'mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl',
                    children: 'A seamless journey from NFC tap to secure medical access'
                }),
                _jsx('p', {
                    className: 'mt-5 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg',
                    children: 'HayatID connects a smart NFC card with a secure digital platform, allowing essential medical information to be accessed quickly and efficiently.'
                }),
                _jsx('div', {
                    className: 'mt-10 grid gap-5 md:grid-cols-2',
                    children: steps.map((step) => {
                        const Icon = step.icon;
                        return _jsxs('article', {
                            className: 'rounded-[1.8rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft',
                            children: [
                                _jsx('span', {
                                    className: 'inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire',
                                    children: _jsx(Icon, { className: 'h-5 w-5' })
                                }),
                                _jsx('h2', {
                                    className: 'mt-4 text-2xl font-semibold text-navy',
                                    children: step.title
                                }),
                                _jsx('p', {
                                    className: 'mt-3 text-sm leading-7 text-navy/75 sm:text-base',
                                    children: step.text
                                })
                            ]
                        }, step.title);
                    })
                }),
                _jsxs('div', {
                    className: 'mt-10 rounded-[2rem] bg-navy p-7 text-white sm:p-8',
                    children: [
                        _jsx('h2', {
                            className: 'text-2xl font-semibold sm:text-3xl',
                            children: 'Ready to explore the experience?'
                        }),
                        _jsxs('div', {
                            className: 'mt-5 flex flex-wrap gap-3',
                            children: [
                                _jsxs(Link, {
                                    to: '/contact',
                                    className: 'inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100',
                                    children: ['Contact our team', _jsx(ArrowRight, { className: 'h-4 w-4' })]
                                }),
                                _jsxs(Link, {
                                    to: '/',
                                    className: 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15',
                                    children: ['Back to home', _jsx(ArrowRight, { className: 'h-4 w-4' })]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
