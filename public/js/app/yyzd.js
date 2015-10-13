define(function(require) {
	var $ = require('jquery'),
		highcharts = require('highcharts');
	$(function() {
						$(".btn_xq").click(function() {
							$("#yyzd_top").css('display','none')
							$("#tab_foot").css('display', 'block')
						});
						$(".tab_black").click(function() {
							$("#yyzd_top").css('display','block')
							$("#tab_foot").css('display', 'none')
						});

	}());	
});