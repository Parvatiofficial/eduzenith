const requestCounts = new Map();

/**
 * Enterprise in-memory sliding-window rate limiter
 * Protects LMS endpoints against denial of service and scrape abuse
 */
const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 mins
  const max = options.max || 120; // 120 requests per window

  // Clean stale keys every 10 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requestCounts.entries()) {
      if (now - record.startTime > windowMs) {
        requestCounts.delete(ip);
      }
    }
  }, 10 * 60 * 1000).unref();

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, { count: 1, startTime: now });
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - 1);
      return next();
    }

    const record = requestCounts.get(ip);
    if (now - record.startTime > windowMs) {
      record.count = 1;
      record.startTime = now;
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - 1);
      return next();
    }

    record.count += 1;
    const remaining = Math.max(0, max - record.count);
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', remaining);

    if (record.count > max) {
      const retryAfter = Math.ceil((record.startTime + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit threshold exceeded. Please slow down your requests.',
        retryAfterSeconds: retryAfter
      });
    }

    next();
  };
};

module.exports = rateLimiter();
