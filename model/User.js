const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conn'); // Import sequelize instance
const bcrypt = require('bcrypt'); // Import bcrypt library

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

// Define comparePassword method
User.prototype.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

module.exports = User;
