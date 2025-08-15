const assert = require('assert');
const Enrollment = require('../models/Enrollment');

describe('Student Enrollment & Progress Progression Suite', () => {
  it('should default student progress to 0% with Active status', () => {
    const enrollment = new Enrollment({
      studentName: 'Maya Lin',
      studentEmail: 'maya@example.com'
    });
    assert.strictEqual(enrollment.progressPercentage, 0);
    assert.strictEqual(enrollment.status, 'Active');
  });

  it('should clamp progress between 0 and 100', () => {
    const invalidUnder = new Enrollment({ studentName: 'Test', studentEmail: 't@e.co', progressPercentage: -5 });
    assert.ok(invalidUnder.validateSync().errors['progressPercentage']);

    const invalidOver = new Enrollment({ studentName: 'Test', studentEmail: 't@e.co', progressPercentage: 110 });
    assert.ok(invalidOver.validateSync().errors['progressPercentage']);
  });

  it('should validate email format for student registration', () => {
    const invalidEmail = new Enrollment({ studentName: 'Bad Email', studentEmail: 'not-an-email' });
    const err = invalidEmail.validateSync();
    assert.ok(err.errors['studentEmail'], 'Invalid email format should fail validation');
  });
});

console.log('✓ Student enrollment lifecycle assertions passed.');
