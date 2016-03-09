var User = require('../models/user');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      console.log(req.user.id);
      res.render('resume', {
        user: req.user
      });
    } else {
      res.render('landing', { layout: null });
    }
  });

  app.get('/resume/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(404);
      }
      res.render('resume', { user: user, public: true });
    });

  });

  app.get('/wizard', function(req, res, next) {
    res.render('wizard');
  });

  var auth = require('../routes/auth')(app, passport);
};
