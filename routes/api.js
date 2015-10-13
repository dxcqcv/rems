var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/restlogin.json', function(req, res, next) {

	request.post({url:'http://117.144.16.98:8080/rems/restlogin.json', form: {key:'value'}}, function(error,response,body){
		if (!error && response.statusCode == 200) {
	    	res.send(body);// Show the HTML for the Google homepage.
	  	}
	})
});

module.exports = router;