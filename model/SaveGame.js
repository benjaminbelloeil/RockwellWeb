// models/SaveGame.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/conn');

const SaveGame = sequelize.define('SaveGame', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'SaveGames'
  });

  // Stored procedure for fetching save game data by user ID

SaveGame.fetchByUserId = async function(userId) {
  try {
    const saveGame = await SaveGame.findOne({ where: { userId } });
    return saveGame;
  } catch (error) {
    throw new Error('Error fetching save game data: ' + error.message);
  }
}

module.exports = SaveGame;
