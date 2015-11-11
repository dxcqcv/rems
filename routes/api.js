var express = require('express');
var request = require('request');
var moment = require('moment');
var router = express.Router();



/* 登录页面 */
//登录接口 【已通过】
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
	    		var user = {
			        username: req.body.username,
			        password: req.body.password,
			        token:result.status.data
			    };

			    req.session.user = user;

	    		res.redirect('/user/home');
	    	}else{
	    		res.redirect('/login');
	    	}
	  	
	})
});
/*首页页面*/
//首页获取项目列表接口 【已通过】

router.get('/gislist.json', function(req, res, next) {

	//request.post({url:'http://117.144.16.98:8080/rems/userInfo/list.json', form: {userKey:'cf76a0b9e6bae5b0a4e416754588328d',password:'123456'}}, function(error,response,body){
	request.post({url:'http://117.144.16.98:8080/rems/gislist.json', form: {userKey:req.session.user.token}}, function(error,response,body){
		
	console.log(req.query.projectid);
	    	res.send(body);
	  	
	})

});

//首页选择项目告知后台projectid的接口

router.get('/clickProject.json', function(req, res, next) {
	console.log("^^^^^^^^^^^^^^^^");
	console.log(req.query.projectid);
	request.post({url:'http://117.144.16.98:8080/rems/clickProject.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
	    	res.send(body);	
	})
});

/*项目预览页面*/
//项目预览页面接口
router.get('/projectOverview.json', function(req, res, next) {
	
	console.log("99999");
	request.post({url:'http://117.144.16.98:8080/rems/projectOverview.json', form: {userKey:req.session.user.token}}, function(error,response,body){
	    	res.send(body);	
	})
});

/*运行监测页面*/
//运行监测页面设备查询接口
router.get('/techCheck/equipments.json', function(req, res, next) {
	console.log("9898989898");
	console.log(req.query.projectid);
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/equipments.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面设备启停状态接口
router.get('/techCheck/equState.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/equState.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面验证系统角色名
router.get('/techCheck/equDatas.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/equDatas.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面供能耗能联合曲线数据
router.get('/techCheck/multiEnergy.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/multiEnergy.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面单个能源项曲线数据
router.get('/techCheck/singleEnergy.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/singleEnergy.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面单个能源项分解的设备层级能源项饼图数据
router.get('/techCheck/energyPie.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/energyPie.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面成本或收益的饼图数据
router.get('/techCheck/financePie.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/financePie.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//运行监测页面单个能源配额曲线数据
router.get('/techCheck/singleQuota.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/singleQuota.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

/*能效监测页面*/
//能效检测页面：获取系统指标 .3已通过】
router.get('/effiCheck/sysindex.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/sysindex.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//能效检测页面：气象信息监测实时数据（数据曲线）
router.get('/effiCheck/weatherInfo.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/weatherInfo.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//能效检测页面：气象信息监测即时数据（分钟数据）
router.get('/effiCheck/weatherInfoNow.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/weatherInfoNow.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//能效检测页面：供能耗能指标量数据
router.get('/effiCheck/energySourceValue.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/energySourceValue.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//能效检测页面：供能耗能能源种类接口 该接口提供项目耗能或者供能的能源种类数据信息
router.get('/effiCheck/energySourceType.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/energySourceType.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//能效检测页面：根据供能或者耗能指标编号、指标属性编号查询当天小时级实时数据
router.get('/effiCheck/energySourceChart.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/energySourceChart.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

/*项目信息管理页面*/
//项目信息管理页面：数据权限树
router.get('/projectmanagement/tree.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/projectmanagement/tree.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//项目信息管理页面：根据项目id查询COP
router.get('/project/baseinfo/cop.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/project/baseinfo/cop.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});




//工艺属性配置页面：初始化左侧数据
router.get('/craftProperty/listLeft.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/craftProperty/listLeft.json', form: {userKey:req.session.user.token, project:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});


//标准类管理页面：查询设备类
router.get('/clzMng/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzMng/list.json', form: {userKey:req.session.user.token, project:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});


//类属性页面：查询设备属性类
router.get('/clzpropMng/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzpropMng/list.json', form: {userKey:req.session.user.token, project:req.query.projectid, pageid:req.query.pageid,userid:req.query.userid}}, function(error,response,body){
	    	res.send(body);	
	})
});


//用户管理页面：查询所有用户信息
router.get('/userInfo/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/userInfo/list.json', form: {userKey:req.session.user.token, project:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//日志管理：日志管理--列表页面(分页
router.get('/logInfo/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/logInfo/list.json', form: {userKey:req.session.user.token,  page:req.query.page}}, function(error,response,body){
	    	res.send(body);	
	})
});









module.exports = router;
