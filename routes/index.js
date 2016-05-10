var User = require('../models/user');
var gravatar = require('gravatar');
var middlewares = require('../utilities/middlewares')

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      var user = req.user;
      if (user.firstName == null || user.firstName == '') {
        res.redirect('/wizard');
      } else {
        User.findById(user.id).populate('courses recommendations.author').exec(function(err, user) {
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
          var gravatarUrl = gravatar.url(user.local.email,{protocol: 'http', s: '250'});
          res.render('resume', { resume: user, user: user, skills: skills, gravatarUrl: gravatarUrl });
        });
      }
    } else {
      res.render('landing', { layout: null });
    }
  });

  app.get('/resume/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id).populate('courses recommendations.author').exec(function(err, user) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(404);
      }
      var skills = getStudentSkills(user);
      var pub = true;
      if (req.user) {
        if (req.user.role == 'Admin' || req.user.role == 'Lecturer') {
          pub = false;
        }
      }

      var gravatarUrl = gravatar.url(user.local.email,{protocol: 'http', s: '250'});
      res.render('resume', { user: req.user, skills: skills, public: pub, resume: user, gravatarUrl: gravatarUrl });
    });

  });

  app.post('/resume/:id/recommendations', middlewares.isLecturer, function(req, res, next) {
    var id = req.params.id;
    User.findById(id).exec(function(err, user) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(404);
      }
      var recommendation = {
        author: req.user.id,
        content: req.body.content
      };
      user.recommendations.push(recommendation);
      user.save();
      res.redirect('/resume/' + id);
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
  return studentSkills;
}
