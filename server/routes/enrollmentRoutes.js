const express = require('express');
const router = express.Router();
const {
  getEnrollments,
  createEnrollment,
  updateProgress,
  deleteEnrollment,
  exportEnrollmentsCSV
} = require('../controllers/enrollmentController');

router.get('/export/csv', exportEnrollmentsCSV);

router.route('/')
  .get(getEnrollments)
  .post(createEnrollment);

router.route('/:id')
  .patch(updateProgress)
  .delete(deleteEnrollment);

module.exports = router;
