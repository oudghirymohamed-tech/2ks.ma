import cors from 'cors';
import express from 'express';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const uploadsPath = path.join(process.cwd(), 'apps', 'api', 'uploads');

mkdirSync(uploadsPath, { recursive: true });

app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'],
        credentials: false
    })
);
app.use(express.json());
app.use('/uploads', express.static(uploadsPath));
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`HayatID demo API listening on http://localhost:${port}`);
});
