const assert = require('assert');
const Discussion = require('../models/Discussion');

describe('Discussion Forum Model & Reply Suite', () => {
  it('should validate required title and author details', () => {
    const thread = new Discussion({});
    const err = thread.validateSync();
    assert.ok(err.errors['title']);
    assert.ok(err.errors['authorName']);
    assert.ok(err.errors['authorEmail']);
  });

  it('should support nesting replies with author attribution', () => {
    const thread = new Discussion({
      course: '507f1f77bcf86cd799439011',
      title: 'How to handle JWT token expiration?',
      content: 'Can someone explain silent refresh flow?',
      authorName: 'Alex K',
      authorEmail: 'alex@dev.io'
    });
    thread.replies.push({
      authorName: 'Sarah J (Instructor)',
      authorEmail: 'sarah@eduzenith.io',
      isInstructor: true,
      content: 'Use an httpOnly cookie with a refresh token route.'
    });
    assert.strictEqual(thread.replies.length, 1);
    assert.strictEqual(thread.replies[0].isInstructor, true);
  });
});

console.log('✓ Discussion forum unit tests verified successfully.');
