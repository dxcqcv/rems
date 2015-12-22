define(function(require){

    var optionsLines = {
        chart: {
            renderTo: '',
        },
        credits: {
            enabled: false
        },
        exporting: {
              enabled:false
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
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
    return  optionsLines;
});
