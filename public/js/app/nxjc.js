
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
	  //var dateStar ='2015-12-14' //moment().format('YYYY-MM-DD');
	  var dateStar =moment().format('YYYY-MM-DD');
	  var date = new Date ();
	  //var dateStar =moment().format('YYYY-MM-DD');
	  var dateStarHour =date.getHours();//moment().format('hh');
	  var dateHour="";
	  if(date.getHours ()-1<10)
	  {
		 dateHour=dateStar+" 0"+(date.getHours () - 1);
	  }
	  else
	  {
		  dateHour=dateStar+" "+(date.getHours () - 1);
	  }
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
        demand.start({url:'/api/effiCheck/sysindex.json',data:{projectid:projectid,dateHour:dateHour},done:zbfxPie});

        function zbfxPie(data) {
			setTimeout(function(){
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
				if(data.status==undefined  || data.status.data=="")
				{
					return;
				}
				
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
					if(id=="pieChart3")
					{
					
						// alert(GonglengTotal);
						// alert(GongreTotal);
						// alert(FadianTotal);
						// alert(HaoDianTotal);
						// alert(HaoQiTotal);
						if(GonglengTotal==0 && GongreTotal==0 && FadianTotal==0 && HaoDianTotal==0 && HaoQiTotal==0 )
						{
							tempData=0;
						}
						else
						{
							tempData=Math.round(((parseFloat(0.09*GonglengTotal)+ parseFloat(0.188*GongreTotal)+parseFloat(FadianTotal))/(parseFloat(HaoDianTotal)+parseFloat(6.22*HaoQiTotal)))*100);
						}
						
					}
					else{
						tempData = Math.round(v.dataVlue)>100?100:Math.round(v.dataVlue);
					}
					
					title = tempData + '<span style="font-size: 14px;">%</span>';
					zbfxData = [tempData,(100-tempData)]; 
					
					setPiecharts(id,title,zbfxName,titleY,subtitleY,zbfxData,pieColors,color);
				});
			}, 2000 );
           
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
					itemC.selName = itemSplitList[1];//+"-"+itemSplitList[3];
					res.push(itemC);
				});
				
				parameter.id="#gyxtxlSel";
				globalTools.selCallback(res, parameter);
				var itemTemp=$("#gyxtxlSel option:first").attr("id").split('-');
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
			var $this = $(this);
			var selected = $this.find('option:selected');
			$("#HiddengyxtxlSel").val(selected.text());
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
	var chartXiaolv;
	function highchartsJsonp(data,parameter) {
			var chartGH;
			console.info("data123");
			console.info(data);
			$("#HiddengyxtxlSel").val($("#gyxtxlSel option:selected").text());
		    var sData=[];
			var sArrNames=[];
			var currentValue=0;
			if(data.status.data!="")
			{
				// $.each(data.status.data.list,function(i,item){
					// sArrNames.push(item.showname);
				// });
				// $.unique(sArrNames);
				
				//$.each(sArrNames,function(i,item){
					 var yItem=new Object;
					 var dataList=new Array();
					 //var sumXiaolv=0;
					 // for(var i=0;i<24;i++)
					 // {
						var itemObj=new Object;
						var dataValArr=[];
						$.each(data.status.data.list,function(i,item){
							  // if(item.recTime.indexOf(dateStar+" "+(i<10)?("0"+i):(i+"")))
							  // {
								  //sumXiaolv+=Math.round(item.dataVlue);
							  // }
							  	
								
							  
							   dataValArr.push(Math.round(item.dataValue));
							   if((dateStarHour+"")==(i+""))
							   {
									currentValue=Math.round(item.dataValue);
							   }
						 });
						 itemObj.name=$("#HiddengyxtxlSel").val();
					
						 itemObj.data=dataValArr;
						 //sumXiaolv=0;
						 //dataList.push(sumXiaolv);
						 sData.push(itemObj);
						
					 //}
				//});
				$("#spgyxtxlSel").html(currentValue+"%");
				options.series = sData;
				options.xAxis.categories=["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
				options.chart.renderTo = parameter.id;
				options.exporting={enabled:false};
				chartGH=new Highcharts.Chart(options);

				return;
			}
			$("#spgyxtxlSel").html(0+"%");
			options.series[0] = {};
			options.chart.renderTo = parameter.id;
			options.exporting={enabled:false};
			chartGH=new Highcharts.Chart(options);
				//chart=null;
			
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
	  
	  var GonglengTotal=0;
	  var GongreTotal=0;
	  var FadianTotal=0;
	  var HaoShuiTotal=0;
	  var HaoQiTotal=0;
	  var HaoDianTotal=0;

	  
	  var sumGongNengTotal=[0,0,0];
	  function GetData(xData,resultList,parameter,uniteName)
	  {
			var sData=[];
			//var xData=[];
			$.unique(xData);
			
			var sum=0;
			$.each(xData,function(i,item){
				var yItem=new Object;
				var dataList=new Array();
				
				
					
					var i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 00"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 01"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 02"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 03"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 04"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 05"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 06"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 07"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 08"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 09"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 10"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 11"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 12"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 13"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 14"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 15"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 16"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 17"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 18"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 19"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 20"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 21"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 22"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 23"))
						{
							dataList.push(Math.round(resultList[i].datavalue));
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					if(i==resultList.length)
					{
						dataList.push(0);
					}
					i=0;

				yItem.name=item;
				yItem.data=dataList;
				sData.push(yItem);
			});
			if(parameter.id=="gongnengCharts")
			{
				sumGongNengTotal[0]=sum;
			}
			if(parameter.id=="haonengCharts")
			{
				sumGongNengTotal[0]=sum;
			}
			if(xData=="供冷")
			{
				$("#li_gnxxSel").html("供冷量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"【Kwh】</span>");
				GonglengTotal=Math.round(sumGongNengTotal[0]);
			}
			if(xData=="供热")
			{
				$("#li_gnxxSel").html("供热量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"【Kwh】</span>");
				GongreTotal=Math.round(sumGongNengTotal[0]);
			}
			if(xData=="发电")
			{
				$("#li_gnxxSel").html("发电量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"【Kwh】</span>");
				FadianTotal=Math.round(sumGongNengTotal[0]);
			}
			if(xData=="耗水")
			{
				$("#li_hnxxSel").html("耗水：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"【m3/h】</span>");
				HaoShuiTotal=Math.round(sumGongNengTotal[0]);
			}
			if(xData=="耗气")
			{
				$("#li_hnxxSel").html("耗气：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"【m3/h】</span>");
				HaoQiTotal=Math.round(sumGongNengTotal[0]);
			}
			if(xData=="耗电")
			{
				$("#li_hnxxSel").html("耗电：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"【Kwh】</span>");
				HaoDianTotal=Math.round(sumGongNengTotal[0]);
			}
			
			var chartGH;
			
			parameter.options.series = sData;
			parameter.options.yAxis.title.text = uniteName;
			parameter.options.xAxis.categories=["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
			parameter.options.chart.renderTo = parameter.id;
			chartGH = new Highcharts.Chart(parameter.options); 
	  }
	  

      function highchartsGN(data,parameter) {
		console.log("下拉框数据");
		console.info(data);
		
		var xData=[];
		if(data.status.data!="")
		{
			// $.each(data.status.data.list,function(i,item){
				// xData.push(item.showname);
			// });
			var result=data.status.data.list;
			xData.push("供冷");
			GetData(xData,result,parameter,"kwh");
			GetdataValue(["供冷"],result);
			GetdataValue(["供热"],result);
			GetdataValue(["发电"],result);

			$("#gnxxSel").on("change",function(){
				if($(this).val()==0)
				{
					xData=[];
					xData.push("供冷");
					GetData(xData,result,parameter,"kwh");
					//$("#li_gnxxSel").html("供冷量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
				else if($(this).val()==1)
				{
					xData=[];
					xData.push("供热");
					GetData(xData,result,parameter,"kwh");
					//$("#li_gnxxSel").html("供热量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
				else
				{
					xData=[];
					xData.push("发电");
					GetData(xData,result,parameter,"kwh");
					//$("#li_gnxxSel").html("发电量：<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
			
			});
		}
		else
		{
			GetData(xData,result,parameter,"");
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
			xData.push("耗气");
			GetData(xData,result,parameter,"m3/h");
			GetdataValue(["耗水"],result);
			GetdataValue(["耗气"],result);
			GetdataValue(["耗电"],result);
			$("#hnxxSel").on("change",function(){
				if($(this).val()==1)
				{
					xData=[];
					xData.push("耗水");
					GetData(xData,result,parameter,"m3/h");
					//$("#li_hnxxSel").html("耗水<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"m3/h</span>");
				}
				else if($(this).val()==0)
				{
					xData=[];
					xData.push("耗气");
					GetData(xData,result,parameter,"m3/h");
					//$("#li_hnxxSel").html("耗气<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"m3/h</span>");
				}
				else
				{
					xData=[];
					xData.push("耗电");
					GetData(xData,result,parameter,"kwh");
					
					//$("#li_hnxxSel").html("耗电<span class='navy' id='spGonglengCount'>"+Math.round(sumGongNengTotal[0])+"Kwh</span>");
				}
			
			});
		}
		else
		{
			GetData(xData,result,parameter,"");
		}
      }
		
	  
	  function GetdataValue(xData,resultList)
	  {
			var sum=0;
			$.each(xData,function(i,item){
					var i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 00"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 01"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 02"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 03"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 04"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 05"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 06"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 07"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 08"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 09"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 10"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 11"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 12"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 13"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 14"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 15"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 16"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 17"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 18"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 19"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 20"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 21"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 22"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					i=0;
					for(i=0;i<resultList.length;i++)
					{
						var rectime=resultList[i].rectime;
						var result=rectime.substring(0,rectime.indexOf(':'));
						if(item==resultList[i].showname && result==(dateStar+" 23"))
						{
							sum+=Math.round(resultList[i].datavalue);
							break;
						}	
					}
					
			});
			if(xData[0]=="供冷")
			{
				GonglengTotal=sum;
			}
			if(xData[0]=="供热")
			{
				GongreTotal=sum;
			}
			if(xData[0]=="发电")
			{
				FadianTotal=sum;
			}
			if(xData[0]=="耗水")
			{
				HaoShuiTotal=sum;
			}
			if(xData[0]=="耗电")
			{
				HaoDianTotal=sum;
			}
			if(xData[0]=="耗气")
			{
				HaoQiTotal=sum;
			}
	  }
	  
	  
      }());
});

