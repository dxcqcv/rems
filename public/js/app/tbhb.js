define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
        zh_cn = require('moment-zh-cn'),
        moment = require('moment'),
		datapicker = require('bootstrap-datetimepicker.min'),
		options = require('app/highchartsConfig'),
		optionsLines = require('app/highchartsConfigLines'),
		jsonpPath = require('app/getJsonp'),
        projectid = require('app/checkProjectid'),
		highcharts = require('app/card'),
		setDate = require('app/setDate'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		api = require('app/getApi');

	(function() {

		//var projectid = 1;
		var dateFlag = 1, dateFlag02 = 1,dateFlag03 = 1,dateFlag04 = 1 ;
		//var dateStar = '2015-09-01';
		var tabFlag = 1; //(1：同比，2:环比)
        var charFlag; //1-柱形,2-曲线
        var optionsSel; // options 柱形，optionsLines 曲线
        var initCharts = ['tbhbHnDate','tbhbGnDate','tbhbNyzhlylDate','tbhbJnlDate']; 
        //var dateStar = moment().format('YYYY-MM-DD'); //初始化查询时间
        var dateStar = '2015-12-15'; //初始化查询时间
		var oldDate; //防止重复
        var unit;
		var url, name;
        var loadConfig = [['.my-card'], 1];
		// 日月年

		globalTools.realClick('.date-controls-box', 'button', setDate, globalTools);
        //切换同比环比标签
		globalTools.realClick('.tbhb-switch-box', 'li', null, globalTools ,function(){
             var $this = $(this);
             var id = $this.parents('.tbhb-switch-box').data('dir');
             var type = $this.attr('data-type');
             if(type ==='tb') tabFlag = 1;
             else if(type ==='hb') tabFlag = 2;
             dateChange.call($('#'+id),this);
        });

        $('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change',dateChange);
       
        //初始化tbhb
        for(var i = 0, l = initCharts.length; i < l; i++) {
             dateChange.call($('#'+initCharts[i]+''),this);
        }

        function dateChange(ev) {
            var $this = $(this); 
            var id = $this.parents('.my-card').find('.chart-box').attr('id');
            var jsonpName, dateFn;
            //日或月
            dateFlag = setDate.getFlag();
            switch(dateFlag ) {
                case 1:
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY-MM-DD');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
                case 2: 
                    if(ev.date === undefined) dateStar = $this.find('input').val();
                    else dateStar = ev.date.format('YYYY-MM');
                    if(oldDate == dateStar) break;
                    oldDate = dateStar;break;
            }
            switch (id) {
                case 'tbhbHaoneng':
                    if(tabFlag === 1)   url = '/api/CSInfo/expend/list1.json';    
                    else if(tabFlag === 2) url = '/api/CSInfo/expend/list2.json';
                    dateFn = tbhbHngn;
                    optionsSel = options
                    charFlag = 1;
                    break;
                case 'tbhbGongneng':
                    dateFlag02 = dateFlag  
                    if(tabFlag === 1)   url = '/api/CSInfo/provide/list1.json';    
                    else if(tabFlag === 2) url = '/api/CSInfo/provide/list2.json';
                    dateFn = tbhbHngn;
                    optionsSel = options
                    charFlag = 1;
                    break;
                case 'tbhbNyzhlyl':
                    dateFlag03 = dateFlag 
                    if(tabFlag === 1)   url = '/api/CSInfo/use/list1.json';    
                    else if(tabFlag === 2) url = '/api/CSInfo/use/list2.json';
                    unit = '';
                    dateFn = globalTools.tbhbLines;
                    optionsSel =optionsLines; 
                    charFlag = 2;
                    break;
                case 'tbhbJnl':
                    dateFlag04 = dateFlag
                    if(tabFlag === 1)   url = '/api/CSInfo/saving/list1.json';    
                    else if(tabFlag === 2) url = '/api/CSInfo/saving/list2.json';
                    unit = '';
                    dateFn = globalTools.tbhbLines;
                    optionsSel =optionsLines; 
                    charFlag = 2;
                    break;
            }

            demand.start({
                url: url,
			loadContainer: loadConfig,
                parameter: {
                    id: id,
                    fn: dateFn,
                    options: optionsSel,
                    dateStar: dateStar,
                    dateFlag: function(){
                        var realFlag;
                        switch (id) {
                            case 'tbhbHaoneng':
                                realFlag = dateFlag;
                                break;
                            case 'tbhbGongneng':
                                realFlag = dateFlag02;
                                break;
                            case 'tbhbNyzhlyl':
                                realFlag = dateFlag03;
                                break;
                            case 'tbhbJnl':
                                realFlag = dateFlag04;
                                break;
                        }
                        return realFlag
                    },
                    self:globalTools,
                    unit: unit,
                    charFlag: charFlag 
                },
                data: {
                    projectid: projectid,
                    dateFlag: dateFlag,
                    dateStar: dateStar
                },
                done:res 
            });
        }
		function tbhbHngn(id, baseLine, xData, sData) {
			options.chart.type = 'column';
			options.chart.renderTo = id;
			options.xAxis.categories = xData;
            options.yAxis.title.text = 'kWh';
			//optionsLines.yAxis.plotLines.value = baseLine;
			options.plotOptions.series.dataLabels.enabled = true;
			options.plotOptions.series.dataLabels.format = '{point.y:.1f}';
			options.series = sData;

			chart = new Highcharts.Chart(options);
		}

		//图表

		function res(result, parameter) {
			if (parameter.id == 'tbhbNyzhlyl')
				console.log(result.status.data);
			if (result.status.code == 200) {
				var realdata = result.status.data.currentList;
				var olddata = result.status.data.oldList;
				var sData = new Array();
				var xData = new Array();
				var sDataElement = new Object();

				sDataElement.data = new Array();

				var sDataElementOld = new Object();

				sDataElementOld.data = new Array();
				var temp = new Object();

				if (tabFlag == 1) {
					sDataElement.name = "今年";
					sDataElementOld.name = "去年";
				} else {
					if (parameter.dateFlag == 1) {
						sDataElement.name = "今天";
						sDataElementOld.name = "昨天";
					} else {
						sDataElement.name = "当月";
						sDataElementOld.name = "上月";
					}
				}

				//今年数据解析
				for (var i = 0; i < realdata.length; i++) {
					temp = new Object();

					if (parameter.charFlag == 1)
						temp.name = realdata[i].showName;
					else
						temp.name = globalTools.dateFormterItem(parameter.dateFlag, realdata[i].rectime);
					xData.push(temp.name);

					temp.y = parseFloat(realdata[i].dataValue);
					sDataElement.data.push(temp);
				}

				//去年数据解析
				for (var j = 0; j < olddata.length; j++) {
					temp = new Object();

					if (parameter.charFlag == 1)
						temp.name = olddata[j].showName;
					else
						temp.name = globalTools.dateFormterItem(parameter.dateFlag, olddata[j].rectime);

					xData.push(temp.name);
					temp.y = parseFloat(olddata[j].dataValue);
					sDataElementOld.data.push(temp);
				}

				sData.push(sDataElement);
				sData.push(sDataElementOld);

				var lastResult = new Object();
				xData = globalTools.uniq(xData);
				result.xData = globalTools.uniq(xData);
				result.sData = sData;
				//							res.send(result);

				var tmp = new Array();
				var item = {};

				item.xData = globalTools.uniq(xData);
				item.sData = sData;

				tmp.push(item);

				if (parameter.charFlag == 1)
					tbhbHngn(parameter.id, 0, xData, sData);
				else
					globalTools.tbhbCallback(item, parameter);
			}
		}

		//end
	}());


});
