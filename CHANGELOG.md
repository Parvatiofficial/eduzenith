# Changelog

All notable changes to **EduZenith LMS** are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-24
### Added
- Multi-stage Docker containerization and Docker Compose orchestration.
- Enterprise sliding-window rate limiting on course search and enrollment endpoints.
- Cryptographic certificate issuance service (HMAC-SHA256) upon 100% course completion.
- RFC-4180 compliant CSV export handler for student grading registries.
- End-to-end integration and security test suites with NoSQL injection prevention.
- Seed generator with 4 master curricula and comprehensive lesson fixtures.

## [0.3.0] - 2025-09-19
### Added
- Complete React 18 single-page application dashboard.
- Responsive Emerald & Slate design tokens with modern CSS variables.
- Interactive Course Catalog, Course Creation Modal, and Enrollment Table.
- Executive KPI Analytics Grid tracking enrollments, revenue, and completion rates.

## [0.2.0] - 2025-08-22
### Added
- Structured Syllabus & Lesson ordering module with duration tracking.
- Student Enrollment registry with completion percentage validation (0-100%).
- Non-blocking audit logger middleware capturing learning mutation events.
- Course reviews and average rating recalculation triggers.

## [0.1.0] - 2025-07-25
### Added
- Initial project scaffolding and MongoDB connection manager with pooling.
- Course Mongoose model with automatic slugification and text search indexing.
- Full Course CRUD API endpoints (GET, POST, PUT, DELETE) with pagination.
- Centralized API error handling and input validation.
