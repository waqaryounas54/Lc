import express from 'express';
import cors from 'cors';
import { config } from './config';
import authRoutes from './routes/auth';
import eventsRoutes from './routes/events';
import agoraRoutes from './routes/agora';
import path from 'path';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.use('/api', authRoutes);
app.use('/api', eventsRoutes);
app.use('/api', agoraRoutes);

const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});