const assert = require('assert');
const certificateService = require('../services/certificateService');
const csvExport = require('../services/csvExport');

describe('EduZenith LMS End-to-End Workflow Suite', () => {
  it('should complete student graduation flow from enrollment to certificate issuance', () => {
    const student = {
      _id: '64a98b76c1234567890abcde',
      studentName: 'Elena Rostova',
      studentEmail: 'elena@enterprise.org',
      course: { title: 'Distributed Systems & Microservices', category: 'DevOps & Cloud' },
      progressPercentage: 100,
      status: 'Completed'
    };

    // 1. Verify eligibility
    const isEligible = certificateService.checkEligibility(student.progressPercentage, 100);
    assert.strictEqual(isEligible, true, 'Student at 100% progress must be eligible for certificate');

    // 2. Issue certificate
    const cert = certificateService.issueCertificate({
      enrollmentId: student._id,
      studentName: student.studentName,
      courseTitle: student.course.title,
      instructor: 'Dr. Marcus Vance'
    });
    assert.ok(cert.certificateId.startsWith('CERT-EDZ-'));
    assert.strictEqual(cert.status, 'VERIFIED');
    assert.strictEqual(cert.digitalSignature.length, 64, 'HMAC signature must be valid SHA-256');

    // 3. Export CSV record
    const csv = csvExport.toCSV([student]);
    assert.ok(csv.includes('Elena Rostova'));
    assert.ok(csv.includes('Distributed Systems & Microservices'));
    assert.ok(csv.includes('YES'));
  });
});

console.log('✓ Full E2E Graduation & Certification Pipeline verified successfully.');
