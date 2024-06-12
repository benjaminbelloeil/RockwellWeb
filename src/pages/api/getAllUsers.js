import { connectPostgres } from '../../../database/conn';
import User from '../../../model/User';

export default async function handler(req, res) {
  try {
    await connectPostgres();
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'isAdmin']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
