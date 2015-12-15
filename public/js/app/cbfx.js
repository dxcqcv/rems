define(function(require) {
	var
		moment = require('moment'),
		selectpicker = require('bootstrap-select'),
		datapicker = require('bootstrap-datetimepicker.min'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		projectid = require('app/checkProjectid'),
		highcharts = require('exporting'),
		jsonpPath = require('app/getJsonp'),
		api = require('app/getApi'),
		zh_cn = require('moment-zh-cn'),
		optionsArea = require('app/highchartsConfigArea'),
		optionsStactColumn = require('app/highchartsConfigStactColumn'),
		globalTools = require('app/globalTools'),
		datetimepickerObj = require('app/dateObj');




	(function() {
		var dateFlag = 1;

		var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间
		var oldDate; //防止重复

		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
			dateFlag = setDate.getFlag();

			switch (dateFlag) {
				case 1:
					if (ev.date === undefined) dateStar = $this.find('input').val();
					else dateStar = ev.date.format('YYYY-MM-DD');
					if (oldDate == dateStar) break;
					oldDate = dateStar;
					break;
				case 2:
					if (ev.date === undefined) dateStar = $this.find('input').val();
					else dateStar = ev.date.format('YYYY-MM');
					if (oldDate == dateStar) break;
					oldDate = dateStar;
					break;
				case 3:
					if (ev.date === undefined) dateStar = $this.find('input').val();
					else dateStar = ev.date.format('YYYY');
					if (oldDate == dateStar) break;
					oldDate = dateStar;
					break;
			}

			loaddata();
		});

		loaddata();

		function loaddata() {
			demand.start({
				loadContainer: [
					//['#dwgncbqxCharts', '#dwgncbbl'], 1
                    ['#cbfx'], 1
				],
				url: '/api/costProfit/costProfitChart.json',
				parameter: {
					dateFlag: dateFlag
				},
				data: {
					projectid: projectid,
					dateFlag: dateFlag,
					dateStar: dateStar
				},
				done: cbfxLinesData
			});
		}


		function cbfxLinesData(data, parameter) {
			console.log(data);
            if(data.status.data.curve.length ===0) return;
			// 单位供能成本曲线
			var curveY = data.status.data.curve;
			var sData = new Array;
			$.each(curveY, function(i, v) {
				sData.push(parseFloat(v));
			});

			// 单位供能成本比例
			var ratio = data.status.data.ratio;

			//后台X轴的值
			var xDataTmp = data.status.data.xDataList;

			var xData = new Array;

			$.each(xDataTmp, function(i, v) {
				var tmp = globalTools.dateFormterItem(parameter.dateFlag, v);
				xData.push(tmp);
			});

			var item = new Object;
			item.name = "成本";
			item.data = sData;

			buildCbfxLines("dwgncbqxCharts", xData, item);

			var tmpDate = new Array;
			var tmpItem = new Object;
			$.each(ratio, function(x, y) {
				tmpItem = new Object;
				tmpItem.name = x;
				var tmpArr = new Array;
				$.each(y, function(m, p) {
					tmpArr.push(parseFloat(p.datavalue));
				});
				tmpItem.data = tmpArr;
				tmpDate.push(tmpItem);
			});
			buildCbfxColumn("dwgncbbl", xData, tmpDate);
		}

		function buildCbfxLines(id, xData, sData) {
			optionsArea.chart.renderTo = id;
			optionsArea.series[0] = sData;
			optionsArea.xAxis.categories = xData;
			chart = new Highcharts.Chart(optionsArea);
		}

		function buildCbfxColumn(id, xData, sData) {
			optionsStactColumn.chart.renderTo = id;
			optionsStactColumn.series = sData;
			optionsStactColumn.xAxis.categories = xData;
			chartCol = new Highcharts.Chart(optionsStactColumn);
		}

	}());

});
