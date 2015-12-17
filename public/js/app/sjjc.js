define(function(require) {
	var $ = require('jquery'),
		exporting = require('exporting'),
		selectpicker = require('bootstrap-select'),
		zh_cn = require('moment-zh-cn'),
		moment = require('moment'),
		datapicker = require('bootstrap-datetimepicker.min'),
		bootstrap = require('bootstrap'),
		globalTools = require('app/globalTools'),
		options = require('app/highchartsConfig'),
		projectid = require('app/checkProjectid'),
		api = require('app/getApi'),
		optionsBase = require('app/highchartsConfigBase'),
		optionsLines = require('app/highchartsConfigLines'),
		datetimepickerObj = require('app/dateObj');

	$(function(){
	   $(".btn_coin").mouseover(function(e) {
		   alert(4)
        $(this).css("background", "url(../img/sjjc/uikj.png) no-repeat left center");
    });
	  })		

	(function() {

		var dateSta = moment().format('YYYY-MM-DD');
		//下拉选择
		$('#classTypeList').selectpicker({});

		//hover 控制
//		$("#table1 tbody tr span img").hover(function(){
//		    		$(this).attr("src","/img/sjjc/uikj.png");
//		    	},
//		    	function(){
//		    		$(this).attr("src","/img/sjjc/uill.png");
//		    		
//		    	});


		var selectedCategorytype = 0;
		var ltftInstanceid = 2;

		var classArr = new Array;
		var classinstanceArr = new Array;

		//查询所有的设备类数据
		demand.start({
			url: '/api/clzMng/list.json',
			done: function(data) {
				classArr = data.status.data.classList;
			}
		});

		//查询项目下的所有设备实例数据
		demand.start({
			url: '/api/datamonitor/leftInfo.json',
			data: {
				projectid: projectid,
				classid: 0
			},
			done: function(data) {
				classinstanceArr = data.status.data.list;
				leftinfoSet(classinstanceArr);
			}
		});

		//工艺级别改变时，取得ID
		$('#classTypeList').change(function() {
			selectedCategorytype = $(this).find('option:selected').attr('id');
			resultSet(selectedCategorytype);
		});

		//根据选择的工艺级别，对设备实例信息进行筛选
		function resultSet(category) {
			if (category == 0) { //所有
				leftinfoSet(classinstanceArr);
			} else {
				var resultArr = new Array;

				var classIdArr = new Array;
				$.each(classArr, function(i, x) {
					if (parseFloat(category) == x.categorytype) {
						classIdArr.push(x);
					}
				});
				$.each(classIdArr, function(x, y) {
					$.each(classinstanceArr, function(m, n) {
						if (y.classid == n.classid) {
							resultArr.push(n);
						}
					});
				});
				leftinfoSet(resultArr);
			}
		}

		//根据查询的结果，生成页面数据
		function leftinfoSet(dataArr) {
			$('#classInstanceList').empty();
			$.each(dataArr, function(i, v) {
				var oneLi = '<li class="classinstance" classid=' + v.classid + ' id=' + v.classinstanceid + '>' + v.classinstancename + '</li>';
				$('#classInstanceList').append(oneLi);
			});
		}

		//选择设备实例，查询设备实例的属性信息
		$(document).on('click', '.classinstance', function() {
			var classinstanceid = $(this).attr("id");
			var classinstancename = $(this).text();
			var classid = $(this).attr("classid");

			ltftInstanceid = classinstanceid;

			$(this).css("background-color", "#3498db").css("color", "white").css("border-radius", "5px");
			$(this).siblings().css("background-color", "").css("color", "black");

			demand.start({
				url: '/api/datamonitor/value.json',
				data: {
					projectid: projectid,
					instanceid: classinstanceid
				},
				done: function(data) {
					rightInfoSet(classid, data.status.data, classinstancename);
				}
			});
		});
		function f1(obj)
			{
				alert("a");
			}
			function f2(obj)
			{
				alert("b");
			}
		//根据查询的结果，生成页面
		function rightInfoSet(classid, data, classinstancename) {
			$('#tbyDynamicProperty').empty();
			$('#tbyStaticProperty').empty();

			$('#DynamicTitle').text(classinstancename);
			$('#StaticTitle').text(classinstancename);
			
	
			//动态属性
			$.each(data.lists, function(i, v) {


				var oneTr = "";
				if (parseFloat(v.datavalue1) > 0) {
					oneTr += '<tr class="row"> <td>' + v.propertyname + '<span class="btn_coin" id=' + v.propertyid + ' name=' + v.propertyname + '></span></td > <td> ' + v.datavalue1 + v.unitname + '</td></tr>';
				} else {
					oneTr += '<tr class="row"> <td>' + v.propertyname + '</td> <td>' + v.datavalue1 + v.unitname + '</td></tr>';
				}
				$('#tbyDynamicProperty').append(oneTr);
			});
			

			
			//静态属性
			if (classid == 2) { //能源涨级别的静态数据
				var v = data.infos[0];
				var item = data.design;
				var oneTr = "";
				oneTr += '<tr class="row"><td>项目类型</td> <td>' + v.industryclassname + '</td></tr>';
				oneTr += '<tr class="row"><td>供冷期</td> <td>' + v.coldingstart + "--" + v.coldingend + '</td></tr>';
				oneTr += '<tr class="row"><td>供热期</td> <td>' + v.heatingstart + "--" + v.heatingend + '</td></tr>';
				oneTr += '<tr class="row"><td>所属行业</td> <td>' + v.industrytypename + '</td></tr>';
				oneTr += '<tr class="row"><td>投资单位</td> <td>' + v.investcompany + '</td></tr>';
				oneTr += '<tr class="row"><td>商业模式</td> <td>' + v.businesstypename + '</td></tr>';
				oneTr += '<tr class="row"><td>设计单位</td> <td>' + v.designcompany + '</td></tr>';
				oneTr += '<tr class="row"><td>运营商</td> <td>' + v.carrieroperator + '</td></tr>';
				oneTr += '<tr class="row"><td>项目地址</td> <td>' + v.address + '</td></tr>';
				oneTr += '<tr class="row"><td>供能/建设</td> <td>' + v.supplyarea + "㎡/" + v.buildingarea + '㎡</td></tr>';
				oneTr += '<tr class="row"><td>建筑单位</td> <td>' + v.buildcompany1 + '</td></tr>';

				$.each(item, function(i, m) {
					oneTr += '<tr class="row"><td>' + m.conitemname + '</td> <td>' + m.loadvalue + m.unitname + '</td></tr>';
				});
				$('#tbyStaticProperty').append(oneTr);
			} else {
				var staticData = data.staticLists;

				$.each(staticData, function(i, v) {
					var oneTr = '<tr class="row"> <td>' + v.propertyname + '</td> <td>' + v.datavalue1 + '</td></tr>';
					$('#tbyStaticProperty').append(oneTr);
				});
			}
		}

		//点击图标，显示曲线图
		$(document).on('click', '.btn_coin', function() {
			var propertyId = $(this).attr("id");
			var propertyName = $(this).attr("name");
			$('#gytModal').modal({
				backdrop: 'static'
			});
			demand.start({
				url: '/api/datamonitor/lineValue.json',
				parameter: {
					id: 'sjjcCharts',
					fn: globalTools.tbhbLines,
					options: optionsLines,
					self: globalTools,
					name: propertyName
				},
				data: {
					instanceid: ltftInstanceid,
					propertyid: propertyId,
					dateSta: dateSta
				},
				done: formatZbLines
			});
		});

		//解析数据，变成HighChar识别的数据格式
		function formatZbLines(data, parameter) {
			var result = data.status.data.list;
			var tmp = {};
			var sData1 = [];
			var yItem = {};
			yItem.name = parameter.name;
			yItem.data = [];

			var tmpX = new Array;
			$.each(result, function(i, v) {
				tmpX.push(v.rectime);
				yItem.data.push(v.datavalue);
			});

			tmp.xData = globalTools.dateFormater(1, tmpX);
			sData1.push(yItem)
			tmp.sData = sData1;
			globalTools.tbhbCallback(tmp, parameter);
		}


	}());

});
