var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('login');
    // if (req.session.user) {
    //     res.redirect('/user/home');
    // }
    res.render('login', { title: '用户登录' });
})
.post('/', function(req, res) {
    var user={
        username: 'admin',
        password: 'admin'
    }
    if(req.body.username === user.username && req.body.password === user.password){
        res.redirect('/user/home');
    }
    res.redirect('/login');
});


module.exports = router;
