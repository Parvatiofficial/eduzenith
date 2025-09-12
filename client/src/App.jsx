import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import AnalyticsGrid from './components/AnalyticsGrid';
import FilterBar from './components/FilterBar';
import CourseCatalog from './components/CourseCatalog';
import CourseModal from './components/CourseModal';
import EnrollmentTable from './components/EnrollmentTable';
import EnrollmentModal from './components/EnrollmentModal';
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchEnrollments,
  createEnrollment,
  updateProgress,
  deleteEnrollment,
  fetchStats,
  exportEnrollmentsCsvUrl
} from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');

  // Modals
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollingCourse, setEnrollingCourse] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [coursesRes, enrollmentsRes, statsRes] = await Promise.all([
        fetchCourses({ search, category, level }),
        fetchEnrollments(),
        fetchStats(),
      ]);
      setCourses(coursesRes.data || []);
      setEnrollments(enrollmentsRes.data || []);
      setStats(statsRes.data || null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [search, category, level]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Course Actions
  const handleSaveCourse = async (courseData) => {
    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id, courseData);
        showToast('Course specifications updated successfully');
      } else {
        await createCourse(courseData);
        showToast('New master course published to catalog');
      }
      setIsCourseModalOpen(false);
      setEditingCourse(null);
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course and syllabus?')) return;
    try {
      await deleteCourse(id);
      showToast('Course removed from LMS registry');
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Enrollment Actions
  const handleEnrollSubmit = async (enrollData) => {
    try {
      await createEnrollment(enrollData);
      showToast('Student successfully registered for curriculum');
      setIsEnrollModalOpen(false);
      setEnrollingCourse(null);
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUpdateProgress = async (enrollmentId, percentage) => {
    try {
      await updateProgress(enrollmentId, percentage);
      showToast(`Student progress updated to ${percentage}%`);
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (!window.confirm('Withdraw this student enrollment?')) return;
    try {
      await deleteEnrollment(id);
      showToast('Student enrollment withdrawn');
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCourseModal={() => {
          setEditingCourse(null);
          setIsCourseModalOpen(true);
        }}
      />

      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <main className="main-content">
        <AnalyticsGrid stats={stats} loading={loading} />

        {activeTab === 'catalog' && (
          <div className="tab-pane">
            <FilterBar
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              level={level}
              setLevel={setLevel}
            />
            <CourseCatalog
              courses={courses}
              loading={loading}
              onEdit={(c) => {
                setEditingCourse(c);
                setIsCourseModalOpen(true);
              }}
              onDelete={handleDeleteCourse}
              onEnroll={(c) => {
                setEnrollingCourse(c);
                setIsEnrollModalOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'enrollments' && (
          <div className="tab-pane">
            <EnrollmentTable
              enrollments={enrollments}
              onUpdateProgress={handleUpdateProgress}
              onDelete={handleDeleteEnrollment}
              onExportCsv={() => window.open(exportEnrollmentsCsvUrl, '_blank')}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-pane analytics-deep-dive">
            <div className="card">
              <h3>Executive Operations & Compliance Audit</h3>
              <p>
                EduZenith tracks learning outcomes, certificate integrity, and student participation
                across all published enterprise faculties.
              </p>
              <div className="compliance-metrics">
                <div className="compliance-row">
                  <span>Certificate Authenticity Verification</span>
                  <strong>HMAC-SHA256 Enabled</strong>
                </div>
                <div className="compliance-row">
                  <span>Rate Limiter DDoS Protection</span>
                  <strong>Active (120 req / 15m)</strong>
                </div>
                <div className="compliance-row">
                  <span>Audit Logging Status</span>
                  <strong>Synchronous Non-Blocking Stream</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => {
          setIsCourseModalOpen(false);
          setEditingCourse(null);
        }}
        onSave={handleSaveCourse}
        editingCourse={editingCourse}
      />

      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => {
          setIsEnrollModalOpen(false);
          setEnrollingCourse(null);
        }}
        course={enrollingCourse}
        onEnrollSubmit={handleEnrollSubmit}
      />
    </div>
  );
}

export default App;
