const express = require('express');
const router = express.Router();
const { getInstructorAnalytics } = require('../controllers/instructorController');

router.get('/analytics', getInstructorAnalytics);

module.exports = router;
