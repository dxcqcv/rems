var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/restlogin.json', function(req, res, next) {

	request.post({url:'http://10.20.1.3:8080/rems/login.json', form: {username:'enn_admin',password:'123456',sign:"b039e34c65cdde6288ef86d340784a4f"}}, function(error,response,body){
		
	    	res.send(body);
	  	
	})
});

router.get('/gislist.json', function(req, res, next) {

	request.post({url:'http://10.20.1.3:8080/rems/userInfo/list.json', form: {username:'enn_admin',password:'123456'}}, function(error,response,body){
		
	    	res.send(response);
	  	
	})
});


module.exports = router;