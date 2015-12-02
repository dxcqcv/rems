define(function(require) {
	var $ = require('jquery'),
		zh_cn = require('moment-zh-cn'),
		datapicker = require('bootstrap-datetimepicker.min'),
		bootstrap = require('bootstrap'),
		jsonpPath = require('app/getJsonp'),
		highcharts = require('exporting'),
		globalTools = require('app/globalTools'),
		options = require('app/highchartsConfig'),
		projectid = require('app/checkProjectid'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines'),
		datetimepickerObj = require('app/dateObj');
	(function() {

		var dateStar = '2015-09-01';

		//弹出层
		$('.gnhnIcon').on('click', globalTools.modalFn);


		$('#myModal').on('shown.bs.modal', function() {
			var num = $(this).attr('data-num');
			switch (num) {
				case '0':
					localJsonp.start({
						url: jsonpPath + 'modalLines.js',
						parameter: {
							options: optionsLines,
							color: 'transparent'
						},
						jsonpCallback: 'modalLines',
						done: globalTools.modalLines
					});
					break;
				case '1':
					localJsonp.start({
						url: jsonpPath + 'modalLines2.js',
						parameter: {
							options: optionsLines,
							color: 'transparent'
						},
						jsonpCallback: 'modalLines2',
						done: globalTools.modalLines
					});
					break;
				case '2':
					localJsonp.start({
						url: jsonpPath + 'modalLines2.js',
						parameter: {
							options: optionsLines,
							color: 'transparent'
						},
						jsonpCallback: 'modalLines2',
						done: globalTools.modalLines
					});
					break;
				case '3':
					localJsonp.start({
						url: jsonpPath + 'modalLines2.js',
						parameter: {
							options: optionsLines,
							color: 'transparent'
						},
						jsonpCallback: 'modalLines2',
						done: globalTools.modalLines
					});
					break;
			}
		});


		// tooltips
		$('[data-toggle="tooltip"]').tooltip();
		//时间控件
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
			localJsonp.start({
				url: jsonpPath + 'highchartsJson.js',
				parameter: {
					id: 'drgnsp',
					options: options
				},
				jsonpCallback: 'highchartsJsonp',
				done: globalTools.ghnCallback
			});
			localJsonp.start({
				url: jsonpPath + 'highchartsJson2.js',
				parameter: {
					id: 'dygnsp',
					options: options
				},
				jsonpCallback: 'highchartsJsonp2',
				done: globalTools.ghnCallback
			});
			localJsonp.start({
				url: jsonpPath + 'highchartsJson3.js',
				parameter: {
					id: 'qrgnsp',
					options: options
				},
				jsonpCallback: 'highchartsJsonp3',
				done: globalTools.ghnCallback
			});
			localJsonp.start({
				url: jsonpPath + 'highchartsJson4.js',
				parameter: {
					id: 'dngnsp',
					options: options
				},
				jsonpCallback: 'highchartsJsonp4',
				done: globalTools.ghnCallback
			});
		});


		//图表
		demand.start({
			url: '/api/consumptionEnergyInfo/list.json',
			parameter: {
				dir: {
					today: 'drgnsp',
					yestday: 'qrgnsp',
					month: 'dygnsp',
					year: 'dngnsp'
				},
				id: 'drgnsp',
				options: options,
				moduleFlag: 1 //标示是详细页面那个模块的id(1当日详细2当月详细3昨日详细4当年详细)
			},
			data: {
				projectid: projectid,
				dateStar: dateStar
			},
			done: res
		});


		function res(data, parameter) {
			//			console.log(data)
			var result = data.status.data;

			var xData = new Array;
			var sData = new Array;

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
			var today = data.status.data.today.resList;
			var yestday = data.status.data.yestday.resList;
			
			var todayData = dataFormater(today);

			var yestdayData = dataFormater(yestday);

			//			console.log(todayData);
			console.log(yestdayData);

			var resMap = [];
			$.each(todayData, function(i, v) {
				var list2 = new Array;
				$.each(yestdayData, function(y, m) {
					if (m.name == v.name) {
						list2 = v.list;
						return false;
					}
				});
				var resList = returnResult(v.list, list2, 1, 1);

				var item = new Object;
				item.name = v.name;
				item.list = resList;
				resMap.push(item);

				console.log(resMap);
			});
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
		function builtGhPage(data, id, parameter, dateFlag) {
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
			parameter.id = id;
			globalTools.ghnCallback(yestday, parameter);
		}

	}());
});