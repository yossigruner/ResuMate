var User = require('../models/user');
var middlewares = require('../utilities/middlewares')

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      var user = req.user;
      if (user.firstName == null || user.firstName == '') {
        res.redirect('/wizard');
      } else {
        res.render('resume', { user: user });
      }
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

  require('../routes/auth')(app, passport);
  require('../routes/wizard')(app, passport);

};
