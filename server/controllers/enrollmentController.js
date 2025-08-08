const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const certificateService = require('../services/certificateService');
const csvExport = require('../services/csvExport');

// @desc    Get all student enrollments with course details
// @route   GET /api/v1/enrollments
exports.getEnrollments = async (req, res, next) => {
  try {
    const { courseId, status, search } = req.query;
    const query = {};

    if (courseId) query.course = courseId;
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const enrollments = await Enrollment.find(query)
      .populate('course', 'title category instructor price')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll student into course
// @route   POST /api/v1/enrollments
exports.createEnrollment = async (req, res, next) => {
  try {
    const { course: courseId, studentName, studentEmail } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    const existing = await Enrollment.findOne({ course: courseId, studentEmail: studentEmail.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Student is already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      course: courseId,
      studentName: studentName.trim(),
      studentEmail: studentEmail.toLowerCase().trim(),
      progressPercentage: 0,
      status: 'Active'
    });

    await Course.findByIdAndUpdate(courseId, { $inc: { totalEnrollments: 1 } });

    res.status(201).json({
      success: true,
      message: 'Student successfully enrolled in course',
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student progress percentage and trigger graduation if 100%
// @route   PATCH /api/v1/enrollments/:id
exports.updateProgress = async (req, res, next) => {
  try {
    const { progressPercentage } = req.body;
    const progress = Math.min(100, Math.max(0, Number(progressPercentage)));

    const updateFields = {
      progressPercentage: progress
    };

    if (progress >= 100) {
      updateFields.status = 'Completed';
      updateFields.completedAt = new Date();
      updateFields.certificateId = certificateService.generateCertificateId(req.params.id);
    } else {
      updateFields.status = 'Active';
    }

    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    }).populate('course', 'title instructor category');

    if (!enrollment) {
      return res.status(404).json({ success: false, error: 'Enrollment record not found' });
    }

    res.status(200).json({
      success: true,
      message: progress >= 100 ? 'Course completed! Certificate awarded.' : 'Learning progress updated',
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Withdraw student / delete enrollment
// @route   DELETE /api/v1/enrollments/:id
exports.deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ success: false, error: 'Enrollment record not found' });
    }
    await Course.findByIdAndUpdate(enrollment.course, { $inc: { totalEnrollments: -1 } });
    await enrollment.deleteOne();

    res.status(200).json({ success: true, message: 'Enrollment removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Export student enrollment registry as standard CSV
// @route   GET /api/v1/enrollments/export/csv
exports.exportEnrollmentsCSV = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find().populate('course', 'title category');
    const csvContent = csvExport.toCSV(enrollments);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="eduzenith_enrollments_report.csv"');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
