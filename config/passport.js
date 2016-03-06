var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

  // serialize user to session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
      User.findOne({ 'local.email' : email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          // user already exists
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser = new User();

          newUser.firstName = req.body['first-name'];
          newUser.lastName = req.body['last-name'];
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) {
              return done(err, false, req.flash('signupMessage', 'Error. Please try again later.'));
            }
            return done(null, newUser);
          });
        }
      });

  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    User.findOne({ 'local.email': email}, function(err, user) {
      if (err) {
        // error
        return done(err);
      }
      if (!user) {
        // user not found
        return done(null, false, req.flash('loginMessage', 'User not found.'));
      }
      if (!user.validPassword(password)) {
        // wrong password
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
      }
      // success
      return done(null, user);
    });
  }));
}
