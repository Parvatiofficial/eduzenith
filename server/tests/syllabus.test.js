const assert = require('assert');
const Lesson = require('../models/Lesson');

describe('Syllabus & Lesson Ordering Suite', () => {
  it('should reject negative lesson order index', () => {
    const lesson = new Lesson({
      title: 'Introduction',
      order: -1,
      durationMinutes: 15
    });
    const err = lesson.validateSync();
    assert.ok(err.errors['order'], 'Lesson order must be >= 1');
  });

  it('should enforce duration greater than zero', () => {
    const lesson = new Lesson({
      title: 'Quick Intro',
      order: 1,
      durationMinutes: 0
    });
    const err = lesson.validateSync();
    assert.ok(err.errors['durationMinutes'], 'Duration must be positive');
  });

  it('should default isFreePreview to false', () => {
    const lesson = new Lesson({
      title: 'Deep Dive into V8 Engine',
      order: 4,
      durationMinutes: 45
    });
    assert.strictEqual(lesson.isFreePreview, false);
  });
});

console.log('✓ Syllabus ordering and lesson validation assertions passed.');
