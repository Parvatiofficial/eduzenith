const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    domain: { type: String, required: true, lowercase: true, trim: true },
    contactEmail: { type: String, required: true, trim: true },
    maxSeats: { type: Number, default: 50 },
    activeLicenses: { type: Number, default: 0 },
    tier: {
      type: String,
      enum: ['Starter', 'Enterprise', 'Academic'],
      default: 'Enterprise'
    },
    coursesIncluded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  {
    timestamps: true
  }
);

organizationSchema.index({ domain: 1 });

module.exports = mongoose.model('Organization', organizationSchema);
