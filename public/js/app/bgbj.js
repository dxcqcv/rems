define(function(require) {
	var $ = require('jquery'),
		highcharts = require('highcharts');
	$(function() {
						$(".btn_a").click(function() {
							$("#ZDBG_top").css('display','none')
							$("#ZDBG_content").css('display', 'block')
						});
						$(".tab_black").click(function() {
							$("#ZDBG_top").css('display','block')
							$("#ZDBG_content").css('display', 'none')
						});

					 $(".btn_true").click(function(){
					    $("#mymodal").modal();
					  });
			
			 		$(".btn_fan").click(function(){
			 			$("#mymodal1").modal();
					  });
	}());	
});
