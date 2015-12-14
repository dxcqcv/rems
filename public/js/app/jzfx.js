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
		var dateFlag = 1;//1是日，2是月，3是年
		//var dateStar = '2015-09-01';
        var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间
		var oldDate; //防止重复
        // optionidTop  冷温水供水温度,optionidBottom 冷却水泵组  
        //var optionidTop = [468], optionidBottom = [358,10099];
        var optionsId;//optionId1,optionId2
        var lwList = {}, lqList = {};//无用
		var bottom358List, bottom353List, bottom341List;//缓存List
        var tabId = 0;//无用

		demand.start({
			url: '/api/deviceGroupInfo/listOption.json',
			parameter: {
				id: '#lqlwSel1',
				tabId: 0,
				idList: ['#lqlwSel1','#bzyxfaSel1']
			},
			data: {
				projectid: projectid,
			},
			done: dropDownList
		});


		function dropDownList(data, parameter) {

// //冷却水循环泵组
             bottom358List = data.status.data.list3;
// //冷温水循环泵组
             bottom353List = data.status.data.list2;
// //地/水源热泵机组
		     bottom341List = data.status.data.list1;

            cSlist = data.status.data.CSlist;
		
			$.each(parameter.idList, function(n, y) {
				parameter.id = y;

				var tmpRes;
				var res = new Array;
				var item = new Object;
				if (parameter.id == '#bzyxfaSel1' || parameter.id== '#lqlwSel1') {
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
			
            dropDownList_BZ(bottom358List,"#lqlwSel2");
			dropDownList_BZ(bottom358List,"#bzyxfaSel2");
		}
        // $('#jzfxTabs').children('li').on('click', function(){
            // var $this = $(this);
            // var flag = $this.data('flag');
            // if(flag === 0){
                // tabId = 0;
                // formatSel(lwList, '#lqlwSel1');
            // } else if(flag === 1) {
                // tabId = 1;
                // formatSel(lqList, '#lqlwSel1');
            // } 
            // globalTools.selectFn($this,'li');
        // });
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
			if(boxId=="lqlwSel1" || boxId=="lqlwSel2")
			{
				dateFlag = $("#nyzhlylButton button[class='btn btn-default active']").attr("datanum");
			}
			if(boxId=="bzyxfaSel1" || boxId=="bzyxfaSel2")
			{
				dateFlag = $("#jnlButton button[class='btn btn-default active']").attr("datanum");
			}
            //dateFlag = setDate.getFlag();
            //if(tabId === 0) {
                ////optionidTop = [propertyid];     
            //} else if(tabId === 1) {
                ////dropDownList_BZ(bottomLqList);
            //}

		
//console.log(othersId);
//console.log(propertyid);

            switch (charts) {
                case 'nyzhlyl':
					dropDownList_BZ_Change(propertyid,bottom358List,bottom353List,bottom341List,"#lqlwSel2");
                    break;
                case 'jnl':
					dropDownList_BZ_Change(propertyid,bottom358List,bottom353List,bottom341List,"#bzyxfaSel2");
                    break;
            }
			
            // get others options id after set drop down list
            othersId = $this.find('option:selected').attr('id')
            // update options id 
            //optionsId = [propertyid,othersId];
			var str1="",str2="";
			
			if($this.attr("id")=="lqlwSel2")
			{
				str1=$("#lqlwSel1 option:selected").attr("id");
				str2=othersId;
			}
			else if($this.attr("id")=="lqlwSel1")
			{
				str1=othersId;
				str2=$("#lqlwSel2 option:selected").attr("id");
			}
			else if($this.attr("id")=="bzyxfaSel1")
			{
				str1=othersId;
				str2=$("#bzyxfaSel2 option:selected").attr("id");
			}
			else if($this.attr("id")=="bzyxfaSel2")
			{
				str1=$("#lqlwSel1 option:selected").attr("id");
				str2=othersId;
			}
			
			optionsId = [str1,str2];
            //console.log(optionsId );
            config = getConf(charts);
            url = config[0];
            selectOptions = config[1]; 
            //console.log(selectOptions);
            builtCharts(url,charts,tabId,dateStar,dateFlag,selectOptions);

		});
		
		//根据第一个下拉框的值变动第二个下拉框值
		function dropDownList_BZ_Change(propertyid,bottom358List,bottom353List,bottom341List,idStr)
		{

			var tmpRes,parameter = {}, res = [], vid;
			//第一行第二个下下拉框变化
			if(idStr=="#lqlwSel2" && propertyid=="358")
			{
				tmpRes=bottom358List;
				$.each(tmpRes, function(i, v) {
					 vid = v.classPropertyid;
					if(vid=="10344" || vid=="10346" || vid=="10347")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				});
			}
			if(idStr=="#lqlwSel2" && propertyid=="353")
			{
				tmpRes=bottom353List;
				$.each(tmpRes, function(i, v) {
					 vid = v.classPropertyid;
					if(vid=="10334" || vid=="10341" || vid=="10342")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				});
			}
			if(idStr=="#lqlwSel2" && propertyid=="341")
			{
				tmpRes=bottom341List;
				$.each(tmpRes, function(i, v) {
					 vid = v.classPropertyid;
					if(vid=="10350" || vid=="10351" || vid=="10352")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				});
			}
			
			//第二行第二个下下拉框变化
			if(idStr=="#bzyxfaSel2" && propertyid=="358")
			{
				tmpRes=bottom358List;
				$.each(tmpRes, function(i, v) {
					 vid = v.classPropertyid;
					if(vid=="10099" || vid=="10117")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				});
			}
			if(idStr=="#bzyxfaSel2" && propertyid=="353")
			{
				tmpRes=bottom353List;
				$.each(tmpRes, function(i, v) {
					 vid = v.classPropertyid;
					if(vid=="10087" || vid=="10088")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				});
			}
			if(idStr=="#bzyxfaSel2" && propertyid=="341")
			{
				tmpRes=bottom341List;
				$.each(tmpRes, function(i, v) {
					 vid = v.classPropertyid;
					if(vid=="10161" || vid=="10162")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				});
			}
			parameter.id = idStr;
			if(res.length==0)
			{
				item = new Object;
				item.selName = "----请选择---";
				item.id = "";
				res.push(item);
			}
			else
			{
				var tempArr=new Array;
				var resultArr=new Array;
				$.each(res,function(i,item){
					tempArr.push(item.id);
				});
				$.unique(tempArr);
				for(var i=0;i<tempArr.length;i++)
				{
					var obj=new Object;
					for(var j=0;j<res.length;j++)
					{
						if(tempArr[i]==res[j].id)
						{
							obj.id=tempArr[i];
							obj.selName=res[j].selName;
							resultArr.push(obj);
							break;	
						}

					}
					
				}
				globalTools.selCallback(resultArr, parameter);
			}
            
		}
	
	
		
		//根据泵组分析模块的第一个下拉款选择的值，设置第二个下拉框
		function dropDownList_BZ(list,idStr) {
        //接口冷却水ID错误
			var tmpRes = list,parameter = {}, res = [], vid;
			$.each(tmpRes, function(i, v) {
                vid = v.classPropertyid;
				
				if(idStr=="#lqlwSel2")
				{
					if(vid=="10344" || vid=="10346" || vid=="10347")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				}
				if(idStr=="#bzyxfaSel2")
				{
					if(vid=="10099" || vid=="10117")
					{
						item = new Object;
						item.selName = v.classPropertyname;
						item.id = vid;
						res.push(item);
					}
				}
			});
            parameter.id = idStr;
            globalTools.selCallback(res, parameter);
		}


        
		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//时间空间
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
			
			var id = $(this).parents('.my-card').find('.chart-box').attr('id');
            var url, dateOptionid, config;
            dateFlag = setDate.getFlag();

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
						var arr1=new Array;
						arr1.push($("#lqlwSel1 option:selected").attr("id"));
						arr1.push($("#lqlwSel2 option:selected").attr("id"));
                        dateOptionid = arr1;
                        break;
                    case 'jnl':
						var arr2=new Array;
						arr2.push($("#bzyxfaSel1 option:selected").attr("id"));
						arr2.push($("#bzyxfaSel2 option:selected").attr("id"));
                        dateOptionid = arr2;
                        break;
                }
            }
            builtCharts(url,id,tabId,dateStar,dateFlag, dateOptionid);
		});

        function getConf(id) {
            var url, dateOptionid; 
            switch (id) {
                case 'nyzhlyl':
                    url = '/api/deviceGroupInfo/list2.json'; 
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
		//358,10348,10087,10348
		//341,10160
        //var initConfig = [['/api/deviceGroupInfo/list1.json','nyzhlyl',[470]],['/api/deviceGroupInfo/list2.json','jnl',[372,10140]]];
        var initConfig = [['/api/deviceGroupInfo/list2.json','nyzhlyl',[353,10334]],['/api/deviceGroupInfo/list2.json','jnl',[353,10087]]];

//初始化事件
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
			if(data.status.data=="")
			{
				res.xData = [];
				res.sData = [];
				globalTools.tbhbCallback(res, parameter);
			}
			else
			{
			
				var tmp=data.status.data.list;
				
				var xData = new Array;
				
				var sData = new Array;
				$.each(tmp,function(i,item){
					xData.push(globalTools.dateFormterItem(parameter.dateFlag, item.recTime));
				});
				
				var yData = new Array;
				
				var classinstanceidArr=[];
				//var classinstanceidNameArr=[];
				$.each(tmp,function(i,item){
					classinstanceidArr.push(item.classinstanceid);
				});
				// $.each(tmp,function(i,item){
					// classinstanceidNameArr.push(item.classinstancename);
				// });
		
				$.unique(classinstanceidArr);
				
				//$.unique(classinstanceidNameArr);
				for(var i=0;i<classinstanceidArr.length;i++)
				{
					var yItem = new Object;
					var yData = new Array;
					for(var j=0;j<tmp.length;j++)
					{
						if(classinstanceidArr[i]==tmp[j].classinstanceid)
						{
							yData.push(parseFloat(tmp[j].dataValue));
						}	
					}
					for(var j=0;j<tmp.length;j++)
					{
						if(classinstanceidArr[i]==tmp[j].classinstanceid)
						{
							yItem.name=tmp[j].classinstancename;
							break;
						}	
					}
					
					yItem.data=yData;
					
					sData.push(yItem);
				}
				
				// yItem.name="冷温水循环泵组";
				// yItem.data=yData;
				
				
				// sData.push(yItem);
				
				
				
				// console.log("显示4444");
				// console.log(tmp);
				// var tmp = data.status.data.listX;
				// var xData = new Array;
				// for (var i = 0; i < tmp.length; i++) {
					// xData.push(globalTools.dateFormterItem(parameter.dateFlag, tmp[i]));
				// }

				// if (xData == undefined)
					// return false;
				// var ytmp = data.status.data.listY;
				// var yData = new Array;
				// for (var i = 0; i < ytmp.length; i++) {
					// yData.push(parseFloat(ytmp[i]));
				// }

				// var sData = new Array;
				// var yItem = new Object;
				// if (parameter.id == "nyzhlyl") {
					// if (parameter.tabId == 0) {
						// yItem.name = "冷温水情况";
						// yItem.data = yData;
					// } else {
						// yItem.name = "冷却水情况";
						// yItem.data = yData;
					// }
				// }
				// if (parameter.id == "jnl") {
					// yItem.name = "泵组";
					// yItem.data = yData;
				// }

				// sData.push(yItem);
				res.xData = globalTools.uniq(xData);
				res.sData = sData;
				globalTools.tbhbCallback(res, parameter);
			}
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
