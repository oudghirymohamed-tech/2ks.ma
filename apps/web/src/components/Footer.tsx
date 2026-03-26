import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    return (
        <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#000926_0%,#03103A_100%)] text-white">
            {/* Main footer grid */}
            <div className={`mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr] lg:px-8 lg:py-16 ${isArabic ? 'font-arabic text-right' : ''}`}>
                {/* Brand column */}
                <div>
                    <p className="text-xl font-bold tracking-tight text-white">{t('HayatID — Smart medical identity powered by 2KS', 'HayatID — Identite medicale intelligente propulsee par 2KS', 'HayatID — هوية طبية ذكية مدعومة من 2KS')}</p>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
                        {t(
                            'Building a more connected healthcare experience through secure digital identity, NFC, and QR access.',
                            'Construire une experience de sante plus connectee grace a une identite numerique securisee, NFC et acces QR.',
                            'نبني تجربة صحية أكثر ترابطاً عبر هوية رقمية آمنة وتقنيات NFC وQR.'
                        )}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-powder/70 shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
                        {t('Smart Medical Identity Platform', 'Plateforme d identite medicale intelligente', 'منصة الهوية الطبية الذكية')}
                    </div>
                </div>

                {/* Navigation column */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                        {t('Navigation', 'Navigation', 'التنقل')}
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                        <Link to="/" className="text-sm text-white/70 transition hover:translate-x-0.5 hover:text-powder">
                            {t('Home', 'Accueil', 'الرئيسية')}
                        </Link>
                        <Link to="/about" className="text-sm text-white/70 transition hover:translate-x-0.5 hover:text-powder">
                            {t('About Us', 'A propos', 'من نحن')}
                        </Link>
                        <Link to="/how-it-works" className="text-sm text-white/70 transition hover:translate-x-0.5 hover:text-powder">
                            {t('How It Works', 'Comment ca marche', 'كيف يعمل')}
                        </Link>
                        <Link to="/contact" className="text-sm text-white/70 transition hover:translate-x-0.5 hover:text-powder">
                            {t('Contact Us', 'Contactez-nous', 'تواصل معنا')}
                        </Link>
                    </div>
                </div>

                {/* Public contact column */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                        {t('Contact', 'Contact', 'التواصل')}
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                        <span className="text-sm text-white/70">contact@hayatid.info</span>
                        <span className="text-sm text-white/70">+212 XX XX XX XX XX</span>
                        <span className="text-sm text-white/70">Marrakech, Morocco</span>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/8">
                <div className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
                    <p className="text-xs text-white/40">
                        {t('© 2026 HayatID. All rights reserved.', '© 2026 HayatID. Tous droits reserves.', '© 2026 HayatID. جميع الحقوق محفوظة.')}
                    </p>
                    <p className="text-xs text-white/30">
                        {t('Powered by 2KS', 'Propulse par 2KS', 'مدعوم بواسطة 2KS')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
