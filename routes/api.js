var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/restlogin.json', function(req, res, next) {

	request.post({url:'http://10.20.1.3:8080/rems/login.json', form: {username:'enn_admin',password:'123456',sign:"111f0e39fa94feb929d86408b28b4e67"}}, function(error,response,body){
		
	    	res.send(body);
	  	
	})
});

router.get('/gislist.json', function(req, res, next) {

	//request.post({url:'http://10.20.1.3:8080/rems/userInfo/list.json', form: {userKey:'cf76a0b9e6bae5b0a4e416754588328d',password:'123456'}}, function(error,response,body){
	request.post({url:'http://117.144.16.98:8080/rems/userInfo/list.json', form: {userKey:'1050968904E70C9DB87CACE007F6A478',password:'123456'}}, function(error,response,body){
		
	    	res.send(response);
	  	
	})
});


module.exports = router;
