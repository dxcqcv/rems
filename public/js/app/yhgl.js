define(function(require) {
	var $ = require('jquery')
    , api = require('app/getApi')
	;
	
		
		demand.start({url:'/api/userInfo/list.json', done:qxgl})
		function qxgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.list,function(i,v){
                str +='<tr><td>'+v.userName+'</td><td>'+v.userShowName+'</td><td>'+v.sysrolename+'</td><td>'+v.company+'</td><td>'+v.emailAddress+'</td><td>'+v.remarks+'</td><td>'+v.createTime+'</td><td></td><td></td></tr>';
            });
			$("#tableid").empty().append(str);
			
			
			
			
		}	

				
	});	
