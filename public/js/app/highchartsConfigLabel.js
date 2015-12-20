define(function(require){

    var optionsLabel = {
            chart: {
            type: 'line'
        },
        chart: {
            renderTo: '',
        },
        credits: {
            enabled: false
        },
        exporting: {
              enabled:false
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
        plotOptions: {
            line: {
                dataLabels: {
                    enabled:true 
                },
                enableMouseTracking: false
            }
        },
        series: [{
        }]
    };
    return  optionsLabel;
});
