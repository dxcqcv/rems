var express = require('express');
var request = require('request');
var moment = require('moment');
var router = express.Router();



/* GET users listing. */
router.get('/restlogin.json', function(req, res, next) {
	/*

	签名算法：
	MD5("username: "+用户名值 +"password: "+密码值+dataStr+secretKey)
	其中:
	dataStr为当前日期的字符串，格式为yyyy-MM-dd;
	secretKey为签名秘钥(*778@#￥5&*（*（{}*&$#)；签名秘钥必须和泛能云服务系统的一致。
	*/

	var today = moment().format('YYYY-MM-DD')
	//var data = "username:"+"enn_admin"+"password:"+"123456"+today+"*778@#￥5&*（*（{}*&$#";
	var data = "username:"+"enn_admin"+"password:"+"123456"+today;
	var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    var d = crypto.createHash("md5").update(str).digest("hex").toUpperCase();
	request.post({url:'http://117.144.16.98:8080/rems/login.json', form: {username:'enn_admin',password:'123456',sign:d}}, function(error,response,body){
		
	    	res.send(body);
	  	
	})
});

router.get('/gislist.json', function(req, res, next) {

	//request.post({url:'http://10.20.1.3:8080/rems/userInfo/list.json', form: {userKey:'cf76a0b9e6bae5b0a4e416754588328d',password:'123456'}}, function(error,response,body){
	request.post({url:'http://117.144.16.98:8080/rems/userInfo/list.json', form: {userKey:'f1bfbedfc2132f3ee5350377af98fb4c',password:'123456'}}, function(error,response,body){
		
	    	res.send(response);
	  	
	})
});


module.exports = router;
