import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandSiteLayout } from '../components/BrandSiteLayout';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

export function LandingPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const highlights = [
        {
            title: t('Instant Contactless Access', 'Acces sans contact instantane', 'وصول فوري بدون تلامس'),
            body: t(
                'Essential identity and health context can be reached quickly through NFC-enabled interaction.',
                'Le contexte d identite et de sante essentiel devient accessible rapidement via une interaction NFC.',
                'يمكن الوصول السريع إلى سياق الهوية والمعلومات الصحية الأساسية عبر تفاعل NFC.'
            )
        },
        {
            title: t('Trust-Led Design', 'Design centre sur la confiance', 'تصميم قائم على الثقة'),
            body: t(
                'A calm, clear, and premium experience designed for critical moments where confidence matters.',
                'Une experience apaisante, claire et premium concue pour les moments critiques ou la confiance est essentielle.',
                'تجربة هادئة وواضحة وراقية صُممت للحظات الحرجة التي تتطلب الثقة.'
            )
        },
        {
            title: t('Powered by 2KS', 'Propulse par 2KS', 'مدعوم من 2KS'),
            body: t(
                'Built with a modern product mindset that combines accessibility, structure, and institutional quality.',
                'Concu avec une vision produit moderne qui combine accessibilite, structure et qualite institutionnelle.',
                'مبني برؤية منتج حديثة تجمع بين سهولة الوصول والتنظيم والجودة المؤسسية.'
            )
        }
    ];

    const heroSignals = [
        t('Contactless', 'Sans contact', 'بدون تلامس'),
        t('Trusted Clarity', 'Clarte fiable', 'وضوح موثوق'),
        t('Critical-Ready', 'Pret au critique', 'جاهز للحالات الحرجة')
    ];

    return (
        <BrandSiteLayout>
            <PageMeta
                title={t('HayatID | Modern Medical Identity', 'HayatID | Identite medicale moderne', 'HayatID | هوية طبية حديثة')}
                description={t(
                    'A premium medical-tech website presenting HayatID as a modern identity concept for clearer, trusted health access.',
                    'Un site medical-tech premium presentant HayatID comme un concept moderne d identite pour un acces a la sante plus clair et fiable.',
                    'موقع طبي تقني راقٍ يقدم HayatID كمفهوم حديث للهوية من أجل وصول صحي أوضح وأكثر موثوقية.'
                )}
            />

            <section className="motion-section mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.96fr)] lg:items-center xl:gap-14">
                    <div className={`${isArabic ? 'font-arabic text-right' : ''} lg:max-w-[38rem]`}>
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-sky-100/74">
                            <span className="inline-block h-2 w-2 rounded-full bg-sky-200/85" />
                            {t('Flagship Experience', 'Experience flagship', 'التجربة الرئيسية')}
                        </div>
                        <h1 className="font-editorial mt-6 max-w-[19ch] text-[clamp(2.2rem,5.4vw,4.65rem)] font-medium leading-[0.98] tracking-[-0.024em] text-white lg:max-w-[17ch]">
                            {t(
                                'The premium medical identity layer for moments where recognition must be instant.',
                                'La couche premium d identite medicale pour les moments ou la reconnaissance doit etre immediate.',
                                'طبقة الهوية الطبية الراقية للحظات التي يجب أن يكون فيها التعرف فورياً.'
                            )}
                        </h1>
                        <p className="mt-5 max-w-[60ch] text-base leading-7 text-slate-200/78 sm:text-[1.04rem] sm:leading-8">
                            {t(
                                'HayatID is designed to present essential health context with institutional elegance, calm readability, and trusted contactless access under pressure.',
                                'HayatID est concu pour presenter le contexte de sante essentiel avec elegance institutionnelle, lisibilite apaisante et acces sans contact fiable sous pression.',
                                'تم تصميم HayatID لعرض السياق الصحي الأساسي بأناقة مؤسسية وقابلية قراءة هادئة ووصول موثوق بدون تلامس تحت الضغط.'
                            )}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                            {heroSignals.map((signal) => (
                                <span key={signal} className="inline-flex items-center rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-sky-100/74">
                                    {signal}
                                </span>
                            ))}
                        </div>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <Link
                                to="/about"
                                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(132deg,#ffffff_0%,#e9f4ff_46%,#cbe4ff_100%)] px-8 text-sm font-semibold tracking-[0.03em] text-[#051429] shadow-[0_18px_48px_rgba(117,194,255,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_54px_rgba(117,194,255,0.3)]"
                            >
                                {t('Discover the Identity Experience', 'Decouvrir l experience identitaire', 'اكتشف تجربة الهوية')}
                                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/7 px-8 text-sm font-semibold tracking-[0.03em] text-white transition hover:border-sky-100/32 hover:bg-white/12"
                            >
                                {t('Start a Conversation', 'Demarrer un echange', 'ابدأ محادثة')}
                            </Link>
                            <Link
                                to="/how-it-works"
                                className="inline-flex min-h-[56px] items-center justify-center rounded-full px-7 text-sm font-semibold tracking-[0.03em] text-sky-100/90 underline decoration-sky-100/35 underline-offset-8 transition hover:text-white"
                            >
                                {t('See How It Works', 'Voir le fonctionnement', 'شاهد كيف يعمل')}
                            </Link>
                        </div>
                        <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
                            {[
                                { value: 'NFC', label: t('Core Interaction', 'Interaction centrale', 'التفاعل الأساسي') },
                                { value: 'QR', label: t('Secondary Access', 'Acces secondaire', 'وصول ثانوي') },
                                { value: '24/7', label: t('Readiness', 'Disponibilite', 'الجاهزية') }
                            ].map((metric) => (
                                <div key={metric.value} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3.5">
                                    <p className="font-editorial text-[1.35rem] leading-none text-white">{metric.value}</p>
                                    <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-sky-100/58">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative lg:ml-auto lg:w-full lg:max-w-[37rem]">
                        <div className="absolute left-[48%] top-[6%] h-64 w-64 -translate-x-1/2 rounded-full bg-sky-300/18 blur-3xl" />
                        <div className="absolute right-[4%] top-[8%] h-44 w-44 rounded-full bg-blue-400/18 blur-3xl" />
                        <div className="home-hero-shell interactive-hover relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03))] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.38)] sm:p-7">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.13),transparent_42%)]" />
                            <div className="relative rounded-[1.7rem] border border-sky-100/12 bg-[linear-gradient(180deg,rgba(8,28,55,0.95),rgba(4,17,37,0.95))] p-5 sm:p-6">
                                <div className="hero-nfc-scene">
                                    <div className="hero-depth-grid" aria-hidden />
                                    <div className="hero-orbit-ring" aria-hidden />
                                    <div className="hero-nfc-scene__glow" />
                                    <div className="hero-scan-zone" aria-hidden />
                                    <div className="hero-scan-flash" aria-hidden />

                                    <div className="hero-phone-float">
                                        <div className="hero-phone-shell">
                                            <div className="hero-phone-screen">
                                                <div className="hero-phone-header">
                                                    <img
                                                        src="/favicon.svg"
                                                        alt="HayatID logo"
                                                        width="40"
                                                        height="40"
                                                        className="h-10 w-10 rounded-xl"
                                                    />
                                                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                                                        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-sky-100/64">HayatID</p>
                                                        <p className="mt-1 text-sm font-semibold text-white">NFC Identity Ready</p>
                                                    </div>
                                                </div>
                                                <div className="hero-phone-band" />
                                                <div className="hero-phone-band hero-phone-band--soft" />
                                                <div className="hero-phone-chip" />
                                                <div className="hero-phone-pill" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hero-nfc-card-float">
                                        <div className="hero-nfc-card">
                                            <div className="hero-nfc-card__shine" />
                                            <div className="hero-nfc-card__topline">
                                                <p className="text-[0.53rem] font-semibold uppercase tracking-[0.2em] text-sky-100/62">HayatID</p>
                                                <div className="hero-nfc-contactless" aria-hidden>
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="hero-nfc-card__middle">
                                                <div className="hero-nfc-chip" aria-hidden />
                                                <img
                                                    src="/favicon.svg"
                                                    alt="HayatID NFC card"
                                                    width="36"
                                                    height="36"
                                                    className="h-9 w-9 rounded-lg"
                                                />
                                            </div>
                                            <div className={`hero-nfc-card__bottom ${isArabic ? 'font-arabic text-right' : ''}`}>
                                                <p className="text-[0.5rem] uppercase tracking-[0.16em] text-sky-100/58">Powered by 2KS</p>
                                                <p className="mt-1 text-[0.66rem] font-semibold tracking-[0.04em] text-white/90">NFC Smart Medical ID</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hero-nfc-pulse hero-nfc-pulse--one" />
                                    <div className="hero-nfc-pulse hero-nfc-pulse--two" />
                                    <div className="hero-nfc-wave hero-nfc-wave--a" />
                                    <div className="hero-nfc-wave hero-nfc-wave--b" />
                                    <div className="hero-nfc-wave hero-nfc-wave--c" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className="grid gap-4 md:grid-cols-3">
                    {highlights.map((item, index) => (
                        <article
                            key={item.title}
                            className={`motion-card interactive-hover rounded-[1.6rem] border border-white/10 bg-white/6 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 ${isArabic ? 'font-arabic text-right' : ''}`}
                            style={{ animationDelay: `${index * 90}ms` }}
                        >
                            <h2 className="font-editorial text-[1.45rem] font-medium leading-[1.12] text-white">{item.title}</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-200/72">{item.body}</p>
                        </article>
                    ))}
                </div>

                <div className={`motion-card interactive-hover mt-8 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,33,63,0.98),rgba(7,24,46,0.98))] p-6 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/60">{t('Explore More', 'Explorer davantage', 'استكشف المزيد')}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/76">
                        {t(
                            'Navigate through dedicated pages to discover the HayatID vision, process, impact, team, and contact experience in detail.',
                            'Parcourez des pages dediees pour decouvrir en detail la vision, le fonctionnement, l impact, l equipe et le contact HayatID.',
                            'تنقل عبر صفحات مخصصة لاكتشاف رؤية HayatID وآلية العمل والأثر والفريق وتجربة التواصل بالتفصيل.'
                        )}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/how-it-works" className="inline-flex min-h-[46px] items-center rounded-full border border-white/16 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/12">
                            {t('How It Works', 'Comment ca marche', 'كيف يعمل')}
                        </Link>
                        <Link to="/why-it-matters" className="inline-flex min-h-[46px] items-center rounded-full border border-white/16 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/12">
                            {t('Why It Matters', 'Pourquoi c est important', 'لماذا يهم')}
                        </Link>
                        <Link to="/team" className="inline-flex min-h-[46px] items-center rounded-full border border-white/16 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/12">
                            {t('Team', 'Equipe', 'الفريق')}
                        </Link>
                    </div>
                </div>
            </section>
        </BrandSiteLayout>
    );
}
