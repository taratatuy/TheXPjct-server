const express = require('express');

const database = require('../database');
const config = require('../config.js');

const router = express.Router();

router.post('/create', async (req, res) => {
  // console.log(config.PGPASS, req.body);
  if (config.PGPASS != req.body.password)
    return res.status(200).json({ res: 'wrong password' });

  await database.createTimeStamp(req.body.year, req.body.month, req.body.time);

  res.status(200).json({ res: 'Logged in!' });
});

router.post('/findMonth', async (req, res) => {
  let output = await database.findTSMonth(req.body.year, req.body.month);

  res.status(200).send(output);
});

router.post('/findYear', async (req, res) => {
  let output = await database.findTSYear(req.body.year);

  res.status(200).send(output);
});

module.exports = router;
