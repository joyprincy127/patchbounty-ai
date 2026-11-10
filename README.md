#  PatchBounty AI

> **Autonomous AI Security Patch Audit & Automated PayPal Bounty Payout Engine**
> Built for the **PayPal AI Hackathon**.

PatchBounty AI bridges the gap between automated security vulnerability detection and developer reward fulfillment. By integrating Google's Gemini API with the PayPal Server SDK, the platform automatically analyzes submitted code patches for security flaws, validates fix integrity, and instantly executes bounty payouts to security researchers.

---

##  Demo & Submission Links

- **Devpost Project**: *(Add your Devpost link here)*
- **Video Demo (YouTube/Vimeo)**: *(Add your demo video link here)*
- **GitHub Repository**: [joyprincy127/patchbounty-ai](https://github.com/joyprincy127/patchbounty-ai)

---

##  Key Features

-  **AI Security Audit Engine**: Leverages the Gemini API (`@google/genai`) to conduct deep static code analysis, assigning severity scores, vulnerability classifications, and risk assessments.
-  **Automated PayPal Bounty Payouts**: Integrates `@paypal/paypal-server-sdk` to disburse funds dynamically based on audit severity scores upon patch approval.
-  **Full-Stack Dashboard**: React & Vite frontend connected to an Express/Node.js backend for fast, real-time audit reporting and payout confirmation receipts.
-  **Resilient Fallback Handling**: Built-in fail-safe demo modes to handle API rate limits and operational model fallbacks seamlessly during live evaluation.

---

##  Architecture & Workflow

[ Security Patch Submission ]
│
▼
┌──────────────────────────┐
│  React / Vite Dashboard  │
└────────────┬─────────────┘
│ (HTTP POST /api/audit)
▼
┌──────────────────────────┐
│   Node.js / Express App  │
└─────┬──────────────┬─────┘
│              │
▼              ▼
┌──────────┐   ┌────────────────────────┐
│ Gemini   │   │ PayPal Server SDK      │
│ AI Model │   │ (Sandbox Payout Engine)│
└──────────┘   └────────────────────────┘

---

##  Tech Stack

- **Frontend**: React, Vite, Lucide Icons, Axios
- **Backend**: Node.js, Express.js, Nodemon, Dotenv
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Payment Processing**: PayPal Server SDK (`@paypal/paypal-server-sdk`)

---

##  Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Google AI Studio Gemini API Key
- PayPal Developer Sandbox Credentials

### Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/joyprincy127/patchbounty-ai.git](https://github.com/joyprincy127/patchbounty-ai.git)
   cd patchbounty-ai
Configure Backend Environment:

Bash
cd backend
npm install
Create a .env file inside the backend folder:

Code snippet
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
Configure Frontend Environment:

Bash
cd ../frontend
npm install
 Running the Application
Start the Backend Server:

Bash
cd backend
npm run dev
(Backend runs at http://localhost:5000)

Start the Frontend Client:

Bash
cd frontend
npm run dev
(Frontend runs at http://localhost:5173)

 License
Distributed under the MIT License. See LICENSE for details.


---

### Push your updated README to GitHub

Run these commands in your VS Code terminal at `C:\Users\Admin\patchbounty-ai`:

```powershell
git add README.md
git commit -m "Docs: Complete README with architecture diagram and run instructions"
git push origin main