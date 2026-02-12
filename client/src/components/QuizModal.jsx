import React, { useState } from 'react';

const SAMPLE_QUESTIONS = [
  {
    prompt: 'Which HTTP method is idempotent according to REST specification?',
    options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
    correct: 1
  },
  {
    prompt: 'What is the purpose of compound indexes in MongoDB?',
    options: ['To index foreign keys only', 'To index multiple fields together for multi-filter queries', 'To encrypt data at rest', 'To compress database backups'],
    correct: 1
  }
];

const QuizModal = ({ isOpen, onClose, lessonTitle = 'Core Architecture Module' }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    SAMPLE_QUESTIONS.forEach((q, i) => {
      if (answers[i] === q.correct) score += 50;
    });
    setResult({ score, passed: score >= 80 });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-quiz">
        <div className="modal-header">
          <h3>Assessment: {lessonTitle}</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {result ? (
          <div className="quiz-result-card">
            <div className={`score-badge ${result.passed ? 'score-pass' : 'score-fail'}`}>
              {result.score}%
            </div>
            <h4>{result.passed ? '🎉 Congratulations! You Passed' : '⚠️ Keep Practicing'}</h4>
            <p>Passing requirement: 80% or higher.</p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="quiz-form">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <div key={idx} className="question-block">
                <p className="question-prompt"><strong>{idx + 1}.</strong> {q.prompt}</p>
                <div className="options-grid">
                  {q.options.map((opt, optIdx) => (
                    <label key={optIdx} className="option-label">
                      <input
                        type="radio"
                        name={`q_${idx}`}
                        checked={answers[idx] === optIdx}
                        onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary">Submit Answers</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
