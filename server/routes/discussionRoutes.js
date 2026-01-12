const express = require('express');
const router = express.Router();
const {
  getDiscussions,
  createThread,
  addReply,
  upvoteThread
} = require('../controllers/discussionController');

router.route('/')
  .get(getDiscussions)
  .post(createThread);

router.post('/:id/replies', addReply);
router.patch('/:id/upvote', upvoteThread);

module.exports = router;
