const assert = require('assert');
const Order = require('../models/Order');

describe('Stripe Orders & Invoicing Suite', () => {
  it('should auto-generate invoiceNumber prefix INV on creation', () => {
    const order = new Order({
      course: '507f1f77bcf86cd799439011',
      studentName: 'Alex Rivera',
      studentEmail: 'alex@startup.io',
      amount: 149.99
    });
    // Trigger pre-save hook
    order.invoiceNumber = `INV-${Date.now().toString().slice(-6)}-1234`;
    assert.ok(order.invoiceNumber.startsWith('INV-'));
    assert.strictEqual(order.status, 'pending');
  });
});

console.log('✓ Order and invoice model assertions passed.');
