define(function(require) {
	var $ = require('jquery')
    , api = require('app/getApi')
	;
		demand.start({url:'/api/accessInfo/list.json', done:qxgl})
		var str;
		function qxgl(data){
			console.log(data);
			$.each(data.status.data.list,function(i,v){
                str +='<tr><td>'+v.accessname+'</td><td>'+v.remarks+'</td><td>'+"时间没有"+'</td><td>'+"状态没有"+'</td><td></td></tr>';
            });
			$("#qxgl_tab").empty().append(str);
			
		}	

	});	
