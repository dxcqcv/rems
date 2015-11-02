var express = require('express');
var request = require('request');
var moment = require('moment');
var router = express.Router();



/* GET users listing. */
router.post('/login.json', function(req, res, next) {
	/*

	签名算法：
	MD5("username: "+用户名值 +"password: "+密码值+dataStr+secretKey)
	其中:
	dataStr为当前日期的字符串，格式为yyyy-MM-dd;
	secretKey为签名秘钥(*778@#￥5&*（*（{}*&$#)；签名秘钥必须和泛能云服务系统的一致。
	*/

	var today = moment().format('YYYY-MM-DD')
	//var data = "username:"+"enn_admin"+"password:"+"123456"+today+"*778@#￥5&*（*（{}*&$#";
	var data = "username:"+req.body.username+"password:"+req.body.password+today;
	var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    var d = crypto.createHash("md5").update(str).digest("hex").toUpperCase();
	request.post({url:'http://117.144.16.98:8080/rems/login.json', form: {username:req.body.username,password:req.body.password,sign:d}}, function(error,response,body){
	    	//res.send(body);
	    	var result = JSON.parse(body); 
	    	if (result.status.code == 200) {
<<<<<<< Updated upstream
            console.log(result.status.data)
=======
	    		var user = {
			        username: req.body.username,
			        password: req.body.password,
			        token:result.status.data
			    };
			    req.session.user = user;
>>>>>>> Stashed changes
	    		res.redirect('/user/home');
	    	}else{
	    		res.redirect('/login');
	    	}
	  	
	})
});

router.get('/gislist.json', function(req, res, next) {

	//request.post({url:'http://10.20.1.3:8080/rems/userInfo/list.json', form: {userKey:'cf76a0b9e6bae5b0a4e416754588328d',password:'123456'}}, function(error,response,body){
	request.post({url:'http://117.144.16.98:8080/rems/gislist.json', form: {userKey:'f1bfbedfc2132f3ee5350377af98fb4c',password:'123456'}}, function(error,response,body){
		
	    	res.send(response);
	  	
	})
});


module.exports = router;
