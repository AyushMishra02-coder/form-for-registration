import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { rateLimit } from 'express-rate-limit';
import registrationRoutes from './routes/registrationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import mongoose from 'mongoose';

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));
app.use('/uploads', express.static(path.resolve('uploads'), { dotfiles: 'deny', index: false }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/registrations', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false }), registrationRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
app.use(errorHandler);

export default app;
