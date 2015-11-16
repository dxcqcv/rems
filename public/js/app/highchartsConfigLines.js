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
             plotLines: [{
                 value: 12,
                 width: 1,
                 zIndex: 2,
                 color: 'red'
             }]

        },
        series: [{}]
    };
    return  optionsLines;
});
