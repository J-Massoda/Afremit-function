# Afremit - Complete Platform Documentation

> **Comprehensive Guide** - Platform Features, WhatsApp Bot, Testing, Deployment, and Frontend Enhancements

A modern platform connecting clients with verified service providers across multiple sectors in Sub-Saharan Africa: Construction (with escrow), Education (AI-powered escrow admin), and Healthcare (direct/installment payments).

---

## 📑 Table of Contents

- [Platform Overview](#platform-overview)
- [Features by User Type](#features-by-user-type)
- [Education Escrow Admin System](#education-escrow-admin-system)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Testing Guide](#testing-guide)
- [WhatsApp Bot (Zororo Phumulani)](#whatsapp-bot-zororo-phumulani)
- [Frontend Enhancements](#frontend-enhancements)
- [Verification Badge System](#verification-badge-system)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)

---

## Platform Overview

**Afremit** is a multi-service payment platform offering three distinct service models:

### Service Sectors

#### 1. Construction Services (Milestone-Based Escrow)
- Residential and commercial construction
- Renovations and remodeling
- Infrastructure projects
- **Payment Flow**: Quote → Deposit → Work → Approve → Release

#### 2. Education Services (AI-Powered Escrow)
- Universities across Sub-Saharan Africa
- Primary and secondary schools
- Professional certification programs
- **Payment Flow**: Diaspora payer → AI matching (>95% auto, 80-95% review, <80% manual) → Institution settlement
- **Admin Control**: Payer management, institution verification, exception queue, revenue monitoring

#### 3. Healthcare Services (Direct/Installment)
- Hospitals and clinics
- Surgical procedures
- Dental and eye care
- **Payment Flow**: Service selection → Pricing → Payment plan → Payment

### Geographic Focus
- **Primary**: Sub-Saharan Africa (all services)
- **Client Access**: Global (diaspora and local)

---

## Features by User Type

### For Clients
- ✅ Construction: Milestone-based escrow protection
- ✅ Education: Pay tuition for students in Africa (AI-matched)
- ✅ Healthcare: Direct or installment medical payments
- ✅ Unified dashboard for all services
- ✅ KYC verification for platform access

### For Construction Providers
- ✅ Submit quotes with milestone breakdowns
- ✅ Track project progress
- ✅ Receive payments upon milestone approval
- ✅ KYC and admin approval required

### For Education Institutions
- ✅ List tuition fees and payment plans
- ✅ Receive payments from verified diaspora payers
- ✅ Fee adjustment flexibility (1.0-1.5%)
- ✅ Settlement tracking and reporting

### For Healthcare Facilities
- ✅ List services with transparent pricing
- ✅ Offer flexible payment plans
- ✅ Connect with verified patients
- ✅ Licensed facility requirements

### For Administrators
- ✅ Construction: Approve provider registrations
- ✅ Education: Manage escrow, AI exceptions, revenue
- ✅ Healthcare: Monitor service delivery
- ✅ Platform-wide analytics and insights

---

## Education Escrow Admin System

**AFREMIT Admin Control System v2.2** - AI-powered education payment escrow

### Overview
- **Purpose**: Manage diaspora education payments to African institutions
- **AI Matching**: 91.3% accuracy (auto-process >95%, review 80-95%, manual <80%)
- **Dual Fee Structure**: Payer fees (2.5-3%), Institution fees (1-1.5%)
- **Revenue Recognition**: Pending → Recognized flow

### Admin Dashboards

#### 1. Education Admin Dashboard (`/admin/education`)
**Features:**
- Real-time metrics: Escrow balance ($10,914), AI accuracy (91.3%), pending exceptions (2)
- Revenue tracking: $244.80 recognized, $158.40 pending
- Exception alerts with severity levels
- Recent transactions feed
- Quick action cards to all modules

**Mock Data:**
- 5 diaspora payers in 4 countries
- 4 educational institutions
- 8 students with enrollment details
- 8 active transactions across lifecycle stages

#### 2. Payer Management (`/admin/education/payers`)
**Features:**
- Risk scoring dashboard (low/medium/high/review)
- Filtering by risk level and country
- Payer profiles with payment history
- Actions: View details, freeze account, approve flagged payments

**Capabilities:**
- Track payer reliability across transactions
- Identify high-risk remittance patterns
- Monitor payment frequency and amounts

#### 3. Institution Management (`/admin/education/institutions`)
**Features:**
- Institution directory with status (active/pending)
- Fee adjustment interface (1.0-1.5%)
- Settlement history tracking
- AI match accuracy per institution

**Capabilities:**
- Approve new institutions
- Adjust platform fees dynamically
- View settlement schedules
- Track AI performance by institution

#### 4. Escrow Monitor (`/admin/education/escrow-monitor`)
**Features:**
- Transaction lifecycle visualization (Received → Allocated → Released)
- Financial breakdown (gross, payer fee, institution fee, net)
- AI match score display
- Flag reason tracking

**Transaction Stages:**
1. **Received**: Payment from payer
2. **Allocated**: AI/manually matched to student
3. **Released**: Settled to institution

#### 5. Exception Queue (`/admin/education/exceptions`)
**Features:**
- Low-confidence AI matches (<80%)
- Manual student allocation interface
- Actions: Allocate, return to payer, request clarification
- Suggested matches with confidence scores

**Workflow:**
1. Review exception details (amount, payer, note)
2. View suggested student matches
3. Manually allocate or return funds
4. System updates transaction status

#### 6. Revenue Monitor (`/admin/education/revenue`)
**Features:**
- Payer fee tracking (2.5-3%)
- Institution fee tracking (1-1.5%)
- Revenue recognition flow visualization
- Split: Recognized vs. Pending

**Revenue Flow:**
1. Transaction pending → Fees calculated
2. Payment allocated → Revenue pending
3. Settlement complete → Revenue recognized

### Technical Implementation
- **Frontend-only**: Static mock data (no backend)
- **Framework**: React 18.2 + Vite 5.0
- **Routing**: React Router DOM 6.20
- **Styling**: Tailwind CSS 3.3
- **Data**: `frontend/src/mock/educationEscrow.js`

---

## Tech Stack

### Frontend
- **React 18.2** - UI library with hooks
- **Vite 5.0** - Build tool and dev server
- **React Router 6.20** - Client-side routing
- **Tailwind CSS 3.3** - Utility-first styling
- **Framer Motion 10.16** - Animations
- **Axios 1.6** - HTTP client

### Backend
- **Node.js 18+** - Runtime environment
- **Express 4.18** - Web framework
- **UUID** - Unique identifiers
- **CORS** - Cross-origin support
- **Body-Parser** - JSON parsing

### WhatsApp Bot
- **Express** - Webhook server
- **Axios** - Meta API calls
- **Dotenv** - Environment config

---

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Quick Start

```bash
# Clone repository
git clone https://github.com/J-Massoda/Afremit-function.git
cd Afremit-function

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install

# Install WhatsApp bot (optional)
cd ../zororo-whatsapp-bot
npm install
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - WhatsApp Bot (Optional):**
```bash
cd zororo-whatsapp-bot
npm run dev
# Runs on http://localhost:3001
```

### Demo Credentials

**Client Account:**
- Email: `client@demo.com`
- Password: `password123`

**Provider Account:**
- Email: `provider@demo.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@demo.com`
- Password: `password123`

---

## Testing Guide

### Manual Testing (Recommended)

Due to Jest/ES module compatibility issues, use manual API testing.

#### Tools
- **Thunder Client** (VS Code extension)
- **Postman** (standalone app)

### 1. Authentication Testing

#### Client Signup
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "email": "testclient@example.com",
  "password": "TestPassword123!",
  "name": "Test Client"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 123,
    "email": "testclient@example.com",
    "role": "client",
    "state": "REGISTERED"
  },
  "requiresEmailVerification": true
}
```

#### Email Verification
```http
GET http://localhost:5000/api/auth/verify-email/{token}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "testclient@example.com",
  "password": "TestPassword123!"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 123,
    "role": "client",
    "state": "EMAIL_VERIFIED"
  },
  "requiresKYC": true
}
```

### 2. KYC Testing

#### Submit KYC (Client)
```http
POST http://localhost:5000/api/kyc/submit/client
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "fullName": "John Doe",
  "dateOfBirth": "1990-01-15",
  "nationality": "Zimbabwe",
  "idNumber": "12-345678-A-12",
  "address": "123 Main St, Harare",
  "phone": "+263771234567",
  "idDocument": [file],
  "proofOfAddress": [file]
}
```

#### Admin Approval
```http
POST http://localhost:5000/api/admin/kyc/approve/{kycId}
Authorization: Bearer {admin_token}
```

### 3. Contract Testing

#### Create Contract
```http
POST http://localhost:5000/api/contracts
Authorization: Bearer {client_token}
Content-Type: application/json

{
  "title": "House Renovation",
  "description": "Complete bathroom renovation",
  "totalAmount": 5000,
  "milestones": [
    {
      "title": "Demolition",
      "description": "Remove old fixtures",
      "amount": 1000,
      "order": 1
    },
    {
      "title": "Installation",
      "description": "Install new fixtures",
      "amount": 4000,
      "order": 2
    }
  ]
}
```

### 4. Frontend Testing

#### Education Admin Routes
Test all routes manually in browser:

1. **Main Dashboard**: http://localhost:3000/admin/education
2. **Payer Management**: http://localhost:3000/admin/education/payers
3. **Institutions**: http://localhost:3000/admin/education/institutions
4. **Escrow Monitor**: http://localhost:3000/admin/education/escrow-monitor
5. **Exceptions**: http://localhost:3000/admin/education/exceptions
6. **Revenue**: http://localhost:3000/admin/education/revenue

**Validation Checklist:**
- [ ] All routes load without errors
- [ ] Navigation links work
- [ ] Mock data displays correctly
- [ ] Icons render properly
- [ ] Buttons are clickable
- [ ] No console errors

---

## WhatsApp Bot (Zororo Phumulani)

### Overview
Automated insurance onboarding bot using **WhatsApp Business Cloud API** (Meta).

**Features:**
- Insurance plan inquiries (Funeral, Repatriation, Accidental Death)
- Customer onboarding flow (name, ID, payment)
- Payment link distribution
- Agent handoff

### Setup

#### 1. Get Meta Credentials

1. Go to https://developers.facebook.com/
2. Create an app and enable WhatsApp
3. Get:
   - **Phone Number ID**
   - **WhatsApp Business Account ID**
   - **Access Token** (temporary or System User token)

#### 2. Configure Environment

Create `.env` file in `zororo-whatsapp-bot/`:

```env
PORT=3001
WHATSAPP_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_id_here
VERIFY_TOKEN=my_webhook_verify_token_123
WEBHOOK_URL=https://your-domain.com/webhook
```

#### 3. Set Up Webhook (Local Testing)

**Using ngrok:**
```bash
# Start bot server
cd zororo-whatsapp-bot
npm run dev

# In new terminal, start ngrok
ngrok http 3001
```

Copy ngrok URL (e.g., `https://abc123.ngrok.io`)

**Configure in Meta Dashboard:**
1. Go to WhatsApp > Configuration
2. Webhook URL: `https://abc123.ngrok.io/webhook`
3. Verify Token: `my_webhook_verify_token_123`
4. Subscribe to: `messages`

#### 4. Test the Bot

1. Open WhatsApp
2. Message your test number
3. Type: `hi` or `insurance`
4. Follow conversation flow

### Conversation Flow

```
User: Hi
Bot: Welcome to Zororo Phumulani Insurance! Choose:
     1️⃣ Funeral & Repatriation
     2️⃣ Worldwide Funeral
     3️⃣ Accidental Death
     4️⃣ Speak to Agent

User: 1
Bot: Plan: Funeral & Repatriation ($15/month)
     Coverage: Up to $5,000
     What's your full name?

User: John Doe
Bot: Thanks John! What's your ID number?

User: 12-345678-A-12
Bot: Great! Here's your payment link: [URL]
     Reply CONFIRM when paid.

User: CONFIRM
Bot: ✅ Application submitted!
     Agent will contact you within 24h.
```

### Project Structure

```
zororo-whatsapp-bot/
├── src/
│   ├── index.js          # Main server & webhook handler
│   ├── whatsapp.js       # Meta API functions
│   └── conversation.js   # Conversation state management
├── .env                  # Environment variables
├── .env.example          # Template
├── package.json          # Dependencies
├── README.md             # Bot documentation
├── SETUP.md              # Installation guide
├── DEPLOYMENT.md         # Production deployment
├── TESTING.md            # Testing procedures
└── DEBUGGING.md          # Troubleshooting
```

### Deployment (Vercel)

#### 1. Prepare for Serverless

Update `src/index.js`:
```javascript
// Export for Vercel serverless
module.exports = app;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

#### 2. Create `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/index.js"
    }
  ],
  "functions": {
    "src/index.js": {
      "maxDuration": 10
    }
  }
}
```

#### 3. Deploy

```bash
cd zororo-whatsapp-bot
vercel --prod
```

#### 4. Update Webhook

Update Meta dashboard webhook URL to your Vercel URL:
`https://your-project.vercel.app/webhook`

---

## Frontend Enhancements

### Verification Badges

#### Blue Badge (Verified Users)
- **Meaning**: KYC verified client
- **Shows on**: Avatar, profile dropdown

#### Yellow Badge (Verified Providers)
- **Meaning**: KYC + business verified provider
- **Shows on**: Provider cards, directory, profile

### Access Control

#### Landing Page
- **Guests**: "🔒 Login to View Profile" (disabled)
- **Unverified**: "🔒 Complete KYC to View" (disabled)
- **Verified**: "View Profile" (enabled)

#### Provider Directory
- Filter by verification status
- Search by name/service
- Location filtering
- Service category filtering

### KYC Status Banner

Shows site-wide for:
- ⚠️ Email verification required (yellow)
- 📋 KYC incomplete (orange with CTA)
- ⏳ KYC pending review (blue)

Auto-hides for verified users.

### Navigation Enhancements

**Authenticated Users:**
- Avatar with initials
- Verification badge overlay
- Dropdown: Dashboard, KYC Status, Logout

**Guest Users:**
- Login button (ghost)
- Sign Up button (secondary)

---

## Verification Badge System

### Visual Guide

```
┌─────────────────────────────────────────┐
│ [A] Afremit    Services ▼   About      │
│                               [🔵][👤] │ ← Badge on avatar
└─────────────────────────────────────────┘

Profile Dropdown:
┌─────────────────────────┐
│ John Doe 🔵            │ ← Badge next to name
│ john@example.com        │
│ ✅ Verified Account     │
│─────────────────────────│
│ 📊 Dashboard            │
│ 🚪 Logout               │
└─────────────────────────┘
```

### Provider Cards

```
┌─────────────────────────┐
│ Builder Co 🟡          │ ← Yellow badge
│ Construction            │
│ ⭐⭐⭐⭐⭐ 4.8 (25)      │
│ 📍 Harare, Bulawayo    │
│ [View Profile]          │
└─────────────────────────┘
```

### Usage

```jsx
import VerificationBadge from './components/shared/VerificationBadge';

// User badge (blue)
<VerificationBadge type="user" size="sm" />

// Provider badge (yellow)
<VerificationBadge type="provider" size="md" />
```

---

## Deployment

### Frontend (Vercel)

#### 1. Create `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### 2. Update `vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Not '/Afremit-function/'
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

#### 3. Deploy

```bash
cd frontend
vercel --prod
```

### Backend (Render/Railway/Heroku)

#### Environment Variables
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-frontend.vercel.app
```

#### Deploy to Render

1. Connect GitHub repo
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables
5. Deploy

---

## API Documentation

### Authentication

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "User Name",
  "role": "client" | "provider"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Verify Email
```http
GET /api/auth/verify-email/:token
```

### KYC Endpoints

#### Submit Client KYC
```http
POST /api/kyc/submit/client
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "fullName": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "nationality": "string",
  "idNumber": "string",
  "address": "string",
  "phone": "string",
  "idDocument": file,
  "proofOfAddress": file,
  "proofOfIncome": file (optional)
}
```

#### Submit Provider KYC
```http
POST /api/kyc/submit/provider
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "businessName": "string",
  "businessRegistrationNumber": "string",
  "category": "construction" | "education" | "healthcare",
  "servicesOffered": ["service1", "service2"],
  "yearsExperience": number,
  "completedProjects": number,
  "operatingLocations": ["city1", "city2"],
  "businessRegistrationDoc": file,
  "professionalLicense": file,
  "insuranceCertificate": file
}
```

### Contract Endpoints

#### Create Contract
```http
POST /api/contracts
Authorization: Bearer {client_token}
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "totalAmount": number,
  "milestones": [
    {
      "title": "string",
      "description": "string",
      "amount": number,
      "order": number
    }
  ]
}
```

#### Fund Escrow
```http
POST /api/contracts/:id/fund
Authorization: Bearer {client_token}
Content-Type: application/json

{
  "amount": number
}
```

#### Approve Milestone
```http
POST /api/milestones/:id/approve
Authorization: Bearer {client_token}
```

#### Release Payment
```http
POST /api/payments/:id/release
Authorization: Bearer {admin_token}
```

---

## Security Considerations

⚠️ **Current Implementation**: Demo/MVP with simplified security

### For Production:

1. **Authentication**
   - ✅ Implement JWT with refresh tokens
   - ✅ Use bcrypt for password hashing (10+ rounds)
   - ✅ Add rate limiting (express-rate-limit)
   - ✅ Implement CSRF protection

2. **File Uploads**
   - ✅ Validate file types (whitelist)
   - ✅ Scan for malware
   - ✅ Limit file sizes (<5MB)
   - ✅ Store in secure S3/Cloud Storage

3. **Database**
   - ✅ Use parameterized queries (prevent SQL injection)
   - ✅ Encrypt sensitive data at rest
   - ✅ Regular backups
   - ✅ Implement database firewall

4. **API Security**
   - ✅ HTTPS only (redirect HTTP)
   - ✅ CORS configuration (whitelist domains)
   - ✅ Input validation (Joi/Yup)
   - ✅ Helmet.js for security headers

5. **Monitoring**
   - ✅ Error logging (Sentry/LogRocket)
   - ✅ API monitoring (Datadog/New Relic)
   - ✅ Uptime monitoring (Pingdom)
   - ✅ Security audits

---

## Troubleshooting

### Common Issues

#### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Backend connection errors
- Check backend is running on port 5000
- Verify CORS origin in backend config
- Check proxy settings in vite.config.js

#### WhatsApp bot not receiving messages
- Verify webhook URL in Meta dashboard
- Check ngrok is running (for local)
- Verify VERIFY_TOKEN matches
- Check webhook subscription includes "messages"

#### Icons not displaying
- Verify Icon component includes required icon names
- Check import: `import Icon from './components/shared/Icon'`
- Console errors will show missing icon names

#### Education admin routes 404
- Verify routes in App.jsx include all education paths
- Check Link components use correct `to` prop
- Ensure using React Router `Link`, not `<a href>`

---

## Project Roadmap

### Phase 1: MVP ✅
- [x] Core platform architecture
- [x] Construction escrow
- [x] Education admin with AI matching
- [x] Healthcare service browsing
- [x] WhatsApp bot
- [x] Verification badges
- [x] KYC workflows

### Phase 2: Production Ready
- [ ] PostgreSQL database
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications (SendGrid)
- [ ] File storage (AWS S3)
- [ ] Real AI matching model
- [ ] Advanced analytics dashboard

### Phase 3: Scale
- [ ] Mobile apps (React Native)
- [ ] Multi-language support
- [ ] Real-time chat support
- [ ] Advanced fraud detection
- [ ] Blockchain payment options
- [ ] Partner API for institutions

---

## Contributors

**Afremit Team**
- Frontend Development
- Backend Architecture
- WhatsApp Bot Integration
- Admin Dashboard Design

**Founder**: Zororo Phumulani

---

## License

Proprietary software. All rights reserved.

---

## Support

- **Email**: support@afremit.com
- **Website**: https://afremit.com
- **Documentation**: This file

---

Built with ❤️ for Sub-Saharan Africa
