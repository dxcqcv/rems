define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
        zh_cn = require('moment-zh-cn'),
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

		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

        //$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
        $('.datetimepicker1').datetimepicker(datetimepickerObj);
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
