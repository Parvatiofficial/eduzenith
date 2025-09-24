const crypto = require('crypto');

/**
 * Enterprise Certificate Issuance and Verification Service
 */
class CertificateService {
  /**
   * Determine student certificate eligibility
   */
  checkEligibility(progressPercentage, passingScore = 100) {
    return Number(progressPercentage) >= passingScore;
  }

  /**
   * Generate canonical certificate serial identifier
   */
  generateCertificateId(enrollmentId, courseCode = 'EDZ') {
    const year = new Date().getFullYear();
    const hash = crypto
      .createHash('sha256')
      .update(`${enrollmentId}-${Date.now()}`)
      .digest('hex')
      .slice(0, 8)
      .toUpperCase();

    return `CERT-${courseCode}-${year}-${hash}`;
  }

  /**
   * Sign and produce cryptographic certificate audit artifact
   */
  issueCertificate({ enrollmentId, studentName, courseTitle, instructor, completedDate = new Date() }) {
    const certId = this.generateCertificateId(enrollmentId);
    const signature = crypto
      .createHmac('sha256', process.env.CERT_SECRET || 'eduzenith-lms-super-secret-key-2025')
      .update(`${certId}:${studentName}:${courseTitle}`)
      .digest('hex');

    return {
      certificateId: certId,
      studentName,
      courseTitle,
      instructor,
      issuedAt: completedDate,
      verificationUrl: `https://eduzenith.org/verify/${certId}`,
      digitalSignature: signature,
      status: 'VERIFIED'
    };
  }
}

module.exports = new CertificateService();
