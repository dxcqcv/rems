define(function(require){
      var optionsPie = {
        chart: {
            renderTo: 'ztnyjg',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            defaultSeriesType: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null 
        },
        exporting: {
          enabled:false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    //style: {
                        //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    //}
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{}]
        }]
    };
    return optionsPie;
});
