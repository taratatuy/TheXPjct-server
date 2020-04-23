const database = require('../database');

async function createTS() {
  const now = new Date();

  await database.createTimeStamp(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    _clearTime(now)
  );

  await database.setLastCommitTime(now);
}

async function countTimesInMonth(year, month) {
  const foundInMonth = await database.findTSMonth(year, month);

  return _countTimes(foundInMonth);
}

async function countTimesInYear(year) {
  const foundInYear = await database.findTSYear(year);

  return _countTimes(foundInYear);
}

async function countDaysInMonth(year, month) {
  const foundInMonth = await database.findTSMonth(year, month);

  return _countDays(foundInMonth);
}

async function countDaysInYear(year) {
  const foundInYear = await database.findTSYear(year);

  return _countDays(foundInYear);
}

function _countTimes(historyArray) {
  return Array.from(historyArray).length;
}

function _countDays(historyArray) {
  let setOfDays = new Set();
  const array = Array.from(historyArray);

  array.forEach((commit) => {
    setOfDays.add(commit.day);
  });

  return setOfDays.size;
}

async function getAllTimeTS() {
  const output = await database.findAllTimeTS();

  return output;
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

function _clearTime(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = {
  createTS,
  getLastTime,
  countTimesInMonth,
  countTimesInYear,
  countDaysInMonth,
  countDaysInYear,
  getMonth,
  getYear,
  getAllTimeTS,
};
