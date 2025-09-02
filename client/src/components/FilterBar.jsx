import React from 'react';

const CATEGORIES = [
  'All',
  'Web Development',
  'Data Science & AI',
  'DevOps & Cloud',
  'Mobile Engineering',
  'UI/UX Design',
  'Cybersecurity',
  'Product Management',
  'System Architecture'
];

const FilterBar = ({ search, setSearch, category, setCategory, level, setLevel }) => {
  return (
    <div className="filter-bar">
      <div className="search-input-group">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search courses, instructors or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        <select
          className="select-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              Category: {cat}
            </option>
          ))}
        </select>

        <select
          className="select-input"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="All">All Skill Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
