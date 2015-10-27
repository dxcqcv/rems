define(function(require){
    var 
        proto = require('app/highstockMod')
      , moment = require('moment')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , getJsonp = require('app/getJsonp')
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
$('#eyhtjplButton button').click(function(e){
    e.preventDefault();
    // OK, pretty ugly :)
    var call = 'zoom' + $(this).attr('data-range');
    // I have two globally accessible charts here:
    if ($(this).attr('data-chart') == 'line') {
        l3[call]();
    } else {
        candleChart[call]();
    }
    $(this).siblings('button').removeClass('active').end().addClass('active');
});
$('#kzsnylylButton button').click(function(e){
    e.preventDefault();
    // OK, pretty ugly :)
    var call = 'zoom' + $(this).attr('data-range');
    // I have two globally accessible charts here:
    if ($(this).attr('data-chart') == 'line') {
        l4[call]();
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
       $('#eyhtjplDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#eyhtjplDate1','#eyhtjplDate2',l3)});
       $('#eyhtjplDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#eyhtjplDate1','#eyhtjplDate2',l3)});
       $('#kzsnylylDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#kzsnylylDate1','#kzsnylylDate2',l4)});
       $('#kzsnylylDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#kzsnylylDate1','#kzsnylylDate2',l4)});

        function changeDate(date1,date2,fn) {
            var from = $(date1).data("DateTimePicker").date().format("YYYY-MM-DD");
            var f = moment.utc(from);
         
            var to = $(date2).data("DateTimePicker").date().format("YYYY-MM-DD");
            var t = moment.utc(to);
            fn['zoomWithDate'](f.valueOf(), t.valueOf());
        
        }



/* And then I define some stuff that instantiates Highcharts.StockChart objects, e.g.: */
$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
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

});
/* And then I define some stuff that instantiates Highcharts.StockChart objects, e.g.: */
$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
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

});
/* And then I define some stuff that instantiates Highcharts.StockChart objects, e.g.: */
$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
l3 = new Highcharts.StockChart({
    chart: {
        renderTo: 'eyhtjpl',
        type: 'line',
    },
    credits: {
        enabled: false
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
    series: [{
        id: "data",
        data: data
    }],
    rangeSelector: {
        /* It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one*/
        enabled: false
    }
});

});
/* And then I define some stuff that instantiates Highcharts.StockChart objects, e.g.: */
$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
l4 = new Highcharts.StockChart({
    chart: {
        renderTo: 'kzsnylyl',
        type: 'line',
    },
    credits: {
        enabled: false
    },
    series: [{
        id: "data",
        data: data
    }],
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
    rangeSelector: {
        /* It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one*/
        enabled: false
    }
});

});

      }());
});
