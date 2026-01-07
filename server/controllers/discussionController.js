const Discussion = require('../models/Discussion');
const Course = require('../models/Course');

exports.getDiscussions = async (req, res, next) => {
  try {
    const { courseId, lessonId, search, page = 1, limit = 15 } = req.query;
    const query = {};
    if (courseId) query.course = courseId;
    if (lessonId) query.lesson = lessonId;
    if (search) query.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const discussions = await Discussion.find(query)
      .sort({ isPinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Discussion.countDocuments(query);
    res.status(200).json({ success: true, count: discussions.length, total, data: discussions });
  } catch (error) {
    next(error);
  }
};

exports.createThread = async (req, res, next) => {
  try {
    const { course: courseId, lesson, authorName, authorEmail, title, content } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });

    const thread = await Discussion.create({
      course: courseId,
      lesson: lesson || null,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim().toLowerCase(),
      title: title.trim(),
      content: content.trim()
    });

    res.status(201).json({ success: true, message: 'Discussion thread created', data: thread });
  } catch (error) {
    next(error);
  }
};

exports.addReply = async (req, res, next) => {
  try {
    const { authorName, authorEmail, isInstructor, content } = req.body;
    const thread = await Discussion.findById(req.params.id);
    if (!thread) return res.status(404).json({ success: false, error: 'Thread not found' });

    thread.replies.push({
      authorName,
      authorEmail,
      isInstructor: !!isInstructor,
      content,
      createdAt: new Date()
    });
    await thread.save();

    res.status(201).json({ success: true, message: 'Reply posted', data: thread });
  } catch (error) {
    next(error);
  }
};

exports.upvoteThread = async (req, res, next) => {
  try {
    const thread = await Discussion.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!thread) return res.status(404).json({ success: false, error: 'Thread not found' });
    res.status(200).json({ success: true, upvotes: thread.upvotes });
  } catch (error) {
    next(error);
  }
};
