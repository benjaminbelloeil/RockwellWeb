import { connectPostgres } from '../../../database/conn';
import User from '../../../model/User';
import { getSession } from 'next-auth/react';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  try {
    await connectPostgres();
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { newPassword } = req.body;
    const email = session.user.email; // Get email from session

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
