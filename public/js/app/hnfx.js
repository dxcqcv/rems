define(function(require) {
	var $ = require('jquery')
      , datapicker = require('bootstrap-datetimepicker.min')
      , bootstrap = require('bootstrap')
      , jsonpPath= require('app/getJsonp')
	  , highcharts = require('exporting')
      ;
    (function() {
    //弹出层
    $('.gnhnIcon').on('click', function() {
        var $this = $(this)
          , title = $this.data('title')
          , num = $this.data('num')
          , modal = $("#myModal")
          ;
        modal.attr('data-num',num);
        modal.find('.modal-title').text(title);
        modal.modal('show');
    });

    $('#myModal').on('shown.bs.modal', function(event) {
        localJsonp.start({url:jsonpPath+'xcharts.js',jsonpCallback:'xcharts',done:xcharts});
    }); 

    function xcharts(data) {
       	var tag;
        var c = $('.gnhn-modal-charts');    
        c.each(function(i, e) {
            options.chart.type= 'line';
            options.chart.renderTo = e;

            options.series[0] = data[0];
            options.series[1]= data[1];
            $.each(data[0]['data'], function (key, value) { 
            		//console.log(value);
                if ((value[1] - data[1]['data'][key][1]) > 113) {
			   		 tag = key; 
				}; 
						                       
	        });
            options.tooltip =  {
        	useHTML: true,
            formatter: function () {
            	
            if (this.points[0].key == tag) {
                var s = '<b>' + '<div style="color:red;background:#e5e5e5;">'+Highcharts.dateFormat('%A, %b %e, %Y', this.x) +'</div>'+ '耗电量</b>';
                $.each(this.points, function (key, value) {
                    if (key != 2) {
                        s += '<br/>' + this.series.options.name+ ':'+  this.y;
                    };  
                });	
            }else{
                var s = '<b>' + '<div style="">'+Highcharts.dateFormat('%A, %b %e, %Y', this.x) +'</div>'+ '耗电量</b>';
                $.each(this.points, function () {
                    s += '<br/>' + this.series.options.name+ ':'+ this.y;
                });
                                
            }
                //s+= '<br>差值: ' + ( this.points[0].y - this.points[1].y );
                return s;
            },
            shared:true,

        }
            chart = new Highcharts.Chart(options); 
            //chart.series[1].points[tag].setState('hover');
            chart.tooltip.refresh([chart.series[1].points[tag], chart.series[0].points[tag]]); 
        });
    }
    // tooltips
         $('[data-toggle="tooltip"]').tooltip();  
    //时间控件
       $('.datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD',
            defaultDate: new Date()
       });
        //图表
          var options = {
            chart: {
                renderTo: 'drgnsp',
                defaultSeriesType: 'column'
            },
            credits: {
                enabled: false
            },
            exporting: {
              enabled:false
            },
            title: {
                text: null 
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: null 
                }
            },
            series: [{}]
        };
         localJsonp.start({url:jsonpPath+'highchartsJson.js',jsonpCallback:'highchartsJsonp',done:highchartsJsonp});
         localJsonp.start({url:jsonpPath+'highchartsJson2.js',jsonpCallback:'highchartsJsonp2',done:highchartsJsonp2});
         localJsonp.start({url:jsonpPath+'highchartsJson3.js',jsonpCallback:'highchartsJsonp3',done:highchartsJsonp3});
         localJsonp.start({url:jsonpPath+'highchartsJson4.js',jsonpCallback:'highchartsJsonp4',done:highchartsJsonp4});
         function highchartsJsonp(data) {
            options.chart.renderTo = 'drgnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp2(data) {
            options.chart.renderTo = 'dygnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp3(data) {
            options.chart.renderTo = 'qrgnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }
         function highchartsJsonp4(data) {
            options.chart.renderTo = 'dngnsp';
            options.series[0].data = data;
            chart = new Highcharts.Chart(options); 
         }





    }());
});
