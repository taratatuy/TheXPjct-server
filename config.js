require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/TheXProject',
  PGPASS: process.env.PGPASS || 'admin',
};
