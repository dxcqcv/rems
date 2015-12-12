define(function(require) {
	var $ = require('jquery')
    , api = require('app/getApi')
	;
	//新增
	//打开新增框
	$("#addbtn").click(function(){
		$("#bg").show();
		$("#tablediv").show();
	})
	
	//关闭新增框
	$("#closediv").click(function(){
		$("#bg").hide();
		$("#tablediv").hide();
	})
	
	
	
	//编辑
	//打开编辑框
	$("#eidtdiv").click(function(){
		$(".titlesxgl").text("修改通用公式");
		$("#bcbtn").text("保存");
		$("#bg").show();
		$("#tablediv").show();
	})
	//关闭编辑框
	
	
	
	//删除
	//打开删除框
	$("#delbtn").click(function(){
		$("#bg1").show();
		$("#coliseselect").show();
	})
	
	//关闭删除狂
	$("#closedivsel").click(function(){
		$("#bg1").hide();
		$("#coliseselect").hide();
	})
});
