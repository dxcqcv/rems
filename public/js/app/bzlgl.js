define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
    , api = require('app/getApi')
	;
	
	
	//		编辑
        $(document).on('click','.dd',function(){
        	 $("#bg").css('display','block');
			$("#tablediv").css('display','block');
        });
		
        $("#closediv").click(function(){
        	$("#tablediv").css('display','none');
        	$("#bg").css('display','none');
        });
        
		$("#colse").click(function(){
        	$("#tablediv").css('display','none');
        	$("#bg").css('display','none');
        });
		
		
//	删除
		 $(document).on('click','.slcolds',function(){
        	 $("#bg1").css('display','block');
			$("#coliseselect").css('display','block');
        });
		
        $("#closedivsel").click(function(){
        	$("#coliseselect").css('display','none');
        	$("#bg1").css('display','none');
        });
	
	
       
       
	demand.start({url:'/api/clzMng/page.json', done:bzlgl})
		function bzlgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.classList,function(i,v){
                str +='<tr><td>'+v.classid+'</td><td>'+v.classname+'</td><td>'+v.parentclassname+'</td><td>'+v.formatname+'</td><td>'+v.picturepath+'</td><td><img class="dd" src="/img/lsxgl/write.png"/><img class="slcolds" src="/img/lsxgl/sz.png"/></td></tr>';
            });
			$("#bzldl_tab").empty().append(str);			
		}	
		
});
