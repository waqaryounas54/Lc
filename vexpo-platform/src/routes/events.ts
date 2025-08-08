import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/events', async (req, res) => {
  const events = await prisma.event.findMany({ include: { booths: true, sessions: true }});
  res.json({ events });
});

const eventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  startAt: z.string(),
  endAt: z.string()
});

router.post('/events', authenticate, async (req, res) => {
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'ORGANIZER') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const parse = eventSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { name, description, startAt, endAt } = parse.data;
  const event = await prisma.event.create({ data: {
    name, description: description || null, startAt: new Date(startAt), endAt: new Date(endAt)
  }});
  res.json({ event });
});

router.get('/events/:id/booths', async (req, res) => {
  const id = Number(req.params.id);
  const booths = await prisma.booth.findMany({ where: { eventId: id }});
  res.json({ booths });
});

export default router;