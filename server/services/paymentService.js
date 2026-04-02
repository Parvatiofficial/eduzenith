const Order = require('../models/Order');

class PaymentService {
  async createCheckoutSession({ course, studentName, studentEmail, successUrl, cancelUrl }) {
    const order = await Order.create({
      course: course._id,
      studentName,
      studentEmail,
      amount: course.price,
      currency: 'usd',
      status: 'pending',
      stripeSessionId: `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    });

    return {
      orderId: order._id,
      invoiceNumber: order.invoiceNumber,
      sessionId: order.stripeSessionId,
      checkoutUrl: successUrl || `https://checkout.stripe.com/pay/${order.stripeSessionId}`
    };
  }
}

module.exports = new PaymentService();
