import { ArrowRight, Link as LinkIcon, QrCode, ShieldCheck, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandSiteLayout } from '../components/BrandSiteLayout';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

export function HowItWorksPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const steps = [
        {
            icon: LinkIcon,
            title: t('Identity Link', 'Lien d identite', 'ربط الهوية'),
            cue: t('Foundation', 'Fondation', 'الأساس'),
            body: t(
                'A physical identifier is linked to a structured medical identity context.',
                'Un identifiant physique est lie a un contexte d identite medicale structure.',
                'يتم ربط معرف مادي بسياق هوية طبية منظم.'
            )
        },
        {
            icon: Waves,
            title: t('Contactless Trigger', 'Declenchement sans contact', 'تشغيل بدون تلامس'),
            cue: t('Activation', 'Activation', 'التفعيل'),
            body: t(
                'NFC interaction initiates fast access with minimal friction and clear intent.',
                'L interaction NFC declenche un acces rapide avec une friction minimale et une intention claire.',
                'يبدأ تفاعل NFC وصولاً سريعاً بأقل احتكاك وبنية واضحة.'
            )
        },
        {
            icon: QrCode,
            title: t('Readable Health Context', 'Contexte de sante lisible', 'سياق صحي قابل للقراءة'),
            cue: t('Interpretation', 'Interpretation', 'التفسير'),
            body: t(
                'Essential information is displayed in a concise, recognizable structure.',
                'Les informations essentielles sont affichees dans une structure concise et reconnaissable.',
                'تُعرض المعلومات الأساسية ضمن بنية موجزة وسهلة التعرّف.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('Trusted Continuity', 'Continuite de confiance', 'استمرارية موثوقة'),
            cue: t('Reliability', 'Fiabilite', 'الاعتمادية'),
            body: t(
                'The experience remains consistent and dependable across critical situations.',
                'L experience reste coherente et fiable a travers les situations critiques.',
                'تبقى التجربة متسقة ويمكن الاعتماد عليها عبر المواقف الحرجة.'
            )
        }
    ];

    return (
        <BrandSiteLayout>
            <PageMeta
                title={t('How It Works | HayatID', 'Fonctionnement | HayatID', 'كيف يعمل | HayatID')}
                description={t(
                    'Explore the HayatID process through a clear premium medical-tech journey.',
                    'Explorez le processus HayatID a travers un parcours medical-tech premium et clair.',
                    'اكتشف آلية HayatID عبر رحلة طبية تقنية راقية وواضحة.'
                )}
            />

            <section className="motion-section mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
                <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className={`interactive-hover relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(11,33,64,0.96),rgba(5,18,37,0.96))] p-7 shadow-[0_24px_68px_rgba(0,0,0,0.26)] sm:p-10 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-sky-200/12 blur-3xl" aria-hidden />
                        <div className="absolute left-1/3 top-2 h-28 w-28 rounded-full bg-blue-200/10 blur-3xl" aria-hidden />
                        <p className="relative z-[1] text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/62">{t('How It Works', 'Comment ca marche', 'كيف يعمل')}</p>
                        <h1 className="font-editorial relative z-[1] mt-4 max-w-4xl text-[clamp(2.45rem,6.5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.025em] text-white">
                            {t(
                                'A visually guided journey from identity signal to trusted medical clarity.',
                                'Un parcours visuellement guide du signal d identite vers une clarte medicale fiable.',
                                'رحلة موجهة بصرياً من إشارة الهوية إلى وضوح طبي موثوق.'
                            )}
                        </h1>
                        <p className="relative z-[1] mt-6 max-w-3xl text-base leading-8 text-slate-200/76 sm:text-lg">
                            {t(
                                'The flow is intentionally simple: link, trigger, read, and trust. Every stage is designed to stay understandable under pressure while preserving premium medical-tech quality.',
                                'Le flux est volontairement simple : lier, declencher, lire et faire confiance. Chaque etape est concue pour rester comprehensible sous pression tout en preservant une qualite medical-tech premium.',
                                'التدفق بسيط عن قصد: ربط ثم تفعيل ثم قراءة ثم ثقة. صُممت كل مرحلة لتظل مفهومة تحت الضغط مع الحفاظ على جودة طبية تقنية راقية.'
                            )}
                        </p>
                    </div>

                    <aside className={`how-visual-map interactive-hover relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(14,43,79,0.88),rgba(6,22,42,0.94))] p-6 shadow-[0_24px_68px_rgba(0,0,0,0.25)] sm:p-7 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(191,226,255,0.18),transparent_44%)]" aria-hidden />
                        <p className="relative z-[1] text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Flow Preview', 'Apercu du flux', 'معاينة التدفق')}</p>
                        <div className="relative z-[1] mt-5 space-y-4">
                            {steps.map((step, index) => (
                                <div key={`preview-${step.title}`} className="relative flex items-center gap-3">
                                    <span className="how-preview-node inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/9 text-xs font-semibold text-sky-100">
                                        0{index + 1}
                                    </span>
                                    <p className="text-sm font-semibold tracking-[0.02em] text-slate-100/92">{step.title}</p>
                                    {index < steps.length - 1 ? <span className="how-preview-line" aria-hidden /> : null}
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
                <div className="relative grid gap-4 lg:grid-cols-2">
                    <div className="how-step-connector hidden lg:block" aria-hidden />
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <article key={step.title} className={`how-step-card group relative rounded-[1.7rem] border border-white/10 bg-white/6 p-6 transition hover:-translate-y-1 hover:border-sky-200/24 ${isArabic ? 'font-arabic text-right' : ''}`} style={{ animationDelay: `${index * 110}ms` }}>
                                <div className="how-step-glow" aria-hidden />
                                <div className="relative z-[1] flex items-center justify-between gap-3">
                                    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/7 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-100/62">
                                        0{index + 1} • {step.cue}
                                    </span>
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] text-sky-100 transition group-hover:scale-[1.05] group-hover:border-sky-100/36">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                </div>
                                <h2 className="font-editorial relative z-[1] mt-5 text-[2rem] font-medium leading-[1.05] text-white">{step.title}</h2>
                                <p className="relative z-[1] mt-3 text-sm leading-7 text-slate-200/74 sm:text-base">{step.body}</p>
                                <div className="relative z-[1] mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/56">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-200/70" />
                                    {t('Next-stage ready', 'Pret pour l etape suivante', 'جاهز للمرحلة التالية')}
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className={`motion-card interactive-hover mt-8 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(16,47,85,0.74),rgba(8,25,47,0.86))] p-6 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Outcome', 'Resultat', 'النتيجة')}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/76">
                        {t(
                            'The complete flow keeps interaction intuitive while elevating presentation quality to a premium medical-tech standard.',
                            'Le flux complet garde une interaction intuitive tout en elevant la qualite de presentation a un standard medical-tech premium.',
                            'يحافظ التدفق الكامل على سهولة التفاعل مع رفع جودة العرض إلى معيار طبي تقني راقٍ.'
                        )}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/why-it-matters" className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[linear-gradient(135deg,#f5f9ff_0%,#d6e9ff_100%)] px-6 text-sm font-semibold text-[#041225] shadow-[0_12px_34px_rgba(125,193,255,0.18)] transition hover:translate-y-[-1px]">
                            {t('Explore Why It Matters', 'Voir pourquoi c est important', 'اكتشف لماذا يهم')}
                            <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link to="/contact" className="inline-flex min-h-[50px] items-center rounded-full border border-white/16 bg-white/8 px-6 text-sm font-semibold text-white transition hover:bg-white/12">
                            {t('Talk to the Team', 'Parler a l equipe', 'تواصل مع الفريق')}
                        </Link>
                    </div>
                </div>
            </section>
        </BrandSiteLayout>
    );
}
