import path from 'node:path';
import { hashSync } from 'bcryptjs';
import { JSONFilePreset } from 'lowdb/node';
import { randomUUID } from 'node:crypto';
import type { AccessLog, MedicalProfile, Patient, Professional } from '../types/demo.js';

export interface BetaUser {
    id: string;
    role: 'patient' | 'doctor' | 'b2b' | 'admin';
    email: string;
    passwordHash: string;
    profileId: string;
    createdAt: string;
}

export interface BetaCard {
    id: string;
    serial: string;
    activationCode: string;
    qrToken: string;
    status: 'available' | 'active' | 'revoked';
    patientId?: string;
    issuedAt?: string;
    lastScannedAt?: string;
}

export interface PendingOtp {
    id: string;
    phone: string;
    code: string;
    scope: 'patient-registration' | 'doctor-onboarding';
    profileId: string;
    expiresAt: string;
    verified: boolean;
    failedAttempts: number;
}

export interface DoctorOnboarding {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    profession: string;
    licenseRegion: string;
    otpVerified: boolean;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export interface B2BOnboarding {
    id: string;
    organizationName: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    organizationType: 'clinic' | 'pharmacy' | 'other';
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export interface DocumentRecord {
    id: string;
    patientId: string;
    fileName: string;
    category: 'prescription' | 'lab-report' | 'medical-scan' | 'doctor-report' | 'other';
    uploadedAt: string;
    fileSize: number;
    mimeType: string;
    path: string;
}

export interface BetaDatabase {
    patients: Record<string, Patient>;
    professionals: Record<string, Professional>;
    users: Record<string, BetaUser>;
    cards: Record<string, BetaCard>;
    pendingOtps: Record<string, PendingOtp>;
    doctorOnboardings: Record<string, DoctorOnboarding>;
    b2bOnboardings: Record<string, B2BOnboarding>;
    documents: Record<string, DocumentRecord>;
}

function nowIso() {
    return new Date().toISOString();
}

const patientAId = 'demo-patient-a';
const patientBId = 'demo-patient-b';
const gitexDemoPatientId = 'gitex-demo-patient'; // DEMO: GITEX presentation account

const demoProfileA: MedicalProfile = {
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    implants: ['Continuous glucose monitor'],
    chronicConditions: ['Type 1 diabetes'],
    medications: ['Rapid insulin', 'Basal insulin'],
    g6pd: false,
    advanceDirectives: 'No advance directive saved. Contact family if hospitalized.',
    emergencyInstructions: [
        'If hypoglycemia is suspected, administer glucose when possible.',
        'Avoid penicillin unless confirmed safe by medical team.',
        'Show this emergency profile to care staff on admission.'
    ]
};

// DEMO: GITEX presentation patient profile - polished for live demo
const gitexDemoProfile: MedicalProfile = {
    bloodType: 'A+',
    allergies: ['Latex', 'Aspirin'],
    implants: [],
    chronicConditions: ['Hypertension'],
    medications: ['Lisinopril 10mg daily'],
    g6pd: false,
    advanceDirectives: 'Prefers minimally invasive procedures when available.',
    emergencyInstructions: [
        'Contact wife: Fatima (+212 6 XX XXX XXX)',
        'Hospital preference: Private clinic in Marrakech',
        'Insurance policy: Policy #789456 with AllianceCare'
    ]
};

const demoProfileB: MedicalProfile = {
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
};

const demoAccessLogs: AccessLog[] = [
    {
        id: 'log-1',
        actor: 'Public scan',
        role: 'Bystander',
        location: 'Marrakech',
        accessLevel: 'level-0',
        timestamp: '2026-03-20T09:12:00Z',
        status: 'completed'
    }
];

const gitexDemoAccessLogs: AccessLog[] = [
    {
        id: 'gitex-log-1',
        actor: 'Dr. Amal Benali',
        role: 'Emergency Doctor',
        location: 'Clinique Atlas, Marrakech',
        accessLevel: 'level-1',
        timestamp: '2026-03-15T14:22:00Z',
        status: 'completed'
    },
    {
        id: 'gitex-log-2',
        actor: 'Nurse Station',
        role: 'Clinic Staff',
        location: 'Clinique Atlas',
        accessLevel: 'level-0',
        timestamp: '2026-03-10T10:05:00Z',
        status: 'completed'
    },
    {
        id: 'gitex-log-3',
        actor: 'Public scan',
        role: 'Bystander',
        location: 'Near Avenue Menara',
        accessLevel: 'level-0',
        timestamp: '2026-03-05T16:40:00Z',
        status: 'completed'
    }
];

const demoPatientA: Patient = {
    id: patientAId,
    fullName: 'Salma El Idrissi',
    age: 34,
    isMinor: false,
    city: 'Marrakech',
    language: 'en',
    avatarInitials: 'SE',
    profileCompletion: 88,
    emergencyContact: {
        name: 'Youssef El Idrissi',
        relation: 'Spouse',
        phone: '+212661448812'
    },
    medicalProfile: demoProfileA,
    accessLogs: demoAccessLogs,
    nfcCard: {
        id: 'card-a',
        status: 'active',
        issuedAt: '2026-01-10T08:00:00Z',
        qrToken: 'demo-token',
        lastScannedAt: '2026-03-20T09:12:00Z'
    },
    medicalDocuments: []
};

const demoPatientB: Patient = {
    id: patientBId,
    fullName: 'Adam Lahlou',
    age: 9,
    isMinor: true,
    city: 'Casablanca',
    language: 'ar',
    avatarInitials: 'AL',
    profileCompletion: 72,
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
    medicalProfile: demoProfileB,
    accessLogs: demoAccessLogs,
    nfcCard: {
        id: 'card-b',
        status: 'active',
        issuedAt: '2026-01-18T12:30:00Z',
        qrToken: 'demo-minor',
        lastScannedAt: '2026-03-18T11:10:00Z'
    },
    medicalDocuments: []
};

// DEMO: GITEX presentation patient - ready-to-show account with complete profile
const gitexDemoPatient: Patient = {
    id: gitexDemoPatientId,
    fullName: 'Mohammed Oudghir',
    age: 45,
    isMinor: false,
    city: 'Marrakech',
    language: 'en', // Default to English for presentation
    avatarInitials: 'MO',
    profileCompletion: 95, // High completion for polished demo
    emergencyContact: {
        name: 'Fatima Oudghir',
        relation: 'Spouse',
        phone: '+212 6 XX XXX XXX'
    },
    medicalProfile: gitexDemoProfile,
    accessLogs: gitexDemoAccessLogs,
    nfcCard: {
        id: 'card-gitex-demo',
        status: 'active',
        issuedAt: '2026-01-15T10:00:00Z',
        qrToken: 'gitex-demo-qr-token',
        lastScannedAt: '2026-03-20T14:00:00Z'
    },
    medicalDocuments: [
        {
            id: 'doc-gitex-1',
            fileName: 'Cardiology_Report_Feb2026.pdf',
            category: 'doctor-report',
            uploadedAt: '2026-02-15T10:30:00Z',
            fileSize: 245000,
            mimeType: 'application/pdf',
            url: '/uploads/cardiology_report_feb2026.pdf'
        },
        {
            id: 'doc-gitex-2',
            fileName: 'ECG_Examination.pdf',
            category: 'medical-scan',
            uploadedAt: '2026-02-14T09:15:00Z',
            fileSize: 580000,
            mimeType: 'application/pdf',
            url: '/uploads/ecg_examination.pdf'
        },
        {
            id: 'doc-gitex-3',
            fileName: 'Blood_Pressure_Labs_Jan2026.pdf',
            category: 'lab-report',
            uploadedAt: '2026-02-01T14:45:00Z',
            fileSize: 125000,
            mimeType: 'application/pdf',
            url: '/uploads/blood_pressure_labs.pdf'
        },
        {
            id: 'doc-gitex-4',
            fileName: 'Lisinopril_Prescription.pdf',
            category: 'prescription',
            uploadedAt: '2026-01-20T11:00:00Z',
            fileSize: 95000,
            mimeType: 'application/pdf',
            url: '/uploads/lisinopril_prescription.pdf'
        }
    ]
};

const demoProfessional: Professional = {
    id: 'pro-demo-1',
    fullName: 'Dr. Amal Benali',
    profession: 'Emergency doctor',
    licenseRegion: 'Marrakech-Safi',
    phone: '+212611223344',
    kycStatus: 'verified',
    accessHistory: [
        {
            id: 'pro-log-1',
            actor: 'Dr. Amal Benali',
            role: 'Emergency doctor',
            location: 'Clinique Atlas',
            accessLevel: 'level-1',
            timestamp: '2026-03-20T09:18:00Z',
            status: 'completed'
        }
    ],
    activeDelegations: [
        {
            id: 'del-1',
            patientName: 'Salma El Idrissi',
            expiresAt: '2026-04-01T16:30:00Z',
            scope: 'Urgent reading'
        }
    ]
};

const seededCards: Record<string, BetaCard> = {
    'card-a': {
        id: 'card-a',
        serial: '2KS-DEMO-A',
        activationCode: 'ACT-1001',
        qrToken: 'demo-token',
        status: 'active',
        patientId: patientAId,
        issuedAt: '2026-01-10T08:00:00Z',
        lastScannedAt: '2026-03-20T09:12:00Z'
    },
    'card-b': {
        id: 'card-b',
        serial: '2KS-DEMO-B',
        activationCode: 'ACT-1002',
        qrToken: 'demo-minor',
        status: 'active',
        patientId: patientBId,
        issuedAt: '2026-01-18T12:30:00Z',
        lastScannedAt: '2026-03-18T11:10:00Z'
    },
    'card-c': {
        id: 'card-c',
        serial: '2KS-BETA-NEW',
        activationCode: 'ACT-2026',
        qrToken: `beta-${randomUUID().slice(0, 8)}`,
        status: 'available'
    },
    'card-gitex-demo': {
        id: 'card-gitex-demo',
        serial: '2KS-GITEX-2026',
        activationCode: 'GITEX-2026',
        qrToken: 'gitex-demo-qr-token',
        status: 'active',
        patientId: gitexDemoPatientId,
        issuedAt: '2026-01-15T10:00:00Z',
        lastScannedAt: '2026-03-20T14:00:00Z'
    }
};

const defaultDatabase: BetaDatabase = {
    patients: {
        [patientAId]: demoPatientA,
        [patientBId]: demoPatientB,
        [gitexDemoPatientId]: gitexDemoPatient // DEMO: GITEX presentation account
    },
    professionals: {
        [demoProfessional.id]: demoProfessional
    },
    users: {
        'user-patient-demo': {
            id: 'user-patient-demo',
            role: 'patient',
            email: '+212600112233',
            passwordHash: hashSync('Password123', 10),
            profileId: patientAId,
            createdAt: nowIso()
        },
        'user-doctor-demo': {
            id: 'user-doctor-demo',
            role: 'doctor',
            email: 'doctor@2ks.ma',
            passwordHash: hashSync('Password123', 10),
            profileId: 'pro-demo-1',
            createdAt: nowIso()
        },
        'user-gitex-demo': {
            // DEMO: GITEX presentation account - exact credentials for live demo
            id: 'user-gitex-demo',
            role: 'patient',
            email: 'oudghirymohamed@gmail.com',
            passwordHash: hashSync('555HTM##', 10),
            profileId: gitexDemoPatientId,
            createdAt: nowIso()
        }
    },
    cards: seededCards,
    pendingOtps: {},
    doctorOnboardings: {},
    b2bOnboardings: {},
    documents: {}
};

const dbPath = path.join(process.cwd(), 'apps', 'api', 'data', 'beta-db.json');
export const dbPromise = JSONFilePreset<BetaDatabase>(dbPath, defaultDatabase);

export async function getDb() {
    return dbPromise;
}

export function computeInitials(name: string) {
    return name
        .split(' ')
        .map((part) => part.trim()[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export function computeCompletion(profile: MedicalProfile) {
    let score = 40;

    if (profile.allergies.length > 0) score += 15;
    if (profile.chronicConditions.length > 0) score += 15;
    if (profile.medications.length > 0) score += 15;
    if (profile.emergencyInstructions.length > 0) score += 15;

    return Math.min(100, score);
}

export function generateId(prefix: string) {
    return `${prefix}-${randomUUID().slice(0, 8)}`;
}

export function now() {
    return nowIso();
}
