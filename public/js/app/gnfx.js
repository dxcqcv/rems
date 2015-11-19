define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
      , bootstrap = require('bootstrap')
      , jsonpPath= require('app/getJsonp')
	  , highcharts = require('exporting')
      , globalTools = require('app/globalTools')
      , options = require('app/highchartsConfig')
      , optionsLines = require('app/highchartsConfigLines')
      , datetimepickerObj = require('app/dateObj')
      ;
    (function() {
    //弹出层
    $('.gnhnIcon').on('click',globalTools.modalFn);

    
    $('#myModal').on('shown.bs.modal', function() {
        var num = $(this).attr('data-num'); 
        switch(num) {
            case '0':
                localJsonp.start({url:jsonpPath+'modalLines.js',parameter:{options: optionsLines,color:'transparent' },jsonpCallback:'modalLines',done:globalTools.modalLines});
                break;
            case '1':
                localJsonp.start({url:jsonpPath+'modalLines2.js',parameter:{options: optionsLines,color:'transparent' },jsonpCallback:'modalLines2',done:globalTools.modalLines});
                break;
            case '2':
                localJsonp.start({url:jsonpPath+'modalLines2.js',parameter:{options: optionsLines,color:'transparent' },jsonpCallback:'modalLines2',done:globalTools.modalLines});
                break;
            case '3':
                localJsonp.start({url:jsonpPath+'modalLines2.js',parameter:{options: optionsLines,color:'transparent' },jsonpCallback:'modalLines2',done:globalTools.modalLines});
                break;
        }
    }); 
  

    // tooltips
         $('[data-toggle="tooltip"]').tooltip();  
    //时间控件
       $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
             localJsonp.start({url:jsonpPath+'highchartsJson.js',parameter:{id:'drgnsp',options:options},jsonpCallback:'highchartsJsonp',done:globalTools.ghnCallback});
             localJsonp.start({url:jsonpPath+'highchartsJson2.js',parameter:{id:'dygnsp',options:options},jsonpCallback:'highchartsJsonp2',done:globalTools.ghnCallback});
             localJsonp.start({url:jsonpPath+'highchartsJson3.js',parameter:{id:'qrgnsp',options:options},jsonpCallback:'highchartsJsonp3',done:globalTools.ghnCallback});
             localJsonp.start({url:jsonpPath+'highchartsJson4.js',parameter:{id:'dngnsp',options:options},jsonpCallback:'highchartsJsonp4',done:globalTools.ghnCallback});
       });

        //图表

         localJsonp.start({url:jsonpPath+'highchartsJson.js',parameter:{id:'drgnsp',options:options},jsonpCallback:'highchartsJsonp',done:globalTools.ghnCallback});
         localJsonp.start({url:jsonpPath+'highchartsJson2.js',parameter:{id:'dygnsp',options:options},jsonpCallback:'highchartsJsonp2',done:globalTools.ghnCallback});
         localJsonp.start({url:jsonpPath+'highchartsJson3.js',parameter:{id:'qrgnsp',options:options},jsonpCallback:'highchartsJsonp3',done:globalTools.ghnCallback});
         localJsonp.start({url:jsonpPath+'highchartsJson4.js',parameter:{id:'dngnsp',options:options},jsonpCallback:'highchartsJsonp4',done:globalTools.ghnCallback});

    }());
});
