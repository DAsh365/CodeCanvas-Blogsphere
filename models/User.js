const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection'); // Adjust the path as necessary

class User extends Model {
  // Method to check if an unhashed password entered by the user can be compared to the hashed password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // Define an ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Password must be at least 8 characters long
      },
    },
  },
  {
    hooks: {
      // Before a User is created, automatically hash their password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before a User is updated, automatically hash their password if it was modified
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.changed('password')) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true, // Enable the automatic creation of createdAt and updatedAt fields
    freezeTableName: true, // Disable Sequelize's automatic pluralization of table names
    underscored: true, // Use snake_case rather than camelCase for database attributes
    modelName: 'user', // This is the name of the table in the database
  }
);

module.exports = User;
