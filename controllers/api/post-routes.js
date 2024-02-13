const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User, // Assuming you have a User model for post creators
          attributes: ['name'], // Replace 'name' with the actual username field
        },
      ],
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User, // Assuming you have a User model for post creators
          attributes: ['name'], // Replace 'name' with the actual username field
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId, // Set the user id from the session
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId, // Check if the user owns the post
      },
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId, // Check if the user owns the post
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
