
define(function(require){
    var $ = require('jquery')
      , nxfxCss =  require('css!../../css/nxfx')
      , datapickerCss = require('css!../../css/bootstrap-datetimepicker')
      , selectpickerCss = require('css!../../css/bootstrap-select')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , exporting = require('exporting')
      ;
      (function(){
      //日期控件
       $('.datetimepicker1').datetimepicker();
       
      //下拉选择
      $('.selectpicker').selectpicker({
      });
      //图表

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box1').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box2').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box3').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });


$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box4').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });


$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box5').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });


$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box6').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });


$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.chart-box7').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });



  }());



});
