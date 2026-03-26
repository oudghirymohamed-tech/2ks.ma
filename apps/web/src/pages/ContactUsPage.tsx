import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageMeta } from '../components/PageMeta';
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

    return (
        <MarketingLayout>
            <PageMeta
                title={t('Contact Us', 'Contactez-nous', 'تواصل معنا')}
                description={t(
                    'Contact the HayatID team for healthcare partnerships, pilots, and product questions.',
                    'Contactez l equipe HayatID pour les partenariats sante, pilotes et questions produit.',
                    'تواصل مع فريق HayatID بخصوص الشراكات الصحية والتجارب والأسئلة المتعلقة بالمنتج.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className={`rounded-[2rem] bg-navy p-7 text-white shadow-panel sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-powder/80">
                            {t('Contact Us', 'Contactez-nous', 'تواصل معنا')}
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                            {t(
                                'Let’s connect around smarter healthcare access',
                                'Connectons-nous autour d un acces aux soins plus intelligent',
                                'لنتواصل حول وصول صحي أكثر ذكاءً'
                            )}
                        </h1>
                        <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                            {t(
                                'Whether you are a patient, healthcare professional, pharmacy, clinic, or partner interested in HayatID, we would be glad to hear from you.',
                                'Que vous soyez patient, professionnel de sante, pharmacie, clinique ou partenaire interesse par HayatID, nous serions ravis d echanger avec vous.',
                                'سواء كنت مريضاً أو مهنياً صحياً أو صيدلية أو عيادة أو شريكاً مهتماً بـ HayatID، يسعدنا التواصل معك.'
                            )}
                        </p>

                        <div className="mt-7 space-y-3">
                            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                                <span className="rounded-2xl bg-white/10 p-2 text-powder">
                                    <Mail className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-xs uppercase tracking-[0.2em] text-white/70">{t('Email', 'Email', 'البريد الإلكتروني')}</span>
                                    <span className="mt-1 block text-sm font-semibold text-white">contact@hayatid.info</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                                <span className="rounded-2xl bg-white/10 p-2 text-powder">
                                    <Phone className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-xs uppercase tracking-[0.2em] text-white/70">{t('Phone', 'Telephone', 'الهاتف')}</span>
                                    <span className="mt-1 block text-sm font-semibold text-white">+212 XX XX XX XX XX</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                                <span className="rounded-2xl bg-white/10 p-2 text-powder">
                                    <MapPin className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-xs uppercase tracking-[0.2em] text-white/70">{t('Location', 'Localisation', 'الموقع')}</span>
                                    <span className="mt-1 block text-sm font-semibold text-white">Marrakech, Morocco</span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-powder/80">{t('For partnerships and pilots', 'Pour les partenariats et pilotes', 'للشراكات والتجارب الميدانية')}</p>
                            <p className="mt-3 text-sm leading-7 text-white/75">
                                {t(
                                    'HayatID is open to collaboration with healthcare professionals, pharmacies, clinics, and strategic partners interested in improving access to critical medical information.',
                                    'HayatID est ouvert a la collaboration avec les professionnels de sante, pharmacies, cliniques et partenaires strategiques souhaitant ameliorer l acces aux informations medicales critiques.',
                                    'HayatID منفتح على التعاون مع المهنيين الصحيين والصيدليات والعيادات والشركاء الاستراتيجيين المهتمين بتحسين الوصول إلى المعلومات الطبية الحرجة.'
                                )}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.06 }} className={`premium-card p-7 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <h2 className="text-2xl font-semibold text-navy">
                            {t('Send Message', 'Envoyer un message', 'إرسال رسالة')}
                        </h2>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Full Name', 'Nom complet', 'الاسم الكامل')}
                                </span>
                                <input required className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Email Address', 'Adresse email', 'البريد الإلكتروني')}
                                </span>
                                <input type="email" required className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Phone Number', 'Numero de telephone', 'رقم الهاتف')}
                                </span>
                                <input type="tel" className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Subject', 'Sujet', 'الموضوع')}
                                </span>
                                <input required className="premium-input" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">
                                    {t('Message', 'Message', 'الرسالة')}
                                </span>
                                <textarea required rows={5} className="premium-input" />
                            </label>

                            <button type="submit" className="premium-btn-primary">
                                {t('Send Message', 'Envoyer le message', 'إرسال الرسالة')}
                            </button>

                            {submitted ? (
                                <p className="inline-flex rounded-full border border-call/30 bg-call/10 px-4 py-2 text-sm font-medium text-call">
                                    {t(
                                        'Thank you. Your message has been received successfully.',
                                        'Merci. Votre message a ete recu avec succes.',
                                        'شكراً. تم استلام رسالتك بنجاح.'
                                    )}
                                </p>
                            ) : null}
                        </form>

                        <p className="mt-6 text-sm leading-7 text-navy/75">
                            {t(
                                'We are building a smarter and more connected healthcare experience through secure digital identity and NFC technology.',
                                'Nous construisons une experience de sante plus intelligente et connectee grace a une identite numerique securisee et la technologie NFC.',
                                'نحن نبني تجربة صحية أكثر ذكاءً وترابطاً عبر هوية رقمية آمنة وتقنية NFC.'
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>
        </MarketingLayout>
    );
}
