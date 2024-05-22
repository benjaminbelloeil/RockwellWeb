import bcrypt from 'bcryptjs';
import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      const result = await query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, password]
      );

      // Return the inserted user data
      res.status(201).json({ user: result.rows[0] });
    } catch (error) {
      // Handle errors
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Error signing up. Please try again later.' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ message: 'Method not allowed' });
  }
}
