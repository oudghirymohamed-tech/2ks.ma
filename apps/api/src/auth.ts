import jwt from 'jsonwebtoken';
import type { Request } from 'express';

export type BetaUserRole = 'patient' | 'doctor' | 'b2b' | 'admin';

export interface AuthClaims {
    userId: string;
    role: BetaUserRole;
    patientId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET ?? '2ks-beta-dev-secret';

export function signToken(payload: AuthClaims): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function readToken(request: Request): AuthClaims | null {
    const header = request.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
        return null;
    }

    const token = header.slice('Bearer '.length).trim();

    try {
        return jwt.verify(token, JWT_SECRET) as AuthClaims;
    } catch {
        return null;
    }
}
