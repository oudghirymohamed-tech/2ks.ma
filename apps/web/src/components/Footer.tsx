import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    return (
        <footer className="border-t border-sapphire/20 bg-powder/45">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-navy/80 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
                <div>
                    <p className="text-lg font-semibold text-navy">HayatID by 2KS</p>
                    <p className="mt-3 max-w-md leading-7">
                        {isArabic
                            ? 'تجربة عرض احترافية لـ GITEX. البيانات المعروضة تجريبية فقط ولا يتم كشف أي معلومات طبية محمية من الواجهة.'
                            : 'Professional GITEX demo experience. Mock data only. No protected medical data is exposed from the frontend.'}
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-navy">{isArabic ? 'المسارات' : 'Flows'}</p>
                    <div className="mt-3 flex flex-col gap-2">
                        <Link to="/demo" className="hover:text-sapphire">{isArabic ? 'مركز العرض' : 'Demo hub'}</Link>
                        <Link to="/u/demo-token" className="hover:text-sapphire">{isArabic ? 'مسح الطوارئ' : 'Emergency scan'}</Link>
                        <Link to="/dashboard" className="hover:text-sapphire">{isArabic ? 'لوحة المريض' : 'Patient dashboard'}</Link>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-navy">{isArabic ? 'المنصة' : 'Platform'}</p>
                    <div className="mt-3 flex flex-col gap-2">
                        <span>{isArabic ? 'الواجهة: Vercel' : 'Frontend: Vercel'}</span>
                        <span>{isArabic ? 'الخلفية: اختيارية في هذه النسخة التجريبية' : 'Backend: optional in this demo build'}</span>
                        <span>{isArabic ? 'التوسع لاحقاً: Supabase و Redis و Resend' : 'Future stack: Supabase, Redis, Resend'}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
