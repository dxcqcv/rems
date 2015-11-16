
define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , options = require('app/highchartsConfig')
      , optionsLines = require('app/highchartsConfigLines')
      , jsonpPath = require('app/getJsonp')
      , proto = require('app/highstockMod')
      , highcharts = require('app/card') 
      , setDate = require('app/setDate')
      , datetimepickerObj = require('app/dateObj')
      , globalTools = require('app/globalTools')
      ;

      (function(){
          var chart;
          var chartLines;
          // 日月年
          $('.date-controls-box').children('button').on('click',function(){
            setDate.changeDate($(this));       
          }); 
          $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
                var id = $(this).parents('.my-card').find('.chart-box').attr('id');
                var jsonpName, dateFn;
                switch(id) {
                    case 'tbhbHaoneng': jsonpName= 'tbhb'; dateFn = tbhbHngn; break;
                    case 'tbhbGongneng': jsonpName= 'tbhb'; dateFn = tbhbHngn; break; 
                    case 'tbhbNyzhlyl': jsonpName= 'tbhb3'; dateFn = tbhbLines; break; 
                    case 'tbhbJnl': jsonpName= 'tbhb3'; dateFn = tbhbLines; break; 
                }
                    localJsonp.start({url:jsonpPath+jsonpName+'.js',parameter:{id:id,fn:dateFn},jsonpCallback:jsonpName,done:tbhbCallback});
          });

          tbhbClick('.tbhb-switch-box-top','li','tbhb2',tbhbHngn); 
          tbhbClick('.date-controls-box-top','button','tbhb2',tbhbHngn);
          tbhbClick('.tbhb-switch-box-bottom','li','tbhb3',tbhbLines); 
          tbhbClick('.date-controls-box-bottom','button','tbhb3',tbhbLines);

          function tbhbClick(name,tag,jsonp,fn) {
              $(name).find(tag).click(function(){
                  var charts = $(this).parents('.my-card').find('.chart-box').attr('id'); 
                  localJsonp.start({url:jsonpPath+jsonp+'.js',parameter:{pointer:this,charts:charts,tag:tag,fn:fn},jsonpCallback:jsonp,done:tbhbGhg3});
              });
          }
         function tbhbGhg3(data,parameter) {
            parameter.fn(parameter.charts,data[0].baseLine,data[0].xData,data[0].sData);
            globalTools.selectFn(parameter.pointer,parameter.tag); 
         }
      //图表
// tbhb top 
         localJsonp.start({url:jsonpPath+'tbhb.js',parameter:{id:'tbhbHaoneng',fn:tbhbHngn},jsonpCallback:'tbhb',done:tbhbCallback});
         localJsonp.start({url:jsonpPath+'tbhb2.js',parameter:{id:'tbhbGongneng',fn:tbhbHngn},jsonpCallback:'tbhb2',done:tbhbCallback});

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
        localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{id:'tbhbNyzhlyl',fn:tbhbLines},jsonpCallback:'tbhb3',done:tbhbCallback});
        localJsonp.start({url:jsonpPath+'tbhb4.js',parameter:{id:'tbhbJnl',fn:tbhbLines},jsonpCallback:'tbhb4',done:tbhbCallback});

        function tbhbCallback(data,parameter) {
           parameter.fn(parameter.id,data[0].baseLine,data[0].xData,data[0].sData);
        }
        function tbhbLines(id,baseLine,xData,sData) {
              optionsLines.chart.renderTo = id;
              optionsLines.yAxis.plotLines.value = baseLine;
              optionsLines.xAxis.categories = xData;
              optionsLines.series = sData;
              chartLines = new Highcharts.Chart(optionsLines); 
        }



//end
      }());


});
