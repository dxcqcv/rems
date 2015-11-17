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
          var editShuxingName = $("#editShuxingName").val();
          
          $(".lsx_tr_"+currentClasspropertyid).find('td').eq(0).empty().append(editShuxingName);

          $("#tablediv").css('display','none');
          $("#bg").css('display','none');
          
          
        });
		
		
//	删除
		 $(document).on('click','.slcolds',function(){
        	 $("#bg1").css('display','block');
			$("#coliseselect").css('display','block');
        });
		
        $("#closedivsel").click(function(){
        	$("#coliseselect").css('display','none');
        	$("#bg1").css('display','none');
        });
	
		
		
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
  	demand.start({url:'/api/clzpropMng/findByForm.json', data:{pclzid:classid},done:lsx_right})
            function lsx_right(data){
					console.log(data);
					var str = "";
					$.each(data.status.data.list,function(i,v){
						str += '<tr class="lsx_tr_'+v.classpropertyid+'">';
						str	+= '<td>'+i+'</td>'
						str	+= '<td>'+v.classpropertyname+'</td>'
						str	+= '<td>'+v.classname+'</td>'
						str	+= '<td>泛能站体系</td>'
						str	+= '<td>'+v.typename+'</td>'
						str	+= '<td></td>'
						str	+= '<td><img class="dd" data-classpropertyid="'+v.classpropertyid+'" src="/img/lsxgl/write.png"/><img class="slcolds" src="/img/lsxgl/sz.png"/></td>'
						str	+= '</tr>';
		    //             str +='<ul><li class="lili" data-classid="'+v.classid+'" data-classtypeid="'+v.classtypeid+'">'+v.classname+'</li></ul>';
		            });
					$("#resultBody").empty().append(str);
					$("#resultBody tr:even").addClass("even");  
					$("#resultBody tr:odd").addClass("odd"); 
			}
  });
 
  $("#queryDataBtn").on('click',function(){
  	var currentTixi = $('#lsx_selectId').val();
  	console.log(currentTixi);
  	if (currentTixi == '') {
  		alert("请在左侧下拉列表选择类型和设备类");
  	};

  })






		
	});	

	


});
