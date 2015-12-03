define(function(require) {
	var $ = require('jquery'),
        zh_cn = require('moment-zh-cn'),
        moment = require('moment'),
		datapicker = require('bootstrap-datetimepicker.min'),
		bootstrap = require('bootstrap'),
		//jsonpPath = require('app/getJsonp'),
		highcharts = require('exporting'),
		globalTools = require('app/globalTools'),
		options = require('app/highchartsConfig'),
		projectid = require('app/checkProjectid'),
		api = require('app/getApi'),
        optionsBase = require('app/highchartsConfigBase'),
		optionsLines = require('app/highchartsConfigLines'),
		datetimepickerObj = require('app/dateObj');
	(function() {

		//var dateStar = '2015-09-01';
        var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间

		//弹出层
		$('.gnhnIcon').on('click', globalTools.modalFn);

		$('#myModal').on('shown.bs.modal', function() {
			var num = $(this).attr('data-num');
            var parameter = {options: optionsLines,color: 'transparent'};
            switch (num) {
				case '0': 
                    globalTools.modalLines(todayGroup,parameter);
                    break;
				case '1':  
                    globalTools.modalLines(monthGroup,parameter);
                    break;
				case '2':  
                    globalTools.modalLines(yesterdayGroup,parameter);
                    break;
				case '3':  
                    globalTools.modalLines(yearGroup,parameter);
                    break;
            }
			//switch (num) {
				//case '0':
					//localJsonp.start({
						//url: jsonpPath + 'modalLines.js',
						//parameter: {
							//options: optionsLines,
							//color: 'transparent'
						//},
						//jsonpCallback: 'modalLines',
						//done: globalTools.modalLines
					//});
					//break;
				//case '1':
					//localJsonp.start({
						//url: jsonpPath + 'modalLines2.js',
						//parameter: {
							//options: optionsLines,
							//color: 'transparent'
						//},
						//jsonpCallback: 'modalLines2',
						//done: globalTools.modalLines
					//});
					//break;
				//case '2':
					//localJsonp.start({
						//url: jsonpPath + 'modalLines2.js',
						//parameter: {
							//options: optionsLines,
							//color: 'transparent'
						//},
						//jsonpCallback: 'modalLines2',
						//done: globalTools.modalLines
					//});
					//break;
				//case '3':
					//localJsonp.start({
						//url: jsonpPath + 'modalLines2.js',
						//parameter: {
							//options: optionsLines,
							//color: 'transparent'
						//},
						//jsonpCallback: 'modalLines2',
						//done: globalTools.modalLines
					//});
					//break;
			//}
		});


		// tooltips
		$('[data-toggle="tooltip"]').tooltip();
		//时间控件
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
            dateStar = ev.date.format('YYYY-MM-DD'); 
            demand.start({
                url: '/api/consumptionEnergyInfo/list.json',
                loadContainer:[['.my-card'],{top:'10px',left:'10px'}],
                parameter: {
                    dir: {today:['drgnsp','当日耗能水平'],yestday:['qrgnsp','前日耗能水平'],month:['dygnsp','当月耗能水平'],year:['dngnsp','当年耗能水平']},
                    id: 'drgnsp',
                    name: '',
                    options: optionsBase
                },
                data: {
                    projectid: projectid,
                    dateStar: dateStar
                },
                done: res
            });
			//localJsonp.start({
				//url: jsonpPath + 'highchartsJson.js',
				//parameter: {
					//id: 'drgnsp',
					//options: options
				//},
				//jsonpCallback: 'highchartsJsonp',
				//done: globalTools.ghnCallback
			//});
			//localJsonp.start({
				//url: jsonpPath + 'highchartsJson2.js',
				//parameter: {
					//id: 'dygnsp',
					//options: options
				//},
				//jsonpCallback: 'highchartsJsonp2',
				//done: globalTools.ghnCallback
			//});
			//localJsonp.start({
				//url: jsonpPath + 'highchartsJson3.js',
				//parameter: {
					//id: 'qrgnsp',
					//options: options
				//},
				//jsonpCallback: 'highchartsJsonp3',
				//done: globalTools.ghnCallback
			//});
			//localJsonp.start({
				//url: jsonpPath + 'highchartsJson4.js',
				//parameter: {
					//id: 'dngnsp',
					//options: options
				//},
				//jsonpCallback: 'highchartsJsonp4',
				//done: globalTools.ghnCallback
			//});
		});


		//图表
		demand.start({
			url: '/api/consumptionEnergyInfo/list.json',
            loadContainer:[['.my-card'],{top:'10px',left:'10px'}],
			parameter: {
                dir: {today:['drgnsp','当日耗能水平'],yestday:['qrgnsp','前日耗能水平'],month:['dygnsp','当月耗能水平'],year:['dngnsp','当年耗能水平']},
                id: 'drgnsp',
                name: '',
				options: optionsBase,
				moduleFlag: 1 
			},
			data: {
				projectid: projectid,
				dateStar: dateStar
			},
			done: res
		});

var todayGroup, yesterdayGroup, monthGroup, yearGroup; 
// 0，1，2，3四分图位置
var popupFilter = [['today','yestday',0],['yestday','lastday',2],['year','lastyear',3],['month','lastmonth',1]];
		function res(data, parameter) {
                        console.log(data)
			var result = data.status.data;

			//var xData = new Array;
			//var sData = new Array;

			//---------------总的页面----------------------
			//-------------------当日--------------------
			$.each(result, function(i, v) {
                //console.log(i)
				$.each(parameter.dir, function(k, p) {
					if (i === k) {
						switch (i) {
							case 'month':
								builtGhPage(v, p, parameter, 2);
								break;
							case 'year':
								builtGhPage(v, p, parameter, 3);
								break;
							default:
								builtGhPage(v, p, parameter, 1);
								break;
						}
					}
				})
			});

			//var today = data.status.data.today;
			//var dataItem = [];
			//$.each(today.totalData, function(i, v) {
			//dataItem = new Array;
			//dataItem.push(globalTools.dateFormterItem(1, i));
			//dataItem.push(v);
			//xData.push(dataItem);
			//});
			//today.data = xData;

			//var baseLines = [];
			//var line = new Object;
			//line.vaule = today.line; // 约束性指标
			//baseLines.push(line);
			//line = new Object;
			//line.vaule = today.line1; // 引导性指标
			//baseLines.push(line);

			//today.baseLines = baseLines;

			////console.log(today);

			//globalTools.ghnCallback(today, parameter);
			////-------------------当日--------------------


			////-------------------昨天--------------------
			//xData = new Array;
			//var yestday = data.status.data.yestday;
			//dataItem = new Array;
			//$.each(yestday.totalData, function(i, v) {
			//dataItem = new Array;
			//dataItem.push(globalTools.dateFormterItem(1, i));
			//dataItem.push(v);
			//xData.push(dataItem);
			//});
			//yestday.data = xData;

			//var baseLines = new Array;
			//var line = new Object;
			//line.vaule = yestday.line; // 约束性指标
			//baseLines.push(line);
			//line = new Object;
			//line.vaule = yestday.line1; // 引导性指标
			//baseLines.push(line);

			//yestday.baseLines = baseLines;

			////console.log(yestday);
			//parameter.id = 'qrgnsp';
			//globalTools.ghnCallback(yestday, parameter);

			////-------------------昨天--------------------

			////-------------------当月--------------------
			//var month = data.status.data.month;
			//xData = new Array;
			//sData = new Array;
			//dataItem = new Array;
			//$.each(month.totalData, function(i, v) {
			//dataItem = new Array;
			//dataItem.push(globalTools.dateFormterItem(2, i));
			//dataItem.push(v);
			//xData.push(dataItem);
			//});
			//month.data = xData;

			//var baseLines = new Array;
			//var line = new Object;
			//line.vaule = month.line; // 约束性指标
			//baseLines.push(line);
			//line = new Object;
			//line.vaule = month.line1; // 引导性指标
			//baseLines.push(line);

			//month.baseLines = baseLines;

			////console.log(month);
			//parameter.id = 'dygnsp';
			//globalTools.ghnCallback(month, parameter);
			////-------------------当月--------------------

			////						console.log(month);

			////-------------------当年--------------------
			//var year = data.status.data.year;
			//xData = new Array;
			//sData = new Array;
			//dataItem = new Array;
			//$.each(year.totalData, function(i, v) {
			//dataItem = new Array;
			//dataItem.push(globalTools.dateFormterItem(3, i));
			//dataItem.push(v);
			//xData.push(dataItem);
			//});
			//year.data = xData;

			//var baseLines = new Array;
			//var line = new Object;
			//line.vaule = year.line; // 约束性指标
			//baseLines.push(line);
			//line = new Object;
			//line.vaule = year.line1; // 引导性指标
			//baseLines.push(line);

			//year.baseLines = baseLines;

			////console.log(year);
			//parameter.id = 'dngnsp';
			//globalTools.ghnCallback(year, parameter);
			//-------------------当年--------------------

			//			console.log(year);
			//---------------总的页面----------------------



			//---------------详细页面----------------------
			//-------------------当日详细(需要把今日数据与昨日数据都取出来)--------------------
			//var today = data.status.data.today.resList;
			//var yestday = data.status.data.yestday.resList;
            //var today = data.status.data['today'].resList;
            //var yestday = data.status.data['yestday'].resList;
			
			//var todayData = dataFormater(today);

			//var yestdayData = dataFormater(yestday);

			////			console.log(todayData);
			////console.log(yestdayData);

			//var resMap = [];
			//$.each(todayData, function(i, v) {
				//var list2 = new Array;
				//$.each(yestdayData, function(y, m) {
					//if (m.name == v.name) {
						//list2 = v.list;
						//return false;
					//}
				//});
				//var resList = returnResult(v.list, list2, 1, 1);

				//var item = new Object;
				//item.name = v.name;
				//item.list = resList;
				//resMap.push(item);

				//console.log(resMap);
			//});
            for(var i = 0, l =popupFilter.length; i< l; i++ ) {
                for(var j = 0, k = 1; j < k; j++) {
                    builtGhPopup(data,popupFilter[i][j],popupFilter[i][j+1],popupFilter[i][j+2]);
                }
            }
		}
        function builtGhPopup(data,dateNew,dateOld,type){
//标示是详细页面那个模块的id(1当日详细2当月详细3昨日详细4当年详细)
            var moduleFlag = type +1;
            var dateFlag =  (moduleFlag === 3) ? 1 : moduleFlag && (moduleFlag === 4) ? 3 : moduleFlag; //当日和前日的dateFlag相同
            var today = data.status.data[''+dateNew+''].resList;
            var yestday = data.status.data[''+dateOld+''].resList;
			
			var todayData = dataFormater(today);

			var yestdayData = dataFormater(yestday);

			//			console.log(todayData);
			//console.log(yestdayData);

			var resMap = [];
			$.each(todayData, function(i, v) {
				var list2 = new Array;
				$.each(yestdayData, function(y, m) {
					if (m.name == v.name) {
						list2 = v.list;
						return false;
					}
				});
				var resList = returnResult(v.list, list2, dateFlag,moduleFlag);

				var item = new Object;
				item.name = v.name;
				item.list = resList;
				resMap.push(item);

			});
            switch(type) {
                case 0: 
                    todayGroup  = resMap; 
                    if(todayGroup.length === 0 ) checkPopup('#drgnsp',0); else checkPopup('#drgnsp',1);
                    break;  
                case 1: 
                    monthGroup  = resMap; 
                    if(monthGroup.length === 0 ) checkPopup('#dygnsp',0); else checkPopup('#dygnsp',1);
                    break;  
                case 2: 
                    yesterdayGroup = resMap; 
                    if(yesterdayGroup.length === 0 ) checkPopup('#qrgnsp',0); else checkPopup('#qrgnsp',1);
                    break;  
                case 3: 
                    yearGroup = resMap; 
                    if(yearGroup.length === 0 ) checkPopup('#dngnsp',0); else checkPopup('#dngnsp',1);
                    break;  
            }

        
        }
        function checkPopup(id,isShow) {
            if(isShow === 0) $(id).parent('.my-card').find('.gnhnIcon').addClass('disableIcon').tooltip('destroy');
            else if(isShow === 1) $(id).parent('.my-card').find('.gnhnIcon').removeClass('disableIcon').tooltip();
        }
		function returnResult(realdata, olddata, dateFlag, moduleFlag) {
			var sData = new Array();
			var xData = new Array();
			var sDataElement = new Object();

			sDataElement.data = new Array();

			var sDataElementOld = new Object();

			sDataElementOld.data = new Array();
			var temp = new Object();

			if (moduleFlag == 1) {
				sDataElement.name = "今天";
				sDataElementOld.name = "昨天";
			}
			if (moduleFlag == 2) {
				sDataElement.name = "当月";
				sDataElementOld.name = "上月";
			}
			if (moduleFlag == 3) {
				sDataElement.name = "昨天";
				sDataElementOld.name = "前天";
			}
			if (moduleFlag == 4) {
				sDataElement.name = "当年";
				sDataElementOld.name = "去年";
			}

			//今年数据解析
			for (var i = 0; i < realdata.length; i++) {
				temp = new Object();
				temp.name = globalTools.dateFormterItem(dateFlag, realdata[i].rectime);
				xData.push(temp.name);

				temp.y = parseFloat(realdata[i].datavalue);
				sDataElement.data.push(temp);
			}

			//去年数据解析
			for (var j = 0; j < olddata.length; j++) {
				temp = new Object();
				temp.name = globalTools.dateFormterItem(dateFlag, olddata[j].rectime);
				xData.push(temp.name);
				temp.y = parseFloat(olddata[j].datavalue);
				sDataElementOld.data.push(temp);
			}

			sData.push(sDataElement);
			sData.push(sDataElementOld);

			xData = globalTools.uniq(xData);

			var tmp = new Array();
			var item = {};

			item.xData = xData;
			item.sData = sData;

			tmp.push(item);
			return tmp;
		}



		//对LIst集合数据进行筛选取值，最终返回一个数组
		function dataFormater(data) {
			var resultMap = [];
			$.each(data, function(i, v) {
				var res = containsKey(resultMap, v.showname);
				if (res == undefined) {
					var list = new Array;
					list.push(v);
					var item = {};
					item.name = v.showname;
					item.list = list;
					resultMap.push(item)
				} else {
					res.push(v);
				}
			});
			return resultMap;
		}

		//判断map的Key是否存在
		function containsKey(map, key) {
			var result;
			$.each(map, function(i, v) {
				if (v.name == key) {
					result = v.list;
				}
			});
			return result;
		}




		//		localJsonp.start({
		//			url: jsonpPath + 'highchartsJson.js',
		//			parameter: {
		//				id: 'drgnsp',
		//				options: options
		//			},
		//			jsonpCallback: 'highchartsJsonp',
		//			done: globalTools.ghnCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'highchartsJson2.js',
		//			parameter: {
		//				id: 'dygnsp',
		//				options: options
		//			},
		//			jsonpCallback: 'highchartsJsonp2',
		//			done: globalTools.ghnCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'highchartsJson3.js',
		//			parameter: {
		//				id: 'qrgnsp',
		//				options: options
		//			},
		//			jsonpCallback: 'highchartsJsonp3',
		//			done: globalTools.ghnCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'highchartsJson4.js',
		//			parameter: {
		//				id: 'dngnsp',
		//				options: options
		//			},
		//			jsonpCallback: 'highchartsJsonp4',
		//			done: globalTools.ghnCallback
		//		});
function builtGhPage(data,info,parameter,dateFlag) {
			var xData = new Array;
			//var yestday = data.status.data.yestday;
			var yestday = data;
			dataItem = new Array;
			$.each(yestday.totalData, function(i, v) {
				dataItem = new Array;
				dataItem.push(globalTools.dateFormterItem(dateFlag, i));
				dataItem.push(v);
				xData.push(dataItem);
			});
			yestday.data = xData;

			var baseLines = new Array;
			var line = new Object;
			line.vaule = yestday.line; // 约束性指标
			baseLines.push(line);
			line = new Object;
			line.vaule = yestday.line1; // 引导性指标
			baseLines.push(line);

			yestday.baseLines = baseLines;

			//console.log(yestday);
			//parameter.id = 'qrgnsp';
            parameter.id = info[0];
            parameter.name = info[1];
			globalTools.ghnCallback(yestday, parameter);
		}

	}());
});
