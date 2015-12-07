define(function(require) {
	var
		moment = require('moment'),
		selectpicker = require('bootstrap-select'),
		zh_cn = require('moment-zh-cn'),
		datapicker = require('bootstrap-datetimepicker.min'),
		jsonpPath = require('app/getJsonp'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		projectid = require('app/checkProjectid'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines');

	(function() {
		var dateFlag = 1;

        var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间
        //var dateStar = '2015-09-01'; //初始化查询时间

        // optionid2中339为设备名，10107为属性值
		var optionid = [10065], optionid2 = [10107,339], optionid3 = [10077], optionid4 = [10082,332];

        var initConfig = [['/api/moduleAnalysis/list1.json','mkfxCCHP',[10065]],['/api/moduleAnalysis/list2.json','mkfxCgtf',[10107,339]],['/api/moduleAnalysis/list3.json','mkfxXntf',[10077]],['/api/moduleAnalysis/list4.json','mkfxSp',[10082,332]]];

        var cgtfList = [{classPropertyid:'10107',classPropertyname:'COP',instanceid:339,instancename:'电制冷机组'},{classPropertyid:'10109',classPropertyname:'热效率',instanceid:340,instancename:'锅炉机组'},{classPropertyid:'10108',classPropertyname:'COP',instanceid:361,instancename:'溴化锂机组'},{classPropertyid:'10110',classPropertyname:'COP',instanceid:341,instancename:'地/水源热泵机组'}]; 
        var spList = [];

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
        console.log(data)
			$.each(parameter.idList, function(n, y) {
				parameter.id = y;

				var tmpRes;
				var res = new Array;
				var item = new Object;
				if (parameter.id == '#cchpSel') {
					tmpRes = data.status.data.CCHPlist;
				}
				if (parameter.id == '#cgtfSel') {
                    tmpRes = cgtfList;
					//tmpRes = data.status.data.CGlist;
				}
				if (parameter.id == '#xntfSel') {
                    tmpRes = data.status.data.CNlist;
				}


				if (parameter.id == '#spSel') {
                    var csList = data.status.data.CSlist;
                    for(var j = 0, l = csList.length; j < l; j ++) {
                        var spObj = {instanceid:csList[j].classPropertyid,instancename :csList[j].classPropertyname};
                        $.each(data.status.data.SPlist,function(i,v){
                            if(v.classPropertyid == '10082' && csList[j].classPropertyid == '332' || v.classPropertyid == '10085' && csList[j].classPropertyid == '333') {
                                spObj.classPropertyid = v.classPropertyid; 
                                spObj.classPropertyname = v.classPropertyname; 
                            }
                        });

                       spList.push(spObj); 
                    }
                    spList.push({classPropertyid:'10204',classPropertyname:'冷却效率',instanceid:357,instancename:'冷却塔组'});
                    console.log(spList)
                    tmpRes = spList;
					//tmpRes = data.status.data.CSlist;
				}


				$.each(tmpRes, function(i, v) {
                    var id = v.classPropertyid;
                    if(id === '10065' || id === '10066' || id === '10280' || id === '10077' || id === '10078' || id === '10107' || id === '10109' || id === '10108' || id === '10110' || id === '10082' || id === '10085' || id === '10204') {
                        item = new Object;
                        item.selName = v.classPropertyname;
                        item.id = id;
                        item.instanceid = v.instanceid ? v.instanceid : undefined;
                        item.instancename = v.instancename ? v.instancename : undefined;
                        res.push(item);
                    }
				});
				globalTools.selCallback(res, parameter);
			});
		}

		//根据输配模块的第一个下拉款选择的值，设置第二个下拉框
		//function dropDownList_SP(id) {
			//var tmpRes;
			//if (id = '332') { //冷温
				//tmpRes = data.status.data.SPlist.LW;
			//}
			//if (id = '333') { //冷却
				//tmpRes = data.status.data.SPlist.LQ;
			//}
			//$.each(tmpRes, function(i, v) {
				//item = new Object;
				//item.selName = v.classPropertyname;
				//item.id = v.classPropertyid;
				//res.push(item);
			//});
			////			parameter.id = "#spSel1";
			////			globalTools.selCallback(res, parameter);
		//}

		// 选择框

		$('.selectpicker').change(function() {
			var $this = $(this);
			var selected = $this.find('option:selected');
            var instanceid = selected.attr('data-instanceid');
            var propertyid = selected.attr('id');
            var parents = $this.parents('.my-card');
			var charts = parents.find('.chart-box').attr('id');
            var url, config, selectOptions;
            dateStar = parents.find('.datetimepicker1').children('input').val();  
            dateFlag = setDate.getFlag();

            config = getConf(charts);
            url = config[0];

            switch (charts) {
                case 'mkfxCCHP':
                    optionid = [propertyid]; 
                    selectOptions = optionid; 
                    break;
                case 'mkfxCgtf':
                    optionid2 = [propertyid,instanceid]; 
                    selectOptions = optionid2; 
                    break;
                case 'mkfxXntf':
                    optionid3 = [propertyid]; 
                    selectOptions = optionid3; 
                    break;
                case 'mkfxSp':
                    optionid4 = [propertyid,instanceid]; 
                    selectOptions = optionid4; 
                    break;
            }

            builtCharts(url,charts,dateStar,dateFlag,selectOptions);
			//localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{charts:charts,fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb3',done:globalTools.selFn});
		});
		// 日月年
		//globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, localJsonp.start, setDate, globalTools, optionsLines);
		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
			dateStar = ev.date.format('YYYY-MM-DD');
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
            var url, dateOptionid, config;
            dateFlag = setDate.getFlag();
            config = getConf(id);
            url = config[0]; dateOptionid = config[1]; 
            builtCharts(url,id,dateStar,dateFlag, dateOptionid);
		});
        function getConf(id) {
            var url, dateOptionid; 
            switch (id) {
                case 'mkfxCCHP':
                    url = '/api/moduleAnalysis/list1.json'; 
                    dateOptionid = optionid; 
                    break;
                case 'mkfxCgtf':
                    url = '/api/moduleAnalysis/list2.json'; 
                    dateOptionid = optionid2; 
                    break;
                case 'mkfxXntf':
                    url = '/api/moduleAnalysis/list3.json'; 
                    dateOptionid = optionid3; 
                    break;
                case 'mkfxSp':
                    url = '/api/moduleAnalysis/list4.json'; 
                    dateOptionid = optionid4; 
                    break;
            }
            return [url,dateOptionid];
        }
for(var i = 0, l = initConfig.length; i < l; i++) {
    for(var j = 0, k = 1; j < k; j++) {
        builtCharts(initConfig[i][j],initConfig[i][j+1],dateStar,dateFlag,initConfig[i][j+2]);
    }
}
function builtCharts(url, id, dateStar,dateFlag,optionid) {
        var o = optionid[0], o2 = optionid[1];
		demand.start({
            loadContainer: [['#'+id], 1],
			url: url,
			parameter: {
				id: id,
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar,
				optionid: o,
				optionid2: o2
			},
			done: lineResult
		});
}
		// 图表

		function lineResult(data, parameter) {
			var res = new Object;
			var tmp = data.status.data.list  ? data.status.data.list : {};
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



	}());
});
