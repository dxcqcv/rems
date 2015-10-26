define(function(require){
    var 
        proto = require('app/highstockMod')
      , moment = require('moment')
      , datapicker = require('bootstrap-datetimepicker.min')
      , getJsonp = require('app/getJsonp')
      , card = require('app/card') 
      ;
      (function(){
          //日月年
$('.zoom_controls button').click(function(e){
    e.preventDefault();
    // OK, pretty ugly :)
    var call = 'zoom' + $(this).attr('data-range');
    // I have two globally accessible charts here:
    if ($(this).attr('data-chart') == 'line') {
        lineChart[call]();
    } else {
        candleChart[call]();
    }
    $(this).addClass('active');
});
          //时间控件
       $('#nyzhlylDate1').datetimepicker(
        {format : "YYYY,MM,DD"}


        ).on('change dp.change', function(e){
            

            var from = $('#nyzhlylDate1').data("DateTimePicker").date().format("YYYY,MM,DD");
            var f = moment.utc(from);
         
            var to = $('#nyzhlylDate2').data("DateTimePicker").date().format("YYYY,MM,DD");
            var t = moment.utc(to);
            lineChart['zoomWithDate'](f.valueOf(), t.valueOf());
           
        });

        $('#nyzhlylDate2').datetimepicker(
        {format : "YYYY, MM, DD"}


        ).on('change dp.change', function(e){
            var from = $('#nyzhlylDate1').data("DateTimePicker").date().format("YYYY,MM,DD");
            var f = moment.utc(from);
         
            var to = $('#nyzhlylDate2').data("DateTimePicker").date().format("YYYY,MM,DD");
            var t = moment.utc(to);
            lineChart['zoomWithDate'](f.valueOf(), t.valueOf());
           
        });


/* And then I define some stuff that instantiates Highcharts.StockChart objects, e.g.: */
$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
lineChart = new Highcharts.StockChart({
    chart: {
        renderTo: 'nyzhlyl',
        type: 'line',
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
lineChart = new Highcharts.StockChart({
    chart: {
        renderTo: 'jnl',
        type: 'line',
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
lineChart = new Highcharts.StockChart({
    chart: {
        renderTo: 'eyhtjpl',
        type: 'line',
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
lineChart = new Highcharts.StockChart({
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
    rangeSelector: {
        /* It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one*/
        enabled: false
    }
});

});

      }());
});
