var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/restlogin.json', function(req, res, next) {

	request.post({url:'http://10.20.1.169:8080/rems/innerlogin.json', form: {username:'enn_admin',password:'123456'}}, function(error,response,body){
		
	    	res.send(body);
	  	
	})
});

router.get('/gislist.json', function(req, res, next) {

	request.post({url:'http://10.20.1.169:8080/rems/gislist.json', form: {username:'enn_admin',password:'123456'}}, function(error,response,body){
		
	    	res.send(response);
	  	
	})
});


module.exports = router;