const TimeStamp = require('../models').timeStampsModel;

async function createTimeStamp(year, month, day, time) {
  await TimeStamp.create({
    year: year,
    month: month,
    day: day,
    time: time,
  });
}

async function findAllTimeTS() {
  const output = await TimeStamp.find({});

  return output;
}

async function findTSMonth(year, month) {
  const output = await TimeStamp.find({
    year: year,
    month: month,
  });

  return output;
}

async function findTSYear(year) {
  const output = await TimeStamp.find({
    year: year,
  });

  return output;
}

module.exports = { createTimeStamp, findTSMonth, findTSYear, findAllTimeTS };
