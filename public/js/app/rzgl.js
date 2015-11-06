define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')	
    , datapicker = require('bootstrap-datetimepicker.min')
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
		
		 //时间控件
       $('.datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD',
            defaultDate: new Date()
       });
       
       

       
	});	
});
