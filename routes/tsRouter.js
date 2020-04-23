const express = require('express');
const core = require('../core');

const config = require('../config.js');

const router = express.Router();

router.post('/create', async (req, res) => {
  if (config.PGPASS != req.body.password)
    return res.status(401).json({ res: 'Wrong password.' });

  await core.createTS();

  res.status(201).json({ res: 'Created.' });
});

router.get('/lastCommitTime', async (req, res) => {
  const output = await core.getLastTime();
  res.status(200).json({ lastCommitTime: output });
});

router.post('/countInMonth', async (req, res) => {
  const output = await core.countInMonth(req.body.year, req.body.month);
  res.status(200).json({ CountInMonth: output });
});

router.post('/countInYear', async (req, res) => {
  const output = await core.countInYear(req.body.year);
  res.status(200).json({ CountInYear: output });
});

router.post('/findMonth', async (req, res) => {
  const output = await core.getMonth(req.body.year, req.body.month);
  res.status(200).send(output);
});

router.post('/findYear', async (req, res) => {
  const output = await core.getYear(req.body.year);
  res.status(200).send(output);
});

module.exports = router;
