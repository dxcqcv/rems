define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
    , api = require('app/getApi')
	;
	$(function(){
		//下拉选择
        $('.selectpicker').selectpicker({});
        $('.btn_coin').on('click', function() {
            $('#gytModal').modal({
                backdrop: 'static' 
            });  
        });

		
     demand.start({url:'/api/clzpropMng/list.json',data: {userid: 2}, done:test})
     function test(data) {
      console.log(data);
     }
		
	});	
});
