define(function(require) {	
	var $ = require('jquery')
	, api = require('app/getApi')
	;
	
	
	
	
	$(function(){


		//获取报表的列表：
        demand.start({url:'/api/config/report/list.json', data:{reportName:""},done:addBbSelect})
        function addBbSelect(data){
            console.log(data);
            //var str = '<option value="">请选择报表</option>';
            var str = '';
            $.each(data.status.data.list, function(i, item) {
                //str += '<option value="' + item.id + '">' + item.name + '</option>';
                str += '<tr class="odd">';
				str += '<td>' + item.id + '</td>';
				str += '<td>' + item.name + '</td>';
				str += '<td></td>';
				str += '<td></td>';
				str += '<td></td>';
				str += '<td><span><img src="/img/zdybbpz/sz.png"/></span><span><img src="/img/zdybbpz/write.png"/></span></td></tr>';			
								
            });
            $("#bbListTbody").empty().append(str);
        }


		$("#btnshow").click(function(){
			$("#modalBbType").val("add");
			$("#bg").css('display','block');
			$("#tablediv").css('display','block');
		})



		// 上传excle后并解析成html 
		 $("#input-4").fileinput({

		 	language: 'zh', //设置语言
		 	textEncoding:'UTF-8',
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
		    $("#addExcelName").val(file.name);

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
                //查询到table中的
                $("#bbHeaderInput").val(data);
                $(".divtableji").empty().append(data);

                var cellWidth = $(".divtableji table colgroup").find("col").eq(0).width();
                
               	var colNumber = Math.round(100/cellWidth);
               	var htmlInputString = "<tr id='codesTr'>";
               	for (var i = 0; i < colNumber; i++) {
               		htmlInputString += '<td width="'+cellWidth+'%"><input type=text style="width:100%"></td> ';
               	};
               	htmlInputString += "</tr>";
               	$(".divtableji table thead").append(htmlInputString);
                console.log("iok");

            });

		});




		//点击保存报表：
		$("#saveBbBtn").click(function(){
			alert("jjjj");
			console.log($("#codesTr input").length);
			var codes = "";
			$("#codesTr input").each(function(){
				codes += $(this).val() + ';';  
			});

			console.log();
			
			// 
			var dateString = $("#dateStrY").val() + "," + $("#dateStrM").val()+ "," + $("#dateStrD").val();

			var excelName = $("#addExcelName").val();
			var reportName = $("#bbName").val();
			var header = $("#bbHeaderInput").val();
			var codes = codes;
			var dateStr = dateString;
			var isShow = $("#isShow").val();
			var chartType = $("#chartType").val();
			var chartAddress = $("#chartAddress").val();
			//如果添加新报表
			var modalBbType = $("#modalBbType").val();
			if (modalBbType == "add") {
				demand.start({
					url:'/api/config/report/add.json',
					data:{
						reportName:reportName,
						header:header,
						codes:codes,
						dateStr:dateStr,
						isShow:isShow,
						chartType:chartType,
						chartAddress:chartAddress,
						excelName:excelName
					},
					done:saveNewbb
					//此处的如果接口添加成功之后 添加到此页面列表中 
				});

			}else{
				//如果更新报表
				demand.start({
					url:'/api/config/report/update.json',
					data:{
						reportName:reportName,
						header:header,
						codes:codes,
						dateStr:dateStr,
						isShow:isShow,
						chartType:chartType,
						chartAddress:chartAddress,
						excelName:excelName

					},
					done:bb_left
					//此处的如果接口添加成功之后 更新到此页面列表中 
				});
			}
			//获取以下参数 然后传递到后台的添加报表的接口中：

		})

	});	

	function saveNewbb(data){
		console.log(data);
		if (data.status.msg == "success") {

			//隐藏添加报表的弹出框
			//重新刷新报表列表 
			$("#bg").css('display','none');
			$("#tablediv").css('display','none');
			demand.start({url:'/api/config/report/list.json', data:{reportName:""},done:addBbSelect})

		};
	}
	
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
