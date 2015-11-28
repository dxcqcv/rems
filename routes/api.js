var express = require('express');
var request = require('request');
var moment = require('moment');
var router = express.Router();
var remoteApiHost = "http://117.144.16.98:8080";
var remoteApiPath = "/rems";



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

	var today = moment().format('YYYY-MM-DD');
	//var data = "username:"+"enn_admin"+"password:"+"123456"+today+"*778@#￥5&*（*（{}*&$#";
	var data = "username:"+req.body.username+"password:"+req.body.password+today;
	var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    var d = crypto.createHash("md5").update(str).digest("hex").toUpperCase();
	request.post({url:'http://117.144.16.98:8080/rems/login.json', form: {username:req.body.username,password:req.body.password,sign:d}}, function(error,response,body){
	    	//res.send(body);
	    	console.log(body);
	    	console.log("*******************");
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
	  	
	});
});
/*首页页面*/
//首页获取项目列表接口 【已通过】

router.get('/gislist.json', function(req, res, next) {


	request.post({url:'http://117.144.16.98:8080/rems/gislist.json', form: {userKey:req.session.user.token}}, function(error,response,body){
		
	console.log(req.query.projectid);
	    	res.send(body);
	  	
	});

});
router.get('/features.json', function(req, res, next) {


	request.post({url:'http://117.144.16.98:8080/rems/features.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
		
	console.log(req.query.projectid);
	    	res.send(body);
	  	
	});

});
router.get('/gislist_features.json', function(req, res, next) {


	request.post({url:'http://117.144.16.98:8080/rems/gislist_features.json', form: {userKey:req.session.user.token}}, function(error,response,body){
		
	console.log(req.query.projectid);
	    	res.send(body);
	  	
	});

});

//首页选择项目告知后台projectid的接口

router.get('/clickProject.json', function(req, res, next) {
	console.log("^^^^^^^^^^^^^^^^");
	console.log(req.query.projectid);
	request.post({url:'http://117.144.16.98:8080/rems/clickProject.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
	    	res.send(body);	

	});
});

/*项目预览页面*/
//项目预览页面接口
router.get('/projectOverview.json', function(req, res, next) {
	
	console.log("99999");
	request.post({url:'http://117.144.16.98:8080/rems/projectOverview.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
	    	//res.send(body);	
	    	var result = JSON.parse(body); 
	    	console.log(result);
	    	if (result.status.code == 200) {
	    		var realdata = result.status.data.list;
	    		var xmgl = [];
	    		for (var i = 0; i < realdata.length; i++) {
	    			xmgl[i] = {};
	    			if(realdata[i].overviewclass == '1'){
	    				xmgl[i].name = "项目现状";
	    			}else if (realdata[i].overviewclass == '2') {
	    				xmgl[i].name = "设计思路";
	    			}else if (realdata[i].overviewclass == '3') {
	    				xmgl[i].name = "实施方案";
	    			}else if (realdata[i].overviewclass == '4') {
	    				xmgl[i].name = "运行";
	    			}else{
	    				xmgl[i].name = "未知菜单";
	    			}

	    			if(realdata[i].dataclass == '1'){
	    				xmgl[i].dataclass = "vedio";
	    			}else if (realdata[i].dataclass == '2') {
	    				xmgl[i].dataclass = "flash";
	    			}else if (realdata[i].dataclass == '3') {
	    				xmgl[i].dataclass = "picture";
	    			}else if (realdata[i].dataclass == '4') {
	    				xmgl[i].dataclass = "html";
	    			}else{
	    				xmgl[i].dataclass = "未知类型";
	    			}
	    			
	    			xmgl[i].path = remoteApiHost + remoteApiPath + realdata[i].datapath;
	    			
	    				
	    		}

	    		var data = {
			        "xmgl": xmgl
			        
			    };
			    res.send(data);
	    			

	    		
	    	}else{
	    		res.send("{error:'请求API错误'}");
	    	}
	});
});

/*运行监测页面*/
//运行监测页面设备查询接口
router.get('/techCheck/equLabellist.json', function(req, res, next) {
	console.log("9898989898");
	console.log(req.query.projectid);
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/equLabellist.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});
//动态列表

router.get('/techCheck/insLabellist.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/insLabellist.json', form: {userKey:req.session.user.token, classinstanceid:req.query.classinstanceid}}, function(error,response,body){
	    	res.send(body);	
	});
});
//动态列表对应值
router.get('/techCheck/insData.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/insData.json', form: {userKey:req.session.user.token, classinstanceid:req.query.classinstanceid}}, function(error,response,body){
	    	res.send(body);	
	});
});
//动态列表对应图表
router.get('/techCheck/insDatas.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/insDatas.json', form: {userKey:req.session.user.token, classinstanceid:req.query.classinstanceid,classpropertyid:req.query.classpropertyid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面设备启停状态接口
router.get('/techCheck/equState.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/equState.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面验证系统角色名
router.get('/techCheck/equDatas.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/equDatas.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面供能耗能联合曲线数据
router.get('/techCheck/multiEnergy.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/multiEnergy.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面单个能源项曲线数据
router.get('/techCheck/singleEnergy.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/singleEnergy.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面单个能源项分解的设备层级能源项饼图数据
router.get('/techCheck/energyPie.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/energyPie.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面成本或收益的饼图数据
router.get('/techCheck/financePie.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/financePie.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//运行监测页面单个能源配额曲线数据
router.get('/techCheck/singleQuota.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/techCheck/singleQuota.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

/*能效监测页面*/
//能效检测页面：获取系统指标 .3已通过】
router.get('/effiCheck/sysindex.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/sysindex.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//能效检测页面：气象信息监测实时数据（数据曲线）
router.get('/effiCheck/weatherInfo.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/weatherInfo.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//能效检测页面：气象信息监测即时数据（分钟数据）
router.get('/effiCheck/weatherInfoNow.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/weatherInfoNow.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
});

//能效检测页面：供能耗能指标量数据
router.get('/effiCheck/energySourceValue.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/effiCheck/energySourceValue.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, pageid:req.query.pageid}}, function(error,response,body){
	    	res.send(body);	
	});
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
	console.log(req.session.user);
	// request.post({url:'http://117.144.16.98:8080/rems/clzMng/list.json', form: {userKey:req.session.user.token, clzTypeid:req.query.clzTypeid, clzPid:req.query.clzPid, clzName:req.query.clzName, userid:req.query.userid}}, function(error,response,body){
	//     	res.send(body);	
	// })
});


//类属性页面：查询设备属性类
router.get('/clzpropMng/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzpropMng/list.json', form: {userKey:req.session.user.token,userid:req.query.userid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//类属性页面：添加设备（加载数据）
router.get('/clzpropMng/addInput.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzpropMng/addInput.json', form: {userKey:req.session.user.token,userid:req.query.userid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//类属性页面：加载标准类
router.get('/clzpropMng/loadStandardclass.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzpropMng/loadStandardclass.json', form: {userKey:req.session.user.token,typeid:req.query.typeid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//类属性页面：初始化查询依据
router.get('/clzpropMng/findByForm.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzpropMng/findByForm.json', form: {userKey:req.session.user.token,pclzid:req.query.pclzid,propTypeid:req.query.propTypeid,isdynamic:req.query.isdynamic,propName:req.query.propName}}, function(error,response,body){
	    	res.send(body);	
	})
});

//类属性页面：初始化查询依据
router.get('/clzpropMng/initSelections.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzpropMng/initSelections.json', form: {userKey:req.session.user.token,userid:req.query.userid}}, function(error,response,body){
	    	res.send(body);	
	})
});


//类属性管理页面
router.get('/clzMng/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzMng/list.json', form: {userKey:req.session.user.token, projectid:req.query.projectid}}, function(error,response,body){
	    	res.send(body);	
	})
});

//类属性管理页面和标准类管理页面共用：查询设备类
router.get('/clzMng/page.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/clzMng/page.json', form: {userKey:req.session.user.token}}, function(error,response,body){
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


//工艺属性配置：初始化左侧数据
router.get('/craftProperty/listLeft.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/craftProperty/listLeft.json', form: {userKey:req.session.user.token,  project:req.query.projectid}}, function(error,response,body){
	    	res.send(body);	
	})
});



//项目管理页面：初始化左侧数据
router.get('/projectmanagement/tree.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/projectmanagement/tree.json', form: {userKey:req.session.user.token}}, function(error,response,body){
	    	res.send(body);	
	})
});

//项目管理页面：列表查询 根据左侧树查询
router.get('/projectmanagement/lists.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/projectmanagement/lists.json', form: {userKey:req.session.user.token, page:req.query.page, id:req.query.id, rating:req.query.rating}}, function(error,response,body){
	    	res.send(body);	
	})
});


//同比环比页面：耗能-同比分析
router.get('/CSInfo/expend/list1.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/CSInfo/expend/list1.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, dateFlag:req.query.dateFlag, dateStar:req.query.dateStar}}, function(error,response,body){
	    	//res.send(body);	
			//console.log(req.session.user.token)
             var result = JSON.parse(body); 
             console.log(result);
             if (result.status.code == 200) {
                 var realdata = result.status.data.currentList;
                 var olddata = result.status.data.oldList;
                 var sData = new Array();
                 var sDataElement = new Object();
                 sDataElement.name = "新";
                 sDataElement.data = new Array();

                 var sDataElementOld = new Object();
                 sDataElementOld.name = "旧";
                 sDataElementOld.data = new Array();
                 var temp = new Object();

                 for (var i = 0; i < realdata.length; i++) {
                     console.log(realdata[i].projectId);
                         //按照：xData: ['耗气','耗电','耗水','耗蒸汽'] 循环
                      if (realdata[i].showName == '耗气') {
                          //则放在第一个：
                          temp.name = "耗气";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }else if (realdata[i].showName == '耗电') {
                          //则放在第一个：
                          temp.name = "耗电";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }else if (realdata[i].showName == '耗水') {
                          //则放在第一个：
                          temp.name = "耗水";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }else if (realdata[i].showName == '耗蒸汽') {
                          //则放在第一个：
                          temp.name = "耗蒸汽";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }
                        
                 }

                 for (var j = 0; j < olddata.length; j++) {
                     console.log(olddata[j].projectId);
                         //按照：xData: ['耗气','耗电','耗水','耗蒸汽'] 循环
                      if (olddata[j].showName == '耗气') {
                          //则放在第一个：
                          temp.name = "耗气";
                          temp.y = parseFloat(olddata[j].dataValue);
                          sDataElementOld.data.push(temp);
                      }else if (olddata[j].showName == '耗电') {
                          //则放在第一个：
                          temp.name = "耗电";
                          temp.y = parseFloat(olddata[j].dataValue);
                          sDataElementOld.data.push(temp);
                      }else if (olddata[j].showName == '耗水') {
                          //则放在第一个：
                          temp.name = "耗水";
                          temp.y = parseFloat(olddata[j].dataValue);
                          sDataElementOld.data.push(temp);
                      }else if (olddata[j].showName == '耗蒸汽') {
                          //则放在第一个：
                          temp.name = "耗蒸汽";
                          temp.y = parseFloat(olddata[j].dataValue);
                          sDataElementOld.data.push(temp);
                      }
                        
                 }
                 sData.push(sDataElement);
                 sData.push(sDataElementOld);

                 var lastResult = new Object();
                 result.xData = ['耗气','耗电','耗水','耗蒸汽'];
                 result.sData = sData;
                 res.send(result);
                
             }else{
                 res.send("{error:'请求API错误'}");
             }


	})
});

//同比环比页面：耗能-环比分析
router.get('/CSInfo/expend/list2.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/CSInfo/expend/list2.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, dateFlag:req.query.dateFlag, dateStar:req.query.dateStar}}, function(error,response,body){
	    	//res.send(body);	
	    	console.log(req.session.user.token)
             var result = JSON.parse(body); 
             console.log(result);
             if (result.status.code == 200) {
                 var realdata = result.status.data.currentList;
                 var olddata = result.status.data.oldList;
                 var sData = new Array();
                 var sDataElement = new Object();
                 sDataElement.name = "新"
                 sDataElement.data = new Array();

                 var sDataElementOld = new Object();
                 sDataElementOld.name = "旧"
                 sDataElementOld.data = new Array();

                 for (var i = 0; i < realdata.length; i++) {
                     console.log(realdata[i].projectId);
                         //按照：xData: ['耗气','耗电','耗水','耗蒸汽'] 循环
                      if (realdata[i].showName == '耗气') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗气";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }else if (realdata[i].showName == '耗电') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗电";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }else if (realdata[i].showName == '耗水') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗水";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }else if (realdata[i].showName == '耗蒸汽') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗蒸汽";
                          temp.y = parseFloat(realdata[i].dataValue);
                          sDataElement.data.push(temp);
                      }
                        
                 };

                 for (var i = 0; i < olddata.length; i++) {
                     console.log(olddata[i].projectId);
                         //按照：xData: ['耗气','耗电','耗水','耗蒸汽'] 循环
                      if (olddata[i].showName == '耗气') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗气";
                          temp.y = parseFloat(olddata[i].dataValue);
                          sDataElementOld.data.push(temp);
                      }else if (olddata[i].showName == '耗电') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗电";
                          temp.y = parseFloat(olddata[i].dataValue);
                          sDataElementOld.data.push(temp);
                      }else if (olddata[i].showName == '耗水') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗水";
                          temp.y = parseFloat(olddata[i].dataValue);
                          sDataElementOld.data.push(temp);
                      }else if (olddata[i].showName == '耗蒸汽') {
                          //则放在第一个：
                          var temp = new Object();
                          temp.name = "耗蒸汽";
                          temp.y = parseFloat(olddata[i].dataValue);
                          sDataElementOld.data.push(temp);
                      }
                        
                 };
                 sData.push(sDataElement);
                 sData.push(sDataElementOld);
                 var result = new Object();
                 result.xData = ['耗气','耗电','耗水','耗蒸汽'];
                 result.sData = sData;
                 res.send(result);
                
             }else{
                 res.send("{error:'请求API错误'}");
             }


	})


});


//结构分析页面：结构分析数据查询
router.get('/structureInfo/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/structureInfo/list.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, dateFlag:req.query.dateFlag, dateStar:req.query.dateStar}}, function(error,response,body){
    	var result = JSON.parse(body); 
    	console.log(result);
    	if (result.status.code == 200) {
    		var realdata = result.status.data.list;
    		var result = new Array();
    		for (var i = 0; i < realdata.length; i++) {
    			xmgl[i] = new Object();
    			if(realdata[i].overviewclass == '1'){
    				result[i].name = "项目现状";
    			}else if (realdata[i].overviewclass == '2') {
    				result[i].name = "设计思路";
    			}else if (realdata[i].overviewclass == '3') {
    				result[i].name = "实施方案";
    			}else if (realdata[i].overviewclass == '4') {
    				result[i].name = "运行";
    			}else{
    				result[i].name = "未知菜单";
    			}

    			if(realdata[i].dataclass == '1'){
    				result[i].dataclass = "vedio";
    			}else if (realdata[i].dataclass == '2') {
    				result[i].dataclass = "flash";
    			}else if (realdata[i].dataclass == '3') {
    				result[i].dataclass = "picture";
    			}else if (realdata[i].dataclass == '4') {
    				result[i].dataclass = "html";
    			}else{
    				result[i].dataclass = "未知类型";
    			}
    			
    			result[i].path = remoteApiHost + remoteApiPath + realdata[i].datapath;
    			
    				
    		};

    		var data = {
		        "xmgl": result
		        
		    };
		    res.send(data)
    			

    		
    	}else{
    		res.send("{error:'请求API错误'}");
    	}
	})
});

//成本分析页面：单位供能成本比例
router.get('/costProfit/costProfitChart.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/costProfit/costProfitChart.json', form: {userKey:req.session.user.token, projectid:req.query.projectid, dateFlag:req.query.dateFlag, dateStar:req.query.dateStar}}, function(error,response,body){
    	var result = JSON.parse(body); 
    	if (result.status.code == 200) {
    		var realdata = result.status.data.curve;
    		var result = new Object();
    		var lineData = new Array();
    		for(var x in realdata){
				lineData.push(realdata[x]);
			}
			result.name = "成本";
			result.data = lineData;
			console.log(lineData);
			res.send(result)    		
    	}else{
    		res.send("{error:'请求API错误'}");
    	}
	})
});


//结构分析页面：结构分析数据查询
router.get('/accessInfo/list.json', function(req, res, next) {
	request.post({url:'http://117.144.16.98:8080/rems/accessInfo/list.json', form: {userKey:req.session.user.token}}, function(error,response,body){
	    	res.send(body);	
	})
});

//指标分析页面：指标分析------能源综合利用率------------数据查询
			router.get('/KPIInfo/list1.json', function(req, res, next) {

				request.post({
					url: remoteApiHost + '/rems/KPIInfo/list1.json',
					form: {
						userKey: req.session.user.token,
						projectid: req.query.projectid,
						dateFlag: req.query.dateFlag,
						dateStar: req.query.dateStar
					}
				}, function(error, response, body) {
					res.send(body);
				})
			});

			//指标分析页面：指标分析------节能率------------数据查询
			router.get('/KPIInfo/list1.json', function(req, res, next) {
				request.post({
					url: remoteApiHost + '/rems/accessInfo/list2.json',
					form: {
						userKey: req.session.user.token
					}
				}, function(error, response, body) {
					res.send(body);
				})
			});







module.exports = router;
