import { connectPostgres } from '../../../database/conn';
import User from '../../../model/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, money } = req.body;

  if (!userId || !money) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await connectPostgres();

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming there's a money field in the User model
    user.money = money;
    await user.save();

    return res.status(200).json({ message: 'Game data saved successfully' });
  } catch (error) {
    console.error('Error saving game data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
