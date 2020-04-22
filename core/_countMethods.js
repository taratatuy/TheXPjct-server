let database = require('../database');

async function createTS() {
  let now = new Date();

  await database.createTimeStamp(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    getClearTime(now)
  );
}

function getClearTime(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = { createTS };
