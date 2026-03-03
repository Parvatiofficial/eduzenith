const redisClient = require('../config/redis');

/**
 * High-performance Cache-aside middleware for public read endpoints
 */
const cache = (ttlSeconds = 300) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') return next();

    const cacheKey = `cache:${req.originalUrl || req.url}`;
    try {
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        res.setHeader('X-Cache', 'HIT');
        return res.status(200).json(cachedResponse);
      }

      res.setHeader('X-Cache', 'MISS');
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        if (res.statusCode === 200) {
          redisClient.set(cacheKey, body, ttlSeconds).catch(() => {});
        }
        return originalJson(body);
      };
      next();
    } catch (err) {
      next();
    }
  };
};

module.exports = cache;
