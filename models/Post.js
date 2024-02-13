const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // This should match the table name for your User model
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use underscores instead of camel-casing
    modelName: 'post', // This is the name of the table this model refers to
  }
);

module.exports = Post;
