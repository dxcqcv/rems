define(function(require){

    var optionsArea = {
            chart: {
                type: 'area'
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: null 
                }
            },
            title: {
                text: null
            },
            exporting: {
              enabled:false
            },
            tooltip: {
                shared: true,
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
            }]
    };
    return optionsArea;
});
