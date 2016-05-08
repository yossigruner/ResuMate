var Course = require('../models/course');
var User = require('../models/user');
var middlewares = require('../utilities/middlewares');

module.exports = function (app, passport){
  app.get('/courses', middlewares.isLecturer, function(req, res) {
    Course.find().sort('name').exec(function(err, courses) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('courses', { user: req.user, courses: courses });
    });

  });

  app.get('/courses/skills', function(req, res) {
    var skills = [];
    Course.find(function(err, courses) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      for (var i=0;i<courses.length;i++) {
        var course = courses[i];
        for (var j=0;j<course.skills.length;j++) {
          var skill = course.skills[j];
          if (skills.indexOf(skill) == -1) {
            skills.push(skill);
          }
        }
      }
      res.json(skills);
    });

  });

  app.get('/courses/:id', middlewares.isLecturer, function(req, res) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!course) {
        return res.sendStatus(404);
      }
      User.find({role: 'Student'})
          .sort({'lastName':1, 'firstName':1})
          .exec(function(err, students) {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        res.render('course', { user: req.user, course: course, students: students });
      });
    });
  });

  app.post('/courses/:id', middlewares.isLecturer, function(req, res) {
    var id = req.params.id;
    Course.findById(id, function(err, course) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!course) {
        return res.sendStatus(404);
      }
      course.skills = req.body.tags;
      course.save();
      updateStudents(course.id, req.body);
      res.redirect('/courses');
    });
  });
};

function updateStudents(courseId, body) {
  for(var prop in body) {
    if (prop.startsWith('student-')) {
      var studentId = prop.substring(8);
      User.findById(studentId)
            .exec(function(err, user) {
            if (err) {
              console.error(err);
            }
            if (!user) {
              return;
            }
            if (user.courses.indexOf(courseId) == -1) {
              user.courses.push(courseId);
              user.save();
            }
      });
    }
  }
}
