define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
    , api = require('app/getApi')
	;
	
	
	//		编辑
        $(document).on('click','.dd',function(){
         	 $("#currentClasspropertyid").val($(this).attr("data-classpropertyid"));
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
        $("#saveEditBtn").click(function(){
          var currentClasspropertyid = $("#currentClasspropertyid").val();          
          var txtinput = $("#txtinput").val();
          $(".lsx_tr_"+currentClasspropertyid).find('td').eq(1).empty().append(txtinput);
          $("#tablediv").hide();
          $("#bg").hide();
                    
        });
		
//	删除
	$(function () {
            $(document).on("click", ".slcolds", function(){
            	$("#classid").val($(this).attr("data-classpropertyid"));
            	 $("#bg1").show();
				$("#coliseselect").show();
            });
            $("#closedivsel").click(function(){
            	$("#bg1").hide();
                $("#coliseselect").hide();
            });
            $("#btnTrue").click(function(){
            	var currentClasspropertyid = $("#currentClasspropertyid").val();          
		          var txtinput = $("#txtinput").val();
		          $(".lsx_tr_"+currentClasspropertyid).find('td').parent().remove();
            	$("#bg1").hide();
                $("#coliseselect").hide();
            });

         });

//新增
		$(function(){
			$(document).on("click","#btnadd",function(){
				document.getElementById("saveEditBtn").innerHtml="添加";
				 $("#bg").css('display','block');
				 $("#tablediv").css('display','block');
				 
			});
		});

       
	demand.start({url:'/api/clzMng/page.json', done:bzlgl})
		function bzlgl(data){
			console.log(data);
			var str;
			$.each(data.status.data.classList,function(i,v){
				str +='<tr class="lsx_tr_'+v.classid+'">'
				str +='<td>'+i+'</td>'
				str +='<td>'+v.classname+'</td>'
				str +='<td>'+v.parentclassname+'</td>'
				str +='<td>'+v.formatname+'</td>'
				str +='<td><img src="/img/lsxgl/write.png"/></td>'
				str +='<td><img class="dd" data-classpropertyid="'+v.classid+'" src="/img/lsxgl/write.png"/><img class="slcolds"  data-classpropertyid="'+v.classid+'"  src="/img/lsxgl/sz.png"/></td>'
                str +='</tr>'
                });
			$("#bzldl_tab").empty().append(str);			
		}	
});
