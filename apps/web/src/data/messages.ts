import type { Language } from '../types/demo';

export const messages: Record<Language, Record<string, string>> = {
    fr: {
        brand: 'HayatID',
        navLogin: 'Connexion',
        navPrimary: 'Créer un profil',
        heroEyebrow: 'HayatID a Gitex Africa 2026',
        heroTitle: 'L’identité médicale d’urgence qui parle en 3 secondes.',
        heroBody: 'Un QR ou une carte NFC pour afficher les informations vitales, même sans application, même en situation critique.',
        heroPatient: 'Je suis patient',
        heroProfessional: 'Je suis médecin / pharmacien',
        heroPartner: 'Je suis partenaire clinique / pharmacie',
        heroSecondary: 'Ouvrir le scan en direct',
        landingMetrics: 'Validation terrain',
        finalCtaTitle: 'Pret pour une experience qui se comprend avant meme le pitch ?'
    },
    en: {
        brand: 'HayatID',
        navLogin: 'Login',
        navPrimary: 'Create profile',
        heroEyebrow: 'HayatID at Gitex Africa 2026',
        heroTitle: 'Emergency identity that speaks in 3 seconds.',
        heroBody: 'A QR or NFC card that reveals vital emergency information instantly, with no app required.',
        heroPatient: 'I am a patient',
        heroProfessional: 'I am a doctor / pharmacist',
        heroPartner: 'I am a clinic / pharmacy partner',
        heroSecondary: 'Open live scan',
        landingMetrics: 'Field validation',
        finalCtaTitle: 'Ready for an experience that sells itself before the pitch starts?'
    },
    ar: {
        brand: 'HayatID',
        navLogin: 'تسجيل الدخول',
        navPrimary: 'إنشاء ملف',
        heroEyebrow: 'عرض Gitex Africa 2026',
        heroTitle: 'هوية طبية للطوارئ تتكلم خلال 3 ثوان.',
        heroBody: 'بطاقة QR أو NFC تعرض المعلومات الحيوية بسرعة وبدون تطبيق.',
        heroPatient: 'أنا مريض',
        heroProfessional: 'أنا طبيب / صيدلي',
        heroPartner: 'أنا شريك عيادة / صيدلية',
        heroSecondary: 'فتح المسح المباشر',
        landingMetrics: 'التحقق الميداني',
        finalCtaTitle: 'جاهز لعرض يشرح نفسه من أول نظرة؟'
    }
};
