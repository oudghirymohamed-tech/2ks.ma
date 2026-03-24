import { Download, Lock, QrCode, ShieldAlert, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentList } from '../components/DocumentList';
import { DocumentUpload } from '../components/DocumentUpload';
import { PageMeta } from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { deletePatientDocument, getPatientDocuments, getPatientMe, revokeCard, uploadPatientDocument } from '../services/api';
import type { DocumentCategory, Patient } from '../types/demo';
import { formatDate } from '../utils/format';

const dashboardCopy = {
    en: {
        metaTitle: '2ks | Patient dashboard',
        metaDescription:
            'Patient dashboard with profile summary, uploaded medical files, emergency details, home navigation, and logout controls.',
        loading: 'Loading patient dashboard...',
        badge: 'Patient dashboard',
        greeting: 'Hello',
        intro:
            'This dashboard keeps the patient journey simple: emergency profile visibility, secure document management, and clear account actions.',
        home: 'Home',
        logout: 'Logout',
        profileSummary: 'Profile summary',
        profileCompletion: 'Profile completion',
        profileHint: 'The patient can complete extra details later without losing emergency access readiness.',
        cardPreview: 'Card preview',
        emergencyCard: 'Emergency card',
        qrToken: 'QR token',
        lastScan: 'Last scan',
        downloadQr: 'Download QR',
        revokeCard: 'Revoke card',
        nfcStatus: 'NFC status',
        issuedAt: 'Issued at',
        status: 'Status',
        revokeHint:
            'In production this action is audited server-side with strong confirmation.',
        medicalSummary: 'Medical summary',
        allergies: 'Allergies',
        chronic: 'Chronic conditions',
        medications: 'Medications',
        filesTitle: 'Uploaded medical files',
        filesSubtitle: 'Upload and manage your reports, scans, prescriptions, and medical documents.',
        uploadCard: 'Upload a document',
        storedDocs: 'Stored documents',
        secureStorage: 'Documents are stored securely and shared only according to your authorization.',
        timelineTitle: 'Access history',
        timelineSubtitle: 'Patient timeline',
        privacyTitle: 'Privacy-first architecture',
        privacyBody:
            'Sensitive information flows through backend APIs. The frontend displays only authorized responses.',
        errorsPrefix: 'Error:'
    },
    fr: {
        metaTitle: '2ks | Tableau de bord patient',
        metaDescription:
            'Tableau de bord avec resume profile, fichiers medicaux, details urgence, navigation, et deconnexion.',
        loading: 'Chargement du tableau de bord patient...',
        badge: 'Tableau de bord patient',
        greeting: 'Bonjour',
        intro:
            'Ce tableau de bord simplifie votre parcours: profil urgence, gestion securisee, actions claires.',
        home: 'Accueil',
        logout: 'Deconnexion',
        profileSummary: 'Resume du profil',
        profileCompletion: 'Completude du profil',
        profileHint: 'Completez vos details plus tard sans perdre votre acces urgence.',
        cardPreview: 'Apercu de la carte',
        emergencyCard: 'Carte urgence',
        qrToken: 'Code QR',
        lastScan: 'Dernier scan',
        downloadQr: 'Telecharger le QR',
        revokeCard: 'Revoquer la carte',
        nfcStatus: 'Statut NFC',
        issuedAt: 'Emise le',
        status: 'Statut',
        revokeHint:
            'Cette action est enregistree sur le serveur avec confirmation.',
        medicalSummary: 'Resume medical',
        allergies: 'Allergies',
        chronic: 'Maladies chroniques',
        medications: 'Medicaments',
        filesTitle: 'Fichiers medicaux telecharges',
        filesSubtitle: 'Gere vos rapports, scans, ordonnances et documents.',
        uploadCard: 'Telecharger un document',
        storedDocs: 'Documents stockes',
        secureStorage: 'Documents stockes securises et partages selon votre autoristion.',
        timelineTitle: 'Historique acces',
        timelineSubtitle: 'Chrono patient',
        privacyTitle: 'Architecture securisee',
        privacyBody:
            'Les informations sensibles transitent par les APIs. L\'interface affiche les reponses autorisees.',
        errorsPrefix: 'Erreur:'
    },
    ar: {
        metaTitle: '2ks | لوحة المريض',
        metaDescription:
            'لوحة مريض نظيفة تشمل ملخص الملف والوثائق الطبية المرفوعة ومعلومات الطوارئ مع أزرار الصفحة الرئيسية وتسجيل الخروج.',
        loading: 'جارٍ تحميل لوحة المريض...',
        badge: 'لوحة المريض',
        greeting: 'مرحباً',
        intro:
            'هذه اللوحة تبقي تجربة المريض واضحة: ملخص الطوارئ، إدارة آمنة للملفات الطبية، وإجراءات حساب مباشرة.',
        home: 'الرئيسية',
        logout: 'تسجيل الخروج',
        profileSummary: 'ملخص الملف',
        profileCompletion: 'اكتمال الملف',
        profileHint: 'يمكن للمريض استكمال التفاصيل لاحقاً دون فقدان جاهزية الوصول في الطوارئ.',
        cardPreview: 'معاينة البطاقة',
        emergencyCard: 'بطاقة الطوارئ',
        qrToken: 'رمز QR',
        lastScan: 'آخر مسح',
        downloadQr: 'تحميل QR',
        revokeCard: 'إلغاء البطاقة',
        nfcStatus: 'حالة NFC',
        issuedAt: 'تاريخ الإصدار',
        status: 'الحالة',
        revokeHint:
            'في الإنتاج يتم تسجيل هذه العملية في الخادم مع تأكيد قوي.',
        medicalSummary: 'الملخص الطبي',
        allergies: 'الحساسية',
        chronic: 'الأمراض المزمنة',
        medications: 'الأدوية',
        filesTitle: 'الوثائق الطبية المرفوعة',
        filesSubtitle: 'قم برفع وإدارة التحاليل والصور الطبية والوصفات وباقي الملفات الطبية.',
        uploadCard: 'رفع وثيقة',
        storedDocs: 'الوثائق المخزنة',
        secureStorage: 'يتم حفظ الوثائق بشكل آمن ومشاركتها فقط حسب صلاحياتك.',
        timelineTitle: 'سجل الوصول',
        timelineSubtitle: 'تسلسل المريض',
        privacyTitle: 'معمارية الخصوصية أولاً',
        privacyBody:
            'المعلومات الحساسة تمر عبر واجهات الخلفية. الواجهة الأمامية تعرض فقط الاستجابات المصرح بها.',
        errorsPrefix: 'خطأ:'
    }
} as const;

export function DashboardPage() {
    const { logout } = useAuth();
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';
    const copy = dashboardCopy[language === 'en' ? 'en' : language === 'ar' ? 'ar' : 'fr'];

    const [patient, setPatient] = useState<Patient | null>(null);
    const [cardMessage, setCardMessage] = useState(isArabic ? 'البطاقة فعالة' : 'Card active');
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        Promise.all([getPatientMe()])
            .then(async ([me]) => {
                const docs = await getPatientDocuments(me.id);
                setPatient({ ...me, medicalDocuments: docs });
            })
            .catch((error) => {
                setErrorMessage(error instanceof Error ? error.message : 'Failed to load dashboard data.');
            });
    }, []);

    async function handleRevoke() {
        if (!patient) {
            return;
        }

        try {
            const result = await revokeCard(patient.nfcCard.id);
            setCardMessage(isArabic ? `البطاقة ${result.status}` : `Card ${result.status}`);
            setPatient({ ...patient, nfcCard: { ...patient.nfcCard, status: 'revoked' } });
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Card revoke failed.');
        }
    }

    async function handleDocumentUpload(file: File, category: DocumentCategory) {
        if (!patient) return;

        try {
            const newDoc = await uploadPatientDocument(patient.id, file, category);
            setPatient({
                ...patient,
                medicalDocuments: [newDoc, ...patient.medicalDocuments]
            });
            setUploadMessage(isArabic ? `تم رفع الملف "${file.name}" بنجاح` : `Document "${file.name}" uploaded successfully`);
            setTimeout(() => setUploadMessage(''), 3000);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Upload failed.');
        }
    }

    async function handleDocumentDelete(docId: string) {
        if (!patient) return;

        try {
            await deletePatientDocument(patient.id, docId);
            setPatient({
                ...patient,
                medicalDocuments: patient.medicalDocuments.filter((doc) => doc.id !== docId)
            });
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Delete failed.');
        }
    }

    if (!patient) {
        return (
            <MarketingLayout>
                <div className="px-6 py-20">{copy.loading}</div>
            </MarketingLayout>
        );
    }

    return (
        <MarketingLayout>
            <PageMeta title={copy.metaTitle} description={copy.metaDescription} />
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className={isArabic ? 'font-arabic text-right' : ''}>
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{copy.badge}</p>
                                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                                    {copy.greeting}, {patient.fullName}.
                                </h1>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    to="/"
                                    className="inline-flex items-center rounded-full border border-sapphire/30 bg-white px-4 py-2 text-sm font-semibold text-sapphire transition hover:bg-sapphire/10"
                                >
                                    {copy.home}
                                </Link>
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="inline-flex items-center rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#001A4A]"
                                >
                                    {copy.logout}
                                </button>
                            </div>
                        </div>

                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{copy.intro}</p>
                        {errorMessage ? (
                            <div className="mt-4 rounded-2xl border border-emergency/30 bg-emergency/10 px-4 py-3 text-sm font-medium text-emergency">
                                {copy.errorsPrefix} {errorMessage}
                            </div>
                        ) : null}

                        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.profileCompletion}</p>
                                    <p className="mt-2 text-3xl font-semibold text-slate-950">{patient.profileCompletion}%</p>
                                </div>
                                <div className="text-right text-sm text-slate-500">{copy.profileHint}</div>
                            </div>
                            <div className="mt-5 h-3 rounded-full bg-slate-100">
                                <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{ width: `${patient.profileCompletion}%` }} />
                            </div>
                        </div>

                        <div className="mt-8 grid gap-6 xl:grid-cols-2">
                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.cardPreview}</p>
                                        <h2 className="mt-2 text-xl font-semibold text-slate-950">{copy.emergencyCard}</h2>
                                    </div>
                                    <QrCode className="h-6 w-6 text-slate-900" />
                                </div>
                                <div className="mt-5 rounded-[1.75rem] bg-slate-950 p-6 text-white">
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{copy.qrToken}</p>
                                    <p className="mt-3 text-2xl font-semibold">{patient.nfcCard.qrToken}</p>
                                    <p className="mt-4 text-sm text-white/65">
                                        {copy.lastScan}: {formatDate(patient.nfcCard.lastScannedAt)}
                                    </p>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">
                                        <Download className="h-4 w-4" />
                                        {copy.downloadQr}
                                    </button>
                                    <button type="button" onClick={handleRevoke} className="inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2.5 text-sm font-semibold text-white">
                                        <Trash2 className="h-4 w-4" />
                                        {copy.revokeCard}
                                    </button>
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.nfcStatus}</p>
                                <h2 className="mt-2 text-xl font-semibold text-slate-950">{cardMessage}</h2>
                                <div className="mt-5 space-y-4">
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-4">
                                        <p className="text-sm text-slate-500">{copy.issuedAt}</p>
                                        <p className="mt-1 font-semibold text-slate-950">{formatDate(patient.nfcCard.issuedAt)}</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-canvas p-4">
                                        <p className="text-sm text-slate-500">{copy.status}</p>
                                        <p className="mt-1 font-semibold capitalize text-slate-950">{patient.nfcCard.status}</p>
                                    </div>
                                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
                                        {copy.revokeHint}
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className="mt-8 grid gap-6 xl:grid-cols-2">
                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <h2 className="text-xl font-semibold text-slate-950">{copy.medicalSummary}</h2>
                                <div className="mt-5 space-y-4">
                                    <div className="rounded-3xl bg-canvas p-4">
                                        <p className="text-sm text-slate-500">{copy.allergies}</p>
                                        <p className="mt-1 font-medium text-slate-950">{patient.medicalProfile.allergies.join(', ')}</p>
                                    </div>
                                    <div className="rounded-3xl bg-canvas p-4">
                                        <p className="text-sm text-slate-500">{copy.chronic}</p>
                                        <p className="mt-1 font-medium text-slate-950">{patient.medicalProfile.chronicConditions.join(', ')}</p>
                                    </div>
                                    <div className="rounded-3xl bg-canvas p-4">
                                        <p className="text-sm text-slate-500">{copy.medications}</p>
                                        <p className="mt-1 font-medium text-slate-950">{patient.medicalProfile.medications.join(', ')}</p>
                                    </div>
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                                <h2 className="text-xl font-semibold text-slate-950">{copy.profileSummary}</h2>
                                <div className="mt-5 space-y-4">
                                    {[
                                        [isArabic ? 'تصدير البيانات' : 'Export data', isArabic ? 'تحضير نسخة منظمة من بيانات المريض.' : 'Prepare a structured export for patient use.'],
                                        [isArabic ? 'مراجعة عمليات الوصول' : 'Review access logs', isArabic ? 'معرفة من اطلع على الملف ومتى.' : 'Understand who accessed the profile and when.'],
                                        [isArabic ? 'إدارة الموافقات' : 'Manage consents', isArabic ? 'التحكم في الصلاحيات غير الطارئة.' : 'Control non-emergency permissions.']
                                    ].map(([title, body]) => (
                                        <div key={title} className="rounded-3xl border border-slate-200 bg-canvas p-4">
                                            <p className="font-medium text-slate-950">{title}</p>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </div>

                    <div className={`space-y-6 ${isArabic ? 'font-arabic text-right' : ''}`}>
                        <article className="rounded-[2rem] border border-sapphire/20 bg-powder/25 p-6 shadow-soft">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-sapphire p-3 text-white">
                                    <Download className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy/70">{copy.filesTitle}</p>
                                    <p className="text-xl font-semibold text-navy">{copy.filesSubtitle}</p>
                                </div>
                            </div>

                            {uploadMessage && (
                                <div className="mt-4 rounded-2xl border border-call/30 bg-call/20 p-3 text-sm font-medium text-call">
                                    {uploadMessage}
                                </div>
                            )}

                            <div className="mt-6 space-y-6">
                                <div className="rounded-3xl border border-sapphire/25 bg-powder/20 p-5">
                                    <p className="mb-4 text-sm font-semibold text-navy">{copy.uploadCard}</p>
                                    <DocumentUpload
                                        onUpload={handleDocumentUpload}
                                        labels={{
                                            category: isArabic ? 'الفئة' : 'Category',
                                            dropActive: isArabic ? 'ضع الملف هنا' : 'Drop file here',
                                            dropIdle: isArabic ? 'اسحب الملف هنا أو اضغط للتصفح' : 'Drop a file or click to browse',
                                            typesHint: isArabic ? 'PDF, JPG, PNG (حتى 10MB)' : 'PDF, JPG, PNG (max 10 MB)',
                                            browseButton: isArabic ? 'تصفح واختيار ملف' : 'Browse and select file',
                                            categories: isArabic
                                                ? {
                                                    prescription: 'وصفة طبية',
                                                    'lab-report': 'نتيجة مخبرية',
                                                    'medical-scan': 'صورة طبية',
                                                    'doctor-report': 'تقرير طبيب',
                                                    other: 'أخرى'
                                                }
                                                : {
                                                    prescription: 'Prescription',
                                                    'lab-report': 'Lab report',
                                                    'medical-scan': 'Medical scan',
                                                    'doctor-report': 'Doctor report',
                                                    other: 'Other'
                                                }
                                        }}
                                    />
                                </div>

                                <div>
                                    <p className="mb-4 text-sm font-semibold text-navy">
                                        {copy.storedDocs} ({patient.medicalDocuments.length})
                                    </p>
                                    <DocumentList
                                        documents={patient.medicalDocuments}
                                        onDelete={handleDocumentDelete}
                                        labels={{
                                            emptyTitle: isArabic ? 'لا توجد وثائق مرفوعة' : 'No documents uploaded',
                                            emptyHint: isArabic ? 'ابدأ برفع أول وثيقة طبية.' : 'Start by uploading your first medical document.',
                                            viewTitle: isArabic ? 'عرض الوثيقة' : 'View document',
                                            downloadTitle: isArabic ? 'تحميل' : 'Download',
                                            deleteTitle: isArabic ? 'حذف' : 'Delete',
                                            categories: isArabic
                                                ? {
                                                    prescription: 'وصفة طبية',
                                                    'lab-report': 'نتيجة مخبرية',
                                                    'medical-scan': 'صورة طبية',
                                                    'doctor-report': 'تقرير طبيب',
                                                    other: 'أخرى'
                                                }
                                                : {
                                                    prescription: 'Prescription',
                                                    'lab-report': 'Lab report',
                                                    'medical-scan': 'Medical scan',
                                                    'doctor-report': 'Doctor report',
                                                    other: 'Other'
                                                }
                                        }}
                                    />
                                </div>

                                <div className="rounded-3xl border border-sapphire/25 bg-[#011A35] p-4 text-sm leading-6 text-ice/85">
                                    {copy.secureStorage}
                                </div>
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-950 p-3 text-white">
                                    <ShieldAlert className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.timelineTitle}</p>
                                    <p className="text-xl font-semibold text-slate-950">{copy.timelineSubtitle}</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {patient.accessLogs.map((log) => (
                                    <div key={log.id} className="relative rounded-3xl border border-slate-200 bg-canvas p-4 pl-6">
                                        <div className="absolute left-0 top-6 h-10 w-1 rounded-full bg-emerald-500" />
                                        <p className="font-medium text-slate-950">{log.actor}</p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {log.role} · {log.location}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-600">{formatDate(log.timestamp)}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-panel">
                            <div className="flex items-center gap-3">
                                <Lock className="h-5 w-5 text-emerald-300" />
                                <p className="font-semibold">{copy.privacyTitle}</p>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-white/70">{copy.privacyBody}</p>
                        </article>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
