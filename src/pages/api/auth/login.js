import { connectPostgres } from '../../../../database/conn';
import User from '../../../../model/User';

export default async function handler(req, res) {
  try {
    // Ensure connection to the database
    await connectPostgres();

    if (req.method === 'POST') {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check if password is correct
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Successful login
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Handle unsupported HTTP methods
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}