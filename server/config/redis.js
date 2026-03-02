/**
 * Redis In-Memory Client and Cache-Aside Manager
 */
class RedisClient {
  constructor() {
    this.memoryStore = new Map();
    this.isConnected = false;
    console.log('[Redis] Initialized caching client layer.');
  }

  async get(key) {
    const record = this.memoryStore.get(key);
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      this.memoryStore.delete(key);
      return null;
    }
    return record.value;
  }

  async set(key, value, ttlSeconds = 300) {
    this.memoryStore.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  }

  async del(key) {
    this.memoryStore.delete(key);
  }

  async flushPattern(pattern) {
    const prefix = pattern.replace('*', '');
    for (const key of this.memoryStore.keys()) {
      if (key.startsWith(prefix)) {
        this.memoryStore.delete(key);
      }
    }
  }
}

module.exports = new RedisClient();
