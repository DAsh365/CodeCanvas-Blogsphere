const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.userId,
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

// Route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId, // This ensures users can only delete their own comments
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
