const CurrentStats = require('../models').currentStatsModel;

async function setLastCommitTime(date) {
  await CurrentStats.updateOne(
    {
      unicCode: '1',
    },
    { lastCommitTime: date },
    {
      upsert: true,
    }
  );
}

async function getLastCommitTime() {
  let output = await CurrentStats.findOne({
    unicCode: '1',
  });

  return output.lastCommitTime;
}

module.exports = { setLastCommitTime, getLastCommitTime };
