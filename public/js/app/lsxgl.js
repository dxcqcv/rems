define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
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
		
		
		demand.start({url:'/api/clzpropMng/list.json', data:{userid:1},done:lsxgl})
		function lsxgl(data){
			console.log(data);
//			console.log(data.status.data.formatList[0].formatname);
            var formatname = data.status.data.formatList[0].formatname;
            var str = '<option>'+formatname+'</option>';
            $("#lsx_selectId").empty().append(str).selectpicker('refresh');
            str = '';
            $.each(data.status.data.typeList,function(i,v){
                str +='<option>'+v.typename+'</option>';
            });
            console.log(str);
			$("#lsxglLxsxSelect").empty().append(str).selectpicker('refresh');
//			
//			var str2='';
//			$.each(data.status.data.typeList,function(i,v){
//				str2 +='<li class="lili" >'+v.typename+'</li>';
//				
//			});
//
//			$("#lsx_ul").empty().append(str2);
			
		}
		
	});	
});
