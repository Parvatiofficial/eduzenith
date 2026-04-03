const Course = require('../models/Course');
const Order = require('../models/Order');
const paymentService = require('../services/paymentService');

exports.createCheckout = async (req, res, next) => {
  try {
    const { courseId, studentName, studentEmail, successUrl, cancelUrl } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });

    const session = await paymentService.createCheckoutSession({
      course,
      studentName,
      studentEmail,
      successUrl,
      cancelUrl
    });

    res.status(200).json({ success: true, data: session });
  } catch (error) {
    next(error);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const { email } = req.query;
    const query = email ? { studentEmail: email.toLowerCase() } : {};
    const orders = await Order.find(query).populate('course', 'title price category').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};
