define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		api = require('app/getApi');

	var tmp;

	//		编辑
	$(document).on('click', '.dd', function() {
		$("#currentClasspropertyid").val($(this).attr("data-classpropertyid"));
		$("#bg").css('display', 'block');
		$("#tablediv").css('display', 'block');
	});
	$("#closediv").click(function() {
		$("#tablediv").css('display', 'none');
		$("#bg").css('display', 'none');
	});
	$("#colse").click(function() {
		$("#tablediv").css('display', 'none');
		$("#bg").css('display', 'none');
	});
	$("#saveEditBtn").click(function() {
		var currentClasspropertyid = $("#currentClasspropertyid").val();
		var txtinput = $("#txtinput").val();
		$(".lsx_tr_" + currentClasspropertyid).find('td').eq(1).empty().append(txtinput);
		$("#tablediv").hide();
		$("#bg").hide();
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
			var currentClasspropertyid = $(this).attr("data-classpropertyid");
			var txtinput = $("#txtinput").val();
			$(".lsx_tr_" + num).remove();
			$("#bg1").hide();
			$("#coliseselect").hide();
		});

	});

	//新增
	$(function() {
		$(document).on("click", "#btnadd", function() {
			document.getElementById("saveEditBtn").innerHtml = "添加";
			$("#bg").css('display', 'block');
			$("#tablediv").css('display', 'block');
			demand.start({
				url: '/api/clzMng/addInput.json',
				done: pageInfoSet
			});
		});

		$("#closediv").click(function() {
			$("#bg1").hide();
			$("#coliseselect").hide();
		});

		$("#saveEditBtn").click(function() {
			var selected = $('#editrow').find('option:selected').attr('id');
			//			var selected1 = $('#editrow').find('option:selected').text();

			console.log(selected);
		});

	});

	//在打开新增页面的时候，对页面中的控件进行赋值。
	function pageInfoSet(data) {
		var result = data.status.data;
		tmp = result;
		var str;
		$.each(result.parentlist, function(i, v) {
			str += '<option id="' + v.classid + '">' + v.classname + '</option>'
		});
		$("#edittype").empty().append(str).selectpicker('refresh');

		str = "";
		$.each(result.formatList, function(i, v) {
			str += '<option id="' + v.formatid + '">' + v.formatname + '</option>'
		});
		$("#editpane").empty().append(str).selectpicker('refresh');

		str = "";
		$.each(result.categoryTypes, function(i, v) {
			str += '<option id="' + v.categoryTypeid + '" data-parentid="' + v.parentid + '">' + v.categoryTypename + '</option>'
		});
		$("#editrow").empty().append(str).selectpicker('refresh');
	}

	//工艺级别改变的时候，工艺上级的下拉框的值重新赋值，主系统没有工艺上级
	$('#editrow').change(function() {
		var $this = $(this);
		var selected = $this.find('option:selected');
		var seId = selected.attr('data-parentid');
		if (seId == -1) {
			str = "";
			str += '<option id="' + 0 + '">' + "无" +
				'</option>'
			$("#sditlei").empty().append(str).selectpicker('refresh');
			return;
		}
		str = "";
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
		console.log(data);
		var str;
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