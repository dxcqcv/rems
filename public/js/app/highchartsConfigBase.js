define(function(require){
    var optionsBase = {
        chart: {
            renderTo: '',
            defaultSeriesType: 'column'
        },
        lang:{},
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
             plotLines: [{value:10,color: 'green',dashStyle:'shortdash',width:0,zIndex:10, label: {text: '约束性指标',align:'left'}},{value:20,color: 'red',dashStyle:'shortdash',width:0,zIndex:10, label: {text: '引导性指标',align:'right'}}]
        },
        series: [{}]
    };
    return  optionsBase;
});
