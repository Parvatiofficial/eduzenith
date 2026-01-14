import React, { useState } from 'react';

const DiscussionForum = ({ courseId }) => {
  const [threads, setThreads] = useState([
    {
      _id: 't1',
      title: 'Best approach for microservices state management?',
      authorName: 'Jordan Smith',
      createdAt: '2026-01-15',
      upvotes: 14,
      replies: [
        { authorName: 'Alex Rivera (Instructor)', content: 'Use event sourcing with Kafka or Redis streams for eventual consistency.' }
      ]
    },
    {
      _id: 't2',
      title: 'Docker Compose volume permissions on macOS',
      authorName: 'Priya Sharma',
      createdAt: '2026-02-10',
      upvotes: 8,
      replies: []
    }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePostThread = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    setThreads([
      {
        _id: 't_' + Date.now(),
        title: newTitle,
        authorName: 'Current Learner',
        createdAt: new Date().toISOString().split('T')[0],
        upvotes: 0,
        replies: []
      },
      ...threads
    ]);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="discussion-forum-container">
      <div className="forum-header">
        <h3>Classroom Discussion & Live Q&A</h3>
        <span className="badge-live">● Live Sync</span>
      </div>

      <form onSubmit={handlePostThread} className="thread-composer">
        <input
          type="text"
          placeholder="Ask a question or start a topic..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <textarea
          rows="2"
          placeholder="Add context or code snippets..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button type="submit" className="btn-primary-sm">+ Post Question</button>
      </form>

      <div className="threads-list">
        {threads.map((t) => (
          <div key={t._id} className="thread-card">
            <div className="thread-vote-col">
              <button className="vote-btn">▲</button>
              <span>{t.upvotes}</span>
            </div>
            <div className="thread-content-col">
              <h4 className="thread-title">{t.title}</h4>
              <span className="thread-meta">Posted by {t.authorName} on {t.createdAt}</span>
              {t.replies.length > 0 && (
                <div className="replies-wrapper">
                  {t.replies.map((r, idx) => (
                    <div key={idx} className="reply-bubble">
                      <strong>{r.authorName}:</strong> {r.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
