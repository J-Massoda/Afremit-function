# Afremit - Multi-Service Payment Platform

A modern platform connecting clients with verified service providers across three sectors in Sub-Saharan Africa: Construction (with escrow), Education (direct payments), and Healthcare (direct/installment payments).

## 🚀 Features

### For Clients
- **Construction Projects**: Create contracts with milestone-based escrow protection
- **Education Services**: Browse schools and pay tuition directly (semester/annual)
- **Healthcare Services**: Access medical services with direct or installment payments
- Track all services and payments in one dashboard
- KYC verification for full platform access

### For Construction Service Providers
- Submit quotes with milestone breakdowns
- Track project progress and milestone submissions
- Receive payments as milestones are approved
- KYC verification and admin approval required

### For Education Institutions
- List tuition fees and payment plans
- Receive direct payments from verified students
- Semester or annual payment options
- Pre-verified institutional listings

### For Healthcare Facilities
- List medical services with transparent pricing
- Offer direct payment or installment plans
- Connect with verified patients
- Licensed facility requirements

### For Administrators
- Approve construction service provider registrations
- Manage platform activity across all three sectors
- Monitor payment flows and disputes
- System-wide statistics and insights

## 🎯 Service Sectors

### 1. Construction Services (Milestone-Based Escrow)
- Residential and commercial construction
- Renovations and remodeling
- Infrastructure projects
- **Payment Model**: Provider sends quote → Client deposits milestone → Work completed → Client approves → Funds released

### 2. Education Services (Direct Payment)
- Universities and colleges across Sub-Saharan Africa
- Primary and secondary schools
- Professional certification programs
- **Payment Model**: Browse schools → View tuition fees → Select payment plan (semester/annual) → Direct payment to institution

### 3. Healthcare Services (Direct/Installment Payment)
- Hospitals and clinics
- Surgical procedures
- Dental and eye care
- **Payment Model**: Select service type and location → View pricing → Choose payment plan (direct/installment) → Payment to facility

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **React Router 6.20** - Client-side routing
- **Tailwind CSS 3.3** - Utility-first styling
- **Framer Motion 10.16** - Animations and transitions
- **Axios 1.6** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4.18** - Web framework
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing

## 📦 Project Structure

```
Afremit-function/
├── frontend/
│   ├── public/
│   │   └── afremit-logo.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   └── PublicLayout.jsx
│   │   │   └── shared/
│   │   │       ├── Badge.jsx
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Navigation.jsx
│   │   │       └── ProgressBar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── app/
│   │   │   │   ├── admin/
│   │   │   │   │   └── Dashboard.jsx
│   │   │   │   ├── provider/
│   │   │   │   │   ├── Contracts.jsx
│   │   │   │   │   └── Dashboard.jsx
│   │   │   │   └── user/
│   │   │   │       ├── ContractDetails.jsx
│   │   │   │       ├── CreateContract.jsx
│   │   │   │       └── Dashboard.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   └── public/
│   │   │       ├── About.jsx
│   │   │       ├── HowItWorks.jsx
│   │   │       ├── LandingPage.jsx
│   │   │       └── Services.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── models/
    │   │   └── database.js
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── contracts.js
    │   │   ├── milestones.js
    │   │   ├── payments.js
    │   │   └── users.js
    │   └── server.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Afremit-function
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

### Running the Application

#### Start Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend Development Server (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### Demo Credentials

**Client Account:**
- Email: `client@demo.com`
- Password: `password123`

**Service Provider Account:**
- Email: `provider@demo.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@demo.com`
- Password: `password123`

## 🎨 Design System

### Brand Colors
- **Primary (Navy Blue)**: `#1B2845`
- **Secondary (Sky Blue)**: `#00BCD4`
- **White**: Background and clean UI elements

### Typography
- **Headings**: Poppins
- **Body**: Inter

### Key UI Components
- Smooth page transitions with Framer Motion
- Animated scroll-based reveals
- Interactive hover states
- Responsive navigation with mobile menu
- Progress tracking with visual indicators (construction only)
- Status badges for milestones and contracts
- Direct payment interfaces for education and healthcare

## 📱 Key User Flows

### 1. Construction Services (Escrow)
1. Client submits construction project request
2. Verified provider sends quote with milestones
3. Client approves and deposits first milestone
4. Provider completes work phase
5. Client approves milestone completion
6. Funds released from escrow to provider
7. Process repeats for each milestone

### 2. Education Services (Direct Payment)
1. Browse schools by country/region in Sub-Saharan Africa
2. View tuition fees and payment schedules
3. Select payment plan (per semester or full year)
4. Complete KYC verification if not done
5. Make direct payment to educational institution
6. Receive enrollment confirmation

### 3. Healthcare Services (Direct/Installment)
1. Select medical service type (surgery, dental, eye care, etc.)
2. Choose location in Sub-Saharan Africa
3. Browse available facilities and pricing
4. Select payment plan (direct or installment)
5. Make payment to medical facility
6. Book appointment and receive care

### 4. Service Provider Journey (Construction Only)
1. Sign up as construction service provider
2. Submit business documents and KYC
3. Wait for admin approval
4. Once approved, receive client requests
5. Send quotes with milestone breakdowns
6. Complete work and submit for approval
7. Receive payments as milestones approved

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Contracts
- `GET /api/contracts` - Get all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `POST /api/contracts` - Create new contract
- `POST /api/contracts/:id/fund` - Fund escrow
- `GET /api/contracts/:id/milestones` - Get contract milestones

### Milestones
- `POST /api/milestones/:id/submit` - Submit milestone completion
- `POST /api/milestones/:id/approve` - Approve milestone
- `POST /api/milestones/:id/reject` - Reject milestone

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/contract/:contractId` - Get payments by contract
- `POST /api/payments/:id/release` - Release payment

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/providers` - Get all providers
- `POST /api/users/providers/:id/approve` - Approve provider

## 🧪 Current Implementation

This is an **MVP (Minimum Viable Product)** with:
- ✅ Full frontend UI/UX for all three service sectors
- ✅ Role-based authentication and routing
- ✅ In-memory backend database (for demo)
- ✅ Construction escrow workflow with milestones
- ✅ Education and healthcare service browsing interfaces
- ✅ Responsive design for all screen sizes
- ✅ Separate Zororo Phumulani insurance page

### Payment Models:
- **Construction**: Milestone-based escrow (funds held until approval)
- **Education**: Direct payment to institutions (semester/annual)
- **Healthcare**: Direct or installment payments to facilities

### Geographic Focus:
- Sub-Saharan Africa (Education and Healthcare listings)
- Global client access for all services

### For Production Deployment:
- [ ] Replace in-memory database with PostgreSQL/MongoDB
- [ ] Implement JWT authentication with secure token handling
- [ ] Add password hashing (bcrypt)
- [ ] Set up payment gateway integration (Stripe/PayPal)
- [ ] Add email notifications for milestone updates
- [ ] Implement file upload for milestone evidence
- [ ] Add comprehensive error handling and validation
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables
- [ ] Add SSL certificates
- [ ] Implement rate limiting and security headers

## 🔒 Security Notes

⚠️ **Important**: This is a demo application with simplified security for demonstration purposes.

For production:
1. Never store passwords in plain teconstruction clients and providers
- **Transparency**: Real-time tracking for construction, clear pricing for education/healthcare
- **Efficiency**: Automated payments for construction milestones, direct payments for education/healthcare
- **Insurance Integration**: Optional Zororo Phumulani coverage available
- **Geographic Focus**: Serving Sub-Saharan Africa with multiple service sectors
- **Scalability**: Modular architecture supports growth across sectors

## 🏢 Business Sections

### Afremit Platform
Main platform connecting clients with service providers across:
- Construction Services (escrow-protected)
- Education Services (direct payments)
- Healthcare Services (direct/installment)

### Zororo Phumulani Insurance
Separate business offering:
- Construction insurance
- Professional indemnity coverage
- Payment protection insurance
- AI-powered call center and onboarding

## 👨‍💼 About

**Afremit** focuses on connecting diaspora and local clients with verified service providers across Sub-Saharan Africa, offering different payment solutions tailored to each sector's needs. providers
- **Transparency**: Real-time tracking of project progress
- **Efficiency**: Automated payment releases upon milestone approval
- **Insurance Integration**: Partnership ready for ZIMNAT collaboration
- **Scalability**: Modular architecture supports growth

## 👨‍💼 Founder

**Zororo Phumulani**
- Visionary entrepreneur
- Focus on trust-driven construction financing
- Partnership opportunities with insurance providers

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For collaboration inquiries, please contact the development team.

## 📞 Support

For technical issues or questions:
- Email: support@afremit.com
- Website: https://afremit.com

---

Built with ❤️ by the Afremit Team
