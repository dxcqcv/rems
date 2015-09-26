var express = require('express');
var user = require('./users');
var login = require('./login');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/login', login);
router.use('/user', user);

module.exports = router;
