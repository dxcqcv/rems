define(function(require) {	
	var $ = require('jquery')
	, api = require('app/getApi')
	;
	
	
	
	
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
	
	demand.start({url:'/api/config/report/list.json',data:{page:0}, done:rzgl})
		function rzgl(data){
			console.log(data);
			
		}
	
	
	
});
