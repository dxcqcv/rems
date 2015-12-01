define(function(require) {
	var $ = require('jquery'),
		zh_cn = require('moment-zh-cn'),
		datapicker = require('bootstrap-datetimepicker.min'),
		bootstrap = require('bootstrap'),
		jsonpPath = require('app/getJsonp'),
		highcharts = require('exporting'),
		globalTools = require('app/globalTools'),
		options = require('app/highchartsConfig'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines'),
		datetimepickerObj = require('app/dateObj');
	(function() {

		var projectid = 1;
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
				id: 'drgnsp',
				options: options
			},
			data: {
				projectid: projectid,
				dateStar: dateStar
			},
			done: res
		});

		function res(data, parameter) {
			var result = data.status.data;

			var xData = new Array;
			var sData = new Array;

			//---------------总的页面----------------------
			//-------------------当日--------------------
			var today = data.status.data.today;
			var dataItem = [];
			$.each(today.totalData, function(i, v) {
				dataItem = new Array;
				dataItem.push(globalTools.dateFormterItem(1, i));
				dataItem.push(v);
				xData.push(dataItem);
			});
			today.data = xData;

			var baseLines = [];
			var line = new Object;
			line.vaule = today.line; // 约束性指标
			baseLines.push(line);
			line = new Object;
			line.vaule = today.line1; // 引导性指标
			baseLines.push(line);

			today.baseLines = baseLines;

			console.log(today);

			globalTools.ghnCallback(today, parameter);
			//-------------------当日--------------------


			//-------------------昨天--------------------
			xData = new Array;
			var yestday = data.status.data.yestday;
			dataItem = new Array;
			$.each(yestday.totalData, function(i, v) {
				dataItem = new Array;
				dataItem.push(globalTools.dateFormterItem(1, i));
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

			console.log(yestday);
			parameter.id = 'qrgnsp';
			globalTools.ghnCallback(yestday, parameter);

			//-------------------昨天--------------------

			//-------------------当月--------------------
			var month = data.status.data.month;
			xData = new Array;
			sData = new Array;
			dataItem = new Array;
			$.each(month.totalData, function(i, v) {
				dataItem = new Array;
				dataItem.push(globalTools.dateFormterItem(2, i));
				dataItem.push(v);
				xData.push(dataItem);
			});
			month.data = xData;

			var baseLines = new Array;
			var line = new Object;
			line.vaule = month.line; // 约束性指标
			baseLines.push(line);
			line = new Object;
			line.vaule = month.line1; // 引导性指标
			baseLines.push(line);

			month.baseLines = baseLines;

			console.log(month);
			parameter.id = 'dygnsp';
			globalTools.ghnCallback(month, parameter);
			//-------------------当月--------------------

			//						console.log(month);

			//-------------------当年--------------------
			var year = data.status.data.year;
			xData = new Array;
			sData = new Array;
			dataItem = new Array;
			$.each(year.totalData, function(i, v) {
				dataItem = new Array;
				dataItem.push(globalTools.dateFormterItem(3, i));
				dataItem.push(v);
				xData.push(dataItem);
			});
			year.data = xData;

			var baseLines = new Array;
			var line = new Object;
			line.vaule = year.line; // 约束性指标
			baseLines.push(line);
			line = new Object;
			line.vaule = year.line1; // 引导性指标
			baseLines.push(line);

			year.baseLines = baseLines;

			console.log(year);
			parameter.id = 'dngnsp';
			globalTools.ghnCallback(year, parameter);
			//-------------------当年--------------------

			//			console.log(year);
			//---------------总的页面----------------------



			//---------------详细页面----------------------
			//-------------------当日--------------------
			xData = new Array;
			sData = new Array;
			var today = data.status.data.today.resList;
			console.log(today);
			$.each(today, function(i, v) {
				xData.push(globalTools.dateFormterItem(1, v.rectime), v);
				sData.push(v);
			});
			today.xData = xData;
			//			today.sData = sData;
			today.line; // 约束性指标
			today.line1; // 引导性指标
			var baseLines = [];
			var line = {};
			line.vaule = today.line;
			baseLines.push(line);
			var line = {};
			line.vaule = today.line1;
			baseLines.push(line);

			today.baseLines = baseLines;

			//-------------------当日--------------------
			//globalTools.uniq();();




			//globalTools.ghnCallback(data, parameter);
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

	}());
});