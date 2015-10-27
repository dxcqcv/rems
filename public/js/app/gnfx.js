define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
      , bootstrap = require('bootstrap')
      , jsonpPath= require('app/getJsonp')
	  , highcharts = require('exporting')
      ;
    (function() {
    //弹出层
    $('.gnhnIcon').on('click', function() {
        $("#myModal").modal('show');
         localJsonp.start({url:jsonpPath+'modalLines.js',jsonpCallback:'modalLines',done:modalLines});
    });
    function modalLines(data) {
    console.log(data)
        options.chart.renderTo = 'gnhnHaodianCharts';
        options.chart.type= 'line';
        options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        options.series[0].data = data;
        chart = new Highcharts.Chart(options); 
    }
    // tooltips
         $('[data-toggle="tooltip"]').tooltip();  
    //时间控件
       $('.datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD',
            defaultDate: new Date()
       });
        //图表
          var options = {
            chart: {
                renderTo: 'drgnsp',
                defaultSeriesType: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: null 
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: null 
                }
            },
            series: [{}]
        };
         localJsonp.start({url:jsonpPath+'highchartsJson.js',jsonpCallback:'highchartsJsonp',done:highchartsJsonp});
         localJsonp.start({url:jsonpPath+'highchartsJson2.js',jsonpCallback:'highchartsJsonp2',done:highchartsJsonp2});
         localJsonp.start({url:jsonpPath+'highchartsJson3.js',jsonpCallback:'highchartsJsonp3',done:highchartsJsonp3});
         localJsonp.start({url:jsonpPath+'highchartsJson4.js',jsonpCallback:'highchartsJsonp4',done:highchartsJsonp4});
         function highchartsJsonp(data) {
            options.chart.renderTo = 'drgnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp2(data) {
            options.chart.renderTo = 'dygnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp3(data) {
            options.chart.renderTo = 'qrgnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp4(data) {
            options.chart.renderTo = 'dngnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
    }());
});
