const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    // Only logged-in users should be able to post comments
    if (req.session.userId) {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.userId, // Assuming your Comment model has a userId field
      });
      res.status(200).json(newComment);
    } else {
      res.status(403).json({ message: 'You must be logged in to comment' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Only logged-in users should be able to delete their comments
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId, // This ensures that users can only delete their own comments
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
