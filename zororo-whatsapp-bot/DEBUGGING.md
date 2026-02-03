# 🔍 WhatsApp Bot Debugging Guide

## Issue: Bot Not Responding to Messages

This guide will help you diagnose why your WhatsApp bot isn't responding.

---

## ✅ Step 1: Verify Render Deployment

### Check Render Dashboard

1. Go to: https://dashboard.render.com
2. Find your service: `zororo-whatsapp-bot`
3. Check status: Should be **"Live"** with green indicator
4. Click on service name

### View Logs

In Render dashboard:
- Click **"Logs"** tab
- You should see:
  ```
  🚀 ============================================
     ZORORO PHUMULANI WHATSAPP BOT STARTED
  ============================================
  📡 Server running on: http://localhost:10000
  ```

⚠️ **If you see errors here, the bot isn't starting properly!**

Common startup errors:
- `Cannot find module`: Run rebuild in Render
- `Missing credentials`: Check environment variables
- `Port already in use`: Restart service

---

## ✅ Step 2: Test Health Endpoint

### Check if Server is Responding

Open in browser:
```
https://your-app-name.onrender.com/health
```

**Expected response:**
```json
{
  "status": "ok",
  "service": "Zororo Phumulani WhatsApp Bot",
  "timestamp": "2026-02-03T10:30:00.000Z",
  "environment": "production",
  "config": {
    "hasAccessToken": true,
    "hasPhoneNumberId": true,
    "hasVerifyToken": true,
    "accessTokenPreview": "EAAxxxxxxxxxxxx...",
    "phoneNumberId": "123456789012345"
  }
}
```

### ⚠️ If You See False Values:

```json
{
  "hasAccessToken": false,  ← ❌ TOKEN NOT SET!
  "hasPhoneNumberId": false, ← ❌ PHONE ID NOT SET!
}
```

**Fix:** Add environment variables in Render:
1. Render Dashboard → Your Service
2. Click **"Environment"** tab
3. Add variables:
   - `ACCESS_TOKEN`
   - `PHONE_NUMBER_ID`
   - `VERIFY_TOKEN`
4. Click **"Save Changes"**
5. Service will auto-redeploy

---

## ✅ Step 3: Verify Webhook Configuration

### In Meta Dashboard

1. Go to: https://developers.facebook.com/apps
2. Select your app
3. Click **WhatsApp** → **Configuration**
4. Check **Webhooks** section:

**Callback URL should be:**
```
https://your-app-name.onrender.com/webhook
```

⚠️ **Common mistakes:**
- Missing `/webhook` at the end
- Using HTTP instead of HTTPS
- Wrong Render app name
- Old ngrok URL still there

**Verify Token should match:**
- The `VERIFY_TOKEN` in your Render environment variables
- Case-sensitive!

**Webhook Fields:**
- ✅ **messages** should be checked

### Test Webhook Verification

In Render logs, after configuring webhook, you should see:
```
📞 Webhook verification request received
Mode: subscribe
Token: your_verify_token
✅ Webhook verified successfully!
```

⚠️ **If you see:**
```
❌ Webhook verification failed - token mismatch
```

**Fix:**
1. Check `VERIFY_TOKEN` in Render matches Meta Dashboard
2. Click "Edit" on webhook in Meta
3. Re-enter verify token
4. Click "Verify and Save"

---

## ✅ Step 4: Check Access Token Status

### Test if Token is Valid

Run this curl command (replace YOUR_ACCESS_TOKEN):

```bash
curl "https://graph.facebook.com/v19.0/me?access_token=YOUR_ACCESS_TOKEN"
```

**Valid token response:**
```json
{
  "id": "123456789012345"
}
```

**Invalid token response:**
```json
{
  "error": {
    "message": "Invalid OAuth access token",
    "type": "OAuthException",
    "code": 190
  }
}
```

### ⚠️ If Token is Invalid:

**Reason:** Temporary tokens expire after 24 hours!

**Fix:** Generate permanent System User Token:

1. Go to: https://business.facebook.com/settings
2. Click **System Users** (left sidebar)
3. Click **Add** → Create system user
4. Name: `Zororo Bot`
5. Role: **Admin**
6. Click created user → **Generate New Token**
7. Select your app
8. Check permissions: ✅ **whatsapp_business_messaging**
9. Click **Generate Token**
10. Copy token (starts with `EAA...`)
11. **Update in Render:**
    - Render → Environment → Edit `ACCESS_TOKEN`
    - Paste new token
    - Save

---

## ✅ Step 5: Test Message Sending Manually

### Use Test Endpoint

I've added a test endpoint to your bot. Visit in browser:

```
https://your-app-name.onrender.com/test-send?to=YOUR_PHONE_NUMBER&message=Test
```

**Example:**
```
https://zororo-whatsapp-bot.onrender.com/test-send?to=263771234567&message=Hello
```

**Success response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "to": "263771234567",
  "result": { ... }
}
```

**Failure response:**
```json
{
  "success": false,
  "message": "Failed to send message"
}
```

### Check Render Logs

After running test, check logs for:

**✅ Success:**
```
🧪 TEST: Sending message to 263771234567
📤 Sending message to 263771234567...
💬 Message: "Hello"
✅ Message sent successfully
📬 Message ID: wamid.xxxxx
```

**❌ Failure:**
```
❌ Failed to send message
Status: 401
🔑 AUTHENTICATION ERROR:
   - Your ACCESS_TOKEN may be expired
```

---

## ✅ Step 6: Send Test Message from WhatsApp

### From Meta Test Number

1. Meta Dashboard → **WhatsApp** → **Getting Started**
2. Find "Send and receive messages" section
3. You'll see a test phone number (e.g., `+1 555-0100`)
4. **Add this number to your WhatsApp contacts first!**
5. Open WhatsApp and send:
   ```
   Hi
   ```

### Watch Render Logs Live

1. Render Dashboard → **Logs** tab
2. Keep logs open
3. Send WhatsApp message
4. Watch for:

**✅ Message Received:**
```
========================================
📨 INCOMING WEBHOOK REQUEST
========================================
Timestamp: 2026-02-03T10:30:00.000Z

📦 Full Payload:
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
========================================

✅ Sent acknowledgment to Meta

🔍 Parsing payload structure...
Entry exists? true
Changes exists? true
Value exists? true
Messages exists? true
Messages count: 1

📱 ===== NEW MESSAGE =====
From: 263771234567
Type: text
Message: "Hi"
ID: wamid.xxxxx
========================

🤖 Processing message through conversation handler...
📤 Sending reply...
✅ Message sent successfully
📬 Message ID: wamid.yyyyy
✅ Reply sent successfully to 263771234567
```

### ⚠️ If No Logs Appear When You Send Message:

**Problem:** Webhook isn't receiving messages from Meta

**Possible causes:**

1. **Webhook not subscribed:**
   - Meta Dashboard → Configuration → Webhooks
   - Ensure **messages** is checked ✅
   - Click **Save**

2. **Wrong callback URL:**
   - Should be: `https://your-app.onrender.com/webhook`
   - Not: `https://your-app.onrender.com` (missing /webhook)

3. **Render server is down:**
   - Check health endpoint: `/health`
   - Check Render status

4. **Webhook verification failed:**
   - Re-verify webhook in Meta Dashboard

---

## ✅ Step 7: Check Specific Error Patterns

### Error: "No messages found"

**Logs show:**
```
⚠️  Webhook received but no messages found
   This might be a status update (delivered, read, etc.)
📊 Status update received: [...]
```

**Not an error!** Meta sends status updates when:
- Message is delivered
- Message is read
- Typing indicator

**Your bot ignores these correctly.**

### Error: "Message type not supported"

**Logs show:**
```
⚠️  Message type "image" not supported yet
   Only text messages are handled currently
```

**Fix:** User sent image/voice/video. Bot tells them:
> "Sorry, I can only process text messages at the moment."

**To support more types:** See conversation.js (TODO comments)

### Error: "Failed to send message - Status 400"

**Logs show:**
```
❌ Failed to send message
Status: 400
⚠️  BAD REQUEST:
   - Check PHONE_NUMBER_ID is correct
```

**Fix:**
1. Verify `PHONE_NUMBER_ID` in Render environment variables
2. Get from: Meta Dashboard → WhatsApp → Getting Started
3. Should be long number (15 digits)
4. Update in Render → Save

### Error: "Failed to send message - Status 401"

**Logs show:**
```
❌ Failed to send message
Status: 401
🔑 AUTHENTICATION ERROR:
   - Your ACCESS_TOKEN may be expired
```

**Fix:** Generate permanent System User Token (see Step 4)

---

## ✅ Step 8: Verify Phone Number Format

### Correct Format:

```
263771234567
```

- ✅ Starts with country code (263 = Zimbabwe)
- ✅ No `+` sign
- ✅ No spaces
- ✅ No dashes
- ✅ No parentheses

### Wrong Formats:

```
+263 77 123 4567   ← Has + and spaces
+263771234567      ← Has +
077 123 4567       ← Missing country code
(263) 77-123-4567  ← Has special characters
```

---

## ✅ Step 9: Test Conversation Flow

Once messages are being received, test the flow:

### Test Commands:

1. **Welcome:**
   ```
   Hi
   ```
   Should show menu with 4 options

2. **Plan inquiry:**
   ```
   1
   ```
   Should show Funeral & Repatriation details

3. **Subscribe:**
   ```
   SUBSCRIBE
   ```
   Should ask for name

4. **Name:**
   ```
   John Doe
   ```
   Should ask for ID

5. **ID:**
   ```
   63-1234567-A-12
   ```
   Should show payment instructions

Check Render logs for each step:
```
🤖 Processing message from 263771234567: "Hi"
📊 User state: initial
📤 Sending message to 263771234567...
✅ Reply sent
```

---

## 🔧 Common Issues & Solutions

### Issue: Messages received but no reply sent

**Symptoms:**
- Logs show message received
- No reply sent
- No errors

**Debug:**
1. Check conversation.js is imported:
   ```javascript
   const { handleIncomingMessage } = require('./conversation');
   ```
2. Check if `handleIncomingMessage` returns a value
3. Add logging in conversation.js:
   ```javascript
   console.log('🎯 Reply generated:', reply);
   ```

### Issue: Render keeps spinning down (free tier)

**Symptoms:**
- First message after inactivity is slow
- Bot doesn't respond immediately

**Reason:** Free tier spins down after 15 min inactivity

**Solutions:**
1. **Upgrade to paid tier** ($7/month) - recommended
2. **Use cron job** to ping every 10 minutes:
   ```bash
   */10 * * * * curl https://your-app.onrender.com/health
   ```
3. **Use UptimeRobot** (free) to ping `/health` every 5 min

### Issue: "Error: connect ETIMEDOUT"

**Symptoms:**
```
Network error: connect ETIMEDOUT
```

**Reason:** Can't reach Meta API from Render

**Fix:**
1. Check Meta API status: https://developers.facebook.com/status
2. Verify firewall not blocking Render IPs
3. Try restarting Render service

---

## 📊 Debugging Checklist

Use this checklist to systematically debug:

- [ ] ✅ Render service is **Live** (green status)
- [ ] ✅ `/health` endpoint returns 200 OK
- [ ] ✅ `hasAccessToken: true` in health response
- [ ] ✅ `hasPhoneNumberId: true` in health response
- [ ] ✅ Webhook callback URL is correct in Meta
- [ ] ✅ Webhook callback URL ends with `/webhook`
- [ ] ✅ Webhook is using HTTPS (not HTTP)
- [ ] ✅ Verify token matches in Render and Meta
- [ ] ✅ "messages" is checked in webhook subscriptions
- [ ] ✅ Webhook verification succeeded in logs
- [ ] ✅ ACCESS_TOKEN is permanent (System User Token)
- [ ] ✅ Test number added to WhatsApp contacts
- [ ] ✅ Messages appear in Render logs when sent
- [ ] ✅ Phone number format is correct (no +)
- [ ] ✅ `/test-send` endpoint works
- [ ] ✅ No 401 errors in logs
- [ ] ✅ No 400 errors in logs

---

## 🆘 Still Not Working?

### Collect Debug Information:

1. **Health endpoint response:**
   ```
   https://your-app.onrender.com/health
   ```

2. **Render logs** (last 100 lines):
   - Render Dashboard → Logs → Copy

3. **Test send result:**
   ```
   https://your-app.onrender.com/test-send?to=YOUR_PHONE&message=Test
   ```

4. **Webhook configuration:**
   - Screenshot from Meta Dashboard → Webhooks

5. **Environment variables:**
   - Render → Environment (don't share actual tokens!)
   - Just confirm they're set

### Send to Support:

Email: dev@afremit.com

Include:
- Health endpoint response
- Render logs
- Test send result
- Description of issue
- When it stopped working (if it worked before)

---

## ✅ Success Indicators

You'll know it's working when:

1. **Health check shows:**
   ```json
   {
     "status": "ok",
     "hasAccessToken": true,
     "hasPhoneNumberId": true
   }
   ```

2. **Logs show message flow:**
   ```
   📨 INCOMING WEBHOOK REQUEST
   📱 NEW MESSAGE
   🤖 Processing message
   📤 Sending reply
   ✅ Reply sent successfully
   ```

3. **WhatsApp receives reply:**
   - You send "Hi"
   - Bot replies with insurance menu
   - Within 2-3 seconds

---

## 📚 Additional Resources

- **Meta WhatsApp Docs:** https://developers.facebook.com/docs/whatsapp
- **Render Docs:** https://render.com/docs
- **Project README:** See README.md
- **Testing Guide:** See TESTING.md
- **Deployment Guide:** See DEPLOYMENT.md

---

**🔧 Remember:** Most issues are either:
1. Expired/invalid ACCESS_TOKEN (80% of issues)
2. Wrong webhook configuration (15% of issues)
3. Missing environment variables (5% of issues)

Check these three first! 🎯
