;define(function(require){
    var $ = require('jquery')
    ;
    var i = -1;
		var time=0;
		junmper();
		function junmper(){
			i++;
			if(i>3)
			i=0;
			$(".all ul li").eq(i).addClass("bg").siblings().removeClass("bg");
				$(".pic ul li").eq(i).fadeIn(100).siblings().fadeOut(100);
				$(".pic ul li").eq(i).find(".img1").css({left:"-760px"});
				$(".pic ul li").eq(i).find(".img1").animate({left:"0px"},500);
	
		}

		$(".all ul li").click(function(){
			i=$(this).index();
			$(".all ul li").eq(i).addClass("bg").siblings().removeClass("bg");
				$(".pic ul li").eq(i).fadeIn(100).siblings().fadeOut(100);
				$(".pic ul li").eq(i).find(".img1").css({left:"-760px"});
				$(".pic ul li").eq(i).find(".img1").animate({left:"0px"},500);
	
		})

});

