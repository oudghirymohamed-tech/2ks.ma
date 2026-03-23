import type { Patient, Professional } from '../types/demo.js';

export const patients: Record<string, Patient> = {
    'demo-patient-a': {
        id: 'demo-patient-a',
        fullName: 'Salma El Idrissi',
        age: 34,
        isMinor: false,
        city: 'Marrakech',
        language: 'fr',
        avatarInitials: 'SE',
        profileCompletion: 88,
        emergencyContact: {
            name: 'Youssef El Idrissi',
            relation: 'Conjoint',
            phone: '+212 6 61 44 88 12'
        },
        medicalProfile: {
            bloodType: 'O+',
            allergies: ['Pénicilline', 'Arachides'],
            implants: ['Capteur glycémique continu'],
            chronicConditions: ['Diabète de type 1'],
            medications: ['Insuline rapide', 'Insuline basale'],
            g6pd: false,
            advanceDirectives: 'Pas de directive avancée enregistrée. Contacter la famille si hospitalisation.',
            emergencyInstructions: [
                'En cas d’hypoglycémie, administrer du glucose si possible.',
                'Ne pas donner de pénicilline sans confirmation médicale.',
                'Présenter ce profil au personnel soignant dès l’admission.'
            ]
        },
        accessLogs: [
            {
                id: 'log-1',
                actor: 'Scan public',
                role: 'Bystander',
                location: 'Marrakech Medina',
                accessLevel: 'level-0',
                timestamp: '2026-02-20T09:12:00Z',
                status: 'completed'
            },
            {
                id: 'log-2',
                actor: 'Dr. A. Benali',
                role: 'Urgentiste',
                location: 'Clinique Atlas',
                accessLevel: 'level-1',
                timestamp: '2026-02-20T09:18:00Z',
                status: 'completed'
            },
            {
                id: 'log-3',
                actor: 'Pharmacie Centrale',
                role: 'Pharmacien',
                location: 'Gueliz',
                accessLevel: 'level-1',
                timestamp: '2026-02-12T17:40:00Z',
                status: 'flagged'
            }
        ],
        nfcCard: {
            id: 'card-a',
            status: 'active',
            issuedAt: '2026-01-10T08:00:00Z',
            qrToken: 'demo-token',
            lastScannedAt: '2026-02-20T09:18:00Z'
        }
    },
    'demo-patient-b': {
        id: 'demo-patient-b',
        fullName: 'Adam Lahlou',
        age: 9,
        isMinor: true,
        city: 'Casablanca',
        language: 'fr',
        avatarInitials: 'AL',
        profileCompletion: 72,
        emergencyContact: {
            name: 'Nadia Lahlou',
            relation: 'Mère',
            phone: '+212 6 03 55 19 87'
        },
        guardianRelationship: {
            guardianName: 'Nadia Lahlou',
            relation: 'Mère',
            phone: '+212 6 03 55 19 87'
        },
        medicalProfile: {
            bloodType: 'A+',
            allergies: ['Latex'],
            implants: [],
            chronicConditions: ['Asthme intermittent'],
            medications: ['Ventoline si crise'],
            g6pd: false,
            advanceDirectives: 'Contacter immédiatement le représentant légal avant toute décision non urgente.',
            emergencyInstructions: [
                'Prévenir le tuteur dès stabilisation.',
                'Éviter toute exposition connue au latex.',
                'Observer la respiration et demander une aide pédiatrique si nécessaire.'
            ]
        },
        accessLogs: [
            {
                id: 'log-4',
                actor: 'Scan public',
                role: 'Bystander',
                location: 'Casablanca Tramway',
                accessLevel: 'level-0',
                timestamp: '2026-02-05T14:22:00Z',
                status: 'completed'
            }
        ],
        nfcCard: {
            id: 'card-b',
            status: 'active',
            issuedAt: '2026-01-18T12:30:00Z',
            qrToken: 'demo-minor',
            lastScannedAt: '2026-02-05T14:22:00Z'
        }
    }
};

export const professionals: Record<string, Professional> = {
    'pro-demo-1': {
        id: 'pro-demo-1',
        fullName: 'Dr. Amal Benali',
        profession: 'Médecin urgentiste',
        licenseRegion: 'Marrakech-Safi',
        phone: '+212611223344',
        kycStatus: 'verified',
        accessHistory: [
            {
                id: 'pro-log-1',
                actor: 'Dr. Amal Benali',
                role: 'Urgentiste',
                location: 'Clinique Atlas',
                accessLevel: 'level-1',
                timestamp: '2026-02-20T09:18:00Z',
                status: 'completed'
            },
            {
                id: 'pro-log-2',
                actor: 'Dr. Amal Benali',
                role: 'Urgentiste',
                location: 'GITEX Africa Booth Demo',
                accessLevel: 'level-1',
                timestamp: '2026-03-01T11:00:00Z',
                status: 'completed'
            }
        ],
        activeDelegations: [
            {
                id: 'del-1',
                patientName: 'Salma El Idrissi',
                expiresAt: '2026-03-23T18:00:00Z',
                scope: 'Lecture urgente 24h'
            },
            {
                id: 'del-2',
                patientName: 'Adam Lahlou',
                expiresAt: '2026-03-23T16:30:00Z',
                scope: 'Pédiatrie urgente'
            }
        ]
    }
};

export const pendingKyc = [
    {
        professionalId: 'pro-queue-1',
        name: 'Dr. Kenza Bousfiha',
        role: 'Généraliste',
        submittedAt: '2026-03-20T10:30:00Z',
        clinic: 'Maison de Santé Targa'
    },
    {
        professionalId: 'pro-queue-2',
        name: 'Yassine Amrani',
        role: 'Pharmacien',
        submittedAt: '2026-03-21T08:10:00Z',
        clinic: 'Pharmacie Al Amal'
    }
];

export const suspiciousAccess = [
    {
        id: 'sus-1',
        patient: 'Salma El Idrissi',
        actor: 'Device unknown',
        location: 'IP outside Morocco',
        timestamp: '2026-03-22T04:10:00Z',
        reason: 'Tentative répétée après OTP invalide'
    }
];

export function findPatientByToken(token: string): Patient | undefined {
    return Object.values(patients).find((patient) => patient.nfcCard.qrToken === token);
}
