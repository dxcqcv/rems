define(function(require){
    var 
       moment = require('moment')
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

      // 日月年
        globalTools.tbhbClick('.date-controls-box','button',jsonpPath,'tbhb3',globalTools.tbhbLines,localJsonp.start,setDate,globalTools,optionsLines);

        //时间空间
          $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',function(){
                var id = $(this).parents('.my-card').find('.chart-box').attr('id');
                var jsonpName, dateFn;
                switch(id) {
                    case 'zbfxNyzhlyl': jsonpName= 'tbhb3'; dateFn = globalTools.tbhbLines; break; 
                    case 'zbfxJnl': jsonpName= 'tbhb4'; dateFn = globalTools.tbhbLines; break; 
                    case 'zbfxEyhtjpl': jsonpName= 'tbhb5'; dateFn = globalTools.tbhbLines; break; 
                    case 'zbfxKzsnylyl': jsonpName= 'tbhb6'; dateFn = globalTools.tbhbLines; break; 
                }
                    localJsonp.start({url:jsonpPath+jsonpName+'.js',parameter:{id:id,fn:dateFn,options:optionsLines},jsonpCallback:jsonpName,done:globalTools.tbhbCallback});
          });

          // 图表
          var chartLines;

          		demand.start({
			url: '/api/KPIInfo/list1.json',
			parameter: {
				id: 'zbfxNyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: 1
			},
			data: {
				projectid: 1,
				dateFlag: 1,
				dateStar: '2015-09-01'
			},
			done: res
		});


		function dateFormater(dateFlag, data) {
			if (dateFlag == 1) {
				var res = [];
				$.each(data, function(i, v) {
					res.push(v.substring(11, 13) + 'H');
				});
				return res;
			}
		}

		function res(data, parameter) {
			var result = data.status.data;
			console.log(parameter.id);
			console.log(result);
			var tmp = {};
			var sData1 = [];
			var yItem = {};
			tmp.xData = dateFormater(parameter.dateFlag, result.listX);
			console.log(tmp.xData);

			yItem.name = "能源综合利用率";
			yItem.data = [];
			$.each(result.listY, function(i, v) {
				yItem.data.push(parseFloat(v));
			});

			sData1.push(yItem)

			tmp.sData = sData1;

			globalTools.tbhbCallback(tmp, parameter);
		}

        //localJsonp.start({url:jsonpPath+'tbhb3.js',parameter:{id:'zbfxNyzhlyl',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb3',done:globalTools.tbhbCallback});
        //localJsonp.start({url:jsonpPath+'tbhb4.js',parameter:{id:'zbfxJnl',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb4',done:globalTools.tbhbCallback});
        //localJsonp.start({url:jsonpPath+'tbhb5.js',parameter:{id:'zbfxEyhtjpl',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb5',done:globalTools.tbhbCallback});
        //localJsonp.start({url:jsonpPath+'tbhb6.js',parameter:{id:'zbfxKzsnylyl',fn:globalTools.tbhbLines,options:optionsLines},jsonpCallback:'tbhb6',done:globalTools.tbhbCallback});

      }());
});
