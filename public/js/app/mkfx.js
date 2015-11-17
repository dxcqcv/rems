define(function(require){
    var 
       moment = require('moment')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , card = require('app/card') 
      , setDate = require('app/setDate')
      , datetimepickerObj = require('app/dateObj')
      , globalTools = require('app/globalTools')
      , jsonpPath = require('app/getJsonp')
      , optionsLines = require('app/highchartsConfigLines')
      ;

      (function(){

          localJsonp.start({url:jsonpPath+'mkfxSel1.js',parameter:{id:'#cchpSel'},jsonpCallback:'mkfxSel1',done:globalTools.selCallback});
          localJsonp.start({url:jsonpPath+'mkfxSel2.js',parameter:{id:'#cgtfSel'},jsonpCallback:'mkfxSel2',done:globalTools.selCallback});
          localJsonp.start({url:jsonpPath+'mkfxSel3.js',parameter:{id:'#xntfSel'},jsonpCallback:'mkfxSel3',done:globalTools.selCallback});
          localJsonp.start({url:jsonpPath+'mkfxSel4.js',parameter:{id:'#spSel'},jsonpCallback:'mkfxSel4',done:globalTools.selCallback});

    $('.selectpicker').change(function(){
        var charts = $(this).parents('.my-card').find('.chart-box').attr('id'); 
        localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{charts:charts,fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb3',done:globalTools.selFn});
    });
      // 日月年
        globalTools.tbhbClick('.date-controls-box','button',jsonpPath,'tbhb3',globalTools.tbhbLines,localJsonp.start,setDate,globalTools,optionsLines);

        //时间空间
          $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
                var id = $(this).parents('.my-card').find('.chart-box').attr('id');
                var jsonpName, dateFn;
                switch(id) {
                    case 'mkfxCCHP': jsonpName= 'tbhb3'; dateFn = globalTools.tbhbLines; break; 
                    case 'mkfxCgtf': jsonpName= 'tbhb4'; dateFn = globalTools.tbhbLines; break; 
                    case 'mkfxXntf': jsonpName= 'tbhb5'; dateFn = globalTools.tbhbLines; break; 
                    case 'mkfxSp': jsonpName= 'tbhb6'; dateFn = globalTools.tbhbLines; break; 
                }
                    localJsonp.start({url:jsonpPath+jsonpName+'.js',parameter:{id:id,fn:dateFn,options:optionsLines},jsonpCallback:jsonpName,done:globalTools.tbhbCallback});
          });

          // 图表
          var chartLines;
        localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{id:'mkfxCCHP',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb3',done:globalTools.tbhbCallback});
        localJsonp.start({url:jsonpPath+'tbhb4.js',parameter:{id:'mkfxCgtf',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb4',done:globalTools.tbhbCallback});
        localJsonp.start({url:jsonpPath+'tbhb5.js',parameter:{id:'mkfxXntf',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb5',done:globalTools.tbhbCallback});
        localJsonp.start({url:jsonpPath+'tbhb6.js',parameter:{id:'mkfxSp',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb6',done:globalTools.tbhbCallback});

      }());
});
