import React, { useState } from 'react';

const EnrollmentModal = ({ isOpen, onClose, course, onEnrollSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  if (!isOpen || !course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnrollSubmit({
      course: course._id,
      studentName,
      studentEmail,
    });
    setStudentName('');
    setStudentEmail('');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-sm">
        <div className="modal-header">
          <h3>Enroll in {course.title}</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="enrollment-course-pill">
            <span>Price: <strong>${course.price.toFixed(2)}</strong></span>
            <span>Category: <strong>{course.category}</strong></span>
          </div>

          <div className="form-group">
            <label>Student Full Name *</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Jordan Smith"
            />
          </div>

          <div className="form-group">
            <label>Student Corporate Email *</label>
            <input
              type="email"
              required
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="e.g. jordan.smith@enterprise.com"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Confirm Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentModal;
