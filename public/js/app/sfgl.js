define(function(require) {
	var $ = require('jquery')
    , api = require('app/getApi')
	;
	
		
		demand.start({url:'/api/sysroleInfo/list.json', done:qxgl})
		function qxgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.sysroleList,function(i,v){
                str +='<tr><td>'+v.sysrolename+'</td><td>'+v.groupname+'</td><td>'+v.sysroledescr+'</td><td>'+v.createdate+'</td><td></td><td></td></tr>';
            });
			$("#sfgltab").empty().append(str);
			
	}	

				
	});	
