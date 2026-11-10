import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, AlertTriangle, DollarSign, Code, CheckCircle, RefreshCw, Terminal } from 'lucide-react';

const SAMPLE_PATCH = `--- a/auth/login.py
+++ b/auth/login.py
@@ -10,7 +10,8 @@ def authenticate_user(username, password):
-    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
-    cursor.execute(query)
+    query = "SELECT * FROM users WHERE username = %s AND password = %s"
+    cursor.execute(query, (username, password))
     return cursor.fetchone()`;

export default function App() {
  const [codeDiff, setCodeDiff] = useState(SAMPLE_PATCH);
  const [vulnerabilityType, setVulnerabilityType] = useState('SQL Injection');
  const [researcherEmail, setResearcherEmail] = useState('bounty-hunter@sandbox.com');
  
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [payoutResult, setPayoutResult] = useState(null);
  const [error, setError] = useState('');

  const handleAuditAndPayout = async () => {
    setLoading(true);
    setError('');
    setAuditResult(null);
    setPayoutResult(null);

    try {
      // 1. Send Code Patch to Gemini AI Auditor Backend
      const auditResponse = await axios.post('http://localhost:5000/api/audit', {
        codeDiff,
        vulnerabilityType
      });

      const auditData = auditResponse.data.data;
      setAuditResult(auditData);

      // 2. If AI approves the patch (status === PASSED), trigger PayPal Sandbox Payout
      if (auditData.status === 'PASSED') {
        const payoutResponse = await axios.post('http://localhost:5000/api/payout', {
          researcherEmail,
          amount: auditData.bountyApprovedAmount || 50.00
        });
        setPayoutResult(payoutResponse.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to complete security audit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={32} color="#38bdf8" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>PatchBounty AI</h1>
        </div>
        <span style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #0284c7', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>
          PayPal Sandbox + Gemini AI Enabled
        </span>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Code Patch Submission Form */}
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={20} color="#38bdf8" /> Submit Security Patch
          </h2>

          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Vulnerability Category:
          </label>
          <input
            type="text"
            value={vulnerabilityType}
            onChange={(e) => setVulnerabilityType(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', marginBottom: '1rem' }}
          />

          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Developer PayPal Sandbox Email (Payout Recipient):
          </label>
          <input
            type="email"
            value={researcherEmail}
            onChange={(e) => setResearcherEmail(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', marginBottom: '1rem' }}
          />

          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            Git Code Patch / Diff:
          </label>
          <textarea
            rows="10"
            value={codeDiff}
            onChange={(e) => setCodeDiff(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1rem' }}
          />

          <button
            onClick={handleAuditAndPayout}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0284c7', color: '#fff', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {loading ? <RefreshCw size={18} className="spin" /> : <ShieldCheck size={18} />}
            {loading ? 'Running AI Security Audit...' : 'Audit Patch & Release Bounty'}
          </button>

          {error && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#7f1d1d', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} /> {error}
            </div>
          )}
        </div>

        {/* Right Column: AI Audit Results & PayPal Receipt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* AI Security Evaluation Panel */}
          <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={20} color="#38bdf8" /> AI Security Audit Result
            </h2>

            {!auditResult ? (
              <p style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Submit a code patch on the left to initiate real-time AI security verification.
              </p>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.75rem', borderRadius: '6px', backgroundColor: auditResult.status === 'PASSED' ? '#064e3b' : '#7f1d1d' }}>
                  <span style={{ fontWeight: 'bold', color: auditResult.status === 'PASSED' ? '#6ee7b7' : '#fca5a5' }}>
                    STATUS: {auditResult.status}
                  </span>
                  <span style={{ fontWeight: 'bold' }}>
                    Security Score: {auditResult.securityScore}/100
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  <strong>AI Summary:</strong> {auditResult.summaryReport}
                </p>

                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <div>Vulnerability Fixed: <strong>{auditResult.vulnerabilityFixed ? 'Yes ✅' : 'No ❌'}</strong></div>
                  <div>Approved Bounty: <strong>${auditResult.bountyApprovedAmount} USD</strong></div>
                </div>
              </div>
            )}
          </div>

          {/* PayPal Payout Receipt Panel */}
          <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={20} color="#22c55e" /> PayPal Sandbox Payout Receipt
            </h2>

            {!payoutResult ? (
              <p style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Payout will automatically trigger upon successful AI security audit validation.
              </p>
            ) : (
              <div style={{ backgroundColor: '#064e3b', border: '1px solid #10b981', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6ee7b7', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  <CheckCircle size={20} /> Bounty Transferred via PayPal Sandbox
                </div>
                <div style={{ fontSize: '0.85rem', color: '#ecfdf5', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div>Transaction ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{payoutResult.transactionId}</span></div>
                  <div>Recipient: <strong>{payoutResult.recipient}</strong></div>
                  <div>Amount Sent: <strong>${payoutResult.amount} {payoutResult.currency}</strong></div>
                  <div>Timestamp: <span>{new Date(payoutResult.timestamp).toLocaleString()}</span></div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}