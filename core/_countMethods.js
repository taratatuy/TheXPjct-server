const database = require('../database');

async function createTS() {
  const now = new Date();

  await database.createTimeStamp(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    _clearTime(now)
  );

  await database.setLastCommitTime(
    _parseDate({
      year: now.getUTCFullYear(),
      month: now.getUTCMonth(),
      day: now.getUTCDate(),
      time: _clearTime(now),
    }).toISOString()
  );
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
  const setOfDays = new Set();
  const array = Array.from(historyArray);

  array.forEach((commit) => {
    setOfDays.add(`${commit.day} ${commit.month}`);
  });

  return setOfDays.size;
}

async function listOfYears() {
  const listOfYears = new Set();
  const array = Array.from(await database.findAllTimeTS());

  array.forEach((commit) => {
    listOfYears.add(commit.year);
  });

  return [...listOfYears];
}

async function listOfMonthsInYear(year) {
  const listOfMonths = new Set();
  const array = Array.from(await database.findTSYear(year));

  array.forEach((commit) => {
    listOfMonths.add(commit.month);
  });

  return [...listOfMonths];
}

async function getLastTime() {
  const output = await database.getLastCommitTime();

  return output;
}

async function getMonth(year, month) {
  const monthHistory = await database.findTSMonth(year, month);

  return { findMonth: _commitsHistoryToDateArray(monthHistory) };
}

async function getYear(year) {
  const yearHistory = await database.findTSYear(year);

  return { findYear: _commitsHistoryToDateArray(yearHistory) };
}

async function getAllTimeTS() {
  const allTimeHistory = await database.findAllTimeTS();

  return { findAllTime: _commitsHistoryToDateArray(allTimeHistory) };
}

async function getMinTimeBetweenMonth(year, month) {
  const monthHistory = await database.findTSMonth(year, month);
  const timeBetweenArray = _getTimeBetween(monthHistory);
  const min = Math.min(...timeBetweenArray);

  return _msToDate(min);
}

async function getMaxTimeBetweenMonth(year, month) {
  const monthHistory = await database.findTSMonth(year, month);
  const timeBetweenArray = _getTimeBetween(monthHistory);

  const max = Math.max(...timeBetweenArray);

  return _msToDate(max);
}

async function getAVGTimeBetweenMonth(year, month) {
  const monthHistory = await database.findTSMonth(year, month);
  const timeBetweenArray = _getTimeBetween(monthHistory);

  let summary = 0;
  timeBetweenArray.forEach((TS) => {
    summary += TS;
  });

  return _msToDate(summary / timeBetweenArray.length);
}

async function getMinTimeBetweenYear(year) {
  const yearHistory = await database.findTSYear(year);
  const timeBetweenArray = _getTimeBetween(yearHistory);
  const min = Math.min(...timeBetweenArray);

  return _msToDate(min);
}

async function getMaxTimeBetweenYear(year) {
  const yearHistory = await database.findTSYear(year);
  const timeBetweenArray = _getTimeBetween(yearHistory);

  const max = Math.max(...timeBetweenArray);

  return _msToDate(max);
}

async function getAVGTimeBetweenYear(year) {
  const yearHistory = await database.findTSYear(year);
  const timeBetweenArray = _getTimeBetween(yearHistory);

  let summary = 0;
  timeBetweenArray.forEach((TS) => {
    summary += TS;
  });

  return _msToDate(summary / timeBetweenArray.length);
}

function _getTimeBetween(history) {
  const historyArray = Array.from(history);
  const timeBetweenArray = [];
  let prevDate;

  historyArray.forEach((commit) => {
    if (!prevDate) {
      prevDate = _parseDate(commit);
      return;
    }

    const timeBetween = _parseDate(commit) - prevDate;
    prevDate = _parseDate(commit);
    timeBetweenArray.push(timeBetween);
  });

  return timeBetweenArray;
}

function _commitsHistoryToDateArray(history) {
  const historyArray = Array.from(history);
  const dateArray = [];

  historyArray.forEach((commit) => {
    dateArray.push(_parseDate(commit));
  });

  return dateArray;
}

function _parseDate(timeStamp) {
  const GMT = 3;
  let parsedTime = timeStamp.time.split(':');
  return new Date(
    timeStamp.year,
    timeStamp.month,
    timeStamp.day,
    (+parsedTime[0] + GMT) % 24,
    parsedTime[1],
    parsedTime[2]
  );
}

function _msToDate(ms) {
  const msMinute = 60 * 1000;
  const msHour = 60 * msMinute;
  const msDay = 24 * msHour;

  const days = parseInt(ms / msDay, 10);
  const hours = parseInt((ms % msDay) / msHour, 10);
  const minuts = parseInt(((ms % msDay) % msHour) / msMinute, 10);
  const seconds = parseInt((((ms % msDay) % msHour) % msMinute) / 1000, 10);

  let output = '';
  if (days != 0) {
    output += `${days} day(s) `;
  }
  output += `${hours}:${minuts}:${seconds}`;

  return output;
}

function _clearTime(date) {
  return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
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
  listOfYears,
  listOfMonthsInYear,
  getMinTimeBetweenMonth,
  getMaxTimeBetweenMonth,
  getAVGTimeBetweenMonth,
  getMinTimeBetweenYear,
  getMaxTimeBetweenYear,
  getAVGTimeBetweenYear,
};
