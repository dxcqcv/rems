
define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , moment = require('moment')
      , exporting = require('exporting')
      ;


      (function(){

       
      //下拉选择
      $('.selectpicker').selectpicker({
      });





var proto = Highcharts.Chart.prototype;

proto.zoomToD = function(delta){
    var chartMin = this.xAxis[1].min;
    var chartMax = this.xAxis[0].max;
    var min = chartMax - delta;

    if (chartMin < min) {
        // this.xAxis[0] is the view, this.xAxis[1] is the navigator
        this.xAxis[0].setExtremes(min, chartMax);
        return true;
    }

    this.xAxis[0].setExtremes(chartMin, chartMax);
    return false;
}
proto.zoom1d = function(){
    return this.zoomToD(86400 * 1000);
}
proto.zoom1m = function(){
    return this.zoomToD(2592000 * 1000);
}
proto.zoom3m = function(){
    return this.zoomToD(2592000 * 3 * 1000);
}
proto.zoom6m = function(){
    return this.zoomToD(2592000 * 6 * 1000);
}
proto.zoom1y = function(){
    return this.zoomToD(2592000 * 12 * 1000);
}
proto.zoomAll = function(){
    // picking max values from the navigator axis
    this.xAxis[0].setExtremes(this.xAxis[1].min, this.xAxis[1].max);
}
proto.zoomYtd = function(){
    var chartMin = this.xAxis[1].min;
    var chartMax = this.xAxis[1].max;
    var min = chartMax - 2592000 * 12 * 1000;

    if (chartMin < min) {
        this.xAxis[0].setExtremes(min, chartMax);
        return true;
    }

    this.xAxis[0].setExtremes(chartMin, chartMax);
    return false;
}
proto.zoomWithDate = function(startdate,enddate){
    
    this.xAxis[0].setExtremes(startdate, enddate);
    //alert(Date.UTC(2010,12,12));
    //this.xAxis[0].setExtremes(Date.UTC(2010,12,12), Date.UTC(2013,12,14));
}

/* And then I define some stuff that instantiates Highcharts.StockChart objects, e.g.: */
$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
lineChart = new Highcharts.StockChart({
    chart: {
        renderTo: 'qxxxChartBox',
        type: 'line',
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

//日期控件
       $('#datetimepicker1').datetimepicker(
        {format : "YYYY,MM,DD"}


        ).on('change dp.change', function(e){
            

            var from = $('#datetimepicker1').data("DateTimePicker").date().format("YYYY,MM,DD");
            var f = moment.utc(from);
         
            var to = $('#datetimepicker2').data("DateTimePicker").date().format("YYYY,MM,DD");
            var t = moment.utc(to);
            lineChart['zoomWithDate'](f.valueOf(), t.valueOf());
           
        });

        $('#datetimepicker2').datetimepicker(
        {format : "YYYY, MM, DD"}


        ).on('change dp.change', function(e){
            var from = $('#datetimepicker1').data("DateTimePicker").date().format("YYYY,MM,DD");
            var f = moment.utc(from);
         
            var to = $('#datetimepicker2').data("DateTimePicker").date().format("YYYY,MM,DD");
            var t = moment.utc(to);
            lineChart['zoomWithDate'](f.valueOf(), t.valueOf());
           
        });





      //图表

    // $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    //     // Create the chart
    //     var nxfxChart = $('.chart-box').highcharts('StockChart', {


    //         rangeSelector : {
    //             selected : 1
    //         },

    //         title : {
    //             text : null 
    //         },

    //     yAxis: {
    //         title: {
    //             //text: 'Temperature (°C)'
    //             text: null 
    //         },
    //         plotLines: [{
    //             value: 125,
    //             width: 1,
    //             //color: '#808080'
    //             zIndex: 2,
    //             color: 'red'
    //         }]
    //     },
    //     rangeSelector: {
    //             selected: 1,
    //             inputDateFormat: '%Y-%m-%d'
    //         },
    //         series : [{
    //             name : 'AAPL',
    //             data : data,
    //             tooltip: {
    //                 valueDecimals: 2
    //             }
    //         }]
    //     });

    //     setTimeout(function() {
    //         $('input.highcharts-range-selector', $('#' + nxfxChart.options.chart.renderTo)).datetimepicker()
    //     }, 0)

    // });


// $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
//         // Create the chart
//         window.chart = new Highcharts.StockChart({
//             chart: {
//                 renderTo: 'qxxxChartBox'
//             },

//             rangeSelector: {
//                 selected: 1,
//                 inputDateFormat: '%Y-%m-%d',

//                 buttons: [{
//                     type: 'day',
//                     count: 1,
//                     text: '日'
//                 }, {
//                     type: 'month',
//                     count: 1,
//                     text: '月'
//                 }, {
//                     type: 'year',
//                     count: 1,
//                     text: '年'
//                 }],
//                 buttonTheme: { // styles for the buttons
//                     fill: 'none',
//                     stroke: 'none',
//                     'stroke-width': 10,
//                     r: 8,
//                     style: {
//                         color: '#039',
//                         fontWeight: 'bold',
                        
//                     },
//                     states: {
//                         hover: {
//                         },
//                         select: {
//                             fill: '#039',
//                             style: {
//                                 color: 'red'
//                             }
//                         }
//                     }
//                 },
//             },

//             title: {
//                 text: ''
//             },

//             series: [{
//                 name: 'AAPL',
//                 data: data,
//                 tooltip: {
//                     valueDecimals: 2
//                 }}]

//         }, function(chart) {

//             // apply the date pickers
//             setTimeout(function() {
//                 $('input.highcharts-range-selector', $('#' + chart.options.chart.renderTo)).datetimepicker({
//     format: 'yyyy-mm-dd hh:ii'
// })
//             }, 0);
//              // var chooseContainer = $('<div class="pull-left cbfx-date-box"></div>');
//              // var chooseRange = $('<select class="form-control"></select>');
//              // var element1 = $('<option value="volvo">请选择工艺系统</option>');
//              // var element2 = $('<option value="saab">Saab</option>');
//              // chooseContainer.append(chooseRange);
//              // chooseRange.append(element1);
//              // chooseRange.append(element2);
//              // //$("#qxxxChartBox .highcharts-range-selector-buttons").append(chooseContainer);
//              // $("#qxxxChartBox .highcharts-container").before(chooseContainer);
//              // //console.log($("#qxxxChartBox").find(".highcharts-range-selector-buttons").eq(0));


//         });
//     });



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
