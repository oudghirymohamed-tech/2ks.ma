import { AlertCircle, Eye, ShieldCheck, Zap } from 'lucide-react';
import { BrandSiteLayout } from '../components/BrandSiteLayout';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

export function WhyItMattersPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const values = [
        {
            icon: AlertCircle,
            title: t('Urgency', 'Urgence', 'الاستعجال'),
            cue: t('When seconds decide', 'Quand les secondes decident', 'عندما تحسم الثواني'),
            body: t(
                'Critical moments require immediate understanding, not search and uncertainty.',
                'Les moments critiques exigent une comprehension immediate, pas de recherche ni d incertitude.',
                'اللحظات الحرجة تتطلب فهماً فورياً لا بحثاً وغموضاً.'
            )
        },
        {
            icon: Eye,
            title: t('Instant Recognition', 'Reconnaissance immediate', 'التعرف الفوري'),
            cue: t('Read at first glance', 'Lisible au premier regard', 'مقروء من النظرة الأولى'),
            body: t(
                'Essential information should be clear at first glance in stressful contexts.',
                'Les informations essentielles doivent etre claires des le premier regard dans des contextes stressants.',
                'يجب أن تكون المعلومات الأساسية واضحة من النظرة الأولى في السياقات الضاغطة.'
            )
        },
        {
            icon: Zap,
            title: t('Accessible Interaction', 'Interaction accessible', 'تفاعل سهل الوصول'),
            cue: t('Low-friction access', 'Acces a faible friction', 'وصول منخفض الاحتكاك'),
            body: t(
                'Contactless flow should be simple enough for real situations and diverse users.',
                'Le flux sans contact doit rester suffisamment simple pour les situations reelles et des utilisateurs varies.',
                'ينبغي أن يكون تدفق التفاعل بدون تلامس بسيطاً بما يكفي للمواقف الواقعية ولمستخدمين متنوعين.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('Trusted Experience', 'Experience de confiance', 'تجربة موثوقة'),
            cue: t('Confidence under pressure', 'Confiance sous pression', 'ثقة تحت الضغط'),
            body: t(
                'High-trust design supports calmer decisions when every second matters.',
                'Un design a forte confiance soutient des decisions plus sereines quand chaque seconde compte.',
                'يساعد التصميم عالي الثقة على اتخاذ قرارات أكثر هدوءاً عندما تكون كل ثانية مهمة.'
            )
        }
    ];

    const trustSignals = [
        t('Readable signal hierarchy', 'Hierarchie de signaux lisible', 'ترتيب إشارات قابل للقراءة'),
        t('Calm visual language', 'Langage visuel apaisant', 'لغة بصرية هادئة'),
        t('Immediate contactless path', 'Parcours sans contact immediat', 'مسار فوري بدون تلامس')
    ];

    return (
        <BrandSiteLayout>
            <PageMeta
                title={t('Why It Matters | HayatID', 'Pourquoi c est important | HayatID', 'لماذا يهم | HayatID')}
                description={t(
                    'Understand the impact and value of HayatID in critical healthcare moments.',
                    'Comprenez l impact et la valeur de HayatID dans les moments critiques de sante.',
                    'تعرّف على أثر وقيمة HayatID في اللحظات الصحية الحرجة.'
                )}
            />

            <section className="motion-section mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
                <div className={`interactive-hover relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,33,63,0.97),rgba(5,18,37,0.98))] p-7 shadow-[0_28px_78px_rgba(0,0,0,0.3)] sm:p-10 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-sky-200/12 blur-3xl" aria-hidden />
                    <div className="absolute left-[34%] top-0 h-32 w-32 rounded-full bg-blue-200/10 blur-3xl" aria-hidden />
                    <p className="relative z-[1] text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/60">{t('Why It Matters', 'Pourquoi c est important', 'لماذا يهم')}</p>
                    <h1 className="font-editorial relative z-[1] mt-4 max-w-5xl text-[clamp(2.45rem,6.8vw,4.9rem)] font-medium leading-[0.95] tracking-[-0.026em] text-white">
                        {t(
                            'In medical urgency, trust is not optional. It is the difference between confusion and action.',
                            'Dans l urgence medicale, la confiance n est pas optionnelle. Elle fait la difference entre confusion et action.',
                            'في الاستعجال الطبي، الثقة ليست خياراً، بل الفارق بين الارتباك واتخاذ القرار.'
                        )}
                    </h1>
                    <p className="relative z-[1] mt-6 max-w-3xl text-base leading-8 text-slate-200/78 sm:text-lg">
                        {t(
                            'HayatID exists to transform available data into immediately usable context, so people can understand what matters at the exact moment it matters.',
                            'HayatID existe pour transformer les donnees disponibles en contexte immediatement exploitable, afin que chacun comprenne l essentiel au moment exact ou cela compte.',
                            'وُجد HayatID لتحويل البيانات المتاحة إلى سياق قابل للاستخدام فوراً، بحيث يفهم الجميع ما يهم في اللحظة التي يهم فيها فعلاً.'
                        )}
                    </p>
                    <div className="relative z-[1] mt-7 grid gap-3 sm:grid-cols-3">
                        {trustSignals.map((signal) => (
                            <div key={signal} className="rounded-2xl border border-white/12 bg-white/7 px-4 py-3.5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/62">{signal}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
                <div className={`interactive-hover rounded-[1.9rem] border border-white/10 bg-[linear-gradient(145deg,rgba(15,45,82,0.7),rgba(7,22,44,0.88))] p-6 shadow-[0_20px_52px_rgba(0,0,0,0.22)] sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Human Impact', 'Impact humain', 'الأثر الإنساني')}</p>
                    <p className="font-editorial mt-4 max-w-4xl text-[1.95rem] font-medium leading-[1.05] text-white sm:text-[2.4rem]">
                        {t(
                            'When information feels trustworthy, decisions become calmer, faster, and safer for everyone involved.',
                            'Quand l information parait fiable, les decisions deviennent plus sereines, plus rapides et plus sures pour toutes les personnes impliquees.',
                            'عندما تبدو المعلومات موثوقة، تصبح القرارات أكثر هدوءاً وسرعة وأماناً لكل من يشارك في الموقف.'
                        )}
                    </p>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className="grid gap-4 md:grid-cols-2">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <article
                                key={value.title}
                                className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-sky-200/26 hover:shadow-[0_24px_52px_rgba(0,0,0,0.24)] ${isArabic ? 'font-arabic text-right' : ''}`}
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/12 blur-2xl" aria-hidden />
                                <div className="relative z-[1] inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] text-sky-100 transition group-hover:scale-[1.05] group-hover:border-sky-100/34">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <p className="relative z-[1] mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-100/56">{value.cue}</p>
                                <h2 className="font-editorial relative z-[1] mt-2 text-[2rem] font-medium leading-[1.04] text-white">{value.title}</h2>
                                <p className="relative z-[1] mt-3 text-sm leading-7 text-slate-200/74 sm:text-base">{value.body}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </BrandSiteLayout>
    );
}
