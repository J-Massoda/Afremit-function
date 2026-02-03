# 🚀 Production Deployment Guide

Deploy Zororo Phumulani WhatsApp Bot to production servers.

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests passing (see TESTING.md)
- [ ] Environment variables configured
- [ ] System User Token obtained (permanent access token)
- [ ] Payment gateway credentials ready
- [ ] Database provisioned (MongoDB/PostgreSQL)
- [ ] Domain name configured (optional)
- [ ] SSL certificate ready (handled by platform usually)

---

## 🌐 Deployment Options

### Option 1: Render.com (Recommended for MVP) ⭐

**Pros:**
- ✅ Free tier available
- ✅ Auto-deployment from Git
- ✅ Built-in SSL
- ✅ Easy environment variables
- ✅ No credit card required

**Cons:**
- ⚠️ Free tier spins down after inactivity
- ⚠️ Limited to 512MB RAM

#### Step-by-Step Render Deployment

**1. Prepare Repository:**
```bash
cd zororo-whatsapp-bot

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - Zororo WhatsApp Bot"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/zororo-whatsapp-bot.git
git branch -M main
git push -u origin main
```

**2. Create Render Account:**
- Go to: https://render.com
- Sign up (free)
- Connect GitHub account

**3. Create Web Service:**
- Click **"New +"** → **"Web Service"**
- Select repository: `zororo-whatsapp-bot`
- Name: `zororo-whatsapp-bot`
- Region: Choose closest to Zimbabwe (e.g., Frankfurt/London)
- Branch: `main`
- Runtime: **Node**
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: **Free**

**4. Add Environment Variables:**

Click **"Advanced"** → **"Add Environment Variable"**

```
ACCESS_TOKEN = EAAqwABFuR68BQvVvmKkvezeBeYUieEblNeHmT2Cm7qfsaiLkEMPt4RW70TbRWzBa4Ca0bioUJF46yDJavK9pmd5SaGsJZCADjP9XQsDZCMMsMsZBKu7rW9V5EVQ11nnXIRbZAf3GaOPLoIThuS5XuZAhhVle2gd27L5JYv87WAJ7MVIZCoziZAoT9DDcc2BhA9MBkePbyccVCH5ATNoqxzwkgZCMNjq9nKAJW0c9ruVtisghrBd4YHq3DQGaixq4WaaAD2PtSC2bvRDO08QsrZCqqu1ZAcXS3e1fTEhAZDZD
PHONE_NUMBER_ID = 1033642026488027
VERIFY_TOKEN = ZORORO_VERIFY_TOKEN
PORT = 3000
NODE_ENV = development
```

⚠️ **Important:** Use **System User Token** not temporary token!

**5. Deploy:**
- Click **"Create Web Service"**
- Wait 2-3 minutes for build
- You'll get URL like: `https://zororo-whatsapp-bot-1.onrender.com`

**6. Update Meta Webhook:**
- Go to Meta Dashboard → WhatsApp → Configuration → Webhooks
- Update Callback URL to: `https://zororo-whatsapp-bot-1.onrender.com/webhook`
- Verify and save

✅ **You're live!**

---

### Option 2: AWS EC2 (For scaling) 🚀

**Pros:**
- ✅ Full control
- ✅ Scalable
- ✅ Reliable
- ✅ Good for high traffic

**Cons:**
- ⚠️ Requires more setup
- ⚠️ Monthly costs (~$5-20)
- ⚠️ Need to manage server

#### AWS EC2 Deployment

**1. Launch EC2 Instance:**
- Go to AWS Console → EC2
- Launch Instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t2.micro (free tier) or t2.small
- Security Group:
  - Allow HTTP (80)
  - Allow HTTPS (443)
  - Allow SSH (22) from your IP only
- Launch with key pair (.pem file)

**2. Connect to Server:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip-address
```

**3. Install Node.js:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

**4. Clone Repository:**
```bash
# Install git
sudo apt install git -y

# Clone repo
git clone https://github.com/YOUR_USERNAME/zororo-whatsapp-bot.git
cd zororo-whatsapp-bot

# Install dependencies
npm install --production
```

**5. Configure Environment:**
```bash
# Create .env file
nano .env
```

Paste:
```env
ACCESS_TOKEN=YOUR_PERMANENT_SYSTEM_USER_TOKEN
PHONE_NUMBER_ID=YOUR_PHONE_NUMBER_ID
VERIFY_TOKEN=YOUR_SECRET_VERIFY_TOKEN
PORT=3000
NODE_ENV=production
```

Save: `Ctrl+X`, `Y`, `Enter`

**6. Install Process Manager (PM2):**
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start src/index.js --name zororo-bot

# Auto-restart on reboot
pm2 startup
pm2 save

# Check status
pm2 status
```

**7. Setup Nginx Reverse Proxy:**
```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/zororo-bot
```

Paste:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Or use IP address

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/zororo-bot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**8. Setup SSL (Let's Encrypt):**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate (if you have domain)
sudo certbot --nginx -d your-domain.com

# Or for IP address, use Cloudflare/manual cert
```

**9. Update Meta Webhook:**
- URL: `https://your-domain.com/webhook`
- Or: `http://your-ec2-ip/webhook` (⚠️ HTTPS preferred)

✅ **Production ready!**

**Maintenance Commands:**
```bash
# View logs
pm2 logs zororo-bot

# Restart
pm2 restart zororo-bot

# Stop
pm2 stop zororo-bot

# Update code
cd zororo-whatsapp-bot
git pull
npm install
pm2 restart zororo-bot
```

---

### Option 3: Vercel (Serverless) ⚡

**Pros:**
- ✅ Free tier generous
- ✅ Auto-scaling
- ✅ Instant deployments
- ✅ Built-in CDN

**Cons:**
- ⚠️ Serverless (10-second timeout)
- ⚠️ Cold starts possible

#### Vercel Deployment

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Create vercel.json:**
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
      "dest": "src/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**3. Deploy:**
```bash
cd zororo-whatsapp-bot
vercel
```

Follow prompts:
- Set up project? **Y**
- Link to existing? **N**
- Project name: `zororo-whatsapp-bot`
- Directory: `.`
- Override settings? **N**

**4. Add Environment Variables:**
```bash
vercel env add ACCESS_TOKEN
vercel env add PHONE_NUMBER_ID
vercel env add VERIFY_TOKEN
```

**5. Deploy to production:**
```bash
vercel --prod
```

You'll get URL: `https://zororo-whatsapp-bot.vercel.app`

✅ **Live on Vercel!**

---

### Option 4: Heroku 💜

**Note:** Heroku removed free tier in 2022. Minimum $7/month.

**Quick Deploy:**

**1. Install Heroku CLI:**
```bash
# Windows
choco install heroku-cli

# Mac
brew install heroku/brew/heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

**2. Create Procfile:**
```bash
echo "web: node src/index.js" > Procfile
```

**3. Deploy:**
```bash
heroku login
heroku create zororo-whatsapp-bot
git push heroku main

# Set environment variables
heroku config:set ACCESS_TOKEN=your_token
heroku config:set PHONE_NUMBER_ID=your_id
heroku config:set VERIFY_TOKEN=your_verify_token
```

**4. Scale up:**
```bash
heroku ps:scale web=1
```

URL: `https://zororo-whatsapp-bot.herokuapp.com`

---

## 🔐 Get Permanent Access Token

⚠️ **Important:** Temporary tokens expire after 24 hours!

### Generate System User Token (Never Expires)

**1. Go to Meta Business Settings:**
- https://business.facebook.com/settings
- Select your business

**2. Create System User:**
- Click **"System Users"** (left sidebar)
- Click **"Add"**
- Name: `Zororo Bot System User`
- Role: **Admin**

**3. Generate Token:**
- Click on created user → **"Generate New Token"**
- Select your app
- Permissions: Check ✅ **whatsapp_business_messaging**
- Click **"Generate Token"**
- Copy token (starts with `EAA...`)
- ⚠️ Save securely! Won't show again

**4. Update .env:**
```env
ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxx  # Permanent token
```

**5. Restart server:**
```bash
# If using PM2
pm2 restart zororo-bot

# If using Render/Vercel
# Just push to git, auto-deploys
```

✅ **Token never expires!**

---

## 💾 Add Database (Production)

### MongoDB Atlas (Recommended)

**1. Create Account:**
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up (free tier: 512MB)

**2. Create Cluster:**
- Choose **"Shared"** (free)
- Region: Closest to your server
- Cluster name: `zororo-bot`

**3. Create Database User:**
- Security → Database Access
- Add user: `zororo_bot`
- Password: Generate strong password
- Role: **Read and write to any database**

**4. Whitelist IP:**
- Security → Network Access
- Add IP: `0.0.0.0/0` (all IPs)
- ⚠️ Or specific server IP for security

**5. Get Connection String:**
- Databases → Connect → Connect your application
- Copy connection string:
```
mongodb+srv://zororo_bot:<password>@cluster0.xxxxx.mongodb.net/zororo?retryWrites=true&w=majority
```

**6. Add to Environment:**
```env
DATABASE_URL=mongodb+srv://zororo_bot:your_password@cluster0.xxxxx.mongodb.net/zororo
```

**7. Install MongoDB driver:**
```bash
npm install mongodb mongoose
```

**8. Update conversation.js to use database** (see code at end of guide)

---

## 📊 Monitoring & Logging

### Add Logging Service

**Option 1: Sentry (Error Tracking)**

**1. Sign up:** https://sentry.io (free tier)

**2. Install:**
```bash
npm install @sentry/node
```

**3. Add to src/index.js:**
```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Use Sentry for error tracking
app.use(Sentry.Handlers.errorHandler());
```

**Option 2: Winston (File Logging)**

```bash
npm install winston
```

Create `src/logger.js`:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

---

## 🔔 Uptime Monitoring

### UptimeRobot (Free)

**1. Sign up:** https://uptimerobot.com

**2. Add Monitor:**
- Type: **HTTP(S)**
- URL: `https://your-domain.com/health`
- Interval: **5 minutes**
- Alert: Email when down

**3. Get alerts:**
- Add email/SMS notification
- Know instantly if bot goes down

---

## 🚦 Health Check Endpoint

Already included in `src/index.js`:

```
GET /health
```

Returns:
```json
{
  "status": "ok",
  "service": "Zororo Phumulani WhatsApp Bot",
  "timestamp": "2026-02-01T10:30:00.000Z",
  "environment": "production"
}
```

Monitor this endpoint!

---

## 📈 Scaling Considerations

### When to scale:

- **> 100 messages/day:** Stay on free tier (Render/Vercel)
- **> 1000 messages/day:** Upgrade to paid tier ($7-20/month)
- **> 10,000 messages/day:** AWS/GCP with load balancer
- **> 100,000 messages/day:** Kubernetes cluster

### Optimization tips:

1. **Add Redis caching:**
```bash
npm install redis
```

2. **Add message queue (Bull.js):**
```bash
npm install bull
```

3. **Enable connection pooling for database**

4. **Use CDN for media files (images, PDFs)**

---

## ✅ Post-Deployment Checklist

After deploying:

- [ ] Webhook URL updated in Meta Dashboard
- [ ] Webhook verification passes
- [ ] Test message sent and received
- [ ] All test scenarios pass (see TESTING.md)
- [ ] Environment variables secured
- [ ] System User Token (permanent) configured
- [ ] SSL certificate active (HTTPS)
- [ ] Health endpoint accessible
- [ ] Uptime monitoring configured
- [ ] Error logging active (Sentry/Winston)
- [ ] Database connected (if applicable)
- [ ] Backup strategy in place
- [ ] Documentation updated with production URL

---

## 🔧 Troubleshooting Production

### Bot not responding

**Check:**
```bash
# If on EC2/VPS
pm2 logs zororo-bot

# Check health endpoint
curl https://your-domain.com/health

# Check webhook connectivity
curl https://your-domain.com/webhook
```

### High latency

**Solutions:**
- Add Redis caching
- Upgrade server instance
- Use CDN for static content
- Enable HTTP/2
- Compress responses

### Database connection issues

**Check:**
```bash
# Test MongoDB connection
mongosh "mongodb+srv://your-connection-string"

# Check firewall rules
# Ensure server IP whitelisted in MongoDB Atlas
```

---

## 📞 Production Support

**Emergency contacts:**
- Server issues: Check provider status page
- WhatsApp API: Meta Support (https://developers.facebook.com/support/)
- Database: MongoDB Support
- Payment gateway: Provider support

**Monitoring dashboards:**
- Server: Provider dashboard (Render/AWS/etc.)
- WhatsApp: Meta Business Dashboard
- Errors: Sentry dashboard
- Uptime: UptimeRobot dashboard

---

**🎉 Congratulations! Your bot is live in production!**

**Production URL:** `https://your-domain.com`
**Webhook:** `https://your-domain.com/webhook`
**Health Check:** `https://your-domain.com/health`

---

**Next:** Integrate payment gateway, add database, improve conversation flow! 🚀
