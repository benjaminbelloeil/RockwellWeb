// saveGameData.js
import { connectPostgres } from '../../../database/conn';
import { Sequelize, DataTypes } from 'sequelize';
import User from '../../../model/User';

const SaveGame = sequelize.define('SaveGame', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  saveData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default async function handler(req, res) {
  try {
    await connectPostgres();

    if (req.method === 'POST') {
      const { userID, saveData } = req.body;

      const user = await User.findByPk(userID);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newSaveGame = await SaveGame.create({ userId: userID, saveData });

      return res.status(201).json({ message: 'Save game data stored successfully', saveGame: newSaveGame });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error saving game data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
