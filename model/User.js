// User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conn');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

// Fetch username by email
User.fetchUsernameByEmail = async function(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user.username;
  } catch (error) {
    throw new Error('Error fetching username: ' + error.message);
  }
};

module.exports = User;
