define(function(require){
    var options = {
        chart: {
            renderTo: '',
            defaultSeriesType: 'column'
        },
        credits: {
            enabled: false
        },
        exporting: {
              enabled:false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false,
                    format: ''
                }
            }
        },
        title: {
            text: null 
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: null 
            }
        },
        series: [{}]
    };
    return  options;
});
