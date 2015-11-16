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
					var str = "";
					var childrenStr = "";
					$.each(data.status.data.list,function(i,v){

		                str +='<ul class="one"><span><img src="/img/xmxxgl/未标题-1.png" class="img_eld"></span><a href="#">华北区</a></li>';
		                if (v.children) {
		                	childrenStr = '<ul class="ulli">';
		                	for (var i = 0; i < v.children.length; i++) {
		                		
		                		childrenStr += '<li data-id="'+v.children[i].id+'"><span><img src="/img/xmxxgl/让退.png" class="img_eld"></span><a href="#">'+v.children[i].name+'</a></li>';
		                	};
		                	childrenStr += '</ul>';
		                };
		                str += childrenStr + '</ul>';
		            });
		            console.log(str);
					$(".uldiv").empty().append(str);
			}
        
   
    
    $('.uldiv').on("click", '.ulli li', function(){
  	var classid = $(this).attr("data-id");
  	demand.start({url:'/api/projectmanagement/lists.json', data:{id:classid,page:1,rating:1},done:lsx_right})
            function lsx_right(data){
					console.log(data);
					var str = "";
					if (data.status.data.count != 0) {
						$.each(data.status.data.list,function(i,v){
							str += '<tr class="">';
							str	+= '<td>'+i+'</td>'
							str	+= '<td>'+v.classpropertyname+'</td>'
							str	+= '<td>'+v.classname+'</td>'
							str	+= '<td>泛能站体系</td>'
							str	+= '<td>'+v.typename+'</td>'
							str	+= '<td><span><img src="/img/lsxgl/sz.png"/></span></td>'
							str	+= '<td><span><img src="/img/lsxgl/write.png"/></span></td>'
							str	+= '</tr>';
			    //             str +='<ul><li class="lili" data-classid="'+v.classid+'" data-classtypeid="'+v.classtypeid+'">'+v.classname+'</li></ul>';
			            });
					}else{
						str = "";
					}
					
					$("#resultBody").empty().append(str);
					$("#resultBody tr:even").addClass("even");  
					$("#resultBody tr:odd").addClass("odd"); 
			}

  });
    
    
    
     
    
    
});
