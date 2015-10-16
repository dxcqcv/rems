;define(function(require){
    var $ = require('jquery')
      , xmglCss = require("css!../../css/xmgl")
    ;
    (function(){
         $(".btn_one").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/xmgl.png')");
         	$(".img_mu").css('display','none');
         });
         $(".btn_two").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/xmgl2.png')");
         	$(".img_mu").css('display','none');
         });
         $(".btn_three").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/xmgl3.png')");
         	$(".img_mu").css('display','none');
         });
         $(".btn_four").click(function(){
         	$(".img_img").css("background-image","url('/img/xmgl/xmgl4.png')");
         	$(".img_mu").css('display','none');
         });
    }());
});
