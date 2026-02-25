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
// Load canonical plan data for bot menus and details
const plansData = require('./data/zororo-plans.json');

// Convert array to lookup map for quick access
const ZORORO_PLANS = (plansData.plans || []).reduce((acc, p) => {
  acc[p.id.toLowerCase()] = p;
  return acc;
}, {});

// Add-ons (Accidental is an add-on, not a standalone plan)
const ADD_ONS = plansData.addOns || {};

const PLANS = {
  funeral: {
    name: 'Funeral & Repatriation (Local)',
    description: `🏛️ *Funeral & Repatriation*\n\nChoose from affordable local plans covering Zimbabwe and South Africa. Reply with the plan code to view or APPLY <code>.`,
    price: {}
  },
  worldwide: {
    name: 'Worldwide Funeral Cover',
    description: `🌍 *Worldwide Funeral Cover*\n\nGlobal repatriation and international funeral coordination. Reply *SUBSCRIBE* to enroll or *VIEW worldwide-r30000* for details.`,
    price: {}
  },
  addOns: ADD_ONS
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
  
  // Step 1a: Accidental add‑on decision (if user was asked)
  if (session.step === 'awaiting_addon') {
    if (userMessage === 'yes' || userMessage === 'y') {
      session.addOns = session.addOns || [];
      session.addOns.push('accidental');
      session.step = 'awaiting_name';
      return `Great — Accidental Death Cover will be added.\n\nPlease provide your *full name* as it appears on your ID to continue.`;
    }

    // treat any other reply as NO
    session.addOns = session.addOns || [];
    session.step = 'awaiting_name';
    return `No problem — Accidental Cover will be skipped.\n\nPlease provide your *full name* as it appears on your ID to continue.`;
  }

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
  
  // Step 2: Collecting ID/Passport number (text or upload)
  if (session.step === 'awaiting_id') {
    // If user provided a textual ID number
    if (message && message.trim().length > 3) {
      session.idNumber = message.trim();
      session.step = 'payment_pending';
      console.log(`✅ ID collected: ${session.idNumber}`);

      return `Perfect! Your details are confirmed. ✅\n\n*Enrollment Summary:*\n👤 Name: ${session.name}\n🆔 ID: ${session.idNumber}\n📋 Plan: ${session.selectedPlan || 'Funeral & Repatriation'}\n\n*Next Step: Payment*\n\n💳 *Payment Options:*\n\n1️⃣ *EcoCash:*\n   • Send to: 0771234567\n   • Reference: ${session.idNumber}\n\n2️⃣ *Bank Transfer:*\n   • Bank: CBZ\n   • Account: 12345678\n   • Reference: ${session.idNumber}\n\n3️⃣ *Online Payment:*\n   🔗 https://zororo-phumulani.com/pay/${session.idNumber}\n\nYou may also upload a photo of your ID/passport in this chat for verification.\nAfter payment, reply with: *PAID [transaction reference]*`;
    }

    // If empty text, prompt for ID or upload
    return `Please provide your ID or Passport number, or upload a photo of the document here.`;
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
    return `Welcome to *Zororo Phumulani Insurance*! 🛡️\n\nChoose an option:\n\n1️⃣ Local Plans (Basic / Mid / Premium)\n2️⃣ Worldwide Funeral Plan\n3️⃣ Speak with Agent\n\nReply with the number (1, 2 or 3) or type *MENU* at any time.`;
  }
  
  // User selects top-level menu options
  if (userMessage === '1') {
    // Show local plans grouped by tier
    const categories = ['Basic','Mid','Premium'];
    let msg = `*Local Plans — Reply VIEW <code> or APPLY <code>*:\n\n`;
    categories.forEach(cat => {
      msg += `*${cat}*:\n`;
      const list = Object.values(ZORORO_PLANS).filter(p => p.category === cat);
      list.forEach(p => {
        msg += `• ${p.displayName} — Family R${p.premiumFamily} / Single R${p.premiumSingle} (code: ${p.id})\n`;
      });
      msg += `\n`;
    });
    msg += `Example: VIEW r2000 or APPLY r2000`;
    return msg;
  }

  if (userMessage === '2') {
    const wp = ZORORO_PLANS['worldwide-r30000'];
    if (!wp) return PLANS.worldwide.description;
    return `*${wp.displayName}*\n\nCover: R${wp.coverAmount}\nFamily: R${wp.premiumFamily} / Single: R${wp.premiumSingle}\n\nKey benefits:\n- ${wp.keyBenefits.join('\n- ')}\n\nReply *APPLY ${wp.id}* to start the onboarding.`;
  }

  // '3' reserved for Agent (handled below)
  if (userMessage === '3') {
    return `📞 *Connecting you with an agent...*\n\nOur team will respond shortly. You can also email support@zororo-phumulani.com or call +263 771 234 567.`;
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
  
  // VIEW <planCode> or APPLY <planCode> (e.g. VIEW r2000, APPLY r2000)
  const viewMatch = message.match(/^view\s+([a-z0-9\-]+)/i);
  const applyMatch = message.match(/^apply\s+([a-z0-9\-]+)/i);
  const codeOnlyMatch = message.match(/^([a-z]\d{3,5}|worldwide\-r\d{4,5})$/i);

  if (viewMatch) {
    const code = viewMatch[1].toLowerCase();
    const plan = ZORORO_PLANS[code];
    if (!plan) return `Plan code *${code}* not found. Reply *MENU* to see available plans.`;
    return `*${plan.displayName}*\n\nCover: R${plan.coverAmount}\nFamily: R${plan.premiumFamily} / Single: R${plan.premiumSingle}\nCasket: ${plan.casketType}\n\nKey benefits:\n- ${plan.keyBenefits.join('\n- ')}\n\nReply *APPLY ${plan.id}* to enroll.`;
  }

  if (applyMatch) {
    const code = applyMatch[1].toLowerCase();
    const plan = ZORORO_PLANS[code];
    if (!plan) return `Plan code *${code}* not found. Reply *MENU* to see available plans.`;
    session.selectedPlan = code;

    // Prompt for accidental add-on if available
    const accidentalAddOn = ADD_ONS?.accidental;
    if (accidentalAddOn) {
      session.step = 'awaiting_addon';
      return `You chose *${plan.displayName}* (Family R${plan.premiumFamily}).\nWould you like to add *Accidental Death Cover* for +R${accidentalAddOn.price}/month? Reply *YES* to add or *NO* to skip.`;
    }

    session.step = 'awaiting_name';
    return `🎉 You chose *${plan.displayName}* (R${plan.premiumFamily}/family · R${plan.premiumSingle}/single).\n\nFirst, please provide your *full name* as it appears on your ID.`;
  }

  if (codeOnlyMatch) {
    const code = codeOnlyMatch[1].toLowerCase();
    const plan = ZORORO_PLANS[code];
    if (!plan) return `Plan code *${code}* not found.`;
    return `*${plan.displayName}* — Family: R${plan.premiumFamily} / Single: R${plan.premiumSingle}\nReply *VIEW ${plan.id}* for full benefits or *APPLY ${plan.id}* to enroll.`;
  }

  // Begin subscription/onboarding
  if (userMessage === 'subscribe' || userMessage === 'enroll' || userMessage === 'sign up') {
    session.step = 'awaiting_name';
    console.log(`🚀 Starting onboarding for ${from}`);
    
    return `🎉 Great! Let's get you enrolled.\n\nThis will only take 2 minutes.\n\nFirst, what is your *full name*?\n(as it appears on your ID)`;
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

// Handle incoming media (images) — e.g. ID / passport photo sent via WhatsApp
function handleIncomingMedia(from, mediaMessage) {
  if (!userSessions[from]) userSessions[from] = { step: 'initial' };
  const session = userSessions[from];

  if (session.step === 'awaiting_id' && mediaMessage.type === 'image') {
    session.idImage = mediaMessage; // store raw media payload (media id / caption)
    session.step = 'payment_pending';
    console.log(`✅ ID image received for ${from}`);
    return `🆗 ID image received. Thank you — we've saved that for verification.\n\nNow proceed to payment and reply *PAID [reference]* when done.`;
  }

  return null;
}

// ======================================================================
// EXPORTS
// ======================================================================
module.exports = {
  handleIncomingMessage,
  handleIncomingMedia,
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
