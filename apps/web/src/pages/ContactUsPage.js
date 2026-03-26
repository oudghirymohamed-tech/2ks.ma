import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function ContactUsPage() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
    }

    return _jsx(MarketingLayout, {
        children: _jsxs('section', {
            className: 'mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20',
            children: [
                _jsx(PageMeta, {
                    title: 'Contact Us',
                    description: 'Contact the HayatID team for partnerships, technology collaboration, and product questions.'
                }),
                _jsx('p', {
                    className: 'text-sm font-semibold uppercase tracking-[0.22em] text-sapphire',
                    children: 'Contact Us'
                }),
                _jsx('h1', {
                    className: 'mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl',
                    children: 'Let\'s connect around smarter healthcare access'
                }),
                _jsx('p', {
                    className: 'mt-5 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg',
                    children: 'We would love to hear from you. Whether you are interested in HayatID, partnerships, technology, or product questions, our team is here to help.'
                }),
                _jsxs('div', {
                    className: 'mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]',
                    children: [
                        _jsxs('article', {
                            className: 'rounded-[2rem] border border-sapphire/15 bg-white/80 p-7 shadow-soft sm:p-8',
                            children: [
                                _jsx('h2', {
                                    className: 'text-2xl font-semibold text-navy',
                                    children: 'Send us a message'
                                }),
                                _jsx('form', {
                                    onSubmit: handleSubmit,
                                    className: 'mt-6 space-y-4',
                                    children: _jsxs(_jsx.Fragment, {
                                        children: [
                                            _jsxs('label', {
                                                className: 'block',
                                                children: [
                                                    _jsx('span', { className: 'mb-2 block text-sm font-medium text-navy', children: 'Full Name' }),
                                                    _jsx('input', { required: true, className: 'w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire' })
                                                ]
                                            }),
                                            _jsxs('label', {
                                                className: 'block',
                                                children: [
                                                    _jsx('span', { className: 'mb-2 block text-sm font-medium text-navy', children: 'Email Address' }),
                                                    _jsx('input', { type: 'email', required: true, className: 'w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire' })
                                                ]
                                            }),
                                            _jsxs('label', {
                                                className: 'block',
                                                children: [
                                                    _jsx('span', { className: 'mb-2 block text-sm font-medium text-navy', children: 'Phone Number' }),
                                                    _jsx('input', { type: 'tel', className: 'w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire' })
                                                ]
                                            }),
                                            _jsxs('label', {
                                                className: 'block',
                                                children: [
                                                    _jsx('span', { className: 'mb-2 block text-sm font-medium text-navy', children: 'Subject' }),
                                                    _jsx('input', { required: true, className: 'w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire' })
                                                ]
                                            }),
                                            _jsxs('label', {
                                                className: 'block',
                                                children: [
                                                    _jsx('span', { className: 'mb-2 block text-sm font-medium text-navy', children: 'Message' }),
                                                    _jsx('textarea', { required: true, rows: 5, className: 'w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sapphire' })
                                                ]
                                            }),
                                            _jsx('button', {
                                                type: 'submit',
                                                className: 'inline-flex rounded-full bg-sapphire px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0]',
                                                children: 'Send Message'
                                            }),
                                            submitted
                                                ? _jsx('p', {
                                                    className: 'text-sm font-medium text-sapphire',
                                                    children: 'Thank you. Your message has been received for demo purposes.'
                                                })
                                                : null
                                        ]
                                    })
                                })
                            ]
                        }),
                        _jsxs('article', {
                            className: 'rounded-[2rem] bg-navy p-7 text-white sm:p-8',
                            children: [
                                _jsx('h2', {
                                    className: 'text-2xl font-semibold sm:text-3xl',
                                    children: 'Business & Contact Information'
                                }),
                                _jsxs('div', {
                                    className: 'mt-6 space-y-3',
                                    children: [
                                        _jsxs('div', {
                                            className: 'flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4',
                                            children: [
                                                _jsx('span', { className: 'rounded-xl bg-white/10 p-2 text-powder', children: _jsx(Mail, { className: 'h-4 w-4' }) }),
                                                _jsxs('div', { children: [_jsx('p', { className: 'text-xs uppercase tracking-[0.2em] text-white/70', children: 'Email' }), _jsx('p', { className: 'mt-1 text-sm font-semibold', children: 'contact@hayatid.info' })] })
                                            ]
                                        }),
                                        _jsxs('div', {
                                            className: 'flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4',
                                            children: [
                                                _jsx('span', { className: 'rounded-xl bg-white/10 p-2 text-powder', children: _jsx(Phone, { className: 'h-4 w-4' }) }),
                                                _jsxs('div', { children: [_jsx('p', { className: 'text-xs uppercase tracking-[0.2em] text-white/70', children: 'Phone' }), _jsx('p', { className: 'mt-1 text-sm font-semibold', children: '+212 XX XX XX XX XX' })] })
                                            ]
                                        }),
                                        _jsxs('div', {
                                            className: 'flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4',
                                            children: [
                                                _jsx('span', { className: 'rounded-xl bg-white/10 p-2 text-powder', children: _jsx(MapPin, { className: 'h-4 w-4' }) }),
                                                _jsxs('div', { children: [_jsx('p', { className: 'text-xs uppercase tracking-[0.2em] text-white/70', children: 'Location' }), _jsx('p', { className: 'mt-1 text-sm font-semibold', children: 'Morocco' })] })
                                            ]
                                        })
                                    ]
                                }),
                                _jsx('p', {
                                    className: 'mt-6 text-sm leading-7 text-white/75',
                                    children: 'We are building a smarter and more connected healthcare experience through secure digital identity and NFC technology.'
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
