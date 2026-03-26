import { CheckCircle2, ClipboardList, FilePlus2, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import {
    addProfessionalVisitNote,
    assignProfessionalDocument,
    getProfessionalWorkspace,
    updateProfessionalProfileInfo,
    type ProfessionalAssignedDocument,
    type ProfessionalVisit,
    type ProfessionalPortalProfile
} from '../services/api';
import { formatDate } from '../utils/format';

export function ProfessionalDashboardPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const t = (en: string, fr: string, ar: string) => {
        if (language === 'ar') return ar;
        if (language === 'fr') return fr;
        return en;
    };

    const [profile, setProfile] = useState<ProfessionalPortalProfile | null>(null);
    const [visits, setVisits] = useState<ProfessionalVisit[]>([]);
    const [activeVisitId, setActiveVisitId] = useState<string>('');
    const [noteInput, setNoteInput] = useState('');
    const [docTitle, setDocTitle] = useState('');
    const [docType, setDocType] = useState<ProfessionalAssignedDocument['type']>('recommendation');
    const [profileForm, setProfileForm] = useState({
        fullName: '',
        phone: '',
        workplaceName: '',
        professionalAddress: '',
        specialty: ''
    });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    async function loadWorkspace() {
        try {
            const workspace = await getProfessionalWorkspace();
            setProfile(workspace.profile);
            setVisits(workspace.visits);
            setActiveVisitId(workspace.visits[0]?.id ?? '');
            setProfileForm({
                fullName: workspace.profile.fullName,
                phone: workspace.profile.phone,
                workplaceName: workspace.profile.workplaceName,
                professionalAddress: workspace.profile.professionalAddress,
                specialty: workspace.profile.specialty ?? ''
            });
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t('Unable to load workspace.', 'Impossible de charger l espace.', 'تعذر تحميل المساحة المهنية.'));
        }
    }

    useEffect(() => {
        loadWorkspace();
    }, []);

    const activeVisit = useMemo(() => visits.find((visit) => visit.id === activeVisitId) ?? null, [visits, activeVisitId]);

    async function handleAddNote() {
        if (!activeVisitId || !noteInput.trim()) {
            return;
        }

        setStatus('');
        setError('');

        try {
            await addProfessionalVisitNote(activeVisitId, noteInput);
            setNoteInput('');
            setStatus(t('Visit note added successfully.', 'Note de visite ajoutee avec succes.', 'تمت إضافة ملاحظة الزيارة بنجاح.'));
            await loadWorkspace();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t('Unable to add note.', 'Impossible d ajouter la note.', 'تعذر إضافة الملاحظة.'));
        }
    }

    async function handleAssignDocument() {
        if (!activeVisitId || !docTitle.trim()) {
            return;
        }

        setStatus('');
        setError('');

        try {
            await assignProfessionalDocument(activeVisitId, { title: docTitle, type: docType });
            setDocTitle('');
            setStatus(t('Document assigned successfully.', 'Document attribue avec succes.', 'تم إسناد المستند بنجاح.'));
            await loadWorkspace();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t('Unable to assign document.', 'Impossible d attribuer le document.', 'تعذر إسناد المستند.'));
        }
    }

    async function handleProfileSave() {
        if (!profile) {
            return;
        }

        setStatus('');
        setError('');

        try {
            const updated = await updateProfessionalProfileInfo(profileForm);
            setProfile(updated);
            setStatus(t('Professional profile updated.', 'Profil professionnel mis a jour.', 'تم تحديث الملف المهني.'));
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t('Unable to update profile.', 'Impossible de mettre a jour le profil.', 'تعذر تحديث الملف المهني.'));
        }
    }

    if (!profile) {
        return (
            <MarketingLayout>
                <div className="px-6 py-20 text-navy">{t('Loading professional workspace...', 'Chargement de l espace professionnel...', 'جارٍ تحميل المساحة المهنية...')}</div>
            </MarketingLayout>
        );
    }

    return (
        <MarketingLayout>
            <PageMeta
                title={t('HayatID | Professional Dashboard', 'HayatID | Tableau professionnel', 'HayatID | لوحة التحكم المهنية')}
                description={t(
                    'Doctor and pharmacist dashboard focused on patient visits linked to their own sessions.',
                    'Tableau medecin/pharmacien centre sur les visites de patients liees a leurs propres sessions.',
                    'لوحة الطبيب/الصيدلي المركزة على زيارات المرضى المرتبطة بجلساتهم الخاصة.'
                )}
            />

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className={`grid gap-6 lg:grid-cols-[1fr_1.1fr] ${isArabic ? 'font-arabic text-right' : ''}`}>
                    <article className="rounded-[2rem] border border-sapphire/15 bg-white/85 p-6 shadow-soft">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">{t('Professional Profile', 'Profil professionnel', 'الملف المهني')}</p>
                        <h1 className="mt-3 text-3xl font-semibold text-navy">{profile.fullName}</h1>
                        <p className="mt-2 text-sm text-navy/70">
                            {profile.professionType === 'doctor' ? t('Doctor Space', 'Espace medecin', 'مساحة الطبيب') : t('Pharmacist Space', 'Espace pharmacien', 'مساحة الصيدلي')}
                        </p>

                        <div className="mt-6 grid gap-3">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Full name', 'Nom complet', 'الاسم الكامل')}</span>
                                <input value={profileForm.fullName} onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-sapphire" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Phone number', 'Numero de telephone', 'رقم الهاتف')}</span>
                                <input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-sapphire" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Workplace', 'Lieu de travail', 'مكان العمل')}</span>
                                <input value={profileForm.workplaceName} onChange={(e) => setProfileForm({ ...profileForm, workplaceName: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-sapphire" />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-navy">{t('Professional address', 'Adresse professionnelle', 'العنوان المهني')}</span>
                                <input value={profileForm.professionalAddress} onChange={(e) => setProfileForm({ ...profileForm, professionalAddress: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-sapphire" />
                            </label>
                            {profile.professionType === 'doctor' ? (
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-navy">{t('Specialty', 'Specialite', 'التخصص')}</span>
                                    <input value={profileForm.specialty} onChange={(e) => setProfileForm({ ...profileForm, specialty: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-sapphire" />
                                </label>
                            ) : null}
                        </div>
                        <button onClick={handleProfileSave} className="mt-4 inline-flex items-center gap-2 rounded-full bg-sapphire px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0C43A0]">
                            <UserRound className="h-4 w-4" />
                            {t('Save profile', 'Enregistrer le profil', 'حفظ الملف')}
                        </button>
                    </article>

                    <article className="rounded-[2rem] border border-sapphire/15 bg-white/85 p-6 shadow-soft">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sapphire">{t('Visit History', 'Historique des visites', 'سجل الزيارات')}</p>
                                <h2 className="mt-2 text-2xl font-semibold text-navy">{t('Patients linked to your own sessions', 'Patients lies a vos propres sessions', 'المرضى المرتبطون بجلساتك الخاصة')}</h2>
                            </div>
                            <div className="rounded-full bg-sapphire/10 px-4 py-2 text-sm font-semibold text-sapphire">{visits.length} {t('visits', 'visites', 'زيارات')}</div>
                        </div>

                        <div className="mt-5 grid gap-3">
                            {visits.map((visit) => (
                                <button
                                    key={visit.id}
                                    type="button"
                                    onClick={() => setActiveVisitId(visit.id)}
                                    className={`w-full rounded-2xl border p-4 text-left transition ${activeVisitId === visit.id ? 'border-sapphire bg-sapphire/5' : 'border-slate-200 hover:border-sapphire/40'} ${isArabic ? 'text-right' : ''}`}
                                >
                                    <p className="font-semibold text-navy">{visit.patientName}</p>
                                    <p className="mt-1 text-sm text-navy/70">{formatDate(visit.visitAt)}</p>
                                </button>
                            ))}
                        </div>

                        {activeVisit ? (
                            <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-canvas p-4">
                                <div>
                                    <p className="text-sm font-semibold text-navy">{t('Basic shared medical identity data', 'Donnees medicales partagees', 'بيانات الهوية الطبية المشتركة')}</p>
                                    <p className="mt-2 text-sm text-navy/75">
                                        {t('Blood type', 'Groupe sanguin', 'فصيلة الدم')}: {activeVisit.sharedMedicalIdentity.bloodType} · {t('Allergies', 'Allergies', 'الحساسيات')}: {activeVisit.sharedMedicalIdentity.allergies.join(', ') || '-'}
                                    </p>
                                    <p className="mt-1 text-sm text-navy/75">
                                        {t('Conditions', 'Conditions', 'الحالات المرضية')}: {activeVisit.sharedMedicalIdentity.conditions.join(', ') || '-'}
                                    </p>
                                    <p className="mt-1 text-sm text-navy/75">
                                        {t('Emergency contact', 'Contact d urgence', 'جهة اتصال الطوارئ')}: {activeVisit.sharedMedicalIdentity.emergencyContact}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-navy">{t('Files patient allowed you to view', 'Fichiers partages par le patient', 'الملفات التي سمح المريض بعرضها')}</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-navy/75">
                                        {activeVisit.sharedFiles.length > 0 ? activeVisit.sharedFiles.map((file) => <li key={file}>{file}</li>) : <li>{t('No files shared.', 'Aucun fichier partage.', 'لا توجد ملفات مشتركة.')}</li>}
                                    </ul>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                                        <p className="text-sm font-semibold text-navy">{t('Visit notes', 'Notes de visite', 'ملاحظات الزيارة')}</p>
                                        <div className="mt-2 space-y-2 text-sm text-navy/75">
                                            {activeVisit.professionalNotes.length > 0 ? (
                                                activeVisit.professionalNotes.map((note) => (
                                                    <div key={note.id} className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                                                        <p>{note.text}</p>
                                                        <p className="mt-1 text-xs text-navy/50">{formatDate(note.createdAt)}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>{t('No notes yet.', 'Aucune note pour le moment.', 'لا توجد ملاحظات بعد.')}</p>
                                            )}
                                        </div>
                                        <textarea value={noteInput} onChange={(e) => setNoteInput(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sapphire" placeholder={t('Add note for this visit...', 'Ajouter une note pour cette visite...', 'أضف ملاحظة لهذه الزيارة...')} />
                                        <button onClick={handleAddNote} className="mt-2 inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white px-3 py-1.5 text-xs font-semibold text-sapphire hover:border-sapphire">
                                            <ClipboardList className="h-3.5 w-3.5" />
                                            {t('Add note', 'Ajouter une note', 'إضافة ملاحظة')}
                                        </button>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                                        <p className="text-sm font-semibold text-navy">{t('Assigned documents', 'Documents attribues', 'المستندات المسندة')}</p>
                                        <div className="mt-2 space-y-2 text-sm text-navy/75">
                                            {activeVisit.assignedDocuments.length > 0 ? (
                                                activeVisit.assignedDocuments.map((doc) => (
                                                    <div key={doc.id} className="rounded-lg border border-slate-100 bg-slate-50 p-2">
                                                        <p>{doc.title}</p>
                                                        <p className="mt-1 text-xs text-navy/50">{doc.type} · {formatDate(doc.createdAt)}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>{t('No assigned documents yet.', 'Aucun document attribue pour le moment.', 'لا توجد مستندات مسندة حتى الآن.')}</p>
                                            )}
                                        </div>

                                        <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sapphire" placeholder={t('Document / recommendation title', 'Titre du document / recommandation', 'عنوان المستند / التوصية')} />
                                        <select value={docType} onChange={(e) => setDocType(e.target.value as ProfessionalAssignedDocument['type'])} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sapphire">
                                            <option value="prescription">{t('Prescription', 'Prescription', 'وصفة طبية')}</option>
                                            <option value="recommendation">{t('Recommendation', 'Recommandation', 'توصية')}</option>
                                            <option value="care-instruction">{t('Care instruction', 'Instruction de soin', 'تعليمات رعاية')}</option>
                                            <option value="report">{t('Report', 'Rapport', 'تقرير')}</option>
                                            <option value="other">{t('Other', 'Autre', 'أخرى')}</option>
                                        </select>
                                        <button onClick={handleAssignDocument} className="mt-2 inline-flex items-center gap-2 rounded-full border border-sapphire/20 bg-white px-3 py-1.5 text-xs font-semibold text-sapphire hover:border-sapphire">
                                            <FilePlus2 className="h-3.5 w-3.5" />
                                            {t('Assign document', 'Attribuer le document', 'إسناد مستند')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </article>
                </div>

                {status ? (
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-call/30 bg-call/10 px-4 py-2 text-sm font-semibold text-call">
                        <CheckCircle2 className="h-4 w-4" />
                        {status}
                    </p>
                ) : null}
                {error ? (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-4 py-2 text-sm font-semibold text-emergency">
                        <ShieldCheck className="h-4 w-4" />
                        {error}
                    </p>
                ) : null}
            </section>
        </MarketingLayout>
    );
}
