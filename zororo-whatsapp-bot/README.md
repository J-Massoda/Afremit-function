# 🤖 Zororo Phumulani Insurance - WhatsApp Bot

Automated insurance onboarding bot using **WhatsApp Business Cloud API** (Meta).

This bot automates:
- Insurance plan inquiries (Funeral & Repatriation, Worldwide Funeral, Accidental Death)
- Customer onboarding flow (name, ID, payment)
- Payment link distribution
- Agent handoff

---

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Testing Locally](#testing-locally)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before starting, ensure you have:

1. **Node.js** installed (v16+ recommended)
   ```bash
   node --version
   ```

2. **Meta Developer Account**
   - Go to: https://developers.facebook.com/
   - Create an app
   - Enable WhatsApp product

3. **WhatsApp Business Account**
   - You'll get a test phone number from Meta
   - For production, verify your business

4. **ngrok** (for local testing)
   ```bash
   npm install -g ngrok
   # or
   choco install ngrok  # Windows
   brew install ngrok   # Mac
   ```

---

## 📦 Installation

### Step 1: Install Dependencies

Navigate to the project directory and run:

```bash
cd zororo-whatsapp-bot

# Initialize npm (if package.json doesn't exist)
npm init -y

# Install all dependencies
npm install express axios body-parser dotenv

# Install dev dependency
npm install --save-dev nodemon
```

**What each package does:**
- `express` - Web server framework
- `axios` - HTTP client for Meta API calls
- `body-parser` - Parse incoming JSON from webhooks
- `dotenv` - Load environment variables from .env file
- `nodemon` - Auto-restart server on code changes (dev only)

### Step 2: Verify Installation

```bash
npm list
```

You should see all packages installed without errors.

---

## ⚙️ Configuration

### Step 1: Create Environment File

Copy the example file:

```bash
cp .env.example .env
```

### Step 2: Get Meta WhatsApp Credentials

1. **Go to Meta Dashboard:**
   - https://developers.facebook.com/apps
   - Select your app → **WhatsApp** → **Getting Started**

2. **Copy Access Token:**
   - Look for "Temporary access token" (valid 24 hours for testing)
   - Paste into `.env` as `ACCESS_TOKEN`
   - ⚠️ For production, generate System User Token (never expires)

3. **Copy Phone Number ID:**
   - Look for "Phone number ID" (NOT your actual phone number)
   - It's a long number like: `123456789012345`
   - Paste into `.env` as `PHONE_NUMBER_ID`

4. **Create Verify Token:**
   - This is YOUR secret - create any random string
   - Example: `my_secret_verify_token_12345`
   - Paste into `.env` as `VERIFY_TOKEN`

### Step 3: Fill in .env File

Your `.env` should look like:

```env
ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PHONE_NUMBER_ID=123456789012345
VERIFY_TOKEN=my_secret_verify_token_12345
PORT=3000
NODE_ENV=development
```

---

## 🧪 Testing Locally

### Step 1: Start the Server

```bash
npm run dev
```

You should see:
```
🚀 ============================================
   ZORORO PHUMULANI WHATSAPP BOT STARTED
============================================
📡 Server running on: http://localhost:3000
```

### Step 2: Expose Server with ngrok

In a **new terminal window**:

```bash
ngrok http 3000
```

You'll see output like:
```
Forwarding   https://a1b2-xx-xxx-xxx-xx.ngrok-free.app -> http://localhost:3000
```

**Copy the HTTPS URL** (e.g., `https://a1b2-xx-xxx-xxx-xx.ngrok-free.app`)

⚠️ **IMPORTANT:** Use HTTPS, not HTTP

### Step 3: Configure Webhook in Meta Dashboard

1. Go to: **WhatsApp → Configuration → Webhooks**

2. Click **Edit** next to "Callback URL"

3. **Callback URL:**
   ```
   https://a1b2-xx-xxx-xxx-xx.ngrok-free.app/webhook
   ```
   ⚠️ Don't forget `/webhook` at the end!

4. **Verify Token:**
   - Paste the VERIFY_TOKEN from your `.env` file
   - Example: `my_secret_verify_token_12345`

5. Click **Verify and Save**

6. **Subscribe to Webhooks:**
   - Check ✅ **messages**
   - Click **Save**

### Step 4: Send Test Message

1. In Meta Dashboard → **WhatsApp → Getting Started**

2. Look for "Send and receive messages" section

3. You'll see a test phone number (e.g., `+1 555-0100`)

4. Open WhatsApp on your phone and send a message to that number:
   ```
   Hi
   ```

5. **Check your terminal** - you should see:
   ```
   📨 Incoming webhook data: {...}
   📱 New message from: 263771234567
   💬 Message: "Hi"
   ```

6. You should receive a reply with the insurance menu! 🎉

---

## 🚀 Deployment

### Option 1: Render (Free Tier)

1. Push code to GitHub

2. Go to: https://render.com

3. Click **New → Web Service**

4. Connect GitHub repo

5. **Settings:**
   - Name: `zororo-whatsapp-bot`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

6. **Environment Variables:**
   - Add all variables from `.env` file

7. Click **Create Web Service**

8. Copy your Render URL (e.g., `https://zororo-whatsapp-bot.onrender.com`)

9. Update Meta webhook to use Render URL:
   ```
   https://zororo-whatsapp-bot.onrender.com/webhook
   ```

### Option 2: AWS EC2

```bash
# SSH into server
ssh -i your-key.pem ubuntu@your-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/your-repo/zororo-whatsapp-bot.git
cd zororo-whatsapp-bot

# Install dependencies
npm install

# Install PM2 (process manager)
sudo npm install -g pm2

# Create .env file
nano .env
# (paste your production credentials)

# Start server
pm2 start src/index.js --name zororo-bot

# Auto-start on reboot
pm2 startup
pm2 save
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables via Vercel dashboard
```

---

## 📁 Project Structure

```
zororo-whatsapp-bot/
│
├── src/
│   ├── index.js          # Main Express server & webhook endpoints
│   ├── whatsapp.js       # WhatsApp API helper (send messages)
│   └── conversation.js   # Bot logic & conversation flow
│
├── .env                  # Your credentials (DO NOT COMMIT)
├── .env.example          # Template with placeholders
├── package.json          # Dependencies & scripts
└── README.md             # This file
```

---

## 📚 API Documentation

### Webhook Endpoints

#### GET /webhook
- **Purpose:** Webhook verification (Meta handshake)
- **Called by:** Meta (one-time during setup)
- **Response:** Echo back the challenge parameter

#### POST /webhook
- **Purpose:** Receive incoming WhatsApp messages
- **Called by:** Meta (every time user sends message)
- **Payload Example:**
  ```json
  {
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "263771234567",
            "text": { "body": "Hi" }
          }]
        }
      }]
    }]
  }
  ```

### WhatsApp Send API

```javascript
// Send text message
await sendMessage("263771234567", "Hello from Zororo Phumulani!");
```

**API Endpoint Used:**
```
POST https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json

{
  "messaging_product": "whatsapp",
  "to": "263771234567",
  "type": "text",
  "text": { "body": "Hello!" }
}
```

---

## 🛠️ Troubleshooting

### Issue: "Webhook verification failed"

**Cause:** VERIFY_TOKEN mismatch

**Solution:**
1. Check `.env` file - copy VERIFY_TOKEN value
2. Paste EXACT same value in Meta Dashboard → Webhooks
3. Try verification again

### Issue: "Access token expired"

**Cause:** Temporary tokens expire after 24 hours

**Solution:**
1. Go to Meta Dashboard → WhatsApp → Getting Started
2. Copy new "Temporary access token"
3. Update `ACCESS_TOKEN` in `.env`
4. Restart server: `npm run dev`

**Long-term fix:**
- Generate System User Token (never expires)
- Meta Dashboard → Business Settings → System Users

### Issue: "Not receiving messages"

**Checklist:**
- ✅ Server is running (`npm run dev`)
- ✅ ngrok is running (`ngrok http 3000`)
- ✅ Webhook URL is HTTPS (not HTTP)
- ✅ Webhook subscribed to "messages" event
- ✅ ACCESS_TOKEN is valid

**Debug:**
```bash
# Check server logs
npm run dev

# Check if webhook is reachable
curl https://your-ngrok-url.ngrok.io/webhook
```

### Issue: "Cannot send messages"

**Common causes:**
1. Invalid ACCESS_TOKEN
2. Wrong PHONE_NUMBER_ID
3. Recipient not opted-in (first 24 hours)

**Test with curl:**
```bash
curl -X POST \
  'https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "messaging_product": "whatsapp",
    "to": "263771234567",
    "type": "text",
    "text": { "body": "Test message" }
  }'
```

---

## 🎯 Next Steps / Roadmap

### MVP Completed ✅
- [x] Webhook verification
- [x] Receive messages
- [x] Send replies
- [x] Basic conversation flow
- [x] Plan inquiry
- [x] Onboarding flow (name, ID)

### Production Enhancements 🚧

#### Phase 1: Data Persistence
- [ ] Add MongoDB for user data
- [ ] Save onboarding progress
- [ ] Session management

#### Phase 2: Payment Integration
- [ ] EcoCash API integration
- [ ] Paynow Zimbabwe integration
- [ ] Payment verification webhooks
- [ ] Generate payment links

#### Phase 3: Rich Content
- [ ] Send policy PDF documents
- [ ] Interactive button messages
- [ ] Image/video support

#### Phase 4: Advanced Features
- [ ] AI-powered responses (NLP)
- [ ] Multilingual support (Shona, Ndebele)
- [ ] Admin dashboard
- [ ] Analytics & reporting

#### Phase 5: Compliance
- [ ] GDPR/POPIA compliance
- [ ] Data encryption
- [ ] Audit logging

---

## 📞 Support

Need help? Contact:
- **Email:** dev@afremit.com
- **WhatsApp:** +263 771 234 567
- **GitHub Issues:** [Create an issue](https://github.com/your-repo/issues)

---

## 📄 License

ISC License - Afremit Platform

---

## 🙏 Acknowledgments

- Meta WhatsApp Business API Documentation
- Zororo Phumulani Insurance Team
- Afremit Development Team

---

**Built with ❤️ for financial inclusion in Zimbabwe** 🇿🇼
