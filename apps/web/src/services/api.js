const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:4000/api').replace(/\/$/, '');
// DEMO/STAGING ONLY: GITEX presentation account fallback when API is unavailable.
const DEMO_LOGIN_EMAIL = 'oudghirymohamed@gmail.com';
const DEMO_LOGIN_PASSWORD = '555HTM##';
const DEMO_TOKEN = 'demo-gitex-local-token';
const DEMO_EMERGENCY_TOKENS = new Set(['demo-token', 'gitex-demo-qr-token']);
// DEMO/STAGING ONLY: GITEX card-verification + registration fallback.
const DEMO_CARD_SERIALS = new Set(['2KS-BETA-NEW', 'GITEX-2026-DEMO', 'GITEX-DEMO-001']);
const DEMO_CARD_ID = 'demo-card-gitex-verified';
const DEMO_OTP_ID = 'demo-otp-gitex-registration';
// Module-level flag — set true when a demo card is verified; cleared after registerPatient.
let _demoRegistrationActive = false;
const DEMO_USER = {
    id: 'user-gitex-demo',
    role: 'patient',
    patientId: 'gitex-demo-patient',
    profileId: 'gitex-demo-patient'
};
const DEMO_DOCUMENTS = [
    {
        id: 'demo-doc-analysis',
        fileName: 'Analyses_Biochimie_Mars_2026.pdf',
        category: 'lab-report',
        uploadedAt: '2026-03-12T09:30:00Z',
        fileSize: 224000,
        mimeType: 'application/pdf',
        url: '/uploads/demo-analyses.pdf'
    },
    {
        id: 'demo-doc-radiology',
        fileName: 'Radiology_Chest_2026-03-10.pdf',
        category: 'medical-scan',
        uploadedAt: '2026-03-10T15:20:00Z',
        fileSize: 482000,
        mimeType: 'application/pdf',
        url: '/uploads/demo-radiology.pdf'
    },
    {
        id: 'demo-doc-ecg',
        fileName: 'ECG_Report_2026-03-09.pdf',
        category: 'medical-scan',
        uploadedAt: '2026-03-09T08:45:00Z',
        fileSize: 198000,
        mimeType: 'application/pdf',
        url: '/uploads/demo-ecg.pdf'
    },
    {
        id: 'demo-doc-prescription',
        fileName: 'Prescription_Cardiologie.pdf',
        category: 'prescription',
        uploadedAt: '2026-03-08T11:05:00Z',
        fileSize: 116000,
        mimeType: 'application/pdf',
        url: '/uploads/demo-prescription.pdf'
    },
    {
        id: 'demo-doc-other',
        fileName: 'Other_Insurance_Authorization.pdf',
        category: 'other',
        uploadedAt: '2026-03-07T13:55:00Z',
        fileSize: 91000,
        mimeType: 'application/pdf',
        url: '/uploads/demo-other.pdf'
    }
];
const DEMO_PATIENT = {
    id: 'gitex-demo-patient',
    fullName: 'Mohammed Oudghir',
    age: 45,
    isMinor: false,
    city: 'Marrakech',
    language: 'fr',
    avatarInitials: 'MO',
    profileCompletion: 95,
    emergencyContact: {
        name: 'Fatima Oudghir',
        relation: 'Spouse',
        phone: '+212600778899'
    },
    medicalProfile: {
        bloodType: 'A+',
        allergies: ['Latex', 'Aspirin'],
        implants: [],
        chronicConditions: ['Hypertension'],
        medications: ['Lisinopril 10mg'],
        g6pd: false,
        advanceDirectives: 'Contact spouse for non-emergency decisions.',
        emergencyInstructions: [
            'ECG history available in records.',
            'Prefer private clinic in Marrakech when possible.',
            'Share emergency profile with triage immediately.'
        ]
    },
    accessLogs: [
        {
            id: 'demo-log-1',
            actor: 'Dr. Amal Benali',
            role: 'Emergency Doctor',
            location: 'Clinique Atlas',
            accessLevel: 'level-1',
            timestamp: '2026-03-15T14:22:00Z',
            status: 'completed'
        },
        {
            id: 'demo-log-2',
            actor: 'Public scan',
            role: 'Bystander',
            location: 'Marrakech center',
            accessLevel: 'level-0',
            timestamp: '2026-03-05T16:40:00Z',
            status: 'completed'
        }
    ],
    nfcCard: {
        id: 'card-gitex-demo',
        status: 'active',
        issuedAt: '2026-01-15T10:00:00Z',
        qrToken: 'gitex-demo-qr-token',
        lastScannedAt: '2026-03-20T14:00:00Z'
    },
    medicalDocuments: DEMO_DOCUMENTS
};
const DEMO_PROFESSIONAL = {
    id: 'pro-demo-1',
    fullName: 'Dr. Amal Benali',
    profession: 'Emergency doctor',
    licenseRegion: 'Marrakech-Safi',
    phone: '+212611223344',
    kycStatus: 'verified',
    accessHistory: [],
    activeDelegations: []
};
const DEMO_PUBLIC_EMERGENCY = {
    token: 'demo-token',
    patient: {
        id: DEMO_PATIENT.id,
        fullName: DEMO_PATIENT.fullName,
        age: DEMO_PATIENT.age,
        isMinor: DEMO_PATIENT.isMinor,
        city: DEMO_PATIENT.city,
        emergencyContact: DEMO_PATIENT.emergencyContact,
        guardianRelationship: DEMO_PATIENT.guardianRelationship,
        medicalProfile: DEMO_PATIENT.medicalProfile,
        nfcCard: DEMO_PATIENT.nfcCard
    }
};
export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = status;
    }
}
function isDemoCredentials(loginValue, password) {
    return loginValue.trim().toLowerCase() === DEMO_LOGIN_EMAIL && password === DEMO_LOGIN_PASSWORD;
}
function isDemoSession() {
    return readAuthToken() === DEMO_TOKEN;
}
function readAuthToken() {
    return localStorage.getItem('twoKS_auth_token') ?? '';
}
async function request(path, init) {
    const token = readAuthToken();
    const headers = new Headers(init?.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...init,
            headers
        });
    }
    catch {
        throw new ApiError('Unable to reach API. Please check server availability.', 0);
    }
    if (!response.ok) {
        const maybeError = (await response.json().catch(() => ({ message: 'Request failed.' })));
        throw new ApiError(maybeError.message ?? 'Request failed.', response.status);
    }
    return (await response.json());
}
export async function login(loginValue, password) {
    // DEMO/STAGING ONLY: allow direct presentation login regardless of backend status.
    if (isDemoCredentials(loginValue, password)) {
        return {
            token: DEMO_TOKEN,
            user: DEMO_USER
        };
    }
    return request('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginValue, password })
    });
}
export async function getAuthMe() {
    if (isDemoSession()) {
        return { user: DEMO_USER };
    }
    return request('/auth/me');
}
export async function verifyCard(serial, activationCode) {
    // DEMO/STAGING ONLY: treat any known demo serial as instantly verified.
    if (DEMO_CARD_SERIALS.has(serial.trim().toUpperCase())) {
        _demoRegistrationActive = true;
        return { cardId: DEMO_CARD_ID, serial, status: 'active' };
    }
    return request('/cards/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial, activationCode })
    });
}
export async function requestOtp(phone, profileId, scope) {
    // DEMO/STAGING ONLY: skip OTP API when a demo registration is in progress.
    if (_demoRegistrationActive) {
        return { otpId: DEMO_OTP_ID, expiresAt: '', message: 'Demo OTP sent.', debugCode: '123456' };
    }
    return request('/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, profileId, scope })
    });
}
export async function verifyOtp(otpId, code) {
    // DEMO/STAGING ONLY: any 6-digit code is accepted for the demo OTP.
    if (_demoRegistrationActive && otpId === DEMO_OTP_ID) {
        return { status: 'verified' };
    }
    return request('/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otpId, code })
    });
}
export async function registerPatient(payload) {
    // DEMO/STAGING ONLY: create a demo session when the demo card was used.
    if (_demoRegistrationActive && payload.cardId === DEMO_CARD_ID) {
        _demoRegistrationActive = false;
        return { token: DEMO_TOKEN, user: DEMO_USER };
    }
    return request('/patients/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}
export async function onboardDoctor(payload) {
    return request('/onboarding/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}
export async function onboardB2B(payload) {
    return request('/onboarding/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}
export async function getPublicEmergencyProfile(token) {
    if (DEMO_EMERGENCY_TOKENS.has(token)) {
        return {
            ...DEMO_PUBLIC_EMERGENCY,
            token
        };
    }
    return request(`/public/emergency/${encodeURIComponent(token)}`);
}
export async function requestProfessionalOtp(phone, patientToken) {
    if (DEMO_EMERGENCY_TOKENS.has(patientToken)) {
        return {
            status: 'sent',
            message: 'OTP sent for professional verification.',
            otpId: 'demo-prof-otp',
            debugCode: '123456'
        };
    }
    return request('/professional/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, patientToken })
    });
}
export async function verifyProfessionalOtp(otp, professionalId, patientToken) {
    if (DEMO_EMERGENCY_TOKENS.has(patientToken)) {
        if (otp !== '123456') {
            throw new ApiError('Invalid OTP.', 401);
        }
        return {
            status: 'verified',
            accessLevel: 'level-1',
            patient: { ...DEMO_PATIENT, medicalDocuments: [...DEMO_DOCUMENTS] },
            professional: DEMO_PROFESSIONAL
        };
    }
    return request('/professional/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, professionalId, patientToken })
    });
}
export async function getPatientMe() {
    if (isDemoSession()) {
        return { ...DEMO_PATIENT, medicalDocuments: [...DEMO_DOCUMENTS] };
    }
    return request('/patients/me');
}
export async function getPatientProfile(id) {
    return request(`/patients/${encodeURIComponent(id)}`);
}
export async function updatePatientProfile(id, payload) {
    return request(`/patients/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}
export async function revokeCard(cardId) {
    if (isDemoSession()) {
        return { status: 'revoked', cardId };
    }
    return request(`/cards/${encodeURIComponent(cardId)}/revoke`, {
        method: 'POST'
    });
}
export async function getPatientDocuments(patientId) {
    if (isDemoSession() && patientId === DEMO_PATIENT.id) {
        return [...DEMO_DOCUMENTS];
    }
    return request(`/patients/${encodeURIComponent(patientId)}/documents`);
}
export async function uploadPatientDocument(patientId, file, category) {
    const token = readAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    const response = await fetch(`${API_BASE_URL}/patients/${encodeURIComponent(patientId)}/documents`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData
    });
    if (!response.ok) {
        const maybeError = (await response.json().catch(() => ({ message: 'Upload failed.' })));
        throw new ApiError(maybeError.message ?? 'Upload failed.', response.status);
    }
    return (await response.json());
}
export async function deletePatientDocument(patientId, docId) {
    return request(`/patients/${encodeURIComponent(patientId)}/documents/${encodeURIComponent(docId)}`, {
        method: 'DELETE'
    });
}
export async function getProfessionalMe() {
    return request('/professional/me');
}
export async function getProfessionalAccessHistory() {
    return request('/professional/access-history');
}
export async function getActiveDelegations() {
    return request('/professional/delegations');
}
export async function getPendingKyc() {
    return request('/admin/pending-kyc');
}
export async function validateKyc(professionalId, decision) {
    return request(`/admin/kyc/${encodeURIComponent(professionalId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision })
    });
}
export async function getSuspiciousAccess() {
    return request('/admin/suspicious-access');
}
