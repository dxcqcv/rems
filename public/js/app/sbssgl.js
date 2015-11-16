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
		
		$("#mymenu ul li").next("ul").hide();
		    $("#mymenu ul li").click(function()
		    {
		     $(this).next("ul").toggle();
		    });		    
		    $(".bt").click(function(){
		    	$("#mymenu").css('display','block')
		    })
				
//	删除
		 $(document).on('click','.slcolds',function(){
        	 $("#bg1").css('display','block');
			$("#coliseselect").css('display','block');
        });
		
        $("#closedivsel").click(function(){
        	$("#coliseselect").css('display','none');
        	$("#bg1").css('display','none');
        });
		
		
		
		demand.start({url:'/api/instance/class.json', data:{pid:1},done:sbssgl})
		function sbssgl(data){
			console.log(data);
			var str='<option>请选择类型</option>';			
			$.each(data.status.data.list,function(i,v){
                str +='<option>'+v.classname+'</option>';
            });
            console.log(str);
			$("#sbshglselect").empty().append(str).selectpicker('refresh');
		}
		
	});	
})

