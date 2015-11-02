var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/home', function(req, res) {
    authentication(req, res);
    res.render('home', { title: 'Home', user: req.session.user });
});
router.get('/home2', function(req, res) {
    res.render('home2', { title: 'Home' });
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
router.get('/zbfx', function(req, res) {
    res.render('zbfx', { title: 'Home' });
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

router.get('/bb', function(req, res) {
    res.render('bb', { title: 'Home' });
});
router.get('/forgotten', function(req, res) {
    res.render('forgotten', { title: 'Home' });
});
router.get('/lsxgl', function(req, res) {
    res.render('lsxgl', { title: 'Home' });
});
router.get('/bzlgl', function(req, res) {
    res.render('bzlgl', { title: 'Home' });
});
router.get('/qxgl', function(req, res) {
    res.render('qxgl', { title: 'Home' });
});
router.get('/jgfx', function(req, res) {
    res.render('jgfx', { title: 'Home' });
});
router.get('/hnfx', function(req, res) {
    res.render('hnfx', { title: 'Home' });
});
router.get('/gnfx', function(req, res) {
    res.render('gnfx', { title: 'Home' });
});
router.get('/sbssgl', function(req, res) {
    res.render('sbssgl', { title: 'Home' });
});
router.get('/rzgl', function(req, res) {
    res.render('rzgl', { title: 'Home' });
});
router.get('/yhgl', function(req, res) {
    res.render('yhgl', { title: 'Home' });
});
router.get('/sfgl', function(req, res) {
    res.render('sfgl', { title: 'Home' });
});
router.get('/xmxxgl', function(req, res) {
    res.render('xmxxgl', { title: 'Home' });
});
router.get('/mkfx', function(req, res) {
    res.render('mkfx', { title: 'Home' });
});
router.get('/jzfx', function(req, res) {
    res.render('jzfx', { title: 'Home' });
});
router.get('/gysxpz', function(req, res) {
    res.render('gysxpz', { title: 'Home' });
});


function authentication(req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
}

module.exports = router;
