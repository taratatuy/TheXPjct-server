const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentStats = new Schema({
  unicCode: {
    type: String,
    required: true,
  },
  lastCommitTime: {
    type: String,
    required: true,
  },
});

CurrentStats.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CurrentStatsModel', CurrentStats);
