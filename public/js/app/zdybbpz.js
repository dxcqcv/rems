define(function(require) {	
	var $ = require('jquery')
	, api = require('app/getApi')
	;
	
	
	
	
	$(function(){
		$("#btnshow").click(function(){
			$("#bg").css('display','block');
			$("#tablediv").css('display','block');
		})

		 $("#input-4").fileinput({

		 	language: 'zh', //设置语言
	        uploadUrl: '/user/upload', //上传的地址
	        uploadAsync: 'true',
	        allowedFileExtensions: ['xlsx','xls','jpg'],//接收的文件后缀
	        showUpload: true, //是否显示上传按钮
	        showCaption: false,//是否显示标题
	        showPreview: false,//是否显示预览
	        showUpload: false,
	        showRemove: false,
	        showCancel: false,
	        browseClass: "btn btn-info", //按钮样式     
	        //dropZoneEnabled: false,//是否显示拖拽区域
	        //minImageWidth: 50, //图片的最小宽度
	        //minImageHeight: 50,//图片的最小高度
	        //maxImageWidth: 1000,//图片的最大宽度
	        //maxImageHeight: 1000,//图片的最大高度
	        //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
	        //minFileCount: 0,
	        maxFileCount: 10, //表示允许同时上传的最大文件个数
	        enctype: 'multipart/form-data',
	        validateInitialCount:true,
	        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
	        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
		 }).on("filebatchselected", function(event, files) {
			    // trigger upload method immediately after files are selected
			    $("#input-4").fileinput("upload");
		}).on('fileloaded', function(event, file, previewId, index, reader) {
		    console.log(file.name);

		    //请求转化这个excel文件；
		    // demand.start({url:'/user/export',data:{fileName:file.name}, done:function(data){
		    // 	$(".divtableji").empty().append(data);
		    // }})

		    //请求转化这个excel文件；
            $.post('/user/export',{ 
                //参数一
                fileName: file.name, 
            }, 
            //回调函数
            function(data) 
            {
                //输出结果
                $(".divtableji").empty().append(data);
            });

		});



	});	
	
	$(function(){
		$("#colse").click(function(){
			$("#bg").css('display','none');
			$("#tablediv").css('display','none');
		})
	});	
	
	$(function(){
		$("#closediv").click(function(){
			$("#bg").css('display','none');
			$("#tablediv").css('display','none');
		})
	});	
	
	// demand.start({url:'/api/config/report/list.json',data:{page:0}, done:rzgl})
	// 	function rzgl(data){
	// 		console.log(data);
			
	// 	}


	
	
	
});
