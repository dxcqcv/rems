define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
	  , highcharts = require('exporting')
      , jsonpPath = require('app/getJsonp')
      ;
	$(function() {
    //时间控件
       $('.datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD',
            defaultDate: new Date()
       });
        //图表
          var options = {
            chart: {
                renderTo: 'ztnyjg',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                defaultSeriesType: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: null 
            },
            exporting: {
              enabled:false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{}]
            }]
        };
        Highcharts.setOptions({
             chart: {
             backgroundColor: '#ddd'
         }
        });

         localJsonp.start({url:jsonpPath+'pieData.js',jsonpCallback:'pie1',done:highchartsJsonp});
         function highchartsJsonp(data) {
            options.chart.renderTo = 'ztnyjg'; 
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }

         function highchartsJsonp2(data) {
            options.chart.renderTo = 'kzsny'; 
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp3(data) {
            options.chart.renderTo = 'qjnyjg'; 
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         localJsonp.start({url:jsonpPath+'pieData2.js',jsonpCallback:'pie2',done:highchartsJsonp2});
         localJsonp.start({url:jsonpPath+'pieData3.js',jsonpCallback:'pie3',done:highchartsJsonp3});
    });
	
	
});

