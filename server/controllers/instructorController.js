const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.getInstructorAnalytics = async (req, res, next) => {
  try {
    const { instructor } = req.query;
    const filter = instructor ? { instructor } : {};

    const courses = await Course.find(filter);
    const courseIds = courses.map((c) => c._id);

    const totalStudents = await Enrollment.countDocuments({ course: { $in: courseIds } });
    const completedStudents = await Enrollment.countDocuments({ course: { $in: courseIds }, status: 'Completed' });

    let grossRevenue = 0;
    courses.forEach((c) => {
      grossRevenue += (c.price || 0) * (c.totalEnrollments || 0);
    });

    res.status(200).json({
      success: true,
      data: {
        totalCourses: courses.length,
        totalStudents,
        completedStudents,
        completionRate: totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0,
        grossRevenue: Number(grossRevenue.toFixed(2))
      }
    });
  } catch (error) {
    next(error);
  }
};
