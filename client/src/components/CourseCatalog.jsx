import React from 'react';
import CourseCard from './CourseCard';

const CourseCatalog = ({ courses, loading, onEdit, onDelete, onEnroll }) => {
  if (loading) {
    return <div className="catalog-loading">Retrieving master course catalog...</div>;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="empty-catalog-state">
        <div className="empty-icon">📖</div>
        <h3>No Courses Found</h3>
        <p>No master courses matched your current search filters or category selections.</p>
      </div>
    );
  }

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
          onEnroll={onEnroll}
        />
      ))}
    </div>
  );
};

export default CourseCatalog;
