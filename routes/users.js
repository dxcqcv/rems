var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/home', function(req, res) {
    var user={
        username:'admin',
        password:'123456'
    }
    res.render('home', { title: 'Home', user: user });
});
router.get('/nxjc', function(req, res) {
    res.render('nxjc', { title: 'Home' });
});
router.get('/gyt', function(req, res) {
    res.render('gyt', { title: 'Home' });
});
router.get('/hc', function(req, res) {
    res.render('hightcharts', { title: 'Home' });
});
router.get('/xmgl', function(req, res) {
    res.render('xmgl', { title: 'Home' });
});

router.get('/sjjc', function(req, res) {
    res.render('sjjc', { title: 'Home' });
});
router.get('/cbfx', function(req, res) {
    res.render('cbfx', { title: 'Home' });
});

router.get('/nxfx', function(req, res) {
    
    res.render('nxfx', { title: 'Home' });
});
router.get('/nxfx2', function(req, res) {
    
    res.render('nxfx2', { title: 'Home' });
});

module.exports = router;
