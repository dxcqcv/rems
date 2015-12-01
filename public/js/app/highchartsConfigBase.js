define(function(require){
    var optionsBase = {
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
            },
             plotLines: [{}]
        },
        series: [{}]
    };
    return  optionsBase;
});
