import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function ContactUsPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const [submitted, setSubmitted] = useState(false);

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setSubmitted(true);
    }

    const channels = [
        {
            icon: Phone,
            label: t('Phone', 'Telephone', 'الهاتف'),
            value: siteConfig.contact.phoneDisplay,
            href: siteConfig.contact.phoneHref
        },
        {
            icon: MessageCircle,
            label: t('WhatsApp', 'WhatsApp', 'واتساب'),
            value: siteConfig.contact.whatsappDisplay,
            href: siteConfig.contact.whatsappHref
        },
        {
            icon: Mail,
            label: t('Email', 'Email', 'البريد الإلكتروني'),
            value: siteConfig.contact.emailDisplay,
            href: siteConfig.contact.emailHref
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Contact Us', 'HayatID | Contact', 'HayatID | تواصل معنا')}
                description={t(
                    'Contact 2ks Digital Solutions about HayatID partnerships, demos, and client onboarding.',
                    'Contactez 2ks Digital Solutions pour les partenariats, demos et onboarding clients HayatID.',
                    'تواصل مع 2ks Digital Solutions بشأن الشراكات والعروض وتعريف العملاء في HayatID.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className={`rounded-[2rem] bg-navy p-7 text-white sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-powder/80">
                            {t('Contact Us', 'Contactez-nous', 'تواصل معنا')}
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                            {t(
                                'Talk to the team behind HayatID.',
                                'Echangez avec l\'equipe derriere HayatID.',
                                'تواصل مع الفريق المطور لـ HayatID.'
                            )}
                        </h1>
                        <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                            {t(
                                'For GITEX presentations, partnerships, or early client onboarding, use one of the channels below.',
                                'Pour les presentations GITEX, partenariats ou onboarding client initial, utilisez un canal ci-dessous.',
                                'لعروض GITEX أو الشراكات أو بدء تأهيل العملاء، استخدم إحدى القنوات أدناه.'
                            )}
                        </p>

                        <div className="mt-7 space-y-3">
                            {channels.map((channel) => {
                                const Icon = channel.icon;

                                return (
                                    <a
                                        key={channel.label}
                                        href={channel.href}
                                        className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                                    >
                                        <span className="rounded-2xl bg-white/10 p-2 text-powder">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <span>
                                            <span className="block text-xs uppercase tracking-[0.2em] text-white/70">{channel.label}</span>
                                            <span className="mt-1 block text-sm font-semibold text-white">{channel.value}</span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`rounded-[2rem] border border-sapphire/15 bg-white/80 p-7 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <h2 className="text-2xl font-semibold text-navy">
                            {t('Send a request', 'Envoyer une demande', 'إرسال طلب')}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-navy/75">
                            {t(
                                'This form is for presentation and pre-sales contact.',
                                'Ce formulaire est destine au contact presentation et pre-vente.',
                                'هذا النموذج مخصص للتواصل الخاص بالعرض وما قبل البيع.'
                            )}
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Full name', 'Nom complet', 'الاسم الكامل')}
                                </span>
                                <input required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sapphire" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Email', 'Email', 'البريد الإلكتروني')}
                                </span>
                                <input type="email" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sapphire" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Message', 'Message', 'الرسالة')}
                                </span>
                                <textarea required rows={5} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sapphire" />
                            </label>

                            <button type="submit" className="inline-flex rounded-full bg-sapphire px-5 py-3 text-sm font-semibold text-white">
                                {t('Submit', 'Envoyer', 'إرسال')}
                            </button>

                            {submitted ? (
                                <p className="text-sm font-medium text-sapphire">
                                    {t(
                                        'Thank you. Your request has been captured for demo purposes.',
                                        'Merci. Votre demande a ete capturee a des fins de demonstration.',
                                        'شكراً. تم تسجيل طلبك لأغراض العرض التجريبي.'
                                    )}
                                </p>
                            ) : null}
                        </form>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
