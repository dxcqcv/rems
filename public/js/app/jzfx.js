define(function(require) {
	var
		moment = require('moment'),
		selectpicker = require('bootstrap-select'),
		datapicker = require('bootstrap-datetimepicker.min'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		zh_cn = require('moment-zh-cn'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines');

	(function() {
		var projectid = 1;
		var dateFlag = 1;
		var dateStar = '2015-09-01';
		var optionid = 10042;
		var optionid2 = 10042;
		demand.start({
			url: '/api/deviceGroupInfo/listOption.json',
			parameter: {
				id: '#cchpSel',
				idList: ['#lqlwSel', '#bzyxfaSel1', '#bzyxfaSel2']
			},
			data: {
				projectid: projectid,
			},
			done: dropDownList
		});

		/*localJsonp.start({
			url: jsonpPath + 'jzfxSel1.js',
			parameter: {
				id: '#lqlwSel'
			},
			jsonpCallback: 'jzfxSel1',
			done: globalTools.selCallback
		});
		localJsonp.start({
			url: jsonpPath + 'jzfxSel2.js',
			parameter: {
				id: '#bzyxfaSel1'
			},
			jsonpCallback: 'jzfxSel2',
			done: globalTools.selCallback
		});
		localJsonp.start({
			url: jsonpPath + 'jzfxSel3.js',
			parameter: {
				id: '#bzyxfaSel2'
			},
			jsonpCallback: 'jzfxSel3',
			done: globalTools.selCallback
		});*/

		$('.selectpicker').change(function() {
			var charts = $(this).parents('.my-card').find('.chart-box').attr('id');
			localJsonp.start({
				url: jsonpPath + 'tbhb3.js',
				parameter: {
					charts: charts,
					fn: globalTools.tbhbLines,
					options: optionsLines
				},
				jsonpCallback: 'tbhb3',
				done: globalTools.selFn
			});
		});
		$('#jzfxTabs').children('li').on('click', function() {
			var $this = $(this);
			var flag = $this.data('flag');
			var charts = $this.parents('.my-card').find('.chart-box').attr('id');
			if (flag == 0) {
				localJsonp.start({
					url: jsonpPath + 'jzfxSel1.js',
					parameter: {
						id: '#lqlwSel'
					},
					jsonpCallback: 'jzfxSel1',
					done: globalTools.selCallback
				});
			} else {
				localJsonp.start({
					url: jsonpPath + 'jzfxSel4.js',
					parameter: {
						id: '#lqlwSel'
					},
					jsonpCallback: 'jzfxSel4',
					done: globalTools.selCallback
				});
			}
			//note self is globalTools
			localJsonp.start({
				url: jsonpPath + 'tbhb3.js',
				parameter: {
					pointer: this,
					charts: charts,
					fn: globalTools.tbhbLines,
					self: globalTools,
					options: optionsLines
				},
				jsonpCallback: 'tbhb3',
				done: globalTools.selTabFn
			});
		});


		// 日月年
		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, localJsonp.start, setDate, globalTools, optionsLines);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
			var jsonpName, dateFn;
			switch (id) {
				case 'nyzhlyl':
					jsonpName = 'tbhb3';
					dateFn = globalTools.tbhbLines;
					break;
				case 'jnl':
					jsonpName = 'tbhb4';
					dateFn = globalTools.tbhbLines;
					break;
			}
			localJsonp.start({
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
		localJsonp.start({
			url: jsonpPath + 'tbhb3.js',
			parameter: {
				id: 'nyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines
			},
			jsonpCallback: 'tbhb3',
			done: globalTools.tbhbCallback
		});
		localJsonp.start({
			url: jsonpPath + 'tbhb4.js',
			parameter: {
				id: 'jnl',
				fn: globalTools.tbhbLines,
				options: optionsLines
			},
			jsonpCallback: 'tbhb4',
			done: globalTools.tbhbCallback
		});

		//var l1, l2, l3, l4; 
		////下拉选择
		//$('.selectpicker').selectpicker({
		//});
		////日月年
		//$('#nyzhlylButton button').click(function(e){
		//e.preventDefault();
		//// OK, pretty ugly :)
		//var call = 'zoom' + $(this).attr('data-range');
		//// I have two globally accessible charts here:
		//if ($(this).attr('data-chart') == 'line') {
		//l1[call]();
		//} else {
		//candleChart[call]();
		//}
		//$(this).siblings('button').removeClass('active').end().addClass('active');
		//});

		//$('#jnlButton button').click(function(e){
		//e.preventDefault();
		//// OK, pretty ugly :)
		//var call = 'zoom' + $(this).attr('data-range');
		//// I have two globally accessible charts here:
		//if ($(this).attr('data-chart') == 'line') {
		//l2[call]();
		//} else {
		//candleChart[call]();
		//}
		//$(this).siblings('button').removeClass('active').end().addClass('active');
		//});
		//var nowDate = new Date();
		////时间控件
		//$('#nyzhlylDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#nyzhlylDate1','#nyzhlylDate2',l1)});
		//$('#nyzhlylDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#nyzhlylDate1','#nyzhlylDate2',l1)});
		//$('#jnlDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#jnlDate1','#jnlDate2',l2)});
		//$('#jnlDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#jnlDate1','#jnlDate2',l2)});

		//function changeDate(date1,date2,fn) {
		//var from = $(date1).data("DateTimePicker").date().format("YYYY-MM-DD");
		//var f = moment.utc(from);

		//var to = $(date2).data("DateTimePicker").date().format("YYYY-MM-DD");
		//var t = moment.utc(to);
		//fn['zoomWithDate'](f.valueOf(), t.valueOf());

		//}


		//localJsonp.start({url:jsonpPath+'stockData.js',jsonpCallback:'callback',done:showStock});
		//localJsonp.start({url:jsonpPath+'stockData2.js',jsonpCallback:'callback2',done:showStock2});
		//function showStock(data){
		//l1 = new Highcharts.StockChart({
		//chart: {
		//renderTo: 'nyzhlyl',
		//type: 'line',
		//},
		//yAxis: { // 基线
		//title: {
		//text: null 
		//},
		//plotLines: [{
		//value: 125,
		//width: 1,
		//zIndex: 2,
		//color: 'red'
		//}]
		//},
		//credits: {
		//enabled: false
		//},
		//exporting: {
		//enabled:false
		//},
		//series: [{
		//id: "data",
		//data: data
		//}],
		//rangeSelector: {
		//[> It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one<]
		//enabled: false
		//}
		//});
		//}
		//function showStock2(data){
		//l2 = new Highcharts.StockChart({
		//chart: {
		//renderTo: 'jnl',
		//type: 'line',
		//},
		//yAxis: { // 基线
		//title: {
		//text: null 
		//},
		//plotLines: [{
		//value: 125,
		//width: 1,
		//zIndex: 2,
		//color: 'red'
		//}]
		//},
		//exporting: {
		//enabled:false
		//},
		//credits: {
		//enabled: false
		//},
		//series: [{
		//id: "data",
		//data: data
		//}],
		//rangeSelector: {
		//[> It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one<]
		//enabled: false
		//}
		//});
		//}

	}());
});