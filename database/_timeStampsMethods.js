const TimeStamp = require('./_timeStampsModel.js');

async function createTimeStamp(year, month, day, time) {
  await TimeStamp.create({
    year: year,
    month: month,
    day: day,
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
