const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorEmail: { type: String, required: true, trim: true },
    isInstructor: { type: Boolean, default: false },
    content: { type: String, required: true, trim: true },
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }
);

const discussionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      default: null
    },
    authorName: { type: String, required: true, trim: true },
    authorEmail: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    content: { type: String, required: true, trim: true },
    upvotes: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
    isResolved: { type: Boolean, default: false },
    replies: [replySchema]
  },
  {
    timestamps: true
  }
);

discussionSchema.index({ course: 1, isPinned: -1, createdAt: -1 });
discussionSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Discussion', discussionSchema);
