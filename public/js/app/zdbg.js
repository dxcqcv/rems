define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		zh_cn = require('moment-zh-cn'),
		highcharts = require('app/card'),
		moment = require('moment'),
		globalTools = require('app/globalTools'),
		setDate = require('app/setDate'),
		projectid = require('app/checkProjectid'),
		//datetimepickerObj = require('app/dateObj'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines'),
		optionsLabel = require('app/highchartsConfigLabel'),
		optionsPie = require('app/highchartsConfigPie'),

		datapicker = require('bootstrap-datetimepicker.min')
      ;
    (function() {
      //下拉框默认值
       //var zdbgStr = '', zdbgProjectSel = $('#zdbgProjectSel') ;
       //console.log(12121)
       //console.log(projectid)
       //switch(projectid) {
         //case 1:
             //zdbgProjectSel.val(1);
             //break; 
         //case 3:
             //zdbgProjectSel.val(3);
             //break; 
       //}

	$("#subTitleNav").text("");
	
    //var pid = projectid;
    var zdbgStart = $('#zdbgStart'), zdbgEnd = $('#zdbgEnd');
    var loadConfig = [['#zdbg'], 0];
    var lineCost,lineCostSeries,linesSeries ;

    var m = moment().format('M'), groupType;//季节判断
    var dateStar = moment().format('YYYY-MM-DD'),dateEnd = moment().day(-1).format('YYYY-MM-DD');
    var res,parameter;
    var lineCost;
       var datetimepickerObjZdbg = {
            format: 'YYYY-MM-DD',
            locale: 'zh-cn'
       };
	   
//加载项目下拉框
demand.start({
	url: '/api/dxReport/listProjects.json',
	data: {
		projectid: projectid
	},
	done: getProjectAll 
});

//项目下拉框回调
function getProjectAll(data)
{
	if(data.status.data!="")
	{
		var res=[],parameter={};
		var proList=data.status.data.list;
		$.each(proList,function(i,item){
			var itemC = new Object;
			itemC.id = item.projectid;
			itemC.selName = item.projectname;
			res.push(itemC);
		});
		parameter.id="#zdbgProjectSel";
		globalTools.selCallback(res, parameter);
		$("#zdbgProjectSel option").eq(1).attr("selected",true);
		$("#zdbgProjectSel").next("div").find(".filter-option").text($("#zdbgProjectSel option").eq(1).text());
		$("#zdbgProjectSel").next("div").find(".dropdown-menu li").eq(1).attr("class","selected");
		$("#subTitleNav").text($("#zdbgProjectSel option").eq(1).text());
		
	}
}

//tables统一调用
function formatTables(id,arrColumns,result)
{
	var thead="",tbody="",tableHtml="";
	$("#"+id).html("");
	if(result==null)
	{
		thead+="<thead>";
		var trHeadHtml="<tr>";
		$.each(arrColumns,function(i,item){
			
			trHeadHtml+="<th>"+item+"</th>";
		});
		trHeadHtml+="</tr>";
		thead+=trHeadHtml+"</thead>";
		
		tbody+="<tbody>";
		var trBodyHtml="<tr>";
		trBodyHtml+="<td style='text-align:center' colspan='"+arrColumns.length+"'>暂无数据</td>"
		trBodyHtml+="</tr>";
		tbody+=trBodyHtml+"</tbody>";
	}
	else if(result.length<=0)
	{
		thead+="<thead>";
		var trHeadHtml="<tr>";
		$.each(arrColumns,function(i,item){
			
			trHeadHtml+="<th>"+item+"</th>";
		});
		trHeadHtml+="</tr>";
		thead+=trHeadHtml+"</thead>";
		
		tbody+="<tbody>";
		var trBodyHtml="<tr>";
		trBodyHtml+="<td style='text-align:center' colspan='"+arrColumns.length+"'>暂无数据</td>"
		trBodyHtml+="</tr>";
		tbody+=trBodyHtml+"</tbody>";
	}
	else
	{
		thead+="<thead>";
		var trHeadHtml="<tr>";
		$.each(arrColumns,function(i,item){
			
			trHeadHtml+="<th>"+item+"</th>";
		});
		trHeadHtml+="</tr>";
		thead+=trHeadHtml+"</thead>";

		var trBodyHtml="";
		tbody="<tbody>";
		for(var i=0;i<result.length;i++)
		{
			var colsArr=[];
			var resultCount=0;
			if(result[i].dataRecords.length>0)
			{
				$.each(result[i].dataRecords[0],function(index,item){
					if(index!="rectime" && resultCount<=result[i].classpropertyids.length)
					{
				
						colsArr[resultCount]=item;
						resultCount++;
					}
				});
			}
			trBodyHtml+="<tr>";
			if(colsArr.length==0)
			{
				for(var j=0;j<(result[i].classpropertyids.length+1);j++)
				{
						if(j!=0)
						{
							trBodyHtml+="<td>-</td>";
						}
						else
						{
							trBodyHtml+="<td>"+result[i].classinstancename+"</td>";
						}
						
				}
			}
			else
			{
				for(var j=0;j<colsArr.length;j++)
				{
					if(j!=0)
					{
						trBodyHtml+="<td>"+(colsArr[j]==null?"-":colsArr[j])+"</td>";
					}
					else
					{
						trBodyHtml+="<td>"+result[i].classinstancename+"</td>";
					}
				}
			}
			trBodyHtml+="</tr>";
			//alert(trBodyHtml);
		}
		
		tbody+=trBodyHtml+"</tbody>";
	}
	tableHtml+=thead+tbody;
	$("#"+id).html(tableHtml);
}

//table 格式化
function formatTable(isArray,table,box,col){
  if(isArray === 3) {
    var str;
    $.each(table,function(i,v){
        str +=  '<tr>';
        for(var i = 0, l = col; i < l; i++) {
            str +=  '<td>'+v.classinstancename+'</td><td>'+v.singleDatavalue+'</td>';
        }
        str +='</tr>';
    });        
    $(box).empty().append(str);
  } else if(isArray === 2) {
    var str;
    $.each(table,function(i,v){
        str +=  '<tr>';
        for(var i = 0, l = col; i < l; i++) {
            str +=  '<td>'+v.classinstancename+'</td><td>'+v.singleDatavalue+'</td>';
        }
        str +='</tr>';
    });        
    $(box).empty().append(str);
  } else if(isArray === 1) {
    var l = table.classpropertyids.length;
    $.each(table, function(i,v){
         
    });
  
  }
}
		//饼图数据格式化
		function bingtuformat(data, id) {
			var resArr = new Array;
			var item = new Object;
			var count = 0;
			$.each(data, function(i, v) {
				item = new Object;
				item.name = v.showname + v.datavalue + " " + v.energyunit;
				item.y = 0;
				item.datavalue = parseFloat(v.datavalue);
				count += parseFloat(v.datavalue);
				resArr.push(item);
			});

			$.each(resArr, function(i, v) {
				//				parseFloat((v.datavalue / kzsCount * 100).toFixed(1));
				v.y = parseFloat((v.datavalue / count * 100).toFixed(2));
			});


			highchartsJsonp(resArr, id);
		}
		var tablesCCHP;
		var tablesGE;
		var tablesWHLB;
		var tablesWHB;
		var tablesLB;
		var tablesGSHP;
		var tablesBOI;
		var tablesCHWCP;
		var tablesCWCP;
		var tablesCT;
function getReportAll(data){
	
	console.info("数据显示");
	console.info(data);
	
	
	
	//显示 2.1CCHP子系统 table1
	tablesCCHP=data.status.data.tablesCCHP;
	
	//显示 2.1CCHP子系统 table2
	tablesGE=data.status.data.tablesGE;
	
	
	//显示 2.1CCHP子系统 table3 少字段
	tablesWHLB=data.status.data.tablesWHLB;
	
	
	
	//显示 2.2常规调峰子系统 table1
	tablesLB=data.status.data.tablesLB;
	
	
	//显示 2.2常规调峰子系统 table2
	tablesGSHP=data.status.data.tablesGSHP;
	
	//显示 c 冷温水输配子系统 table1
	tablesCHWCP=data.status.data.tablesCHWCP;
	
	
	//显示 c 冷却子系统 table1
	tablesCWCP=data.status.data.tablesCWCP;
	
	//显示 c 冷却子系统 table1
	tablesCT=data.status.data.tablesCT;
	
	//显示 2.2.2 可再生能源类 table3
	tablesBOI=data.status.data.tablesBOI;
	
	
	//显示 CCHP子系统 table4
	tablesWHB=data.status.data.tablesWHB;
	

	
	
	
    //'单位供能成本'
    lineCostSeries = formatLine(0,data.status.data.lineCost); 
	
    //'多条曲线'
    linesSeries = formatLine(1,data.status.data.linesGEPE);
	
	//诊断时间内能源综合利用率变化
	lineNYLYLv= formatLine(0,data.status.data.lineEUR); 
	
	//节能率
	linelineESR= formatLine(0,data.status.data.lineESR); 
	
	//供能能耗
	lineUEC= formatLine(0,data.status.data.lineUEC); 
	
	// //蒸汽型溴化锂机组
	lineWHLB= formatLine(1,data.status.data.linesWHLB);
	
	//土壤源
	linesGSHP=formatLine(1,data.status.data.linesGSHP); 
	
	//供能量
	lineLTWE = formatLine(0,data.status.data.linesLTW[0]);
	//室外空气温度
	lineLTWT = formatLine(0,data.status.data.linesLTW[1]);
	//直燃型溴冷机组
	linesLB=formatLine(1,data.status.data.linesLB);
	//直燃型溴冷机组
	linesBOI=formatLine(1,data.status.data.linesBOI);
	
	linesWHB=formatLine(1,data.status.data.linesWHB);

	
	//
	//cchpZXTLine03
	
	
	$.each(data.status.data.tableES.dataRecords,function(i,item){
		$("#singXuanran_td1").text(item.data1);
		$("#singXuanran_td2").text(item.data2);
		$("#singXuanran_td3").text(item.data3);
		$("#singXuanran_td4").text(item.data4);
	});
	

//formatTable(0,tableSSR,'#gyxtyxsj');

    		bingtuformat(data.status.data.piegraghEC, "hnjg");
			//bingtuformat(data.status.data.piegraghES, "gnjg");
			
			var resArr = new Array;
			var item = new Array;
			var count = 0;
			$.each(data.status.data.piegraghES, function(i, v) {
				item = new Object;
				item.name = v.classinstancename;
				item.y = 0;
				item.datavalue = parseFloat(v.singleDatavalue);
				count += parseFloat(v.singleDatavalue);
				resArr.push(item);
			});
			$.each(resArr, function(i, v) {
				//				parseFloat((v.datavalue / kzsCount * 100).toFixed(1));
				v.y = parseFloat((v.datavalue / count * 100).toFixed(2));
			});
			highchartsJsonp(resArr, "gnjg");
			
			bingtuformat(data.status.data.piegraghEC, "dyrb_fhl");
}
       // 格式化曲线
    function formatLine(isArray,line,title) {
         var name , data = [],newLine = {}, sd = [],series = {xData:[],sData:[] };
	
	if(isArray == 0) {
            name = line.classinstancename;
             $.each(line.datalist, function(i,v){
                  series.xData.push(v.rectime);  
                  data.push(v.datavalue);
             }); 
         newLine.name = name; newLine.data = data;
         sd.push(newLine)
	} else {
        $.each(line, function(i, v){
            name = v.classinstancename; 
                  var newLines = {},newData = [];
             $.each(v.datalist, function(i,v){
                  series.xData.push(v.rectime);  
                  newData.push(v.datavalue);
             }); 
         newLines.name = name; newLines.data = newData;
         sd.push(newLines)
        });
}

         series.xData =  globalTools.dateFormater(2,series.xData);
         series.sData = sd;
         return series;
    }
       $('#zdList').find('a').on('click', function(){
            var $this = $(this);      
            $this.siblings('a').removeClass('active').end().addClass('active');

            globalTools.modalFn.call(this);

       });

		$('#myModal').on('shown.bs.modal', function() {
            var area = $(this).attr('data-num');
            //全局
            if(area == 0) {
               globalTools.selectFn('#allZxt','div','zdbg-active','zdbg-active'); 
               // lineCostParameter = {id:'allLine01',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'单位供能成本'};
			   
			   //能源利用率
				linesParameter = {id:'zdsjnnyzhlylLine',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'能源综合利用率'};
				globalTools.tbhbCallback(lineNYLYLv, linesParameter);
				
				//节能率
				linesParameter = {id:'zdsjnjnlbhLine',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'节能率'};
                globalTools.tbhbCallback(linelineESR , linesParameter);
				
				//供能能耗
				linesParameter = {id:'allLine01',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'单位供能能耗'};
                globalTools.tbhbCallback(lineUEC , linesParameter);
				
				//供能成本
				linesParameter = {id:'dwgnnh',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'单位供能成本'};
                globalTools.tbhbCallback(lineCostSeries , linesParameter);
				
				
				linesParameter = {id:'gllyswkqhzLine',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'供能量'};
                globalTools.tbhbCallback(lineLTWE , linesParameter);
				linesParameter = {id:'gllyswkqhzLine2',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'室外空气温度'};
                globalTools.tbhbCallback(lineLTWT , linesParameter);
				
				
				
            } else if(area == 1) {//CCHP 
	
				//显示 2.1CCHP子系统 table1
				formatTables("t_2_1_01",["设备序号","热效率","热电比","余热总量","余热回收量","热回收率"],tablesCCHP);
				//显示 2.1CCHP子系统 table2
				formatTables("t_2_1_02",["设备序号","耗气量","发电量","发电效率","负荷率"],tablesGE);
				//显示 2.1CCHP子系统 table3
				formatTables("t_2_1_03",["设备序号","供能量","COP","负荷率"],tablesWHLB);
				//显示 CCHP子系统 table4
				formatTables("t_2_1_04",["设备序号","供蒸气量","热效率"],tablesWHB);
				
                globalTools.selectFn('#cchpZxt','div','zdbg-active','zdbg-active'); 
				
                linesParameter = {id:'cchpZXTLine02',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'燃气内燃机发电效率'};
                globalTools.tbhbCallback(linesSeries , linesParameter);
				
				//蒸汽型溴化锂机组
				linesParameter = {id:'cchpZXTLine02_1',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'蒸汽型溴化锂机组'};
                globalTools.tbhbCallback(lineWHLB , linesParameter);
				
				linesParameter = {id:'cchpZXTLine01',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'烟气余热型蒸汽锅炉 热效率'};
                globalTools.tbhbCallback(linesWHB , linesParameter);
				
				
				

            } else if(area == 2) {//调峰
				
				//显示 2.2常规调峰子系统 table1
				formatTables("t_2_2_01",["设备序号","耗气量","供能量","COP","负荷率"],tablesLB);
				//显示 2.2常规调峰子系统 table2
				formatTables("t_2_2_02",["设备序号","耗电量","供能量","COP","负荷率"],tablesGSHP);
				//显示 2.2.2 可再生能源类 table3
				formatTables("t_2_2_03",["设备序号","供蒸气量","热效率"],tablesBOI);

				
				//土壤源
				linesParameter = {id:'xhl1Line',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'土壤源热泵机组 COP'};
                globalTools.tbhbCallback(linesGSHP , linesParameter);
				
				//直燃型溴冷机组
				linesParameter = {id:'zhiranjiLine',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'直燃型溴化锂机组 COP'};
                globalTools.tbhbCallback(linesLB , linesParameter);
				
				//直燃型溴冷机组
				linesParameter = {id:'ranqixingLine',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'燃气型蒸汽锅炉 热效率'};
                globalTools.tbhbCallback(linesBOI , linesParameter);
				
				
				
				
                globalTools.selectFn('#cgtfZxt','div','zdbg-active','zdbg-active'); 
            } else if(area == 3) {//冷温
				//显示 c 冷温水输配子系统 table1
				formatTables("t_c_01",["设备序号","耗电量","输送系数"],tablesCHWCP);
				
                globalTools.selectFn('#lwspZxt','div','zdbg-active','zdbg-active'); 
            } else {//冷却
				
				//显示 c 冷温水输配子系统 table1
				formatTables("d_t_01",["设备序号","耗气量","输送系数"],tablesCWCP);
				//显示 c 冷却子系统 table1
				formatTables("d_t_02",["设备序号","冷却效率"],tablesCT);
				
				
			
                globalTools.selectFn('#lqZxt','div','zdbg-active','zdbg-active'); 
            }
        });


    $('.radio').on('click', function(){
        var $this = $(this), id = $this.attr('id');
        if( $this.prop('checked') && id === 'glj' ) { 
            console.log('供冷及'); 
        groupType = 0;
//zdbgStart.data("DateTimePicker").date('2015-10-31');
//zdbgEnd.data("DateTimePicker").date('2015-05-01');
        }
        else if( $this.prop('checked') && id === 'grj' ) { 
            console.log('供热及'); 
        groupType = 1;
//zdbgStart.data("DateTimePicker").date('2016-04-30');
//zdbgEnd.data("DateTimePicker").date('2015-11-01');
        }
    });

    //获取当前月
    if(m >= 5 && m <= 10 ) {// 供冷季
        $('#glj').prop('checked',true);        
        groupType = 0;
    zdbgStart.datetimepicker(datetimepickerObjZdbg );
    zdbgEnd.datetimepicker(datetimepickerObjZdbg );
//zdbgStart.data("DateTimePicker").date('2015-10-31');
//zdbgEnd.data("DateTimePicker").date('2015-05-01');
zdbgStart.data("DateTimePicker").date(dateStar );
zdbgEnd.data("DateTimePicker").date(dateEnd );
    } else { //供热季 
        $('#grj').prop('checked',true);        
        groupType = 1;
    zdbgStart.datetimepicker(datetimepickerObjZdbg );
    zdbgEnd.datetimepicker(datetimepickerObjZdbg );
//zdbgStart.data("DateTimePicker").date('2016-04-30');
//zdbgEnd.data("DateTimePicker").date('2015-11-01');
zdbgStart.data("DateTimePicker").date(dateStar );
zdbgEnd.data("DateTimePicker").date(dateEnd );
        //时间控件
    }
        zdbgStart.on('dp.change', function(ev) {
            dateStar = ev.date.format('YYYY-MM-DD');
           zdbgEnd.data("DateTimePicker").maxDate(ev.date); 
           console.log(groupType )
        });
        zdbgEnd.on('dp.change', function(ev) {
            dateEnd = ev.date.format('YYYY-MM-DD');
           zdbgStart.data("DateTimePicker").minDate(ev.date); 
           //if(groupType  ===)
        });
	  
	  
      //分析按钮
      $('#myButton').on('click', function(){
        //console.log('groupType',groupType);       
        //console.log('dateStar',dateStar);       
        //console.log('dateEnd',dateEnd);       
		var projectId=$("#zdbgProjectSel option:selected").attr("id");
        $('#zdList').removeClass('zdbg-hide');
			demand.start({
                url: '/api/dxReport/reportAll.json',
                loadContainer: loadConfig,
                parameter: {d:1},
				data: {
					projectid: projectId,
                    dxStart: dateEnd,
                    dxEnd:dateStar ,
                    //dxStart: '2015-08-01',
                    //dxEnd:'2015-08-02',
                    seasonType: groupType
				},
                done: getReportAll 
			});
      });
      //下拉选择
      $('.selectpicker').selectpicker({});

        //选择下拉框
		$('.selectpicker').change(function() {
			var $this = $(this);
			var selected = $this.find('option:selected');
            var instanceid = selected.attr('data-instanceid');
            var propertyid = selected.attr('id');
            var parents = $this.parents('.my-card');
			var charts = parents.find('.chart-box').attr('id');
            var url, config, selectOptions;
            console.log(selected.val());
            pid = selected.val();
            //dateStar = parents.find('.datetimepicker1').children('input').val();  
            //dateFlag = setDate.getFlag();
        });

		function highchartsJsonp(data, id) {
			var chartPie;
			optionsPie.chart.renderTo = id;
			optionsPie.chart.backgroundColor = '#fff';
			optionsPie.series[0].name = '占比';
			optionsPie.series[0].data = data;
			chartPie = new Highcharts.Chart(optionsPie);
		}

	}());	
});
