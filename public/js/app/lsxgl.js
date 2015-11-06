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
		
    //$('#lsx_selectId').change(function(){
        //var selected = $(this).find('option:selected').val();
        //if(selected == '泛能站体系') {
            //console.log(12121)
            //alert(12121)
        //}
    //});
$(document).on('change', '#lsx_selectId', function(){
        var selected = $(this).find('option:selected').val();
        if(selected == '泛能站体系') {
        }
});
	demand.start({url:'/api/clzpropMng/list.json', data:{userid:1},done:lsxgl})
		function lsxgl(data){
            var formatname = data.status.data.formatList[0].formatname;
            var str = '<option>请选择项目类型</option><option>'+formatname+'</option>';
            $("#lsx_selectId").empty().append(str).selectpicker('refresh');
            str = '';
            $.each(data.status.data.typeList,function(i,v){
                str +='<option>'+v.typename+'</option>';
            });
			$("#lsxglLxsxSelect").empty().append(str).selectpicker('refresh');
		//$(document).on('change','#lsx_selectId', function(){
            //console.log(1212)
        //});
		}
	
  //$('#lsx_selectId').change(function(){
        //var selected = $(this).find('option:selected').val();
        //if(selected == '泛能站体系') {
            //demand.start({url:'/api/clzpropMng/listLeft.json', data:{typeId:1},done:lsx_left})
            //function lsx_left(data){
				//console.log(data);
				
			//}
        //}
    //});



	});	
});
