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

		// 日月年
		//		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);
		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
			var jsonpName, dateFn;
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
				dateFlag: 1,
				name: '能源综合利用率'
			},
			data: {
				projectid: 1,
				dateFlag: 2,
				dateStar: '2015-09'
			},
			done: res
		});

		demand.start({
			url: '/api/KPIInfo/list2.json',
			parameter: {
				id: 'zbfxJnl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: 1,
				name: '节能率'
			},
			data: {
				projectid: 1,
				dateFlag: 2,
				dateStar: '2015-09'
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
				dateFlag: 1,
				name: '二氧化碳减排率'
			},
			data: {
				projectid: 1,
				dateFlag: 2,
				dateStar: '2015-09'
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
				dateFlag: 1,
				name: '可再生能源利用率'
			},
			data: {
				projectid: 1,
				dateFlag: 2,
				dateStar: '2015-09'
			},
			jsonpCallback: 'tbhb6',
			done: res
		});

		function res(data, parameter) {
			var result = data.status.data;
			console.log(parameter.id);
			console.log(result);
			var tmp = {};
			var sData1 = [];
			var yItem = {};
			tmp.xData = dateFormater(parameter.dateFlag, result.listX);
			console.log(tmp.xData);

			yItem.name = parameter.name;
			yItem.data = [];
			$.each(result.listY, function(i, v) {
				yItem.data.push(parseFloat(v));
			});

			sData1.push(yItem)

			tmp.sData = sData1;

			globalTools.tbhbCallback(tmp, parameter);
		}

		function dateFormater(dateFlag, data) {
			if (dateFlag == 1) {
				var res = [];
				$.each(data, function(i, v) {
					res.push(v.substring(11, 13) + '点');
				});
				return res;
			}
			if (dateFlag == 2) {
				var res = [];
				$.each(data, function(i, v) {
					res.push(v.substring(8, 10) + '日');
				});
				return res;
			}
			if (dateFlag == 3) {
				var res = [];
				$.each(data, function(i, v) {
					res.push(v.substring(5, 7) + '月');
				});
				return res;
			}
		}

	}());
});