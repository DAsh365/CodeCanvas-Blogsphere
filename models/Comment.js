const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // This is a reference to the table name, ensure it matches your User model definition
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post', // This is a reference to the table name, ensure it matches your Post model definition
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: 'comment', // This is the name of the table this model refers to
  }
);

module.exports = Comment;
