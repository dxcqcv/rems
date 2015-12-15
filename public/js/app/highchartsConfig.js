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
              enabled:true
        },
        tooltip: {

        },
        plotOptions: {
            area: {
                marker:{} 
            },
            pie: {
                dataLabels: {}
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false,
                    format: ''
                }
            }
        },
        title: {
            style: {},
            text: null 
        },
        subtitle: {
            style: {}
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
