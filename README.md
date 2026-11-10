#  PatchBounty AI

> **Autonomous AI Security Patch Audit & Automated PayPal Bounty Payout Engine**
> Built for the **PayPal AI Hackathon**.

PatchBounty AI bridges the gap between automated security vulnerability detection and developer reward fulfillment. By integrating Google's Gemini API with the PayPal Server SDK, the platform automatically analyzes submitted code patches for security flaws, validates fix integrity, and instantly executes bounty payouts to security researchers.

---

##  Key Features

- 🔍 **AI Security Audit Engine**: Leverages the Gemini API (`@google/genai`) to conduct deep static code analysis, assigning severity scores, vulnerability classifications, and risk assessments.
-  **Automated PayPal Bounty Payouts**: Integrates `@paypal/paypal-server-sdk` to disburse funds dynamically based on audit severity scores upon patch approval.
-  **Full-Stack Dashboard**: React & Vite frontend connected to an Express/Node.js backend for fast, real-time audit reporting and payout confirmation receipts.
-  **Resilient Fallback Handling**: Designed with fail-safe demo modes to handle API rate limits and operational fallbacks seamlessly.

---

##  Architecture & Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **AI Model**: Google Gemini API (`@google/genai`)
- **Payments**: PayPal Server SDK (`@paypal/paypal-server-sdk`)
- **Development**: Nodemon, Dotenv, Axios

---

##  Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Google AI Studio Gemini API Key
- PayPal Developer Sandbox Credentials

### Installation

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/joyprincy127/patchbounty-ai.git](https://github.com/joyprincy127/patchbounty-ai.git)
   cd patchbounty-ai