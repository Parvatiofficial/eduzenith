const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimiter = require('./middleware/rateLimiter');
const auditProgress = require('./middleware/auditProgress');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(auditProgress);

// Cluster health and uptime probe
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'EduZenith LMS API',
    status: 'operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Primary RESTful API Routes
app.use('/api/v1/courses', require('./routes/courseRoutes'));
app.use('/api/v1/lessons', require('./routes/lessonRoutes'));
app.use('/api/v1/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));
app.use('/api/v1/stats', require('./routes/statsRoutes'));

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5005;
if (process.env.NODE_ENV !== 'test') {
  connectDB();
  app.listen(PORT, () => {
    console.log(`[EduZenith LMS Engine] running on http://localhost:${PORT}`);
  });
}

module.exports = app;
