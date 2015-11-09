define(function(require) {
	var $ = require('jquery')
    , api = require('app/getApi')
	;
		demand.start({url:'/api/projectrole/list.json', done:qxgl})
		var str;
		function qxgl(data){
			console.log(data);
			$.each(data.status.data.projectroleList,function(i,v){
                str +='<tr><td>'+v.projectrolename+'</td><td>'+v.remarks+'</td><td>'+v.createdate+'</td><td></td><td></td></tr>';
            });
			$("#qxgl_tab").empty().append(str);
			
		}	

	});	
