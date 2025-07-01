# 🎓 EduZenith — Modern Learning Management System (LMS) & Course Hub

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**EduZenith** is an enterprise-grade full-stack MERN Learning Management System (LMS) designed for online academies, universities, and corporate training programs. It features modular syllabus curriculum authoring, real-time student progress tracking, cryptographic certificate issuance, and executive revenue analytics.

---

## 🌟 Key Architectural Features

- **📚 Course Catalog & Curriculum Authoring (Full CRUD):**
  - **Create:** Publish courses with multi-tier difficulty (`Beginner`, `Intermediate`, `Advanced`), category taxonomy, pricing, and thumbnail assets.
  - **Read:** Full-text search and category filtering with pagination.
  - **Update:** Live modifications to descriptions, pricing, and syllabus outlines.
  - **Delete:** Cascade deletion removing associated syllabus lessons and enrollments.
- **🎓 Student Enrollment & Progress Engine:**
  - Automated student enrollment directory with duplicate enrollment guards.
  - Granular progress adjustment (0% to 100%) tracking lesson completion.
  - Automated cryptographic completion certificate generation upon reaching 100%.
- **📊 Executive KPI Analytics Dashboard:**
  - Real-time aggregation of total courses, active student enrollments, completion ratios, and total calculated revenue.
- **🔒 Security & Compliance:**
  - Sliding-window in-memory rate limiter protecting public endpoints against scrape abuse.
  - Non-blocking audit logger middleware capturing write mutations to `AuditLog`.
  - Comprehensive input sanitization guarding against XSS and NoSQL injection.
- **🐳 Cloud-Ready Containerization:**
  - Multi-stage Docker container build and full multi-container Docker Compose stack.

---

## 🏗️ Architecture & Technology Stack

```text
+-------------------------------------------------------------+
|                     EduZenith Web Client                    |
|             (React 18, Emerald & Slate Design Tokens)        |
+------------------------------+------------------------------+
                               | HTTPS / JSON
                               v
+-------------------------------------------------------------+
|                     Express API Gateway                     |
|  Sliding Rate Limiter | CORS | Body Parser | Audit Middleware|
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
+-----------------------+             +-----------------------+
|  Course & Syllabus    |             |  Enrollment & Stats   |
|      Controllers      |             |      Controllers      |
+-----------+-----------+             +-----------+-----------+
            |                                     |
            +------------------+------------------+
                               | Mongoose ODM
                               v
                    +-------------------------+
                    |      MongoDB 6.0        |
                    | (Courses, Lessons,      |
                    |  Enrollments, Audits)   |
                    +-------------------------+
```

---

## 📡 RESTful API Endpoints Specification

| Method | Endpoint | Description | Entity |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Cluster uptime & health probe | System |
| `GET` | `/api/v1/courses` | Retrieve courses with filtering, search & pagination | Courses |
| `POST` | `/api/v1/courses` | Publish a new master course | Courses |
| `GET` | `/api/v1/courses/:id` | Fetch course details with ordered syllabus | Courses |
| `PUT` | `/api/v1/courses/:id` | Update course specifications | Courses |
| `DELETE` | `/api/v1/courses/:id` | Cascade delete course and syllabus | Courses |
| `GET` | `/api/v1/lessons` | Fetch curriculum lessons for a course | Lessons |
| `POST` | `/api/v1/lessons` | Add new lesson module to course syllabus | Lessons |
| `PUT` | `/api/v1/lessons/:id` | Update lesson specifications | Lessons |
| `DELETE` | `/api/v1/lessons/:id` | Remove lesson from syllabus | Lessons |
| `GET` | `/api/v1/enrollments` | List student enrollments with progress | Enrollments |
| `POST` | `/api/v1/enrollments` | Enroll student into a course | Enrollments |
| `PATCH` | `/api/v1/enrollments/:id`| Update progress percentage (0-100%) | Enrollments |
| `DELETE` | `/api/v1/enrollments/:id`| Withdraw student enrollment | Enrollments |
| `GET` | `/api/v1/enrollments/export/csv` | Export enrollment records as RFC-4180 CSV | Export |
| `GET` | `/api/v1/reviews` | Retrieve student reviews for course | Reviews |
| `POST` | `/api/v1/reviews` | Submit course review and recalculate rating | Reviews |
| `GET` | `/api/v1/stats` | Executive KPI analytics metrics | Analytics |

---

## ⚡ Quickstart Guide

### Option 1: Docker Compose Orchestration (Recommended)
```bash
docker-compose up --build -d
```
The EduZenith API will be running on `http://localhost:5005` backed by MongoDB.

### Option 2: Local Manual Setup

#### 1. Backend Server Setup
```bash
# Install server dependencies
npm install

# Run database seed generator
npm run seed

# Run automated test suites
npm test

# Start Express development server
npm run dev
```

#### 2. Frontend Client Setup
```bash
cd client
npm install
npm start
```
Open `http://localhost:3000` to interact with the EduZenith Course Hub.

---

## 📜 License
Distributed under the MIT License. See [LICENSE](file:///LICENSE) for more information.
