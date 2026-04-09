const express = require('express');
const router = express.Router();
const { createCheckout, getOrderHistory } = require('../controllers/orderController');
const { handleStripeWebhook } = require('../controllers/webhookController');

router.post('/checkout', createCheckout);
router.get('/history', getOrderHistory);
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
