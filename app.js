const express = require('express');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/timestamps', routes.timestamps);

app.listen(config.PORT, console.log(`Listening on ${config.PORT}`));
