;define(function(require){
    var $ = require('jquery')
      , sjjcCss = require("css!../../css/sjjc")
      , exporting = require('exporting')
    ;
    (function(){
    	$('.btn_coin').on('click', function() {
            $('#gytModal').modal({
                backdrop: 'static' 
            });  

        });

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.sjjc-charts').highcharts('StockChart', {


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
