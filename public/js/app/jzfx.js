define(function(require){
    var 
        proto = require('app/highstockMod')
      , moment = require('moment')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , card = require('app/card') 
      ;
      (function(){
      var l1, l2, l3, l4; 
      //下拉选择
      $('.selectpicker').selectpicker({
      });
          //日月年
$('#nyzhlylButton button').click(function(e){
    e.preventDefault();
    // OK, pretty ugly :)
    var call = 'zoom' + $(this).attr('data-range');
    // I have two globally accessible charts here:
    if ($(this).attr('data-chart') == 'line') {
        l1[call]();
    } else {
        candleChart[call]();
    }
    $(this).siblings('button').removeClass('active').end().addClass('active');
});
$('#jnlButton button').click(function(e){
    e.preventDefault();
    // OK, pretty ugly :)
    var call = 'zoom' + $(this).attr('data-range');
    // I have two globally accessible charts here:
    if ($(this).attr('data-chart') == 'line') {
        l2[call]();
    } else {
        candleChart[call]();
    }
    $(this).siblings('button').removeClass('active').end().addClass('active');
});
var nowDate = new Date();
          //时间控件
       $('#nyzhlylDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#nyzhlylDate1','#nyzhlylDate2',l1)});
       $('#nyzhlylDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#nyzhlylDate1','#nyzhlylDate2',l1)});
       $('#jnlDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#jnlDate1','#jnlDate2',l2)});
       $('#jnlDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#jnlDate1','#jnlDate2',l2)});

        function changeDate(date1,date2,fn) {
            var from = $(date1).data("DateTimePicker").date().format("YYYY-MM-DD");
            var f = moment.utc(from);
         
            var to = $(date2).data("DateTimePicker").date().format("YYYY-MM-DD");
            var t = moment.utc(to);
            fn['zoomWithDate'](f.valueOf(), t.valueOf());
        
        }


         localJsonp.start({url:jsonpPath+'stockData.js',jsonpCallback:'callback',done:showStock});
         localJsonp.start({url:jsonpPath+'stockData2.js',jsonpCallback:'callback2',done:showStock2});
function showStock(data){
l1 = new Highcharts.StockChart({
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
    series: [{
        id: "data",
        data: data
    }],
    rangeSelector: {
        /* It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one*/
        enabled: false
    }
});
}
function showStock2(data){
l2 = new Highcharts.StockChart({
    chart: {
        renderTo: 'jnl',
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
    series: [{
        id: "data",
        data: data
    }],
    rangeSelector: {
        /* It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one*/
        enabled: false
    }
});
}

      }());
});
