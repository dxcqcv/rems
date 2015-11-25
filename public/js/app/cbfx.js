define(function(require) {
	var 
       datapicker = require('bootstrap-datetimepicker.min')
	  , highcharts = require('exporting')
      , jsonpPath = require('app/getJsonp')
      , api = require('app/getApi')
      , optionsArea = require('app/highchartsConfigArea')
      , optionsStactColumn = require('app/highchartsConfigStactColumn')
      , setDate = require('app/setDate')
      , globalTools = require('app/globalTools')
      , datetimepickerObj = require('app/dateObj')
      ;
    //图表
         var chart, chartCol;
        // localJsonp.start({url:jsonpPath+'cbfxLines.js',jsonpCallback:'cbfxLines',parameter:{id:'dwgncbqxCharts'},done:cbfxLinesData});
        demand.start({url:'/api/costProfit/costProfitChart.json',data:{projectid:1,dateFlag:1,dateStar:"2015-09-01"}, parameter:{id:'dwgncbqxCharts'},done:cbfxLinesData});

         localJsonp.start({url:jsonpPath+'cbfxCol.js',jsonpCallback:'cbfxColumn',parameter:{id:'dwgncbbl'},done:cbfxColumnData});

         function cbfxColumnData(data, parameter) {
             buildCbfxColumn(parameter.id, data);
         }

         function buildCbfxColumn(id,sData) {
             optionsStactColumn.chart.renderTo = id;         
             optionsStactColumn.series[0] = sData;
             chartCol = new Highcharts.Chart(optionsStactColumn); 
         } 

         function cbfxLinesData(data,parameter) {
            console.log(parameter);
            console.log(data);
             buildCbfxLines(parameter.id,data);
         }
         function buildCbfxLines(id,sData){
              optionsArea.chart.renderTo = id;
              optionsArea.series[0] = sData;

              console.log(sData);
              chart = new Highcharts.Chart(optionsArea); 
         }
    //时间控件
       $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
         //localJsonp.start({url:jsonpPath+'cbfxLines.js',jsonpCallback:'cbfxLines',parameter:{id:'dwgncbqxCharts'},done:cbfxLinesData});
         demand.start({url:'/api/costProfit/costProfitChart.json',data:{projectid:1,dateFlag:1,dateStar:"2015-09-01"}, parameter:{id:'dwgncbqxCharts'},done:cbfxLinesData})
        });

    // button
    $('.dateButtons').children('button').on('click', function(){
        var $this = $(this);
         setDate.changeDate($this);    
         globalTools.selectFn($this,'button'); 

         localJsonp.start({url:jsonpPath+'cbfxLines.js',jsonpCallback:'cbfxLines',parameter:{id:'dwgncbqxCharts'},done:cbfxLinesData});

    });
	
});

