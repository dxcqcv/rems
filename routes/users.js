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
router.get('/gyjc', function(req, res) {
    res.render('gyt', { title: 'Home' });
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
router.get('/nxfx3', function(req, res) {
    res.render('nxfx3', { title: 'Home' });
});
router.get('/zdzn', function(req, res) {
    res.render('zdzn', { title: 'Home' });
});
router.get('/yyzd', function(req, res) {
    res.render('yyzd', { title: 'Home' });
});
router.get('/zdbg', function(req, res) {
    res.render('zdbg', { title: 'Home' });
});
router.get('/bgbj', function(req, res) {
    res.render('bgbj', { title: 'Home' });
});

router.get('/tbhb', function(req, res) {
    res.render('tbhb', { title: 'Home' });
});
router.get('/fxjl', function(req, res) {
    res.render('fxjl', { title: 'Home' });
});

module.exports = router;
