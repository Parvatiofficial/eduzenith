const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

exports.getQuizByLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const quiz = await Quiz.findOne({ lesson: lessonId });
    if (!quiz) {
      return res.status(404).json({ success: false, error: 'No assessment configured for this lesson' });
    }
    const studentView = {
      _id: quiz._id,
      title: quiz.title,
      course: quiz.course,
      lesson: quiz.lesson,
      passingScorePercentage: quiz.passingScorePercentage,
      timeLimitMinutes: quiz.timeLimitMinutes,
      questions: quiz.questions.map((q) => ({
        _id: q._id,
        prompt: q.prompt,
        options: q.options,
        points: q.points
      }))
    };
    res.status(200).json({ success: true, data: studentView });
  } catch (error) {
    next(error);
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, message: 'Quiz assessment created', data: quiz });
  } catch (error) {
    next(error);
  }
};

exports.submitQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { studentName, studentEmail, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, error: 'Quiz not found' });

    let correctCount = 0;
    const questionReview = [];

    quiz.questions.forEach((q, idx) => {
      const selectedIndex = answers[idx];
      const isCorrect = selectedIndex === q.correctOptionIndex;
      if (isCorrect) correctCount += 1;
      questionReview.push({
        prompt: q.prompt,
        selectedOption: q.options[selectedIndex] || 'Skipped',
        correctOption: q.options[q.correctOptionIndex],
        explanation: q.explanation,
        isCorrect
      });
    });

    const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercentage >= quiz.passingScorePercentage;

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      course: quiz.course,
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim().toLowerCase(),
      scorePercentage,
      totalQuestions: quiz.questions.length,
      correctAnswersCount: correctCount,
      passed
    });

    res.status(200).json({
      success: true,
      data: {
        attemptId: attempt._id,
        scorePercentage,
        passed,
        passingThreshold: quiz.passingScorePercentage,
        correctAnswersCount: correctCount,
        totalQuestions: quiz.questions.length,
        questionReview
      }
    });
  } catch (error) {
    next(error);
  }
};
