import { connectPostgres } from '../../../database/conn';
import User from '../../../model/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  try {
    await connectPostgres();
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const email = session.user.email; // Get email from session
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(200).json({ username: user.username });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
