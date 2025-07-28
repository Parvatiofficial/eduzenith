const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Lesson must belong to a Course']
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    order: {
      type: Number,
      required: [true, 'Lesson sequence order index is required'],
      min: [1, 'Lesson order must be at least 1']
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration in minutes is required'],
      min: [1, 'Duration must be greater than zero']
    },
    videoUrl: {
      type: String,
      default: 'https://cdn.eduzenith.io/default-stream.mp4'
    },
    isFreePreview: {
      type: Boolean,
      default: false
    },
    summary: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index to guarantee ordered curriculum sequencing
lessonSchema.index({ course: 1, order: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
