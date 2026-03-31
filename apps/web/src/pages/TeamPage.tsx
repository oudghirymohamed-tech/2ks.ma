import { BrandSiteLayout } from '../components/BrandSiteLayout';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';

const team = [
    {
        name: 'Lamani Mohamed Nacer',
        role: 'CEO',
        bio: 'Leading the strategic vision of HayatID.'
    },
    {
        name: 'Ennaim Kaoutar',
        role: 'CMO',
        bio: 'Building the brand, communication, and outreach.'
    },
    {
        name: 'Erraoudi Kenza',
        role: 'COO',
        bio: 'Driving operations and project execution.'
    }
] as const;

const accents = ['from-[#9fd8ff] to-[#4f8fff]', 'from-[#9deccf] to-[#2c7af4]', 'from-[#b9cbff] to-[#5a67ff]'] as const;

export function TeamPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const founder = team[0];
    const leadership = team.slice(1);

    return (
        <BrandSiteLayout>
            <PageMeta
                title={t('Team | HayatID', 'Equipe | HayatID', 'الفريق | HayatID')}
                description={t(
                    'Meet the leadership team shaping the HayatID strategy, brand, and operations.',
                    'Rencontrez l equipe dirigeante qui construit la strategie, la marque et les operations de HayatID.',
                    'تعرّف على فريق القيادة الذي يصنع استراتيجية HayatID وعلامتها وعملياتها.'
                )}
            />

            <section className="motion-section mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-16 lg:pt-20">
                <div className={`interactive-hover relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,33,63,0.96),rgba(5,18,37,0.97))] p-7 shadow-[0_28px_72px_rgba(0,0,0,0.3)] sm:p-10 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-sky-200/10 blur-3xl" aria-hidden />
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/62">{t('Team', 'Equipe', 'الفريق')}</p>
                    <h1 className="font-editorial mt-4 max-w-5xl text-[clamp(2.5rem,6.4vw,4.7rem)] font-medium leading-[0.96] tracking-[-0.025em] text-white">
                        {t(
                            'Founders shaping a calm, credible, and premium medical-tech identity.',
                            'Des fondateurs qui faconnent une identite medical-tech premium, credible et apaisante.',
                            'مؤسسون يصنعون هوية طبية تقنية راقية وموثوقة وهادئة.'
                        )}
                    </h1>
                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200/76 sm:text-lg">
                        {t(
                            'The HayatID founders combine strategic direction, narrative clarity, and disciplined execution to make trust tangible in critical healthcare moments.',
                            'Les fondateurs HayatID combinent direction strategique, clarte narrative et discipline d execution pour rendre la confiance tangible dans les moments de sante critiques.',
                            'يجمع مؤسسو HayatID بين التوجيه الاستراتيجي ووضوح السرد والانضباط التنفيذي لجعل الثقة ملموسة في اللحظات الصحية الحرجة.'
                        )}
                    </p>
                </div>
            </section>

            <section className="motion-section mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <article className={`motion-card interactive-hover group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-6 shadow-[0_22px_56px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-sky-200/24 sm:p-8 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-200/10 blur-3xl" aria-hidden />
                    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
                        <div className="rounded-[1.4rem] border border-white/10 bg-[#071f3f]/74 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/56">{t('Founder Spotlight', 'Focus fondateur', 'تسليط الضوء على المؤسس')}</p>
                            <div className="mt-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-xl font-semibold text-sky-100">
                                {founder.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                            </div>
                            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/54">{t('Role', 'Role', 'الدور')}</p>
                            <p className="mt-2 text-lg font-semibold text-white">{founder.role}</p>
                        </div>

                        <div>
                            <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${accents[0]}`} />
                            <h2 className="font-editorial mt-5 text-[2.15rem] font-medium leading-[1.02] text-white sm:text-[2.55rem]">{founder.name}</h2>
                            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-100/62">{t('Founder & Strategic Lead', 'Fondateur et pilotage strategique', 'المؤسس والقيادة الاستراتيجية')}</p>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200/74 sm:text-base">
                                {t(
                                    'Guiding the long-term vision of HayatID with a focus on trusted identity, institutional quality, and high-impact execution in healthcare contexts.',
                                    'Pilote la vision long terme de HayatID avec un accent sur l identite de confiance, la qualite institutionnelle et une execution a fort impact dans les contextes de sante.',
                                    'يقود الرؤية طويلة المدى لـ HayatID مع التركيز على هوية موثوقة وجودة مؤسسية وتنفيذ عالي الأثر في سياقات الرعاية الصحية.'
                                )}
                            </p>
                        </div>
                    </div>
                </article>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {leadership.map((member, index) => (
                        <article
                            key={member.name}
                            className={`motion-card interactive-hover group rounded-[1.65rem] border border-white/10 bg-white/6 p-5 shadow-[0_16px_38px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-sky-200/24 sm:p-6 ${isArabic ? 'font-arabic text-right' : ''}`}
                        >
                            <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${accents[index + 1]}`} />
                            <div className="mt-5 flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-editorial text-[1.7rem] font-medium leading-[1.05] text-white">{member.name}</h3>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100/62">{member.role}</p>
                                </div>
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-sm font-semibold text-sky-100 transition group-hover:scale-[1.04]">
                                    {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                                </span>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-slate-200/72">{member.bio}</p>
                        </article>
                    ))}
                </div>
            </section>
        </BrandSiteLayout>
    );
}
