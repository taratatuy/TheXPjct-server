const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeStamp = new Schema({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

TimeStamp.set('toJSON', { virtuals: true });

module.exports = mongoose.model('TimeStampModel', TimeStamp);
