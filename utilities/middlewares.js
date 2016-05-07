/*
middleware example:
app.get('/url', isLoggedIn, function(req, res) {
  this will be executed only if last middleware returned next
});
*/

module.exports = {
  isLoggedIn: function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  },
  isAdmin: function isAdmin(req, res, next) {
    if (req.user && req.user.role == 'Admin') {
      return next();
    }
    res.redirect('/');
  },
  isLecturer: function isLecturer(req, res, next) {
    if (req.user) {
      if (req.user.role == 'Lecturer' || req.user.role == 'Admin') {
        return next();
      }
    }
    res.redirect('/');
  }
}
