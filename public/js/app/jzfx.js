define(function(require) {
	var
		moment = require('moment'),
		selectpicker = require('bootstrap-select'),
		datapicker = require('bootstrap-datetimepicker.min'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		projectid = require('app/checkProjectid'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		zh_cn = require('moment-zh-cn'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines');


	(function() {

		var dateFlag = 1;
		var dateStar = '2015-09-01';
		var oldDate; //防止重复
        // optionidTop  冷温水供水温度,optionidBottom 冷却水泵组  
        //var optionidTop = [468], optionidBottom = [358,10099];
        var optionsId
        var lwList = {}, lqList = {}, bottomLqList, bottomLwList, bottomDsLis;
        var tabId = 0;

		demand.start({
			url: '/api/deviceGroupInfo/listOption.json',
			parameter: {
				id: '#lqlwSel1',
				tabId: 0,
				idList: ['#lqlwSel1', '#bzyxfaSel1']
			},
			data: {
				projectid: projectid,
			},
			done: dropDownList
		});


		function dropDownList(data, parameter) {
        console.log(data);
//冷却水循环泵组
            bottomLqList = data.status.data.list3;
//冷温水循环泵组
            bottomLwList = data.status.data.list2;
//地/水源热泵机组
		    bottomDsLis = data.status.data.list1;

            lwList = data.status.data.LWlist;
            lqList = data.status.data.LQlist;
			$.each(parameter.idList, function(n, y) {
				parameter.id = y;

				var tmpRes;
				var res = new Array;
				var item = new Object;
				if (parameter.id == '#lqlwSel1') {
					if (parameter.tabId == 0) {
						tmpRes = data.status.data.LWlist;
                    }
					else {
						tmpRes = data.status.data.LQlist;
                    }
				}
				if (parameter.id == '#bzyxfaSel1') {
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
        //console.log(bottomLqList);
        //console.log(bottomLwList);
        //console.log(bottomDsLis);
            dropDownList_BZ(bottomLqList);
		}
        $('#jzfxTabs').children('li').on('click', function(){
            var $this = $(this);
            var flag = $this.data('flag');
            if(flag === 0){
                tabId = 0;
                formatSel(lwList, '#lqlwSel1');
            } else if(flag === 1) {
                tabId = 1;
                formatSel(lqList, '#lqlwSel1');
            } 
            globalTools.selectFn($this,'li');
        });
        function formatSel(list, selId) {
            var item = new Object;
			//var idList = ['#lqlwSel', '#bzyxfaSel1'];
            var parameter = {}; 
            var res = [];
            parameter.id = selId;
            $.each(list, function(i, v) {
                item = new Object;
                item.selName = v.classPropertyname;
                item.id = v.classPropertyid;
                res.push(item);
            });
            globalTools.selCallback(res, parameter);
        }

		// 选择框

		$('.selectpicker').change(function() {
			var $this = $(this);
            var boxId = $this.attr('id');
			var selected = $this.find('option:selected');

            var propertyid = selected.attr('id');

            var parents = $this.parents('.my-card');
			var charts = parents.find('.chart-box').attr('id');
            var url, config, selectOptions, othersId;
            dateStar = parents.find('.datetimepicker1').children('input').val();  
            dateFlag = setDate.getFlag();

            //if(tabId === 0) {
                ////optionidTop = [propertyid];     
            //} else if(tabId === 1) {
                ////dropDownList_BZ(bottomLqList);
            //}


//console.log(othersId);
//console.log(propertyid);

            switch (charts) {
                case 'nyzhlyl':
                    //optionidTop = [358,10099];
                    break;
                case 'jnl':
                    if (propertyid == '358') { //冷却水泵组
                        dropDownList_BZ(bottomLqList);
                        //optionidBottom = [358,10099];
                    }
                    if (propertyid == '353') { //冷温水循环泵组
                        dropDownList_BZ(bottomLwList);
                        //optionidBottom = [353,10087];
                    }
                    if (propertyid == '341') { //地/水源热泵机组
                        dropDownList_BZ(bottomDsLis);
                        //optionidBottom = [341,10161];
                    } 
                    break;
            }
            // get others options id after set drop down list
            othersId = $this.parent('li').siblings('li').find('select').find('option:selected').attr('id')
            // update options id 
            optionsId = [propertyid,othersId];
            //console.log(optionsId );
            config = getConf(charts);
            url = config[0];
            selectOptions = config[1]; 
            //console.log(selectOptions);
            builtCharts(url,charts,tabId,dateStar,dateFlag,selectOptions);

		});
		//根据泵组分析模块的第一个下拉款选择的值，设置第二个下拉框
		function dropDownList_BZ(list) {
        //接口冷却水ID错误
			var tmpRes = list,parameter = {}, res = [], vid;
			$.each(tmpRes, function(i, v) {
                vid = v.classPropertyid;
                if(vid == 10099 || vid == 10117  || vid == 10087 || vid == 10088 || vid == 10161 || vid == 10162) {
                    item = new Object;
                    item.selName = v.classPropertyname;
                    item.id = vid;
                    res.push(item);
                }
			});
            parameter.id = "#bzyxfaSel2";
            globalTools.selCallback(res, parameter);
		}


        
		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
            var url, dateOptionid, config;
            dateFlag = setDate.getFlag();

			//dateStar = ev.date.format('YYYY-MM-DD');

            switch(dateFlag) {
                case 1:
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY-MM-DD');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
                case 2: 
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY-MM');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
                case 3: 
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
            }

            config = getConf(id);
            url = config[0]; dateOptionid = config[1]; 
            // init date option id
            if(dateOptionid === undefined) {
                switch(id) {
                    case 'nyzhlyl':
                        dateOptionid = [470];
                        break;
                    case 'jnl':
                        dateOptionid = [358,10099];
                        break;
                }
            }
            console.log(dateOptionid );
            builtCharts(url,id,tabId,dateStar,dateFlag, dateOptionid);
		});

        function getConf(id) {
            var url, dateOptionid; 
            switch (id) {
                case 'nyzhlyl':
                    url = '/api/deviceGroupInfo/list1.json'; 
                    //dateOptionid = optionidTop ; 
                    dateOptionid = optionsId;
                    break;
                case 'jnl':
                    url = '/api/deviceGroupInfo/list2.json'; 
                    //dateOptionid = optionidBottom ; 
                    dateOptionid = optionsId;
                    break;
            }
            return [url,dateOptionid];
        }
        //var initConfig = [['/api/deviceGroupInfo/list1.json','nyzhlyl',[470]],['/api/deviceGroupInfo/list2.json','jnl',[372,10140]]];
        var initConfig = [['/api/deviceGroupInfo/list1.json','nyzhlyl',[470]],['/api/deviceGroupInfo/list2.json','jnl',[358,10099]]];

for(var i = 0, l = initConfig.length; i < l; i++) {
    for(var j = 0, k = 1; j < k; j++) {
        builtCharts(initConfig[i][j],initConfig[i][j+1],tabId,dateStar,dateFlag,initConfig[i][j+2]);
    }
}
		// 图表
function builtCharts(url, id,tabId,dateStar,dateFlag,optionid) {
    var o, o1,o2,oLength = optionid.length ;

    if(oLength === 1) {
        o = optionid[0];
    } else if(oLength === 2) {
        o1 = optionid[0];
        o2 = optionid[1];
    }

		demand.start({
            loadContainer: [['#'+id], 1],
			url: url,
			parameter: {
				id: id,
				tabId: tabId,
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStar,
				optionid: o ? o : null,
				optionid1: o1 ? o1 : null,
				optionid2: o2 ? o2 : null 
			},
			done: lineResult
		});
}


		function lineResult(data, parameter) {
			var res = new Object;
			var tmp = data.status.data.listX;
			var xData = new Array;
			for (var i = 0; i < tmp.length; i++) {
				xData.push(globalTools.dateFormterItem(parameter.dateFlag, tmp[i]));
			}

			if (xData == undefined)
				return false;
			var ytmp = data.status.data.listY;
			var yData = new Array;
			for (var i = 0; i < ytmp.length; i++) {
				yData.push(parseFloat(ytmp[i]));
			}

			var sData = new Array;
			var yItem = new Object;
			if (parameter.id == "nyzhlyl") {
				if (parameter.tabId == 0) {
					yItem.name = "冷温水情况";
					yItem.data = yData;
				} else {
					yItem.name = "冷却水情况";
					yItem.data = yData;
				}
			}
			if (parameter.id == "jnl") {
				yItem.name = "泵组";
				yItem.data = yData;
			}

			sData.push(yItem);

			res.xData = xData;
			res.sData = sData;
			globalTools.tbhbCallback(res, parameter);
		}




		/*var chartLines;
		localJsonp.start({
			url: jsonpPath + 'tbhb3.js',
			parameter: {
				id: 'nyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines
			},
			jsonpCallback: 'tbhb3',
			done: globalTools.tbhbCallback
		});
		localJsonp.start({
			url: jsonpPath + 'tbhb4.js',
			parameter: {
				id: 'jnl',
				fn: globalTools.tbhbLines,
				options: optionsLines
			},
			jsonpCallback: 'tbhb4',
			done: globalTools.tbhbCallback
		});*/

		//var l1, l2, l3, l4; 
		////下拉选择
		//$('.selectpicker').selectpicker({
		//});
		////日月年
		//$('#nyzhlylButton button').click(function(e){
		//e.preventDefault();
		//// OK, pretty ugly :)
		//var call = 'zoom' + $(this).attr('data-range');
		//// I have two globally accessible charts here:
		//if ($(this).attr('data-chart') == 'line') {
		//l1[call]();
		//} else {
		//candleChart[call]();
		//}
		//$(this).siblings('button').removeClass('active').end().addClass('active');
		//});

		//$('#jnlButton button').click(function(e){
		//e.preventDefault();
		//// OK, pretty ugly :)
		//var call = 'zoom' + $(this).attr('data-range');
		//// I have two globally accessible charts here:
		//if ($(this).attr('data-chart') == 'line') {
		//l2[call]();
		//} else {
		//candleChart[call]();
		//}
		//$(this).siblings('button').removeClass('active').end().addClass('active');
		//});
		//var nowDate = new Date();
		////时间控件
		//$('#nyzhlylDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#nyzhlylDate1','#nyzhlylDate2',l1)});
		//$('#nyzhlylDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#nyzhlylDate1','#nyzhlylDate2',l1)});
		//$('#jnlDate1').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#jnlDate1','#jnlDate2',l2)});
		//$('#jnlDate2').datetimepicker({format : "YYYY-MM-DD",defaultDate:nowDate}).on('change dp.change', function(e){ changeDate('#jnlDate1','#jnlDate2',l2)});

		//function changeDate(date1,date2,fn) {
		//var from = $(date1).data("DateTimePicker").date().format("YYYY-MM-DD");
		//var f = moment.utc(from);

		//var to = $(date2).data("DateTimePicker").date().format("YYYY-MM-DD");
		//var t = moment.utc(to);
		//fn['zoomWithDate'](f.valueOf(), t.valueOf());

		//}


		//localJsonp.start({url:jsonpPath+'stockData.js',jsonpCallback:'callback',done:showStock});
		//localJsonp.start({url:jsonpPath+'stockData2.js',jsonpCallback:'callback2',done:showStock2});
		//function showStock(data){
		//l1 = new Highcharts.StockChart({
		//chart: {
		//renderTo: 'nyzhlyl',
		//type: 'line',
		//},
		//yAxis: { // 基线
		//title: {
		//text: null 
		//},
		//plotLines: [{
		//value: 125,
		//width: 1,
		//zIndex: 2,
		//color: 'red'
		//}]
		//},
		//credits: {
		//enabled: false
		//},
		//exporting: {
		//enabled:false
		//},
		//series: [{
		//id: "data",
		//data: data
		//}],
		//rangeSelector: {
		//[> It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one<]
		//enabled: false
		//}
		//});
		//}
		//function showStock2(data){
		//l2 = new Highcharts.StockChart({
		//chart: {
		//renderTo: 'jnl',
		//type: 'line',
		//},
		//yAxis: { // 基线
		//title: {
		//text: null 
		//},
		//plotLines: [{
		//value: 125,
		//width: 1,
		//zIndex: 2,
		//color: 'red'
		//}]
		//},
		//exporting: {
		//enabled:false
		//},
		//credits: {
		//enabled: false
		//},
		//series: [{
		//id: "data",
		//data: data
		//}],
		//rangeSelector: {
		//[> It seems like you'd want to hide Highcharts' own rangeSelector since we're using a custom one<]
		//enabled: false
		//}
		//});
		//}

	}());
});
