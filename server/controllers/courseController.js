const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');

// @desc    Get courses catalog with live filter, search & sort
// @route   GET /api/v1/courses
exports.getCourses = async (req, res, next) => {
  try {
    const { category, level, search, sort = '-createdAt', page = 1, limit = 20 } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (level && level !== 'All') {
      query.level = level;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const courses = await Course.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course by ID with curriculum lessons
// @route   GET /api/v1/courses/:id
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: { ...course.toObject(), lessons }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create and publish a new course
// @route   POST /api/v1/courses
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Course published successfully',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing course
// @route   PUT /api/v1/courses/:id
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a course and cascade delete syllabus lessons & enrollments
// @route   DELETE /api/v1/courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    await Lesson.deleteMany({ course: course._id });
    await Enrollment.deleteMany({ course: course._id });
    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course and related syllabus lessons removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
