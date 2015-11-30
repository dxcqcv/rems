define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		datapicker = require('bootstrap-datetimepicker.min'),
		options = require('app/highchartsConfig'),
		optionsLines = require('app/highchartsConfigLines'),
		jsonpPath = require('app/getJsonp'),
		highcharts = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		api = require('app/getApi');

	(function() {

		var projectid = 1;
		var dateFlag = 1;
		var dateStar = '2015-09-01';
		var tabFlag = 1; //(1：同比，2:环比)

		//		var dateStr = moment().format('YYYY-MM-DD');
		var oldDate; //防止重复
		var url, name;
		// 日月年
		//		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);
		//var dataP = {projectid:1,dateFlag:1,dateStr:'2015-08-01'};


		//				globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//				//时间空间
		//				$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
		//					var $this = $(this);
		//					var id = $this.parents('.my-card').find('.chart-box').attr('id');
		//					var jsonpName, dateFn;
		//					//console.log($this.find('input').val());
		//					dateFlag = setDate.getFlag();
		//					switch (dateFlag) {
		//						case 1:
		//							dateStr = ev.date.format('YYYY-MM-DD');
		//							if (oldDate == dateStr) break;
		//							console.log(dateStr);
		//							oldDate = dateStr;
		//							break;
		//						case 2:
		//							dateStr = ev.date.format('YYYY-MM');
		//							if (oldDate == dateStr) break;
		//							console.log(dateStr);
		//							oldDate = dateStr;
		//							break;
		//					}
		//					//console.log(ev.date.format('YYYY'));
		//					//console.log(d);
		//					switch (id) {
		//						case 'tbhbHaoneng':
		//							if (tabFlag == 1)
		//								url = '/api/CSInfo/expend/list1.json';
		//							else
		//								url = '/api/CSInfo/expend/list2.json';
		//							name = '耗能';
		//							break;
		//						case 'zbfxJnl':
		//							if (tabFlag == 1)
		//								url = '/api/CSInfo/expend/list1.json';
		//							else
		//								url = '/api/CSInfo/expend/list2.json';
		//							name = '节能率';
		//							break;
		//						case 'zbfxEyhtjpl':
		//							if (tabFlag == 1)
		//								url = '/api/CSInfo/expend/list1.json';
		//							else
		//								url = '/api/CSInfo/expend/list2.json';
		//							name = '二氧化碳减排率';
		//							break;
		//						case 'zbfxKzsnylyl':
		//							if (tabFlag == 1)
		//								url = '/api/CSInfo/expend/list1.json';
		//							else
		//								url = '/api/CSInfo/expend/list2.json';
		//							name = '可再生能源利用率';
		//							break;
		//					}
		//					demand.start({
		//						url: url,
		//						parameter: {
		//							id: id,
		//							fn: globalTools.tbhbLines,
		//							options: optionsLines,
		//							dateFlag: dateFlag,
		//							self: globalTools,
		//							name: name
		//						},
		//						data: {
		//							projectid: projectid,
		//							dateFlag: dateFlag,
		//							dateStar: dateStr
		//						},
		//						done: formatZbLines
		//					});
		//					//demand.start({
		//					//url: jsonpPath + jsonpName + '.js',
		//					//parameter: {
		//					//id: id,
		//					//fn: dateFn,
		//					//options: optionsLines
		//					//},
		//					//jsonpCallback: jsonpName,
		//					//done: globalTools.tbhbCallback
		//					//});
		//				});
		//
		//
		//
		//
		//				(function() {
		//					var chart;
		//					var chartLines;
		//					$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
		//						var id = $(this).parents('.my-card').find('.chart-box').attr('id');
		//						var jsonpName, dateFn;
		//						switch (id) {
		//							case 'tbhbHaoneng':
		//								jsonpName = 'tbhb';
		//								dateFn = tbhbHngn;
		//								break;
		//							case 'tbhbGongneng':
		//								jsonpName = 'tbhb';
		//								dateFn = tbhbHngn;
		//								break;
		//							case 'tbhbNyzhlyl':
		//								jsonpName = 'tbhb3';
		//								dateFn = globalTools.tbhbLines;
		//								break;
		//							case 'tbhbJnl':
		//								jsonpName = 'tbhb3';
		//								dateFn = globalTools.tbhbLines;
		//								break;
		//						}
		//						localJsonp.start({
		//							url: jsonpPath + jsonpName + '.js',
		//							parameter: {
		//								id: id,
		//								fn: dateFn,
		//								options: optionsLines
		//							},
		//							jsonpCallback: jsonpName,
		//							done: globalTools.tbhbCallback
		//						});
		//						//demand.start({url:'/api/CSInfo/expend/list1.json', parameter:{id:id,fn:dateFn,options:optionsLines},data:{projectid:1,dateFlag:1,dateStar:$(this).val()},done:tbhbHngn2})
		//					});

		// 日月年
		//					globalTools.ajaxClickForApi('.tbhb-switch-box-top', 'li', '', {
		//						projectid: 1,
		//						dateFlag: "2",
		//						dateStar: "2015-11"
		//					}, tbhbHngn, demand.start, null, globalTools, optionsLines);
		//					globalTools.ajaxClickForApi('.date-controls-box-top', 'button', '', {
		//						projectid: 1,
		//						dateFlag: "",
		//						dateStar: ""
		//					}, tbhbHngn, demand.start, setDate, globalTools, optionsLines);
		//					globalTools.tbhbClick('.tbhb-switch-box-bottom', 'li', jsonpPath, 'tbhb3', globalTools.tbhbLines, localJsonp.start, null, globalTools, optionsLines);
		//					globalTools.tbhbClick('.date-controls-box-bottom', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, localJsonp.start, setDate, globalTools, optionsLines);

		function tbhbHngn(id, baseLine, xData, sData) {
			options.chart.type = 'column';
			options.chart.renderTo = id;
			options.xAxis.categories = xData;
			//optionsLines.yAxis.plotLines.value = baseLine;
			options.plotOptions.series.dataLabels.enabled = true;
			options.plotOptions.series.dataLabels.format = '{point.y:.1f}%';
			options.series = sData;

			chart = new Highcharts.Chart(options);
		}

		//图表
		demand.start({
			url: '/api/CSInfo/expend/list1.json',
			parameter: {
				id: 'tbhbHaoneng',
				fn: tbhbHngn,
				options: options,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 1
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		demand.start({
			url: '/api/CSInfo/expend/list2.json',
			parameter: {
				id: 'tbhbHaoneng',
				fn: tbhbHngn,
				options: options,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 1
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		demand.start({
			url: '/api/CSInfo/provide/list1.json',
			parameter: {
				id: 'tbhbGongneng',
				fn: tbhbHngn,
				options: options,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 1
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})
		demand.start({
			url: '/api/CSInfo/provide/list2.json',
			parameter: {
				id: 'tbhbGongneng',
				fn: tbhbHngn,
				options: options,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 1
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		demand.start({
			url: '/api/CSInfo/use/list1.json',
			parameter: {
				id: 'tbhbNyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 2
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		demand.start({
			url: '/api/CSInfo/use/list2.json',
			parameter: {
				id: 'tbhbNyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 2
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		demand.start({
			url: '/api/CSInfo/saving/list1.json',
			parameter: {
				id: 'tbhbJnl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 2
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		demand.start({
			url: '/api/CSInfo/saving/list2.json',
			parameter: {
				id: 'tbhbJnl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateStar: dateStar,
				dateFlag: dateFlag,
				charFlag: 2
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: res
		})

		function res(result, parameter) {
			if (parameter.id == 'tbhbNyzhlyl')
				console.log(result.status.data);
			if (result.status.code == 200) {
				var realdata = result.status.data.currentList;
				var olddata = result.status.data.oldList;
				var sData = new Array();
				var xData = new Array();
				var sDataElement = new Object();

				sDataElement.data = new Array();

				var sDataElementOld = new Object();

				sDataElementOld.data = new Array();
				var temp = new Object();

				if (tabFlag == 1) {
					sDataElement.name = "今年";
					sDataElementOld.name = "去年";
				} else {
					if (parameter.dateFlag == 1) {
						sDataElement.name = "今天";
						sDataElementOld.name = "昨天";
					} else {
						sDataElement.name = "当月";
						sDataElementOld.name = "上月";
					}
				}

				//今年数据解析
				for (var i = 0; i < realdata.length; i++) {
					temp = new Object();

					if (parameter.charFlag == 1)
						temp.name = realdata[i].showName;
					else
						temp.name = dateFormter(parameter.dateFlag, realdata[i].rectime);
					xData.push(temp.name);

					temp.y = parseFloat(realdata[i].dataValue);
					sDataElement.data.push(temp);
				}

				//去年数据解析
				for (var j = 0; j < olddata.length; j++) {
					temp = new Object();

					if (parameter.charFlag == 1)
						temp.name = realdata[j].showName;
					else
						temp.name = dateFormter(parameter.dateFlag, realdata[j].rectime);

					xData.push(temp.name);
					temp.y = parseFloat(olddata[j].dataValue);
					sDataElementOld.data.push(temp);
				}

				sData.push(sDataElement);
				sData.push(sDataElementOld);

				var lastResult = new Object();
				xData = uniq(xData);
				result.xData = uniq(xData);
				result.sData = sData;
				//							res.send(result);

				var tmp = new Array();
				var item = {};

				item.xData = uniq(xData);
				item.sData = sData;

				tmp.push(item);

				if (parameter.charFlag == 1)
					tbhbHngn(parameter.id, 0, xData, sData);
				else
					globalTools.tbhbCallback(item, parameter);
			}
		}

		function dateFormter(dateFlag, dateValue) {
			if (dateFlag == 1) {
				var tmp = dateValue.substring(11, 13);
				if (tmp.substring(0, 1) == '0') {
					tmp = tmp.substring(1, 2);
				}
				return tmp + '点';
			}
			if (dateFlag == 2) {
				var tmp = dateValue.substring(8, 10);
				if (tmp.substring(0, 1) == '0') {
					tmp = tmp.substring(1, 2);
				}
				return tmp + '日';
			}
		}




		// tbhb bottom
		//		localJsonp.start({
		//			url: jsonpPath + 'tbhb3.js',
		//			parameter: {
		//				id: 'tbhbNyzhlyl',
		//				fn: globalTools.tbhbLines,
		//				options: optionsLines
		//			},
		//			jsonpCallback: 'tbhb3',
		//			done: globalTools.tbhbCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'tbhb4.js',
		//			parameter: {
		//				id: 'tbhbJnl',
		//				fn: globalTools.tbhbLines,
		//				options: optionsLines
		//			},
		//			jsonpCallback: 'tbhb4',
		//			done: globalTools.tbhbCallback
		//		});


		/*array 去重*/
		function uniq(array) {
			var map = {};
			var re = [];
			for (var i = 0, l = array.length; i < l; i++) {
				if (typeof map[array[i]] == "undefined") {
					map[array[i]] = 1;
					re.push(array[i]);
				}
			}
			return re;
		}

		//end
	}());


});