import type { PartnerOffer, Patient, Professional, PublicEmergencyResponse } from '../types/demo';

export const fallbackPatients: Record<string, Patient> = {
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
        },
        medicalDocuments: [
            {
                id: 'doc-1',
                fileName: 'Ordonnance_Insuline_2026-02.pdf',
                category: 'prescription',
                uploadedAt: '2026-02-15T10:30:00Z',
                fileSize: 1024 * 245,
                mimeType: 'application/pdf'
            },
            {
                id: 'doc-2',
                fileName: 'Resultat_Glycemie_2026-02.pdf',
                category: 'lab-report',
                uploadedAt: '2026-02-10T14:20:00Z',
                fileSize: 1024 * 512,
                mimeType: 'application/pdf'
            },
            {
                id: 'doc-3',
                fileName: 'Scan_Pancreas_2026-01.jpg',
                category: 'medical-scan',
                uploadedAt: '2026-01-28T09:15:00Z',
                fileSize: 1024 * 2048,
                mimeType: 'image/jpeg'
            }
        ]
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
        },
        medicalDocuments: [
            {
                id: 'doc-4',
                fileName: 'Ordonnance_Ventoline_2026-02.pdf',
                category: 'prescription',
                uploadedAt: '2026-02-18T11:00:00Z',
                fileSize: 1024 * 180,
                mimeType: 'application/pdf'
            },
            {
                id: 'doc-5',
                fileName: 'Certificat_Asthme_Medecin.pdf',
                category: 'doctor-report',
                uploadedAt: '2026-02-05T15:45:00Z',
                fileSize: 1024 * 220,
                mimeType: 'application/pdf'
            }
        ]
    }
};

export const fallbackProfessional: Professional = {
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
};

export const fallbackKycQueue = [
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

export const fallbackSuspiciousAccess = [
    {
        id: 'sus-1',
        patient: 'Salma El Idrissi',
        actor: 'Device unknown',
        location: 'IP outside Morocco',
        timestamp: '2026-03-22T04:10:00Z',
        reason: 'Tentative répétée après OTP invalide'
    }
];

export const emergencyResponses: Record<string, PublicEmergencyResponse> = {
    'demo-token': {
        token: 'demo-token',
        patient: fallbackPatients['demo-patient-a']
    },
    'demo-minor': {
        token: 'demo-minor',
        patient: fallbackPatients['demo-patient-b']
    }
};

export const startupMetrics = [
    { label: 'Intentions d’adoption', value: '86%', note: 'sur entretiens terrain demo' },
    { label: 'Temps pour comprendre la valeur', value: '<10 sec', note: 'test booth storytelling' },
    { label: 'Scans d’essai', value: '240+', note: 'pilotes et maquettes terrain' },
    { label: 'Note de confiance demo', value: '4.8/5', note: 'feedback partenaires potentiels' }
];

export const partnerOffers: PartnerOffer[] = [
    {
        title: 'Patient starter',
        price: 'Gratuit',
        description: 'Entrée simple pour créer le profil, générer un QR et recevoir un accès demo.',
        bullets: ['Profil d’urgence', 'QR de démonstration', 'Historique d’accès']
    },
    {
        title: 'Founder clinic pack',
        price: 'Sur discussion',
        description: 'Offre pilote pour cliniques fondatrices et cabinets prêts à tester l’accès urgent.',
        bullets: ['Onboarding équipe', 'Tableau de bord pro', 'Support pilote Marrakech 2026']
    },
    {
        title: 'Founder pharmacy pack',
        price: 'Sur discussion',
        description: 'Pack partenaire pour pharmacies voulant activer la lecture professionnelle assistée.',
        bullets: ['Badge partenaire', 'Accès niveau 1 demo', 'Formation usage comptoir']
    }
];
