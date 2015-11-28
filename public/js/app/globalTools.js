define(function(require) {
    return {
        selectFn: function(el,si,re,ad) {
            var removeClassName = (re === undefined) ? 'active' : re;
            var addClassName = (ad === undefined) ? 'active' : ad;
            $(el).siblings(si).removeClass(removeClassName).end().addClass(addClassName); 
            return true;
        },
        selCallback: function(data,parameter) {
          var str; 
          $.each(data,function(i,v){
              str += '<option>'+v.selName+'</option>'
          });
          $(parameter.id).empty().append(str).selectpicker('refresh');
        },
        selFn: function(data,parameter) {
            parameter.fn(parameter.charts,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
        },
        tbhbCallback: function(data,parameter) {
            //console.log(parameter.id,data);
           //parameter.fn(parameter.id,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
           parameter.fn(parameter.id,0,data.xData,data.sData,parameter.options);
        },
        tbhbLines: function(id,baseLine,xData,sData,options) {
              var tbhbChartLines
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

            parameter.fn(parameter.charts,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
            parameter.self.selectFn(parameter.pointer,parameter.tag); 
            if(parameter.setDateFn == null) return;
            parameter.setDateFn.changeDate(parameter.pointer);       
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
        tbhbClick: function (name,tag,jsonpPath,jsonp,fn,ajaxFn,setDateFn,self,options) {
              $(name).find(tag).click(function(){
                  var $this = $(this)
                  var charts = $this.parents('.my-card').find('.chart-box').attr('id'); 
                  ajaxFn({url:jsonpPath+jsonp+'.js',parameter:{pointer:this,charts:charts,tag:tag,fn:fn,self:self,options:options,setDateFn:setDateFn},jsonpCallback:jsonp,done:self.tbhbGhg3});
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
            parameter.options.series[0].data = data;
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
                        '<p class="gnhn-modal-title">'+v.title+'</p>'+
                        '<div class="gnhn-modal-charts" id="gnhnHaodianCharts'+i+'"></div>'+
                    '</div>';
                body.append(str);
                parameter.options.chart.renderTo = "gnhnHaodianCharts"+i;
                parameter.options.yAxis.plotLines[0].color = parameter.color;
                parameter.options.xAxis.categories = v.xData;
                parameter.options.series = v.sData;
                gnfxLines = new Highcharts.Chart(parameter.options); 
            });
        },
        //供能分析，耗能分析弹出框
        modalFn: function () {
            var $this = $(this)
              , title = $this.data('title')
              , num = $this.data('num')
              , modal = $("#myModal")
              ;
            modal.attr('data-num',num);
            modal.find('.modal-title').text(title);
            modal.modal('show');
        }
    }    
});
