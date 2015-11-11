
define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , moment = require('moment')
      , datapicker = require('bootstrap-datetimepicker.min')
      , highcharts = require('exporting')
      , options = require('app/highchartsConfig')
      , jsonpPath = require('app/getJsonp')
      , proto = require('app/highstockMod')
      ;
      (function(){
      $('.tbhb-switch-box').find('li').click(function(){
            selectFn(this,'li'); 
      });
      function selectFn(sel,siblings) {
           $(sel).siblings(siblings).removeClass('active').end().addClass('active'); 
      }
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

        var l1, l2;
    function showStock(data) {
         l1 = tbhbBottom('tbhbNyzhlyl',data);
         l2 = tbhbBottom('tbhbJnl',data);
setDatetimepicker('#tbhbJnlDate1',l2);
//setDatetimepicker('#tbhbJnlDate2',l2);
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
         return stock;
            };
                        

 //日月年
$('#nyzhlylButton button').click(function(){ stockWithButton.call(this,l1) });
$('#tbhbJnlButton button').click(function(){ stockWithButton.call(this,l2) });

function stockWithButton(fn) {
    //e.preventDefault();
    // OK, pretty ugly :)
    var call = 'zoom' + $(this).attr('data-range');
    // I have two globally accessible charts here:
    if ($(this).attr('data-chart') == 'line') {
        fn[call]();
    } else {
        candleChart[call]();
    }
    $(this).siblings('button').removeClass('active').end().addClass('active');
}

          //时间控件
var nowDate = new Date();
          function setDatetimepicker(id,fn) {
            var dd = fn;
           $(id).datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(id,dd){ console.log(12121,typeof id);console.log(9999,dd);changeDate('#tbhbJnlDate1','#tbhbJnlDate2',dd)});
          }

        function changeDate(date1,date2,fn) {
            var from = $(date1).data("DateTimePicker").date().format("YYYY-MM-DD");
            var f = moment.utc(from);
         
            var to = $(date2).data("DateTimePicker").date().format("YYYY-MM-DD");
            var t = moment.utc(to);
            console.log(fn)
            fn['zoomWithDate'](f.valueOf(), t.valueOf());
        
        }

//end
      }());


});
