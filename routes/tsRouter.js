const express = require('express');
const core = require('../core');

const database = require('../database');
const config = require('../config.js');

const router = express.Router();

router.post('/create', async (req, res) => {
  if (config.PGPASS != req.body.password)
    return res.status(401).json({ res: 'Wrong password.' });

  await core.createTS();

  res.status(201).json({ res: 'Created.' });
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
