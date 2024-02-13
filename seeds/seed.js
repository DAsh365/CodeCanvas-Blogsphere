const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'user1',
    password: 'password123'
  },
  {
    username: 'user2',
    password: 'password123'
  }
];

const postData = [
  {
    title: 'First Post Title',
    content: 'This is the content of the first post.',
    UserId: 1
  },
  {
    title: 'Second Post Title',
    content: 'This is the content of the second post.',
    UserId: 2
  }
];

const commentData = [
  {
    content: 'First comment on first post',
    PostId: 1,
    UserId: 2
  },
  {
    content: 'Second comment on first post',
    PostId: 1,
    UserId: 1
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData);

  const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();