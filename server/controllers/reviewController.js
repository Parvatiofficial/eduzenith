const Review = require('../models/Review');
const Course = require('../models/Course');

// @desc    Get reviews for a course
// @route   GET /api/v1/reviews
exports.getReviews = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const query = courseId ? { course: courseId } : {};
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a review for a course and recalculate course average rating
// @route   POST /api/v1/reviews
exports.createReview = async (req, res, next) => {
  try {
    const { course: courseId, studentName, rating, comment } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    const review = await Review.create({
      course: courseId,
      studentName,
      rating: Number(rating),
      comment
    });

    // Recalculate average rating
    const allReviews = await Review.find({ course: courseId });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Course.findByIdAndUpdate(courseId, {
      rating: Number(avg.toFixed(1)),
      reviewCount: allReviews.length
    });

    res.status(201).json({ success: true, message: 'Review submitted', data: review });
  } catch (error) {
    next(error);
  }
};
