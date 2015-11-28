define(function(require) {
	var
		moment = require('moment'),
		datapicker = require('bootstrap-datetimepicker.min'),
		jsonpPath = require('app/getJsonp'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines');

	(function() {

		var projectid = 1;
		var dateFlag = 1;
		var dateStr = '2015-09-01';
		// 日月年
		//		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);
		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
			var jsonpName, dateFn;
			console.log($(this).find('input').val());
			switch (id) {
				case 'zbfxNyzhlyl':
					jsonpName = 'tbhb3';
					dateFn = globalTools.tbhbLines;
					break;
				case 'zbfxJnl':
					jsonpName = 'tbhb4';
					dateFn = globalTools.tbhbLines;
					break;
				case 'zbfxEyhtjpl':
					jsonpName = 'tbhb5';
					dateFn = globalTools.tbhbLines;
					break;
				case 'zbfxKzsnylyl':
					jsonpName = 'tbhb6';
					dateFn = globalTools.tbhbLines;
					break;
			}
			demand.start({
				url: jsonpPath + jsonpName + '.js',
				parameter: {
					id: id,
					fn: dateFn,
					options: optionsLines
				},
				jsonpCallback: jsonpName,
				done: globalTools.tbhbCallback
			});
		});

		// 图表
		var chartLines;
		demand.start({
			url: '/api/KPIInfo/list1.json',
			parameter: {
				id: 'zbfxNyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
				name: '能源综合利用率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: res
		});

		demand.start({
			url: '/api/KPIInfo/list2.json',
			parameter: {
				id: 'zbfxJnl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
				name: '节能率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			jsonpCallback: 'tbhb4',
			done: res
		});

		demand.start({
			url: '/api/KPIInfo/list3.json',
			parameter: {
				id: 'zbfxEyhtjpl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
				name: '二氧化碳减排率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			jsonpCallback: 'tbhb5',
			done: res
		});

		demand.start({
			url: '/api/KPIInfo/list4.json',
			parameter: {
				id: 'zbfxKzsnylyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
				name: '可再生能源利用率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			jsonpCallback: 'tbhb6',
			done: res
		});

		//解析数据，变成HighChar识别的数据格式
		function res(data, parameter) {
			var result = data.status.data;
			var tmp = {};
			var sData1 = [];
			var yItem = {};
			tmp.xData = dateFormater(parameter.dateFlag, result.listX);

			yItem.name = parameter.name;
			yItem.data = [];
			$.each(result.listY, function(i, v) {
				yItem.data.push(parseFloat(v));
			});

			sData1.push(yItem)

			tmp.sData = sData1;

			globalTools.tbhbCallback(tmp, parameter);
		}

		//去掉复杂的日期格式
		function dateFormater(dateFlag, data) {
			if (dateFlag == 1) {
				var res = [];
				$.each(data, function(i, v) {
					var tmp = v.substring(11, 13);
					if (tmp.substring(0, 1) == '0') {
						tmp = tmp.substring(1, 2);
					}
					res.push(tmp + '点');
				});
				return res;
			}
			if (dateFlag == 2) {
				var res = [];
				$.each(data, function(i, v) {
					var tmp = v.substring(8, 10);
					if (tmp.substring(0, 1) == '0') {
						tmp = tmp.substring(1, 2);
					}
					res.push(tmp + '日');
				});
				return res;
			}
			if (dateFlag == 3) {
				var res = [];
				$.each(data, function(i, v) {
					if (tmp.substring(0, 1) == '0') {
						tmp = tmp.substring(1, 2);
					}
					res.push(tmp + '月');
				});
				return res;
			}
		}

	}());
});