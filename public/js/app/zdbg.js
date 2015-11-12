define(function(require) {
	var $ = require('jquery')
      ;
		$(function() {
						$(".btn_a").click(function() {
							$("#ZDBG_top").css('display','none')
							$("#ZDBG_content").css('display', 'block')
						});
	}());	
});
