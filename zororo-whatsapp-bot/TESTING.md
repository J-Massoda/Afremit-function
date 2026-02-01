# 🧪 Testing Guide

Complete testing scenarios for Zororo Phumulani WhatsApp Bot.

---

## 📋 Pre-Test Checklist

Before testing, ensure:

- ✅ Server is running: `npm run dev`
- ✅ ngrok is exposing server: `ngrok http 3000`
- ✅ Webhook is configured in Meta Dashboard
- ✅ Webhook verification passed
- ✅ ACCESS_TOKEN is valid (not expired)

---

## 🎯 Test Scenarios

### Scenario 1: Welcome & Menu Display

**User Action:**
```
Hi
```

**Expected Response:**
```
Welcome to *Zororo Phumulani Insurance*! 🛡️

Your trusted partner for peace of mind.

*Choose a plan to learn more:*

1️⃣ Funeral & Repatriation Cover
   💰 From $10/month
   
2️⃣ Worldwide Funeral Cover
   💰 From $25/month
   
3️⃣ Accidental Death Cover
   💰 From $15/month

4️⃣ Speak with Agent 👨‍💼

*Reply with a number* (1, 2, 3, or 4)

Or type *INFO* for company details.
```

**Variations to test:**
- `HELLO`
- `Hey`
- `START`
- `MENU`

---

### Scenario 2: Plan Inquiry - Funeral Cover

**User Action:**
```
1
```

**Expected Response:**
```
🏛️ *Funeral & Repatriation Cover*

Comprehensive funeral insurance covering:
✅ Funeral expenses (coffin, venue, catering)
✅ Repatriation (bring loved ones home from anywhere)
✅ Death certificate & legal documentation
✅ Family support services

💰 *Pricing:*
• Individual: $10/month
• Family (5 members): $30/month

🌍 *Coverage:* Zimbabwe + Southern Africa

Type *SUBSCRIBE* to begin enrollment.
```

---

### Scenario 3: Plan Inquiry - Worldwide

**User Action:**
```
2
```

**Expected Response:**
```
🌍 *Worldwide Funeral Cover*

Premium global coverage including:
✅ International repatriation from ANY country
✅ 24/7 emergency assistance
✅ Full funeral arrangements
✅ Legal & documentation support worldwide
✅ Family counseling services

💰 *Pricing:*
• Individual: $25/month
• Family (5 members): $75/month

🌎 *Coverage:* Global (all countries)

Type *SUBSCRIBE* to begin enrollment.
```

---

### Scenario 4: Plan Inquiry - Accidental Death

**User Action:**
```
3
```

**Expected Response:**
```
⚡ *Accidental Death Cover*

Financial protection for unexpected accidents:
✅ Lump sum payout on accidental death
✅ Covers: traffic, workplace, home accidents
✅ Medical expenses from accidents
✅ Permanent disability cover
✅ 24/7 claim processing

💰 *Pricing:*
• $100,000 coverage: $15/month
• $250,000 coverage: $35/month
• $500,000 coverage: $65/month

Type *SUBSCRIBE* to begin enrollment.
```

---

### Scenario 5: Agent Request

**User Action:**
```
4
```

**Expected Response:**
```
📞 *Connecting you with an agent...*

Our team is available:
🕐 Mon-Fri: 8AM - 5PM
🕐 Sat: 8AM - 1PM

You can also:
📧 Email: support@zororo-phumulani.com
📱 Call: +263 771 234 567
🌐 Visit: https://zororo-phumulani.com

An agent will respond shortly. Thank you for your patience! 🙏
```

---

### Scenario 6: Complete Onboarding Flow

**Step 1 - Start subscription:**
```
SUBSCRIBE
```

**Expected:**
```
🎉 Great! Let's get you enrolled.

This will only take 2 minutes.

First, what is your *full name*?
(as it appears on your ID)
```

**Step 2 - Provide name:**
```
John Doe
```

**Expected:**
```
Thank you, John Doe! 👤

Now, please provide your *ID or Passport Number* for verification.

Example: 
• ID: 63-1234567-A-12
• Passport: AB123456
```

**Step 3 - Provide ID:**
```
63-1234567-A-12
```

**Expected:**
```
Perfect! Your details are confirmed. ✅

*Enrollment Summary:*
👤 Name: John Doe
🆔 ID: 63-1234567-A-12
📋 Plan: Funeral & Repatriation

*Next Step: Payment*

💳 *Payment Options:*

1️⃣ *EcoCash:*
   • Send to: 0771234567
   • Amount: $10
   • Reference: 63-1234567-A-12

2️⃣ *Bank Transfer:*
   • Bank: CBZ
   • Account: 12345678
   • Reference: 63-1234567-A-12

3️⃣ *Online Payment:*
   🔗 https://zororo-phumulani.com/pay/63-1234567-A-12

After payment, reply with:
*PAID [transaction reference]*

Example: PAID ECO123456789

Need help? Type *AGENT* to speak with a representative.
```

**Step 4 - Confirm payment:**
```
PAID ECO123456789
```

**Expected:**
```
🎉 *Enrollment Complete!*

Thank you for choosing Zororo Phumulani Insurance! 

✅ Payment received
✅ Policy activated
📄 Policy Number: ZP1738415400000

Your digital policy document is being prepared and will be sent to you within 24 hours.

*What's Next?*
• You're covered starting today
• Premium due date: [next month date]
• Download policy: https://zororo-phumulani.com/policy

*Need Assistance?*
Type *HELP* for support
Type *CLAIM* to file a claim
Type *MENU* to see all plans

Thank you for trusting Zororo Phumulani! 🛡️
```

---

### Scenario 7: Company Information

**User Action:**
```
INFO
```

**Expected Response:**
```
ℹ️ *About Zororo Phumulani Insurance*

Zororo Phumulani is Zimbabwe's trusted insurance provider, specializing in:

🛡️ Funeral & Repatriation
🌍 Worldwide Coverage
⚡ Accidental Death Protection

*Why Choose Us?*
✅ 15+ years of service
✅ Fast claims processing (24-48 hours)
✅ Affordable monthly premiums
✅ No hidden fees
✅ Family coverage options

📍 *Offices:*
Harare | Bulawayo | Mutare

🌐 *Website:* https://zororo-phumulani.com
📧 *Email:* info@zororo-phumulani.com
📱 *Hotline:* +263 771 234 567

Type *MENU* to see our plans.
```

---

### Scenario 8: Help Request

**User Action:**
```
HELP
```

**Expected Response:**
```
❓ *How can we help?*

*Common Commands:*
• *MENU* - View insurance plans
• *SUBSCRIBE* - Start enrollment
• *AGENT* - Speak with representative
• *INFO* - Company information
• *CLAIM* - File a claim

*Need urgent assistance?*
📱 Call: +263 771 234 567
📧 Email: support@zororo-phumulani.com

We're here to help! 🙏
```

---

### Scenario 9: Claims Process

**User Action:**
```
CLAIM
```

**Expected Response:**
```
📋 *File an Insurance Claim*

We're sorry for your loss. Our team will assist you through this difficult time.

*Claims Process:*
1️⃣ Provide policy number
2️⃣ Submit required documents
3️⃣ Verification (24 hours)
4️⃣ Payout (48 hours)

*Required Documents:*
• Death certificate
• Police report (if applicable)
• Policy number
• ID of beneficiary

📧 *Email documents to:*
claims@zororo-phumulani.com

📱 *Or call our 24/7 claims hotline:*
+263 771 234 567

Type *AGENT* to speak with claims officer.
```

---

### Scenario 10: Unknown Command

**User Action:**
```
random gibberish
```

**Expected Response:**
```
I didn't quite understand that. 🤔

*Try these commands:*
• *MENU* - View insurance plans
• *SUBSCRIBE* - Enroll now
• *AGENT* - Speak with representative
• *HELP* - Get support

Or simply type *HI* to start over.
```

---

## 🔍 Debug Testing

### Check Server Logs

When testing, watch terminal for:

**Successful message flow:**
```
📨 Incoming webhook data: {...}
📱 New message from: 263771234567
💬 Message: "Hi"
🤖 Processing message from 263771234567: "Hi"
📊 User state: initial
📤 Sending message to 263771234567...
💬 Message: "Welcome to *Zororo Phumulani Insurance*!..."
✅ Message sent successfully
📬 Message ID: wamid.xxxxx
✅ Reply sent to 263771234567
```

**Error indicators:**
```
❌ Failed to send message
❌ Error processing webhook
⚠️  Empty message body - skipping
```

---

## 🧪 API Testing (Manual)

### Test Webhook Verification

```bash
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=test123"
```

**Expected:** `test123`

### Test Health Check

```bash
curl http://localhost:3000/health
```

**Expected:**
```json
{
  "status": "ok",
  "service": "Zororo Phumulani WhatsApp Bot",
  "timestamp": "2026-02-01T10:30:00.000Z",
  "environment": "development"
}
```

### Test WhatsApp Send API

```bash
curl -X POST \
  'https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "messaging_product": "whatsapp",
    "to": "263771234567",
    "type": "text",
    "text": { "body": "Test message from API" }
  }'
```

---

## 📊 Test Coverage Checklist

### Core Functionality
- [ ] Welcome message displays
- [ ] Plan 1 (Funeral) shows details
- [ ] Plan 2 (Worldwide) shows details
- [ ] Plan 3 (Accidental) shows details
- [ ] Agent request shows contact info

### Onboarding Flow
- [ ] SUBSCRIBE initiates flow
- [ ] Name collection works
- [ ] ID collection works
- [ ] Payment instructions sent
- [ ] Payment confirmation works
- [ ] Policy number generated

### Information Requests
- [ ] INFO shows company details
- [ ] HELP shows command list
- [ ] CLAIM shows claims process
- [ ] MENU returns to main menu

### Error Handling
- [ ] Unknown commands get fallback response
- [ ] Empty messages are ignored
- [ ] Invalid inputs handled gracefully

### State Management
- [ ] User state persists during conversation
- [ ] Multiple users can interact simultaneously
- [ ] State resets after completion

---

## 🎯 Performance Testing

### Response Time
- Normal: < 2 seconds
- With payment: < 3 seconds

**Check terminal logs for timing:**
```
📤 Sending message to 263771234567...
✅ Message sent successfully  [Time: 1.2s]
```

### Concurrent Users

Test with multiple phones simultaneously:
- User 1: Start onboarding
- User 2: View plans
- User 3: Request agent

All should work independently.

---

## 🚨 Error Testing

### Test with expired ACCESS_TOKEN

1. Change ACCESS_TOKEN in .env to random value
2. Restart server
3. Send message
4. Expected: Error in logs but server doesn't crash

### Test with wrong PHONE_NUMBER_ID

1. Change PHONE_NUMBER_ID in .env
2. Restart server
3. Send message
4. Expected: 400 Bad Request error logged

### Test with server down

1. Stop server (Ctrl+C)
2. Send WhatsApp message
3. Restart server
4. Expected: Message is queued by Meta and delivered when server restarts

---

## ✅ Sign-off Checklist

Before showing to investors/stakeholders:

- [ ] All test scenarios pass
- [ ] No errors in terminal logs
- [ ] Responses are grammatically correct
- [ ] Prices are accurate
- [ ] Contact information is correct
- [ ] Payment instructions are clear
- [ ] Onboarding flow completes smoothly
- [ ] Unknown commands handled gracefully
- [ ] Server restarts without issues
- [ ] Webhook stays connected

---

## 📈 Test Metrics

Track these during testing:

| Metric | Target | Actual |
|--------|--------|--------|
| Response time | < 2s | - |
| Success rate | > 99% | - |
| Onboarding completion | > 80% | - |
| Agent requests | < 20% | - |
| Error rate | < 1% | - |

---

## 🎬 Demo Script

For presenting to investors:

**Scenario:** Customer discovers insurance via WhatsApp

1. **Greeting:**
   - "Hi" → Shows menu ✅

2. **Inquiry:**
   - "1" → Shows Funeral Cover details ✅
   - Explains benefits clearly ✅

3. **Decision:**
   - "SUBSCRIBE" → Starts enrollment ✅

4. **Quick Onboarding:**
   - Name: "John Doe" ✅
   - ID: "63-1234567-A-12" ✅

5. **Payment:**
   - Shows multiple options (EcoCash, Bank, Online) ✅
   - Clear instructions ✅

6. **Confirmation:**
   - "PAID ECO123456" → Policy activated ✅
   - Policy number generated ✅

**Total time:** ~3 minutes ⚡

**Result:** Customer is insured! 🎉

---

**Testing completed? You're ready to go live! 🚀**
