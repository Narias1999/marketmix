require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  db: {
    credentials: {
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
    dialect: 'postgres',
    timezone: '-05:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

module.exports = config;
