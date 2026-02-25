# 🤖 Zororo Phumulani Insurance - WhatsApp Bot

> **📚 For complete documentation, see [../COMPREHENSIVE_DOCUMENTATION.md](../COMPREHENSIVE_DOCUMENTATION.md#whatsapp-bot-zororo-phumulani)**

Automated insurance onboarding bot using **WhatsApp Business Cloud API** (Meta).

**Features:**
- ✅ Insurance plan inquiries (Funeral & Repatriation, Worldwide Funeral, Accidental Death)
- ✅ Customer onboarding flow (name, ID, payment)
- ✅ Payment link distribution
- ✅ Agent handoff

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Meta credentials

# Start development server
npm run dev  # Runs on http://localhost:3001
```

---

## ⚙️ Configuration

### 1. Get Meta Credentials

1. Go to https://developers.facebook.com/
2. Create app → Enable WhatsApp
3. Get:
   - **Phone Number ID** (from WhatsApp → API Setup)
   - **Access Token** (temporary or System User token)

### 2. Create `.env` File

```env
PORT=3001
WHATSAPP_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
VERIFY_TOKEN=my_webhook_verify_token_123
WEBHOOK_URL=https://your-domain.com/webhook
```

---

## 🧪 Local Testing

### 1. Start Server
```bash
npm run dev
```

### 2. Expose with ngrok
```bash
ngrok http 3001
# Copy HTTPS URL: https://abc123.ngrok.io
```

### 3. Configure Meta Webhook

**Meta Dashboard → WhatsApp → Configuration → Webhook:**
- **Callback URL**: `https://abc123.ngrok.io/webhook`
- **Verify Token**: `my_webhook_verify_token_123` (from .env)
- **Subscribe**: ✅ `messages`

### 4. Test

Send message to your Meta test number:
```
User: Hi
Bot: Welcome to Zororo Phumulani Insurance! Choose:
     1️⃣ Funeral & Repatriation
     2️⃣ Worldwide Funeral
     3️⃣ Accidental Death
     4️⃣ Speak to Agent
```

---

## 📁 Project Structure

```
zororo-whatsapp-bot/
├── src/
│   ├── index.js          # Express server & webhook handler
│   ├── whatsapp.js       # Meta API functions
│   └── conversation.js   # Bot logic & state management
├── .env                  # Your credentials (DO NOT COMMIT)
├── .env.example          # Template
├── package.json          # Dependencies
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

---

## 🚀 Deployment (Vercel)

```bash
# Deploy
vercel --prod

# Copy Vercel URL and update Meta webhook:
# https://your-project.vercel.app/webhook
```

**Environment Variables** (add in Vercel dashboard):
- `WHATSAPP_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `VERIFY_TOKEN`

---

## 💬 Conversation Flow

```
1. Greeting
   └─> Insurance plan selection (1-4)
       
2. Plan Selected
   └─> Ask for full name
       
3. Name Provided
   └─> Ask for ID number
       
4. ID Provided
   └─> Send payment link
       └─> Wait for CONFIRM
       
5. CONFIRM Received
   └─> Application submitted
       └─> Agent will contact
```

---

## 🛠️ API Endpoints

### `GET /webhook`
- **Purpose**: Webhook verification (Meta handshake)
- **Called by**: Meta (setup only)

### `POST /webhook`
- **Purpose**: Receive incoming messages
- **Called by**: Meta (every message)

### Health Check
```bash
curl https://your-url.vercel.app/
# Response: { status: "Bot running", timestamp: "..." }
```

---

## 🐛 Troubleshooting

### Webhook Verification Failed
- ✅ Check `VERIFY_TOKEN` matches in .env and Meta dashboard
- ✅ URL must be HTTPS (not HTTP)
- ✅ Include `/webhook` at end of URL

### Not Receiving Messages
- ✅ Server running (`npm run dev`)
- ✅ ngrok/Vercel running
- ✅ Webhook subscribed to `messages`
- ✅ Check server logs for errors

### Can't Send Messages
- ✅ Valid `WHATSAPP_TOKEN` (not expired)
- ✅ Correct `PHONE_NUMBER_ID`
- ✅ Recipient opted-in (24hr window)

**Test with curl:**
```bash
curl -X POST \
  'https://graph.facebook.com/v19.0/YOUR_PHONE_ID/messages' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "messaging_product": "whatsapp",
    "to": "263771234567",
    "type": "text",
    "text": { "body": "Test" }
  }'
```

---

## 📚 Full Documentation

For complete guides on:
- ✅ **Detailed setup** → [COMPREHENSIVE_DOCUMENTATION.md](../COMPREHENSIVE_DOCUMENTATION.md)
- ✅ **Testing procedures** → Testing Guide section
- ✅ **Deployment options** → Deployment section
- ✅ **Troubleshooting** → Troubleshooting section

---

## 📊 Production Roadmap

### Phase 1 ✅
- [x] Webhook setup
- [x] Message receive/send
- [x] Basic conversation flow
- [x] Plan inquiry
- [x] Onboarding (name, ID)

### Phase 2 🚧
- [ ] MongoDB integration
- [ ] Session persistence
- [ ] Payment gateway (EcoCash/Paynow)
- [ ] Policy PDF generation

### Phase 3
- [ ] AI-powered NLP
- [ ] Multilingual (Shona, Ndebele)
- [ ] Admin dashboard
- [ ] Analytics & reporting

---

## 📄 License

Proprietary - Afremit Platform

---

## 📞 Support

- **Email**: support@afremit.com
- **Documentation**: [COMPREHENSIVE_DOCUMENTATION.md](../COMPREHENSIVE_DOCUMENTATION.md)

---

**Built with ❤️ for financial inclusion in Zimbabwe** 🇿🇼

---

## ✅ Prerequisites

**Before starting:**
1. Node.js 18+ installed
2. Meta Developer Account (https://developers.facebook.com/)
3. WhatsApp Business Account (get test number from Meta)
4. ngrok for local testing (`npm install -g ngrok`)

---
