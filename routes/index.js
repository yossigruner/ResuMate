var User = require('../models/user');
var middlewares = require('../utilities/middlewares')

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      var user = req.user;
      if (user.firstName == null || user.firstName == '') {
        res.redirect('/wizard');
      } else {
        User.findById(user.id).populate('courses').exec(function(err, user) {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          }
          if (!user) {
            return res.sendStatus(404);
          }
          if (user.role == 'Admin') {
            return res.redirect('/admin');
          }
          if (user.role == 'Lecturer') {
            return res.redirect('/courses');
          }
          var skills = getStudentSkills(user);
          res.render('resume', { user: user, skills: skills });
        });
      }
    } else {
      res.render('landing', { layout: null });
    }
  });

  app.get('/resume/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id).populate('courses').exec(function(err, user) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(404);
      }
      var skills = getStudentSkills(user);
      res.render('resume', { user: user, skills: skills, public: true });
    });

  });

  require('../routes/auth')(app, passport);
  require('../routes/wizard')(app, passport);
  require('../routes/courses')(app, passport);
  require('../routes/admin')(app, passport);

};

function getStudentSkills(user) {
  var studentSkills = {};
  for (var i=0;i<user.courses.length;i++) {
    var course = user.courses[i];
    for (var j=0;j<course.skills.length;j++) {
      var courseSkill = course.skills[j];
      if (studentSkills[courseSkill]) {
        studentSkills[courseSkill]+= 0.25;
        if (studentSkills[courseSkill] > 1) {
          studentSkills[courseSkill] = 1;
        }
      } else {
        studentSkills[courseSkill] = 0.25;
      }
    }
  }
  console.log('STUDENT SKILL');
  console.log(studentSkills);
  return studentSkills;
}
