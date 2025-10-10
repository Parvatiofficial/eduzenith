const mongoose = require('mongoose');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const connectDB = require('../config/db');

const MASTER_COURSES = [
  {
    title: 'Full-Stack React & Node Enterprise Architecture',
    slug: 'full-stack-react-node-architecture',
    description: 'Master enterprise MERN design patterns, microservices decomposition, and production readiness.',
    instructor: 'Alex Rivera',
    category: 'Web Development',
    level: 'Advanced',
    price: 189.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    published: true,
    rating: 4.9,
    reviewCount: 142
  },
  {
    title: 'Cloud-Native DevOps with AWS & Kubernetes',
    slug: 'cloud-native-devops-aws-kubernetes',
    description: 'Learn infrastructure as code, CI/CD pipelines, container orchestration, and multi-region deployment.',
    instructor: 'Sarah Jenkins',
    category: 'DevOps & Cloud',
    level: 'Intermediate',
    price: 149.99,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    published: true,
    rating: 4.8,
    reviewCount: 98
  },
  {
    title: 'Modern UI/UX Design Systems in Figma & Code',
    slug: 'modern-ui-ux-design-systems',
    description: 'Bridge the gap between design tokens, Figma component variants, and React design libraries.',
    instructor: 'Elena Rostova',
    category: 'UI/UX Design',
    level: 'Beginner',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-952384377b58?w=800',
    published: true,
    rating: 4.7,
    reviewCount: 84
  },
  {
    title: 'Applied Machine Learning & LLM Orchestration',
    slug: 'applied-ml-llm-orchestration',
    description: 'Build production RAG pipelines, fine-tune transformer models, and deploy scalable vector databases.',
    instructor: 'Dr. Marcus Vance',
    category: 'Data Science & AI',
    level: 'Advanced',
    price: 219.99,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800',
    published: true,
    rating: 5.0,
    reviewCount: 210
  }
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seed] Clearing existing LMS catalogs...');
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Enrollment.deleteMany({});

    console.log('[Seed] Inserting master course fixtures...');
    const insertedCourses = await Course.insertMany(MASTER_COURSES);

    const lessonsData = [];
    insertedCourses.forEach((c) => {
      lessonsData.push(
        { course: c._id, title: 'Module 1: Architecture & Environment Overview', order: 1, durationMinutes: 45, isFreePreview: true, videoUrl: 'https://cdn.eduzenith.io/preview-1.mp4' },
        { course: c._id, title: 'Module 2: Core Implementation & Schema Models', order: 2, durationMinutes: 60, isFreePreview: false, videoUrl: 'https://cdn.eduzenith.io/lesson-2.mp4' },
        { course: c._id, title: 'Module 3: Capstone Deployment & Performance Benchmarks', order: 3, durationMinutes: 75, isFreePreview: false, videoUrl: 'https://cdn.eduzenith.io/lesson-3.mp4' }
      );
    });
    await Lesson.insertMany(lessonsData);

    console.log('[Seed] Inserting initial sample student enrollments...');
    await Enrollment.create([
      { course: insertedCourses[0]._id, studentName: 'Jordan Smith', studentEmail: 'jordan@enterprise.io', progressPercentage: 100, status: 'Completed', certificateId: 'CERT-EDZ-2025-A8F19B' },
      { course: insertedCourses[0]._id, studentName: 'Priya Sharma', studentEmail: 'priya@techcorp.in', progressPercentage: 65, status: 'Active' },
      { course: insertedCourses[1]._id, studentName: 'Liam Chen', studentEmail: 'liam.chen@dev.io', progressPercentage: 30, status: 'Active' },
      { course: insertedCourses[3]._id, studentName: 'Amina Al-Mansoor', studentEmail: 'amina@datascience.ae', progressPercentage: 90, status: 'Active' }
    ]);

    console.log(`[Seed] Successfully seeded ${insertedCourses.length} courses and enrollments!`);
    if (require.main === module) process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    if (require.main === module) process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
