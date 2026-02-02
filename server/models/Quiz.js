const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true, min: 0 },
  explanation: { type: String, default: '' },
  points: { type: Number, default: 10 }
});

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    title: { type: String, required: true, trim: true },
    passingScorePercentage: { type: Number, default: 80, min: 0, max: 100 },
    timeLimitMinutes: { type: Number, default: 15 },
    questions: [questionSchema]
  },
  {
    timestamps: true
  }
);

quizSchema.index({ course: 1, lesson: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
