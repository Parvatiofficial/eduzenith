const mongoose = require('mongoose');
const { CATEGORIES, DIFFICULTY_LEVELS, DEFAULT_THUMBNAIL } = require('../config/categories');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Course category is required'],
      enum: {
        values: CATEGORIES,
        message: '{VALUE} is not a valid LMS category'
      }
    },
    level: {
      type: String,
      enum: {
        values: DIFFICULTY_LEVELS,
        message: '{VALUE} is not a valid difficulty level'
      },
      default: 'Beginner'
    },
    price: {
      type: Number,
      required: [true, 'Course price is required'],
      min: [0, 'Price cannot be negative'],
      default: 0
    },
    thumbnail: {
      type: String,
      default: DEFAULT_THUMBNAIL
    },
    published: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0
    },
    totalEnrollments: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Slugify title before saving
courseSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Indexes for fast searching & filtering
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ published: 1, createdAt: -1 });

module.exports = mongoose.model('Course', courseSchema);
