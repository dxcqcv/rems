define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
	  , highcharts = require('exporting')
      , setDate = require('app/setDate')
      , globalTools = require('app/globalTools')
      , jsonpPath = require('app/getJsonp')
      , datetimepickerObj = require('app/dateObj')
      , optionsPie = require('app/highchartsConfigPie')
      ;
	(function() {
      // 日月年
        jgfxClick('.date-controls-box','button',jsonpPath);
        function jgfxClick(name,tag,jsonpPath,jsonp,ajaxFn,setDateFn) {
            $(name).find(tag).click(function(){
                 var $this = $(this); 
                 setDate.changeDate($this);
                 globalTools.selectFn($this,'button');

            buildJgPie([['pieData','ztnyjg','pie1'],['pieData2','kzsny','pie2'],['pieData3','qjnyjg','pie3']]);
            }); 
        }
    //时间控件
       $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
       
            buildJgPie([['pieData','ztnyjg','pie1'],['pieData2','kzsny','pie2'],['pieData3','qjnyjg','pie3']]);
       });
        //图表
 buildJgPie([['pieData','ztnyjg','pie1'],['pieData2','kzsny','pie2'],['pieData3','qjnyjg','pie3']]);


        function buildJgPie(config){
            for(var i = 0, l = config.length; i < l; i++) {
                 localJsonp.start({url:jsonpPath+config[i][0]+'.js',parameter:{id:config[i][1]},jsonpCallback:config[i][2],done:highchartsJsonp});
            }    
        }
         function highchartsJsonp(data,parameter) {
            var chartPie;
            optionsPie.chart.renderTo = parameter.id; 
            optionsPie.chart.backgroundColor = '#ddd'; 
            optionsPie.series[0].data = data;
            chartPie = new Highcharts.Chart(optionsPie); 
         }

    }());
	
	
});

