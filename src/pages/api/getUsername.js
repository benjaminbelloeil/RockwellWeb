import { sequelize } from '../../../database/conn';
import User from '../../../model/User';

export default async function handler(req, res) {
  try {
    await sequelize.sync();
    
    const email = "admin@gmail.com"; // Hardcoded for simplicity
    const user = await User.findOne({ where: { email } });
    
    if (user) {
      res.status(200).json({ username: user.username });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
