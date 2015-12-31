define(function(require) {
	var $ = require('jquery'),
		zh_cn = require('moment-zh-cn'),
		moment = require('moment'),
		datapicker = require('bootstrap-datetimepicker.min'),
		bootstrap = require('bootstrap'),
		highcharts = require('exporting'),
		globalTools = require('app/globalTools'),
		options = require('app/highchartsConfig'),
		projectid = require('app/checkProjectid'),
		api = require('app/getApi'),
		optionsBase = require('app/highchartsConfigBase'),
		optionsLines = require('app/highchartsConfigLines'),
		datetimepickerObj = require('app/dateObj');
	(function() {

		//var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间
        var dateStar = '2015-12-15'; //初始化查询时间

		var todayGroup, yesterdayGroup, monthGroup, yearGroup;
        var hnfxData = [];
		// 0，1，2，3四分图位置
		var popupFilter = [
			['today', 'yestday', 0],
			['yestday', 'lastday', 2],
			['year', 'lastyear', 3],
			['month', 'lastmonth', 1]
		];

var loadConfig = [['.my-card'], 1];
var url = '/api/consumptionEnergyInfo/list.json';
optionsBase.yAxis.title.text='khw';
var parameterConfig = {
				dir: {
					today: ['drgnsp', '耗能量'],
					yestday: ['qrgnsp', '耗能量'],
					month: ['dygnsp', '耗能量'],
					year: ['dngnsp', '耗能量']
				},
				id: 'drgnsp',
				name: '',
                self: globalTools,
                popupFilter:popupFilter, 
todayGroup:todayGroup, yesterdayGroup:yesterdayGroup, monthGroup:monthGroup, yearGroup:yearGroup,
				options: optionsBase
			};
		
		//弹出层
		$('.gnhnIcon').on('click', globalTools.modalFn);

		$('#myModal').on('shown.bs.modal', function() {
			var num = $(this).attr('data-num');
			var parameter = {
				options: optionsLines,
				color: 'transparent'
			};
        var data, type;
        for(var i = 0, l = hnfxData[0].length; i < l; i++) {
            data = hnfxData[0][i][0];
            type = hnfxData[0][i][1];
            switch (type) {
                case 0:
                    todayGroup = data;
                    break;
                case 1:
                    monthGroup = data;
                    break;
                case 2:
                    yesterdayGroup = data;
                    break;
                case 3:
                    yearGroup = data;
                    break;
            }
        }
            switch (num) {
                case '0':
                    globalTools.modalLines(todayGroup, parameter);
                    break;
                case '1':
                    globalTools.modalLines(monthGroup, parameter);
                    break;
                case '2':
                    globalTools.modalLines(yesterdayGroup, parameter);
                    break;
                case '3':
                    globalTools.modalLines(yearGroup, parameter);
                    break;
            }
		});


		// tooltips
		$('[data-toggle="tooltip"]').tooltip();
		//时间控件
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
			dateStar = ev.date.format('YYYY-MM-DD');
			demand.start({
                url: url,
                loadContainer: loadConfig,
                parameter: parameterConfig ,
				data: {
					projectid: projectid,
					dateStar: dateStar
				},
                done: function(data,parameter){ hnfxData = []; hnfxData.push(globalTools.gnhnFn(data,parameter)); } 
			});
		});


		//图表
		demand.start({
			url: url,
			loadContainer: loadConfig,
			parameter: parameterConfig ,
			data: {
				projectid: projectid,
				dateStar: dateStar
			},
			done: function(data,parameter){ hnfxData.push(globalTools.gnhnFn(data,parameter)); } 
		});



	}());
});
