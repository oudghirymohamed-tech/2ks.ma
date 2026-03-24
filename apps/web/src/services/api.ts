import type { AccessLog, DocumentCategory, MedicalDocument, Patient, Professional, PublicEmergencyResponse } from '../types/demo';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:4000/api').replace(/\/$/, '');

export interface ApiUser {
    id: string;
    role: 'patient' | 'doctor' | 'b2b' | 'admin';
    patientId?: string;
    profileId?: string;
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

function readAuthToken() {
    return localStorage.getItem('twoKS_auth_token') ?? '';
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = readAuthToken();
    const headers = new Headers(init?.headers);

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers
    });

    if (!response.ok) {
        const maybeError = (await response.json().catch(() => ({ message: 'Request failed.' }))) as ApiErrorPayload;
        throw new ApiError(maybeError.message ?? 'Request failed.', response.status);
    }

    return (await response.json()) as T;
}

export async function login(loginValue: string, password: string) {
    return request<{ token: string; user: ApiUser }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginValue, password })
    });
}

export async function getAuthMe() {
    return request<{ user: ApiUser }>('/auth/me');
}

export async function verifyCard(serial: string, activationCode: string) {
    return request<{ cardId: string; serial: string; status: string }>('/cards/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial, activationCode })
    });
}

export async function requestOtp(phone: string, profileId: string, scope: 'patient-registration' | 'doctor-onboarding') {
    return request<{ otpId: string; expiresAt: string; message: string; debugCode?: string }>('/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, profileId, scope })
    });
}

export async function verifyOtp(otpId: string, code: string) {
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
    return request<PublicEmergencyResponse>(`/public/emergency/${encodeURIComponent(token)}`);
}

export async function requestProfessionalOtp(phone: string, patientToken: string) {
    return request<{ status: string; message: string; otpId: string; debugCode?: string }>('/professional/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, patientToken })
    });
}

export async function verifyProfessionalOtp(otp: string, professionalId: string, patientToken: string) {
    return request<{ status: string; accessLevel: 'level-1'; patient: Patient; professional: Professional }>('/professional/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, professionalId, patientToken })
    });
}

export async function getPatientMe(): Promise<Patient> {
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
    return request<{ status: string; cardId: string }>(`/cards/${encodeURIComponent(cardId)}/revoke`, {
        method: 'POST'
    });
}

export async function getPatientDocuments(patientId: string): Promise<MedicalDocument[]> {
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
    return request<Professional>('/professional/me');
}

export async function getProfessionalAccessHistory(): Promise<AccessLog[]> {
    return request<AccessLog[]>('/professional/access-history');
}

export async function getActiveDelegations(): Promise<Professional['activeDelegations']> {
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
