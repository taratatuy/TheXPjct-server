const mongoose = require('mongoose');

const config = require('../config');

new Promise((resolve, reject) => {
  mongoose.Promise = global.Promise;

  mongoose.connection
    .on('error', (error) => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
      const info = mongoose.connections[0];
      console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });

  mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}).catch((err) => {
  console.log('Database connection error: ', err);
});

const methods = require('./_timeStampsMethods');

module.exports = { ...methods };
