
define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , moment = require('moment')
      , datapicker = require('bootstrap-datetimepicker.min')
      , options = require('app/highchartsConfig')
      , optionsLines = require('app/highchartsConfigLines')
      , jsonpPath = require('app/getJsonp')
      , proto = require('app/highstockMod')
      , highcharts = require('app/card') 
      ;

      (function(){
      var chart;
      var chartLines;

          tbhbClick('.tbhb-switch-box-top','li','tbhb2',tbhbHngn); 
          tbhbClick('.date-controls-box-top','button','tbhb2',tbhbHngn);
          tbhbClick('.tbhb-switch-box-bottom','li','tbhb3',tbhbLines); 
          tbhbClick('.date-controls-box-bottom','button','tbhb3',tbhbLines);

          function tbhbClick(name,tag,jsonp,fn) {
              $(name).find(tag).click(function(){
                  var charts = $(this).parents('.my-card').find('.chart-box').attr('id'); 
                  localJsonp.start({url:jsonpPath+jsonp+'.js',parameter:{pointer:this,charts:charts,tag:tag,fn:fn},jsonpCallback:jsonp,done:tbhbGhg3});
              });
          }
         function tbhbGhg3(data,parameter) {
            parameter.fn(parameter.charts,data[0].xData,data[0].sData);
            selectFn(parameter.pointer,parameter.tag); 
         }
      function selectFn(sel,siblings) {
           $(sel).siblings(siblings).removeClass('active').end().addClass('active'); 
      }
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

        localJsonp.start({url:jsonpPath+'tbhb3.js',jsonpCallback:'tbhb3',done:tbhbBottom});

        function tbhbBottom(data) {
            tbhbLines('tbhbNyzhlyl',data[0].xData,data[0].sData);
            tbhbLines('tbhbJnl',data[0].xData,data[0].sData);
        }
        function tbhbLines(id,xData,sData) {
              optionsLines.chart.renderTo = id;
              optionsLines.xAxis.categories = xData;
              optionsLines.series = sData;
              chartLines = new Highcharts.Chart(optionsLines); 
        }
         //localJsonp.start({url:jsonpPath+'stockData.js',jsonpCallback:'callback',done:showStock});


        //var l1, l2;
    //function showStock(data) {
         //l1 = tbhbBottom('tbhbNyzhlyl',data);
         //l2 = tbhbBottom('tbhbJnl',data);
//setDatetimepicker('#tbhbJnlDate1',l2);
//setDatetimepicker('#tbhbJnlDate2',l2);
    //}
         //function tbhbBottom(id, data) {
            //var stockOptions = {
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
        //}
         //stockOptions.chart.renderTo = id;   
         //stockOptions.series.data = data;   
         //stock = new Highcharts.StockChart(stockOptions); 
         //return stock;
            //};
                        

 //日月年
//$('#nyzhlylButton button').click(function(){ stockWithButton.call(this,l1) });
//$('#tbhbJnlButton button').click(function(){ stockWithButton.call(this,l2) });

//function stockWithButton(fn) {
    ////e.preventDefault();
    //// OK, pretty ugly :)
    //var call = 'zoom' + $(this).attr('data-range');
    //// I have two globally accessible charts here:
    //if ($(this).attr('data-chart') == 'line') {
        //fn[call]();
    //} else {
        //candleChart[call]();
    //}
    //$(this).siblings('button').removeClass('active').end().addClass('active');
//}

          ////时间控件
//var nowDate = new Date();
          //function setDatetimepicker(id,fn) {
            //var dd = fn;
           //$(id).datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(id,dd){ console.log(12121,typeof id);console.log(9999,dd);changeDate('#tbhbJnlDate1','#tbhbJnlDate2',dd)});
          //}

        //function changeDate(date1,date2,fn) {
            //var from = $(date1).data("DateTimePicker").date().format("YYYY-MM-DD");
            //var f = moment.utc(from);
         
            //var to = $(date2).data("DateTimePicker").date().format("YYYY-MM-DD");
            //var t = moment.utc(to);
            //console.log(fn)
            //fn['zoomWithDate'](f.valueOf(), t.valueOf());
        
        //}

//end
      }());


});
