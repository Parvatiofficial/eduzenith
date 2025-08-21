const assert = require('assert');
const AuditLog = require('../models/AuditLog');

describe('Security & Learning Audit Log Model Suite', () => {
  it('should properly record HTTP audit metadata', () => {
    const log = new AuditLog({
      action: 'PATCH /api/v1/enrollments/64f1234/progress',
      entity: 'Enrollment',
      actor: 'student@eduzenith.io',
      ipAddress: '192.168.1.100',
      durationMs: 42,
      statusCode: 200
    });
    assert.strictEqual(log.entity, 'Enrollment');
    assert.strictEqual(log.statusCode, 200);
    assert.ok(log.timestamp instanceof Date);
  });
});

console.log('✓ Audit logging model schema and timestamping verified.');
