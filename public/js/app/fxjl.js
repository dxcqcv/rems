
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
                        text: 'Nuclear weapon states'
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
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
            colors: ['#8edce7', '#e8ebeb']
        });
        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart5',
                type: 'pie',
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
            colors: ['#8edce7', '#e8ebeb']
        });
        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart6',
                type: 'pie',
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
            colors: ['#8edce7', '#e8ebeb']
        });
        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart7',
                type: 'pie',
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
            colors: ['#8edce7', '#e8ebeb']
        });
        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart8',
                type: 'pie',
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
            colors: ['#8edce7', '#e8ebeb']
        });
        // Create the chart for completion
        var chart_completion = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart9',
                type: 'pie',
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
                margin: [0,0,0,0],
                height: 100,
                width: 100

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
                text: 'In Prog.',
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
                margin: 0,
                 height: 100,
                width: 100
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
                text: 'Hours',
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

// Create the chart for Budget
        var chart_budget = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart3',
                type: 'pie',
                margin: 0,
                 height: 100,
                width: 100
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
                text: 'Budget',
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
                text: 'Temperature (°C)'
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
                        text: 'Nuclear weapon states'
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
