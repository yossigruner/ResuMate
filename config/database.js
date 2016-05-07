var User = require('../models/user');
var Course = require('../models/course');

module.exports = {
  'url': process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/resumate',
  drop: function(next) {
    console.log('Dropping db');
    User.remove({}, function(err) {
      Course.remove({}, function(err) {
        return next();
      });
    });
  },
  seed: function() {
    seedUsers();
    seedCourses();
  }
};

function seedUsers() {
  // user seed
  User.find(function(err, users) {
    if (err) {
      console.error(err);
      return;
    }

    if (users.length == 0) {
      console.log('Seeding users');
      var admin = new User();
      admin.firstName = "Admin";
      admin.lastName = "Admin";
      admin.local.email = "admin@admin.com";
      admin.local.password = admin.generateHash("1234");
      admin.role = "Admin";
      admin.save();
      var lec1 = new User();
      lec1.firstName = "Mr";
      lec1.lastName = "Lecturer";
      lec1.local.email = "lec1@lec1.com";
      lec1.local.password = lec1.generateHash("1234");
      lec1.role = "Lecturer";
      lec1.save();
      var oron = new User();
      oron.firstName = "Oron";
      oron.lastName = "Ben Zvi";
      oron.local.email = "oron@oron.com";
      oron.local.password = oron.generateHash("1234");
      oron.role = "Student";
      oron.aboutMe = "Hi my name is Oron and I am a 3rd year Computer Science student at the College of Management, Today I am also an android developer in a small startup company that is creating the next luxury smartphone. Before that I was a team leader at the the biggest Telecom company in the USA -AT&T.";
      oron.experience = [
        {year: "2016", company: "Sirin Mobile", title: "Android Developer"},
        {year: "2013", company: "ATT", title: "Android Team Leader"},
        {year: "2011", company: "Mominis", title: "Web Developer"}
      ];
      oron.milestones = [
        {year: "2016", name: "Final Project", description: "Resumate - Public page for each student"},
        {year: "2015", name: "Network Lab", description: "Messagers over TCP/UDP"},
        {year: "2015", name: "Cyber Lab", description: "Create Cyber attacks "},
      ];
      oron.hobbies = ["Android", "Web", "Code", "Soccer", "Gaming", "Mobile"];
      oron.languages = ["English", "Hebrew"];
      oron.facebook = "yossigruner";
      oron.phone = "+972523551288";
      oron.skype = "yossi_gr";
      oron.twitter = "yossigruner";
      oron.save();
      var adi = new User();
      adi.firstName = "Adi";
      adi.lastName = "Volkovitz";
      adi.local.email = "adi@adi.com";
      adi.local.password = adi.generateHash("1234");
      adi.role = "Student";
      adi.aboutMe = "Hi my name is Oron and I am a 3rd year Computer Science student at the College of Management, Today I am also an android developer in a small startup company that is creating the next luxury smartphone. Before that I was a team leader at the the biggest Telecom company in the USA -AT&T.";
      adi.experience = [
        {year: "2016", company: "Sirin Mobile", title: "Android Developer"},
        {year: "2013", company: "ATT", title: "Android Team Leader"},
        {year: "2011", company: "Mominis", title: "Web Developer"}
      ];
      adi.milestones = [
        {year: "2016", name: "Final Project", description: "Resumate - Public page for each student"},
        {year: "2015", name: "Network Lab", description: "Messagers over TCP/UDP"},
        {year: "2015", name: "Cyber Lab", description: "Create Cyber attacks "},
      ];
      adi.hobbies = ["Android", "Web", "Code", "Soccer", "Gaming", "Mobile"];
      adi.languages = ["English", "Hebrew"];
      adi.facebook = "yossigruner";
      adi.phone = "+972523551288";
      adi.skype = "yossi_gr";
      adi.twitter = "yossigruner";
      adi.save();
      var yossi = new User();
      yossi.firstName = "Yossi";
      yossi.lastName = "Gruner";
      yossi.local.email = "yossi@yossi.com";
      yossi.local.password = yossi.generateHash("1234");
      yossi.role = "Student";
      yossi.aboutMe = "Hi my name is Oron and I am a 3rd year Computer Science student at the College of Management, Today I am also an android developer in a small startup company that is creating the next luxury smartphone. Before that I was a team leader at the the biggest Telecom company in the USA -AT&T.";
      yossi.experience = [
        {year: "2016", company: "Sirin Mobile", title: "Android Developer"},
        {year: "2013", company: "ATT", title: "Android Team Leader"},
        {year: "2011", company: "Mominis", title: "Web Developer"}
      ];
      yossi.milestones = [
        {year: "2016", name: "Final Project", description: "Resumate - Public page for each student"},
        {year: "2015", name: "Network Lab", description: "Messagers over TCP/UDP"},
        {year: "2015", name: "Cyber Lab", description: "Create Cyber attacks "},
      ];
      yossi.hobbies = ["Android", "Web", "Code", "Soccer", "Gaming", "Mobile"];
      yossi.languages = ["English", "Hebrew"];
      yossi.facebook = "yossigruner";
      yossi.phone = "+972523551288";
      yossi.skype = "yossi_gr";
      yossi.twitter = "yossigruner";
      yossi.save();
    }

  });
}

function seedCourses() {
  // course seed
  Course.find(function(err, courses) {
    if (err) {
      console.error(err);
      return;
    }
    if (courses.length == 0) {
      console.log('Seeding courses');
      new Course({name: 'Linear Algebra', moodleId: null, skills: ['Math']}).save();
      new Course({name: 'Java Introduction', moodleId: null, skills: ['Java', 'Eclipse', 'OOP']}).save();
      new Course({name: 'Robotics', moodleId: null, skills: ['C++', 'Eclipse']}).save();
      new Course({name: 'Algorithms 1', moodleId: null, skills: ['Algorithms']}).save();
      new Course({name: 'Algorithms 2', moodleId: null, skills: ['Algorithms']}).save();
    }
  });
}
