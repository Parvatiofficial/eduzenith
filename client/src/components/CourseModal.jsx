import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Web Development',
  'Data Science & AI',
  'DevOps & Cloud',
  'Mobile Engineering',
  'UI/UX Design',
  'Cybersecurity',
  'Product Management',
  'System Architecture'
];

const CourseModal = ({ isOpen, onClose, onSave, editingCourse }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: 'Web Development',
    level: 'Beginner',
    price: 99.99,
    thumbnail: '',
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        title: editingCourse.title || '',
        description: editingCourse.description || '',
        instructor: editingCourse.instructor || '',
        category: editingCourse.category || 'Web Development',
        level: editingCourse.level || 'Beginner',
        price: editingCourse.price || 0,
        thumbnail: editingCourse.thumbnail || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        instructor: '',
        category: 'Web Development',
        level: 'Beginner',
        price: 99.99,
        thumbnail: '',
      });
    }
  }, [editingCourse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editingCourse ? 'Edit Master Course' : 'Publish New Course'}</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Course Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Full-Stack React & Node Enterprise Architecture"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Instructor Name *</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g. Alex Rivera"
              />
            </div>
            <div className="form-group">
              <label>Price ($ USD) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Skill Level *</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline the curriculum learning outcomes..."
            />
          </div>

          <div className="form-group">
            <label>Thumbnail Image URL</label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingCourse ? 'Save Changes' : 'Publish Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
