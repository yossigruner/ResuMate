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
  }
}
