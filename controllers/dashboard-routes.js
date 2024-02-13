const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../../utils/auth');

// Get the dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    // Retrieve the user's posts
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
      include: [
        {
          model: User,
          attributes: ['username'], // Replace 'username' with the actual field in your User model
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass the posts data to the dashboard template
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the page to edit a specific post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'], // Replace 'username' with the actual field in your User model
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      // Pass the post data to the edit template
      res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;