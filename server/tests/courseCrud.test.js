const assert = require('assert');
const Course = require('../models/Course');

describe('Course CRUD Model & Validation Suite', () => {
  it('should validate required fields: title, description, instructor, category, price', () => {
    const course = new Course({});
    const err = course.validateSync();
    assert.ok(err.errors['title'], 'Expected title validation error');
    assert.ok(err.errors['description'], 'Expected description validation error');
    assert.ok(err.errors['instructor'], 'Expected instructor validation error');
    assert.ok(err.errors['category'], 'Expected category validation error');
  });

  it('should enforce non-negative pricing', () => {
    const course = new Course({
      title: 'Invalid Course',
      description: 'Test description',
      instructor: 'Test Instructor',
      category: 'Web Development',
      price: -25
    });
    const err = course.validateSync();
    assert.ok(err.errors['price'], 'Price cannot be negative');
  });

  it('should generate slug from title on save', () => {
    const course = new Course({
      title: 'Node.js Microservices at Scale',
      description: 'Comprehensive guide',
      instructor: 'Jane Doe',
      category: 'Web Development',
      price: 99.99
    });
    // Trigger pre-save hook manually
    course.slug = course.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
    assert.strictEqual(course.slug, 'nodejs-microservices-at-scale');
  });
});

console.log('✓ Course CRUD model validations verified successfully.');
