const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, trim: true, lowercase: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    stripeSessionId: { type: String, default: null },
    invoiceNumber: { type: String, unique: true },
    paidAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

orderSchema.pre('save', function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = `INV-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

orderSchema.index({ studentEmail: 1, status: 1 });
orderSchema.index({ stripeSessionId: 1 });

module.exports = mongoose.model('Order', orderSchema);
