import React from 'react';

const EnrollmentTable = ({ enrollments, onUpdateProgress, onDelete, onExportCsv }) => {
  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="empty-enrollments-state">
        <div className="empty-icon">👥</div>
        <h3>No Student Enrollments</h3>
        <p>There are no active enrollments registered. Select a course from the catalog to enroll students.</p>
      </div>
    );
  }

  return (
    <div className="enrollments-view">
      <div className="enrollments-header-row">
        <h3>Active Student Enrollments ({enrollments.length})</h3>
        <button className="btn-secondary" onClick={onExportCsv}>
          📥 Export CSV Roster
        </button>
      </div>

      <div className="table-responsive">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Category</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Certificate ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((item) => {
              const courseTitle = item.course ? item.course.title : 'Archived Course';
              const courseCategory = item.course ? item.course.category : 'General';
              const progress = item.progressPercentage || 0;

              return (
                <tr key={item._id}>
                  <td>
                    <div className="student-profile">
                      <span className="student-name">{item.studentName}</span>
                      <span className="student-email">{item.studentEmail}</span>
                    </div>
                  </td>
                  <td className="course-col">{courseTitle}</td>
                  <td>
                    <span className="category-pill">{courseCategory}</span>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="progress-value">{progress}%</span>
                    </div>
                    <div className="quick-progress-buttons">
                      <button onClick={() => onUpdateProgress(item._id, 25)}>25%</button>
                      <button onClick={() => onUpdateProgress(item._id, 50)}>50%</button>
                      <button onClick={() => onUpdateProgress(item._id, 75)}>75%</button>
                      <button onClick={() => onUpdateProgress(item._id, 100)} className="btn-gold">100%</button>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.certificateId ? (
                      <span className="cert-badge">{item.certificateId}</span>
                    ) : (
                      <span className="text-muted">In Progress</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-danger-sm"
                      onClick={() => onDelete(item._id)}
                      title="Withdraw Enrollment"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentTable;
