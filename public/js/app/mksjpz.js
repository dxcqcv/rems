define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , setDate = require('app/setDate')
      , datetimepickerObj = require('app/dateObj')
      , globalTools = require('app/globalTools')
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
      	
      	
      	
//    	左侧菜单
      	$("#mymenu ul li").next("ul").hide();
			$("#mymenu ul li").click(function() {
				$(this).next("ul").toggle();
			});
			
//			新增
			$(".btnshow").click(function(){
				$("#bg").css('display','block');
				$("#TKtablediv").css('display','block');
			})
			
//			取消按钮
			$(".closde").click(function(){
				$("#bg").css('display','none');
				$("#TKtablediv").css('display','none');
			})
			
//			关闭图标
			$(".colse").click(function(){
				$("#bg").css('display','none');
				$("#TKtablediv").css('display','none');
			})
			
			
			$(".ulliul>li").mouseover(function() {
					$(".ulliul>li").each(function(i) {
						$(this).removeClass("h_nav_over");
					});
					$(this).addClass("h_nav_over");
				}).mouseout(function() {
					$(this).addClass("h_nav_over");
				});
				
			$(".imgsrc").click(function(){
				$("#bg1").css('display','block');
				$("#coliseselect").css('display','block');
			});

			$("#closedivsel").click(function(){
				$("#bg1").css('display','none');
				$("#coliseselect").css("display","none");
			});
			
//			$(".glshpzps").click(function(){
//				$("#tabdivall").hide();
//				$("#glszym").show();
//			})
//			
      }());

});
