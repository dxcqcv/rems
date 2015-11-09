define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')	
    , datapicker = require('bootstrap-datetimepicker.min')
     , api = require('app/getApi')
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
       
       
	demand.start({url:'/api/logInfo/listCondition.json',data:{page:0}, done:rzgl})
		function rzgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.logs.datas,function(i,v){
                str +='<tr><td>'+v.usershowname+'</td><td>'+v.operatetype+'</td><td>'+v.showModule+'</td><td>'+v.type+'</td><td>'+v.userip+'</td><td>'+v.showMessage+'</td><td>'+v.createdate+'</td></tr>';
            });
			$("#rzgl").empty().append(str);
			
			
			
			
		}	
       
	});	
});
