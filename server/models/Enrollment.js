const mongoose = require('mongoose');
const { ENROLLMENT_STATUS } = require('../config/categories');

const enrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Enrollment must reference a valid Course']
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    studentEmail: {
      type: String,
      required: [true, 'Student email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    status: {
      type: String,
      enum: ENROLLMENT_STATUS,
      default: 'Active'
    },
    certificateId: {
      type: String,
      default: null
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Ensure a student cannot be enrolled twice in the same course
enrollmentSchema.index({ course: 1, studentEmail: 1 }, { unique: true });
enrollmentSchema.index({ studentEmail: 1 });
enrollmentSchema.index({ status: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
