var configDB = require('../config/database.js');
var middlewares = require('../utilities/middlewares');

module.exports = function(app, passport) {
  app.get('/admin', middlewares.isAdmin, function(req, res) {
    res.render('admin', {user: req.user});
  });

  app.get('/admin/seed',middlewares.isAdmin, function(req, res) {
    configDB.drop(function() {
      configDB.seed();
      res.json({message: 'db seeded successfully'});
    });
  });
};
