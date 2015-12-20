define(function(require) {
    return {
        selectFn: function(el,si,re,ad) {
            var removeClassName = (re === undefined) ? 'active' : re;
            var addClassName = (ad === undefined) ? 'active' : ad;
            $(el).siblings(si).removeClass(removeClassName).end().addClass(addClassName); 
            return true;
        },
        selCallback: function(data,parameter) {
        
        if(data.length === 0 ) { var data = [{selName:'暂无数据',instancename:'暂无数据' }] }
          var str; 
          $.each(data,function(i,v){
              str += '<option id="'+v.id+'" data-instanceid="'+v.instanceid+'" data-instancename="'+v.instancename+'">'+(v.instanceid ? v.instancename : v.selName)+'</option>'
          });
          $(parameter.id).empty().append(str).selectpicker('refresh');
        },
        selFn: function(data,parameter) {
            parameter.fn(parameter.charts,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
        },
        
        //解析数据，变成HighChar识别的数据格式
        //formatZbLines:function (data, parameter) {
            //var result = data.status.data;
            //var tmp = {};
            //var sData1 = [];
            //var yItem = {};
            //tmp.xData = parameter.self.dateFormater(parameter.dateFlag, result.listX);

            //yItem.name = parameter.name;
            //yItem.data = [];
            //$.each(result.listY, function(i, v) {
                //yItem.data.push(parseFloat(v));
            //});

            //sData1.push(yItem)

            //tmp.sData = sData1;

            //parameter.self.tbhbCallback(tmp, parameter);
        //},

        //去掉复杂的日期格式
        dateFormater:function (dateFlag, data) {
            if (dateFlag == 1) {
                var res = [];
                $.each(data, function(i, v) {
                    var tmp = v.substring(11, 13);
                    if (tmp.substring(0, 1) == '0') {
                        tmp = tmp.substring(1, 2);
                    }
                    res.push(tmp + '点');
                });
                return res;
            }
            if (dateFlag == 2) {
                var res = [];
                $.each(data, function(i, v) {
                    var tmp = v.substring(8, 10);
                    if (tmp.substring(0, 1) == '0') {
                        tmp = tmp.substring(1, 2);
                    }
                    res.push(tmp + '日');
                });
                return res;
            }
            if (dateFlag == 3) {
                var res = [];
                $.each(data, function(i, v) {
                    var tmp = v.substring(5, 7);
                    if (tmp.substring(0, 1) == '0') {
                        tmp = tmp.substring(1, 2);
                    }
                    res.push(tmp + '月');
                });
                return res;
            }
        },
        tbhbCallback: function(data,parameter) {
            //console.log(parameter.id,data);
           //parameter.fn(parameter.id,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
           if(parameter.unit !== undefined) parameter.fn(parameter.id,null,data.xData,data.sData,parameter.options, parameter.unit);
           else{
                if(parameter.label != undefined) {
                   parameter.fn(parameter.id,null,data.xData,data.sData,parameter.options,null,1);
                } else if(parameter.title != undefined) {
                   //parameter.fn(parameter.id,null,data.xData,data.sData,parameter.options, null, 1, parameter.title);
                }
           } 
        },
        tbhbLines: function(id,baseLine,xData,sData,options,unit,label,title) {
              var tbhbChartLines
              if(unit !== undefined) options.yAxis.title.text = unit;
              else options.yAxis.title.text = null;
              if(label !== undefined){
               options.plotOptions.line.dataLabels.enabled = true;
              }
              options.chart.renderTo = id;
              options.yAxis.plotLines.value = baseLine;
              options.xAxis.categories = xData;
              options.series = sData;
              tbhbChartLines = new Highcharts.Chart(options); 
        },
        selTabFn: function(data,parameter) {
            parameter.fn(parameter.charts,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
            parameter.self.selectFn(parameter.pointer,'li'); 
        },
        tbhbGhg3: function(data,parameter){
            //parameter.fn(parameter.charts,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);

            //parameter.fn(parameter.charts,data.baseLine,data.xData,data.sData,parameter.options);
            parameter.self.selectFn(parameter.pointer,parameter.tag); 
            if(parameter.setDateFn == null) return;
            var datetime = parameter.setDateFn.changeDate(parameter.pointer);       

//console.log(datetime);
        },
        tbhbGhgForApi: function(data,parameter){
          console.log("(((((((()))))))))))");
          console.log(data);
          console.log(parameter);
            parameter.fn(parameter.charts,data.baseLine,data.xData,data.sData,parameter.options);
            parameter.self.selectFn(parameter.pointer,parameter.tag); 
            if(parameter.setDateFn == null) return;
            parameter.setDateFn.changeDate(parameter.pointer);       
        },
        //name 对象，tag 具体对象，url 地址，data 请求参数
        tbhbClick: function (name,tag,url,data,fn,ajaxFn,setDateFn,self,options) {
              $(name).find(tag).click(function(){
                  var $this = $(this);
                  var parents = $this.parents('.my-card');
                  var charts = parents.find('.chart-box').attr('id'); 
                  var datetime = parents.find('.form-control').val();  
                  ajaxFn.start.call(ajaxFn,{url:url,parameter:{pointer:this,charts:charts,tag:tag,fn:fn,self:self,options:options,setDateFn:setDateFn},data:{projectid: data.projectid,dateFlag: data.dateFlag,dateStar: data.dateStr},done:self.tbhbGhg3});
              });
        },
        //name 对象，tag 具体对象，url 地址，data 请求参数
        realClick: function (name,tag,setDateFn,self, callback) {
            console.log('触发callback')
              $(name).find(tag).click(function(){
                  var $this = $(this);
                  var parents = $this.parents('.my-card');
                  var charts = parents.find('.chart-box').attr('id'); 
                  var datetime = parents.find('.form-control').val();  

            self.selectFn(this,tag); 
            console.log('触发setdate')
            if(setDateFn !== null) setDateFn.changeDate(this);       
            if(callback !== undefined) callback.call(this);
              });
        },
        ajaxClickForApi: function (name,tag,apiUrl,data,fn,ajaxFn,setDateFn,self,options) {
              $(name).find(tag).click(function(){
                  var $this = $(this)
                  if (tag == "button" && $(this).attr("data-range") == '1d') {
                    data.dateFlag = 1;
                    data.dateStar = $("#" + ($(this).attr("data-tar"))).data("DateTimePicker").date().format("YYYY-MM-DD");

                  }else if(tag == "button" && $(this).attr("data-range") == '1m'){
                    data.dateFlag = 2;
                    data.dateStar = $("#" + ($(this).attr("data-tar"))).data("DateTimePicker").date().format("YYYY-MM");
                  }
                  var fxType = $this.closest(".my-card-top").find(".tbhb-switch-box ul .active").text();
                  if ( fxType == "同比分析"){
                    apiUrl = "/api/CSInfo/expend/list1.json";
                  }else if (fxType =="环比分析") {
                    apiUrl = "/api/CSInfo/expend/list2.json";
                  }else{
                    apiUrl = "/api/CSInfo/expend/list1.json";
                  }
                
                
                  
                  var charts = $this.parents('.my-card').find('.chart-box').attr('id'); 
                  ajaxFn({url:apiUrl,data:data,parameter:{pointer:this,charts:charts,tag:tag,fn:fn,self:self,options:options,setDateFn:setDateFn},done:self.tbhbGhgForApi});
              });
        },
        ghnCallback: function (data,parameter) {
            var ghnChart
            parameter.options.chart.renderTo = parameter.id;
            parameter.options.lang.noData = '暂无数据';
            //parameter.options.yAxis.plotLines.value = [10,30];
            parameter.options.yAxis.plotLines[0].value = data.baseLines[0].vaule;
            parameter.options.yAxis.plotLines[1].value = data.baseLines[1].vaule;
            parameter.options.series[0].data = data.data;
            parameter.options.series[0].name = parameter.name;
            ghnChart = new Highcharts.Chart(parameter.options); 
        },
        //供耗能分析曲线
        modalLines: function (data,parameter) {
            var str;
            var gnfxLines;
            var body = $('#gnhnModalBody');
            body.empty();
            $.each(data, function(i,v) {
                  str = '<div class="gnhn-modal-block">'+
                        '<p class="gnhn-modal-title">'+v.name+'</p>'+
                        '<div class="gnhn-modal-charts" id="gnhnHaodianCharts'+i+'"></div>'+
                    '</div>';
                body.append(str);
                parameter.options.chart.renderTo = "gnhnHaodianCharts"+i;
                parameter.options.yAxis.plotLines[0].color = parameter.color;
                parameter.options.xAxis.categories = v.list[0].xData;
                parameter.options.series = v.list[0].sData;
                gnfxLines = new Highcharts.Chart(parameter.options); 
            });
        },
        //modalLines: function (data,parameter) {
            //var str;
            //var gnfxLines;
            //var body = $('#gnhnModalBody');
            //body.empty();
            //$.each(data, function(i,v) {
                  //str = '<div class="gnhn-modal-block">'+
                        //'<p class="gnhn-modal-title">'+v.title+'</p>'+
                        //'<div class="gnhn-modal-charts" id="gnhnHaodianCharts'+i+'"></div>'+
                    //'</div>';
                //body.append(str);
                //parameter.options.chart.renderTo = "gnhnHaodianCharts"+i;
                //parameter.options.yAxis.plotLines[0].color = parameter.color;
                //parameter.options.xAxis.categories = v.xData;
                //parameter.options.series = v.sData;
                //gnfxLines = new Highcharts.Chart(parameter.options); 
            //});
        //},
        //供能分析，耗能分析,诊断分析弹出框
        modalFn: function () {
            var $this = $(this)
              , title = $this.data('title')
              , num = $this.data('num')
              , modal = $("#myModal")
              ;
            if($this.hasClass('disableIcon')) return;
            modal.attr('data-num',num);
            modal.find('.modal-title').text(title);
			modal.modal({backdrop:"static"});//2015.12.16 xusheng

            modal.modal('show');
        },

		/*array 去重*/
		uniq: function(array) {
			var map = {};
			var re = [];
			for (var i = 0, l = array.length; i < l; i++) {
				if (typeof map[array[i]] == "undefined") {
					map[array[i]] = 1;
					re.push(array[i]);
				}
			}
			return re;
		},
		//单个对象格式化
		dateFormterItem: function(dateFlag, dateValue) {
			if (dateFlag == 1) {
				var tmp = dateValue.substring(11, 13);
				if (tmp.substring(0, 1) == '0') {
					tmp = tmp.substring(1, 2);
				}
				return tmp + '点';
			}
			if (dateFlag == 2) {
				var tmp = dateValue.substring(8, 10);
				if (tmp.substring(0, 1) == '0') {
					tmp = tmp.substring(1, 2);
				}
				return tmp + '日';
			}
			if (dateFlag == 3) {
				var tmp = dateValue.substring(5, 7);
				if (tmp.substring(0, 1) == '0') {
					tmp = tmp.substring(1, 2);
				}
				return tmp + '月';
			}
		},
	gnhnFn:	function (data, parameter) {
			var result = data.status.data;
            var self = parameter.self;
			//---------------总的页面----------------------
			//-------------------当日--------------------
			$.each(result, function(i, v) {
				//console.log(i)
				$.each(parameter.dir, function(k, p) {
					if (i === k) {
						switch (i) {
							case 'month':
								self.builtGhPage(v, p, parameter, 2,self);
								break;
							case 'year':
								self.builtGhPage(v, p, parameter, 3,self);
								break;
							default:
								self.builtGhPage(v, p, parameter, 1,self);
								break;
						}
					}
				})
			});
            var pp = [];
			for (var i = 0, l = parameter.popupFilter.length; i < l; i++) {
				for (var j = 0, k = 1; j < k; j++) {
                
                    var ii =  self.builtGhPopup(data, parameter.popupFilter[i][j], parameter.popupFilter[i][j + 1], parameter.popupFilter[i][j + 2],self,parameter);
                    pp.push(ii);
				}
			}
            return pp;
		},
       builtGhPopup: function (data,dateNew,dateOld,type,self,parameter){
//标示是详细页面那个模块的id(1当日详细2当月详细3昨日详细4当年详细)
            var moduleFlag = type +1;
            var dateFlag =  (moduleFlag === 3) ? 1 : moduleFlag && (moduleFlag === 4) ? 3 : moduleFlag; //当日和前日的dateFlag相同
            var today = data.status.data[''+dateNew+''].resList;
            var yestday = data.status.data[''+dateOld+''].resList;
			
			var todayData = self.dataFormater(today,self);

			var yestdayData = self.dataFormater(yestday,self);


			var resMap = [];
			$.each(todayData, function(i, v) {
				var list2 = new Array;
				$.each(yestdayData, function(y, m) {
					if (m.name == v.name) {
						list2 = m.list;
						//return false;
					}
				});
				var resList = self.returnResult(v.list, list2, dateFlag, moduleFlag,self);

				var item = new Object;
				item.name = v.name;
				item.list = resList;
				resMap.push(item);

			});
            switch (type) {
                case 0:
                    if (resMap.length === 0) self.checkPopup('#drgnsp', 0);
                    else self.checkPopup('#drgnsp', 1);
                    break;
                case 1:
                    if (resMap.length === 0) self.checkPopup('#dygnsp', 0);
                    else self.checkPopup('#dygnsp', 1);
                    break;
                case 2:
                    if (resMap.length === 0) self.checkPopup('#qrgnsp', 0);
                    else self.checkPopup('#qrgnsp', 1);
                    break;
                case 3:
                    if (resMap.length === 0) self.checkPopup('#dngnsp', 0);
                    else self.checkPopup('#dngnsp', 1);
                    break;
            }

            return [resMap,type];

		},

	checkPopup:	function (id, isShow) {
			if (isShow === 0) $(id).parent('.my-card').find('.gnhnIcon').addClass('disableIcon').tooltip('destroy');
			else if (isShow === 1) $(id).parent('.my-card').find('.gnhnIcon').removeClass('disableIcon').tooltip();
		},

	returnResult:function (realdata, olddata, dateFlag, moduleFlag,self) {
			var sData = new Array();
			var xData = new Array();
			var sDataElement = new Object();

			sDataElement.data = new Array();

			var sDataElementOld = new Object();

			sDataElementOld.data = new Array();
			var temp = new Object();

			if (moduleFlag == 1) {
				sDataElement.name = "今天";
				sDataElementOld.name = "昨天";
			}
			if (moduleFlag == 2) {
				sDataElement.name = "当月";
				sDataElementOld.name = "上月";
			}
			if (moduleFlag == 3) {
				sDataElement.name = "昨天";
				sDataElementOld.name = "前天";
			}
			if (moduleFlag == 4) {
				sDataElement.name = "当年";
				sDataElementOld.name = "去年";
			}

			//今年数据解析
			for (var i = 0; i < realdata.length; i++) {
				temp = new Object();
				temp.name = self.dateFormterItem(dateFlag, realdata[i].rectime);
				xData.push(temp.name);

				temp.y = parseFloat(realdata[i].datavalue);
				sDataElement.data.push(temp);
			}

			//去年数据解析
			for (var j = 0; j < olddata.length; j++) {
				temp = new Object();
				temp.name = self.dateFormterItem(dateFlag, olddata[j].rectime);
				xData.push(temp.name);
				temp.y = parseFloat(olddata[j].datavalue);
				sDataElementOld.data.push(temp);
			}

			sData.push(sDataElement);
			sData.push(sDataElementOld);

			xData = self.uniq(xData);

			var tmp = new Array();
			var item = {};

			item.xData = xData;
			item.sData = sData;

			tmp.push(item);
			return tmp;
		},



		//对LIst集合数据进行筛选取值，最终返回一个数组
	dataFormater:	function (data,self) {
			var resultMap = [];
			$.each(data, function(i, v) {
				var res = self.containsKey(resultMap, v.showname);
				if (res == undefined) {
					var list = new Array;
					list.push(v);
					var item = {};
					item.name = v.showname;
					item.list = list;
					resultMap.push(item)
				} else {
					res.push(v);
				}
			});
			return resultMap;
		},

		//判断map的Key是否存在
		containsKey:function (map, key) {
			var result;
			$.each(map, function(i, v) {
				if (v.name == key) {
					result = v.list;
				}
			});
			return result;
		},




	builtGhPage:	function (data, info, parameter, dateFlag,self) {
			var xData = new Array;
			var yestday = data;
			dataItem = new Array;
			$.each(yestday.totalData, function(i, v) {
				dataItem = new Array;
				dataItem.push(self.dateFormterItem(dateFlag, i));
				dataItem.push(v);
				xData.push(dataItem);
			});
			yestday.data = xData;

			var baseLines = new Array;
			var line = new Object;
            line.vaule = yestday.line; // 约束性指标
			baseLines.push(line);
			line = new Object;
            line.vaule = yestday.line1; // 引导性指标
			baseLines.push(line);

			yestday.baseLines = baseLines;

			parameter.id = info[0];
			parameter.name = info[1];
			self.ghnCallback(yestday, parameter);
		}
    }    
});
