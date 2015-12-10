define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
    , api = require('app/getApi')
	;
	$(function(){
		//下拉选择
      $('.selectpicker').selectpicker({
      });
    	$('.btn_coin').on('click', function() {
            $('#gytModal').modal({
                backdrop: 'static' 
            });  
        });
        
        //添加
        $(document).on('click','#searDataBtn',function(){
        	$("#bg1").css('display','block');
			$("#tabledivbj").css('display','block');
			
        })
         $("#closedivs").click(function(){
	        	$("#tabledivbj").css('display','none');
	        	$("#bg1").css('display','none');
	        });
	        
	        demand.start({url:'/api/clzpropMng/addInput.json', data:{clzid:2},done:addlsxgl})
				function addlsxgl(data){
					console.log(data);
		            
				  	var str = '<option value="">请选择属性类型</option>';
				  	var str2 = '<option value="">请选择属性关联</option>';
					$("#editShuxingType,#editShuxingTypes").empty().append(str).selectpicker('refresh');
					$("#editShuxingRelation,#editRelation").empty().append(str2).selectpicker('refresh');
					str = '';str2 = '';
					$.each(data.status.data.clzProps, function(i, item) {
						str += '<option value="' + item.classid + '">' + item.classname + '</option>';
					});
					$.each(data.status.data.propTypes, function(i, item) {
						str2 += '<option value="' + item.propertytypeid + '">' + item.typename + '</option>';
					});
					  
					$("#editShuxingType,#editShuxingTypes").empty().append(str).selectpicker('refresh');
					$("#editShuxingRelation,#editRelation").empty().append(str2).selectpicker('refresh');
					
				}
	    $("#addeEditBtn").on("click",function(){
	    	var shuxingNames=$.trim($("#editShuxingNames").val());
	    	var shuxingTypes=$("#editShuxingTypes").val();//currentClasspropertyids
	    	var shuxing=$("#editShuxing").val();
	    	var realtion=$.trim($("#editRelation").val());
	    	var shuxingSort=$(":radio[name='editShuxingSort']:checked").val();
	    	var addremark=$("#addremark").val();
	    	
	    	//alert(shuxingTypes);
	    	//return;
	    	demand.start({url:'/api/clzpropMng/add.json', 
	    		data:{
	    			classpropertyname:shuxingNames,
	    			classid:shuxingTypes,
	    			isdynamic:shuxing,
	    			remarks:addremark,
	    			rank:shuxingSort,
	    			propertytypeid:realtion

	    		},done:savelsxgl
	    });
	    	
	    });
	    
	    function savelsxgl(data)
	    {
	   
	    	if(data.status.msg=="success")
	    	{	    		
				reloadTable();
				alert("新增记录成功!");
	    	}
	    	else
	    	{
	    		alert("新增记录失败,请联系管理员!");
	    	}
	    	$("#editShuxingNames,#addremark").val("");
	    }
        
		//刷新table
		function reloadTable()
		{
				var lsxglLxsxSelect=$("#lsxglLxsxSelect").val();
			  	var searchPropetyClass=$("#searchPropetyClass").val();
			  	var searchPropertyName=$.trim($("#searchPropertyName").val());
				demand.start({url:'/api/clzpropMng/findByForm.json', 
				data:{
					pclzid:$("#currentClasspropertyids").val(),
					propTypeid:lsxglLxsxSelect,
					isdynamic:searchPropetyClass,
					propName:searchPropertyName
				},
				done:function(data){
				$("#tabledivbj").css('display','none');
	        	$("#bg1").css('display','none');
				var str = "";
				if(data.status.data=="")
				{
					str += '<tr>';
					str	+= '<td style="text-align:center" colspan="7">暂无数据</td>'
					str	+= '</tr>';
					$("#resultBody").empty().html(str);
					return;
				}
				$.each(data.status.data.list,function(i,v){
					str += '<tr class="lsx_tr_'+v.classpropertyid+'">';
					str	+= '<td>'+i+'</td>'
					str	+= '<td>'+v.classpropertyname+'</td>'
					str	+= '<td>'+v.classname+'</td>'
					str	+= '<td>泛能站体系</td>'
					str	+= '<td>'+v.typename+'</td>'
					str	+= '<td>'+v.remarks+'</td>'
					str	+= '<td><img class="dd" data-classpropertyid="'+v.classpropertyid+'" src="/img/lsxgl/write.png"/><img class="slcolds" src="/img/lsxgl/sz.png"/></td>'
					str	+= '</tr>';
	            });
				$("#resultBody").empty().append(str);
				$("#resultBody tr:even").addClass("even");  
				$("#resultBody tr:odd").addClass("odd"); 
				
			}});  
		}

//		编辑
        $(document).on('click','.dd',function(){
          $("#currentClasspropertyid").val($(this).attr("data-classpropertyid"));
          GetEditInfoById($("#currentClasspropertyid").val());
       	  $("#bg").css('display','block');
          $("#tablediv").css('display','block');
        });
        
        function GetEditInfoById(id)
        {        	
        	demand.start({url:'/api/clzpropMng/updateInput.json', data:{classpropertyid:id},done:lsx_editView})
            function lsx_editView(data){
            		console.log("33333");
					console.log(data);
					$("#editShuxingName").val(data.status.data.updateObj.classpropertyname);
					$("#editShuxingType").val(data.status.data.updateObj.classid);
					$("#editShuxingType option[value='"+data.status.data.updateObj.classid+"']").attr("selected",true).selectpicker('refresh');;				
					$("#editShuxingRelation").val(data.status.data.updateObj.propertytypeid);
					$("#editShuxingRelation option[value='"+data.status.data.updateObj.propertytypeid+"']").attr("selected",true).selectpicker('refresh');;
					$("#editShuxingRelation").next().find("span").first().text($("#editShuxingRelation option[value='"+data.status.data.updateObj.propertytypeid+"']").text());
										
					$("#editShuxingRelation").next().find("ul").children("li").each(function(){
						if(parseInt($(this).attr("data-original-index"))==(parseInt(data.status.data.updateObj.propertytypeid)-1))
						{
							$(this).attr("class","selected");
						}
						else
						{
							$(this).removeAttr("selected");
						}	
					});
					
					$(":radio[name='editShuxingSort'][value='"+data.status.data.updateObj.isdynamic+"']").attr("checked",true);
					$("#editRemark").val(data.status.data.updateObj.remarks);
			}
        }
		
        $("#closediv").click(function(){
        	$("#tablediv").css('display','none');
        	$("#bg").css('display','none');
        });
        
		$("#editClose,#addClose").click(function(){			
        	$("#tablediv,#tabledivbj").css('display','none');
        	$("#bg,#bg1").css('display','none');
        });
        
        $("#saveEditBtn").click(function(){
			var shuxingNames=$.trim($("#editShuxingName").val());
	    	var shuxingTypes=$("#editShuxingType").val();//currentClasspropertyids
	    	var shuxing=$("#editShuxing").val();
	    	var realtion=$.trim($("#editShuxingRelation").val());
	    	var shuxingSort=$(":radio[name='editShuxingSort']:checked").val();
	    	var addremark=$("#editRemark").val();
	    	var classpropertyid=$("#currentClasspropertyid").val();
	    	
		  demand.start({url:'/api/clzpropMng/update.json', 
		  	data:{
		  			classpropertyname:shuxingNames,
	    			classid:shuxingTypes,
	    			isdynamic:shuxing,
	    			remarks:addremark,
	    			rank:shuxingSort,
	    			propertytypeid:realtion,
	    			classpropertyid:classpropertyid
		  	},
		  	done:function(data){
		  		if(data.status.msg=="success")
		    	{	    		
					reloadTable();
					$("#tablediv").css('display','none');
          	 		$("#bg").css('display','none');
					alert("编辑记录成功!");
		    	}
		    	else
		    	{
		    		alert("新增记录失败,请联系管理员!");
		    		return;
		    	}
		  	
		  }});
         
        });
		
//	删除
		 $(document).on('click','.slcolds',function(){
        	$("#bg1").css('display','block');
			$("#coliseselect").css('display','block');
			$("#btnDel").attr("delId",$(this).prev("img").attr("data-classpropertyid"));
        });
		
        $("#closedivsel").click(function(){
        	$("#coliseselect").css('display','none');
        	$("#bg1").css('display','none');
        });
        
        $("#btnDel").click(function(){
        	var delId=$(this).attr("delId");
        	demand.start({url:'/api/clzpropMng/delete.json', data:{classpropertyid:delId},done:lsx_DelView})
        	$("#coliseselect").css('display','none');
        	$("#bg1").css('display','none');
        });
        
        function lsx_DelView(data)
        {
        	if(data.status.msg=="success")
        	{
        		reloadTable();
        		alert("删除记录成功!");
        	}
        	else
        	{
        		alert("删除记录失败!");
        	}
        	return;
        }
	
		demand.start({url:'/api/clzpropMng/list.json', data:{userid:1},done:lsxgl})
		function lsxgl(data){
			console.log(data);
            var formatname = data.status.data.formatList[0].formatname;
            var formatid = data.status.data.formatList[0].formatid;
            var str = '<option value="">请选择类型</option><option value="'+formatid+'">'+formatname+'</option>';
            $("#lsx_selectId").empty().append(str).selectpicker('refresh');
            str = '';
            $.each(data.status.data.typeList,function(i,v){
                str +='<option value="'+v.propertytypeid+'">'+v.typename+'</option>';
            });
            console.log(str);
			$("#lsxglLxsxSelect").empty().append(str).selectpicker('refresh');
	
		}
		

  $('#lsx_selectId').change(function(){
        var selected = $(this).find('option:selected').val();
        if(selected == '1') {
            demand.start({url:'/api/clzMng/page.json',done:lsx_left})
        }
    });

            function lsx_left(data){
					console.log(data);
					var str = "";
					$.each(data.status.data.classList,function(i,v){
		                str +='<li class="lili" data-classid="'+v.classid+'" data-classtypeid="'+v.classtypeid+'">'+v.classname+'</li>';
		            });
					$("#lsx_ul").empty().append(str);
					}
  $('#lsx_ul').on("click", 'li', function(){
  	
	var classid = $(this).attr("data-classid");
	$(this).css("background-color","#3498db").css("color","white").css("border-radius","5px");
	$(this).siblings().css("background-color","").css("color","black");
	$("#currentClasspropertyids").val(classid);
	
	$("#lsxglLxsxSelect").val(0);
	$("#lsxglLxsxSelect option[value='0']").attr("selected",true).selectpicker('refresh');;
	$("#lsxglLxsxSelect").next().find("span").first().text("常规");
	$("#searchPropertyName").val("");
	
	reloadTable();
  });
 
  $("#queryDataBtn").on('click',function(){
  	var currentTixi = $('#lsx_selectId').val();
  	console.log(currentTixi);
  	if (currentTixi == '') {
  		alert("请在左侧下拉列表选择类型和设备类");
  	};
	reloadTable();
  })
		
	});	

	


});
