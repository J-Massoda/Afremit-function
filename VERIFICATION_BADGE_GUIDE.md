# Verification Badge Visual Guide

## Badge Colors & Meanings

### 🔵 Blue Badge - Verified Users (Clients)
- **Meaning:** User has completed KYC verification
- **Displays when:** user.state === 'VERIFIED'
- **Shows on:**
  - Navigation profile dropdown (on avatar)
  - User profile pages (if implemented)

### 🟡 Yellow Badge - Verified Service Providers
- **Meaning:** Provider has completed KYC verification and business verification
- **Displays when:** provider.state === 'VERIFIED' or 'PUBLISHED' AND verifiedBadge === true
- **Shows on:**
  - Navigation profile dropdown (on avatar)
  - Provider cards in directory
  - Provider profile page (next to business name)
  - Landing page verified providers section
  - Quote response cards (if implemented)

---

## Badge Locations in the App

### 1. **Navigation Bar (All Pages)**
```
┌─────────────────────────────────────────────────────────┐
│ [A] Afremit    Business ▼   How It Works   About Us    │
│                                                   [🔵][👤]│ ← Blue/Yellow badge on avatar
└─────────────────────────────────────────────────────────┘
```

**Profile Dropdown (when clicked):**
```
┌─────────────────────────────────┐
│ John Doe 🔵                     │ ← Badge next to name
│ john@example.com                │
│ ✅ Verified Account             │
│─────────────────────────────────│
│ 📊 Dashboard                    │
│ 📋 KYC Status                   │
│ 🚪 Logout                       │
└─────────────────────────────────┘
```

---

### 2. **Landing Page - Verified Providers Section**
```
┌────────────────────────────────────────────────────────────┐
│          Verified Service Providers                        │
│     Connect with KYC-verified professionals                │
├────────────┬────────────┬────────────┬────────────────────┤
│ Builder Co 🟡│ Medical Ltd 🟡│ EduServ 🟡│  ← Yellow badges
│ ⭐⭐⭐⭐⭐ 4.8  │ ⭐⭐⭐⭐⭐ 4.9  │ ⭐⭐⭐⭐⭐ 4.7  │
│ 25 projects │ 40 projects │ 15 projects │
│ 📍 Harare   │ 📍 Bulawayo │ 📍 Lusaka   │
│ [View Profile]│[View Profile]│[View Profile]│
└────────────┴────────────┴────────────┴────────────────────┘
```

---

### 3. **Provider Directory Page**
```
┌──────────────────────────────────────────────────────────┐
│ 🔍 Search providers...     [All Services ▼] [Location]  │
├──────────────────────────────────────────────────────────┤
│  Grid of Provider Cards:                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────┐
│  │ Builder Professionals 🟡│  │ Medical Services 🟡    │
│  │ Construction            │  │ Healthcare              │
│  │ ⭐⭐⭐⭐⭐ 4.8 (25)        │  │ ⭐⭐⭐⭐⭐ 4.9 (40)      │
│  │ 📍 Harare, Bulawayo    │  │ 📍 Lusaka, Kitwe       │
│  │ Building, Renovation    │  │ General Care, Surgery   │
│  │ [View Profile]          │  │ [View Profile]          │
│  └─────────────────────────┘  └─────────────────────────┘
└──────────────────────────────────────────────────────────┘
```

---

### 4. **Provider Profile Page**
```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Directory                                          │
├─────────────────────────────────────────────────────────────┤
│  Builder Professionals Ltd 🟡  ← Large yellow badge        │
│  Construction                                                │
│  ⭐⭐⭐⭐⭐ 4.8  (25 completed projects)                      │
│                                                              │
│  Total Projects    Avg Value      On-Time                   │
│       25          $87,500         24/25                      │
│                                                              │
│                                    [Request a Quote]         │
├─────────────────────────────────────────────────────────────┤
│  About                                                       │
│  Professional construction company with 15 years...         │
│                                                              │
│  Services Offered                                            │
│  ✓ Residential Building    ✓ Commercial Construction       │
│  ✓ Renovations             ✓ Project Management            │
└─────────────────────────────────────────────────────────────┘
```

---

### 5. **KYC Status Banner (Top of Pages)**

**Incomplete KYC:**
```
┌──────────────────────────────────────────────────────────┐
│ ⚠️ Complete KYC Verification                            │
│    Submit your documents to access all services          │
│                              [Complete KYC Now] ────────→│
└──────────────────────────────────────────────────────────┘
```

**Pending Verification:**
```
┌──────────────────────────────────────────────────────────┐
│ ⏳ KYC Verification Pending                              │
│    Your documents are under review (1-2 business days)   │
└──────────────────────────────────────────────────────────┘
```

**Verified (Banner Hidden)**
```
No banner shown - user has full access
```

---

## Access Control Visual States

### For **Guests** (Not Logged In):
```
Provider Card:
┌─────────────────────────┐
│ Builder Ltd 🟡         │
│ ⭐⭐⭐⭐⭐ 4.8          │
│ [🔒 Login to View]     │ ← Disabled button
│ → Sign up to connect   │ ← Link to signup
└─────────────────────────┘
```

### For **Unverified Users**:
```
Provider Card:
┌─────────────────────────┐
│ Builder Ltd 🟡         │
│ ⭐⭐⭐⭐⭐ 4.8          │
│ [🔒 Complete KYC]      │ ← Disabled button
│ → Complete verification│ ← Link to KYC form
└─────────────────────────┘
```

### For **Verified Users**:
```
Provider Card:
┌─────────────────────────┐
│ Builder Ltd 🟡         │
│ ⭐⭐⭐⭐⭐ 4.8          │
│ [View Profile]         │ ← Enabled button
└─────────────────────────┘
```

---

## Badge Component Usage Examples

### In JSX:
```jsx
import VerificationBadge from '../components/shared/VerificationBadge';

// For verified user
<VerificationBadge type="user" size="md" />

// For verified provider
<VerificationBadge type="provider" size="lg" />

// Small badge (for avatars)
<VerificationBadge type="provider" size="sm" showTooltip={true} />
```

### Props:
- `type`: 'user' (blue) or 'provider' (yellow)
- `size`: 'sm', 'md', 'lg'
- `showTooltip`: true/false (default: true)
- `className`: additional Tailwind classes

---

## State-Based Display Logic

### User Verification States:
```javascript
// Show BLUE badge when:
user.state === 'VERIFIED'

// Hide badge when:
user.state === 'REGISTERED'
user.state === 'EMAIL_VERIFIED'
user.state === 'KYC_PENDING'
user.state === 'SUSPENDED'
```

### Provider Verification States:
```javascript
// Show YELLOW badge when:
provider.state === 'VERIFIED' || provider.state === 'PUBLISHED'
AND provider.verifiedBadge === true

// Hide badge when:
provider.state === 'APPLIED'
provider.state === 'DOCUMENTS_SUBMITTED'
provider.state === 'KYC_REVIEW'
provider.state === 'SUSPENDED'
OR provider.verifiedBadge === false
```

---

## Color Codes (Tailwind Classes)

### Blue Badge (User):
- **Color:** `text-blue-500`
- **Background (if needed):** `bg-blue-100`
- **Border (if needed):** `border-blue-300`

### Yellow Badge (Provider):
- **Color:** `text-yellow-500`
- **Background (if needed):** `bg-yellow-100`
- **Border (if needed):** `border-yellow-300`

### Status Badges (KYC Admin):
- **Pending:** `bg-yellow-100 text-yellow-800`
- **Approved:** `bg-green-100 text-green-800`
- **Rejected:** `bg-red-100 text-red-800`

---

## Responsive Behavior

### Desktop (> 1024px):
- Badges display at full size next to names
- Profile dropdown on right side of navigation
- Provider cards in 3-column grid

### Tablet (768px - 1024px):
- Badges maintain size
- Profile dropdown on right
- Provider cards in 2-column grid

### Mobile (< 768px):
- Badges slightly smaller
- Mobile menu with profile info at top
- Provider cards in 1-column stack
- KYC banner text stacks vertically

---

## Animation Details

### Badge Entrance:
```javascript
initial={{ scale: 0 }}
animate={{ scale: 1 }}
transition={{ type: 'spring', stiffness: 260, damping: 20 }}
```

**Effect:** Badge "pops" into view with spring animation

### KYC Banner:
```javascript
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
```

**Effect:** Slides down from top with fade-in

### Profile Dropdown:
```javascript
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
```

**Effect:** Smooth fade and slide

---

## Testing Checklist

### Visual Tests:
- [ ] Blue badge appears for verified users in navigation
- [ ] Yellow badge appears for verified providers in navigation
- [ ] Yellow badge appears on provider cards in directory
- [ ] Yellow badge appears on provider profile page
- [ ] Yellow badge appears in landing page verified section
- [ ] Badges animate smoothly on page load
- [ ] Badges scale correctly on all screen sizes
- [ ] Tooltips appear on hover (desktop)

### Functional Tests:
- [ ] Badge only shows for correct state (VERIFIED/PUBLISHED)
- [ ] Badge hidden for unverified users
- [ ] Badge color correct (blue for users, yellow for providers)
- [ ] Badge size adjusts based on prop
- [ ] Profile dropdown shows badge on avatar
- [ ] Access control enforced (disabled buttons for guests/unverified)

### Responsive Tests:
- [ ] Badges display correctly on mobile
- [ ] Profile dropdown works on mobile menu
- [ ] KYC banner readable on mobile
- [ ] Provider cards scale properly with badges

---

## Common Issues & Troubleshooting

### Badge Not Showing:
1. Check user/provider state: `console.log(user.state, provider.state)`
2. Verify verifiedBadge property: `console.log(provider.verifiedBadge)`
3. Check component import: `import VerificationBadge from '...'`
4. Ensure authentication context loaded: `const { user } = useAuth()`

### Wrong Badge Color:
1. Verify `type` prop: should be 'user' or 'provider'
2. Check state mapping in component
3. Inspect Tailwind classes applied

### Badge Not Animating:
1. Ensure Framer Motion installed: `npm list framer-motion`
2. Check animation props in component
3. Verify parent container doesn't have overflow:hidden

### Access Control Not Working:
1. Check authentication state: `const { user, isAuthenticated } = useAuth()`
2. Verify state calculation: `const isVerified = user?.state === 'VERIFIED'`
3. Inspect button disabled prop and conditional rendering

---

**Last Updated:** January 22, 2026
**Component Version:** 1.0
**Maintained By:** Frontend Team
