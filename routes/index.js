
module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.render('resume', {
          user: req.user
        });
    } else {
      res.render('landing', { layout: null });
    }
  });

  var auth = require('../routes/auth')(app, passport);
};
