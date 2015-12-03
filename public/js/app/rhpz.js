define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , setDate = require('app/setDate')
      , datetimepickerObj = require('app/dateObj')
      , globalTools = require('app/globalTools')
      , api = require('app/getApi')
      ;

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
				$("#inspan").text("这是隐藏的值");
			});
			
		
			$("#inspan").click(function(){
				$(".nonedlp").css('display','none');
				$(".uldiv").css("display","block");
			});
			
		 
			
			
			$(".nonedlp>ul>li").mouseover(function() {
					$(".nonedlp>ul>li").each(function(i) {
						$(this).removeClass("h_nav_over");
					});
					$(this).addClass("h_nav_over");
				}).mouseout(function() {
					$(this).addClass("h_nav_over");
				});
			
			
			
		}());
		
		
});
