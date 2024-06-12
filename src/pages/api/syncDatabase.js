import { sequelize } from '../../../database/conn';
import User from '../../../model/User';

export default async function handler(req, res) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all defined models to the DB
    await sequelize.sync({ alter: true }); // Use alter to avoid dropping existing tables
    console.log('All models were synchronized successfully.');

    res.status(200).json({ message: 'Database synced successfully' });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ error: 'Database sync failed', details: error.message });
  }
}
