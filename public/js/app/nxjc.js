
define(function(require){
    var 
       $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , highcharts = require('app/card') 
      , options = require('app/highchartsConfig')
      , optionsDonut = require('app/highchartsConfigDonut')
      , optionsTwo = require('app/highchartsConfigColumnTwo')
      ;
      (function(){
      //下拉选择
      $('.selectpicker').selectpicker({});

      //图表
      //系统指标
      var noBorder = { 
        states:{
            hover:{
                halo: {
                    size: 1
                }     
            }
        }
      };

        Highcharts.setOptions({
            colors: ['#1ca6c5', '#e8ebeb']
        });
        
        var highchartsPieData;
        localJsonp.start({url:jsonpPath+'highchartsPie.js',jsonpCallback:'highchartsPie',done:zbfxPie});
        function zbfxPie(data) {
            var id;
            var title;
            var zbfxCharts = $('.xtzb-charts').height(); 
            var subtitleY = zbfxCharts/1.2;
            var titleY =  zbfxCharts/ 2;
            var tempData;
            var zbfxData = []
            var zbfxName;
            var pieColors;
            var color;
            highchartsPieData = data;
            
            $.each(data, function(i,v){
                switch(i) {
                    case 0: id = 'pieChart1'; pieColors = ['#7cc576', '#e8ebeb']; color = '#7cc576'; break; 
                    case 1: id = 'pieChart2'; pieColors = ['#1cbbb4', '#e8ebeb']; color = '#1cbbb4'; break; 
                    case 2: id = 'pieChart3'; pieColors = ['#00aeef', '#e8ebeb']; color = '#00aeef'; break; 
                    case 3: id = 'pieChart4'; pieColors = ['#a864a8', '#e8ebeb']; color = '#a864a8'; break; 
                }     
                zbfxName = v.name == '可再生能源利用率' ? '可再生能源<br>利用率' : v.name;
                tempData = v.value;
                title = tempData + '<span style="font-size: 14px;">%</span>'; 
                zbfxData = [tempData,(100-tempData)]; 
                setPiecharts(id,title,zbfxName,titleY,subtitleY,zbfxData,pieColors,color);
            });
        }
        $(window).resize(function(){
            zbfxPie(highchartsPieData);
        });

        $('.card-button-resize-xtzb').on('click', function(){
                var $this = $(this)
                  ; 
                if(!$this.hasClass('card-button-resize-small')) {
                    $this.addClass('card-button-resize-small').parents('.my-card').siblings('.my-card').hide()
                           .end()
                           .removeClass('col-md-6 col-lg-6').addClass('col-md-12 col-lg-12')
                           .css({'height':'100%'})
                           .find('.xtzb-charts').each(function(){
                                    zbfxPie(highchartsPieData);
                               })
                    ; 
                } else {
                   $this.removeClass('card-button-resize-small').parents('.my-card').removeClass('col-md-12 col-lg-12').addClass('col-md-6 col-lg-6')
                       .css({'height':'50%'})
                       .find('.xtzb-charts').each(function(){
                                    zbfxPie(highchartsPieData);
                               })
                   ;
                   $this.parents('.my-card').siblings('.my-card').show()  
                   ;
                }
        });

        function setPiecharts(id,title,subtitle,titleY,subtitleY,data,pieColors,color) {
            optionsDonut.chart.renderTo = id;
            optionsDonut.title.text = title;
            optionsDonut.title.style.color = color;
            optionsDonut.subtitle.text = subtitle;
            optionsDonut.title.y = titleY;
            optionsDonut.subtitle.y = subtitleY; 
            optionsDonut.series[0].data = data;
            optionsDonut.colors = pieColors;
            var piecharts = new Highcharts.Chart(optionsDonut); 
        }

      //耗能信息
$('#hnxxSel').on('change', function(){
      localJsonp.start({url:jsonpPath+'highchartsJson6.js',parameter:{id:'haonengCharts',options: optionsTwo},jsonpCallback:'highchartsJsonp6',done:highchartsGH});
});
      localJsonp.start({url:jsonpPath+'highchartsJson6.js',parameter:{id:'haonengCharts',options: optionsTwo},jsonpCallback:'highchartsJsonp6',done:highchartsGH});
      //工艺系统效率
         localJsonp.start({url:jsonpPath+'highchartsJson.js',parameter:{id:'gyxtxl',options: options},jsonpCallback:'highchartsJsonp',done:highchartsJsonp});
            //renderTo: 'gyxtxl',
         function highchartsJsonp(data,parameter) {
            var chart
            options.series[0].data = data;
            options.chart.renderTo = parameter.id;
            chart = new Highcharts.Chart(options); 
         }

$('#gyxtxlSel').on('change', function(){
         localJsonp.start({url:jsonpPath+'highchartsJson2.js',parameter:{id:'gyxtxl'},jsonpCallback:'highchartsJsonp2',done:highchartsJsonp});
});
      //供能信息
$('#gnxxSel').on('change', function(){
      localJsonp.start({url:jsonpPath+'highchartsJson5.js',parameter:{id:'gongnengCharts',options: optionsTwo},jsonpCallback:'highchartsJsonp5',done:highchartsGH});
});
      localJsonp.start({url:jsonpPath+'highchartsJson5.js',parameter:{id:'gongnengCharts',options: optionsTwo},jsonpCallback:'highchartsJsonp5',done:highchartsGH});
      function highchartsGH(data,parameter) {
        var chartGH;
        parameter.options.series = data;
        parameter.options.chart.renderTo = parameter.id;
        chartGH = new Highcharts.Chart(parameter.options); 
      }

      }());
});
