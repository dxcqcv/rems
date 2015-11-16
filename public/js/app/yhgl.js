define(function(require) {
	var $ = require('jquery')
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
		
		demand.start({url:'/api/userInfo/list.json', done:qxgl})
		function qxgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.list,function(i,v){
                str +='<tr><td>'+v.userName+'</td><td>'+v.userShowName+'</td><td>'+v.sysrolename+'</td><td>'+v.company+'</td><td>'+v.emailAddress+'</td><td>'+v.remarks+'</td><td>'+v.createTime+'</td><td>'+v.isvalId+'</td><td><img class="dd" src="/img/lsxgl/write.png"/></td></tr>';
            });
			$("#tableid").empty().append(str);			
		}	

				
	});	
