import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building2, HeartHandshake, Hospital, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScanSimulator } from '../components/ScanSimulator';
import { SectionHeading } from '../components/SectionHeading';
import { StatCard } from '../components/StatCard';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { partnerOffers, startupMetrics } from '../data/mockData';
import { MarketingLayout } from '../layouts/MarketingLayout';

const heroCards = [
    {
        title: 'Patient',
        body: 'Créer un profil vital, recevoir une carte QR/NFC et garder la maîtrise des accès.',
        link: '/register',
        icon: HeartHandshake
    },
    {
        title: 'Docteur / pharmacien',
        body: 'Lire l’essentiel en niveau 0, puis débloquer le niveau 1 avec vérification professionnelle.',
        link: '/pro',
        icon: Hospital
    },
    {
        title: 'Clinique / pharmacie',
        body: 'Déployer un flux d’urgence crédible, rassurant et rapide dans vos parcours terrain.',
        link: '/b2b',
        icon: Building2
    }
];

const roadmap = [
    { year: '2026', title: 'Pilotes Marrakech', body: 'Lancement pilote avec pharmacies, cabinets et démonstrations terrain à Marrakech.' },
    { year: '2027', title: 'Expansion Maroc', body: 'Déploiement multi-ville avec onboarding partenaires et validation usage réel.' },
    { year: '2028', title: 'Extension MENA', body: 'Réseau régional pour l’identité médicale d’urgence interopérable.' }
];

export function LandingPage() {
    const { copy, direction, language } = useLanguage();

    return (
        <MarketingLayout>
            <PageMeta
                title="HayatID | Investor-ready emergency identity demo"
                description="Premium Gitex Africa 2026 demo for HayatID by 2KS: emergency QR/NFC identity, patient dashboard, professional verification, and partner flows."
            />

            <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#F5F0E8_0%,#F8F4EE_46%,#FDFBF9_100%)]">
                <div className="absolute inset-0 bg-grid bg-[size:18px_18px] opacity-30" />
                <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-emerald-200/60 blur-3xl" />
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />
                <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
                    <div className="max-w-3xl">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex rounded-full border border-emerald-300/60 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm"
                        >
                            {copy.heroEyebrow}
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
                        >
                            {copy.heroTitle}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14 }}
                            className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
                        >
                            {copy.heroBody}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                                {copy.heroPatient}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/u/demo-token" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400">
                                {copy.heroSecondary}
                                <QrCode className="h-4 w-4" />
                            </Link>
                        </motion.div>

                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {heroCards.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.12 + index * 0.08 }}
                                        className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur"
                                    >
                                        <div className="inline-flex rounded-2xl bg-slate-950 p-3 text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                                        <Link to={item.link} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                            Ouvrir le flux
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={direction === 'rtl' || language === 'ar' ? 'font-arabic' : ''}>
                        <ScanSimulator />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow={copy.landingMetrics}
                    title="Des preuves de terrain conçues pour rassurer sans sur-promettre."
                    body="Ces indicateurs sont des demo proof points pour investisseurs, jurys et partenaires. Ils montrent l’intérêt du marché et la clarté du produit, sans faire de promesse clinique."
                />
                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {startupMetrics.map((metric) => (
                        <StatCard key={metric.label} {...metric} />
                    ))}
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                    <SectionHeading
                        eyebrow="Problème"
                        title="Dans une urgence, manquer une allergie ou un traitement n’est pas un détail."
                        body="Une personne peut être inconsciente, sans téléphone déverrouillé, sans dossier à portée de main. Le temps perdu à chercher une info critique crée un vrai risque médical et décisionnel."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            'Allergies invisibles au premier regard',
                            'Conditions chroniques non signalées à temps',
                            'Médication urgente inconnue du premier intervenant',
                            'Famille impossible à joindre immédiatement'
                        ].map((item) => (
                            <div key={item} className="rounded-3xl border border-slate-200 bg-canvas p-6 shadow-soft">
                                <Sparkles className="h-5 w-5 text-emergency" />
                                <p className="mt-4 text-base font-medium leading-7 text-slate-900">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Solution"
                    title="Un flux simple, visible, mémorisable."
                    body="HayatID réduit le chemin vers l’information utile en trois étapes. C’est ce qui rend la démo forte en booth et crédible en usage terrain."
                />
                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {[
                        ['01', 'Créer le profil', 'Le patient saisit son identité d’urgence, allergies, traitements et contact.'],
                        ['02', 'Recevoir la carte', 'Une carte NFC + QR matérialise l’accès d’urgence sans dépendre d’une app.'],
                        ['03', 'Scanner en urgence', 'Toute personne voit le niveau 0. Les pros vérifiés débloquent le niveau 1.']
                    ].map(([step, title, body]) => (
                        <motion.div key={step} whileHover={{ y: -6 }} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{step}</p>
                            <h3 className="mt-5 text-2xl font-semibold text-slate-950">{title}</h3>
                            <p className="mt-3 text-base leading-7 text-slate-600">{body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="border-y border-slate-200 bg-slate-950 text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
                    <SectionHeading
                        eyebrow="Professionnels"
                        title="Deux niveaux d’accès, expliqués sans ambiguïté."
                        body="Le niveau 0 montre l’essentiel vital à tous. Le niveau 1 ajoute un déverrouillage professionnel par OTP pour plus de contexte, d’audit et de confiance."
                    />
                    <div className="grid gap-4">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Level 0</div>
                            <p className="mt-4 text-xl font-semibold">Scan public immédiat</p>
                            <p className="mt-2 text-sm leading-7 text-white/65">Groupe sanguin, allergies, consignes d’urgence, contact principal.</p>
                        </div>
                        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                            <div className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Level 1</div>
                            <p className="mt-4 text-xl font-semibold">Vérification OTP professionnelle</p>
                            <p className="mt-2 text-sm leading-7 text-emerald-50/80">Historique d’accès, contexte élargi, audit, widgets de délégation active et contrôle plus fin.</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center gap-3 text-emerald-200">
                                <ShieldCheck className="h-5 w-5" />
                                <span className="text-sm font-semibold">Fallbacks UI only</span>
                            </div>
                            <p className="mt-3 text-sm leading-7 text-white/65">TOTP et code d’urgence sont visibles pour la narration produit, sans implémenter de vraie authentification risquée.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="B2B et pricing"
                    title="Une entrée gratuite côté patient, puis des offres fondateurs côté partenaires."
                    body="La valeur business est lisible rapidement: activation patient, lecture pro et adoption via partenaires de proximité."
                />
                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {partnerOffers.map((offer) => (
                        <motion.div key={offer.title} whileHover={{ y: -8 }} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{offer.title}</p>
                            <p className="mt-4 text-4xl font-semibold text-slate-950">{offer.price}</p>
                            <p className="mt-3 text-base leading-7 text-slate-600">{offer.description}</p>
                            <div className="mt-5 flex flex-col gap-3">
                                {offer.bullets.map((bullet) => (
                                    <div key={bullet} className="inline-flex items-center gap-3 text-sm text-slate-700">
                                        <BadgeCheck className="h-4 w-4 text-emerald-600" />
                                        {bullet}
                                    </div>
                                ))}
                            </div>
                            <Link to="/b2b" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                Book partnership discussion
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Roadmap"
                        title="Une trajectoire lisible du pilote local vers l’échelle régionale."
                        body="La roadmap est pensée pour un pitch crédible: commencer étroit, apprendre vite, puis élargir avec des partenaires à forte confiance."
                        align="center"
                    />
                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {roadmap.map((item) => (
                            <div key={item.year} className="rounded-[2rem] border border-slate-200 bg-canvas p-7 shadow-soft">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{item.year}</p>
                                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{item.title}</h3>
                                <p className="mt-3 text-base leading-7 text-slate-600">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="rounded-[2.5rem] bg-slate-950 px-6 py-12 text-white shadow-panel sm:px-10 lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Final CTA</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{copy.finalCtaTitle}</h2>
                        <p className="mt-4 text-base leading-7 text-white/70">Passez d’une vue investor narrative à un vrai parcours produit en un clic.</p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
                        <Link to="/register" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-50">Créer un profil</Link>
                        <Link to="/u/demo-token" className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Scanner le live demo</Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
