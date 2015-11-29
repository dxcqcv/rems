define(function(require) {
	var
		moment = require('moment'),
        zh_cn = require('moment-zh-cn'),
		datapicker = require('bootstrap-datetimepicker.min'),
		jsonpPath = require('app/getJsonp'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		api = require('app/getApi'),
        projectid = require('app/checkProjectid'),
		optionsLines = require('app/highchartsConfigLines');

	(function() {

		var dateFlag = 1;
		var dateStr = '2015-09-01';
		// 日月年
		//		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);
        var dataP = {projectid:1,dateFlag:1,dateStr:'2015-08-01'};

		globalTools.tbhbClick('#nyzhlylButton', 'button', '/api/KPIInfo/list1.json',dataP, globalTools.formatZbLines, demand, setDate, globalTools, optionsLines);

		//时间空间
        $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
            var $this = $(this); 
			var id = $this.parents('.my-card').find('.chart-box').attr('id');
			var jsonpName, dateFn;
            console.log($this.find('input').val());
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
			//demand.start({
				//url: jsonpPath + jsonpName + '.js',
				//parameter: {
					//id: id,
					//fn: dateFn,
					//options: optionsLines
				//},
				//jsonpCallback: jsonpName,
				//done: globalTools.tbhbCallback
			//});
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
                self:globalTools,
				name: '能源综合利用率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: globalTools.formatZbLines
		});

		demand.start({
			url: '/api/KPIInfo/list2.json',
			parameter: {
				id: 'zbfxJnl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
                self:globalTools,
				name: '节能率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: globalTools.formatZbLines
		});

		demand.start({
			url: '/api/KPIInfo/list3.json',
			parameter: {
				id: 'zbfxEyhtjpl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
                self:globalTools,
				dateFlag: dateFlag,
				name: '二氧化碳减排率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: globalTools.formatZbLines
		});

		demand.start({
			url: '/api/KPIInfo/list4.json',
			parameter: {
				id: 'zbfxKzsnylyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
                self:globalTools,
				dateFlag: dateFlag,
				name: '可再生能源利用率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: globalTools.formatZbLines
		});


	}());
});
