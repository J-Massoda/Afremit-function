/**
 * ==============================================================================
 * ZORORO PHUMULANI INSURANCE - CONVERSATION HANDLER
 * ==============================================================================
 * 
 * This module manages the conversational flow for insurance inquiries and onboarding
 * 
 * Flow:
 * 1. User says "Hi" → Show insurance plan menu
 * 2. User selects plan (1, 2, 3) → Show plan details
 * 3. User types "SUBSCRIBE" → Begin onboarding
 * 4. Collect: Name → ID/Passport → Payment
 * 
 * ==============================================================================
 */

// ==============================================================================
// IN-MEMORY USER STATE (for MVP testing)
// ==============================================================================
/**
 * Stores user conversation state temporarily
 * 
 * Structure:
 * {
 *   "263771234567": {
 *     step: "awaiting_name",  // Current onboarding step
 *     name: "John Doe",        // Collected data
 *     idNumber: "123456",
 *     selectedPlan: "funeral"
 *   }
 * }
 * 
 * ⚠️  WARNING: This is wiped on server restart
 * TODO: Replace with database (MongoDB/PostgreSQL) for production
 */
const userSessions = {};

/**
 * ==============================================================================
 * INSURANCE PLAN DETAILS
 * ==============================================================================
 */
const PLANS = {
  funeral: {
    name: 'Funeral & Repatriation Cover',
    description: `
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
    `.trim(),
    price: { individual: 10, family: 30 }
  },
  
  worldwide: {
    name: 'Worldwide Funeral Cover',
    description: `
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
    `.trim(),
    price: { individual: 25, family: 75 }
  },
  
  accidental: {
    name: 'Accidental Death Cover',
    description: `
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
    `.trim(),
    price: { basic: 15, standard: 35, premium: 65 }
  }
};

/**
 * ==============================================================================
 * MAIN CONVERSATION HANDLER
 * ==============================================================================
 * 
 * Processes incoming messages and returns appropriate response
 * 
 * @param {string} from - User's WhatsApp number (e.g., "263771234567")
 * @param {string} message - User's message text
 * @returns {Promise<string>} - Response message to send back
 */
async function handleIncomingMessage(from, message) {
  const userMessage = message.trim().toLowerCase();
  
  console.log(`\n🤖 Processing message from ${from}: "${message}"`);

  // Get user's current session state (or create new one)
  if (!userSessions[from]) {
    userSessions[from] = { step: 'initial' };
  }
  
  const session = userSessions[from];
  console.log(`📊 User state: ${session.step}`);

  // ==============================================================================
  // ONBOARDING FLOW (multi-step data collection)
  // ==============================================================================
  
  // Step 1: Collecting full name
  if (session.step === 'awaiting_name') {
    session.name = message.trim();
    session.step = 'awaiting_id';
    console.log(`✅ Name collected: ${session.name}`);
    
    return `Thank you, ${session.name}! 👤

Now, please provide your *ID or Passport Number* for verification.

Example: 
• ID: 63-1234567-A-12
• Passport: AB123456`;
  }
  
  // Step 2: Collecting ID/Passport number
  if (session.step === 'awaiting_id') {
    session.idNumber = message.trim();
    session.step = 'payment_pending';
    console.log(`✅ ID collected: ${session.idNumber}`);
    
    // TODO: Validate ID format (Zimbabwe ID: XX-XXXXXXX-X-XX)
    // TODO: Store data in database
    
    return `Perfect! Your details are confirmed. ✅

*Enrollment Summary:*
👤 Name: ${session.name}
🆔 ID: ${session.idNumber}
📋 Plan: ${session.selectedPlan || 'Funeral & Repatriation'}

*Next Step: Payment*

💳 *Payment Options:*

1️⃣ *EcoCash:*
   • Send to: 0771234567
   • Amount: $10
   • Reference: ${session.idNumber}

2️⃣ *Bank Transfer:*
   • Bank: CBZ
   • Account: 12345678
   • Reference: ${session.idNumber}

3️⃣ *Online Payment:*
   🔗 https://zororo-phumulani.com/pay/${session.idNumber}

After payment, reply with:
*PAID [transaction reference]*

Example: PAID ECO123456789

Need help? Type *AGENT* to speak with a representative.`;
  }
  
  // Payment confirmation
  if (session.step === 'payment_pending' && userMessage.startsWith('paid')) {
    const transactionRef = message.substring(5).trim();
    session.step = 'completed';
    session.transactionRef = transactionRef;
    console.log(`✅ Payment confirmed: ${transactionRef}`);
    
    // TODO: Verify payment with payment gateway
    // TODO: Generate policy document
    // TODO: Send policy PDF via WhatsApp
    // TODO: Mark user as active in database
    
    return `🎉 *Enrollment Complete!*

Thank you for choosing Zororo Phumulani Insurance! 

✅ Payment received
✅ Policy activated
📄 Policy Number: ZP${Date.now()}

Your digital policy document is being prepared and will be sent to you within 24 hours.

*What's Next?*
• You're covered starting today
• Premium due date: ${getNextMonth()}
• Download policy: https://zororo-phumulani.com/policy

*Need Assistance?*
Type *HELP* for support
Type *CLAIM* to file a claim
Type *MENU* to see all plans

Thank you for trusting Zororo Phumulani! 🛡️`;
  }

  // ==============================================================================
  // INITIAL MENU & PLAN SELECTION
  // ==============================================================================
  
  // Greeting / Show main menu
  if (userMessage.match(/^(hi|hello|hey|start|menu)$/)) {
    return `Welcome to *Zororo Phumulani Insurance*! 🛡️

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

Or type *INFO* for company details.`;
  }
  
  // Plan selection: 1, 2, 3
  if (userMessage === '1') {
    return PLANS.funeral.description;
  }
  
  if (userMessage === '2') {
    return PLANS.worldwide.description;
  }
  
  if (userMessage === '3') {
    return PLANS.accidental.description;
  }
  
  // Agent request
  if (userMessage === '4' || userMessage === 'agent') {
    return `📞 *Connecting you with an agent...*

Our team is available:
🕐 Mon-Fri: 8AM - 5PM
🕐 Sat: 8AM - 1PM

You can also:
📧 Email: support@zororo-phumulani.com
📱 Call: +263 771 234 567
🌐 Visit: https://zororo-phumulani.com

An agent will respond shortly. Thank you for your patience! 🙏`;
  }
  
  // Begin subscription/onboarding
  if (userMessage === 'subscribe' || userMessage === 'enroll' || userMessage === 'sign up') {
    session.step = 'awaiting_name';
    console.log(`🚀 Starting onboarding for ${from}`);
    
    return `🎉 Great! Let's get you enrolled.

This will only take 2 minutes.

First, what is your *full name*?
(as it appears on your ID)`;
  }
  
  // Company information
  if (userMessage === 'info' || userMessage === 'about') {
    return `ℹ️ *About Zororo Phumulani Insurance*

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

Type *MENU* to see our plans.`;
  }
  
  // Help / Support
  if (userMessage === 'help' || userMessage === 'support') {
    return `❓ *How can we help?*

*Common Commands:*
• *MENU* - View insurance plans
• *SUBSCRIBE* - Start enrollment
• *AGENT* - Speak with representative
• *INFO* - Company information
• *CLAIM* - File a claim

*Need urgent assistance?*
📱 Call: +263 771 234 567
📧 Email: support@zororo-phumulani.com

We're here to help! 🙏`;
  }
  
  // Claims process
  if (userMessage === 'claim' || userMessage === 'file claim') {
    return `📋 *File an Insurance Claim*

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

Type *AGENT* to speak with claims officer.`;
  }

  // ==============================================================================
  // FALLBACK RESPONSE
  // ==============================================================================
  
  // User sent something we don't understand
  console.log(`❓ Unrecognized command: "${message}"`);
  return `I didn't quite understand that. 🤔

*Try these commands:*
• *MENU* - View insurance plans
• *SUBSCRIBE* - Enroll now
• *AGENT* - Speak with representative
• *HELP* - Get support

Or simply type *HI* to start over.`;
}

/**
 * ==============================================================================
 * HELPER FUNCTIONS
 * ==============================================================================
 */

/**
 * Get next month's date for premium due date
 */
function getNextMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Reset user session (for testing)
 */
function resetUserSession(phoneNumber) {
  delete userSessions[phoneNumber];
  console.log(`🔄 Session reset for ${phoneNumber}`);
}

// ==============================================================================
// EXPORTS
// ==============================================================================
module.exports = {
  handleIncomingMessage,
  resetUserSession
};

/**
 * ==============================================================================
 * PRODUCTION IMPROVEMENTS (TODO)
 * ==============================================================================
 * 
 * 1. DATABASE INTEGRATION:
 *    Replace userSessions object with MongoDB/PostgreSQL
 *    Schema:
 *    - users: { phone, name, idNumber, planType, status, createdAt }
 *    - sessions: { phone, currentStep, data, lastActivity }
 *    - transactions: { userId, amount, status, method, timestamp }
 * 
 * 2. PAYMENT GATEWAY:
 *    Integrate EcoCash API:
 *    - Initiate payment request
 *    - Receive webhook confirmation
 *    - Auto-verify payments
 *    
 *    Add Paynow Zimbabwe:
 *    - Generate unique payment links
 *    - Track payment status
 * 
 * 3. AI ENHANCEMENTS:
 *    - Natural Language Processing (NLP) for better intent recognition
 *    - Handle typos and variations (e.g., "subscrib" → "subscribe")
 *    - Multilingual support (English + Shona + Ndebele)
 * 
 * 4. VALIDATION:
 *    - Zimbabwe ID format: XX-XXXXXXX-X-XX
 *    - Phone number validation
 *    - Age restrictions (18+)
 *    - Duplicate enrollment prevention
 * 
 * 5. NOTIFICATIONS:
 *    - Send policy document PDF via WhatsApp
 *    - Premium payment reminders (monthly)
 *    - Policy renewal notifications
 *    - Birthday messages with special offers
 * 
 * 6. ANALYTICS:
 *    - Track conversion funnel: view → subscribe → payment → active
 *    - Most popular plans
 *    - Drop-off points in onboarding
 *    - Average response time
 * 
 * 7. ADMIN DASHBOARD:
 *    - View active conversations
 *    - Manually respond to complex queries
 *    - View enrollment statistics
 *    - Process refunds/cancellations
 * 
 * 8. SESSION TIMEOUT:
 *    - Auto-expire sessions after 30 minutes of inactivity
 *    - Send reminder: "Still there? Type MENU to continue"
 * 
 * 9. RICH CONTENT:
 *    - Send insurance certificate as PDF
 *    - Share video explainers
 *    - Location sharing for office visits
 * 
 * 10. COMPLIANCE:
 *     - GDPR/POPIA data protection
 *     - Opt-in/opt-out management
 *     - Data retention policies
 */
