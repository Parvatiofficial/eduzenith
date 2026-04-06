const Order = require('../models/Order');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.handleStripeWebhook = async (req, res, next) => {
  try {
    const event = req.body;
    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const order = await Order.findOne({ stripeSessionId: session.id });
      if (order) {
        order.status = 'completed';
        order.paidAt = new Date();
        await order.save();

        // Auto-enroll student into paid course
        const existingEnrollment = await Enrollment.findOne({ course: order.course, studentEmail: order.studentEmail });
        if (!existingEnrollment) {
          await Enrollment.create({
            course: order.course,
            studentName: order.studentName,
            studentEmail: order.studentEmail,
            progressPercentage: 0,
            status: 'Active'
          });
          await Course.findByIdAndUpdate(order.course, { $inc: { totalEnrollments: 1 } });
        }
      }
    }
    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};
