define(function(require){
    var 
      $ = require('jquery')
      ;
    (function(){
			$(".next_1").click(function() {
							$("#one_div").css("display","none");
							$("#two_div").css("display","block");
						});
						
			$(".next_2").click(function() {
							$("#one_div").css("display","none");
							$("#two_div").css("display","none");
							$("#three_div").css("display","block");
						});
			$(".next_3").click(function() {
							$("#three_div").css("display","none");
							$("#four_div").css("display","block");
						});	
        
    }());
});
