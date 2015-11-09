define(function(require) {
	var $ = require('jquery')
	, api = require('app/getApi')
      ;
	$(function() {
		    $("#mymenu ul li").next("ul").hide();
		    $("#mymenu ul li").click(function()
		    {
		     $(this).next("ul").toggle();
		    });
    }());
    
    

            demand.start({url:'/api/projectmanagement/tree.json',done:xmxxglleft})
            function xmxxglleft(data){
					console.log(data);
					var str;
//					$.each(data.status.data.list,function(i,v){
//		                str +='<ul class="one"><span>'+v.icon+'</span><li class="lili">'+v.name+'</li></ul>';
//		            });
//					$(".uldiv").empty().append(str);
//					}
        }
   
    
    
    
    
     
    
    
});
