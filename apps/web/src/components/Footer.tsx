import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    return (
        <footer className="border-t border-white/10 bg-navy text-white">
            {/* Main footer grid */}
            <div className={`mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr] lg:px-8 lg:py-16 ${isArabic ? 'font-arabic text-right' : ''}`}>
                {/* Brand column */}
                <div>
                    <p className="text-xl font-bold tracking-tight text-white">
                        HayatID
                        <span className="ml-2 text-sm font-medium text-powder/60">by 2ks</span>
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
                        HayatID is building a more connected healthcare experience through secure digital identity and NFC technology.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-powder/70">
                        Smart Medical Identity Platform
                    </div>
                </div>

                {/* Navigation column */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                        {isArabic ? 'التنقل' : 'Navigation'}
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                        <Link to="/" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'الرئيسية' : 'Home'}
                        </Link>
                        <Link to="/about" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'من نحن' : 'About'}
                        </Link>
                        <Link to="/how-it-works" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'كيف يعمل' : 'How It Works'}
                        </Link>
                        <Link to="/contact" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'تواصل معنا' : 'Contact'}
                        </Link>
                    </div>
                </div>

                {/* Account column */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                        {isArabic ? 'الحساب' : 'Account'}
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                        <Link to="/login" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'تسجيل الدخول' : 'Login'}
                        </Link>
                        <Link to="/register" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'إنشاء حساب' : 'Create Account'}
                        </Link>
                        <Link to="/terms" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'شروط الاستخدام' : 'Terms of Service'}
                        </Link>
                        <Link to="/privacy" className="text-sm text-white/70 transition hover:text-powder">
                            {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/8">
                <div className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
                    <p className="text-xs text-white/40">
                        © 2026 HayatID. All rights reserved.
                    </p>
                    <p className="text-xs text-white/30">
                        Powered by 2ks Technology
                    </p>
                </div>
            </div>
        </footer>
    );
}
