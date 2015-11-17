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
           parameter.fn(parameter.id,data[0].baseLine,data[0].xData,data[0].sData,parameter.options);
        },
        tbhbLines: function(id,baseLine,xData,sData,options) {
              options.chart.renderTo = id;
              options.yAxis.plotLines.value = baseLine;
              options.xAxis.categories = xData;
              options.series = sData;
              chartLines = new Highcharts.Chart(options); 
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
        tbhbClick: function (name,tag,jsonpPath,jsonp,fn,ajaxFn,setDateFn,self,options) {
              $(name).find(tag).click(function(){
                  var $this = $(this)
                  var charts = $this.parents('.my-card').find('.chart-box').attr('id'); 
                  ajaxFn({url:jsonpPath+jsonp+'.js',parameter:{pointer:this,charts:charts,tag:tag,fn:fn,self:self,options:options,setDateFn:setDateFn},jsonpCallback:jsonp,done:self.tbhbGhg3});
              });
        }
    }    
});
