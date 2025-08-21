const AuditLog = require('../models/AuditLog');

/**
 * Non-blocking audit logger middleware capturing mutations on courses and enrollments
 */
const auditProgress = (req, res, next) => {
  const originalJson = res.json.bind(res);
  const startTime = Date.now();

  res.json = function (body) {
    res.json = originalJson;
    const durationMs = Date.now() - startTime;

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const entity = req.baseUrl.includes('enrollments') ? 'Enrollment' : 'Course';
      const entityId = req.params.id || (body && (body._id || (body.data && body.data._id))) || null;
      const actor = req.headers['x-actor-email'] || (req.body && req.body.studentEmail) || 'system-admin';

      AuditLog.create({
        action: `${req.method} ${req.baseUrl}${req.path}`,
        entity,
        entityId: entityId ? entityId.toString() : null,
        actor,
        ipAddress: req.ip || req.socket.remoteAddress || '127.0.0.1',
        durationMs,
        statusCode: res.statusCode,
        timestamp: new Date()
      }).catch((err) => {
        console.error('[AuditLog] Failed to persist audit trail:', err.message);
      });
    }

    return originalJson(body);
  };

  next();
};

module.exports = auditProgress;
