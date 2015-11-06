define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
	;
	$(function(){
		//下拉选择
      $('.selectpicker').selectpicker({
      });
    	$('.btn_coin').on('click', function() {
            $('#gytModal').modal({
                backdrop: 'static' 
            });  

		
        });
		
		$("#mymenu ul li").next("ul").hide();
		    $("#mymenu ul li").click(function()
		    {
		     $(this).next("ul").toggle();
		    });
		    
		    $(".bt").click(function(){
		    	$("#mymenu").css('display','block')
		    })
		
		
	});	
})













//define(function(require){
//	var $ = require('jquery')
//    , datapicker = require('bootstrap-datetimepicker.min')
//	   selectpicker = require('bootstrap-select')
//    ;
//    $(function(){
//    	
//		    
//		    	//下拉选择
//    $('.selectpicker').selectpicker({
//    });
//  	$('.btn_coin').on('click', function() {
//          $('#gytModal').modal({
//              backdrop: 'static' 
//          });  
//    	
//   });
//});