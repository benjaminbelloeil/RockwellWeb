// pages/api/getSaveGameData.js
import { connectPostgres } from '../../../database/conn';
import SaveGame from '../../../model/SaveGame';

export default async function handler(req, res) {
    try {
      await connectPostgres();
  
      const { userId } = req.query;
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      console.log("Fetching save game data for userId:", userId);
  
      const saveGame = await SaveGame.findOne({ where: { userId } });
  
      if (saveGame) {
        return res.status(200).json(saveGame);
      } else {
        return res.status(404).json({ error: 'Save game data not found' });
      }
    } catch (error) {
      console.error('Error fetching save game data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }