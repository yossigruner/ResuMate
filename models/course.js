var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  name: String,
  moodleId: String,
  skills: [String]
});

module.exports = mongoose.model('Course', courseSchema);
