const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  instructor: { type: String, required: true },
  link: { type: String, required: true }
});

module.exports = mongoose.model('LiveClass', liveClassSchema);