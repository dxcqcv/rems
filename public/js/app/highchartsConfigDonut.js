define(function(require){

    var optionsDonut = {
            chart: {
                renderTo: 'pieChart4',
                type: 'pie',
                margin: [0,0,0,0]

            },
            credits: {
                enabled: false
            },
            exporting: {
                  enabled:false
            },
            plotOptions: {
                pie: {
                    //allowPointSelect: true,
                    //shadow: true,
                    //slicedOffset: 0,
                    size: '80%',
                    dataLabels: {
                        enabled: false
                    }
                }//,
//                series: noBorder
            }, 
            title: {
                text: '80%',
                    //floating: true,
                    align: 'center',
                    //y: 175,
                    //y:$('#pieChart4').height() / 2,
                style: {
                    color: '#39c',
                    fontSize: '32px'
                }
            },      
            subtitle: {
                text: '可再生能源<br>利用率',
                align: 'center',
                    //y: 275,
                    //y:$('#pieChart4').height() / 2 + 120,
                style: {
                    fontSize: '14px'
                }
            },
            series: [{
                //data: [["",50],['',50]],
                innerSize: '85%',
                //,
                //states:{
                    //hover: {
                        //enabled: false
                    //}
                //},
                //point : {
                    //events: {
                        //mouseOver: function(){
                           //this.oldTitle = chart_completion.options.title.text;

                           //chart_completion.setTitle({
                                //text: null 
                            //});
                           
                        //},
                        //mouseOut: function(){
                            //chart_completion.setTitle({
                                //text: this.oldTitle
                            //});
                        //}
                    //}
                //}
            }]
        
    };
    return  optionsDonut;
});
