define(function(require) {
	var $ = require('jquery'),
		datapicker = require('bootstrap-datetimepicker.min'),
		moment = require('moment'),
		highcharts = require('exporting'),
		projectid = require('app/checkProjectid'),
		setDate = require('app/setDate'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		datetimepickerObj = require('app/dateObj'),
		zh_cn = require('moment-zh-cn'),
		api = require('app/getApi'),
		optionsPie = require('app/highchartsConfigPie');
	(function() {
                         // 日期
		var dateFlag = 1, dateTips = 1;
		var oldDate; //防止重复
		//var dateStar = '2015-09-01';
        var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间
		// 日月年
		//jgfxClick('.date-controls-box', 'button', jsonpPath);
		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//function jgfxClick(name, tag, jsonpPath, jsonp, ajaxFn, setDateFn) {
			//$(name).find(tag).click(function() {
				//var $this = $(this);
				//setDate.changeDate($this);
				//globalTools.selectFn($this, 'button');

                //buildJgPie([
                    //['pieData', 'ztnyjg', 'pie1'],
                    //['pieData2', 'kzsny', 'pie2'],
                    //['pieData3', 'qjnyjg', 'pie3']
                //]);
			//});
		//}
		//时间控件
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {

			//buildJgPie([
				//['pieData', 'ztnyjg', 'pie1'],
				//['pieData2', 'kzsny', 'pie2'],
				//['pieData3', 'qjnyjg', 'pie3']
			//]);
            
            var url, dateOptionid, config;
            dateFlag = setDate.getFlag();


            switch(dateFlag) {
                case 1:
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY-MM-DD');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
                case 2: 
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY-MM');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
                case 3: 
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
            }
            
            demand.start({
                url: '/api/structureInfo/list.json',
                parameter: {
                    id: 'ztnyjg'
                },
                data: {
                    projectid: projectid,
                    dateFlag: dateFlag,
                    dateStar: dateStar
                },
                done: resultFormater
            });
		});
		//图表
		//		buildJgPie([
		//			['pieData', 'ztnyjg', 'pie1'],
		//			['pieData2', 'kzsny', 'pie2'],
		//			['pieData3', 'qjnyjg', 'pie3']
		//		]);
		//
		//
		//		function buildJgPie(config) {
		//			for (var i = 0, l = config.length; i < l; i++) {
		//				localJsonp.start({
		//					url: jsonpPath + config[i][0] + '.js',
		//					parameter: {
		//						id: config[i][1]
		//					},
		//					jsonpCallback: config[i][2],
		//					done: highchartsJsonp
		//				});
		//			}
		//		}

		function highchartsJsonp(data, parameter) {
			var chartPie;
			optionsPie.chart.renderTo = parameter.id;
			optionsPie.chart.backgroundColor = '#ddd';
			optionsPie.series[0].data = data;
			chartPie = new Highcharts.Chart(optionsPie);
		}


		demand.start({
			url: '/api/structureInfo/list.json',
			parameter: {
				id: 'ztnyjg',
                dateTips: dateTips 
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar
			},
			done: resultFormater
		});

		function resultFormater(data, parameter) {
			var res1 = [];
			var res2 = [];
			var res3 = [];

			var kzsCount = 0;
			var kzs = new Object;
			var zt = 0;
			var qj = 0;
			var trq = 0;
			var tmp = data.status.data.list;
			$.each(tmp, function(i, v) {
				var item = new Object;
				if (v.showname == '太阳能') {
					item.flag = 1;
					item.name = '太阳能<br>' + v.datavalue + " " + v.energyunit;
					item.datavalue = parseFloat(v.datavalue);
					item.y = 0;
					kzsCount += parseFloat(v.datavalue);
					res3.push(item);
				}
				if (v.showname == '地热') {
					item.flag = 2;
					item.name = '地热<br>' + v.datavalue + " " + v.energyunit;
					item.datavalue = parseFloat(v.datavalue);
					item.y = 0;
					kzsCount += parseFloat(v.datavalue);
					res3.push(item);
				}
				if (v.showname == '天然气') {
					item.name = '天然气<br>' + v.datavalue + " " + v.energyunit;
					item.y = 0;
					item.datavalue = parseFloat(v.datavalue);
					trq += parseFloat(v.datavalue);
					res2.push(item);
					res1.push(item);
					qj += parseFloat(v.datavalue);
					zt += parseFloat(v.datavalue);
				}
				if (v.showname == '市电') {
					item.name = '市电<br>' + v.datavalue + " " + v.energyunit;
					item.y = 0;
					item.datavalue = parseFloat(v.datavalue);
					res1.push(item);
					zt += parseFloat(v.datavalue);
				}


			});

			kzs.name = "可再生能源<br>" + kzsCount + " kWh";
			kzs.datavalue = kzsCount;
			kzs.y = 0;

			zt += kzsCount;
			qj += kzsCount;

			res1.push(kzs);
			res2.push(kzs);

			$.each(res1, function(i, v) {
				v.y = parseFloat((v.datavalue / zt * 100).toFixed(1));
			});

			$.each(res2, function(i, v) {
				v.y = parseFloat((v.datavalue / qj * 100).toFixed(1));
			});

			$.each(res3, function(i, v) {
				v.y = parseFloat((v.datavalue / kzsCount * 100).toFixed(1));
			});

			highchartsJsonp(res1, parameter);
			parameter.id = "qjnyjg";
			highchartsJsonp(res2, parameter);
			parameter.id = "kzsny";
			highchartsJsonp(res3, parameter);

			// kzsCount 可再生总量
			// zt 总体
			// qj 清洁
			// trq 天然气
            console.log(kzsCount);
            console.log(zt );
            console.log(qj);
            console.log(trq);

            $('.dateTips').text();
		}

	}());


});
