import React from 'react';

const Navbar = ({ activeTab, setActiveTab, onOpenCourseModal }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <span className="brand-logo">🎓</span>
          <div>
            <span className="brand-name">EduZenith</span>
            <span className="brand-badge">LMS Enterprise</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            📚 Course Catalog
          </button>
          <button
            className={`nav-btn ${activeTab === 'enrollments' ? 'active' : ''}`}
            onClick={() => setActiveTab('enrollments')}
          >
            👥 Student Enrollments
          </button>
          <button
            className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics & KPIs
          </button>
        </nav>

        <div className="nav-actions">
          <button className="btn-primary" onClick={onOpenCourseModal}>
            + Publish Course
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
