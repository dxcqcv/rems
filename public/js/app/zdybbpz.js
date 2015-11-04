define(function(require) {
	
	var $ = require('jquery');
	$(function(){
		$("#btnshow").click(function(){
			$("#bg").css('display','block');
			$("#tablediv").css('display','block');
		})
	});	
	
	$(function(){
		$("#colse").click(function(){
			$("#bg").css('display','none');
			$("#tablediv").css('display','none');
		})
	});	
	
	$(function(){
		$("#closediv").click(function(){
			$("#bg").css('display','none');
			$("#tablediv").css('display','none');
		})
	});	
	
	
});
