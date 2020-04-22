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

module.exports = { createTimeStamp, findTSMonth };
