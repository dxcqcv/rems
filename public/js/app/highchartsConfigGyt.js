define(function(require){
    var optionsGyt = 
    {
		colors: ["#CE0000","#FF0080","#E800E8","#921AFF","#0000E3","#0066CC","#00AEAE","#02C874","#00BB00","#E1E100","#EAC100","#FF9224","#FF5809","#949449","#4F9D9D","#7373B9","#9F4D95"],
        chart: {
            type: 'line'
        },
        credits: {
            enabled: false
        },
        title: {
           text: null,

           style: {
                    fontSize:'13px'
                }
        },
        subtitle: {
            text: 'text',
            style: {}
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            dateTimeLabelFormats: {
           	 	minute: '%H:%M'
       		}
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    fontSize:'13px'
                }
            },
            tickPositions: null 
        },
        tooltip: {
            shared: true,
             dateTimeLabelFormats: {
                minute:"%H:%M"
            },
            valueSuffix: '',
            crosshairs: true
        },
        legend: {
			enabled: false,
            borderWidth: 0
        },
        exporting: {
            enabled: false
        },
        series: [{}] 
    };
    return optionsGyt;
});
