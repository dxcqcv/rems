
define(function(require){
    var $ = require('jquery')
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


$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
        // Create the chart
        window.chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'qxxxChartBox'
            },

            rangeSelector: {
                selected: 1,
                inputDateFormat: '%Y-%m-%d',

                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '日'
                }, {
                    type: 'month',
                    count: 1,
                    text: '月'
                }, {
                    type: 'year',
                    count: 1,
                    text: '年'
                }],
                buttonTheme: { // styles for the buttons
                    fill: 'none',
                    stroke: 'none',
                    'stroke-width': 10,
                    r: 8,
                    style: {
                        color: '#039',
                        fontWeight: 'bold',
                        
                    },
                    states: {
                        hover: {
                        },
                        select: {
                            fill: '#039',
                            style: {
                                color: 'red'
                            }
                        }
                    }
                },
            },

            title: {
                text: ''
            },

            series: [{
                name: 'AAPL',
                data: data,
                tooltip: {
                    valueDecimals: 2
                }}]

        }, function(chart) {

            // apply the date pickers
            setTimeout(function() {
                $('input.highcharts-range-selector', $('#' + chart.options.chart.renderTo)).datetimepicker({
    format: 'yyyy-mm-dd hh:ii'
})
            }, 0);
             // var chooseContainer = $('<div class="pull-left cbfx-date-box"></div>');
             // var chooseRange = $('<select class="form-control"></select>');
             // var element1 = $('<option value="volvo">请选择工艺系统</option>');
             // var element2 = $('<option value="saab">Saab</option>');
             // chooseContainer.append(chooseRange);
             // chooseRange.append(element1);
             // chooseRange.append(element2);
             // //$("#qxxxChartBox .highcharts-range-selector-buttons").append(chooseContainer);
             // $("#qxxxChartBox .highcharts-container").before(chooseContainer);
             // //console.log($("#qxxxChartBox").find(".highcharts-range-selector-buttons").eq(0));


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
