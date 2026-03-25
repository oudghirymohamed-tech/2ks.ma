import { AlertTriangle, PhoneCall, ShieldAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { getPublicEmergencyProfile } from '../services/api';
import type { PublicEmergencyResponse } from '../types/demo';

export function EmergencyDemoPage() {
    const { token = 'demo-token' } = useParams();
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const [profile, setProfile] = useState<PublicEmergencyResponse | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getPublicEmergencyProfile(token)
            .then(setProfile)
            .catch((requestError) => {
                setError(requestError instanceof Error ? requestError.message : 'Unable to load emergency profile.');
            });
    }, [token]);

    if (error) {
        return <div className="min-h-screen bg-navy px-6 py-20 text-white">{error}</div>;
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-navy px-6 py-20 text-white">
                {isArabic ? 'جارٍ تحميل ملف الطوارئ...' : 'Loading emergency profile...'}
            </div>
        );
    }

    const patient = profile.patient;

    return (
        <div className={`min-h-screen bg-navy text-white ${isArabic ? 'font-arabic text-right' : ''}`}>
            <PageMeta
                title="2ks | Emergency access"
                description="Emergency-critical public profile with professional OTP unlock for deeper access."
            />
            <main className="mx-auto max-w-xl px-4 pb-28 pt-4 sm:px-6">
                <section className="sticky top-0 z-20 -mx-4 border-b border-sapphire/20 bg-navy/95 px-4 pb-4 pt-2 backdrop-blur sm:-mx-6 sm:px-6">
                    <div className="rounded-[1.8rem] bg-emergency p-5 shadow-panel">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                            {isArabic ? 'وصول الطوارئ' : 'Emergency access'}
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold">
                            {isArabic ? 'معلومات حرجة ظاهرة فوراً' : 'Critical profile visible immediately'}
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-white/80">
                            {isArabic
                                ? 'يتم عرض البيانات الضرورية للطوارئ فقط في هذا المستوى العام.'
                                : 'Only emergency-critical data is visible in this public level.'}
                        </p>
                    </div>
                </section>

                <section className="mt-4 rounded-[2rem] border border-emergency/45 bg-emergency/15 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-emergency">{isArabic ? 'فصيلة الدم' : 'Blood type'}</p>
                    <p className="mt-3 text-7xl font-semibold leading-none text-emergency">{patient.medicalProfile.bloodType}</p>
                </section>

                <section className="mt-4 rounded-[2rem] border border-emergency/35 bg-powder/30 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-emergency">{isArabic ? 'الحساسية' : 'Allergies'}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {patient.medicalProfile.allergies.map((allergy) => (
                            <span key={allergy} className="rounded-full border border-emergency/35 bg-powder px-3 py-1.5 text-sm font-semibold text-navy">
                                {allergy}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="mt-4 rounded-[2rem] border border-sapphire/20 bg-[#02133C] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-powder/80">{isArabic ? 'الأمراض المزمنة' : 'Chronic conditions'}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {patient.medicalProfile.chronicConditions.length > 0 ? (
                            patient.medicalProfile.chronicConditions.map((value) => (
                                <span key={value} className="rounded-full border border-sapphire/20 bg-sapphire/20 px-3 py-1.5 text-sm font-medium text-ice">
                                    {value}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-ice/75">{isArabic ? 'لا توجد بيانات' : 'No data provided.'}</span>
                        )}
                    </div>
                </section>

                <section className="mt-4 rounded-[2rem] border border-sapphire/30 bg-sapphire/20 p-5">
                    <div className="flex items-center gap-3 text-ice">
                        <ShieldAlert className="h-5 w-5" />
                        <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                            {isArabic ? 'تعليمات الطوارئ' : 'Emergency instructions'}
                        </p>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-ice/95">
                        {patient.medicalProfile.emergencyInstructions.map((instruction) => (
                            <li key={instruction} className="rounded-2xl bg-navy/40 px-4 py-3">
                                {instruction}
                            </li>
                        ))}
                    </ul>
                </section>

                <Link to={`/card/${encodeURIComponent(profile.token)}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-powder/90">
                    <AlertTriangle className="h-4 w-4" />
                    {isArabic ? 'العودة إلى البطاقة' : 'Back to card page'}
                </Link>
            </main>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sapphire/25 bg-navy/95 p-4 backdrop-blur">
                <div className="mx-auto max-w-xl">
                    <a
                        href="tel:112"
                        className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-call px-6 text-base font-semibold text-white shadow-panel"
                    >
                        <PhoneCall className="h-5 w-5" />
                        {isArabic ? 'اتصل بالطوارئ' : 'Call emergency'}
                    </a>
                </div>
            </div>
        </div>
    );
}
