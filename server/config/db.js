const mongoose = require('mongoose');

/**
 * Enterprise MongoDB Connection Manager with connection pooling & auto-retry
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/eduzenith';
  try {
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log(`[EduZenith LMS] MongoDB Cluster Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`[EduZenith DB Error]: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[EduZenith DB]: MongoDB cluster disconnected. Reconnecting...');
    });

    return conn;
  } catch (error) {
    console.error(`[EduZenith DB Fatal]: Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
