
define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , highcharts = require('exporting')
      , options = require('app/highchartsConfig')
      , jsonpPath = require('app/getJsonp')
      ;
      (function(){
      //日期控件
       $('.datetimepicker1').datetimepicker();
      //下拉选择
      $('.selectpicker').selectpicker({
      });
      //图表
         localJsonp.start({url:jsonpPath+'tbhb.js',jsonpCallback:'tbhb',done:tbhbGhg});
         function tbhbGhg(data) {
            tbhbHngn('tbhbHaoneng',data[0].xData,data[0].sData);
            tbhbHngn('tbhbGongneng',data[0].xData,data[0].sData);
         }
function tbhbHngn(id,xData,sData) {
      options.chart.type = 'column';
      options.chart.renderTo = id;
      options.xAxis.categories = xData;
      options.plotOptions.series.dataLabels.enabled = true;
      options.plotOptions.series.dataLabels.format = '{point.y:.1f}%';
      options.series = sData;

      chart = new Highcharts.Chart(options); 
}


         localJsonp.start({url:jsonpPath+'stockData.js',jsonpCallback:'callback',done:showStock});

    function showStock(data) {
         tbhbBottom('tbhbNyzhlyl',data);
    }
         function tbhbBottom(id, data) {
            var stockOptions = {
                chart: {
                renderTo: 'nyzhlyl',
                type: 'line',
            },
             yAxis: { // 基线
                 title: {
                     text: null 
                 },
                 plotLines: [{
                     value: 125,
                     width: 1,
                     zIndex: 2,
                     color: 'red'
                 }]
             },
            credits: {
                enabled: false
            },
            exporting: {
                      enabled:false
                    },
            series: [{
                id: "data",
                data: data
            }],
            rangeSelector: {
                /* It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one*/
                enabled: false
            }
        }
         stockOptions.chart.renderTo = id;   
         stockOptions.series.data = data;   
         stock = new Highcharts.StockChart(stockOptions); 
            };
                        
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
      }());


});
