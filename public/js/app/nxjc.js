
define(function(require){
    var 
        $ = require('jquery')
      , selectpicker = require('bootstrap-select')
	  , zh_cn = require('moment-zh-cn')
      , moment = require('moment')
      , datapicker = require('bootstrap-datetimepicker.min')
      , jsonpPath = require('app/getJsonp')
      , highcharts = require('app/card') 
      , options = require('app/highchartsConfig')
      , optionsDonut = require('app/highchartsConfigDonut')
      , optionsTwo = require('app/highchartsConfigColumnTwo')
	  , globalTools = require('app/globalTools')
	  , projectid = require('app/checkProjectid')
	  , api = require('app/getApi')
      ;
	  
      (function(){
	  //var dateStar ='2015-09-01' //moment().format('YYYY-MM-DD');
	  var dateStar =moment().format('YYYY-MM-DD');
	  var dateStarHour =moment().format('hh');
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
        demand.start({url:'/api/effiCheck/sysindex.json',data:{projectid:projectid,dateHour:'2015-07-01 15'},done:zbfxPie});

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
			
			var tempArr=new Array;
			$.each(data.status.data.list, function(i,item){
				var obj=new Object;
				obj.name=item.showname;
				obj.value=Math.round(item.dataVlue);
				tempArr.push(obj);
			});
            highchartsPieData = tempArr;
            
            $.each(data.status.data.list, function(i,v){
                switch(i) {
                    case 0: id = 'pieChart1'; pieColors = ['#7cc576', '#e8ebeb']; color = '#7cc576'; break; 
                    case 1: id = 'pieChart2'; pieColors = ['#1cbbb4', '#e8ebeb']; color = '#1cbbb4'; break; 
                    case 2: id = 'pieChart3'; pieColors = ['#00aeef', '#e8ebeb']; color = '#00aeef'; break; 
                    case 3: id = 'pieChart4'; pieColors = ['#a864a8', '#e8ebeb']; color = '#a864a8'; break; 
                }     
                zbfxName = v.showname;
                tempData = Math.round(v.dataVlue)>100?100:Math.round(v.dataVlue);
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
			$("text[y='152']").attr("y","165");
        }
      //耗能信息
// $('#hnxxSel').on('change', function(){
      // localJsonp.start({url:jsonpPath+'highchartsJson6.js',parameter:{id:'haonengCharts',options: optionsTwo},jsonpCallback:'highchartsJsonp6',done:highchartsGH});
// });
    demand.start({
		url:'/api/effiCheck/list1.json',
		parameter:{id:'haonengCharts',options: optionsTwo},
		data:{projectid:projectid,dateStar:dateStar},
		done:highchartsHaoN
	});

 //工艺系统效率下拉框
 demand.start({
		url:'/api/effiCheck/list3.json',
		parameter:{id:'gyxtxlSel'},
		done:function(data,parameter){
			if(data.status.data!="")
			{
				var res=new Array;
				var parameter = {};
				$.each(data.status.data.list,function(i,item){
					var itemSplitList=item.split(',');
					itemC = new Object;
					itemC.id = itemSplitList[0]+"-"+itemSplitList[2];
					itemC.selName = itemSplitList[1]+"-"+itemSplitList[3];
					res.push(itemC);
				});
				
				parameter.id="#gyxtxlSel";
				globalTools.selCallback(res, parameter);
				var itemTemp=$("#gyxtxlSel option:first").attr("id").split(',');
				demand.start({
					 url:'/api/effiCheck/list4.json',
					 parameter:{id:'gyxtxl',options: options},
					 data:{
						projectid:projectid,
						optionid1:itemTemp[0],
						optionid2:itemTemp[1],
						dateStar:dateStar
					 },
					 done:highchartsJsonp
				 });
			}
			else
			{
				var res=new Array;
				var parameter = {};
				globalTools.selCallback(res, parameter);
			}
		}
	});
	
	
	$('#gyxtxlSel').on('change', function(){
			var optionid1="",optionid2="";
			var optionList=$('#gyxtxlSel option:selected').attr("id").split('-');
			 demand.start({
				 url:'/api/effiCheck/list4.json',
				 parameter:{id:'gyxtxl',options: options},
				 data:{
					projectid:projectid,
					optionid1:optionList[0],
					optionid2:optionList[1],
					dateStar:dateStar
				 },
				 done:highchartsJsonp
			 });
	});
	function highchartsJsonp(data,parameter) {
			
		    var sData=[];
			var sArrNames=[];
			var currentValue=0;
			if(data.status.data!="")
			{
				$.each(data.status.data.list,function(i,item){
					sArrNames.push(item.showname);
				});
				$.unique(sArrNames);
				
				$.each(sArrNames,function(i,item){
					 var yItem=new Object;
					 var dataList=new Array();
					 var sumXiaolv=0;
					 for(var i=0;i<24;i++)
					 {
						$.each(data.status.data.list,function(j,item2){
							  if(item==item2.showname && item2.rectime.indexOf(dateStar+" "+(i<10)?("0"+i):(i+"")))
							  {
								  sumXiaolv+=Math.round(item2.dataVlue);
							  }
						 });
						 sumXiaolv=0;
						 dataList.push(sumXiaolv);
						 if((dateStarHour+"")==(i+""))
						 {
							 currentValue=sumXiaolv;
						 }
					 }
					 yItem.name=item;
					 yItem.data=dataList;
					 sData.push(yItem);
				});
			}
			$("#spgyxtxlSel").html(currentValue+"%");
            var chart
            options.series = sData;
			options.xAxis.categories=["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
            options.chart.renderTo = parameter.id;
            chart = new Highcharts.Chart(options); 
         }
      //供能信息
// $('#gnxxSel').on('change', function(){
      // localJsonp.start({url:jsonpPath+'highchartsJson5.js',parameter:{id:'gongnengCharts',options: optionsTwo},jsonpCallback:'highchartsJsonp5',done:highchartsGH});
// });
      demand.start({url:'/api/effiCheck/list2.json',
		parameter:{id:'gongnengCharts',options: optionsTwo},
		data:{
			projectid: projectid,
			dateStar:dateStar
		},
		done:highchartsGN
	  });
	  var sumGongNengTotal=[0,0,0];
	  function GetData(xData,resultList,parameter)
	  {
			sumGongNengTotal[0]=0;
			sumGongNengTotal[1]=0;
			sumGongNengTotal[2]=0;
			var sData=[];
			//var xData=[];
			
			$.unique(xData);
			$.each(xData,function(i,item){
				var yItem=new Object;
				var dataList=new Array();
				var sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 00"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 02"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 03"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 04"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 05"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 06"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 07"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 08"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 09"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 10"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 11"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 12"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 13"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 14"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 15"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 16"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 17"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 18"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 19"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 20"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 21"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 22"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 23"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				sum=0;
				$.each(resultList,function(j,item2){
					if(item==item2.showname && item2.rectime.indexOf(dateStar+" 24"))
					{
						sum+=parseFloat(item2.datavalue);
					}
				});
				sumGongNengTotal[i]+=sum;
				dataList.push(Math.round(sum));
				yItem.name=item;
				yItem.data=dataList;
				sData.push(yItem);
			});
			if(parameter.id=="gongnengCharts")
			{
				$("#spGonglengCount").html(Math.round(sumGongNengTotal[0])+"Kwh");
			}
			if(parameter.id=="haonengCharts")
			{
				$("#spHaonengCount").html(Math.round(sumGongNengTotal[0])+"Kwh");
			}
			var chartGH;
			
			parameter.options.series = sData;
			parameter.options.xAxis.categories=["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
			parameter.options.chart.renderTo = parameter.id;
			chartGH = new Highcharts.Chart(parameter.options); 
	  }
	  
	  
      function highchartsGN(data,parameter) {
		var xData=[];
		if(data.status.data!="")
		{
			// $.each(data.status.data.list,function(i,item){
				// xData.push(item.showname);
			// });
			var result=data.status.data.list;
			xData.push(result[0].showname);
			GetData(xData,result,parameter);
			$("#gnxxSel").on("change",function(){
				if($(this).val()==0)
				{
					xData=[];
					xData.push(result[0].showname);
					GetData(xData,result,parameter);
					$("#li_gnxxSel").html("供冷量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
				else
				{
					xData=[];
					xData.push(result[1].showname);
					GetData(xData,result,parameter);
					$("#li_gnxxSel").html("供热量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
			
			});
		}

      }
	  
	   function highchartsHaoN(data,parameter) {
	
		var xData=[];
		if(data.status.data!="")
		{
			// $.each(data.status.data.list,function(i,item){
				// xData.push(item.showname);
			// });
			var result=data.status.data.list;
			xData.push(result[0].showname);
			GetData(xData,result,parameter);
			$("#hnxxSel").on("change",function(){
				if($(this).val()==0)
				{
					xData=[];
					xData.push(result[0].showname);
					GetData(xData,result,parameter);
					$("#li_hnxxSel").html("耗水<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
				else if($(this).val()==2)
				{
					xData=[];
					xData.push(result[1].showname);
					GetData(xData,result,parameter);
					$("#li_hnxxSel").html("耗气<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
				else
				{
					xData=[];
					xData.push(result[2].showname);
					GetData(xData,result,parameter);
					$("#li_hnxxSel").html("耗电<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[2])+"Kwh</span>");
				}
			
			});
		}

      }

      }());
});

