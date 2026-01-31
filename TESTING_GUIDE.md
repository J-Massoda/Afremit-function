# Afremit MVP - Testing Guide

## Overview
This document provides comprehensive testing instructions for the Afremit web application. Due to Jest compatibility issues with ES modules in the current Node.js setup, this guide focuses on manual testing procedures using API clients and browser testing.

## Backend API Testing

### Prerequisites
- Install **Thunder Client** (VS Code extension) or **Postman**
- Backend server running on `http://localhost:5000`
- Sample files for upload testing (PDF, JPG, PNG under 5MB)

---

## 1. Authentication Flow Testing

### 1.1 Client Signup
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
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
    "name": "Test Client",
    "role": "client",
    "state": "REGISTERED"
  },
  "requiresEmailVerification": true
}
```

**✅ Validation Checklist:**
- [ ] Status code is 201
- [ ] Token is returned
- [ ] User state is "REGISTERED"
- [ ] requiresEmailVerification is true
- [ ] User appears in database with hashed password

---

### 1.2 Email Verification
**Endpoint:** `GET /api/auth/verify-email/:token`

**Steps:**
1. Copy `emailVerificationToken` from database for the user
2. Send GET request: `http://localhost:5000/api/auth/verify-email/{token}`

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully. You can now proceed with KYC."
}
```

**✅ Validation Checklist:**
- [ ] User state updated to "EMAIL_VERIFIED"
- [ ] emailVerified set to true
- [ ] emailVerificationToken cleared (null)

---

### 1.3 Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
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
    "email": "testclient@example.com",
    "role": "client",
    "state": "EMAIL_VERIFIED"
  },
  "requiresKYC": true
}
```

**✅ Validation Checklist:**
- [ ] Correct password accepted
- [ ] Wrong password rejected with 401
- [ ] Token generated
- [ ] requiresKYC flag accurate based on state

---

### 1.4 Provider Application
**Endpoint:** `POST /api/auth/provider/apply`

**Request Body:**
```json
{
  "email": "testprovider@example.com",
  "password": "ProviderPass123!",
  "fullName": "John Builder",
  "businessName": "Builder Professionals Ltd",
  "serviceCategory": "construction",
  "phoneNumber": "+27123456789"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 456,
    "email": "testprovider@example.com",
    "role": "provider",
    "state": "APPLIED"
  }
}
```

**✅ Validation Checklist:**
- [ ] Provider created with state "APPLIED"
- [ ] Provider record created in providers array
- [ ] verifiedBadge is false initially
- [ ] Email verification token generated

---

## 2. KYC Workflow Testing

### 2.1 Client KYC Submission
**Endpoint:** `POST /api/kyc/user`

**Headers:**
```
Authorization: Bearer {client_token}
Content-Type: multipart/form-data
```

**Form Data:**
```
fullName: John Doe
dateOfBirth: 1990-05-15
country: South Africa
idNumber: 9005155555088
idDocument: [file: id-doc.pdf]
proofOfIdentity: [file: proof.pdf]
```

**Expected Response (201):**
```json
{
  "message": "KYC submitted successfully",
  "kycRecord": {
    "id": 789,
    "userId": 123,
    "userType": "client",
    "status": "PENDING",
    "data": {
      "fullName": "John Doe",
      "dateOfBirth": "1990-05-15",
      "country": "South Africa",
      "idNumber": "9005155555088"
    }
  }
}
```

**✅ Validation Checklist:**
- [ ] Files uploaded to uploads/kyc/ directory
- [ ] User state updated to "KYC_PENDING"
- [ ] KYC record created with status "PENDING"
- [ ] Cannot submit duplicate KYC while pending

---

### 2.2 Provider KYC Submission
**Endpoint:** `POST /api/kyc/provider`

**Headers:**
```
Authorization: Bearer {provider_token}
Content-Type: multipart/form-data
```

**Form Data:**
```
businessName: Builder Professionals Ltd
businessRegistration: REG2024123456
taxNumber: TAX987654
serviceCategory: construction
operatingLocations: ["Harare", "Bulawayo", "Mutare"]
services: ["Residential Building", "Commercial Construction", "Renovations"]
bio: We are a professional construction company with 15 years of experience...
businessRegistrationDoc: [file: reg-doc.pdf]
directorId: [file: director-id.pdf]
proofOfAddress: [file: address-proof.pdf]
```

**Expected Response (201):**
```json
{
  "message": "Provider KYC submitted successfully",
  "kycRecord": {
    "id": 790,
    "userId": 456,
    "userType": "provider",
    "status": "PENDING",
    "data": {
      "businessName": "Builder Professionals Ltd",
      "operatingLocations": ["Harare", "Bulawayo", "Mutare"],
      "services": ["Residential Building", "Commercial Construction", "Renovations"]
    }
  }
}
```

**✅ Validation Checklist:**
- [ ] Provider state updated to "KYC_REVIEW"
- [ ] Arrays (operatingLocations, services) properly parsed
- [ ] Three documents uploaded
- [ ] Cannot submit duplicate while pending

---

### 2.3 Admin: View Pending KYC
**Endpoint:** `GET /api/admin/kyc/pending`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Expected Response (200):**
```json
{
  "kycRecords": [
    {
      "id": 789,
      "userType": "client",
      "status": "PENDING",
      "user": {
        "email": "testclient@example.com",
        "name": "Test Client"
      },
      "data": {
        "fullName": "John Doe",
        "idNumber": "9005155555088"
      },
      "submittedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**✅ Validation Checklist:**
- [ ] Only PENDING KYC records returned
- [ ] User details enriched in response
- [ ] Admin role required (403 for non-admin)

---

### 2.4 Admin: Approve KYC
**Endpoint:** `POST /api/admin/kyc/:kycId/approve`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "notes": "All documents verified and approved"
}
```

**Expected Response (200):**
```json
{
  "message": "KYC approved successfully",
  "kycRecord": {
    "id": 789,
    "status": "APPROVED",
    "reviewedBy": 1,
    "reviewNotes": "All documents verified and approved",
    "reviewedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**✅ Validation Checklist:**
- [ ] KYC status changed to "APPROVED"
- [ ] Client user state → "VERIFIED"
- [ ] Provider state → "VERIFIED" with verifiedBadge = true
- [ ] reviewedBy contains admin ID
- [ ] reviewedAt timestamp set

---

### 2.5 Admin: Reject KYC
**Endpoint:** `POST /api/admin/kyc/:kycId/reject`

**Request Body:**
```json
{
  "reason": "ID document is unclear. Please resubmit with higher quality image."
}
```

**Expected Response (200):**
```json
{
  "message": "KYC rejected",
  "kycRecord": {
    "id": 789,
    "status": "REJECTED",
    "rejectionReason": "ID document is unclear...",
    "reviewedBy": 1,
    "reviewedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**✅ Validation Checklist:**
- [ ] KYC status changed to "REJECTED"
- [ ] User/provider state NOT changed (remains at EMAIL_VERIFIED)
- [ ] Rejection reason stored
- [ ] User can resubmit KYC after rejection

---

## 3. Construction Workflow Testing

### 3.1 Client: Request Quote
**Endpoint:** `POST /api/construction/request-quote`

**Headers:**
```
Authorization: Bearer {verified_client_token}
Content-Type: multipart/form-data
```

**Form Data:**
```
constructionType: residential_building
projectDescription: Build 3-bedroom house with modern finishes
location: Harare, Borrowdale
budgetRange: 80000-120000
startDate: 2024-06-01
proposedMilestones: [
  {"name": "Foundation", "description": "Excavation and foundation laying", "percentage": 25},
  {"name": "Structure", "description": "Walls, roof, windows", "percentage": 40},
  {"name": "Plumbing & Electrical", "description": "Install all systems", "percentage": 20},
  {"name": "Finishing", "description": "Paint, flooring, fixtures", "percentage": 15}
]
blueprints: [file: blueprint.pdf]
referenceImages: [file: ref1.jpg, file: ref2.jpg]
```

**Expected Response (201):**
```json
{
  "message": "Quote request submitted successfully",
  "quote": {
    "id": 101,
    "clientId": 123,
    "constructionType": "residential_building",
    "status": "open",
    "proposedMilestones": [...]
  }
}
```

**✅ Validation Checklist:**
- [ ] Requires VERIFIED user state
- [ ] Files uploaded
- [ ] Quote created with status "open"
- [ ] proposedMilestones array parsed correctly

---

### 3.2 Provider: Browse Available Quotes
**Endpoint:** `GET /api/construction/available-quotes`

**Headers:**
```
Authorization: Bearer {published_provider_token}
```

**Expected Response (200):**
```json
{
  "quotes": [
    {
      "id": 101,
      "constructionType": "residential_building",
      "projectDescription": "Build 3-bedroom house...",
      "location": "Harare, Borrowdale",
      "budgetRange": "80000-120000",
      "client": {
        "name": "Test Client"
        // email/phone hidden until accepted
      },
      "status": "open"
    }
  ]
}
```

**✅ Validation Checklist:**
- [ ] Only PUBLISHED providers can access (403 for others)
- [ ] Client contact info hidden
- [ ] Only "open" quotes shown

---

### 3.3 Provider: Submit Quote Response
**Endpoint:** `POST /api/construction/quote-response`

**Headers:**
```
Authorization: Bearer {published_provider_token}
Content-Type: multipart/form-data
```

**Form Data:**
```
quoteId: 101
totalCost: 95000
estimatedDuration: 6 months
responseMessage: We specialize in modern residential construction...
recommendedMilestones: [
  {"name": "Site Prep & Foundation", "percentage": 25, "amount": 23750},
  {"name": "Structural Work", "percentage": 35, "amount": 33250},
  {"name": "Systems Installation", "percentage": 20, "amount": 19000},
  {"name": "Finishing & Handover", "percentage": 20, "amount": 19000}
]
constructionPlan: [file: our-plan.pdf]
```

**Expected Response (201):**
```json
{
  "message": "Quote response submitted successfully",
  "response": {
    "id": 201,
    "quoteId": 101,
    "providerId": 456,
    "totalCost": 95000,
    "status": "pending",
    "recommendedMilestones": [...]
  }
}
```

**✅ Validation Checklist:**
- [ ] Milestone percentages sum to 100
- [ ] Milestone amounts sum to totalCost
- [ ] Cannot submit duplicate response to same quote
- [ ] Provider details attached to response

---

### 3.4 Client: View Quote Responses
**Endpoint:** `GET /api/construction/quotes/:quoteId`

**Headers:**
```
Authorization: Bearer {client_token}
```

**Expected Response (200):**
```json
{
  "quote": {
    "id": 101,
    "constructionType": "residential_building",
    "projectDescription": "...",
    "status": "open"
  },
  "responses": [
    {
      "id": 201,
      "provider": {
        "businessName": "Builder Professionals Ltd",
        "rating": 4.8,
        "completedContracts": 25,
        "verifiedBadge": true
      },
      "totalCost": 95000,
      "estimatedDuration": "6 months",
      "responseMessage": "We specialize in...",
      "recommendedMilestones": [...]
    }
  ]
}
```

**✅ Validation Checklist:**
- [ ] Only quote owner can view responses
- [ ] Provider details enriched
- [ ] All pending/accepted responses shown

---

### 3.5 Client: Accept Quote Response (Create Contract)
**Endpoint:** `POST /api/construction/accept-response/:responseId`

**Headers:**
```
Authorization: Bearer {client_token}
```

**Expected Response (201):**
```json
{
  "message": "Contract created successfully",
  "contract": {
    "id": 301,
    "quoteId": 101,
    "quoteResponseId": 201,
    "clientId": 123,
    "providerId": 456,
    "totalAmount": 95000,
    "escrowBalance": 95000,
    "releasedAmount": 0,
    "status": "PENDING_ACCEPTANCE",
    "milestones": [
      {
        "id": 401,
        "name": "Site Prep & Foundation",
        "amount": 23750,
        "status": "PENDING",
        "order": 0
      },
      // ... 3 more milestones
    ]
  }
}
```

**✅ Validation Checklist:**
- [ ] Quote status changed to "closed"
- [ ] Quote response status → "accepted"
- [ ] Contract created with correct amounts
- [ ] 4 milestone records created (PENDING status)
- [ ] 4 escrow ledger entries created (HELD status)
- [ ] escrowBalance = totalAmount
- [ ] Cannot accept another response after contract created

---

### 3.6 Verify Escrow Ledger Entries
**Manual Database Check:**

After contract creation, verify escrow entries:

```javascript
// Check escrowLedger array
escrowLedger.filter(e => e.contractId === 301)
```

**Expected:**
```json
[
  {
    "id": "escrow-1",
    "contractId": 301,
    "milestoneId": 401,
    "amount": 23750,
    "status": "HELD",
    "heldAt": "2024-01-15T12:00:00.000Z",
    "releasedAt": null
  },
  // ... 3 more entries
]
```

**✅ Validation Checklist:**
- [ ] One escrow entry per milestone
- [ ] All entries have status "HELD"
- [ ] heldAt timestamp set
- [ ] releasedAt is null initially
- [ ] Sum of amounts = contract totalAmount

---

## 4. Provider Discovery Testing

### 4.1 Guest: Browse Providers (Limited Access)
**Endpoint:** `GET /api/providers`

**Query Params:** (optional)
```
?search=builder
&serviceType=construction
&location=Harare
&verifiedOnly=true
&rating=4
```

**Expected Response (200):**
```json
{
  "providers": [
    {
      "id": 456,
      "businessName": "Builder Professionals Ltd",
      "serviceCategory": "construction",
      "rating": 4.8,
      "completedContracts": 25,
      "verifiedBadge": true,
      "operatingLocations": ["Harare", "Bulawayo"],
      "services": ["Residential Building", "Commercial Construction"],
      "bio": "Professional construction company...",
      "requiresVerification": true,
      "canContact": false
      // NO phone, email, full name for guests
    }
  ]
}
```

**✅ Validation Checklist:**
- [ ] Only PUBLISHED + verified providers shown
- [ ] Guest users see requiresVerification: true
- [ ] Contact details hidden (no phone/email)
- [ ] Search filters work correctly
- [ ] verifiedOnly filter applied by default

---

### 4.2 Verified User: Browse Providers (Full Access)
**Endpoint:** `GET /api/providers`

**Headers:**
```
Authorization: Bearer {verified_user_token}
```

**Expected Response (200):**
```json
{
  "providers": [
    {
      "id": 456,
      "businessName": "Builder Professionals Ltd",
      "fullName": "John Builder",
      "email": "testprovider@example.com",
      "phoneNumber": "+27123456789",
      "serviceCategory": "construction",
      "rating": 4.8,
      "completedContracts": 25,
      "verifiedBadge": true,
      "operatingLocations": ["Harare", "Bulawayo"],
      "services": ["Residential Building", "Commercial Construction"],
      "bio": "Professional construction company...",
      "canContact": true
    }
  ]
}
```

**✅ Validation Checklist:**
- [ ] Verified users see full contact details
- [ ] canContact: true for verified users
- [ ] requiresVerification flag not present

---

### 4.3 Provider Profile Details
**Endpoint:** `GET /api/providers/:providerId`

**Headers:**
```
Authorization: Bearer {token} (optional for guest)
```

**Expected Response (200):**
```json
{
  "provider": {
    "id": 456,
    "businessName": "Builder Professionals Ltd",
    "fullName": "John Builder", // only if user verified
    "email": "...", // only if user verified
    "phoneNumber": "...", // only if user verified
    "serviceCategory": "construction",
    "rating": 4.8,
    "completedContracts": 25,
    "verifiedBadge": true,
    "state": "PUBLISHED",
    "operatingLocations": ["Harare", "Bulawayo", "Mutare"],
    "services": ["Residential Building", "Commercial Construction", "Renovations"],
    "bio": "We are a professional construction company...",
    "stats": {
      "totalProjects": 25,
      "averageProjectValue": 87500,
      "onTimeCompletion": 24
    }
  }
}
```

**✅ Validation Checklist:**
- [ ] Guest sees limited info
- [ ] Verified user sees contact details
- [ ] Stats calculated from completed contracts
- [ ] Only PUBLISHED providers accessible

---

## 5. Admin Management Testing

### 5.1 Admin: View Provider List
**Endpoint:** `GET /api/admin/providers`

**Query Params:**
```
?state=VERIFIED
&verifiedBadge=true
```

**Expected Response (200):**
```json
{
  "providers": [
    {
      "id": 456,
      "businessName": "Builder Professionals Ltd",
      "email": "testprovider@example.com",
      "state": "VERIFIED",
      "verifiedBadge": true,
      "serviceCategory": "construction",
      "completedContracts": 25
    }
  ]
}
```

**✅ Validation Checklist:**
- [ ] Admin role required
- [ ] State filter works
- [ ] verifiedBadge filter works

---

### 5.2 Admin: Publish Provider
**Endpoint:** `POST /api/admin/providers/:providerId/publish`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Expected Response (200):**
```json
{
  "message": "Provider published successfully",
  "provider": {
    "id": 456,
    "state": "PUBLISHED",
    "verifiedBadge": true
  }
}
```

**✅ Validation Checklist:**
- [ ] Provider state changed to "PUBLISHED"
- [ ] Provider now appears in public directory
- [ ] Can only publish VERIFIED providers

---

### 5.3 Admin: Suspend User/Provider
**Endpoint:** `POST /api/admin/users/:userId/suspend`

**Request Body:**
```json
{
  "reason": "Violation of terms of service"
}
```

**Expected Response (200):**
```json
{
  "message": "User suspended successfully",
  "user": {
    "id": 123,
    "state": "SUSPENDED",
    "suspensionReason": "Violation of terms of service"
  }
}
```

**✅ Validation Checklist:**
- [ ] User/provider state → "SUSPENDED"
- [ ] Suspended users cannot log in
- [ ] suspensionReason stored

---

### 5.4 Admin: Dashboard Statistics
**Endpoint:** `GET /api/admin/stats`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Expected Response (200):**
```json
{
  "users": {
    "total": 125,
    "byState": {
      "REGISTERED": 15,
      "EMAIL_VERIFIED": 20,
      "KYC_PENDING": 10,
      "VERIFIED": 75,
      "SUSPENDED": 5
    },
    "byRole": {
      "client": 100,
      "provider": 20,
      "admin": 5
    }
  },
  "providers": {
    "total": 20,
    "byState": {
      "APPLIED": 3,
      "DOCUMENTS_SUBMITTED": 2,
      "KYC_REVIEW": 4,
      "VERIFIED": 5,
      "PUBLISHED": 6
    },
    "verified": 11
  },
  "kyc": {
    "pending": 14,
    "approved": 80,
    "rejected": 6
  },
  "contracts": {
    "total": 45,
    "active": 12,
    "completed": 30,
    "disputed": 2,
    "cancelled": 1
  },
  "escrow": {
    "totalHeld": 2340000,
    "totalReleased": 890000,
    "pendingReleases": 5
  }
}
```

**✅ Validation Checklist:**
- [ ] All counts accurate
- [ ] State breakdowns correct
- [ ] Escrow amounts match ledger

---

## 6. State Machine Validation

### User State Transitions
```
REGISTERED → EMAIL_VERIFIED → KYC_PENDING → VERIFIED → [SUSPENDED]
```

**Test Cases:**
- [ ] Cannot skip EMAIL_VERIFIED (login blocked)
- [ ] Cannot access protected routes until VERIFIED
- [ ] SUSPENDED users rejected at login
- [ ] State transitions only via proper endpoints

### Provider State Transitions
```
APPLIED → DOCUMENTS_SUBMITTED → KYC_REVIEW → VERIFIED → PUBLISHED → [SUSPENDED]
```

**Test Cases:**
- [ ] verifiedBadge only set when VERIFIED
- [ ] Only PUBLISHED providers in public directory
- [ ] Cannot submit quotes until PUBLISHED
- [ ] Email verification moves APPLIED → DOCUMENTS_SUBMITTED

### Contract State Transitions
```
DRAFT → PENDING_ACCEPTANCE → ACTIVE → IN_PROGRESS → COMPLETED → [DISPUTED | CANCELLED]
```

**Test Cases:**
- [ ] New contracts start at PENDING_ACCEPTANCE
- [ ] Provider must accept to move to ACTIVE
- [ ] First milestone approval → IN_PROGRESS
- [ ] All milestones paid → COMPLETED

### Milestone State Transitions
```
PENDING → IN_PROGRESS → SUBMITTED → [APPROVED | REJECTED] → PAID
```

**Test Cases:**
- [ ] Milestones created in PENDING
- [ ] Provider marks IN_PROGRESS
- [ ] Provider submits evidence → SUBMITTED
- [ ] Admin approves → APPROVED
- [ ] Escrow release → PAID

---

## 7. Frontend Component Testing

### ClientKYCForm Component
**Manual Browser Tests:**

1. **Form Validation**
   - [ ] All fields required before submit
   - [ ] Date of birth validates format
   - [ ] ID number validates length/format

2. **File Upload**
   - [ ] Drag and drop works
   - [ ] Click to browse works
   - [ ] File size limit enforced (5MB)
   - [ ] File type validation (PDF/JPG/PNG)
   - [ ] Visual feedback on upload (green checkmark)
   - [ ] File name and size displayed

3. **Submission**
   - [ ] Loading spinner shows during upload
   - [ ] Success animation plays
   - [ ] Auto-redirect after 3 seconds
   - [ ] Error messages display properly

---

### ProviderKYCForm Component
**Manual Browser Tests:**

1. **Dynamic Arrays**
   - [ ] Add location button works
   - [ ] Remove location button works
   - [ ] Add service button works
   - [ ] Remove service button works
   - [ ] Arrays properly serialized to JSON

2. **File Uploads**
   - [ ] Three separate dropzones work
   - [ ] Each dropzone validates independently
   - [ ] All three files required

3. **Service Category**
   - [ ] Dropdown shows: construction, medical, education
   - [ ] Selection stored correctly

---

### AdminKYCReview Component
**Manual Browser Tests:**

1. **Filter Tabs**
   - [ ] Pending tab shows PENDING records
   - [ ] Approved tab shows APPROVED records
   - [ ] Rejected tab shows REJECTED records
   - [ ] All tab shows everything
   - [ ] Tab click refetches data

2. **KYC Cards**
   - [ ] Client KYC shows: name, DOB, country, idNumber
   - [ ] Provider KYC shows: business name, registration, category
   - [ ] Status badges colored correctly (yellow/green/red)

3. **Details Modal**
   - [ ] "View Details" opens modal
   - [ ] All KYC data displayed
   - [ ] Document links work (open in new tab)
   - [ ] Close button works

4. **Approval Actions**
   - [ ] Approve button shows confirmation
   - [ ] Approve updates status immediately
   - [ ] Reject opens reason modal
   - [ ] Reject with reason updates status
   - [ ] List refetches after action

---

### ProviderDirectory Component
**Manual Browser Tests:**

1. **Search**
   - [ ] Search input filters by business name
   - [ ] Debounced search (waits for typing)
   - [ ] Clear search works

2. **Filters**
   - [ ] Service type dropdown filters correctly
   - [ ] Location input filters results
   - [ ] Rating dropdown filters (4+, 4.5+)
   - [ ] Verified only checkbox works (default checked)
   - [ ] Clear filters resets all

3. **Provider Cards**
   - [ ] Verified badge shows for verified providers
   - [ ] Rating stars displayed correctly (1-5)
   - [ ] Completed contracts count shown
   - [ ] Bio truncated to 3 lines
   - [ ] Locations truncated to 3 + count
   - [ ] Services truncated to 2 + count

4. **Access Control**
   - [ ] Guest sees "Verify account to contact" message
   - [ ] Verified user sees "View Profile" button
   - [ ] Login required message for guests

5. **Empty State**
   - [ ] "No providers found" shows when no results
   - [ ] "Clear filters" button shows
   - [ ] Clear filters resets search

---

## 8. Role-Based Access Control Test Matrix

| Endpoint | Guest | Client (Unverified) | Client (Verified) | Provider (Published) | Admin |
|----------|-------|---------------------|-------------------|----------------------|-------|
| POST /auth/signup | ✅ | N/A | N/A | N/A | N/A |
| POST /auth/login | ✅ | N/A | N/A | N/A | N/A |
| GET /auth/me | ❌ | ✅ | ✅ | ✅ | ✅ |
| POST /kyc/user | ❌ | ✅ | ❌ | ❌ | ❌ |
| POST /kyc/provider | ❌ | ❌ | ❌ | ✅ (if not verified) | ❌ |
| GET /providers | ✅ (limited) | ✅ (limited) | ✅ (full) | ✅ (full) | ✅ (full) |
| POST /construction/request-quote | ❌ | ❌ | ✅ | ❌ | ❌ |
| GET /construction/available-quotes | ❌ | ❌ | ❌ | ✅ (PUBLISHED only) | ❌ |
| POST /construction/quote-response | ❌ | ❌ | ❌ | ✅ (PUBLISHED only) | ❌ |
| POST /construction/accept-response | ❌ | ❌ | ✅ | ❌ | ❌ |
| GET /admin/kyc/pending | ❌ | ❌ | ❌ | ❌ | ✅ |
| POST /admin/kyc/:id/approve | ❌ | ❌ | ❌ | ❌ | ✅ |
| POST /admin/providers/:id/publish | ❌ | ❌ | ❌ | ❌ | ✅ |

**Legend:**
- ✅ = Allowed
- ❌ = 401/403 Error
- N/A = Not applicable

---

## 9. File Upload Testing

### Test Files Preparation
Create sample files for testing:

```
test-files/
├── id-passport.pdf (< 5MB)
├── proof-of-address.pdf (< 5MB)
├── business-registration.pdf (< 5MB)
├── blueprint.pdf (< 5MB)
├── reference-image.jpg (< 5MB)
└── too-large-file.pdf (> 5MB for error testing)
```

### File Upload Test Cases
- [ ] PDF files accepted
- [ ] JPG/PNG images accepted
- [ ] Files > 5MB rejected with error
- [ ] Non-allowed file types rejected (.exe, .zip, etc.)
- [ ] Multiple files uploaded in one request
- [ ] Files saved to correct directory (uploads/kyc/)
- [ ] File paths stored in database
- [ ] Files accessible via /uploads/:filename

---

## 10. Error Handling Testing

### Common Error Cases

1. **Authentication Errors**
   - [ ] Missing token → 401
   - [ ] Invalid token → 403
   - [ ] Expired token → 403

2. **Authorization Errors**
   - [ ] Wrong role → 403 with role requirement message
   - [ ] Wrong state → 403 with state requirement message
   - [ ] Unverified email → 403 with verification message

3. **Validation Errors**
   - [ ] Missing required fields → 400 with field list
   - [ ] Invalid email format → 400
   - [ ] Duplicate email → 400
   - [ ] Invalid state transition → 400

4. **Not Found Errors**
   - [ ] Invalid KYC ID → 404
   - [ ] Invalid user ID → 404
   - [ ] Invalid quote ID → 404

5. **File Upload Errors**
   - [ ] File too large → 400 "File too large, maxSize: 5MB"
   - [ ] Missing required file → 400
   - [ ] Invalid file type → 400

---

## 11. Performance Testing

### Load Testing (Manual with Thunder Client)

**Test Scenarios:**
1. **Concurrent Logins** (10 requests)
   - [ ] All requests succeed
   - [ ] Response time < 500ms

2. **Concurrent Quote Browsing** (20 requests)
   - [ ] All requests return data
   - [ ] Response time < 1000ms

3. **File Upload Performance**
   - [ ] 1MB file uploads in < 2 seconds
   - [ ] 5MB file uploads in < 5 seconds

4. **Admin Dashboard Stats**
   - [ ] Stats calculation < 1 second for 1000 users

---

## 12. Security Testing

### Authentication Security
- [ ] Passwords hashed with bcrypt (10 rounds)
- [ ] JWT tokens have 7-day expiration
- [ ] JWT secret from environment variable
- [ ] Passwords never returned in responses
- [ ] Email verification tokens are random (32 chars)

### Authorization Security
- [ ] Middleware checks role before sensitive endpoints
- [ ] State validation prevents skipping verification steps
- [ ] Users can only access their own data
- [ ] Admin endpoints completely blocked for non-admins

### File Upload Security
- [ ] File size limits enforced
- [ ] File type whitelist (PDF/JPG/PNG only)
- [ ] Files saved outside public web root
- [ ] Filename sanitization to prevent path traversal

### State Machine Security
- [ ] Cannot manually set user/provider state
- [ ] State transitions only via approved endpoints
- [ ] SUSPENDED users blocked at authentication

---

## Test Execution Checklist

### Daily Smoke Tests
- [ ] User signup and login
- [ ] Email verification
- [ ] KYC submission (client + provider)
- [ ] Admin approval
- [ ] Quote request
- [ ] Provider response
- [ ] Contract creation

### Pre-Deployment Tests
- [ ] All authentication flows
- [ ] All KYC workflows (approve + reject)
- [ ] Full construction workflow
- [ ] Provider discovery (guest + verified)
- [ ] Admin management
- [ ] All state transitions
- [ ] File uploads
- [ ] Error handling
- [ ] Access control matrix

### Test Data Reset
To reset test data, restart the Node.js server (it uses in-memory arrays).

---

## Known Issues & Limitations

1. **In-Memory Database**: Data lost on server restart. Production will use PostgreSQL/MongoDB.
2. **Email Sending**: Currently mocked. Production will use real email service.
3. **File Storage**: Local uploads/ directory. Production will use AWS S3/cloud storage.
4. **No Real-Time Notifications**: Polling required for status updates.
5. **Limited Search**: Basic string matching. Production will use Elasticsearch.

---

## Test Reporting Template

**Date:** ___________
**Tester:** ___________
**Build/Commit:** ___________

### Test Summary
- Total Test Cases: _____
- Passed: _____
- Failed: _____
- Skipped: _____

### Failed Tests
| Test Case | Expected | Actual | Severity | Notes |
|-----------|----------|--------|----------|-------|
| | | | | |

### Bugs Found
| ID | Description | Steps to Reproduce | Priority |
|----|-------------|-------------------|----------|
| | | | |

### Recommendations
___________________________________________
___________________________________________

---

## Automated Testing (Future)

For production, consider implementing:
1. **Vitest** for ESM-compatible testing
2. **Cypress** for E2E frontend tests
3. **Artillery** for load testing
4. **OWASP ZAP** for security scanning
5. **GitHub Actions** for CI/CD testing

---

**Document Version:** 1.0
**Last Updated:** 2024-01-15
**Author:** GitHub Copilot
