var User = require('../models/user');
var middlewares = require('../utilities/middlewares')

module.exports = function(app, passport) {
  app.get('/wizard', middlewares.isLoggedIn, function(req, res) {
    res.render('wizard', {user: req.user});
  });

  app.post('/wizard', middlewares.isLoggedIn, function(req, res) {
    var userId = req.user.id;
    User.findById(userId, function(err, user) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(404);
      }
      parseBody(req.body, user);
      user.save(function(err) {
        if (err) {
          return res.sendStatus(500);
        }
        res.redirect('/');
      });
    });
  });
}

function parseBody(body, user) {
  user.firstName = body['first-name'];
  user.lastName = body['last-name'];
  user.aboutMe = body['about-me'];
  user.milestones = [];
  for (var i=0;i<3;i++) {
    if (body['milestone-name'][i] != null && body['milestone-name'][i] != '') {
      var milestone = {
        year: body['milestone-year'][i],
        name: body['milestone-name'][i],
        description: body['milestone-description'][i]
      };
      user.milestones.push(milestone);
    }
  }
  user.experience = [];
  for (var i=0;i<3;i++) {
    if (body['experience-company'][i] != null && body['experience-company'][i] != '') {
      var experience = {
        year: body['experience-year'][i],
        company: body['experience-company'][i],
        title: body['experience-title'][i],
        description: body['experience-description'][i]
      };
      user.experience.push(experience);
    }
  }
  user.hobbies = [];
  if (body.hobbies != null && body.hobbies != '') {
    user.hobbies = body.hobbies.replace(" ","").split(",");
  }
  user.languages = [];
  if (body.languages != null && body.languages != '') {
    user.languages = body.languages.replace(" ","").split(",");
  }
  user.phone = null;
  if (body.phone != null && body.phone != '') {
    user.phone = body.phone
  }
  user.twitter = null;
  if (body.twitter != null && body.twitter != '') {
    user.twitter = body.twitter;
  }
  user.facebook = null;
  if (body.facebook != null && body.facebook != '') {
    user.facebook = body.facebook;
  }
  user.skype = null;
  if (body.skype != null && body.skype != '') {
    user.skype = body.skype;
  }
}

/*
{ 'first-name': 'asdsa',
  'last-name': 'ljljh',
  'about-me': 'kjhkjhkj',
  'milestone-year': [ '2016', '2016', '2014' ],
  'milestone-name': [ 'asd', 'asd', 'asd' ],
  'milestone-description': [ 'asd', 'as', 'asd' ],
  'experience-year': [ '2013', '2012', '2013' ],
  'experience-company': [ 'asd', '', '' ],
  'experience-title': [ 'ads', 'asd', '' ],
  'experience-description': [ 'asd', '', 'asd' ],
  hobbies: 'das',
  languages: 'asd',
  phone: '12331',
  twitter: 'asdasd',
  facebook: 'asdasd',
  skype: 'asdad' }
  */
