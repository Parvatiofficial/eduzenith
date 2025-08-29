import React from 'react';

const StatCard = ({ icon, label, value, subtext, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper">{icon}</div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <h3 className="stat-value">{value}</h3>
        {subtext && (
          <span className={`stat-subtext ${trend ? 'trend-' + trend : ''}`}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
