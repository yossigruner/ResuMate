module.exports = function(app, passport) {
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage'), layout: null });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage'), layout: null });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
