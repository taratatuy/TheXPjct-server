const express = require('express');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

let database = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/create', (req, res) => {
  database.createTimeStamp('111', '333', '333');
  res.status(200).end('Craeted!');
});

app.get('/find', async (req, res) => {
  let output = await database.findTSMonth('111', '222');
  res.status(200).send(output);
});

app.use('/auth', routes.auth);

app.listen(config.PORT, console.log(`Listening on ${config.PORT}`));
