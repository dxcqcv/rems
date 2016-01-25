var express = require('express');
var request = require('request');
var moment = require('moment');
var ipaddr = require('ipaddr.js');
var fs = require('fs');
var router = express.Router();
//var remoteApiHost = "http://localhost:8080";
//var remoteApiHost = "http://117.144.16.98:8080";
//var remoteApiHost = "http://10.20.1.218:8080";
var remoteApiHost = "http://10.20.1.42:8080";
//var remoteApiHost = "http://10.20.1.229:8080";
//var remoteApiHost = "http://10.20.1.167:8888";
//var remoteApiHost = "http://10.20.1.216:8080";
//var remoteApiHost = "http://10.20.1.231:8080";
//var remoteApiHost = "http://10.20.1.4:8080";
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
    var data = "username:" + req.body.username + "password:" + req.body.password + today;
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    var d = crypto.createHash("md5").update(str).digest("hex").toUpperCase();
    //console.log()
    //var realUrl;
    //try {
        //realUrl =  ipaddr.process(req.ip).octets.join('.');
    //} catch (e) {
        //console.log('ip err');
        //realUrl = '127.0.0.1';
    //}
    request.post({
        url: remoteApiHost + '/rems/login.json',
          headers: {
            //'realUrl': ipaddr.process(req.ip).octets.join('.') //过滤过
            //'realUrl': realUrl 
            'realUrl':req.ip //未过滤
          },


        form: {
            username: req.body.username,
            password: req.body.password,
            sign: d
        }
    }, function(error, response, body) {
        //res.send(body);
        console.log(body);
        console.log("*******************");
        var result = JSON.parse(body);
        if (result.status.code == 200) {
            var user = {
                username: req.body.username,
                password: req.body.password,
                token: result.status.data.userKey
            };
            req.session.user = user;

            res.redirect('/user/home');
        } else {
            res.redirect('/login');
        }

    });
});
/*首页页面*/
//首页获取项目列表接口 【已通过】

router.get('/gislist.json', function(req, res, next) {

    request.post({
        url: remoteApiHost + '/rems/gislist.json',
        form: {
            userKey: req.session.user.token
        }
    }, function(error, response, body) {

        console.log(req.query.projectid);
        res.send(body);

    });

});
router.get('/features.json', function(req, res, next) {


    request.post({
        url: remoteApiHost + '/rems/features.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid
        }
    }, function(error, response, body) {

        console.log(req.query.projectid);
        res.send(body);

    });

});
router.get('/gislist_features.json', function(req, res, next) {

//console.log(66,ipaddr.process(req.ip).octets.join('.'));

    request.post({
        url: remoteApiHost + '/rems/gislist_features.json',
        form: {
            userKey: req.session.user.token,
            dateHour: req.query.dateHour
        }
    }, function(error, response, body) {

        console.log(req.query.projectid);
        res.send(body);

    });

});

//首页选择项目告知后台projectid的接口

router.get('/clickProject.json', function(req, res, next) {
    console.log("^^^^^^^^^^^^^^^^");
    console.log(req.query.projectid);
    request.post({
        url: remoteApiHost + '/rems/clickProject.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid
        }
    }, function(error, response, body) {
        res.send(body);

    });
});

/*项目预览页面*/
//项目预览页面接口
router.get('/projectOverview.json', function(req, res, next) {

    console.log("99999");
    request.post({
        url: remoteApiHost + '/rems/projectOverview.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid
        }
    }, function(error, response, body) {
        //res.send(body);   
        var result = JSON.parse(body);
        console.log(result);
        if (result.status.code == 200) {
            var realdata = result.status.data.list;
            var xmgl = [];
            for (var i = 0; i < realdata.length; i++) {
                xmgl[i] = {};
                if (realdata[i].overviewclass == '1') {
                    xmgl[i].name = "项目现状";
                } else if (realdata[i].overviewclass == '2') {
                    xmgl[i].name = "设计思路";
                } else if (realdata[i].overviewclass == '3') {
                    xmgl[i].name = "实施方案";
                } else if (realdata[i].overviewclass == '4') {
                    xmgl[i].name = "运行";
                } else {
                    xmgl[i].name = "未知菜单";
                }

                if (realdata[i].dataclass == '1') {
                    xmgl[i].dataclass = "vedio";
                } else if (realdata[i].dataclass == '2') {
                    xmgl[i].dataclass = "flash";
                } else if (realdata[i].dataclass == '3') {
                    xmgl[i].dataclass = "picture";
                } else if (realdata[i].dataclass == '4') {
                    xmgl[i].dataclass = "html";
                } else {
                    xmgl[i].dataclass = "未知类型";
                }

                xmgl[i].path = remoteApiHost + remoteApiPath + realdata[i].datapath;


            }

            var data = {
                "xmgl": xmgl

            };
            res.send(data);



        } else {
            res.send("{error:'请求API错误'}");
        }
    });
});

/*运行监测页面*/
//运行监测页面设备查询接口
router.get('/techCheck/equLabellist.json', function(req, res, next) {
    console.log("9898989898");
    console.log(req.query.projectid);
    request.post({
        url: remoteApiHost + '/rems/techCheck/equLabellist.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});
//动态列表

router.get('/techCheck/insLabellist.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/insLabellist.json',
        form: {
            userKey: req.session.user.token,
            classinstanceid: req.query.classinstanceid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});
//动态列表对应值
router.get('/techCheck/insData.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/insData.json',
        form: {
            userKey: req.session.user.token,
            classinstanceid: req.query.classinstanceid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});
//动态列表对应图表
router.get('/techCheck/insDatas.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/insDatas.json',
        form: {
            userKey: req.session.user.token,
            classinstanceid: req.query.classinstanceid,
            classpropertyid: req.query.classpropertyid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面设备启停状态接口
router.get('/techCheck/equState.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/equState.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面验证系统角色名
router.get('/techCheck/equDatas.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/equDatas.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面供能耗能联合曲线数据
router.get('/techCheck/multiEnergy.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/multiEnergy.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面单个能源项曲线数据
router.get('/techCheck/singleEnergy.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/singleEnergy.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面单个能源项分解的设备层级能源项饼图数据
router.get('/techCheck/energyPie.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/energyPie.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面成本或收益的饼图数据
router.get('/techCheck/financePie.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/financePie.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//运行监测页面单个能源配额曲线数据
router.get('/techCheck/singleQuota.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/techCheck/singleQuota.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

/*能效监测页面*/
//能效检测页面：获取系统指标 .3已通过】
router.get('/effiCheck/sysindex.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/effiCheck/sysindex.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateHour: req.query.dateHour
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//能效检测页面：气象信息监测实时数据（数据曲线）
router.get('/effiCheck/weatherInfo.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/effiCheck/weatherInfo.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//能效检测页面：气象信息监测即时数据（分钟数据）
router.get('/effiCheck/weatherInfoNow.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/effiCheck/weatherInfoNow.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//能效检测页面：供能耗能指标量数据
router.get('/effiCheck/energySourceValue.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/effiCheck/energySourceValue.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    });
});

//能效检测页面：供能耗能能源种类接口 该接口提供项目耗能或者供能的能源种类数据信息
router.get('/effiCheck/energySourceType.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/effiCheck/energySourceType.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//能效检测页面：根据供能或者耗能指标编号、指标属性编号查询当天小时级实时数据
router.get('/effiCheck/energySourceChart.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/effiCheck/energySourceChart.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

/*项目信息管理页面*/
//项目信息管理页面：数据权限树
router.get('/projectmanagement/tree.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/projectmanagement/tree.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//项目信息管理页面：根据项目id查询COP
router.get('/project/baseinfo/cop.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/project/baseinfo/cop.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});




//工艺属性配置页面：初始化左侧数据
router.get('/craftProperty/listLeft.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/craftProperty/listLeft.json',
        form: {
            userKey: req.session.user.token,
            project: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


/*//标准类管理页面：查询设备类
router.get('/clzMng/list.json', function(req, res, next) {
    console.log(req.session.user);
    // request.post({url:remoteApiHost+'/rems/clzMng/list.json', form: {userKey:req.session.user.token, clzTypeid:req.query.clzTypeid, clzPid:req.query.clzPid, clzName:req.query.clzName, userid:req.query.userid}}, function(error,response,body){
    //      res.send(body); 
    // })
});*/


//类属性页面：查询设备属性类
router.get('/clzpropMng/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/list.json',
        form: {
            userKey: req.session.user.token,
            userid: req.query.userid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//类属性页面：添加设备（加载数据）
router.get('/clzpropMng/addInput.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/addInput.json',
        form: {
            userKey: req.session.user.token,
            clzid: req.query.clzid

            //userid: req.query.userid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//类属性页面：修改（获取信息）dm12/9
router.get('/clzpropMng/updateInput.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/updateInput.json',
        form: {
            userKey: req.session.user.token,
            classpropertyid: req.query.classpropertyid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//类属性页面：修改（修改到数据库）dm12/9
router.get('/clzpropMng/update.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/update.json',
        form: {
            userKey: req.session.user.token,
            classid: req.query.classid,
            classpropertyname: req.query.classpropertyname,
            isdynamic: req.query.isdynamic,
            remarks: req.query.remarks,
            propertytypeid: req.query.propertytypeid,
            classpropertyid:req.query.classpropertyid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


////类属性页面：条件查询 dm12/10
//router.get('/clzpropMng/findByForm.json', function(req, res, next) {
//  request.post({
//      url: remoteApiHost + '/rems/clzpropMng/findByForme.json',
//      form: {
//          userKey: req.session.user.token,
//          pclzid: req.query.clzid,
//          propTypeid:req.query.propTypeid,
//          isdynamic:req.query.isdynamic,
//          propName:req.query.propName
//      }
//  }, function(error, response, body) {
//      res.send(body);
//  })
//});



//类属性页面：添加设备（加载数据到库）dm12/9
router.get('/clzpropMng/add.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/add.json',
        form: {
            userKey: req.session.user.token,
            classid: req.query.classid,
            classpropertyname: req.query.classpropertyname,
            isdynamic: req.query.isdynamic,
            remarks: req.query.remarks,
            rank: req.query.rank,
            propertytypeid: req.query.propertytypeid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//类属性页面：加载标准类
router.get('/clzpropMng/loadStandardclass.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/loadStandardclass.json',
        form: {
            userKey: req.session.user.token,
            typeid: req.query.typeid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//类属性页面：初始化查询依据
router.get('/clzpropMng/findByForm.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/findByForm.json',
        form: {
            userKey: req.session.user.token,
            pclzid: req.query.pclzid,
            propTypeid: req.query.propTypeid,
            isdynamic: req.query.isdynamic,
            propName: req.query.propName
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//类属性页面：初始化查询依据
router.get('/clzpropMng/initSelections.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/initSelections.json',
        form: {
            userKey: req.session.user.token,
            userid: req.query.userid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//类属性页面：删除记录  dm12/9
router.get('/clzpropMng/delete.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzpropMng/delete.json',
        form: {
            userKey: req.session.user.token,
            classpropertyid: req.query.classpropertyid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//类属性管理页面
/*router.get('/clzMng/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/list.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});*/

//类属性管理页面和标准类管理页面共用：查询设备类
router.get('/clzMng/page.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/page.json',
        form: {
            userKey: req.session.user.token
        }
    }, function(error, response, body) {
        res.send(body);
    })
});





//用户管理页面：查询所有用户信息
router.get('/userInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/userInfo/list.json',
        form: {
            userKey: req.session.user.token,
            project: req.query.projectid,
            pageid: req.query.pageid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//日志管理：日志管理--列表页面(分页
router.get('/logInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/logInfo/list.json',
        form: {
            userKey: req.session.user.token,
            page: req.query.page
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//工艺属性配置：初始化左侧数据
router.get('/craftProperty/listLeft.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/craftProperty/listLeft.json',
        form: {
            userKey: req.session.user.token,
            project: req.query.projectid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});



//项目管理页面：初始化左侧数据
router.get('/projectmanagement/tree.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/projectmanagement/tree.json',
        form: {
            userKey: req.session.user.token
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//项目管理页面：列表查询 根据左侧树查询
router.get('/projectmanagement/lists.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/projectmanagement/lists.json',
        form: {
            userKey: req.session.user.token,
            page: req.query.page,
            id: req.query.id,
            rating: req.query.rating
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//同比环比页面：耗能-同比分析
router.get('/CSInfo/expend/list1.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/expend/list1.json',
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


//同比环比页面：耗能-环比分析
router.get('/CSInfo/expend/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/expend/list2.json',
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

//同比环比页面：供能-同比分析
router.get('/CSInfo/provide/list1.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/provide/list1.json',
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

//同比环比页面：供能-环比分析
router.get('/CSInfo/provide/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/provide/list2.json',
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

//同比环比页面：能源综合利用率-同比分析
router.get('/CSInfo/use/list1.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/use/list1.json',
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


//同比环比页面：能源综合利用率-环比分析
router.get('/CSInfo/use/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/use/list2.json',
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


//同比环比页面：节能率-同比分析
router.get('/CSInfo/saving/list1.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/saving/list1.json',
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


//同比环比页面：节能率-环比分析
router.get('/CSInfo/saving/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/CSInfo/saving/list2.json',
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

/*
//结构分析页面：结构分析数据查询
router.get('/structureInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/structureInfo/list.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar
        }
    }, function(error, response, body) {
        var result = JSON.parse(body);
        console.log(result);
        if (result.status.code == 200) {
            var realdata = result.status.data.list;
            var result = new Array();
            for (var i = 0; i < realdata.length; i++) {
                xmgl[i] = new Object();
                if (realdata[i].overviewclass == '1') {
                    result[i].name = "项目现状";
                } else if (realdata[i].overviewclass == '2') {
                    result[i].name = "设计思路";
                } else if (realdata[i].overviewclass == '3') {
                    result[i].name = "实施方案";
                } else if (realdata[i].overviewclass == '4') {
                    result[i].name = "运行";
                } else {
                    result[i].name = "未知菜单";
                }

                if (realdata[i].dataclass == '1') {
                    result[i].dataclass = "vedio";
                } else if (realdata[i].dataclass == '2') {
                    result[i].dataclass = "flash";
                } else if (realdata[i].dataclass == '3') {
                    result[i].dataclass = "picture";
                } else if (realdata[i].dataclass == '4') {
                    result[i].dataclass = "html";
                } else {
                    result[i].dataclass = "未知类型";
                }

                result[i].path = remoteApiHost + remoteApiPath + realdata[i].datapath;


            };

            var data = {
                "xmgl": result

            };
            res.send(data)



        } else {
            res.send("{error:'请求API错误'}");
        }
    })
});*/

//成本分析页面：单位供能成本比例
/*router.get('/costProfit/costProfitChart.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/costProfit/costProfitChart.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar
        }
    }, function(error, response, body) {
        var result = JSON.parse(body);
        if (result.status.code == 200) {
            var realdata = result.status.data.curve;
            var result = new Object();
            var lineData = new Array();
            for (var x in realdata) {
                lineData.push(realdata[x]);
            }
            result.name = "成本";
            result.data = lineData;
            console.log(lineData);
            res.send(result)
        } else {
            res.send("{error:'请求API错误'}");
        }
    })
});
*/

//结构分析页面：结构分析数据查询
router.get('/accessInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/accessInfo/list.json',
        form: {
            userKey: req.session.user.token
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//指标分析页面：指标分析------能源综合利用率------------数据查询
router.get('/KPIInfo/list1.json', function(req, res, next) {
    //var dateStar =req.query.dateStar;
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
router.get('/KPIInfo/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/KPIInfo/list2.json',
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

//指标分析页面：指标分析------二氧化碳减排率------------数据查询
router.get('/KPIInfo/list3.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/KPIInfo/list3.json',
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

//指标分析页面：指标分析------可再生能源利用率------------数据查询
router.get('/KPIInfo/list4.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/KPIInfo/list4.json',
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

//耗能分析页面：耗能分析数据查询
router.get('/consumptionEnergyInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/consumptionEnergyInfo/list.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateStar: req.query.dateStar
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//供能分析页面：供能分析数据查询
router.get('/provideEnergyInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/provideEnergyInfo/list.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateStar: req.query.dateStar
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//模块分析页面：下拉框数据查询
router.get('/moduleAnalysis/listOption.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/moduleAnalysis/listOption.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//模块分析页面：CCHP数据查询
router.get('/moduleAnalysis/list1.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/moduleAnalysis/list1.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid: req.query.optionid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//模块分析页面：常规调峰数据查询
router.get('/moduleAnalysis/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/moduleAnalysis/list2.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid1: req.query.optionid1,
            optionid2: req.query.optionid2
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//模块分析页面：蓄能调峰数据查询
router.get('/moduleAnalysis/list3.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/moduleAnalysis/list3.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid: req.query.optionid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//模块分析页面：输配数据查询
router.get('/moduleAnalysis/list4.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/moduleAnalysis/list4.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid1: req.query.optionid1,
            optionid2: req.query.optionid2
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//机组分析页面：下拉别表数据查询
router.get('/deviceGroupInfo/listOption.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/deviceGroupInfo/listOption.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid1: req.query.optionid1,
            optionid2: req.query.optionid2
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//机组分析页面：冷温水或冷却水数据查询
router.get('/deviceGroupInfo/list1.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/deviceGroupInfo/list1.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid: req.query.optionid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//机组分析页面：泵组数据查询
router.get('/deviceGroupInfo/list2.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/deviceGroupInfo/list2.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            dateFlag: req.query.dateFlag,
            dateStar: req.query.dateStar,
            optionid1: req.query.optionid1,
            optionid2: req.query.optionid2
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//结构分析页面：结构分析数据查询
router.get('/structureInfo/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/structureInfo/list.json',
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

//成本分析页面：成本分析数据查询
router.get('/costProfit/costProfitChart.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/costProfit/costProfitChart.json',
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

//----------------------标准类管理----------------------------------------------
//添加设备（加载数据）（点击添加按钮）
router.get('/clzMng/addInput.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/addInput.json',
        form: {
            userKey: req.session.user.token
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//添加设备（添加）添加弹框里的确认
router.get('/clzMng/add.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/add.json',
        form: {
            userKey: req.session.user.token,
            classname: req.query.classname,
            parentclassid: req.query.parentclassid,
            remarks: req.query.remarks,
            picturepath: req.query.picturepath,
            classtypeid: req.query.classtypeid,
            categoryType: req.query.categoryType, //设备级别 （工艺系统） 2015-11-17 16:26:14
            superiorid: req.query.superiorid //上级设备 （工艺系统） 2015-11-17 16:26:34dictionary_ CategoryType
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//修改设备（加载数据）（点击修改按钮）
router.get('/clzMng/updateInput.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/updateInput.json',
        form: {
            userKey: req.session.user.token,
            classid: req.query.classid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//修改设备（修改弹框里的确认）
router.get('/clzMng/update.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/update.json',
        form: {
            userKey: req.session.user.token,
            classid: req.query.classid,
            classname: req.query.classname,
            parentclassid: req.query.parentclassid,
            remarks: req.query.remarks,
            picturepath: req.query.picturepath,
            classtypeid: req.query.classtypeid,
            categoryType: req.query.categoryType, //设备级别 （工艺系统） 2015-11-17 16:26:14
            superiorid: req.query.superiorid //上级设备 （工艺系统） 2015-11-17 16:26:34dictionary_ CategoryType
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//删除设备
router.get('/clzMng/delete.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/delete.json',
        form: {
            userKey: req.session.user.token,
            classid: req.query.classid
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//条件查询
router.get('/clzMng/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/clzMng/list.json',
        form: {
            userKey: req.session.user.token,
            clzName: req.query.clzName
        }
    }, function(error, response, body) {
        res.send(body);
    })
});


//----------------------标准类管理----------------------------------------------
//----------------------设备设施管理start--------------------------------------------
//左侧树的加载显示 xusheng 2015.12.10
router.get('/accessInfo/tree.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/accessInfo/tree.json',
        form: {
            userKey: req.session.user.token
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//设备设施管理查询列表 xusheng 2015.12.10
router.get('/instance/right.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/instance/right.json',
        form: {
            userKey: req.session.user.token,
            pid: req.query.pid,
            page: req.query.page,
            clazz: req.query.clazz,
            keyword: req.query.keyword
        }
    }, function(error, response, body) {
        res.send(body);
    })
});
//----------------------设备设施管理end----------------------------------------------

//日志管理：日志管理--列表页面(分页
router.get('/logInfo/listCondition.json', function (req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/logInfo/listCondition.json',
        form: {
            userKey: req.session.user.token,
            page: req.query.page,
            beginTime: req.query.beginTime,
            endTime: req.query.endTime,
            operatetype: req.query.operatetype,
            type: req.query.type,
            userid: req.query.userid,
            module: req.query.module,
            rows:req.query.rows
        }
    }, function(error, response, body) {
        res.send(body);
    })
});
//日志管理：操作人下拉框
router.get('/logInfo/userList.json', function (req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/logInfo/userList.json',
        form: {
            userKey: req.session.user.token
        }
    }, function (error, response, body) {
        res.send(body);
    })
});



//----------------------报表开始start----------------------------------------------
//添加报表：
//http://localhost:3000/api/config/report/add.json?reportId=3&reportName=lvwei&header=%3Cheader%3E%3C/header%3E&codes=i:i:i:&dateStr=2&isShow=1&chartType=1&chartAddress=11
router.get('/config/report/add.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/config/report/add.json',
        form: {
            userKey: req.session.user.token,
            reportName: req.query.reportName,
            header: req.query.header,
            codes:req.query.codes,
            dateStr:req.query.dateStr,
            isShow:req.query.isShow,
            chartType:req.query.chartType,
            chartAddress:req.query.chartAddress
        }
    }, function(error, response, body) {
        console.log(body);
         var result = JSON.parse(body);
        if (result.status.code == 200) {
            //此处修改excel文件名为id.xslx
            fs.rename("C:/dev/rems/data/upload/"+req.query.excelName, "C:/dev/rems/data/upload/" + result.status.data.id + ".xls", function (err) {
               if(!err) {
                    console.error(err);
                    
               }
               res.send(body);
            });
        } 
        

        
    })
});
//自定义报表配置：查询报表
router.get('/config/report/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/config/report/list.json',
        form: {
            userKey: req.session.user.token,
            reportName: req.query.reportName
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//运行报表：查询报表的数据：
router.get('/runReport/list.json', function(req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/runReport/list.json',
        form: {
            userKey: req.session.user.token,
            reportid: req.query.reportid,
            dateStar: req.query.dateStar,
            dateFlag: req.query.dateFlag
        }
    }, function(error, response, body) {
        res.send(body);
    })
});

//----------------------报表end----------------------------------------------

//----------------------远程监测（能效监测）start------------------------------------

//能效监测(耗能) xusheng 2015.12.13
router.get('/effiCheck/list1.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/effiCheck/list1.json',
		form: {
			userKey: req.session.user.token,
			projectid: req.query.projectid,
			dateStar:req.query.dateStar
		}
	}, function(error, response, body) {
		res.send(body);
	})
});

//能效监测(供能) xusheng 2015.12.13
router.get('/effiCheck/list2.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/effiCheck/list2.json',
		form: {
			userKey: req.session.user.token,
			projectid: req.query.projectid,
			dateStar:req.query.dateStar
		}
	}, function(error, response, body) {
		res.send(body);
	})
});

//能效监测(工艺耗能下拉框) xusheng 2015.12.13
router.get('/effiCheck/list3.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/effiCheck/list3.json',
		form: {
			userKey: req.session.user.token,
			projectid: req.query.projectid
		}
	}, function(error, response, body) {
		res.send(body);
	})
});

//能效监测(工艺耗能查询) xusheng 2015.12.13
router.get('/effiCheck/list4.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/effiCheck/list4.json',
		form: {
			userKey: req.session.user.token,
			projectid: req.query.projectid,
			dateStar:req.query.dateStar,
			optionid1:req.query.optionid1,
			optionid2:req.query.optionid2
		}
	}, function(error, response, body) {
		res.send(body);
	})
});


//----------------------远程监测（能效监测）end------------------------------------

//得到用户名
router.get('/forget/getUname.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/forget/getUname.json',
		form: {
			userKey: req.session.user.token,
			userName: req.query.userName
		}
	}, function(error, response, body) {
		res.send(body);
	})
});
//发送邮件
router.get('/emailInfo/sendEmail.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/emailInfo/sendEmail.json',
		form: {
			userKey: req.session.user.token,
			username: req.query.userName,
			email: req.query.email
		}
	}, function(error, response, body) {
		res.send(body);
	})
});
//检查验证码
router.get('/forget/checkCode.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/forget/checkCode.json',
		form: {
			userKey: req.session.user.token,
			username: req.query.userName,
			code: req.query.code
		}
	}, function(error, response, body) {
		res.send(body);
	})
});
//修改密码
router.get('/forget/updatePwd.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/forget/updatePwd.json',
		form: {
			userKey: req.session.user.token,
			username: req.query.username,
			password: req.query.password,
			mid: req.query.mid
		}
	}, function(error, response, body) {
		res.send(body);
	})
});
//远程监测-〉数据监测页面
//点击左侧的classInstance查询该classInstance的property
router.get('/datamonitor/value.json', function (req, res, next) {
    request.post({
        url: remoteApiHost + '/rems/datamonitor/value.json',
        form: {
            userKey: req.session.user.token,
            projectid: req.query.projectid,
            instanceid: req.query.instanceid,
        }
    }, function (error, response, body) {
        //var list = JSON.parse(body).status.data.list;
        //res.send(list);
        res.send(body);
    })
});
//----------------------远程监测（数据监测）开始------------------------------------
//数据监测(数据监测设备实例) 
router.get('/datamonitor/leftInfo.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/datamonitor/leftInfo.json',
		form: {
			userKey: req.session.user.token,
			projectid: req.query.projectid,
			classid: req.query.classid
		}
	}, function(error, response, body) {
		res.send(body);
	})
});


//点击左侧获得右侧属性
router.get('/datamonitor/value.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/datamonitor/value.json',
		form: {
			userKey: req.session.user.token,
			projectid: req.query.projectid,
			instanceid: req.query.instanceid
		}
	}, function(error, response, body) {
		res.send(body);
	})
});

//点击曲线图标获得属性
router.get('/datamonitor/lineValue.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/datamonitor/lineValue.json',
		form: {
			userKey: req.session.user.token,
			instanceid: req.query.instanceid,
			propertyid: req.query.propertyid,
			dateSta: req.query.dateSta
		}
	}, function(error, response, body) {
		res.send(body);
	})
});
//----------------------远程监测（数据监测）结束------------------------------------


//
//诊断分析
//
//http://10.20.1.216:8080/rems/dxReport/reportAll.json
router.get('/dxReport/reportAll.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/dxReport/reportAll.json',
		form: {
			userKey: req.session.user.token,
            projectid: req.query.projectid,
            dxStart: req.query.dxStart,
            dxEnd: req.query.dxEnd,
            seasonType: req.query.seasonType
		}
	}, function(error, response, body) {
		res.send(body);
	})
});

//项目下拉框选择   2015.12.21 xusheng
router.get('/dxReport/listProjects.json', function(req, res, next) {
	request.post({
		url: remoteApiHost + '/rems/dxReport/listProjects.json',
		form: {
			userKey: req.session.user.token,
            projectid: req.query.projectid
		}
	}, function(error, response, body) {
		res.send(body);
	})
});


module.exports = router;
