const database = require('../database');

async function createTS() {
  const now = new Date();

  await database.createTimeStamp(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    ClearTime(now)
  );

  await database.setLastCommitTime(now);
}

async function countInMonth(year, month) {
  const foundInMonth = await database.findTSMonth(year, month);

  return countTimes(foundInMonth);
}

async function countInYear(year) {
  const foundInMonth = await database.findTSYear(year);

  return countTimes(foundInMonth);
}

async function countTimes(array) {
  return Array.from(array).length;
}

async function getLastTime() {
  const output = await database.getLastCommitTime();

  return output;
}

async function getMonth(year, month) {
  const output = await database.findTSMonth(year, month);

  return output;
}

async function getYear(year) {
  const output = await database.findTSYear(year);

  return output;
}

function ClearTime(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = {
  createTS,
  getLastTime,
  countInMonth,
  countInYear,
  getMonth,
  getYear,
};
