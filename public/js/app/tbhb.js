
define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , options = require('app/highchartsConfig')
      , optionsLines = require('app/highchartsConfigLines')
      , jsonpPath = require('app/getJsonp')
      , highcharts = require('app/card') 
      , setDate = require('app/setDate')
      , datetimepickerObj = require('app/dateObj')
      , globalTools = require('app/globalTools')
      , api = require('app/getApi')
      ;

      (function(){
          var chart;
          var chartLines;
          $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
                var id = $(this).parents('.my-card').find('.chart-box').attr('id');
                var jsonpName, dateFn;
                switch(id) {
                    case 'tbhbHaoneng': jsonpName= 'tbhb'; dateFn = tbhbHngn; break;
                    case 'tbhbGongneng': jsonpName= 'tbhb'; dateFn = tbhbHngn; break; 
                    case 'tbhbNyzhlyl': jsonpName= 'tbhb3'; dateFn = globalTools.tbhbLines; break; 
                    case 'tbhbJnl': jsonpName= 'tbhb3'; dateFn = globalTools.tbhbLines; break; 
                }
                    localJsonp.start({url:jsonpPath+jsonpName+'.js',parameter:{id:id,fn:dateFn,options:optionsLines},jsonpCallback:jsonpName,done:globalTools.tbhbCallback});
          });

          // 日月年
          globalTools.tbhbClick('.tbhb-switch-box-top','li',jsonpPath,'tbhb2',tbhbHngn,localJsonp.start,null,globalTools,optionsLines); 
          globalTools.tbhbClick('.date-controls-box-top','button',jsonpPath,'tbhb2',tbhbHngn,localJsonp.start,setDate,globalTools,optionsLines);
          globalTools.tbhbClick('.tbhb-switch-box-bottom','li',jsonpPath,'tbhb3',globalTools.tbhbLines,localJsonp.start,null,globalTools,optionsLines); 
          globalTools.tbhbClick('.date-controls-box-bottom','button',jsonpPath,'tbhb3',globalTools.tbhbLines,localJsonp.start,setDate,globalTools,optionsLines);

      //图表
// tbhb top 
         localJsonp.start({url:jsonpPath+'tbhb.js',parameter:{id:'tbhbHaoneng',fn:tbhbHngn},jsonpCallback:'tbhb',done:globalTools.tbhbCallback});
         localJsonp.start({url:jsonpPath+'tbhb2.js',parameter:{id:'tbhbGongneng',fn:tbhbHngn},jsonpCallback:'tbhb2',done:globalTools.tbhbCallback});
         //demand.start({url:'/api/CSInfo/expend/list1.json', data:{projectid:1,dateFlag:1,dateStar:"2015-09-01"},done:globalTools.tbhbCallback})

        function tbhbHngn(id,baseLine,xData,sData) {
              options.chart.type = 'column';
              options.chart.renderTo = id;
              options.xAxis.categories = xData;
              //optionsLines.yAxis.plotLines.value = baseLine;
              options.plotOptions.series.dataLabels.enabled = true;
              options.plotOptions.series.dataLabels.format = '{point.y:.1f}%';
              options.series = sData;

              chart = new Highcharts.Chart(options); 
        }
// tbhb bottom
        localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{id:'tbhbNyzhlyl',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb3',done:globalTools.tbhbCallback});
        localJsonp.start({url:jsonpPath+'tbhb4.js',parameter:{id:'tbhbJnl',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb4',done:globalTools.tbhbCallback});




//end
      }());


});
