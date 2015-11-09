define(function(require) {
	var $ = require('jquery')
    , api = require('app/getApi')
	;
	
       
       
	demand.start({url:'/api/clzMng/page.json', done:bzlgl})
		function bzlgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.classList,function(i,v){
                str +='<tr><td>'+v.classid+'</td><td>'+v.classname+'</td><td>'+v.parentclassname+'</td><td>'+v.formatname+'</td><td>'+v.picturepath+'</td><td></td></tr>';
            });
			$("#bzldl_tab").empty().append(str);			
		}	
		
});
