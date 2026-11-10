import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auditPatch } from './auditor.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PatchBounty AI Backend operational' });
});

// AI Audit Route
app.post('/api/audit', async (req, res) => {
  try {
    const { codeDiff, vulnerabilityType } = req.body;
    if (!codeDiff || !vulnerabilityType) {
      return res.status(400).json({ error: 'codeDiff and vulnerabilityType are required.' });
    }

    const auditResult = await auditPatch(codeDiff, vulnerabilityType);
    res.json({ success: true, data: auditResult });
  } catch (error) {
    console.error('Audit Error:', error);
    res.status(500).json({ error: 'AI Audit failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));