define(function(require) {
	var $ = require('jquery')
      ;
	$(function() {
					//		打开模板
					$(".btn_a").click(function() {
						$("#ZDBG_top").css('display','none')
						$("#ZDBG_content").css('display', 'block');
						$(".btn_yl").css('display','none')
					});
					//返回图标
					$(".tab_black").click(function() {
						$("#ZDBG_top").css('display','block')
						$("#ZDBG_content").css('display', 'none')
					});

					//确认
					 $(".btn_true").click(function(){
					    $("#mymodal").modal();
					  });
			
			 		$(".btn_fan").click(function(){
			 			$("#mymodal1").modal();
					  });
					//提交预览
					  $(".btn_butt").click(function(){
					  		$("#ZDBG_top").css('display','none')
							$(".BG_footer").css('display', 'none')
							$(".btn_yl").css('display','block')
					  });
					//  发送报告
					  $(".btn_teo").click(function(){
						  		$("#ZDBG_top").css('display','block')
							$("#ZDBG_content").css('display', 'none');
							$(".btn_yl").css('display','none')
						  });
						  
					//  返回修改
					  $(".btn_blackl").click(function(){
					  		$("#ZDBG_top").css('display','block')
						$("#ZDBG_content").css('display', 'none');
						$(".btn_yl").css('display','none')
					  });
						  
	}());	
});
