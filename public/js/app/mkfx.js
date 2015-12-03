define(function(require) {
	var
		moment = require('moment'),
		selectpicker = require('bootstrap-select'),
		zh_cn = require('moment-zh-cn'),
		datapicker = require('bootstrap-datetimepicker.min'),
		jsonpPath = require('app/getJsonp'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines');

	(function() {
		var projectid = 1;
		var dateFlag = 1;
		var dateStar = '2015-09-01';

		var optionid = 10042;

		var optionid2 = 10042;

		// 选择框
		demand.start({
			url: '/api/moduleAnalysis/listOption.json',
			parameter: {
				id: '#cchpSel',
				idList: ['#cchpSel', '#cgtfSel', '#xntfSel', '#spSel']
			},
			data: {
				projectid: projectid,
			},
			done: dropDownList
		});

		function dropDownList(data, parameter) {
			$.each(parameter.idList, function(n, y) {
				parameter.id = y;

				var tmpRes;
				var res = new Array;
				var item = new Object;
				if (parameter.id == '#cchpSel') {
					tmpRes = data.status.data.CCHPlist;
				}
				if (parameter.id == '#cgtfSel') {
					tmpRes = data.status.data.CGlist;
				}
				if (parameter.id == '#xntfSel') {
					tmpRes = data.status.data.CNlist;
				}
				if (parameter.id == '#spSel') {
					tmpRes = data.status.data.CSlist;
				}
				$.each(tmpRes, function(i, v) {
					item = new Object;
					item.selName = v.classPropertyname;
					item.id = v.classPropertyid;
					res.push(item);
				});
				globalTools.selCallback(res, parameter);
			});
		}

		//根据输配模块的第一个下拉款选择的值，设置第二个下拉框
		function dropDownList_SP(id) {
			var tmpRes;
			if (id = '332') { //冷温
				tmpRes = data.status.data.SPlist.LW;
			}
			if (id = '333') { //冷却
				tmpRes = data.status.data.SPlist.LQ;
			}
			$.each(tmpRes, function(i, v) {
				item = new Object;
				item.selName = v.classPropertyname;
				item.id = v.classPropertyid;
				res.push(item);
			});
			//			parameter.id = "#spSel1";
			//			globalTools.selCallback(res, parameter);
		}

		// 选择框
		/*localJsonp.start({
			url: jsonpPath + 'mkfxSel1.js',
			parameter: {
				id: '#cchpSel'
			},
			jsonpCallback: 'mkfxSel1',
			done: globalTools.selCallback
		});
		localJsonp.start({
			url: jsonpPath + 'mkfxSel2.js',
			parameter: {
				id: '#cgtfSel'
			},
			jsonpCallback: 'mkfxSel2',
			done: globalTools.selCallback
		});
		localJsonp.start({
			url: jsonpPath + 'mkfxSel3.js',
			parameter: {
				id: '#xntfSel'
			},
			jsonpCallback: 'mkfxSel3',
			done: globalTools.selCallback
		});
		localJsonp.start({
			url: jsonpPath + 'mkfxSel4.js',
			parameter: {
				id: '#spSel'
			},
			jsonpCallback: 'mkfxSel4',
			done: globalTools.selCallback
		});*/

		$('.selectpicker').change(function() {
			var $this = $(this);
			var selected = $this.find('option:selected').attr('id');
			var charts = $this.parents('.my-card').find('.chart-box').attr('id');
			console.log(selected)

			//localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{charts:charts,fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb3',done:globalTools.selFn});
		});
		// 日月年
		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, localJsonp.start, setDate, globalTools, optionsLines);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function() {
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
			var jsonpName, dateFn;
			switch (id) {
				case 'mkfxCCHP':
					jsonpName = 'tbhb3';
					dateFn = globalTools.tbhbLines;
					break;
				case 'mkfxCgtf':
					jsonpName = 'tbhb4';
					dateFn = globalTools.tbhbLines;
					break;
				case 'mkfxXntf':
					jsonpName = 'tbhb5';
					dateFn = globalTools.tbhbLines;
					break;
				case 'mkfxSp':
					jsonpName = 'tbhb6';
					dateFn = globalTools.tbhbLines;
					break;
			}
			localJsonp.start({
				url: jsonpPath + jsonpName + '.js',
				parameter: {
					id: id,
					fn: dateFn,
					options: optionsLines
				},
				jsonpCallback: jsonpName,
				done: globalTools.tbhbCallback
			});
		});

		// 图表
		demand.start({
			url: '/api/moduleAnalysis/list1.json',
			parameter: {
				id: 'mkfxCCHP',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar,
				optionid: optionid
			},
			done: lineResult
		});

		demand.start({
			url: '/api/moduleAnalysis/list2.json',
			parameter: {
				id: 'mkfxCgtf',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar,
				optionid: optionid
			},
			done: lineResult
		});

		demand.start({
			url: '/api/moduleAnalysis/list3.json',
			parameter: {
				id: 'mkfxXntf',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar,
				optionid: optionid
			},
			done: lineResult
		});

		demand.start({
			url: '/api/moduleAnalysis/list4.json',
			parameter: {
				id: 'mkfxSp',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar,
				optionid1: optionid,
				optionid2: optionid2
			},
			done: lineResult
		});

		function lineResult(data, parameter) {
			var res = new Object;
			var tmp = data.status.data.list;
			if (tmp == undefined)
				return false;
			var xData = new Array;
			var yData = new Array;
			var sData = new Array;
			var yItem = new Object;
			for (var i = 0; i < tmp.length; i++) {
				xData.push(globalTools.dateFormterItem(parameter.dateFlag, tmp[i].recTime));
				yData.push(parseFloat(tmp[i].dataValue));
			}
			if (parameter.id == "mkfxCCHP") {
				yItem.name = "CCHP";
				yItem.data = yData;
			}
			if (parameter.id == "mkfxCgtf") {
				yItem.name = "常规";
				yItem.data = yData;
			}
			if (parameter.id == "mkfxXntf") {
				yItem.name = "蓄能";
				yItem.data = yData;
			}
			if (parameter.id == "mkfxSp") {
				yItem.name = "输配";
				yItem.data = yData;
			}
			sData.push(yItem);

			res.xData = xData;
			res.sData = sData;
			globalTools.tbhbCallback(res, parameter);
		}


		//		var chartLines;
		//		localJsonp.start({
		//			url: jsonpPath + 'tbhb3.js',
		//			parameter: {
		//				id: 'mkfxCCHP',
		//				fn: globalTools.tbhbLines,
		//				options: optionsLines
		//			},
		//			jsonpCallback: 'tbhb3',
		//			done: globalTools.tbhbCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'tbhb4.js',
		//			parameter: {
		//				id: 'mkfxCgtf',
		//				fn: globalTools.tbhbLines,
		//				options: optionsLines
		//			},
		//			jsonpCallback: 'tbhb4',
		//			done: globalTools.tbhbCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'tbhb5.js',
		//			parameter: {
		//				id: 'mkfxXntf',
		//				fn: globalTools.tbhbLines,
		//				options: optionsLines
		//			},
		//			jsonpCallback: 'tbhb5',
		//			done: globalTools.tbhbCallback
		//		});
		//		localJsonp.start({
		//			url: jsonpPath + 'tbhb6.js',
		//			parameter: {
		//				id: 'mkfxSp',
		//				fn: globalTools.tbhbLines,
		//				options: optionsLines
		//			},
		//			jsonpCallback: 'tbhb6',
		//			done: globalTools.tbhbCallback
		//		});

	}());
});