define(function(require) {
	var
		moment = require('moment'),
        zh_cn = require('moment-zh-cn'),
		datapicker = require('bootstrap-datetimepicker.min'),
		jsonpPath = require('app/getJsonp'),
		card = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		jsonpPath = require('app/getJsonp'),
		api = require('app/getApi'),
        projectid = require('app/checkProjectid'),
		optionsLines = require('app/highchartsConfigLines');

	(function() {

		var dateFlag = 1;
		//var dateStr = '2015-09-01';
		//var dateStr = moment().format('YYYY-MM-DD');
        var dateStr = '2015-12-15'; //初始化查询时间
        var oldDate; //防止重复
        var url, name;
        var loadConfig = [['.my-card'], 1];
		// 日月年
		//		globalTools.tbhbClick('.date-controls-box', 'button', jsonpPath, 'tbhb3', globalTools.tbhbLines, demand.start, setDate, globalTools, optionsLines);
        //var dataP = {projectid:1,dateFlag:1,dateStr:'2015-08-01'};

		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);

		//时间空间
        $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
            var $this = $(this); 
            var id = $this.parents('.my-card').find('.chart-box').attr('id');
            var jsonpName, dateFn;
            //console.log($this.find('input').val());
            dateFlag = setDate.getFlag();
            switch(dateFlag ) {
                case 1:
                    dateStr = ev.date.format('YYYY-MM-DD');
                    if(oldDate == dateStr) break;
                    console.log(dateStr);  
                    oldDate = dateStr;break;
                case 2: 
                    dateStr = ev.date.format('YYYY-MM');
                    if(oldDate == dateStr) break;
                    console.log(dateStr);  
                    oldDate = dateStr;break;
                case 3: 
                    dateStr = ev.date.format('YYYY');
                    if(oldDate == dateStr) break;
                    console.log(dateStr);  
                    oldDate = dateStr;break;
            }
            //console.log(ev.date.format('YYYY'));
            //console.log(d);
            switch (id) {
                case 'zbfxNyzhlyl':
                    url = '/api/KPIInfo/list1.json';    
                    dateFn = globalTools.tbhbLines;
                    name = '能源综合利用率';
                    break;
                case 'zbfxJnl':
                    url = '/api/KPIInfo/list2.json';    
                    dateFn = globalTools.tbhbLines;
                    name = '节能率';
                    break;
                case 'zbfxEyhtjpl':
                    url = '/api/KPIInfo/list3.json';    
                    dateFn = globalTools.tbhbLines;
                    name = '二氧化碳减排率';
                    break;
                case 'zbfxKzsnylyl':
                    url = '/api/KPIInfo/list4.json';    
                    dateFn = globalTools.tbhbLines;
                    name = '可再生能源利用率';
                    break;
            }
            demand.start({
                url: url,
			loadContainer: loadConfig,
                parameter: {
                    id: id,
                    fn: globalTools.tbhbLines,
                    options: optionsLines,
                    dateFlag: dateFlag,
                    self:globalTools,
                    name: name 
                },
                data: {
                    projectid: projectid,
                    dateFlag: dateFlag,
                    dateStar: dateStr
                },
                done: formatZbLines
            });
            //demand.start({
                //url: jsonpPath + jsonpName + '.js',
                //parameter: {
                    //id: id,
                    //fn: dateFn,
                    //options: optionsLines
                //},
                //jsonpCallback: jsonpName,
                //done: globalTools.tbhbCallback
            //});
        })
        ;

		// 图表
		var chartLines;
		demand.start({
			loadContainer: loadConfig,
			url: '/api/KPIInfo/list1.json',
			parameter: {
				id: 'zbfxNyzhlyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
                self:globalTools,
				name: '能源综合利用率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: formatZbLines
		});

		demand.start({
			loadContainer: loadConfig,
			url: '/api/KPIInfo/list2.json',
			parameter: {
				id: 'zbfxJnl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
				dateFlag: dateFlag,
                self:globalTools,
				name: '节能率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: formatZbLines
		});

		demand.start({
			loadContainer: loadConfig,
			url: '/api/KPIInfo/list3.json',
			parameter: {
				id: 'zbfxEyhtjpl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
                self:globalTools,
				dateFlag: dateFlag,
				name: '二氧化碳减排率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: formatZbLines
		});

		demand.start({
			loadContainer: loadConfig,
			url: '/api/KPIInfo/list4.json',
			parameter: {
				id: 'zbfxKzsnylyl',
				fn: globalTools.tbhbLines,
				options: optionsLines,
                self:globalTools,
				dateFlag: dateFlag,
				name: '可再生能源利用率'
			},
			data: {
				projectid: projectid,
				dateFlag: dateFlag,
				dateStar: dateStr
			},
			done: formatZbLines
		});

        //解析数据，变成HighChar识别的数据格式
        function formatZbLines(data, parameter) {
            var result = data.status.data;
            var tmp = {};
            var sData1 = [];
            var yItem = {};
            tmp.xData = globalTools.dateFormater(parameter.dateFlag, result.listX);

            yItem.name = parameter.name;
            yItem.data = [];
            $.each(result.listY, function(i, v) {
                yItem.data.push(parseFloat(v));
            });

            sData1.push(yItem)

            tmp.sData = sData1;

            globalTools.tbhbCallback(tmp, parameter);
        }

	}());
});
