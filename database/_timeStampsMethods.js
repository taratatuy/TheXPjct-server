const TimeStamp = require('./_timeStampsModel.js');

async function createTimeStamp(year, month, time) {
  await TimeStamp.create({
    year: year,
    month: month,
    time: time,
  });
}

async function findTSMonth(year, month) {
  let output = await TimeStamp.find({
    year: year,
    month: month,
  });

  return output;
}

async function findTSYear(year) {
  let output = await TimeStamp.find({
    year: year,
  });

  return output;
}

module.exports = { createTimeStamp, findTSMonth, findTSYear };
