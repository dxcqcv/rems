define(function(require) {
	var $ = require('jquery')
      ;
	$(function() {
		    $("#mymenu ul li").next("ul").hide();
		    $("#mymenu ul li").click(function()
		    {
		     $(this).next("ul").toggle();
		    });
    }());
});
