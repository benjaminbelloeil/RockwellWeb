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

    const { newEmail } = req.body;
    const email = session.user.email; // Get email from session

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.email = newEmail;
    await user.save();

    return res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error updating email:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
