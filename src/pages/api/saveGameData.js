// pages/api/saveGameData.js
import { connectPostgres } from '../../../database/conn';
import SaveGame from '../../../model/SaveGame';

export default async function handler(req, res) {
  try {
    await connectPostgres();

    const { userId, saveData } = req.body;

    if (!userId || !saveData) {
      console.log("Missing data:", { userId, saveData });
      return res.status(400).json({ error: 'User ID and save data are required' });
    }

    console.log("Received data:", { userId, saveData });

    const [saveGame, created] = await SaveGame.findOrCreate({
      where: { userId },
      defaults: { data: saveData }
    });

    if (!created) {
      saveGame.data = saveData;
      await saveGame.save();
    }

    return res.status(200).json({ message: 'Game data saved successfully' });
  } catch (error) {
    console.error('Error saving game data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}