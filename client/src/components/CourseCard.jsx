import React from 'react';

const CourseCard = ({ course, onEdit, onDelete, onEnroll }) => {
  const { _id, title, instructor, category, level, price, rating, reviewCount, totalEnrollments, thumbnail } = course;

  return (
    <div className="course-card">
      <div className="course-thumbnail-container">
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
          alt={title}
          className="course-thumbnail"
        />
        <span className={`badge-level level-${level.toLowerCase()}`}>{level}</span>
      </div>

      <div className="course-card-body">
        <div className="course-meta">
          <span className="course-category">{category}</span>
          <span className="course-rating">★ {rating} ({reviewCount})</span>
        </div>

        <h3 className="course-title">{title}</h3>
        <p className="course-instructor">Instructor: <strong>{instructor}</strong></p>

        <div className="course-footer">
          <div className="course-price-info">
            <span className="price-tag">${price.toFixed(2)}</span>
            <span className="enrollment-count">{totalEnrollments} enrolled</span>
          </div>

          <div className="course-card-actions">
            <button className="btn-secondary-sm" onClick={() => onEdit(course)}>
              Edit
            </button>
            <button className="btn-primary-sm" onClick={() => onEnroll(course)}>
              Enroll
            </button>
            <button className="btn-danger-sm" onClick={() => onDelete(_id)}>
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
