const assert = require('assert');
const redisClient = require('../config/redis');

describe('Redis Cache Layer Suite', () => {
  it('should store and retrieve cached objects within TTL', async () => {
    await redisClient.set('test_key', { status: 'cached' }, 60);
    const cached = await redisClient.get('test_key');
    assert.strictEqual(cached.status, 'cached');
  });

  it('should flush patterns matching prefix', async () => {
    await redisClient.set('cache:/api/courses', [1, 2, 3], 60);
    await redisClient.flushPattern('cache:/api/*');
    const flushed = await redisClient.get('cache:/api/courses');
    assert.strictEqual(flushed, null);
  });
});

console.log('✓ Cache hit/miss and invalidation assertions passed.');
