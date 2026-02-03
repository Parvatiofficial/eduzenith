const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, trim: true, lowercase: true },
    scorePercentage: { type: Number, required: true, min: 0, max: 100 },
    totalQuestions: { type: Number, required: true },
    correctAnswersCount: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    completedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

quizAttemptSchema.index({ quiz: 1, studentEmail: 1 });
quizAttemptSchema.index({ studentEmail: 1, passed: 1 });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
