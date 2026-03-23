import { emergencyResponses, fallbackKycQueue, fallbackPatients, fallbackProfessional, fallbackSuspiciousAccess } from '../data/mockData';
import type { Patient, Professional, PublicEmergencyResponse } from '../types/demo';

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? '';
const remoteApiMode = import.meta.env.VITE_REMOTE_API_MODE?.trim().toLowerCase() ?? 'mock';

function isPlaceholderUrl(value: string): boolean {
    const lower = value.toLowerCase();
    return (
        lower.includes('your-project-name') ||
        lower.includes('example.com') ||
        lower.includes('<') ||
        lower.includes('placeholder')
    );
}

const hasValidApiBaseUrl = rawApiBaseUrl.length > 0 && !isPlaceholderUrl(rawApiBaseUrl);
const shouldUseRemoteApi = remoteApiMode === 'remote' && hasValidApiBaseUrl;

const API_BASE_URL = shouldUseRemoteApi ? rawApiBaseUrl : '';

function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit, timeoutMs = 3000): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    return fetch(input, { ...init, signal: controller.signal }).finally(() => {
        clearTimeout(timeout);
    });
}

async function withFallback<T>(request: () => Promise<Response>, fallback: T): Promise<T> {
    if (!API_BASE_URL) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return fallback;
    }

    try {
        const response = await request();

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return (await response.json()) as T;
    } catch {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return fallback;
    }
}

export async function getPublicEmergencyProfile(token: string): Promise<PublicEmergencyResponse> {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/public/emergency/${token}`), emergencyResponses[token] ?? emergencyResponses['demo-token']);
}

export async function requestProfessionalOtp(phone: string, patientToken: string) {
    return withFallback(
        () =>
            fetchWithTimeout(`${API_BASE_URL}/professional/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, patientToken })
            }),
        {
            status: 'sent',
            phone,
            patientToken,
            reference: 'OTP-DEMO-2026',
            message: 'Demo OTP sent. Use 2026 to continue.'
        }
    );
}

export async function verifyProfessionalOtp(otp: string, professionalId: string, patientToken: string) {
    return withFallback(
        () =>
            fetchWithTimeout(`${API_BASE_URL}/professional/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, professionalId, patientToken })
            }),
        {
            status: otp === '2026' ? 'verified' : 'invalid',
            accessLevel: 'level-1',
            patient: fallbackPatients['demo-patient-a'],
            professional: fallbackProfessional
        }
    );
}

export async function getPatientProfile(id: string): Promise<Patient> {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/patients/${id}`), fallbackPatients[id] ?? fallbackPatients['demo-patient-a']);
}

export async function updatePatientProfile(id: string, payload: Partial<Patient>): Promise<Patient> {
    return withFallback(
        () =>
            fetchWithTimeout(`${API_BASE_URL}/patients/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }),
        { ...fallbackPatients[id], ...payload } as Patient
    );
}

export async function revokeCard(cardId: string): Promise<{ status: string; cardId: string }> {
    return withFallback(
        () => fetchWithTimeout(`${API_BASE_URL}/cards/${cardId}/revoke`, { method: 'POST' }),
        { status: 'revoked', cardId }
    );
}

export async function getProfessionalMe(): Promise<Professional> {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/professional/me`), fallbackProfessional);
}

export async function getProfessionalAccessHistory() {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/professional/access-history`), fallbackProfessional.accessHistory);
}

export async function getActiveDelegations() {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/professional/delegations`), fallbackProfessional.activeDelegations);
}

export async function getPendingKyc() {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/admin/pending-kyc`), fallbackKycQueue);
}

export async function validateKyc(professionalId: string, decision: 'validated' | 'rejected') {
    return withFallback(
        () =>
            fetchWithTimeout(`${API_BASE_URL}/admin/kyc/${professionalId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ decision })
            }),
        { professionalId, decision, status: 'updated' }
    );
}

export async function getSuspiciousAccess() {
    return withFallback(() => fetchWithTimeout(`${API_BASE_URL}/admin/suspicious-access`), fallbackSuspiciousAccess);
}
