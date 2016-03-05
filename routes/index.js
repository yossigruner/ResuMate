var express = require('express');

module.exports = function(app, passport) {
  /* GET home page. */
  app.get('/', function(req, res) {
    res.render('landing', { title: 'Resumate', layout: null });
  });

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage'), layout: null });
  });

  // app.post('/login', do all our passport stuff here);

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage'), layout: null });
  });

  // app.post('/signup', do all our passport stuff here);

  app.get('/resume', isLoggedIn, function(req, res) {
    res.render('resume', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
