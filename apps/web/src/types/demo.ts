export type Language = 'fr' | 'en' | 'ar';
export type AccessLevel = 'level-0' | 'level-1';
export type KycStatus = 'verified' | 'pending' | 'rejected';

export interface EmergencyContact {
    name: string;
    relation: string;
    phone: string;
}

export interface GuardianRelationship {
    guardianName: string;
    relation: string;
    phone: string;
}

export interface MedicalProfile {
    bloodType: string;
    allergies: string[];
    implants: string[];
    chronicConditions: string[];
    medications: string[];
    g6pd: boolean;
    advanceDirectives: string;
    emergencyInstructions: string[];
}

export interface AccessLog {
    id: string;
    actor: string;
    role: string;
    location: string;
    accessLevel: AccessLevel;
    timestamp: string;
    status: 'completed' | 'flagged' | 'pending';
}

export interface NfcCard {
    id: string;
    status: 'active' | 'revoked' | 'printing';
    issuedAt: string;
    qrToken: string;
    lastScannedAt: string;
}

export interface Patient {
    id: string;
    fullName: string;
    age: number;
    isMinor: boolean;
    city: string;
    language: Language;
    avatarInitials: string;
    profileCompletion: number;
    emergencyContact: EmergencyContact;
    guardianRelationship?: GuardianRelationship;
    medicalProfile: MedicalProfile;
    accessLogs: AccessLog[];
    nfcCard: NfcCard;
}

export interface Professional {
    id: string;
    fullName: string;
    profession: string;
    licenseRegion: string;
    phone: string;
    kycStatus: KycStatus;
    accessHistory: AccessLog[];
    activeDelegations: Array<{
        id: string;
        patientName: string;
        expiresAt: string;
        scope: string;
    }>;
}

export interface PublicEmergencyResponse {
    token: string;
    patient: Pick<Patient, 'id' | 'fullName' | 'age' | 'isMinor' | 'city' | 'emergencyContact' | 'guardianRelationship' | 'medicalProfile' | 'nfcCard'>;
}

export interface PartnerOffer {
    title: string;
    price: string;
    description: string;
    bullets: string[];
}
