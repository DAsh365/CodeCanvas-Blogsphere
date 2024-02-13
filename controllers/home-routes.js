const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Find all Posts and include User data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'], // Replace 'username' with the actual field in your User model
        },
      ],
      order: [
        ['createdAt', 'DESC'] // Orders the posts from most recent to least recent
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized posts data to the 'homepage' template
    res.render('homepage', {
      posts,
      loggedIn: req.session ? req.session.loggedIn : false // Check if the user is logged in and pass that to the template
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for logging in
// (You need to create a login page view for this to work)
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login'); // Render the login page template
});

// Add more routes as needed for your application

module.exports = router;
