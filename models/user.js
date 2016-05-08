var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = Schema({
  firstName: String,
  lastName: String,
  role: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  aboutMe: String,
  milestones: [],
  experience: [],
  hobbies: [String],
  languages: [String],
  phone: String,
  twitter: String,
  facebook: String,
  skype: String,
  local: {
    email: String,
    password: String
  },
  recommendations: [{
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    content: String
  }]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
