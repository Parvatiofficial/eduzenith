import React from 'react';
import StatCard from './StatCard';

const AnalyticsGrid = ({ stats, loading }) => {
  if (loading) {
    return <div className="analytics-loading">Loading executive KPI metrics...</div>;
  }

  const {
    totalCourses = 0,
    totalEnrollments = 0,
    activeStudentsCount = 0,
    completionRate = 0,
    estimatedRevenue = 0,
  } = stats || {};

  return (
    <div className="analytics-grid">
      <StatCard
        icon="📚"
        label="Published Courses"
        value={totalCourses}
        subtext="+12% from last sprint"
        trend="positive"
      />
      <StatCard
        icon="👥"
        label="Student Enrollments"
        value={totalEnrollments}
        subtext={`${activeStudentsCount} unique learners`}
        trend="positive"
      />
      <StatCard
        icon="🎯"
        label="Completion Ratio"
        value={`${completionRate}%`}
        subtext="Certificates awarded"
        trend="neutral"
      />
      <StatCard
        icon="💳"
        label="Estimated Revenue"
        value={`$${estimatedRevenue.toLocaleString()}`}
        subtext="Gross tuition volume"
        trend="positive"
      />
    </div>
  );
};

export default AnalyticsGrid;
