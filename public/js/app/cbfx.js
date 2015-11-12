define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
	  , highcharts = require('exporting')
      , jsonpPath = require('app/getJsonp')
      , optionsArea = require('app/highchartsConfigArea')
      ;
	$(function() {

         localJsonp.start({url:jsonpPath+'cbfxLines.js',jsonpCallback:'cbfxLines',parameter:{id:'dwgncbqxCharts'},done:cbfxLinesData});
        
         function cbfxLinesData(data,parameter) {
             buildCbfxLines(parameter.id,data);
         }
         function buildCbfxLines(id,sData){
              optionsArea.chart.renderTo = id;
              optionsArea.series[0] = sData;
              chart = new Highcharts.Chart(optionsArea); 
         }
    //时间控件
       $('.datetimepicker1').datetimepicker();
    //图表
        //$('.haichar').highcharts({
            //chart: {
                //type: 'area'
            //},

            //title: {
                //text: null
            //},
            //exporting: {
              //enabled:false
            //},
            //tooltip: {
                //shared: true,
                //valueSuffix: ' millions'
            //},
            //plotOptions: {
                //area: {
                    //stacking: 'normal',
                    //lineColor: '#666666',
                    //lineWidth: 1,
                    //marker: {
                        //lineWidth: 1,
                        //lineColor: '#666666'
                    //}
                //}
            //},
            //series: [{
                //name: 'Asia',
                //data: [11, 22, 5, 16, 12, 21, 28]
            //}]
        //});
	});

	$(function() {
		$('.haitwo').highcharts({
			chart: {
				type: 'column'
			},
            exporting: {
              enabled:false
            },
			title: {
				text: null
			},
			xAxis: {
				categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
			},
			tooltip: {
				formatter: function() {
					return '<b>' + this.x + '</b><br/>' +
						this.series.name + ': ' + this.y + '<br/>' +
						'Total: ' + this.point.stackTotal;
				}
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					pointWidth: 15,
				}
			},
			series: [{
				name: 'John',
				data: [5, 3, 4, 7, 2, 6, 7],
				stack: 'male'
			}, {
				name: 'Joe',
				data: [3, 4, 4, 2, 5, 6, 2],
				stack: 'male'
			}, {
				name: 'Jane',
				data: [2, 5, 3, 2, 1, 2, 3],
				stack: 'female'
			}]
		});
	});
	
	
});

