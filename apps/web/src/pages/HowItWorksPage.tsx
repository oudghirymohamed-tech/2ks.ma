import { Clock3, Link as LinkIcon, QrCode, ShieldCheck, Smartphone, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';

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
            icon: UserCog,
            title: t('1. Create a Medical Identity', '1. Creer une identite medicale', '1. إنشاء هوية طبية'),
            body: t(
                'The patient creates and manages a secure medical profile containing essential information such as blood type, allergies, chronic conditions, medications, implants, emergency contacts, and directives.',
                'Le patient cree et gere un profil medical securise contenant des informations essentielles comme le groupe sanguin, les allergies, les maladies chroniques, les traitements, les implants, les contacts d urgence et les directives.',
                'يقوم المريض بإنشاء وإدارة ملف طبي آمن يتضمن معلومات أساسية مثل فصيلة الدم والحساسيات والأمراض المزمنة والأدوية والزرعات وجهات الاتصال الطارئة والتوجيهات.'
            )
        },
        {
            icon: LinkIcon,
            title: t('2. Link the Card', '2. Lier la carte', '2. ربط البطاقة'),
            body: t(
                'A HayatID NFC card and QR code are linked to the medical identity so the information can be reached quickly when needed.',
                'Une carte NFC HayatID et un code QR sont relies a l identite medicale pour permettre un acces rapide aux informations lorsque necessaire.',
                'يتم ربط بطاقة HayatID بتقنية NFC ورمز QR بالهوية الطبية حتى يمكن الوصول إلى المعلومات بسرعة عند الحاجة.'
            )
        },
        {
            icon: QrCode,
            title: t('3. Emergency Access in Seconds', '3. Acces d urgence en quelques secondes', '3. وصول الطوارئ خلال ثوانٍ'),
            body: t(
                'In an emergency, a passerby or healthcare worker scans the NFC card or QR code using a phone browser. Essential medical information becomes visible without requiring an app.',
                'En cas d urgence, un proche ou un professionnel de sante scanne la carte NFC ou le code QR via le navigateur du telephone. Les informations medicales essentielles deviennent visibles sans application.',
                'في حالة الطوارئ، يقوم أحد المارة أو العامل الصحي بمسح بطاقة NFC أو رمز QR عبر متصفح الهاتف، فتظهر المعلومات الطبية الأساسية دون الحاجة إلى تطبيق.'
            )
        },
        {
            icon: ShieldCheck,
            title: t('4. Professional Access', '4. Acces professionnel', '4. وصول المهنيين الصحيين'),
            body: t(
                'Healthcare professionals can go further through a secure verification flow to access extended medical information in an appropriate professional context.',
                'Les professionnels de sante peuvent aller plus loin via un parcours de verification securise pour acceder a des informations medicales etendues dans un cadre professionnel approprie.',
                'يمكن للمهنيين الصحيين التقدم عبر مسار تحقق آمن للوصول إلى معلومات طبية موسعة ضمن سياق مهني مناسب.'
            )
        },
        {
            icon: Clock3,
            title: t('5. Continuous Updates', '5. Mises a jour continues', '5. تحديثات مستمرة'),
            body: t(
                'The patient can keep the profile updated so the medical identity stays relevant, accessible, and useful over time.',
                'Le patient peut maintenir son profil a jour afin que l identite medicale reste pertinente, accessible et utile dans le temps.',
                'يمكن للمريض تحديث الملف بشكل مستمر لتبقى الهوية الطبية دقيقة ومتاحة ومفيدة مع مرور الوقت.'
            )
        }
    ];

    return (
        <MarketingLayout>
            <PageMeta
                title={t('How It Works', 'Comment ca marche', 'كيف يعمل')}
                description={t(
                    'Discover how HayatID connects NFC and QR to secure medical access in a clear step-by-step journey.',
                    'Decouvrez comment HayatID connecte NFC et QR a un acces medical securise dans un parcours clair.',
                    'اكتشف كيف يربط HayatID بين NFC وQR للوصول الطبي الآمن عبر رحلة واضحة خطوة بخطوة.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <div className={isArabic ? 'font-arabic text-right' : ''}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">
                        {t('How It Works', 'Comment ca marche', 'كيف يعمل')}
                    </p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                        {t(
                            'A seamless journey from NFC tap to secure medical access',
                            'Un parcours fluide du geste NFC vers un acces medical securise',
                            'رحلة سلسة من لمس NFC إلى وصول طبي آمن'
                        )}
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg">
                        {t(
                            'HayatID connects a physical NFC card and QR code to a digital medical identity platform. The experience is designed to be fast, accessible, and intuitive.',
                            'HayatID relie une carte NFC physique et un code QR a une plateforme numerique d identite medicale. L experience est pensee pour etre rapide, accessible et intuitive.',
                            'يربط HayatID بطاقة NFC فعلية ورمز QR بمنصة هوية طبية رقمية، وقد صُممت التجربة لتكون سريعة وسهلة ومتاحة للجميع.'
                        )}
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <article
                                key={step.title}
                                className={`rounded-[1.8rem] border border-sapphire/15 bg-powder/25 p-6 ${isArabic ? 'font-arabic text-right' : ''}`}
                            >
                                <div className="inline-flex rounded-2xl bg-sapphire/10 p-3 text-sapphire">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold text-navy">{step.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-navy/75 sm:text-base">{step.body}</p>
                            </article>
                        );
                    })}
                </div>

                <div className={`mt-10 rounded-[2rem] bg-navy p-7 text-white sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <h2 className="text-2xl font-semibold sm:text-3xl">
                        {t(
                            'Built for speed, clarity, and trust',
                            'Concu pour la rapidite, la clarte et la confiance',
                            'مبني على السرعة والوضوح والثقة'
                        )}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                        {t(
                            'HayatID is designed to reduce friction in emergency access while maintaining a modern, structured medical identity experience.',
                            'HayatID est concu pour reduire les frictions lors de l acces d urgence tout en maintenant une experience moderne et structuree d identite medicale.',
                            'تم تصميم HayatID لتقليل الاحتكاك في الوصول الطارئ مع الحفاظ على تجربة هوية طبية حديثة ومنظمة.'
                        )}
                    </p>
                    <div className="mt-5">
                        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100">
                            {t('Contact Us', 'Contactez-nous', 'تواصل معنا')}
                            <Smartphone className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
