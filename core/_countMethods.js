const database = require('../database');

async function createTS() {
  const now = new Date();

  await database.createTimeStamp(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    getClearTime(now)
  );

  await database.setLastCommitTime(now);
}

async function getLastTime() {
  const output = await database.getLastCommitTime();

  return output;
}

function getClearTime(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = { createTS, getLastTime };
