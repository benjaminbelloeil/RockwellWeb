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
      allowNull: false
    }
  }, {
    tableName: 'SaveGames'
  });

module.exports = SaveGame;
