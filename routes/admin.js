var configDB = require('../config/database.js');
var middlewares = require('../utilities/middlewares');
var User = require('../models/user');


module.exports = function(app, passport) {
  app.get('/admin', middlewares.isAdmin, function(req, res) {

    User.find(function(err, users) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('admin', { user: req.user, users: users });
    });
  });

  app.get('/admin/seed',middlewares.isAdmin, function(req, res) {
    configDB.drop(function() {
      configDB.seed();
      res.json({message: 'db seeded successfully'});
    });
  });

  app.post('/admin/user/:id/role', middlewares.isAdmin, function(req, res) {
    var id = req.params.id;
    var role = req.body.role;
    User.findById(id, function(err, user) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(404);
      }
      user.role = role;
      user.save();
      res.sendStatus(202);
    });
  });
};
