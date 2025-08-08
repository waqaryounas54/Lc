import { Router } from 'express';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { config } from '../config';

const router = Router();

const tokenSchema = z.object({
  channelName: z.string().min(1),
  role: z.enum(['PUBLISHER','SUBSCRIBER']).default('PUBLISHER'),
  expireSeconds: z.number().int().min(60).max(86400).default(3600)
});

router.post('/agora/token', authenticate, (req, res) => {
  const parse = tokenSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  if (!config.agoraAppId || !config.agoraAppCertificate) {
    return res.status(500).json({ error: 'Agora not configured' });
  }
  const { channelName, role, expireSeconds } = parse.data;
  const uid = Number(String(req.user?.userId || '0').replace(/\D/g, '').slice(0, 9)) || 0;
  const current = Math.floor(Date.now()/1000);
  const privilegeExpiredTs = current + expireSeconds;
  const rtcRole = role === 'PUBLISHER' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const token = RtcTokenBuilder.buildTokenWithUid(
    config.agoraAppId,
    config.agoraAppCertificate,
    channelName,
    uid,
    rtcRole,
    privilegeExpiredTs
  );
  res.json({ token, appId: config.agoraAppId, channelName, uid });
});

export default router;