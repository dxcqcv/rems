
define(function(require){
    var 
       $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , highcharts = require('app/card') 
      , options = require('app/highchartsConfig')
      , optionsPie = require('app/highchartsConfigPie')
      ;
      (function(){
      //下拉选择
      $('.selectpicker').selectpicker({
      });

      //图表
      //fourth
      var noBorder = { 
        states:{
            hover:{
                halo: {
                    size: 1
                }     
            }
        }
      };
        Highcharts.setOptions({
            //colors: ['#8edce7', '#e8ebeb']
            colors: ['#1ca6c5', '#e8ebeb']
        });
        
        var highchartsPieData;
        localJsonp.start({url:jsonpPath+'highchartsPie.js',jsonpCallback:'highchartsPie',done:zbfxPie});
        function zbfxPie(data) {
            var id;
            var title;
            var zbfxCharts = $('.xtzb-charts').height(); 
            var subtitleY = zbfxCharts/1.2;
            var titleY =  zbfxCharts/ 2;
            var tempData;
            var zbfxData = []
            var zbfxName;
            var pieColors;
            var color;
            highchartsPieData = data;
            
            $.each(data, function(i,v){
                switch(i) {
                    case 0: id = 'pieChart1'; pieColors = ['#7cc576', '#e8ebeb']; color = '#7cc576'; break; 
                    case 1: id = 'pieChart2'; pieColors = ['#1cbbb4', '#e8ebeb']; color = '#1cbbb4'; break; 
                    case 2: id = 'pieChart3'; pieColors = ['#00aeef', '#e8ebeb']; color = '#00aeef'; break; 
                    case 3: id = 'pieChart4'; pieColors = ['#a864a8', '#e8ebeb']; color = '#a864a8'; break; 
                }     
                zbfxName = v.name == '可再生能源利用率' ? '可再生能源<br>利用率' : v.name;
                tempData = v.value;
                title = tempData + '<span style="font-size: 14px;">%</span>'; 
                zbfxData = [tempData,(100-tempData)]; 
                setPiecharts(id,title,zbfxName,titleY,subtitleY,zbfxData,pieColors,color);
            });
        }
        $(window).resize(function(){
            zbfxPie(highchartsPieData);
        });
        $('.card-button-resize-xtzb').on('click', function(){
                var $this = $(this)
                  ; 
                if(!$this.hasClass('card-button-resize-small')) {
                    $this.addClass('card-button-resize-small').parents('.my-card').siblings('.my-card').hide()
                           .end()
                           .removeClass('col-md-6 col-lg-6').addClass('col-md-12 col-lg-12')
                           .css({'height':'100%'})
                           .find('.xtzb-charts').each(function(){
                                    zbfxPie(highchartsPieData);
                               })
                    ; 
                } else {
                   $this.removeClass('card-button-resize-small').parents('.my-card').removeClass('col-md-12 col-lg-12').addClass('col-md-6 col-lg-6')
                       .css({'height':'50%'})
                       .find('.xtzb-charts').each(function(){
                                    zbfxPie(highchartsPieData);
                               })
                   ;
                   $this.parents('.my-card').siblings('.my-card').show()  
                   ;
                }
        });
        function setPiecharts(id,title,subtitle,titleY,subtitleY,data,pieColors,color) {
            optionsPie.chart.renderTo = id;
            optionsPie.title.text = title;
            optionsPie.title.style.color = color;
            optionsPie.subtitle.text = subtitle;
            optionsPie.title.y = titleY;
            optionsPie.subtitle.y = subtitleY; 
            optionsPie.series[0].data = data;
            optionsPie.colors = pieColors;
            var piecharts = new Highcharts.Chart(optionsPie); 
        }
        Highcharts.setOptions({
            //colors: ['#8edce7', '#e8ebeb']
            colors: ['#1ca6c5', '#e8ebeb']
        });
        //optionsPie.chart.type = 'pie';
        //optionsPie.chart.renderTo = 'pieChart4';
        //optionsPie.chart.margin = [0,0,0,0];
        //optionsPie.plotOptions.pie.size = '80%';
        //optionsPie.plotOptions.pie.dataLabels.enabled = false;
        //optionsPie.title.text = '50%';
        //optionsPie.title.align = 'center';
        //optionsPie.title.y = $('#pieChart4').height() / 2;
        //optionsPie.title.style.fontSize = '32px';
        //optionsPie.subtitle.text = '可再生能源<br>利用率';
        //optionsPie.subtitle.align = 'center';
        //optionsPie.subtitle.y = $('#pieChart4').height() / 2 + 120; 
        //optionsPie.subtitle.style.fontSize = '14px';
        //optionsPie.series.innerSize = '85%';
        //optionsPie.series.data = [["",50],['',50]];
        //var chart4 = new Highcharts.Chart(optionsPie); 
        $(window).resize(function(){
            //optionsPie.title.y = $('#pieChart4').height() / 2;
            //optionsPie.subtitle.y = $('#pieChart4').height() / 2 + 120; 
            //var chart4 = new Highcharts.Chart(optionsPie); 
        });

        // Create the chart for completion
        //var chart_completion = new Highcharts.Chart({
            //chart: {
                //renderTo: 'pieChart4',
                //type: 'pie',
                //margin: [0,0,0,0]

            //},
            //plotOptions: {
                //pie: {
                    ////allowPointSelect: true,
                    ////shadow: true,
                    ////slicedOffset: 0,
                    //size: '80%',
                    //dataLabels: {
                        //enabled: false
                    //}
                //}//,
////                series: noBorder
            //}, 
            //title: {
                //text: '80%',
                    ////floating: true,
                    //align: 'center',
                    ////y: 175,
                    //y:$('#pieChart4').height() / 2,
                //style: {
                    //fontSize: '32px'
                //}
            //},      
            //subtitle: {
                //text: '可再生能源<br>利用率',
                //align: 'center',
                    ////y: 275,
                    //y:$('#pieChart4').height() / 2 + 120,
                //style: {
                    //fontSize: '14px'
                //}
            //},
            //series: [{
                //data: [["",50],['',50]],
                //innerSize: '85%',
                ////,
                ////states:{
                    ////hover: {
                        ////enabled: false
                    ////}
                ////},
                ////point : {
                    ////events: {
                        ////mouseOver: function(){
                           ////this.oldTitle = chart_completion.options.title.text;

                           ////chart_completion.setTitle({
                                ////text: null 
                            ////});
                           
                        ////},
                        ////mouseOut: function(){
                            ////chart_completion.setTitle({
                                ////text: this.oldTitle
                            ////});
                        ////}
                    ////}
                ////}
            //}]
        //});

        //// Create the chart for completion
        //var chart_completion = new Highcharts.Chart({
            //chart: {
                //renderTo: 'pieChart1',
                //type: 'pie',
                //margin: [0,0,0,0]
                ////,
                ////height: 100,
                ////width: 100

            //},
            //tooltip: {
                //enabled: false,
            //},
            //plotOptions: {
                //pie: {
					//slicedOffset: 0,
                    //size: '100%',
                    //dataLabels: {
                        //enabled: false
                    //}
				//},
                //series: noBorder
			//}, 
            //title: {
                //text: '80%',
                    //floating: true,
                    //align: 'center',
                    //x: 0,
                    //y: 25,
                //style: {
                    //fontSize: '18px'
                //}
            //},      
            //subtitle: {
				//text: '节能率',
				//align: 'center',
				//verticalAlign: 'middle',
                //style: {
                    //fontSize: '9.5px'
                //}
            //},
            //credits: {
			   //enabled: false
			//},
            //series: [{
                //name: 'Browsers',
                //data: [["MSIE",10],[,2]],
                //innerSize: '80%',
                //showInLegend:false,
                //dataLabels: {
                    //enabled: false
                //},
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
                                //text: 'New title '
                            //});
                           
                        //},
                        //mouseOut: function(){
                            //chart_completion.setTitle({
                                //text: this.oldTitle
                            //});
                        //}
                    //}
                //}
            //}]
        //});
        



        //Highcharts.setOptions({
			//colors: ['#f07173', '#e8ebeb']
		//});

        //// Create the chart for time
        //var chart_time = new Highcharts.Chart({
            //chart: {
                //renderTo: 'pieChart2',
                //type: 'pie',
                //margin: 0
                ////,
                 ////height: 100,
                ////width: 100
            //},

            //plotOptions: {
                //pie: {
                        //slicedOffset: 0,
                        //size: '100%',
                        //dataLabels: {
                        //enabled: false
                    //}
				//},
                //series : noBorder
			//},
            //tooltip: {
                //enabled: false,
            //},

            //title: {
                //text: '80%',
                    //floating: true,
                    //align: 'center',
                    //x: 0,
                    //y: 25,
                //style: {
                    //fontSize: '18px'
                //}
            //},      
            //subtitle: {
				//text: 'CO2减排率',
				//align: 'center',
				//verticalAlign: 'middle',
                //style: {
                    //fontSize: '9.5px'
                //}
            //},
            //credits: {
			   //enabled: false
			//},
            //series: [{
                //name: 'Browsers',
                //data: [["MSIE",10],[,2]],
                //innerSize: '80%',
                //showInLegend:false,
                //dataLabels: {
                    //enabled: false
                //},
                //states:{
                    //hover: {
                        //enabled: false
                    //}
                //}
            //}]
        //});
      
        //Highcharts.setOptions({
			//colors: ['#8adfb9', '#e8ebeb']
		//});

        //// Create the chart for Budget
        //var chart_budget = new Highcharts.Chart({
            //chart: {
                //renderTo: 'pieChart3',
                //type: 'pie',
                //margin: 0
                ////,
                 ////height: 100,
                ////width: 100
            //},

            //plotOptions: {
            //pie: {
					//slicedOffset: 0,
                    //size: '100%',
                    //dataLabels: {
                        //enabled: false
                    //}
				//},
                //series: noBorder
			//},
            //title: {
                //text: '80%',
                    //floating: true,
                    //align: 'center',
                    //x: 0,
                    //y: 25,
                //style: {
                    //fontSize: '18px'
                //}
            //},      
            //subtitle: {
				//text: '系统能效',
				//align: 'center',
				//verticalAlign: 'middle',
                //style: {
                    //fontSize: '9.5px'
                //}
            //},
            //tooltip: {
                //enabled: false,
                //animation: false,
                //backgroundColor: null
            //},

            //credits: {
			   //enabled: false
			//},
            //series: [{
                //name: 'Browsers',
                //data: [["MSIE",10],[,2]],
                //innerSize: '80%',
                //showInLegend:false,
                //dataLabels: {
                    //enabled: false
                //},
                //states:{
                    //hover: {
                        //enabled: false
                    //}
                //}
            //}]
        //});
      //third
          $('#haonengCharts').highcharts({
        chart: {
            type: 'column'
        },
        exporting: {
              enabled:false
            },
        credits: {
            enabled: false
        },
        title: {
            text: null,
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                //text: 'Rainfall (mm)'
                text: null 
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }]
    });
      //second
        var chart
         localJsonp.start({url:jsonpPath+'highchartsJson.js',jsonpCallback:'highchartsJsonp',done:highchartsJsonp});
            //renderTo: 'gyxtxl',
         function highchartsJsonp(data) {
            options.series[0].data = data;
            options.chart.renderTo = 'gyxtxl';
            chart = new Highcharts.Chart(options); 
         }

$('#gyxtxlSel').on('change', function(){
/* chart = $('#gyxtxl').highcharts();*/
        //chart.addSeries({
            //data: [161.4, 14.1, 195.6, 14.4, 129.9, 11.5, 161.4, 19.2, 114.0, 16.0, 15.6, 48.5]
        /*});*/

         localJsonp.start({url:jsonpPath+'highchartsJson2.js',jsonpCallback:'highchartsJsonp',done:highchartsJsonp});
});
      //$('#gyxtxl').highcharts({
        //title: {
            //text: null,
        //},
        //subtitle: {
            //text: null,
        //},
        //xAxis: {
            //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                //'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //},
        //yAxis: {
            //title: {
                ////text: 'Temperature (°C)'
                //text: null 
            //},
            //plotLines: [{
                //value: 20,
                //width: 1,
                ////color: '#808080'
                //zIndex: 2,
                //color: 'red'
            //}]
        //},
        //tooltip: {
            //valueSuffix: '°C'
        //},
        //series: [{
            //name: 'Tokyo',
            //data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        //}]
    //});
      //first
          $('#gongnengCharts').highcharts({
        chart: {
            type: 'column'
        },

        credits: {
            enabled: false
        },
        exporting: {
              enabled:false
            },
        title: {
            text: null,
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                //text: 'Rainfall (mm)'
                text: null 
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }]
    });
      }());
});
