const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// @desc    Get all lessons for a specific course
// @route   GET /api/v1/lessons
exports.getLessons = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const query = courseId ? { course: courseId } : {};
    const lessons = await Lesson.find(query).sort({ order: 1 });
    res.status(200).json({ success: true, count: lessons.length, data: lessons });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a syllabus lesson for a course
// @route   POST /api/v1/lessons
exports.createLesson = async (req, res, next) => {
  try {
    const { course: courseId, title, durationMinutes, videoUrl, isFreePreview } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Referenced course not found' });
    }

    // Auto-compute order index if not specified
    const lastLesson = await Lesson.findOne({ course: courseId }).sort({ order: -1 });
    const order = req.body.order || (lastLesson ? lastLesson.order + 1 : 1);

    const lesson = await Lesson.create({
      course: courseId,
      title,
      order,
      durationMinutes: durationMinutes || 30,
      videoUrl,
      isFreePreview: !!isFreePreview
    });

    res.status(201).json({ success: true, message: 'Lesson added to syllabus', data: lesson });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a lesson
// @route   PUT /api/v1/lessons/:id
exports.updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }
    res.status(200).json({ success: true, message: 'Lesson updated successfully', data: lesson });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lesson from syllabus
// @route   DELETE /api/v1/lessons/:id
exports.deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }
    res.status(200).json({ success: true, message: 'Lesson removed from syllabus' });
  } catch (error) {
    next(error);
  }
};
