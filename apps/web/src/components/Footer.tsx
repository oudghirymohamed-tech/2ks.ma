import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    return (
        <footer className="border-t border-sapphire/20 bg-navy text-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-white sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
                <div>
                    <p className="text-lg font-semibold text-white">HayatID by 2KS</p>
                    <p className="mt-3 max-w-md leading-7 text-white/75">
                        {isArabic
                            ? 'تجربة عرض احترافية لـ GITEX. البيانات المعروضة تجريبية فقط ولا يتم كشف أي معلومات طبية محمية من الواجهة.'
                            : isFrench
                                ? 'Experience professionnelle pour GITEX. Donnees demo uniquement. Aucune donnee medicale protegee n\'est exposee depuis le frontend.'
                                : 'Professional GITEX demo experience. Mock data only. No protected medical data is exposed from the frontend.'}
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-white">{t('Navigation', 'Navigation', 'التنقل')}</p>
                    <div className="mt-3 flex flex-col gap-2">
                        <Link to="/" className="text-white/80 hover:text-powder">{t('Home', 'Accueil', 'الرئيسية')}</Link>
                        <Link to="/about" className="text-white/80 hover:text-powder">{t('About Us', 'A propos', 'من نحن')}</Link>
                        <Link to="/how-it-works" className="text-white/80 hover:text-powder">{t('How It Works', 'Comment ca marche', 'كيف يعمل')}</Link>
                        <Link to="/services" className="text-white/80 hover:text-powder">{t('Services', 'Services', 'الخدمات')}</Link>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-white">{t('Legal and Support', 'Legal et support', 'الدعم والقانون')}</p>
                    <div className="mt-3 flex flex-col gap-2">
                        <Link to="/terms" className="text-white/80 hover:text-powder">{t('Terms of Service', 'Conditions d\'utilisation', 'شروط الاستخدام')}</Link>
                        <Link to="/privacy" className="text-white/80 hover:text-powder">{t('Privacy Policy', 'Politique de confidentialite', 'سياسة الخصوصية')}</Link>
                        <Link to="/faq" className="text-white/80 hover:text-powder">FAQ</Link>
                        <Link to="/contact" className="text-white/80 hover:text-powder">{t('Contact Us', 'Contact', 'تواصل معنا')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
