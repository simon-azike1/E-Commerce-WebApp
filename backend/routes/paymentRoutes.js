const express = require('express');
const router = express.Router();

/**
 * PAYMENT MODULE — ISOLATED
 *
 * This router is only mounted in index.js when PAYMENT_ENABLED=true.
 * All payment logic lives here and in services/payment/.
 * Nothing outside this file touches payment logic.
 *
 * Phase 3: wire up Stripe or Paystack here.
 * Steps to activate:
 *   1. Set PAYMENT_ENABLED=true in .env
 *   2. Add STRIPE_SECRET_KEY or PAYSTACK_SECRET_KEY to .env
 *   3. npm install stripe  (or @paystack/paystack-sdk)
 *   4. Implement the handlers below
 */

// POST /api/payment/initiate  — create a payment intent / initialize transaction
router.post('/initiate', (req, res) => {
  res.status(503).json({ success: false, message: 'Payment module not yet configured' });
});

// POST /api/payment/webhook  — handle payment provider webhook callbacks
router.post('/webhook', (req, res) => {
  res.status(503).json({ success: false, message: 'Payment webhook not yet configured' });
});

// GET /api/payment/verify/:ref  — verify a transaction by reference
router.get('/verify/:ref', (req, res) => {
  res.status(503).json({ success: false, message: 'Payment verification not yet configured' });
});

module.exports = router;