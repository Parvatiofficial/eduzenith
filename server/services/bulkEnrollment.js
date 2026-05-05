const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

/**
 * Bulk corporate roster CSV importer
 */
exports.importCohortCSV = async (courseId, studentRecords = []) => {
  const results = { imported: 0, skipped: 0, errors: [] };
  for (const record of studentRecords) {
    try {
      const existing = await Enrollment.findOne({ course: courseId, studentEmail: record.email.toLowerCase() });
      if (existing) {
        results.skipped += 1;
        continue;
      }
      await Enrollment.create({
        course: courseId,
        studentName: record.name,
        studentEmail: record.email.toLowerCase(),
        progressPercentage: 0,
        status: 'Active'
      });
      results.imported += 1;
    } catch (err) {
      results.errors.push({ email: record.email, error: err.message });
    }
  }
  await Course.findByIdAndUpdate(courseId, { $inc: { totalEnrollments: results.imported } });
  return results;
};
