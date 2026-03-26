import type { AccessLog, DocumentCategory, MedicalDocument, Patient, Professional, PublicEmergencyResponse } from '../types/demo';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:4000/api').replace(/\/$/, '');

// DEMO/STAGING ONLY: GITEX presentation account fallback when API is unavailable.
const DEMO_LOGIN_EMAIL = 'oudghirymohamed@gmail.com';
const DEMO_LOGIN_PASSWORD = '555HTM##';
const DEMO_TOKEN = 'demo-gitex-local-token';
const DEMO_EMERGENCY_TOKENS = new Set(['demo-token', 'demo-minor', 'gitex-demo-qr-token']);

// DEMO/STAGING ONLY: GITEX card-verification + registration fallback.
const DEMO_CARD_SERIALS = new Set(['2KS-BETA-NEW', 'GITEX-2026-DEMO', 'GITEX-DEMO-001']);
const DEMO_CARD_ID = 'demo-card-gitex-verified';
const DEMO_OTP_ID = 'demo-otp-gitex-registration';
// Module-level flag — set true when a demo card is verified; cleared after registerPatient.
let _demoRegistrationActive = false;

const DEMO_USER: ApiUser = {
    id: 'user-gitex-demo',
    role: 'patient',
    patientId: 'gitex-demo-patient',
    profileId: 'gitex-demo-patient'
};

const DEMO_DOCUMENTS: MedicalDocument[] = [
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

const DEMO_PATIENT: Patient = {
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

const DEMO_PROFESSIONAL: Professional = {
    id: 'pro-demo-1',
    fullName: 'Dr. Amal Benali',
    profession: 'Emergency doctor',
    licenseRegion: 'Marrakech-Safi',
    phone: '+212611223344',
    kycStatus: 'verified',
    accessHistory: [],
    activeDelegations: []
};

const DEMO_PUBLIC_EMERGENCY: PublicEmergencyResponse = {
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

const DEMO_PUBLIC_EMERGENCY_MINOR: PublicEmergencyResponse = {
    token: 'demo-minor',
    patient: {
        id: 'demo-patient-minor',
        fullName: 'Adam Lahlou',
        age: 9,
        isMinor: true,
        city: 'Casablanca',
        emergencyContact: {
            name: 'Nadia Lahlou',
            relation: 'Mother',
            phone: '+212603551987'
        },
        guardianRelationship: {
            guardianName: 'Nadia Lahlou',
            relation: 'Mother',
            phone: '+212603551987'
        },
        medicalProfile: {
            bloodType: 'A+',
            allergies: ['Latex'],
            implants: [],
            chronicConditions: ['Intermittent asthma'],
            medications: ['Ventolin as needed'],
            g6pd: false,
            advanceDirectives: 'Contact legal guardian before non-urgent decisions.',
            emergencyInstructions: [
                'Notify guardian once patient is stabilized.',
                'Avoid latex exposure.',
                'Escalate for pediatric support when needed.'
            ]
        },
        nfcCard: {
            id: 'card-demo-minor',
            status: 'active',
            issuedAt: '2026-01-18T12:30:00Z',
            qrToken: 'demo-minor',
            lastScannedAt: '2026-03-18T11:10:00Z'
        }
    }
};

export interface ApiUser {
    id: string;
    role: 'patient' | 'doctor' | 'pharmacist' | 'b2b' | 'admin';
    patientId?: string;
    profileId?: string;
}

export type ProfessionalRole = 'doctor' | 'pharmacist';

export interface ProfessionalRegistrationPayload {
    fullName: string;
    professionType: ProfessionalRole;
    phone: string;
    email: string;
    password: string;
    workplaceName: string;
    professionalAddress: string;
    specialty?: string;
    licenseNumber: string;
    profilePhotoUrl?: string;
}

export interface ProfessionalPortalProfile {
    id: string;
    fullName: string;
    professionType: ProfessionalRole;
    phone: string;
    email: string;
    workplaceName: string;
    professionalAddress: string;
    specialty?: string;
    licenseNumber: string;
    profilePhotoUrl?: string;
}

export interface ProfessionalVisitNote {
    id: string;
    text: string;
    createdAt: string;
}

export interface ProfessionalAssignedDocument {
    id: string;
    title: string;
    type: 'prescription' | 'recommendation' | 'care-instruction' | 'report' | 'other';
    createdAt: string;
}

export interface ProfessionalVisit {
    id: string;
    professionalId: string;
    patientName: string;
    visitAt: string;
    sharedMedicalIdentity: {
        bloodType: string;
        allergies: string[];
        conditions: string[];
        emergencyContact: string;
    };
    sharedFiles: string[];
    professionalNotes: ProfessionalVisitNote[];
    assignedDocuments: ProfessionalAssignedDocument[];
}

const PROFESSIONAL_ACCOUNTS_KEY = 'twoKS_professional_accounts';
const PROFESSIONAL_VISITS_KEY = 'twoKS_professional_visits';

interface ProfessionalAccountStore extends ProfessionalPortalProfile {
    password: string;
}

export interface ApiErrorPayload {
    message?: string;
}

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

function isDemoCredentials(loginValue: string, password: string) {
    return loginValue.trim().toLowerCase() === DEMO_LOGIN_EMAIL && password === DEMO_LOGIN_PASSWORD;
}

function readJsonArray<T>(key: string): T[] {
    const raw = localStorage.getItem(key);
    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw) as T[];
    } catch {
        return [];
    }
}

function writeJsonArray<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
}

function seedProfessionalAccounts(): ProfessionalAccountStore[] {
    return [
        {
            id: 'pro-doctor-demo',
            fullName: 'Dr. Amal Benali',
            professionType: 'doctor',
            phone: '+212611223344',
            email: 'doctor.demo@hayatid.info',
            password: 'DoctorDemo123',
            workplaceName: 'Clinique Atlas',
            professionalAddress: 'Marrakech, Morocco',
            specialty: 'General Medicine',
            licenseNumber: 'DOC-MAR-2026-001'
        },
        {
            id: 'pro-pharmacist-demo',
            fullName: 'Sara El Idrissi',
            professionType: 'pharmacist',
            phone: '+212622334455',
            email: 'pharmacist.demo@hayatid.info',
            password: 'PharmaDemo123',
            workplaceName: 'Pharmacie Al Amal',
            professionalAddress: 'Marrakech, Morocco',
            licenseNumber: 'PHA-MAR-2026-001'
        }
    ];
}

function seedProfessionalVisits(): ProfessionalVisit[] {
    return [
        {
            id: 'visit-doctor-001',
            professionalId: 'pro-doctor-demo',
            patientName: 'Mohammed Oudghir',
            visitAt: '2026-03-24T10:15:00Z',
            sharedMedicalIdentity: {
                bloodType: 'A+',
                allergies: ['Latex', 'Aspirin'],
                conditions: ['Hypertension'],
                emergencyContact: 'Fatima Oudghir (+212600778899)'
            },
            sharedFiles: ['Radiology_Chest_2026-03-10.pdf', 'ECG_Report_2026-03-09.pdf'],
            professionalNotes: [
                {
                    id: 'note-doctor-001',
                    text: 'Patient advised to monitor blood pressure twice daily.',
                    createdAt: '2026-03-24T10:30:00Z'
                }
            ],
            assignedDocuments: [
                {
                    id: 'doc-doctor-001',
                    title: 'Hypertension follow-up recommendation',
                    type: 'recommendation',
                    createdAt: '2026-03-24T10:32:00Z'
                }
            ]
        },
        {
            id: 'visit-pharma-001',
            professionalId: 'pro-pharmacist-demo',
            patientName: 'Adam Lahlou',
            visitAt: '2026-03-25T16:40:00Z',
            sharedMedicalIdentity: {
                bloodType: 'A+',
                allergies: ['Latex'],
                conditions: ['Intermittent asthma'],
                emergencyContact: 'Nadia Lahlou (+212603551987)'
            },
            sharedFiles: ['Prescription_Cardiologie.pdf'],
            professionalNotes: [],
            assignedDocuments: []
        }
    ];
}

function getProfessionalAccounts(): ProfessionalAccountStore[] {
    const existing = readJsonArray<ProfessionalAccountStore>(PROFESSIONAL_ACCOUNTS_KEY);
    if (existing.length > 0) {
        return existing;
    }

    const seeded = seedProfessionalAccounts();
    writeJsonArray(PROFESSIONAL_ACCOUNTS_KEY, seeded);
    return seeded;
}

function saveProfessionalAccounts(accounts: ProfessionalAccountStore[]) {
    writeJsonArray(PROFESSIONAL_ACCOUNTS_KEY, accounts);
}

function getProfessionalVisitsStore(): ProfessionalVisit[] {
    const existing = readJsonArray<ProfessionalVisit>(PROFESSIONAL_VISITS_KEY);
    if (existing.length > 0) {
        return existing;
    }

    const seeded = seedProfessionalVisits();
    writeJsonArray(PROFESSIONAL_VISITS_KEY, seeded);
    return seeded;
}

function saveProfessionalVisitsStore(visits: ProfessionalVisit[]) {
    writeJsonArray(PROFESSIONAL_VISITS_KEY, visits);
}

function createProfessionalToken(professionType: ProfessionalRole, profileId: string) {
    return `demo-prof-${professionType}-${profileId}`;
}

function getProfessionalSessionFromToken(token: string): { role: ProfessionalRole; profileId: string } | null {
    if (!token.startsWith('demo-prof-')) {
        return null;
    }

    const parts = token.split('-');
    if (parts.length < 4) {
        return null;
    }

    const role = parts[2];
    const profileId = parts.slice(3).join('-');
    if ((role !== 'doctor' && role !== 'pharmacist') || !profileId) {
        return null;
    }

    return { role, profileId };
}

function isDemoSession() {
    return readAuthToken() === DEMO_TOKEN;
}

function readAuthToken() {
    return localStorage.getItem('twoKS_auth_token') ?? '';
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = readAuthToken();
    const headers = new Headers(init?.headers);

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...init,
            headers
        });
    } catch {
        throw new ApiError('Unable to reach API. Please check server availability.', 0);
    }

    if (!response.ok) {
        const maybeError = (await response.json().catch(() => ({ message: 'Request failed.' }))) as ApiErrorPayload;
        throw new ApiError(maybeError.message ?? 'Request failed.', response.status);
    }

    return (await response.json()) as T;
}

export async function login(loginValue: string, password: string) {
    // DEMO/STAGING ONLY: allow direct presentation login regardless of backend status.
    if (isDemoCredentials(loginValue, password)) {
        return {
            token: DEMO_TOKEN,
            user: DEMO_USER
        };
    }

    return request<{ token: string; user: ApiUser }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginValue, password })
    });
}

export async function getAuthMe() {
    const token = readAuthToken();

    if (isDemoSession()) {
        return { user: DEMO_USER };
    }

    const professionalSession = getProfessionalSessionFromToken(token);
    if (professionalSession) {
        return {
            user: {
                id: `user-${professionalSession.profileId}`,
                role: professionalSession.role,
                profileId: professionalSession.profileId
            } as ApiUser
        };
    }

    return request<{ user: ApiUser }>('/auth/me');
}

export async function registerProfessionalAccount(payload: ProfessionalRegistrationPayload) {
    const accounts = getProfessionalAccounts();
    const email = payload.email.trim().toLowerCase();
    const exists = accounts.some((account) => account.email.toLowerCase() === email);

    if (exists) {
        throw new ApiError('An account already exists with this email.', 409);
    }

    const profileId = `pro-${Date.now()}`;
    const newAccount: ProfessionalAccountStore = {
        id: profileId,
        fullName: payload.fullName.trim(),
        professionType: payload.professionType,
        phone: payload.phone.trim(),
        email,
        password: payload.password,
        workplaceName: payload.workplaceName.trim(),
        professionalAddress: payload.professionalAddress.trim(),
        specialty: payload.specialty?.trim() || undefined,
        licenseNumber: payload.licenseNumber.trim(),
        profilePhotoUrl: payload.profilePhotoUrl
    };

    saveProfessionalAccounts([...accounts, newAccount]);

    return {
        token: createProfessionalToken(newAccount.professionType, newAccount.id),
        user: {
            id: `user-${newAccount.id}`,
            role: newAccount.professionType,
            profileId: newAccount.id
        } as ApiUser
    };
}

export async function loginProfessionalAccount(loginValue: string, password: string, role: ProfessionalRole) {
    const normalized = loginValue.trim().toLowerCase();
    const account = getProfessionalAccounts().find(
        (item) => item.professionType === role && item.email.toLowerCase() === normalized
    );

    if (!account || account.password !== password) {
        throw new ApiError('Invalid professional credentials.', 401);
    }

    return {
        token: createProfessionalToken(account.professionType, account.id),
        user: {
            id: `user-${account.id}`,
            role: account.professionType,
            profileId: account.id
        } as ApiUser
    };
}

function getCurrentProfessionalAccount(): ProfessionalAccountStore | null {
    const token = readAuthToken();
    const session = getProfessionalSessionFromToken(token);

    if (!session) {
        return null;
    }

    return getProfessionalAccounts().find((account) => account.id === session.profileId) ?? null;
}

export async function getProfessionalWorkspace() {
    const account = getCurrentProfessionalAccount();

    if (!account) {
        throw new ApiError('Professional session not found.', 401);
    }

    const visits = getProfessionalVisitsStore().filter((visit) => visit.professionalId === account.id);

    return {
        profile: {
            id: account.id,
            fullName: account.fullName,
            professionType: account.professionType,
            phone: account.phone,
            email: account.email,
            workplaceName: account.workplaceName,
            professionalAddress: account.professionalAddress,
            specialty: account.specialty,
            licenseNumber: account.licenseNumber,
            profilePhotoUrl: account.profilePhotoUrl
        } as ProfessionalPortalProfile,
        visits
    };
}

export async function addProfessionalVisitNote(visitId: string, text: string) {
    const account = getCurrentProfessionalAccount();
    if (!account) {
        throw new ApiError('Professional session not found.', 401);
    }

    const visits = getProfessionalVisitsStore();
    const visit = visits.find((item) => item.id === visitId && item.professionalId === account.id);
    if (!visit) {
        throw new ApiError('Visit not found for this professional.', 404);
    }

    const nextNote: ProfessionalVisitNote = {
        id: `note-${Date.now()}`,
        text: text.trim(),
        createdAt: new Date().toISOString()
    };

    visit.professionalNotes = [nextNote, ...visit.professionalNotes];
    saveProfessionalVisitsStore(visits);
    return nextNote;
}

export async function assignProfessionalDocument(
    visitId: string,
    payload: { title: string; type: ProfessionalAssignedDocument['type'] }
) {
    const account = getCurrentProfessionalAccount();
    if (!account) {
        throw new ApiError('Professional session not found.', 401);
    }

    const visits = getProfessionalVisitsStore();
    const visit = visits.find((item) => item.id === visitId && item.professionalId === account.id);
    if (!visit) {
        throw new ApiError('Visit not found for this professional.', 404);
    }

    const nextDoc: ProfessionalAssignedDocument = {
        id: `assignment-${Date.now()}`,
        title: payload.title.trim(),
        type: payload.type,
        createdAt: new Date().toISOString()
    };

    visit.assignedDocuments = [nextDoc, ...visit.assignedDocuments];
    saveProfessionalVisitsStore(visits);
    return nextDoc;
}

export async function updateProfessionalProfileInfo(payload: Partial<ProfessionalPortalProfile>) {
    const account = getCurrentProfessionalAccount();
    if (!account) {
        throw new ApiError('Professional session not found.', 401);
    }

    const accounts = getProfessionalAccounts();
    const idx = accounts.findIndex((item) => item.id === account.id);
    if (idx < 0) {
        throw new ApiError('Professional profile not found.', 404);
    }

    accounts[idx] = {
        ...accounts[idx],
        fullName: payload.fullName?.trim() || accounts[idx].fullName,
        phone: payload.phone?.trim() || accounts[idx].phone,
        workplaceName: payload.workplaceName?.trim() || accounts[idx].workplaceName,
        professionalAddress: payload.professionalAddress?.trim() || accounts[idx].professionalAddress,
        specialty: payload.specialty?.trim() || accounts[idx].specialty,
        profilePhotoUrl: payload.profilePhotoUrl ?? accounts[idx].profilePhotoUrl
    };

    saveProfessionalAccounts(accounts);

    return {
        id: accounts[idx].id,
        fullName: accounts[idx].fullName,
        professionType: accounts[idx].professionType,
        phone: accounts[idx].phone,
        email: accounts[idx].email,
        workplaceName: accounts[idx].workplaceName,
        professionalAddress: accounts[idx].professionalAddress,
        specialty: accounts[idx].specialty,
        licenseNumber: accounts[idx].licenseNumber,
        profilePhotoUrl: accounts[idx].profilePhotoUrl
    } as ProfessionalPortalProfile;
}

export async function verifyCard(serial: string, activationCode: string) {
    // DEMO/STAGING ONLY: treat any known demo serial as instantly verified.
    if (DEMO_CARD_SERIALS.has(serial.trim().toUpperCase())) {
        _demoRegistrationActive = true;
        return { cardId: DEMO_CARD_ID, serial, status: 'active' };
    }

    return request<{ cardId: string; serial: string; status: string }>('/cards/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial, activationCode })
    });
}

export async function requestOtp(phone: string, profileId: string, scope: 'patient-registration' | 'doctor-onboarding') {
    // DEMO/STAGING ONLY: skip OTP API when a demo registration is in progress.
    if (_demoRegistrationActive) {
        return { otpId: DEMO_OTP_ID, expiresAt: '', message: 'OTP sent.', debugCode: '123456' };
    }

    return request<{ otpId: string; expiresAt: string; message: string; debugCode?: string }>('/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, profileId, scope })
    });
}

export async function verifyOtp(otpId: string, code: string) {
    // DEMO/STAGING ONLY: any 6-digit code is accepted for the demo OTP.
    if (_demoRegistrationActive && otpId === DEMO_OTP_ID) {
        return { status: 'verified' as const };
    }

    return request<{ status: 'verified' }>('/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otpId, code })
    });
}

export interface PatientRegistrationPayload {
    cardId: string;
    otpId: string;
    fullName: string;
    city: string;
    language: 'en' | 'ar';
    age: number;
    isMinor: boolean;
    phone: string;
    emergencyContactName: string;
    emergencyContactRelation: string;
    password: string;
    bloodType: string;
    allergies: string;
    chronicConditions: string;
    medications: string;
    emergencyInstructions: string;
}

export async function registerPatient(payload: PatientRegistrationPayload) {
    // DEMO/STAGING ONLY: create a demo session when the demo card was used.
    if (_demoRegistrationActive && payload.cardId === DEMO_CARD_ID) {
        _demoRegistrationActive = false;
        return { token: DEMO_TOKEN, user: DEMO_USER };
    }

    return request<{ token: string; user: ApiUser }>('/patients/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

export async function onboardDoctor(payload: {
    fullName: string;
    phone: string;
    email: string;
    profession: string;
    licenseRegion: string;
    otpId: string;
}) {
    return request<{ onboardingId: string; status: string }>('/onboarding/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

export async function onboardB2B(payload: {
    organizationName: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    organizationType: 'clinic' | 'pharmacy' | 'other';
}) {
    return request<{ onboardingId: string; status: string }>('/onboarding/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

export async function getPublicEmergencyProfile(token: string): Promise<PublicEmergencyResponse> {
    if (DEMO_EMERGENCY_TOKENS.has(token)) {
        if (token === 'demo-minor') {
            return {
                ...DEMO_PUBLIC_EMERGENCY_MINOR,
                token
            };
        }

        return {
            ...DEMO_PUBLIC_EMERGENCY,
            token
        };
    }

    return request<PublicEmergencyResponse>(`/public/emergency/${encodeURIComponent(token)}`);
}

export async function requestProfessionalOtp(phone: string, patientToken: string) {
    if (DEMO_EMERGENCY_TOKENS.has(patientToken)) {
        return {
            status: 'sent',
            message: 'OTP sent for professional verification.',
            otpId: 'demo-prof-otp',
            debugCode: '123456'
        };
    }

    return request<{ status: string; message: string; otpId: string; debugCode?: string }>('/professional/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, patientToken })
    });
}

export async function verifyProfessionalOtp(otp: string, professionalId: string, patientToken: string) {
    if (DEMO_EMERGENCY_TOKENS.has(patientToken)) {
        if (otp !== '123456') {
            throw new ApiError('Invalid OTP.', 401);
        }

        return {
            status: 'verified',
            accessLevel: 'level-1' as const,
            patient: { ...DEMO_PATIENT, medicalDocuments: [...DEMO_DOCUMENTS] },
            professional: DEMO_PROFESSIONAL
        };
    }

    return request<{ status: string; accessLevel: 'level-1'; patient: Patient; professional: Professional }>('/professional/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, professionalId, patientToken })
    });
}

export async function getPatientMe(): Promise<Patient> {
    if (isDemoSession()) {
        return { ...DEMO_PATIENT, medicalDocuments: [...DEMO_DOCUMENTS] };
    }

    return request<Patient>('/patients/me');
}

export async function getPatientProfile(id: string): Promise<Patient> {
    return request<Patient>(`/patients/${encodeURIComponent(id)}`);
}

export async function updatePatientProfile(id: string, payload: Partial<Patient>): Promise<Patient> {
    return request<Patient>(`/patients/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

export async function revokeCard(cardId: string): Promise<{ status: string; cardId: string }> {
    if (isDemoSession()) {
        return { status: 'revoked', cardId };
    }

    return request<{ status: string; cardId: string }>(`/cards/${encodeURIComponent(cardId)}/revoke`, {
        method: 'POST'
    });
}

export async function getPatientDocuments(patientId: string): Promise<MedicalDocument[]> {
    if (isDemoSession() && patientId === DEMO_PATIENT.id) {
        return [...DEMO_DOCUMENTS];
    }

    return request<MedicalDocument[]>(`/patients/${encodeURIComponent(patientId)}/documents`);
}

export async function uploadPatientDocument(patientId: string, file: File, category: DocumentCategory): Promise<MedicalDocument> {
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
        const maybeError = (await response.json().catch(() => ({ message: 'Upload failed.' }))) as ApiErrorPayload;
        throw new ApiError(maybeError.message ?? 'Upload failed.', response.status);
    }

    return (await response.json()) as MedicalDocument;
}

export async function deletePatientDocument(patientId: string, docId: string) {
    return request<{ status: string; id: string }>(`/patients/${encodeURIComponent(patientId)}/documents/${encodeURIComponent(docId)}`, {
        method: 'DELETE'
    });
}

export async function getProfessionalMe(): Promise<Professional> {
    const account = getCurrentProfessionalAccount();
    if (account) {
        return {
            id: account.id,
            fullName: account.fullName,
            profession: account.professionType === 'doctor' ? 'Doctor' : 'Pharmacist',
            licenseRegion: account.professionalAddress,
            phone: account.phone,
            kycStatus: 'verified',
            accessHistory: [],
            activeDelegations: []
        };
    }

    return request<Professional>('/professional/me');
}

export async function getProfessionalAccessHistory(): Promise<AccessLog[]> {
    const account = getCurrentProfessionalAccount();
    if (account) {
        return getProfessionalVisitsStore()
            .filter((visit) => visit.professionalId === account.id)
            .map((visit) => ({
                id: `access-${visit.id}`,
                actor: visit.patientName,
                role: 'Patient',
                location: account.workplaceName,
                accessLevel: 'level-1',
                timestamp: visit.visitAt,
                status: 'completed'
            }));
    }

    return request<AccessLog[]>('/professional/access-history');
}

export async function getActiveDelegations(): Promise<Professional['activeDelegations']> {
    const account = getCurrentProfessionalAccount();
    if (account) {
        return getProfessionalVisitsStore()
            .filter((visit) => visit.professionalId === account.id)
            .slice(0, 3)
            .map((visit) => ({
                id: `delegation-${visit.id}`,
                patientName: visit.patientName,
                expiresAt: new Date(new Date(visit.visitAt).getTime() + 1000 * 60 * 60 * 12).toISOString(),
                scope: 'Shared medical identity and assigned records'
            }));
    }

    return request<Professional['activeDelegations']>('/professional/delegations');
}

export async function getPendingKyc() {
    return request<Array<{ professionalId: string; name: string; role: string; submittedAt: string; clinic: string; status: string }>>('/admin/pending-kyc');
}

export async function validateKyc(professionalId: string, decision: 'validated' | 'rejected') {
    return request<{ professionalId: string; decision: string; status: string }>(`/admin/kyc/${encodeURIComponent(professionalId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision })
    });
}

export async function getSuspiciousAccess() {
    return request<Array<{ id: string; patient: string; actor: string; location: string; timestamp: string; reason: string }>>('/admin/suspicious-access');
}
