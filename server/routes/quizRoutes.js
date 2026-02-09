const express = require('express');
const router = express.Router();
const {
  getQuizByLesson,
  createQuiz,
  submitQuiz
} = require('../controllers/quizController');

router.post('/', createQuiz);
router.get('/lesson/:lessonId', getQuizByLesson);
router.post('/:quizId/submit', submitQuiz);

module.exports = router;
