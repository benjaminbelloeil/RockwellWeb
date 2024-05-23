import { connectPostgres } from '../../../../database/conn';
import User from '../../../../model/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  try {
    await connectPostgres();

    if (req.method === 'POST') {
      const { username, email, password } = req.body;

      // Standardize email
      const standardizedEmail = email.trim().toLowerCase();

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await User.create({ username, email: standardizedEmail, password: passwordHash });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Sign-up error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
