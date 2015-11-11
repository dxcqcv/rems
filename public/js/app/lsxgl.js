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
		
		
		demand.start({url:'/api/clzpropMng/list.json', data:{userid:1},done:lsxgl})
		function lsxgl(data){
			console.log(data);
            var formatname = data.status.data.formatList[0].formatname;
            var str = '<option>请选择类型</option><option>'+formatname+'</option>';
            $("#lsx_selectId").empty().append(str).selectpicker('refresh');
            str = '';
            $.each(data.status.data.typeList,function(i,v){
                str +='<option>'+v.typename+'</option>';
            });
			$("#lsxglLxsxSelect").empty().append(str).selectpicker('refresh');
	
		}
		

  $('#lsx_selectId').change(function(){
        var selected = $(this).find('option:selected').val();
        if(selected == '泛能站体系') {
            demand.start({url:'/api/clzMng/page.json',done:lsx_left})
            function lsx_left(data){
					console.log(data);
					var str = "";
					$.each(data.status.data.classList,function(i,v){
		                str +='<ul><li class="lili" data-classid="'+v.classid+'" data-classtypeid="'+v.classtypeid+'">'+v.classname+'</li></ul>';
		            });
					$("#lsx_ul").empty().append(str);
					}
        }
    });




		
	});	
});
