
define(function(require){
    var 
        nxjcCss = require('css!../../css/nxjc')
      , selectpickerCss = require('css!../../css/bootstrap-select')
      , $ = require('jquery')
      , highcharts = require('highcharts')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      ;
      (function(){
      //下拉选择
      $('.selectpicker').selectpicker({
      });
      //图表
      //fourth
            $('#xitongzhibiao').highcharts({
                chart: {
                    type: 'area'
                },
                title: {
                    text: null,
                },
                subtitle: {
                    text: null,
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    title: {
                        //text: 'Nuclear weapon states'
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                plotOptions: {
                    area: {
                        pointStart: 1940,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'USA',
                    data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                        1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                        27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                        26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                        22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                        10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
                }, {
                    name: 'USSR/Russia',
                    data: [null, null, null, null, null, null, null, null, null, null,
                        5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                        4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                        15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                        33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                        35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                        21000, 20000, 19000, 18000, 18000, 17000, 16000]
                }]
            });
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
	        colors: ['#8edce7', '#e8ebeb']
	    });
        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart4',
                type: 'pie',
                events: {
                    click: function(event) {
                       //console.log(event.currentTarget.options.plotOptions)
                       //event.currentTarget.options.plotOptions.pie.shadow = true;
                    }
                },
                margin: [0,0,0,0]
                //,
                //height: 100,
                //width: 100

            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    //allowPointSelect: true,
                    //shadow: true,
	            	slicedOffset: 0,
                	size: '100%',
                	dataLabels: {
                    	enabled: false
                	}
	            },
                series: noBorder
	        }, 
            title: {
                text: '80%',
                    floating: true,
                    align: 'center',
                    x: 0,
                    y: 25,
                style: {
                    fontSize: '18px'
                }
        	},      
            subtitle: {
	            text: '可再生能源<br>利用率',
	            align: 'center',
	            verticalAlign: 'middle',
                style: {
                    fontSize: '9.5px'
                }
            },
            credits: {
			   enabled: false
			},
            series: [{
                name: 'Browsers',
                data: [["MSIE",10],[,2]],
                innerSize: '80%',
                showInLegend:false,
                dataLabels: {
                    enabled: false
                },
                states:{
                    hover: {
                        enabled: false
                    }
                },
                point : {
                    events: {
                        mouseOver: function(){
                           this.oldTitle = chart_completion.options.title.text;

                           chart_completion.setTitle({
                                text: 'New title '
                            });
                           
                        },
                        mouseOut: function(){
                            chart_completion.setTitle({
                                text: this.oldTitle
                            });
                        }
                    }
                }
            }]
        });

        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart1',
                type: 'pie',
                margin: [0,0,0,0]
                //,
                //height: 100,
                //width: 100

            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                pie: {
	            	slicedOffset: 0,
                	size: '100%',
                	dataLabels: {
                    	enabled: false
                	}
	            },
                series: noBorder
	        }, 
            title: {
                text: '80%',
                    floating: true,
                    align: 'center',
                    x: 0,
                    y: 25,
                style: {
                    fontSize: '18px'
                }
        	},      
            subtitle: {
	            text: '节能率',
	            align: 'center',
	            verticalAlign: 'middle',
                style: {
                    fontSize: '9.5px'
                }
            },
            credits: {
			   enabled: false
			},
            series: [{
                name: 'Browsers',
                data: [["MSIE",10],[,2]],
                innerSize: '80%',
                showInLegend:false,
                dataLabels: {
                    enabled: false
                },
                states:{
                    hover: {
                        enabled: false
                    }
                },
                point : {
                    events: {
                        mouseOver: function(){
                           this.oldTitle = chart_completion.options.title.text;

                           chart_completion.setTitle({
                                text: 'New title '
                            });
                           
                        },
                        mouseOut: function(){
                            chart_completion.setTitle({
                                text: this.oldTitle
                            });
                        }
                    }
                }
            }]
        });
        



        Highcharts.setOptions({
	        colors: ['#f07173', '#e8ebeb']
	    });

        // Create the chart for time
        var chart_time = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart2',
                type: 'pie',
                margin: 0
                //,
                 //height: 100,
                //width: 100
            },

            plotOptions: {
                pie: {
    	            	slicedOffset: 0,
                    	size: '100%',
                    	dataLabels: {
                        enabled: false
                	}
	            },
                series : noBorder
	        },
            tooltip: {
                enabled: false,
            },

            title: {
                text: '80%',
                    floating: true,
                    align: 'center',
                    x: 0,
                    y: 25,
                style: {
                    fontSize: '18px'
                }
        	},      
            subtitle: {
	            text: 'CO2减排率',
	            align: 'center',
	            verticalAlign: 'middle',
                style: {
                    fontSize: '9.5px'
                }
            },
            credits: {
			   enabled: false
			},
            series: [{
                name: 'Browsers',
                data: [["MSIE",10],[,2]],
                innerSize: '80%',
                showInLegend:false,
                dataLabels: {
                    enabled: false
                },
                states:{
                    hover: {
                        enabled: false
                    }
                }
            }]
        });
      
        Highcharts.setOptions({
	        colors: ['#8adfb9', '#e8ebeb']
	    });

        // Create the chart for Budget
        var chart_budget = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart3',
                type: 'pie',
                margin: 0
                //,
                 //height: 100,
                //width: 100
            },

            plotOptions: {
            pie: {
	            	slicedOffset: 0,
                	size: '100%',
                	dataLabels: {
                    	enabled: false
                	}
	            },
                series: noBorder
	        },
            title: {
                text: '80%',
                    floating: true,
                    align: 'center',
                    x: 0,
                    y: 25,
                style: {
                    fontSize: '18px'
                }
        	},      
            subtitle: {
	            text: '系统能效',
	            align: 'center',
	            verticalAlign: 'middle',
                style: {
                    fontSize: '9.5px'
                }
            },
            tooltip: {
                enabled: false,
                animation: false,
                backgroundColor: null
            },

            credits: {
			   enabled: false
			},
            series: [{
                name: 'Browsers',
                data: [["MSIE",10],[,2]],
                innerSize: '80%',
                showInLegend:false,
                dataLabels: {
                    enabled: false
                },
                states:{
                    hover: {
                        enabled: false
                    }
                }
            }]
        });
      //var chart1 = new Highcharts.Chart({
        //chart: {
            //renderTo: 'pieChart1',
            //type: 'pie'
        //},
        //credits: {
            //enabled: false
        //},
        //title: {
            //text: 'Equities',
            //y: 5,
            //verticalAlign: 'bottom'
        //},
        //tooltip: {
            //enabled: false
        //},
        //plotOptions: {
            //pie: {
                //borderColor: '#000000',
                //innerSize: '60%',
                //dataLabels: {
                    //enabled: false
                //}
            //}
        //},
        //series: [{
            //data: [
                //['Equities', 54],
                //['other', 46]
                //]}]
    //},
    //// using 

    //function(chart1) { // on complete
        //var xpos = '50%';
        //var ypos = '50%';
        //var circleradius = 20;

        //// Render the circle
        //chart1.renderer.circle(xpos, ypos, circleradius).attr({
            //fill: '#ddd',
        //}).add();

        //// Render the text 
        //chart1.renderer.text(chart1.series[0].data[0].percentage + '%', 62, 80).css({
            //width: circleradius * 2,
            //color: '#4572A7',
            //fontSize: '16px',
            //textAlign: 'center'
        //}).attr({
            //// why doesn't zIndex get the text in front of the chart?
            //zIndex: 999
        //}).add();
    //});
      //var chart2 = new Highcharts.Chart({
        //chart: {
            //renderTo: 'pieChart2',
            //type: 'pie'
        //},
        //credits: {
            //enabled: false
        //},
        //title: {
            //text: 'Equities',
            //y: 5,
            //verticalAlign: 'bottom'
        //},
        //tooltip: {
            //enabled: false
        //},
        //plotOptions: {
            //pie: {
                //borderColor: '#000000',
                //innerSize: '60%',
                //dataLabels: {
                    //enabled: false
                //}
            //}
        //},
        //series: [{
            //data: [
                //['Equities', 54],
                //['other', 46]
                //]}]
    //},
    //// using 

    //function(chart2) { // on complete
        //var xpos = '50%';
        //var ypos = '50%';
        //var circleradius = 40;

        //// Render the circle
        //chart2.renderer.circle(xpos, ypos, circleradius).attr({
            //fill: '#ddd',
        //}).add();

        //// Render the text 
        //chart2.renderer.text(chart2.series[0].data[0].percentage + '%', 62, 80).css({
            //width: circleradius * 2,
            //color: '#4572A7',
            //fontSize: '16px',
            //textAlign: 'center'
        //}).attr({
            //// why doesn't zIndex get the text in front of the chart?
            //zIndex: 999
        //}).add();
    //});
      //var chart3 = new Highcharts.Chart({
        //chart: {
            //renderTo: 'pieChart3',
            //type: 'pie'
        //},
        //credits: {
            //enabled: false
        //},
        //title: {
            //text: 'Equities',
            //y: 5,
            //verticalAlign: 'bottom'
        //},
        //tooltip: {
            //enabled: false
        //},
        //plotOptions: {
            //pie: {
                //borderColor: '#000000',
                //innerSize: '60%',
                //dataLabels: {
                    //enabled: false
                //}
            //}
        //},
        //series: [{
            //data: [
                //['Equities', 54],
                //['other', 46]
                //]}]
    //},
    //// using 

    //function(chart3) { // on complete
        //var xpos = '50%';
        //var ypos = '50%';
        //var circleradius = 40;

        //// Render the circle
        //chart3.renderer.circle(xpos, ypos, circleradius).attr({
            //fill: '#ddd',
        //}).add();

        //// Render the text 
        //chart3.renderer.text(chart3.series[0].data[0].percentage + '%', 62, 80).css({
            //width: circleradius * 2,
            //color: '#4572A7',
            //fontSize: '16px',
            //textAlign: 'center'
        //}).attr({
            //// why doesn't zIndex get the text in front of the chart?
            //zIndex: 999
        //}).add();
    //});
      //var chart4 = new Highcharts.Chart({
        //chart: {
            //renderTo: 'pieChart4',
            //type: 'pie'
        //},
        //credits: {
            //enabled: false
        //},
        //title: {
            //text: 'Equities',
            //y: 5,
            //verticalAlign: 'bottom'
        //},
        //tooltip: {
            //enabled: false
        //},
        //plotOptions: {
            //pie: {
                //borderColor: '#000000',
                //innerSize: '60%',
                //dataLabels: {
                    //enabled: false
                //}
            //}
        //},
        //series: [{
            //data: [
                //['Equities', 54],
                //['other', 46]
                //]}]
    //},
    //// using 

    //function(chart4) { // on complete
        //var xpos = '50%';
        //var ypos = '50%';
        //var circleradius = 40;

        //// Render the circle
        //chart4.renderer.circle(xpos, ypos, circleradius).attr({
            //fill: '#ddd',
        //}).add();

        //// Render the text 
        //chart4.renderer.text(chart4.series[0].data[0].percentage + '%', 62, 80).css({
            //width: circleradius * 2,
            //color: '#4572A7',
            //fontSize: '16px',
            //textAlign: 'center'
        //}).attr({
            //// why doesn't zIndex get the text in front of the chart?
            //zIndex: 999
        //}).add();
    //});
      //third
          $('#gongnenghaonengCharts').highcharts({
        chart: {
            type: 'column'
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
      $('#gyxtxl').highcharts({
        title: {
            text: null,
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 20,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
      //first
            $('.chart-box').highcharts({
                chart: {
                    type: 'area'
                },
                title: {
                    text: null,
                },
                subtitle: {
                    text: null,
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    title: {
                        //text: 'Nuclear weapon states'
                        text: null 
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                plotOptions: {
                    area: {
                        pointStart: 1940,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'USA',
                    data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                        1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                        27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                        26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                        22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                        10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
                }, {
                    name: 'USSR/Russia',
                    data: [null, null, null, null, null, null, null, null, null, null,
                        5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                        4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                        15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                        33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                        35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                        21000, 20000, 19000, 18000, 18000, 17000, 16000]
                }]
            });
      }());
});
