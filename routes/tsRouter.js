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

router.post('/countTimesInMonth', async (req, res) => {
  const output = await core.countTimesInMonth(req.body.year, req.body.month);
  res.status(200).json({ CountTimesInMonth: output });
});

router.post('/countTimesInYear', async (req, res) => {
  const output = await core.countTimesInYear(req.body.year);
  res.status(200).json({ CountTimesInYear: output });
});

router.post('/countDaysInMonth', async (req, res) => {
  const output = await core.countDaysInMonth(req.body.year, req.body.month);
  res.status(200).json({ CountDaysInMonth: output });
});

router.post('/countDaysInYear', async (req, res) => {
  const output = await core.countDaysInYear(req.body.year);
  res.status(200).json({ CountDaysInYear: output });
});

router.post('/findMonth', async (req, res) => {
  const output = await core.getMonth(req.body.year, req.body.month);
  res.status(200).send(output);
});

router.post('/findYear', async (req, res) => {
  const output = await core.getYear(req.body.year);
  res.status(200).send(output);
});

router.get('/findAllTime', async (req, res) => {
  const output = await core.getAllTimeTS();
  res.status(200).send(output);
});

router.get('/listOfYears', async (req, res) => {
  const output = await core.listOfYears();
  res.status(200).send(output);
});

router.post('/listOfMonthsInYear', async (req, res) => {
  const output = await core.listOfMonthsInYear(req.body.year);
  res.status(200).send(output);
});

module.exports = router;
