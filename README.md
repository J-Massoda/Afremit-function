# Afremit - Multi-Service Payment Platform

> **🎯 For complete documentation, see [COMPREHENSIVE_DOCUMENTATION.md](./COMPREHENSIVE_DOCUMENTATION.md)**

A modern platform connecting clients with verified service providers across Sub-Saharan Africa:
- **Construction**: Milestone-based escrow
- **Education**: AI-powered payment matching (91.3% accuracy)
- **Healthcare**: Direct/installment payments

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/J-Massoda/Afremit-function.git
cd Afremit-function

# Frontend
cd frontend
npm install
npm run dev  # http://localhost:3000

# Backend (new terminal)
cd ../backend
npm install
npm run dev  # http://localhost:5000

# WhatsApp Bot (optional, new terminal)
cd ../zororo-whatsapp-bot
npm install
npm run dev  # http://localhost:3001
```

---

## 🎯 Key Features

### For Clients
✅ Construction escrow with milestone protection  
✅ Education payments (diaspora → African institutions)  
✅ Healthcare direct/installment payments  
✅ Unified dashboard  
✅ KYC verification  

### For Admins
✅ Education Escrow AI System (6 dashboards)  
✅ Payer & institution management  
✅ Exception queue (manual allocation)  
✅ Revenue tracking ($244.80 recognized)  
✅ Platform-wide analytics  

### For Providers
✅ Construction: Quote submission, milestone tracking  
✅ Education: Fee adjustment, settlement tracking  
✅ Healthcare: Service listing, payment plans  

---

## 📊 Education Escrow Admin (NEW)

**6 Complete Dashboards** with static mock data:

1. **Main Dashboard** (`/admin/education`) - Metrics, AI health, exceptions
2. **Payer Management** (`/admin/education/payers`) - Risk scoring, 5 payers
3. **Institution Management** (`/admin/education/institutions`) - 4 institutions, fee control
4. **Escrow Monitor** (`/admin/education/escrow-monitor`) - Transaction lifecycle
5. **Exception Queue** (`/admin/education/exceptions`) - Manual allocation (2 pending)
6. **Revenue Monitor** (`/admin/education/revenue`) - Dual fee tracking

**Mock Data:**
- 5 diaspora payers (UK, USA, SA, Canada)
- 4 institutions (University of Zimbabwe, Midlands State, Harare Polytechnic, NUST)
- 8 students with enrollment records
- 8 transactions across lifecycle stages
- AI accuracy: 91.3% (auto-process >95%, review 80-95%, manual <80%)

---

## 🛠️ Tech Stack

**Frontend:** React 18.2, Vite 5.0, Tailwind CSS 3.3, React Router 6.20  
**Backend:** Node.js 18+, Express 4.18  
**WhatsApp Bot:** Meta Cloud API, Axios, Dotenv  

---

## 🤖 WhatsApp Bot (Zororo Phumulani Insurance)

**Features:**
- Insurance plan inquiries (Funeral, Repatriation, Accidental Death)
- Automated onboarding flow
- Payment link distribution
- Agent handoff

**Quick Setup:**
```bash
cd zororo-whatsapp-bot
npm install
npm run dev  # Start on port 3001

# In new terminal (for local webhook)
ngrok http 3001
# Copy ngrok URL to Meta dashboard
```

[See comprehensive guide for Meta API setup](./COMPREHENSIVE_DOCUMENTATION.md#whatsapp-bot-zororo-phumulani)

---

## 📚 Documentation

- **[Full Documentation](./COMPREHENSIVE_DOCUMENTATION.md)** - Complete platform guide
- **[WhatsApp Bot README](./zororo-whatsapp-bot/README.md)** - Bot-specific docs

---

## 🎨 Design System

**Colors:**
- Primary (Navy): `#1B2845`
- Secondary (Sky Blue): `#00BCD4`

**Typography:**
- Headings: Poppins
- Body: Inter

**Verification Badges:**
- 🔵 Blue: Verified users (KYC complete)
- 🟡 Yellow: Verified providers (KYC + business verification)

---

## 🧪 Demo Credentials

| Role | Email | Password |
|-----|-------|----------|
| Client | client@demo.com | password123 |
| Provider | provider@demo.com | password123 |
| Admin | admin@demo.com | password123 |

---

## 🚀 Deployment

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Render/Railway):**
- Connect GitHub repo
- Build: `npm install`
- Start: `npm start`

**WhatsApp Bot (Vercel):**
```bash
cd zororo-whatsapp-bot
vercel --prod
```

[Full deployment guide](./COMPREHENSIVE_DOCUMENTATION.md#deployment)

---

## 🔌 API Endpoints (Sample)

```http
POST /api/auth/signup          # User registration
POST /api/auth/login           # Authentication
GET  /api/auth/verify-email/:token  # Email verification
POST /api/kyc/submit/client    # Client KYC submission
POST /api/kyc/submit/provider  # Provider KYC submission
POST /api/contracts            # Create contract
POST /api/milestones/:id/approve  # Approve milestone
```

[Full API documentation](./COMPREHENSIVE_DOCUMENTATION.md#api-documentation)

---

## 🔒 Security Notes

⚠️ **MVP Status**: Simplified security for demonstration

**For Production:**
- JWT with refresh tokens
- bcrypt password hashing (10+ rounds)
- Rate limiting
- CSRF protection
- File upload validation
- HTTPS enforcement
- Database encryption

[Full security guide](./COMPREHENSIVE_DOCUMENTATION.md#security-considerations)

---

## 📁 Project Structure

```
Afremit-function/
├── frontend/              # React + Vite web app
│   ├── src/
│   │   ├── components/    # Shared UI components
│   │   ├── pages/         # Route pages
│   │   │   └── app/admin/ # Education admin dashboards (6)
│   │   ├── mock/          # Static data (educationEscrow.js)
│   │   └── services/      # API client
├── backend/               # Express API server
│   ├── src/routes/        # API routes
│   └── src/models/        # Database models
├── zororo-whatsapp-bot/   # WhatsApp insurance bot
│   └── src/               # Bot logic & webhook
└── COMPREHENSIVE_DOCUMENTATION.md  # Complete guide
```

---

## 📊 Current Implementation

✅ **Complete:**
- Construction escrow with milestones
- Education admin with AI-powered matching (frontend-only)
- Healthcare service browsing
- WhatsApp bot for insurance
- KYC verification flows
- Verification badge system
- Responsive design (mobile/desktop)

🚧 **Production TODO:**
- PostgreSQL/MongoDB database
- Payment gateway (Stripe/PayPal)
- Real AI matching model (TensorFlow)
- Email notifications (SendGrid)
- File storage (AWS S3)
- CI/CD pipeline

---

## 🌍 Geographic Focus

**Primary Market:** Sub-Saharan Africa  
**Target Users:**
- Diaspora sending payments home (Education, Healthcare)
- Local clients needing verified services (Construction)
- Service providers across all sectors

**Countries (Education/Healthcare):**
Zimbabwe, South Africa, Zambia, Botswana, Kenya, Nigeria, Ghana

---

## 👨‍💼 About

**Afremit** provides trust-based payment solutions for African services:
- **Construction**: Escrow protection reduces risk
- **Education**: AI matching ensures payments reach right students
- **Healthcare**: Flexible payment plans increase access

**Zororo Phumulani Insurance** offers complementary coverage:
- Construction insurance
- Professional indemnity
- Payment protection

---

## 📄 License

Proprietary software. All rights reserved.

---

## 🤝 Contributing

Private project. For collaboration: contact@afremit.com

---

## 📞 Support

- **Email**: support@afremit.com
- **Documentation**: [COMPREHENSIVE_DOCUMENTATION.md](./COMPREHENSIVE_DOCUMENTATION.md)
- **Website**: https://afremit.com

---

**Built with ❤️ for Sub-Saharan Africa**

Built with ❤️ by the Afremit Team
