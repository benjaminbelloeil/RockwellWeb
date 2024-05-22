// pages/api/auth/signup.js

const User = require('../../../../model/User');
import { connectPostgres } from '../../../../database/conn';

export default async function handler(req, res) {
  await connectPostgres();

  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // Check if user with the provided email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      // Create new user if email is not in use
      const newUser = await User.create({ username, email, password });
      res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
