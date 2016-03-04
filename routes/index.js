var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Resumate', layout: null });
});

/* GET resume */
router.get('/resume', function(req, res, next) {
  res.render('resume', { title: 'Resumate' });
});

module.exports = router;
