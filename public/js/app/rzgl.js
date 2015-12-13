define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		datapicker = require('bootstrap-datetimepicker.min'),
		api = require('app/getApi');
	$(function() {
		//下拉选择
		$('.selectpicker').selectpicker({});
		$('.btn_coin').on('click', function() {
			$('#gytModal').modal({
				backdrop: 'static'
			});
		});

		//时间控件
		$('.datetimepicker1').datetimepicker({
			format: 'YYYY-MM-DD',
			defaultDate: new Date()
		});



		//查询日志信息操作人的查询条件
		demand.start({
			url: '/api/logInfo/userList.json',
			done: rzglselecd
		})

		function rzglselecd(data) {
			var str = '<option id="0">所有人</option>';
			$.each(data.status.data.operators, function(i, v) {
				str += '<option id="' + v.userId + '">' + v.userShowName + '</option>';
			});
			$("#onepope").empty().append(str).selectpicker('refresh');
		}
	
		var userid = 0;
		var operatetype ;
		var type;
		
		$(document).on('change','#onepope',function(){
	         userid = $(this).find('option:selected').attr('id');
	     });
		$(document).on('change','#operatetype',function(){
	         operatetype = $(this).find('option:selected').attr('id');
	     });
	     $(document).on('change','#type',function(){
	         type = $(this).find('option:selected').attr('id');
	     });
	    
		//查询所有日志信息
		rzglInvis();
		
		//点击模糊查询 
		$("#rzSelectListBtn").on('click', function() {
			rzglInvis();
		})
		
		function rzglInvis(){
			var module = $.trim($("#module").val());
			var beginTime = $("#beginTime").val();
			var endTime = $("#endTime").val();
			var page = 1;
			var rows = 20;
			demand.start({
				url: '/api/logInfo/listCondition.json',
				data: {
					page: page,
					beginTime: beginTime,
					endTime: endTime,
					rows: rows,
					operatetype: operatetype,
					type: type,
					userid: userid,
					module: module
				},
				done: rzgl
			})
		}
		
		function rzgl(data) {
			console.log(data);
			var str = "";
			if (data.status.data.logs.datas == "") {
				str += '<tr>';
				str += '<td style="text-align:center" colspan="7">暂无数据</td>'
				str += '</tr>';
				$("#rzgl").empty().append(str);
				return;
			}
			$.each(data.status.data.logs.datas, function(i, v) {
				str += '<tr><td>' + v.usershowname + '</td><td>' + v.type + '</td><td>' + v.module + '</td><td>' + v.operatetype + '</td><td>' + v.userip + '</td><td>' + v.message + '</td><td>' + v.createdate + '</td></tr>';
			});
			$("#rzgl").empty().append(str);
		}











	});


});