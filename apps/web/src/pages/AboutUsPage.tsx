import { BrandSiteLayout } from '../components/BrandSiteLayout';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

export function AboutUsPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const principles = [
        {
            label: t('Precision', 'Precision', 'الدقة'),
            body: t(
                'Essential health context is prioritized and presented with disciplined clarity.',
                'Le contexte de sante essentiel est priorise et presente avec une clarte rigoureuse.',
                'يتم ترتيب السياق الصحي الأساسي وتقديمه بوضوح منضبط.'
            )
        },
        {
            label: t('Calm Design', 'Design apaisant', 'تصميم هادئ'),
            body: t(
                'A composed visual language reduces cognitive noise in sensitive situations.',
                'Un langage visuel compose reduit le bruit cognitif dans les situations sensibles.',
                'لغة بصرية متزنة تقلل الضجيج الذهني في المواقف الحساسة.'
            )
        },
        {
            label: t('Trusted Access', 'Acces fiable', 'وصول موثوق'),
            body: t(
                'Contactless interaction is structured to feel immediate, readable, and reliable.',
                'L interaction sans contact est structuree pour etre immediate, lisible et fiable.',
                'تمت هيكلة التفاعل بدون تلامس ليكون فورياً وقابلاً للقراءة ويمكن الاعتماد عليه.'
            )
        }
    ];

    const storyMoments = [
        {
            title: t('Observation', 'Observation', 'الملاحظة'),
            body: t(
                'Critical moments often fail because useful information exists but is not instantly understandable.',
                'Les moments critiques echouent souvent car l information utile existe, mais n est pas immediatement comprehensible.',
                'تفشل اللحظات الحرجة غالباً لأن المعلومات المفيدة موجودة لكنها ليست مفهومة فوراً.'
            )
        },
        {
            title: t('Response', 'Reponse', 'الاستجابة'),
            body: t(
                'HayatID turns that gap into a premium identity layer where essentials are presented with confidence.',
                'HayatID transforme cet ecart en une couche identitaire premium ou l essentiel est presente avec confiance.',
                'يحوّل HayatID هذه الفجوة إلى طبقة هوية راقية تُعرض فيها الأساسيات بثقة.'
            )
        },
        {
            title: t('Direction', 'Direction', 'الاتجاه'),
            body: t(
                'The vision is a medical-tech experience that feels modern, humane, and institutionally credible.',
                'La vision est une experience medical-tech moderne, humaine et institutionnellement credible.',
                'الرؤية هي تجربة طبية تقنية حديثة وإنسانية وموثوقة مؤسسياً.'
            )
        }
    ];

    return (
        <BrandSiteLayout>
            <PageMeta
                title={t('About HayatID', 'A propos de HayatID', 'حول HayatID')}
                description={t(
                    'Discover the HayatID vision, mission, and identity principles behind a modern medical-tech concept.',
                    'Decouvrez la vision, la mission et les principes identitaires de HayatID derriere un concept medical-tech moderne.',
                    'اكتشف رؤية HayatID ورسالتها ومبادئ هويتها وراء مفهوم طبي تقني حديث.'
                )}
            />

            <section className="motion-section mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-18 lg:pt-20">
                <div className={`interactive-hover relative overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(162deg,rgba(10,35,68,0.96),rgba(5,18,37,0.98))] p-7 shadow-[0_30px_84px_rgba(0,0,0,0.3)] sm:p-10 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-sky-200/12 blur-3xl" aria-hidden />
                    <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-blue-300/12 blur-3xl" aria-hidden />
                    <p className="relative z-[1] text-sm font-semibold uppercase tracking-[0.26em] text-sky-100/60">{t('About HayatID', 'A propos de HayatID', 'حول HayatID')}</p>
                    <h1 className="font-editorial relative z-[1] mt-4 max-w-5xl text-[clamp(2.55rem,6.8vw,5rem)] font-medium leading-[0.95] tracking-[-0.028em] text-white">
                        {t(
                            'Medical identity, rewritten with editorial clarity and modern trust.',
                            'L identite medicale, reecrite avec une clarte editoriale et une confiance moderne.',
                            'هوية طبية أُعيدت صياغتها بوضوح تحريري وثقة حديثة.'
                        )}
                    </h1>
                    <p className="relative z-[1] mt-6 max-w-3xl text-base leading-8 text-slate-200/78 sm:text-lg">
                        {t(
                            'HayatID is built as a premium medical-tech identity concept where essential health context is communicated with precision, calm, and immediate readability in critical situations.',
                            'HayatID est concu comme un concept premium d identite medical-tech ou le contexte de sante essentiel est communique avec precision, serenite et lisibilite immediate dans les situations critiques.',
                            'تم تصميم HayatID كمفهوم راقٍ للهوية الطبية التقنية حيث يُنقل السياق الصحي الأساسي بدقة وهدوء وقابلية قراءة فورية في المواقف الحرجة.'
                        )}
                    </p>
                    <div className="relative z-[1] mt-8 grid gap-3 sm:grid-cols-3">
                        {principles.map((item) => (
                            <article key={item.label} className="rounded-2xl border border-white/12 bg-white/7 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/62">{item.label}</p>
                                <p className="mt-2 text-sm leading-6 text-slate-200/74">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
                <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
                    <article className={`motion-card interactive-hover rounded-[1.8rem] border border-white/10 bg-white/7 p-6 shadow-[0_20px_52px_rgba(0,0,0,0.2)] sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Story Arc', 'Trame narrative', 'المسار السردي')}</p>
                        <h2 className="font-editorial mt-4 text-[2.25rem] font-medium leading-[1.02] text-white sm:text-[2.65rem]">
                            {t('From urgency to elegance in one identity gesture.', 'De l urgence a l elegance en un geste identitaire.', 'من الاستعجال إلى الأناقة في إيماءة هوية واحدة.')}
                        </h2>
                        <div className="mt-6 space-y-4">
                            {storyMoments.map((moment, index) => (
                                <div key={moment.title} className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] px-4 py-4">
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-100/56">0{index + 1} • {moment.title}</p>
                                    <p className="mt-2 text-sm leading-7 text-slate-200/74">{moment.body}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <div className="grid gap-5">
                        <article className={`motion-card interactive-hover relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(150deg,rgba(20,60,103,0.5),rgba(7,24,48,0.8))] p-6 shadow-[0_20px_52px_rgba(0,0,0,0.2)] sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sky-100/12 blur-3xl" aria-hidden />
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Mission', 'Mission', 'الرسالة')}</p>
                            <h3 className="font-editorial mt-3 text-[2rem] font-medium leading-[1.04] text-white">
                                {t('Present the essential, remove the noise.', 'Presenter l essentiel, supprimer le bruit.', 'عرض الأساسي وإزالة الضجيج.')}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-slate-200/74 sm:text-base">
                                {t(
                                    'Our mission is to shape a medical identity experience where core health signals are recognized immediately with confidence, across real-world contactless moments.',
                                    'Notre mission est de construire une experience d identite medicale ou les signaux de sante essentiels sont reconnus immediatement avec confiance, dans des moments sans contact du monde reel.',
                                    'رسالتنا هي بناء تجربة هوية طبية يتم فيها التعرف الفوري على الإشارات الصحية الأساسية بثقة عبر لحظات التفاعل الواقعية بدون تلامس.'
                                )}
                            </p>
                        </article>

                        <article className={`motion-card interactive-hover rounded-[1.8rem] border border-white/10 bg-[#061a36]/88 p-6 shadow-[0_20px_52px_rgba(0,0,0,0.2)] sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Identity Note', 'Note identitaire', 'ملاحظة الهوية')}</p>
                            <p className="font-editorial mt-4 text-[1.9rem] font-medium leading-[1.08] text-white sm:text-[2.2rem]">
                                {t(
                                    'HayatID is not just a product surface, it is a trust language for medical reality.',
                                    'HayatID n est pas seulement une surface produit, c est un langage de confiance pour la realite medicale.',
                                    'HayatID ليس مجرد واجهة منتج، بل لغة ثقة للواقع الطبي.'
                                )}
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className={`interactive-hover rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(9,30,57,0.9),rgba(5,18,37,0.96))] p-6 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Guiding Values', 'Valeurs directrices', 'القيم الموجهة')}</p>
                        <h2 className="font-editorial mt-3 text-[2.2rem] font-medium leading-[1.03] text-white sm:text-[2.7rem]">
                            {t('A premium medical-tech identity must feel human before it feels technical.', 'Une identite medical-tech premium doit d abord paraitre humaine avant d etre technique.', 'يجب أن تبدو الهوية الطبية التقنية الراقية إنسانية قبل أن تبدو تقنية.')}
                        </h2>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                title: t('Clarity', 'Clarte', 'الوضوح'),
                                body: t('Information should be immediately understandable, especially under pressure.', 'L information doit etre immediatement comprensible, surtout sous pression.', 'يجب أن تكون المعلومات مفهومة فوراً، خاصة تحت الضغط.')
                            },
                            {
                                title: t('Accessibility', 'Accessibilite', 'سهولة الوصول'),
                                body: t('Identity interaction must remain simple, inclusive, and dependable.', 'L interaction identitaire doit rester simple, inclusive et fiable.', 'يجب أن يبقى تفاعل الهوية بسيطاً وشاملاً ويمكن الاعتماد عليه.')
                            },
                            {
                                title: t('Responsibility', 'Responsabilite', 'المسؤولية'),
                                body: t('Design and technology should serve people with trust and care.', 'Le design et la technologie doivent servir les personnes avec confiance et soin.', 'ينبغي أن يخدم التصميم والتقنية الناس بثقة واهتمام.')
                            }
                        ].map((item) => (
                            <article key={item.title} className="motion-card interactive-hover rounded-[1.45rem] border border-white/10 bg-white/7 p-5 shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
                                <h3 className="font-editorial text-[1.55rem] font-medium text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-200/74">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </BrandSiteLayout>
    );
}
