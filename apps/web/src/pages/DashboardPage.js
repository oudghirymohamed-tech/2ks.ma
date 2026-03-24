import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { formatDate } from '../utils/format';
const dashboardCopy = {
    en: {
        metaTitle: '2ks | Patient dashboard',
        metaDescription: 'Patient dashboard with profile summary, uploaded medical files, emergency details, home navigation, and logout controls.',
        loading: 'Loading patient dashboard...',
        badge: 'Patient dashboard',
        greeting: 'Hello',
        intro: 'This dashboard keeps the patient journey simple: emergency profile visibility, secure document management, and clear account actions.',
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
        revokeHint: 'In production this action is audited server-side with strong confirmation.',
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
        privacyBody: 'Sensitive information flows through backend APIs. The frontend displays only authorized responses.',
        errorsPrefix: 'Error:'
    },
    fr: {
        metaTitle: '2ks | Tableau de bord patient',
        metaDescription: 'Tableau de bord avec resume profile, fichiers medicaux, details urgence, navigation, et deconnexion.',
        loading: 'Chargement du tableau de bord patient...',
        badge: 'Tableau de bord patient',
        greeting: 'Bonjour',
        intro: 'Ce tableau de bord simplifie votre parcours: profil urgence, gestion securisee, actions claires.',
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
        revokeHint: 'Cette action est enregistree sur le serveur avec confirmation.',
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
        privacyBody: 'Les informations sensibles transitent par les APIs. L\'interface affiche les reponses autorisees.',
        errorsPrefix: 'Erreur:'
    },
    ar: {
        metaTitle: '2ks | لوحة المريض',
        metaDescription: 'لوحة مريض نظيفة تشمل ملخص الملف والوثائق الطبية المرفوعة ومعلومات الطوارئ مع أزرار الصفحة الرئيسية وتسجيل الخروج.',
        loading: 'جارٍ تحميل لوحة المريض...',
        badge: 'لوحة المريض',
        greeting: 'مرحباً',
        intro: 'هذه اللوحة تبقي تجربة المريض واضحة: ملخص الطوارئ، إدارة آمنة للملفات الطبية، وإجراءات حساب مباشرة.',
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
        revokeHint: 'في الإنتاج يتم تسجيل هذه العملية في الخادم مع تأكيد قوي.',
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
        privacyBody: 'المعلومات الحساسة تمر عبر واجهات الخلفية. الواجهة الأمامية تعرض فقط الاستجابات المصرح بها.',
        errorsPrefix: 'خطأ:'
    }
};
export function DashboardPage() {
    const { logout } = useAuth();
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const isFrench = language === 'fr';
    const copy = dashboardCopy[language === 'en' ? 'en' : language === 'ar' ? 'ar' : 'fr'];
    const [patient, setPatient] = useState(null);
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
        }
        catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Card revoke failed.');
        }
    }
    async function handleDocumentUpload(file, category) {
        if (!patient)
            return;
        try {
            const newDoc = await uploadPatientDocument(patient.id, file, category);
            setPatient({
                ...patient,
                medicalDocuments: [newDoc, ...patient.medicalDocuments]
            });
            setUploadMessage(isArabic ? `تم رفع الملف "${file.name}" بنجاح` : `Document "${file.name}" uploaded successfully`);
            setTimeout(() => setUploadMessage(''), 3000);
        }
        catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Upload failed.');
        }
    }
    async function handleDocumentDelete(docId) {
        if (!patient)
            return;
        try {
            await deletePatientDocument(patient.id, docId);
            setPatient({
                ...patient,
                medicalDocuments: patient.medicalDocuments.filter((doc) => doc.id !== docId)
            });
        }
        catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Delete failed.');
        }
    }
    if (!patient) {
        return (_jsx(MarketingLayout, { children: _jsx("div", { className: "px-6 py-20", children: copy.loading }) }));
    }
    return (_jsxs(MarketingLayout, { children: [_jsx(PageMeta, { title: copy.metaTitle, description: copy.metaDescription }), _jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.1fr_0.9fr]", children: [_jsxs("div", { className: isArabic ? 'font-arabic text-right' : '', children: [_jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700", children: copy.badge }), _jsxs("h1", { className: "mt-3 text-4xl font-semibold tracking-tight text-slate-950", children: [copy.greeting, ", ", patient.fullName, "."] })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Link, { to: "/", className: "inline-flex items-center rounded-full border border-sapphire/30 bg-white px-4 py-2 text-sm font-semibold text-sapphire transition hover:bg-sapphire/10", children: copy.home }), _jsx("button", { type: "button", onClick: logout, className: "inline-flex items-center rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#001A4A]", children: copy.logout })] })] }), _jsx("p", { className: "mt-4 max-w-3xl text-base leading-7 text-slate-600", children: copy.intro }), errorMessage ? (_jsxs("div", { className: "mt-4 rounded-2xl border border-emergency/30 bg-emergency/10 px-4 py-3 text-sm font-medium text-emergency", children: [copy.errorsPrefix, " ", errorMessage] })) : null, _jsxs("div", { className: "mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: copy.profileCompletion }), _jsxs("p", { className: "mt-2 text-3xl font-semibold text-slate-950", children: [patient.profileCompletion, "%"] })] }), _jsx("div", { className: "text-right text-sm text-slate-500", children: copy.profileHint })] }), _jsx("div", { className: "mt-5 h-3 rounded-full bg-slate-100", children: _jsx("div", { className: "h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300", style: { width: `${patient.profileCompletion}%` } }) })] }), _jsxs("div", { className: "mt-8 grid gap-6 xl:grid-cols-2", children: [_jsxs("article", { className: "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: copy.cardPreview }), _jsx("h2", { className: "mt-2 text-xl font-semibold text-slate-950", children: copy.emergencyCard })] }), _jsx(QrCode, { className: "h-6 w-6 text-slate-900" })] }), _jsxs("div", { className: "mt-5 rounded-[1.75rem] bg-slate-950 p-6 text-white", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-white/55", children: copy.qrToken }), _jsx("p", { className: "mt-3 text-2xl font-semibold", children: patient.nfcCard.qrToken }), _jsxs("p", { className: "mt-4 text-sm text-white/65", children: [copy.lastScan, ": ", formatDate(patient.nfcCard.lastScannedAt)] })] }), _jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [_jsxs("button", { type: "button", className: "inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700", children: [_jsx(Download, { className: "h-4 w-4" }), copy.downloadQr] }), _jsxs("button", { type: "button", onClick: handleRevoke, className: "inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2.5 text-sm font-semibold text-white", children: [_jsx(Trash2, { className: "h-4 w-4" }), copy.revokeCard] })] })] }), _jsxs("article", { className: "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: copy.nfcStatus }), _jsx("h2", { className: "mt-2 text-xl font-semibold text-slate-950", children: cardMessage }), _jsxs("div", { className: "mt-5 space-y-4", children: [_jsxs("div", { className: "rounded-3xl border border-slate-200 bg-canvas p-4", children: [_jsx("p", { className: "text-sm text-slate-500", children: copy.issuedAt }), _jsx("p", { className: "mt-1 font-semibold text-slate-950", children: formatDate(patient.nfcCard.issuedAt) })] }), _jsxs("div", { className: "rounded-3xl border border-slate-200 bg-canvas p-4", children: [_jsx("p", { className: "text-sm text-slate-500", children: copy.status }), _jsx("p", { className: "mt-1 font-semibold capitalize text-slate-950", children: patient.nfcCard.status })] }), _jsx("div", { className: "rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900", children: copy.revokeHint })] })] })] }), _jsxs("div", { className: "mt-8 grid gap-6 xl:grid-cols-2", children: [_jsxs("article", { className: "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-950", children: copy.medicalSummary }), _jsxs("div", { className: "mt-5 space-y-4", children: [_jsxs("div", { className: "rounded-3xl bg-canvas p-4", children: [_jsx("p", { className: "text-sm text-slate-500", children: copy.allergies }), _jsx("p", { className: "mt-1 font-medium text-slate-950", children: patient.medicalProfile.allergies.join(', ') })] }), _jsxs("div", { className: "rounded-3xl bg-canvas p-4", children: [_jsx("p", { className: "text-sm text-slate-500", children: copy.chronic }), _jsx("p", { className: "mt-1 font-medium text-slate-950", children: patient.medicalProfile.chronicConditions.join(', ') })] }), _jsxs("div", { className: "rounded-3xl bg-canvas p-4", children: [_jsx("p", { className: "text-sm text-slate-500", children: copy.medications }), _jsx("p", { className: "mt-1 font-medium text-slate-950", children: patient.medicalProfile.medications.join(', ') })] })] })] }), _jsxs("article", { className: "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-950", children: copy.profileSummary }), _jsx("div", { className: "mt-5 space-y-4", children: [
                                                        [isArabic ? 'تصدير البيانات' : 'Export data', isArabic ? 'تحضير نسخة منظمة من بيانات المريض.' : 'Prepare a structured export for patient use.'],
                                                        [isArabic ? 'مراجعة عمليات الوصول' : 'Review access logs', isArabic ? 'معرفة من اطلع على الملف ومتى.' : 'Understand who accessed the profile and when.'],
                                                        [isArabic ? 'إدارة الموافقات' : 'Manage consents', isArabic ? 'التحكم في الصلاحيات غير الطارئة.' : 'Control non-emergency permissions.']
                                                    ].map(([title, body]) => (_jsxs("div", { className: "rounded-3xl border border-slate-200 bg-canvas p-4", children: [_jsx("p", { className: "font-medium text-slate-950", children: title }), _jsx("p", { className: "mt-2 text-sm leading-6 text-slate-600", children: body })] }, title))) })] })] })] }), _jsxs("div", { className: `space-y-6 ${isArabic ? 'font-arabic text-right' : ''}`, children: [_jsxs("article", { className: "rounded-[2rem] border border-sapphire/20 bg-powder/25 p-6 shadow-soft", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-sapphire p-3 text-white", children: _jsx(Download, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-navy/70", children: copy.filesTitle }), _jsx("p", { className: "text-xl font-semibold text-navy", children: copy.filesSubtitle })] })] }), uploadMessage && (_jsx("div", { className: "mt-4 rounded-2xl border border-call/30 bg-call/20 p-3 text-sm font-medium text-call", children: uploadMessage })), _jsxs("div", { className: "mt-6 space-y-6", children: [_jsxs("div", { className: "rounded-3xl border border-sapphire/25 bg-powder/20 p-5", children: [_jsx("p", { className: "mb-4 text-sm font-semibold text-navy", children: copy.uploadCard }), _jsx(DocumentUpload, { onUpload: handleDocumentUpload, labels: {
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
                                                            } })] }), _jsxs("div", { children: [_jsxs("p", { className: "mb-4 text-sm font-semibold text-navy", children: [copy.storedDocs, " (", patient.medicalDocuments.length, ")"] }), _jsx(DocumentList, { documents: patient.medicalDocuments, onDelete: handleDocumentDelete, labels: {
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
                                                            } })] }), _jsx("div", { className: "rounded-3xl border border-sapphire/25 bg-[#011A35] p-4 text-sm leading-6 text-ice/85", children: copy.secureStorage })] })] }), _jsxs("article", { className: "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-slate-950 p-3 text-white", children: _jsx(ShieldAlert, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-500", children: copy.timelineTitle }), _jsx("p", { className: "text-xl font-semibold text-slate-950", children: copy.timelineSubtitle })] })] }), _jsx("div", { className: "mt-6 space-y-4", children: patient.accessLogs.map((log) => (_jsxs("div", { className: "relative rounded-3xl border border-slate-200 bg-canvas p-4 pl-6", children: [_jsx("div", { className: "absolute left-0 top-6 h-10 w-1 rounded-full bg-emerald-500" }), _jsx("p", { className: "font-medium text-slate-950", children: log.actor }), _jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [log.role, " \u00B7 ", log.location] }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: formatDate(log.timestamp) })] }, log.id))) })] }), _jsxs("article", { className: "rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-panel", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Lock, { className: "h-5 w-5 text-emerald-300" }), _jsx("p", { className: "font-semibold", children: copy.privacyTitle })] }), _jsx("p", { className: "mt-4 text-sm leading-7 text-white/70", children: copy.privacyBody })] })] })] }) })] }));
}
