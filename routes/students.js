/**
 * Created by yossigruner on 17/12/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
