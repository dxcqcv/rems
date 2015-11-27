define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
      ;
      
//     左侧菜单
		$(function() {
			$(".bt").click(function(){
				$("#mymenu").css('display','block');
			});
			
			$("#mymenu ul li").next("ul").hide();
			$("#mymenu ul li").click(function() {
				$(this).next("ul").toggle();
			});
		
			$(".ulli li").click(function() {
				$(".nonedlp").css('display', 'block');
				$(".uldiv").css('display', 'none');
				$("#aimg").css('display','none');
				$("#inspan").css('display','block');
				$("#inspan").html("这是隐藏的值");
			});
			
		
			$("#inspan").click(function(){
				$(".nonedlp").css('display','none');
				$(".uldiv").css("display","block");
			});
		
		}());


		


});
