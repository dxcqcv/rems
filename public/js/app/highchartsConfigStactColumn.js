define(function(require){


    var optionsStactColumn = {
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
				text: null
			},
			xAxis: {
				categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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
			}, {
				name: 'Joe',
				data: [3, 4, 4, 2, 5, 6, 2],
			}, {
				name: 'Jane',
				data: [2, 5, 3, 2, 1, 2, 3],
			}]
    };
    return optionsStactColumn;
});
