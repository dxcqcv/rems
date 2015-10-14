;define(function(require){
    var $ = require('jquery')
      , xmglCss = require("css!../../css/xmgl")
    ;
    (function(){
         $(".btn_one").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/1-1.png')");
         	$(".img_mu").css('display','none');
         });
         $(".btn_two").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/1-2.png')");
         	$(".img_mu").css('display','none');
         });
         $(".btn_three").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/1-3.png')");
         	$(".img_mu").css('display','none');
         });
         $(".btn_four").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/1-4.png')");
         	$(".img_mu").css('display','none');
         });
    }());
});
