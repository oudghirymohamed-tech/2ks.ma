import { randomInt } from 'node:crypto';
import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { readToken, signToken, type AuthClaims } from '../auth.js';
import {
    computeCompletion,
    computeInitials,
    generateId,
    getDb,
    now,
    type B2BOnboarding,
    type DoctorOnboarding,
    type PendingOtp
} from '../data/store.js';
import type { DocumentCategory, MedicalProfile, Patient } from '../types/demo.js';

const router = Router();
const OTP_MAX_REQUESTS_PER_SCOPE = 3;
const OTP_MAX_FAILED_ATTEMPTS = 5;
const isOtpDebugEnabled = process.env.OTP_DEBUG === 'true';

const uploadStorage = multer.diskStorage({
    destination: path.join(process.cwd(), 'apps', 'api', 'uploads'),
    filename: (_request, file, callback) => {
        const ext = path.extname(file.originalname);
        callback(null, `${Date.now()}-${Math.round(Math.random() * 1e8)}${ext}`);
    }
});

const upload = multer({
    storage: uploadStorage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

function unauthorized(res: Response) {
    return res.status(401).json({ message: 'Unauthorized.' });
}

function forbidden(res: Response) {
    return res.status(403).json({ message: 'Forbidden.' });
}

function requireAuth(request: Request, res: Response): AuthClaims | null {
    const claims = readToken(request);

    if (!claims) {
        unauthorized(res);
        return null;
    }

    return claims;
}

function normalizeList(value: string): string[] {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function emergencyProjection(patient: Patient) {
    return {
        id: patient.id,
        fullName: patient.fullName,
        age: patient.age,
        isMinor: patient.isMinor,
        city: patient.city,
        emergencyContact: patient.emergencyContact,
        guardianRelationship: patient.guardianRelationship,
        nfcCard: patient.nfcCard,
        medicalProfile: {
            bloodType: patient.medicalProfile.bloodType,
            allergies: patient.medicalProfile.allergies,
            chronicConditions: patient.medicalProfile.chronicConditions,
            emergencyInstructions: patient.medicalProfile.emergencyInstructions
        }
    };
}

function toPublicUploadUrl(filePath: string) {
    return `/uploads/${path.basename(filePath)}`;
}

function toDocumentResponse(document: {
    id: string;
    fileName: string;
    category: DocumentCategory;
    uploadedAt: string;
    fileSize: number;
    mimeType: string;
    path: string;
}) {
    return {
        id: document.id,
        fileName: document.fileName,
        category: document.category,
        uploadedAt: document.uploadedAt,
        fileSize: document.fileSize,
        mimeType: document.mimeType,
        url: toPublicUploadUrl(document.path)
    };
}

const verifyCardSchema = z.object({
    serial: z.string().min(4),
    activationCode: z.string().min(4)
});

router.get('/health', async (_req: Request, res: Response) => {
    res.json({ ok: true, service: '2ks-beta-api' });
});

router.post('/cards/verify', async (req: Request, res: Response) => {
    const parsed = verifyCardSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'serial and activationCode are required.' });
    }

    const db = await getDb();
    const card = Object.values(db.data.cards).find(
        (item) => item.serial === parsed.data.serial && item.activationCode === parsed.data.activationCode
    );

    if (!card) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    if (card.status === 'revoked') {
        return res.status(409).json({ message: 'Card is revoked.' });
    }

    if (card.status === 'active' && card.patientId) {
        return res.status(409).json({ message: 'Card already linked to another account.' });
    }

    return res.json({
        cardId: card.id,
        serial: card.serial,
        status: card.status
    });
});

const requestOtpSchema = z.object({
    phone: z.string().min(8),
    profileId: z.string().min(3),
    scope: z.enum(['patient-registration', 'doctor-onboarding'])
});

router.post('/otp/request', async (req: Request, res: Response) => {
    const parsed = requestOtpSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'phone, profileId and scope are required.' });
    }

    const db = await getDb();
    const activeOtpCountForScope = Object.values(db.data.pendingOtps).filter(
        (item) =>
            item.phone === parsed.data.phone &&
            item.scope === parsed.data.scope &&
            new Date(item.expiresAt).getTime() >= Date.now()
    ).length;

    if (activeOtpCountForScope >= OTP_MAX_REQUESTS_PER_SCOPE) {
        return res.status(429).json({ message: 'Too many OTP requests. Try again in a few minutes.' });
    }

    const otpCode = String(randomInt(100000, 999999));
    const otpId = generateId('otp');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const pending: PendingOtp = {
        id: otpId,
        phone: parsed.data.phone,
        code: otpCode,
        profileId: parsed.data.profileId,
        scope: parsed.data.scope,
        expiresAt,
        verified: false,
        failedAttempts: 0
    };

    db.data.pendingOtps[otpId] = pending;
    await db.write();

    const response: {
        otpId: string;
        expiresAt: string;
        message: string;
        debugCode?: string;
    } = {
        otpId,
        expiresAt,
        message: 'OTP sent successfully.'
    };

    if (isOtpDebugEnabled) {
        response.debugCode = otpCode;
    }

    return res.json(response);
});

const verifyOtpSchema = z.object({
    otpId: z.string().min(4),
    code: z.string().length(6)
});

router.post('/otp/verify', async (req: Request, res: Response) => {
    const parsed = verifyOtpSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'otpId and 6 digit code are required.' });
    }

    const db = await getDb();
    const otp = db.data.pendingOtps[parsed.data.otpId];

    if (!otp) {
        return res.status(404).json({ message: 'OTP session not found.' });
    }

    if (new Date(otp.expiresAt).getTime() < Date.now()) {
        return res.status(410).json({ message: 'OTP expired.' });
    }

    if (otp.code !== parsed.data.code) {
        otp.failedAttempts += 1;
        await db.write();

        if (otp.failedAttempts >= OTP_MAX_FAILED_ATTEMPTS) {
            return res.status(429).json({ message: 'Too many invalid OTP attempts. Request a new OTP.' });
        }

        return res.status(401).json({ message: 'Invalid OTP code.' });
    }

    otp.verified = true;
    await db.write();

    return res.json({ status: 'verified' });
});

const registerPatientSchema = z.object({
    cardId: z.string().min(4),
    otpId: z.string().min(4),
    fullName: z.string().min(3),
    city: z.string().min(2),
    language: z.enum(['en', 'ar']).default('en'),
    age: z.number().int().min(0).max(120),
    isMinor: z.boolean().default(false),
    phone: z.string().min(8),
    emergencyContactName: z.string().min(3),
    emergencyContactRelation: z.string().min(2),
    password: z.string().min(8),
    bloodType: z.string().min(2),
    allergies: z.string().optional(),
    chronicConditions: z.string().optional(),
    medications: z.string().optional(),
    emergencyInstructions: z.string().optional()
});

router.post('/patients/register', async (req: Request, res: Response) => {
    const parsed = registerPatientSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid registration payload.' });
    }

    const db = await getDb();
    const card = db.data.cards[parsed.data.cardId];

    if (!card) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    if (card.status === 'active') {
        return res.status(409).json({ message: 'Card already active.' });
    }

    const otp = db.data.pendingOtps[parsed.data.otpId];

    if (!otp || !otp.verified || otp.scope !== 'patient-registration') {
        return res.status(409).json({ message: 'Valid OTP verification is required.' });
    }

    if (otp.phone !== parsed.data.phone) {
        return res.status(409).json({ message: 'OTP phone does not match registration phone.' });
    }

    const userExists = Object.values(db.data.users).some((user) => user.email.toLowerCase() === parsed.data.phone.toLowerCase());

    if (userExists) {
        return res.status(409).json({ message: 'An account with this phone already exists.' });
    }

    const { hashSync } = await import('bcryptjs');

    const patientId = generateId('patient');
    const userId = generateId('user');

    const medicalProfile: MedicalProfile = {
        bloodType: parsed.data.bloodType as MedicalProfile['bloodType'],
        allergies: normalizeList(parsed.data.allergies ?? ''),
        implants: [],
        chronicConditions: normalizeList(parsed.data.chronicConditions ?? ''),
        medications: normalizeList(parsed.data.medications ?? ''),
        g6pd: false,
        advanceDirectives: '',
        emergencyInstructions: normalizeList(parsed.data.emergencyInstructions ?? '')
    };

    const patient: Patient = {
        id: patientId,
        fullName: parsed.data.fullName,
        age: parsed.data.age,
        isMinor: parsed.data.isMinor,
        city: parsed.data.city,
        language: parsed.data.language,
        avatarInitials: computeInitials(parsed.data.fullName),
        profileCompletion: computeCompletion(medicalProfile),
        emergencyContact: {
            name: parsed.data.emergencyContactName,
            relation: parsed.data.emergencyContactRelation,
            phone: parsed.data.phone
        },
        medicalProfile,
        accessLogs: [],
        nfcCard: {
            id: card.id,
            status: 'active',
            issuedAt: now(),
            qrToken: card.qrToken,
            lastScannedAt: now()
        },
        medicalDocuments: []
    };

    db.data.patients[patientId] = patient;
    db.data.users[userId] = {
        id: userId,
        role: 'patient',
        email: parsed.data.phone,
        passwordHash: hashSync(parsed.data.password, 10),
        profileId: patientId,
        createdAt: now()
    };

    card.status = 'active';
    card.patientId = patientId;
    card.issuedAt = patient.nfcCard.issuedAt;
    card.lastScannedAt = patient.nfcCard.lastScannedAt;

    await db.write();

    const token = signToken({ userId, role: 'patient', patientId });

    return res.status(201).json({ token, user: { id: userId, role: 'patient', patientId } });
});

const loginSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(8)
});

router.post('/auth/login', async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'login and password are required.' });
    }

    const db = await getDb();
    const user = Object.values(db.data.users).find((entry) => entry.email.toLowerCase() === parsed.data.login.toLowerCase());

    if (!user) {
        return unauthorized(res);
    }

    const { compareSync } = await import('bcryptjs');
    const valid = compareSync(parsed.data.password, user.passwordHash);

    if (!valid) {
        return unauthorized(res);
    }

    const token = signToken({
        userId: user.id,
        role: user.role,
        patientId: user.role === 'patient' ? user.profileId : undefined
    });

    return res.json({
        token,
        user: {
            id: user.id,
            role: user.role,
            patientId: user.role === 'patient' ? user.profileId : undefined,
            profileId: user.profileId
        }
    });
});

router.get('/auth/me', async (req: Request, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    return res.json({ user: claims });
});

const doctorOnboardingSchema = z.object({
    fullName: z.string().min(3),
    phone: z.string().min(8),
    email: z.string().email(),
    profession: z.string().min(3),
    licenseRegion: z.string().min(2),
    otpId: z.string().min(4)
});

router.post('/onboarding/doctor', async (req: Request, res: Response) => {
    const parsed = doctorOnboardingSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid doctor onboarding payload.' });
    }

    const db = await getDb();
    const otp = db.data.pendingOtps[parsed.data.otpId];

    if (!otp || !otp.verified || otp.scope !== 'doctor-onboarding' || otp.phone !== parsed.data.phone) {
        return res.status(409).json({ message: 'Doctor onboarding requires verified OTP.' });
    }

    const onboarding: DoctorOnboarding = {
        id: generateId('doc-onb'),
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email,
        profession: parsed.data.profession,
        licenseRegion: parsed.data.licenseRegion,
        otpVerified: true,
        status: 'pending',
        createdAt: now()
    };

    db.data.doctorOnboardings[onboarding.id] = onboarding;
    await db.write();

    return res.status(201).json({ onboardingId: onboarding.id, status: onboarding.status });
});

const b2bSchema = z.object({
    organizationName: z.string().min(3),
    contactName: z.string().min(3),
    contactPhone: z.string().min(8),
    contactEmail: z.string().email(),
    organizationType: z.enum(['clinic', 'pharmacy', 'other'])
});

router.post('/onboarding/b2b', async (req: Request, res: Response) => {
    const parsed = b2bSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid B2B onboarding payload.' });
    }

    const db = await getDb();

    const onboarding: B2BOnboarding = {
        id: generateId('b2b-onb'),
        organizationName: parsed.data.organizationName,
        contactName: parsed.data.contactName,
        contactPhone: parsed.data.contactPhone,
        contactEmail: parsed.data.contactEmail,
        organizationType: parsed.data.organizationType,
        status: 'pending',
        createdAt: now()
    };

    db.data.b2bOnboardings[onboarding.id] = onboarding;
    await db.write();

    return res.status(201).json({ onboardingId: onboarding.id, status: onboarding.status });
});

router.get('/public/emergency/:token', async (req: Request<{ token: string }>, res: Response) => {
    const db = await getDb();
    const patient = Object.values(db.data.patients).find((entry) => entry.nfcCard.qrToken === req.params.token);

    if (!patient) {
        return res.status(404).json({ message: 'Emergency profile not found.' });
    }

    patient.nfcCard.lastScannedAt = now();
    patient.accessLogs.unshift({
        id: generateId('access'),
        actor: 'Public scan',
        role: 'Bystander',
        location: 'Emergency endpoint',
        accessLevel: 'level-0',
        timestamp: now(),
        status: 'completed'
    });

    await db.write();

    return res.json({ token: req.params.token, patient: emergencyProjection(patient) });
});

router.post('/professional/request-otp', async (req: Request, res: Response) => {
    const { phone, patientToken } = req.body as { phone?: string; patientToken?: string };

    if (!phone || !patientToken) {
        return res.status(400).json({ message: 'phone and patientToken are required.' });
    }

    const db = await getDb();
    const patient = Object.values(db.data.patients).find((entry) => entry.nfcCard.qrToken === patientToken);

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found for token.' });
    }

    const otpCode = String(randomInt(100000, 999999));
    const otpId = generateId('prof-otp');
    db.data.pendingOtps[otpId] = {
        id: otpId,
        phone,
        code: otpCode,
        scope: 'doctor-onboarding',
        profileId: 'pro-demo-1',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        verified: false,
        failedAttempts: 0
    };

    await db.write();

    const response: {
        status: string;
        phone: string;
        patientToken: string;
        otpId: string;
        message: string;
        debugCode?: string;
    } = {
        status: 'sent',
        phone,
        patientToken,
        otpId,
        message: 'OTP sent for professional verification.'
    };

    if (isOtpDebugEnabled) {
        response.debugCode = otpCode;
    }

    return res.json(response);
});

router.post('/professional/verify-otp', async (req: Request, res: Response) => {
    const { otp, professionalId, patientToken } = req.body as {
        otp?: string;
        professionalId?: string;
        patientToken?: string;
    };

    if (!otp || !professionalId || !patientToken) {
        return res.status(400).json({ message: 'otp, professionalId and patientToken are required.' });
    }

    const db = await getDb();
    const patient = Object.values(db.data.patients).find((entry) => entry.nfcCard.qrToken === patientToken);
    const professional = db.data.professionals[professionalId];

    if (!patient || !professional) {
        return res.status(404).json({ message: 'Professional or patient not found.' });
    }

    const validOtp = Object.values(db.data.pendingOtps).find(
        (candidate) =>
            candidate.profileId === professionalId &&
            candidate.code === otp &&
            candidate.scope === 'doctor-onboarding' &&
            new Date(candidate.expiresAt).getTime() >= Date.now()
    );

    if (!validOtp) {
        return res.status(401).json({ message: 'Invalid OTP.' });
    }

    validOtp.verified = true;

    patient.accessLogs.unshift({
        id: generateId('access'),
        actor: professional.fullName,
        role: professional.profession,
        location: 'Professional OTP unlock',
        accessLevel: 'level-1',
        timestamp: now(),
        status: 'completed'
    });

    await db.write();

    return res.json({
        status: 'verified',
        accessLevel: 'level-1',
        patient,
        professional
    });
});

router.get('/patients/me', async (req: Request, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    if (claims.role !== 'patient' || !claims.patientId) {
        return forbidden(res);
    }

    const db = await getDb();
    const patient = db.data.patients[claims.patientId];

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
    }

    return res.json(patient);
});

router.get('/patients/:id', async (req: Request<{ id: string }>, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    if (claims.role !== 'admin' && claims.patientId !== req.params.id) {
        return forbidden(res);
    }

    const db = await getDb();
    const patient = db.data.patients[req.params.id];

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
    }

    return res.json(patient);
});

router.patch('/patients/:id', async (req: Request<{ id: string }>, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    if (claims.role !== 'admin' && claims.patientId !== req.params.id) {
        return forbidden(res);
    }

    const db = await getDb();
    const patient = db.data.patients[req.params.id];

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
    }

    const nextPatient = {
        ...patient,
        ...req.body,
        medicalProfile: {
            ...patient.medicalProfile,
            ...(req.body?.medicalProfile ?? {})
        }
    };

    db.data.patients[req.params.id] = nextPatient;
    await db.write();

    return res.json(nextPatient);
});

router.post('/cards/:cardId/revoke', async (req: Request<{ cardId: string }>, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    const db = await getDb();
    const card = db.data.cards[req.params.cardId];

    if (!card) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    if (claims.role !== 'admin' && card.patientId !== claims.patientId) {
        return forbidden(res);
    }

    card.status = 'revoked';

    if (card.patientId) {
        const patient = db.data.patients[card.patientId];

        if (patient) {
            patient.nfcCard.status = 'revoked';
        }
    }

    await db.write();

    return res.json({ status: 'revoked', cardId: req.params.cardId });
});

router.get('/patients/:patientId/documents', async (req: Request<{ patientId: string }>, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    if (claims.role !== 'admin' && claims.patientId !== req.params.patientId) {
        return forbidden(res);
    }

    const db = await getDb();
    const docs = Object.values(db.data.documents)
        .filter((doc) => doc.patientId === req.params.patientId)
        .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1))
        .map((doc) => toDocumentResponse(doc));

    return res.json(docs);
});

router.post(
    '/patients/:patientId/documents',
    upload.single('file'),
    async (req: Request<{ patientId: string }>, res: Response) => {
        const claims = requireAuth(req, res);

        if (!claims) {
            return;
        }

        if (claims.role !== 'admin' && claims.patientId !== req.params.patientId) {
            return forbidden(res);
        }

        if (!req.file) {
            return res.status(400).json({ message: 'File is required.' });
        }

        const category = (req.body.category ?? 'other') as DocumentCategory;
        const db = await getDb();

        const documentId = generateId('doc');
        const record = {
            id: documentId,
            patientId: req.params.patientId,
            fileName: req.file.originalname,
            category,
            uploadedAt: now(),
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            path: req.file.path
        };

        db.data.documents[documentId] = record;

        const patient = db.data.patients[req.params.patientId];

        if (patient) {
            patient.medicalDocuments = [toDocumentResponse(record), ...(patient.medicalDocuments ?? [])];
        }

        await db.write();

        return res.status(201).json(toDocumentResponse(record));
    }
);

router.delete('/patients/:patientId/documents/:docId', async (req: Request<{ patientId: string; docId: string }>, res: Response) => {
    const claims = requireAuth(req, res);

    if (!claims) {
        return;
    }

    if (claims.role !== 'admin' && claims.patientId !== req.params.patientId) {
        return forbidden(res);
    }

    const db = await getDb();
    const doc = db.data.documents[req.params.docId];

    if (!doc || doc.patientId !== req.params.patientId) {
        return res.status(404).json({ message: 'Document not found.' });
    }

    delete db.data.documents[req.params.docId];

    const patient = db.data.patients[req.params.patientId];

    if (patient?.medicalDocuments) {
        patient.medicalDocuments = patient.medicalDocuments.filter((entry) => entry.id !== req.params.docId);
    }

    await unlink(doc.path).catch(() => undefined);

    await db.write();

    return res.json({ status: 'deleted', id: req.params.docId });
});

router.get('/professional/me', async (_req: Request, res: Response) => {
    const db = await getDb();
    return res.json(db.data.professionals['pro-demo-1']);
});

router.get('/professional/access-history', async (_req: Request, res: Response) => {
    const db = await getDb();
    return res.json(db.data.professionals['pro-demo-1']?.accessHistory ?? []);
});

router.get('/professional/delegations', async (_req: Request, res: Response) => {
    const db = await getDb();
    return res.json(db.data.professionals['pro-demo-1']?.activeDelegations ?? []);
});

router.get('/admin/pending-kyc', async (_req: Request, res: Response) => {
    const db = await getDb();
    const queue = Object.values(db.data.doctorOnboardings).map((entry) => ({
        professionalId: entry.id,
        name: entry.fullName,
        role: entry.profession,
        submittedAt: entry.createdAt,
        clinic: entry.licenseRegion,
        status: entry.status
    }));

    return res.json(queue);
});

router.post('/admin/kyc/:professionalId', async (req: Request<{ professionalId: string }>, res: Response) => {
    const { decision } = req.body as { decision?: 'validated' | 'rejected' };
    const db = await getDb();
    const onboarding = db.data.doctorOnboardings[req.params.professionalId];

    if (!onboarding) {
        return res.status(404).json({ message: 'Onboarding request not found.' });
    }

    onboarding.status = decision === 'rejected' ? 'rejected' : 'approved';
    await db.write();

    return res.json({
        professionalId: req.params.professionalId,
        decision: onboarding.status,
        status: 'updated'
    });
});

router.get('/admin/suspicious-access', async (_req: Request, res: Response) => {
    const db = await getDb();

    const suspicious = Object.values(db.data.patients)
        .flatMap((patient) =>
            patient.accessLogs
                .filter((log) => log.status === 'flagged')
                .map((log) => ({
                    id: log.id,
                    patient: patient.fullName,
                    actor: log.actor,
                    location: log.location,
                    timestamp: log.timestamp,
                    reason: 'Flagged access log detected'
                }))
        );

    return res.json(suspicious);
});

export default router;
