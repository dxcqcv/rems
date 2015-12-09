define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		h_cn = require('moment-zh-cn'),
		api = require('app/getApi');

	var tmp;

	//查看数据---条件查询
	$(function() {
		$(document).on("click", "#btnSeach", function() {
			var clzName = $("#input1").val();
			console.log(clzName);
			//条件查询数据查询(调用接口)
			demand.start({
				url: '/api/clzMng/list.json',
				data: {
					clzName: clzName
				},
				done: bzlgl
			});
		});
	});

	//新增
	$(function() {
		$(document).on("click", "#btnadd", function() {
			$("#saveFlag").val(0);

			document.getElementById("saveEditBtn").innerHtml = "添加";
			$("#bg").css('display', 'block');
			$("#tablediv").css('display', 'block');

			//打开弹出框的时候进行数据查询(调用接口)
			demand.start({
				url: '/api/clzMng/addInput.json',
				done: pageInfoSet
			});
		});

	});

	//		编辑
	$(document).on('click', '.dd', function() {
		$("#saveFlag").val(1);
		$("#classid").val($(this).attr("data-classpropertyid"));
		var classid = $(this).attr("data-classpropertyid");
		$("#bg").css('display', 'block');
		$("#tablediv").css('display', 'block');

		//编辑的时候进行数据查询(调用接口)
		demand.start({
			url: '/api/clzMng/updateInput.json',
			data: {
				classid: classid
			},
			done: pageInfoSet
		});
	});

	//关闭按钮
	$("#closediv").click(function() {
		$("#tablediv").css('display', 'none');
		$("#bg").css('display', 'none');
	});

	//右上角关闭图标
	$("#colse").click(function() {
		$("#tablediv").css('display', 'none');
		$("#bg").css('display', 'none');
	});

	//点击保存按钮
	$("#saveEditBtn").click(function() {

		var sl = $("#saveFlag").val();
		var classid = $("#classid").val();

		var classname = $('#txtinput').val();
		var edittype = $('#edittype').find('option:selected').attr('id');
		var editpane = $('#editpane').find('option:selected').attr('id');
		var editrow = $('#editrow').find('option:selected').attr('id');
		var sditlei = $('#sditlei').find('option:selected').attr('id');
		var edietimg = $('#edietimg').val();
		var edittxet = $('#edittxet').val();

		//		console.log(classname + "**" + edittype + "**" + editpane + "**" + editrow + "**" + sditlei + "**" + edietimg + "**" + edittxet);

		if (classname == "") {
			alert("请输入类名称！");
			return false;
		} else if (edittype == -1 || editpane == -1 || editrow == -1 || sditlei == -1) {
			alert("请选择下拉框中的值！");
			return false;
		}

		//新增
		if (sl == 0) {
			demand.start({
				url: '/api/clzMng/add.json',
				data: {
					classname: classname,
					parentclassid: edittype,
					classtypeid: editpane,
					categoryType: editrow, //设备级别 （工艺系统） 2015-11-17 16:26:14
					superiorid: sditlei, //上级设备 （工艺系统）
					picturepath: edietimg,
					remarks: edittxet
				},
				done: function(data) {
					if (data.standardClass.classid > 0) {
						$("#tablediv").hide();
						$("#bg").hide();
						alert("添加成功！");
						demand.start({
							url: '/api/clzMng/page.json',
							done: bzlgl
						})
					} else {
						alert("添加失败！");
					}
				}
			});
		} else { //编辑
			demand.start({
				url: '/api/clzMng/update.json',
				data: {
					classid: classid,
					classname: classname,
					parentclassid: edittype,
					classtypeid: editpane,
					categoryType: editrow, //设备级别 （工艺系统） 2015-11-17 16:26:14
					superiorid: sditlei, //上级设备 （工艺系统）
					picturepath: edietimg,
					remarks: edittxet
				},
				done: function(data) {
					if (data.status.data == "true") {
						$("#tablediv").hide();
						$("#bg").hide();
						alert("修改成功！");
						demand.start({
							url: '/api/clzMng/page.json',
							done: bzlgl
						})
					} else {
						alert("修改失败！");
					}
				}
			});
		}

		//		var currentClasspropertyid = $("#currentClasspropertyid").val();
		//		var txtinput = $("#txtinput").val();
		//		$(".lsx_tr_" + currentClasspropertyid).find('td').eq(1).empty().append(txtinput);
		//		$("#tablediv").hide();
		//		$("#bg").hide();


		//			var classname = $('#txtinput').val();
		//
		//			var selected = $('#editrow').find('option:selected').attr('id');
		//			//			var selected1 = $('#editrow').find('option:selected').text();
		//
		//			console.log(classname);
		//			if (classname == "") {
		//				alert("请输入类名称！");
		//			}
	});

	//	删除
	$(function() {
		var num;
		$(document).on("click", ".slcolds", function() {
			num = $(this).attr("data-classpropertyid");
			$("#bg1").show();
			$("#coliseselect").show();
		});

		$("#closedivsel").click(function() {
			$("#bg1").hide();
			$("#coliseselect").hide();
		});

		$("#btnTrue").click(function() {
			var classid = $(this).attr("data-classpropertyid");

			//删除
			demand.start({
				url: '/api/clzMng/delete.json',
				data: {
					classid: classid
				},
				done: function(data) {
					if (data.status.data == "true") {
						$("#tablediv").hide();
						$("#bg").hide();
						alert("删除成功！");
						demand.start({
							url: '/api/clzMng/page.json',
							done: bzlgl
						})
					} else {
						alert("删除失败！");
					}
				}
			});

			$(".lsx_tr_" + num).remove();
			$("#bg1").hide();
			$("#coliseselect").hide();
		});
	});


	//在打开弹出页面的时候，对页面中的控件进行赋值。（添加与修改共用一个弹出页面）
	function pageInfoSet(data) {
		var result = data.status.data;
		tmp = result;

		var flag = $("#saveFlag").val();

		if (flag == 1) { //修改的时候把查询的值设置在弹出框中
			$('#txtinput').val(result.classObj.classname);
			$('#edietimg').val(result.classObj.picturepath);
			$('#edittxet').val(result.classObj.remarks);
		}

		var str = '<option id="-1">---请选择---</option>';
		$.each(result.parentlist, function(i, v) {
			var selectedtmp = '';
			if (flag == 1 && result.classObj.parentclassid == v.classid) {
				selectedtmp = 'selected';
			}
			str += '<option id="' + v.classid + '"' + selectedtmp + '>' + v.classname + '</option>'
		});
		$("#edittype").empty().append(str).selectpicker('refresh');

		str = '<option id="-1">---请选择---</option>';
		$.each(result.formatList, function(i, v) {
			var selectedtmp = '';
			if (flag == 1 && result.classObj.classtypeid == v.formatid) {
				selectedtmp = 'selected';
			}
			str += '<option id="' + v.formatid + '"' + selectedtmp + '>' + v.formatname + '</option>'
		});
		$("#editpane").empty().append(str).selectpicker('refresh');

		str = '<option id="-1">---请选择---</option>';
		$.each(result.categoryTypes, function(i, v) {
			var selectedtmp = '';
			if (flag == 1 && v.categoryTypeid == result.classObj.categoryType) {
				selectedtmp = 'selected';
			}
			str += '<option id="' + v.categoryTypeid + '" data-parentid="' + v.parentid + '"' + selectedtmp + '>' + v.categoryTypename + '</option>'
		});
		$("#editrow").empty().append(str).selectpicker('refresh');


		str = '<option id="-1">---请选择---</option>';
		if (flag == 1) {
			$.each(result.superiors, function(i, v) {
				var selectedtmp = '';
				if (v.classid == result.classObj.superiorid) {
					selectedtmp = 'selected';
				}
				str += '<option id="' + v.classid + '"' + selectedtmp + '>' + v.classname + '</option>'
			});
		}
		$("#sditlei").empty().append(str).selectpicker('refresh');
	}

	//工艺级别改变的时候，工艺上级的下拉框的值重新赋值，主系统没有工艺上级
	$('#editrow').change(function() {
		var $this = $(this);
		var selected = $this.find('option:selected');
		var seId = selected.attr('data-parentid');
		if (seId == -1) {
			str = "";
			str += '<option id="' + 0 + '">' + "无上级" +
				'</option>'
			$("#sditlei").empty().append(str).selectpicker('refresh');
			return;
		}
		str = '<option id="-1">---请选择---</option>';
		$.each(tmp.superiors, function(i, v) {
			if (v.categoryType == seId) {
				str += '<option id="' + v.classid + '">' + v.classname + '</option>'
			}
		});
		$("#sditlei").empty().append(str).selectpicker('refresh');
	});


	demand.start({
		url: '/api/clzMng/page.json',
		done: bzlgl
	})

	function bzlgl(data) {
		var str = "";
		$.each(data.status.data.classList, function(i, v) {
			str += '<tr class="lsx_tr_' + v.classid + '">'
			str += '<td>' + (i + 1) + '</td>'
			str += '<td class=""name>' + v.classname + '</td>'
			str += '<td class="parname">' + v.parentclassname + '</td>'
			str += '<td class="fonrname">' + v.formatname + '</td>'
			str += '<td class="ingname"><img src="/img/lsxgl/write.png"/></td>'
			str += '<td><img class="dd" data-classpropertyid="' + v.classid + '" src="/img/lsxgl/write.png"/><img class="slcolds"  data-classpropertyid="' + v.classid + '"  src="/img/lsxgl/sz.png"/></td>'
			str += '</tr>'
		});
		$("#bzldl_tab").empty().append(str);
	}
});