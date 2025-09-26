/**
 * Utility to convert student enrollment and grading records to standard RFC-4180 CSV
 */
const escapeCsvCell = (val) => {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
};

exports.toCSV = (enrollments = []) => {
  const headers = [
    'Enrollment ID',
    'Student Name',
    'Student Email',
    'Course Title',
    'Category',
    'Progress (%)',
    'Status',
    'Certificate Eligible',
    'Enrolled Date',
    'Last Accessed'
  ];

  const rows = enrollments.map((item) => {
    const courseTitle = item.course ? (item.course.title || item.course) : 'N/A';
    const category = item.course && item.course.category ? item.course.category : 'General';
    const isEligible = item.progressPercentage >= 100 ? 'YES' : 'NO';
    const enrolledAt = item.enrolledAt ? new Date(item.enrolledAt).toISOString().split('T')[0] : 'N/A';
    const updatedAt = item.updatedAt ? new Date(item.updatedAt).toISOString().split('T')[0] : 'N/A';

    return [
      escapeCsvCell(item._id),
      escapeCsvCell(item.studentName),
      escapeCsvCell(item.studentEmail),
      escapeCsvCell(courseTitle),
      escapeCsvCell(category),
      escapeCsvCell(item.progressPercentage || 0),
      escapeCsvCell(item.status || 'Active'),
      escapeCsvCell(isEligible),
      escapeCsvCell(enrolledAt),
      escapeCsvCell(updatedAt)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};
