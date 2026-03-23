import { Router, type Request, type Response } from 'express';
import { findPatientByToken, patients, pendingKyc, professionals, suspiciousAccess } from '../data/mockDb.js';

const router = Router();

function delay<T>(payload: T, ms = 350): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(payload), ms));
}

router.get('/health', async (_req: Request, res: Response) => {
    res.json(await delay({ ok: true, service: 'hayatid-demo-api' }, 120));
});

router.get('/public/emergency/:token', async (req: Request<{ token: string }>, res: Response) => {
    const patient = findPatientByToken(req.params.token);

    if (!patient) {
        return res.status(404).json({ message: 'Emergency profile not found.' });
    }

    return res.json(
        await delay({
            token: req.params.token,
            patient: {
                id: patient.id,
                fullName: patient.fullName,
                age: patient.age,
                isMinor: patient.isMinor,
                city: patient.city,
                emergencyContact: patient.emergencyContact,
                guardianRelationship: patient.guardianRelationship,
                medicalProfile: patient.medicalProfile,
                nfcCard: patient.nfcCard
            }
        })
    );
});

router.post('/professional/request-otp', async (req: Request, res: Response) => {
    const { phone, patientToken } = req.body as { phone?: string; patientToken?: string };

    if (!phone || !patientToken) {
        return res.status(400).json({ message: 'phone and patientToken are required.' });
    }

    return res.json(
        await delay({
            status: 'sent',
            phone,
            patientToken,
            reference: 'OTP-DEMO-2026',
            message: 'Demo OTP sent. Use 2026 to continue.'
        })
    );
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

    const patient = findPatientByToken(patientToken);
    const professional = professionals[professionalId];

    if (!patient || !professional) {
        return res.status(404).json({ message: 'Professional or patient not found.' });
    }

    if (otp !== '2026') {
        return res.status(401).json({ message: 'Invalid demo OTP.' });
    }

    return res.json(
        await delay({
            status: 'verified',
            accessLevel: 'level-1',
            patient: {
                id: patient.id,
                fullName: patient.fullName,
                medicalProfile: patient.medicalProfile,
                emergencyContact: patient.emergencyContact,
                accessLogs: patient.accessLogs
            },
            professional
        })
    );
});

router.get('/patients/:id', async (req: Request<{ id: string }>, res: Response) => {
    const patient = patients[req.params.id];

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
    }

    return res.json(await delay(patient));
});

router.patch('/patients/:id', async (req: Request<{ id: string }>, res: Response) => {
    const patient = patients[req.params.id];

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

    patients[req.params.id] = nextPatient;

    return res.json(await delay(nextPatient));
});

router.post('/cards/:cardId/revoke', async (req: Request<{ cardId: string }>, res: Response) => {
    const patient = Object.values(patients).find((item) => item.nfcCard.id === req.params.cardId);

    if (!patient) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    patient.nfcCard.status = 'revoked';

    return res.json(await delay({ status: 'revoked', cardId: req.params.cardId }));
});

router.get('/professional/me', async (_req: Request, res: Response) => {
    return res.json(await delay(professionals['pro-demo-1']));
});

router.get('/professional/access-history', async (_req: Request, res: Response) => {
    return res.json(await delay(professionals['pro-demo-1'].accessHistory));
});

router.get('/professional/delegations', async (_req: Request, res: Response) => {
    return res.json(await delay(professionals['pro-demo-1'].activeDelegations));
});

router.get('/admin/pending-kyc', async (_req: Request, res: Response) => {
    return res.json(await delay(pendingKyc));
});

router.post('/admin/kyc/:professionalId', async (req: Request<{ professionalId: string }>, res: Response) => {
    const { decision } = req.body as { decision?: 'validated' | 'rejected' };

    return res.json(
        await delay({
            professionalId: req.params.professionalId,
            decision: decision ?? 'validated',
            status: 'updated'
        })
    );
});

router.get('/admin/suspicious-access', async (_req: Request, res: Response) => {
    return res.json(await delay(suspiciousAccess));
});

export default router;
