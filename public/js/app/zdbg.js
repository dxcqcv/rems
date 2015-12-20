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
    var pid = projectid;
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
function getReportAll(data){
    //'单位供能成本'
    lineCostSeries = formatLine(0,data.status.data.lineCost); 
    //'多条曲线'
    linesSeries = formatLine(1,data.status.data.linesGEPE);

formatTable(0,tableSSR,'#gyxtyxsj');

    			bingtuformat(data.status.data.piegraghEC, "hnjg");
			bingtuformat(data.status.data.piegraghEC, "gnjg");
			bingtuformat(data.status.data.piegraghEC, "dyrb_fhl");
}
       // 格式化曲线
    function formatLine(isArray,line,title) {
         var name , data = [],newLine = {}, sd = [],series = {xData:[],sData:[] };

if(isArray == 0) {
            name = line.classinstancename
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
        console.log(sd)
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
               lineCostParameter = {id:'allLine01',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'单位供能成本'};
            } else if(area == 1) {

                globalTools.selectFn('#cchpZxt','div','zdbg-active','zdbg-active'); 


                linesParameter = {id:'cchpZXTLine02',options:optionsLabel,fn: globalTools.tbhbLines,label:1, title:'燃气内燃机发电效率'};

                //globalTools.tbhbCallback(lineCostSeries, lineCostParameter);

                globalTools.tbhbCallback(linesSeries , linesParameter);

            } else if(area == 2) {
            
                globalTools.selectFn('#cgtfZxt','div','zdbg-active','zdbg-active'); 
            } else if(area == 3) {
            
                globalTools.selectFn('#lwspZxt','div','zdbg-active','zdbg-active'); 
            } else {
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
      //下拉框默认值
      var zdbgStr = '', zdbgProjectSel = $('#zdbgProjectSel') ;
      switch(projectid) {
        case 1:
            zdbgProjectSel.val(1);
            break; 
        case 3:
            zdbgProjectSel.val(3);
            break; 
      }
      //分析按钮
      $('#myButton').on('click', function(){
        //console.log('groupType',groupType);       
        //console.log('dateStar',dateStar);       
        //console.log('dateEnd',dateEnd);       

        $('#zdList').removeClass('zdbg-hide');
			demand.start({
                url: '/api/dxReport/reportAll.json',
                loadContainer: loadConfig,
                parameter: {d:1},
				data: {
					projectid: pid,
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
