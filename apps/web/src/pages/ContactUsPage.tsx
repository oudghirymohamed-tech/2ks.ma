import { ArrowRight, Clock3, Instagram, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { BrandSiteLayout } from '../components/BrandSiteLayout';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

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

    return (
        <BrandSiteLayout>
            <PageMeta
                title={t('Contact | HayatID', 'Contact | HayatID', 'تواصل | HayatID')}
                description={t(
                    'Connect with HayatID through a premium contact experience for partnerships and institutional conversations.',
                    'Contactez HayatID via une experience premium pour les partenariats et les echanges institutionnels.',
                    'تواصل مع HayatID عبر تجربة تواصل راقية للشراكات والمحادثات المؤسسية.'
                )}
            />

            <section className="motion-section mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-16 lg:pt-20">
                <div className={`interactive-hover relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,33,63,0.97),rgba(5,18,37,0.98))] p-7 shadow-[0_28px_74px_rgba(0,0,0,0.3)] sm:p-10 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-sky-200/12 blur-3xl" aria-hidden />
                    <p className="relative z-[1] text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/62">{t('Contact', 'Contact', 'التواصل')}</p>
                    <h1 className="font-editorial relative z-[1] mt-4 max-w-5xl text-[clamp(2.45rem,6.6vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.026em] text-white">
                        {t(
                            'A premium and trusted way to connect with the HayatID team.',
                            'Une facon premium et fiable de contacter l equipe HayatID.',
                            'طريقة راقية وموثوقة للتواصل مع فريق HayatID.'
                        )}
                    </h1>
                    <p className="relative z-[1] mt-6 max-w-3xl text-base leading-8 text-slate-200/76 sm:text-lg">
                        {t(
                            'For media, partnerships, healthcare collaboration, and product conversations, use the channels below or send us a direct message.',
                            'Pour les medias, les partenariats, la collaboration sante et les echanges produit, utilisez les canaux ci-dessous ou envoyez-nous un message direct.',
                            'للاستفسارات الإعلامية والشراكات والتعاون الصحي ومحادثات المنتج، استخدم القنوات أدناه أو أرسل لنا رسالة مباشرة.'
                        )}
                    </p>
                    <div className="relative z-[1] mt-7 flex flex-wrap gap-3">
                        <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/62">{t('Institutional Tone', 'Ton institutionnel', 'طابع مؤسسي')}</span>
                        <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/62">{t('Secure Communication', 'Communication securisee', 'تواصل آمن')}</span>
                        <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/62">{t('Fast Follow-up', 'Suivi rapide', 'متابعة سريعة')}</span>
                    </div>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
                    <article className={`motion-card interactive-hover rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-6 shadow-[0_20px_52px_rgba(0,0,0,0.22)] sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Direct Access', 'Acces direct', 'وصول مباشر')}</p>
                        <h2 className="font-editorial mt-3 text-[2rem] font-medium leading-[1.05] text-white">{t('Speak with us through trusted channels.', 'Echangez avec nous via des canaux fiables.', 'تواصل معنا عبر قنوات موثوقة.')}</h2>
                        <div className="mt-6 grid gap-3">
                            <a href="mailto:hayatid.contact@gmail.com" className="rounded-2xl border border-white/10 bg-white/7 p-4 transition hover:-translate-y-0.5 hover:border-sky-200/22 hover:bg-white/10">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-sky-100/56">Email</p>
                                        <p className="mt-1 text-sm font-semibold text-white">hayatid.contact@gmail.com</p>
                                    </div>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/hayatid.ma?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/7 p-4 transition hover:-translate-y-0.5 hover:border-sky-200/22 hover:bg-white/10">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                                        <Instagram className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-sky-100/56">Instagram</p>
                                        <p className="mt-1 text-sm font-semibold text-white">@hayatid.ma</p>
                                    </div>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/company/2ks-ma/" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/7 p-4 transition hover:-translate-y-0.5 hover:border-sky-200/22 hover:bg-white/10">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                                        <Linkedin className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-sky-100/56">LinkedIn</p>
                                        <p className="mt-1 text-sm font-semibold text-white">2KS</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-[#071f3f]/76 p-4">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-sky-100">
                                    <Clock3 className="h-4 w-4" />
                                </div>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/54">{t('Response Focus', 'Reactivite', 'سرعة الاستجابة')}</p>
                                <p className="mt-2 text-sm leading-6 text-slate-200/74">{t('Priority follow-up for institutional and partnership requests.', 'Suivi prioritaire pour les demandes institutionnelles et partenariales.', 'متابعة أولوية لطلبات الشراكات والجهات المؤسسية.')}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#071f3f]/76 p-4">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-sky-100">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/54">{t('Trust', 'Confiance', 'الثقة')}</p>
                                <p className="mt-2 text-sm leading-6 text-slate-200/74">{t('Professional communication with clarity, discretion, and care.', 'Communication professionnelle avec clarte, discretion et attention.', 'تواصل مهني بوضوح وخصوصية واهتمام.')}</p>
                            </div>
                        </div>
                    </article>

                    <article className={`motion-card interactive-hover rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,42,76,0.76),rgba(8,26,49,0.88))] p-6 shadow-[0_20px_52px_rgba(0,0,0,0.22)] sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Message Form', 'Formulaire', 'نموذج الرسالة')}</p>
                        <h2 className="font-editorial mt-3 text-[2rem] font-medium leading-[1.05] text-white">{t('Send us a direct inquiry.', 'Envoyez-nous une demande directe.', 'أرسل لنا استفسارك مباشرة.')}</h2>
                        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <input required placeholder={t('Full Name', 'Nom complet', 'الاسم الكامل')} className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-300/58 outline-none focus:border-sky-200/44" />
                                <input required type="email" placeholder={t('Email Address', 'Adresse email', 'البريد الإلكتروني')} className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-300/58 outline-none focus:border-sky-200/44" />
                            </div>
                            <input placeholder={t('Subject', 'Sujet', 'الموضوع')} className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-300/58 outline-none focus:border-sky-200/44" />
                            <textarea required rows={5} placeholder={t('Your Message', 'Votre message', 'رسالتك')} className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-300/58 outline-none focus:border-sky-200/44" />
                            <div className="flex flex-wrap items-center gap-3">
                                <button type="submit" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f5f9ff_0%,#d6e9ff_100%)] px-6 text-sm font-semibold tracking-[0.02em] text-[#041225] shadow-[0_12px_34px_rgba(125,193,255,0.2)] transition hover:translate-y-[-1px]">
                                    {t('Send Message', 'Envoyer', 'إرسال الرسالة')}
                                    <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </button>
                                <a href="mailto:hayatid.contact@gmail.com" className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/16 bg-white/8 px-6 text-sm font-semibold text-white transition hover:bg-white/12">
                                    {t('Email Directly', 'Envoyer un email', 'إرسال بريد مباشر')}
                                </a>
                            </div>
                            {submitted ? (
                                <p className="rounded-full border border-sky-200/24 bg-sky-100/10 px-4 py-2 text-sm text-sky-100">
                                    {t('Thank you. Your message has been received.', 'Merci. Votre message a ete recu.', 'شكراً. تم استلام رسالتك.')}
                                </p>
                            ) : null}
                        </form>
                    </article>
                </div>

                <div className={`motion-card interactive-hover mt-5 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(145deg,rgba(11,34,64,0.9),rgba(5,18,37,0.96))] p-6 sm:p-7 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Closing Note', 'Note finale', 'ملاحظة ختامية')}</p>
                    <p className="font-editorial mt-3 max-w-4xl text-[1.7rem] font-medium leading-[1.08] text-white sm:text-[2rem]">
                        {t(
                            'Designed for meaningful communication, with the same premium trust language as the HayatID identity experience.',
                            'Concu pour une communication pertinente, avec le meme langage premium de confiance que l experience identitaire HayatID.',
                            'صُمم لتواصل هادف بنفس لغة الثقة الراقية التي تعتمدها تجربة هوية HayatID.'
                        )}
                    </p>
                </div>
            </section>
        </BrandSiteLayout>
    );
}
