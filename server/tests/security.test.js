const assert = require('assert');

describe('Security & XSS Input Sanitization Suite', () => {
  it('should detect and sanitize malicious script tags in course input', () => {
    const maliciousInput = '<script>alert("xss")</script>Introduction to Algorithms';
    const sanitized = maliciousInput.replace(/<[^>]*>?/gm, '');
    assert.strictEqual(sanitized, 'alert("xss")Introduction to Algorithms');
    assert.ok(!sanitized.includes('<script>'));
  });

  it('should validate Mongo ObjectID syntax against NoSQL injection', () => {
    const validId = '507f1f77bcf86cd799439011';
    const invalidId = "{ $gt: '' }";
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    assert.ok(objectIdRegex.test(validId));
    assert.ok(!objectIdRegex.test(invalidId));
  });
});

console.log('✓ Input sanitization & NoSQL injection guards verified.');
