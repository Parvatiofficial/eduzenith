const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Get executive analytics KPIs for LMS dashboard
// @route   GET /api/v1/stats
exports.getStats = async (req, res, next) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const completedEnrollments = await Enrollment.countDocuments({ status: 'Completed' });
    const activeStudents = await Enrollment.distinct('studentEmail');

    // Aggregate total potential revenue
    const revenueAgg = await Course.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, totalRevenue: { $sum: { $multiply: ['$price', '$totalEnrollments'] } } } }
    ]);
    const estimatedRevenue = revenueAgg[0] ? revenueAgg[0].totalRevenue : 0;

    const completionRate = totalEnrollments > 0
      ? Math.round((completedEnrollments / totalEnrollments) * 100)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalEnrollments,
        activeStudentsCount: activeStudents.length,
        completionRate,
        estimatedRevenue: Number(estimatedRevenue.toFixed(2))
      }
    });
  } catch (error) {
    next(error);
  }
};
