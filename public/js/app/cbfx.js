define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
	  , highcharts = require('exporting')
      ;
	$(function() {
    //时间控件
       $('.datetimepicker1').datetimepicker();
    //图表
		$('.haichar').highcharts({
			chart: {
				type: 'area'
			},

			title: {
				text: null
			},
			tooltip: {
				shared: true,
				valueSuffix: ' millions'
			},
			plotOptions: {
				area: {
					stacking: 'normal',
					lineColor: '#666666',
					lineWidth: 1,
					marker: {
						lineWidth: 1,
						lineColor: '#666666'
					}
				}
			},
			series: [{
				name: 'Asia',
				data: [11, 22, 5, 16, 12, 21, 28]
			}]
		});
	});

	$(function() {
		$('.haitwo').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: null
			},
			xAxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'fss', 'sdfs', 'sds']
			},
			tooltip: {
				formatter: function() {
					return '<b>' + this.x + '</b><br/>' +
						this.series.name + ': ' + this.y + '<br/>' +
						'Total: ' + this.point.stackTotal;
				}
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					pointWidth: 15,
				}
			},
			series: [{
				name: 'John',
				data: [5, 3, 4, 7, 2, 6, 7],
				stack: 'male'
			}, {
				name: 'Joe',
				data: [3, 4, 4, 2, 5, 6, 2],
				stack: 'male'
			}, {
				name: 'Jane',
				data: [2, 5, 3, 2, 1, 2, 3],
				stack: 'female'
			}, {
				name: 'Janet',
				data: [3, 2, 1, 4, 3, 5, 6],
				stack: 'female'
			}, {
				name: 'Danie',
				data: [3, 5, 3, 4, 3, 5, 3],
				stack: 'female'
			}, {
				name: 'fsdf',
				data: [3, 2, 4, 1, 3, 2, 3],
				stack: 'female'
			}]
		});
	});
	
	
	$(function () {
    $('.charli1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text:null
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,            
            title: {
                text:null
            }
        },
        legend: {
            reversed: true
        },
        series: [{
            name: 'John',
            data: [5]
        }]
    });
    $('.charli2').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text:null
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,            
            title: {
                text:null
            }
        },
        legend: {
            reversed: true
        },
        series: [{
            name: 'John',
            data: [5]
        }]
    });
    $('.charli3').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text:null
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,            
            title: {
                text:null
            }
        },
        legend: {
            reversed: true
        },
        series: [{
            name: 'John',
            data: [5]
        }]
    });
    $('.charli4').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text:null
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,            
            title: {
                text:null
            }
        },
        legend: {
            reversed: true
        },
        series: [{
            name: 'John',
            data: [5]
        }]
    });
});
	
	
});

