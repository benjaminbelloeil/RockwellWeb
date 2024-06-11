import pg from 'pg';
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres://reto_grupo_3_user:FtBKbiPqR38D1AjTm3HPrMh6N1I096cs@dpg-cocksfnsc6pc73d1vsr0-a.oregon-postgres.render.com/reto_grupo_3', {
  dialectModule: pg,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync all models
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Unable to connect to the database');
  }
};

module.exports = { sequelize, connectPostgres };

