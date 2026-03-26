import { CheckCircle2, Lightbulb, ShieldCheck, Stethoscope, Target } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

export function AboutUsPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const highlights = [
        {
            icon: CheckCircle2,
            title: t('Faster emergency access', 'Acces d urgence plus rapide', 'وصول أسرع في حالات الطوارئ'),
            body: t(
                'Faster access to essential emergency medical information.',
                'Acces plus rapide aux informations medicales essentielles en urgence.',
                'وصول أسرع إلى المعلومات الطبية الأساسية في حالات الطوارئ.'
            )
        },
        {
            icon: Stethoscope,
            title: t('No app required', 'Sans application requise', 'بدون تطبيق للطرف القارئ'),
            body: t(
                'No app required for the reader in emergency situations.',
                'Aucune application n est requise pour la personne qui consulte les informations.',
                'لا حاجة لتثبيت تطبيق لدى الشخص الذي يقوم بالقراءة في الطوارئ.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('Structured and secure', 'Structure et securite', 'هوية منظمة وآمنة'),
            body: t(
                'Structured and secure medical identity experience.',
                'Experience d identite medicale structuree et securisee.',
                'تجربة هوية طبية منظمة وآمنة.'
            )
        },
        {
            icon: Target,
            title: t('Better continuity of care', 'Continuite de soin amelioree', 'استمرارية أفضل بين المريض والمهني الصحي'),
            body: t(
                'Better continuity between patients and healthcare professionals.',
                'Meilleure continuite entre patients et professionnels de sante.',
                'استمرارية أفضل بين المرضى والمهنيين الصحيين.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('About Us', 'A propos', 'من نحن')}
                description={t(
                    'Learn how HayatID combines NFC and QR with secure medical identity access.',
                    'Decouvrez comment HayatID combine NFC et QR avec un acces medical securise.',
                    'اكتشف كيف يجمع HayatID بين NFC وQR مع وصول طبي آمن.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">{t('About Us', 'A propos', 'من نحن')}</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t(
                            'Redefining medical access through smart digital identity',
                            'Redefinir l acces medical grace a une identite numerique intelligente',
                            'إعادة تعريف الوصول الطبي عبر هوية رقمية ذكية'
                        )}
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg">
                        {t(
                            'HayatID is a smart medical identity platform powered by 2KS technology. It combines an NFC card and QR access with a secure digital experience to make essential medical information more accessible, structured, and useful in critical moments.',
                            'HayatID est une plateforme d identite medicale intelligente propulsee par 2KS. Elle combine une carte NFC et un acces QR avec une experience numerique securisee pour rendre les informations medicales essentielles plus accessibles, structurees et utiles dans les moments critiques.',
                            'HayatID منصة هوية طبية ذكية مدعومة بتقنية 2KS، تجمع بين بطاقة NFC والوصول عبر QR ضمن تجربة رقمية آمنة لجعل المعلومات الطبية الأساسية أكثر سهولة وتنظيماً وفائدة في اللحظات الحرجة.'
                        )}
                    </p>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    <article className={`rounded-[1.8rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <h2 className="text-2xl font-semibold text-navy sm:text-3xl">{t('The Problem', 'Le probleme', 'المشكلة')}</h2>
                        <p className="mt-4 text-sm leading-7 text-navy/75 sm:text-base">
                            {t(
                                'In emergency situations, essential medical information is often unavailable when it matters most. Blood type, allergies, implants, medications, and emergency contacts may exist, but remain inaccessible in the first crucial seconds.',
                                'En situation d urgence, les informations medicales essentielles ne sont souvent pas disponibles au moment critique. Groupe sanguin, allergies, implants, traitements et contacts d urgence peuvent exister, mais restent inaccessibles durant les premieres secondes decisives.',
                                'في حالات الطوارئ، غالباً لا تكون المعلومات الطبية الأساسية متاحة عند الحاجة القصوى. فصيلة الدم والحساسيات والزرعات والأدوية وجهات الاتصال الطارئة قد تكون موجودة، لكنها تبقى غير متاحة في الثواني الأولى الحاسمة.'
                            )}
                        </p>
                    </article>

                    <article className={`rounded-[1.8rem] border border-sapphire/15 bg-powder/25 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <h2 className="text-2xl font-semibold text-navy sm:text-3xl">{t('The Solution', 'La solution', 'الحل')}</h2>
                        <p className="mt-4 text-sm leading-7 text-navy/75 sm:text-base">
                            {t(
                                'HayatID provides a portable medical identity through an NFC card and QR code. With a simple scan, essential medical information can be accessed quickly through a browser, without requiring a dedicated app on the reader side.',
                                'HayatID fournit une identite medicale portable via une carte NFC et un code QR. Avec un simple scan, les informations medicales essentielles sont accessibles rapidement depuis un navigateur, sans application dediee cote lecteur.',
                                'يوفر HayatID هوية طبية محمولة عبر بطاقة NFC ورمز QR. وبمجرد مسح بسيط، يمكن الوصول السريع إلى المعلومات الطبية الأساسية عبر المتصفح دون الحاجة إلى تطبيق مخصص لدى القارئ.'
                            )}
                        </p>
                    </article>
                </div>

                <article className={`mt-5 rounded-[1.8rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <h2 className="text-2xl font-semibold text-navy sm:text-3xl">{t('Why HayatID Matters', 'Pourquoi HayatID compte', 'لماذا HayatID مهم')}</h2>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {highlights.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.title} className="rounded-2xl border border-sapphire/15 bg-slate-50 p-4">
                                    <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <p className="mt-3 text-sm font-semibold text-navy">{item.title}</p>
                                    <p className="mt-2 text-sm leading-6 text-navy/75">{item.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </article>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <article className={`rounded-[1.8rem] border border-sapphire/15 bg-white/80 p-6 shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-navy sm:text-3xl">
                            <Lightbulb className="h-5 w-5 text-sapphire" />
                            {t('Field Validation', 'Validation terrain', 'التحقق الميداني')}
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-navy/75 sm:text-base">
                            {t(
                                'The product has already been validated with healthcare professionals in real-world conditions, showing strong adoption interest.',
                                'Le produit a deja ete valide avec des professionnels de sante en conditions reelles, montrant un fort interet d adoption.',
                                'تم التحقق من المنتج بالفعل مع مهنيي الرعاية الصحية في ظروف واقعية، مع اهتمام قوي بالتبني.'
                            )}
                        </p>
                    </article>

                    <article className={`rounded-[1.8rem] border border-sapphire/15 bg-navy p-6 text-white shadow-soft sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <h2 className="text-2xl font-semibold sm:text-3xl">{t('Our Vision', 'Notre vision', 'رؤيتنا')}</h2>
                        <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                            {t(
                                'HayatID aims to help build a more connected healthcare experience where critical medical information is available quickly, clearly, and responsibly.',
                                'HayatID vise a construire une experience de sante plus connectee ou les informations medicales critiques sont disponibles rapidement, clairement et de maniere responsable.',
                                'يهدف HayatID إلى المساهمة في بناء تجربة صحية أكثر ترابطاً، بحيث تتوفر المعلومات الطبية الحرجة بسرعة ووضوح وبشكل مسؤول.'
                            )}
                        </p>
                    </article>
                </div>
            </section>
        </MarketingLayout>
    );
}
