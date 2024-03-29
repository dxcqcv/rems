define(function(require){
    var $ = require('jquery')
      , projectid = require('app/checkProjectid')
      , highcharts = require('exporting') 
      , globalTools = require('app/globalTools')
      //, bootstrapTable = require('bootstrap-table')

      //, bsTableLocal = require('bootstrap-table-locale-all.min')
      , api = require('app/getApi')
      , optionsGyt = require('app/highchartsConfigGyt')
    ;
    (function(){
            
        //工艺图
        // 链接VPN数据
        var $doc = $(document)
          , contTitle = $('#contSubTitle') 
          , intervalGYTData1 // 工艺图分钟更新
          , intervalGYTData2 // 工艺图分钟更新
          , intervalGYTData3 // 工艺图分钟更新
          , sumProjectData =  {}
          , intervalWeather //小时刷新天气
          , intervalInnerRight //小时刷新内页供能耗能
          , intervalLeftRight // 小时刷新节能率等和成本收益
          , intervalIndex //小时刷新首页项目
          , isWan = null // 检查是不是超过万
          , globalMode = 1 // 默认供冷模式
          , modeDate = new Date()
          , modeMons = modeDate.getMonth()+1 
          , hoursUpdate = 3600000 
          , minsUpdate = 60000 
          , animcursor //切换特效
          , ajaxPath = '/jsonp/'
          ;
        var huanghuaArtwork = $('#huanghuaArtwork')
          , tinghuArtwork = $('#tinghuArtwork')
          , shenlongchengArtwork = $('#shenlongchengArtwork')
          , pageid
          ;
          //判断供冷供热季，1为供冷，0为供热
          if(modeMons >= 5 && modeMons <= 9) {
             globalMode = 1;
          } else if(modeMons >= 11 || modeMons <= 3) {
             globalMode = 0;
          }

    //projectid = '10';
        scaleGYT();
        $(window).resize(function(){
            scaleGYT();
        });
/*
用途:检验字符串是否为null
返回：为null返回为空，否则非空返回1位小数
*/
function checkNullandFixN(param,n){
	if(param==null||param=="null"){
		return '';
	}else
	{
		param=param*1;
		if(n=='1'){
		param=param.toFixed(1);
		}else
		if(n=='2'){
		param=param.toFixed(2);
		}else
		{
		param=param.toFixed(3);
		}
		return param;
	}
}

/**项目运营 时间解析处理**/
function dateInit(rectime){
	var a=[];
	var b=[];
	var c=[];
	a=rectime.split(" ");
	b=a[0].split("-");
	c=a[1].split(":");
	var myDate=null;
	if(c.length==3){
		myDate=new Date(b[0], b[1]-1, b[2]*1, c[0]*1, c[1]*1, c[2]*1);
	}else{
		myDate=new Date(b[0], b[1]-1, b[2]*1, c[0]*1, c[1]*1,0);
	}
	
	return myDate.getTime();
}

        function gytDynamicCharts(data,parameter) {
            if(data.status.data.length == 0) { console.log('动态数据为空'); return;}
            var linesObj = parameter.dataLines;
            var sName, sA = [];
            var propertyid = parameter.propertyid;
            $.each(data.status.data.list, function(i,v){
                for(var i = 0, l = parameter.dataLines.length; i < l; i++) {
                    if(propertyid[i] == v.classpropertyid) {
                        var val = checkNullandFixN(v.datavalue,2);
                        linesObj[i].push([dateInit(v.rectime),parseFloat(val)]); 
                    }
                }
            });
                for(var i = 0, l = parameter.dataLines.length; i < l; i++) {
                        sName = parameter.title[i];
                        var sObj = {
                            name: sName,
                            data: linesObj[i],
                        marker: { enabled: false }
                        };
                        sA.push(sObj);
                }

        optionsGyt.chart.renderTo = 'gytCharts'; 
        optionsGyt.title.text =  parameter.title;
        optionsGyt.subtitle.text = '动态属性1h实时数据对比'; 
        optionsGyt.yAxis.title.text = null;
        optionsGyt.series = sA;

        var gytCharts2 = new Highcharts.Chart(optionsGyt);
        }
        function dd3(data) {
            console.log('设备的最新数据');
            console.log(data);
        }
        /*
        projectid=1 对应pageid=100，projectid=3 对应pageid=101，projectid=4对应pageid=102
         * */
        //check project
        switch(projectid) { //复位为overview
            case '1': 
                $('#gytSidebar').removeClass('hide');
                showMe('#huanghuaArtwork');
                huanghuaPAFn();
                buildGytList(['huanghuaPA-A-三联供系统','huanghuaPB-B-直燃机系统','huanghuaPD-C-电制冷系统'])
                pageid = 100; 
                break;
            case '3': 
                $('#gytSidebar').removeClass('hide');
                showMe('#tinghuArtwork');
                tinghuPAFn();
                buildGytList(['tinghuPA-A-燃气三联供设备','tinghuPB-B-直燃机地源热泵','tinghuPD-C-燃气锅炉'])
                pageid = 101; 
                break;
            case '4': 
                $('#gytSidebar').removeClass('hide');
                showMe('#shenlongchengArtwork');
                shenlongchengPAFn();
                buildGytList(['shenlongchengPA-A-三联供系统','shenlongchengPB-B-电制冷系统','shenlongchengPC-C-燃气锅炉'])
                pageid = 102; 
                break;
            case '10': 
                $('#gytSidebar').removeClass('hide');
                showMe('#zhongdeArtwork');
                //改title
                zhongdePAFn();
                //buildGytList(['zhongdePA-A-三联供系统'])
                buildGytList(['zhongdePA-A-总览图'])
                pageid = 9541; 
                break;
            case '6': 
                $('#gytSidebar').removeClass('hide');
                showMe('#zhaoqingArtwork');
                zhaoqingPAFn();
                buildGytList(['zhaoqingPA-A-乙二醇系统','zhaoqingPB-B-冷却水系统','zhaoqingPC-C-冷冻水系统',])
                pageid = 9; 
                break;
            case '17': 
            default: 
                showMe('#defaultArtwork');
                $('#gytSidebar').addClass('hide');
                gytSelectFn(false,'#defaultArtwork','此站工艺图正在构建中。。。');
        }
        console.log('projectid ',projectid)
        console.log('pageid ',pageid)

if(pageid !==9){
    if(pageid == 101) {
        demand.start({url:'/api/techCheck/equLabellist.json',data:{projectid:projectid,pageid:pageid}, done:tinghuLabellistFn});
        demand.start({url:'/api/techCheck/equState.json',data:{projectid:projectid}, done:tinghuEquipStatFn});
        demand.start({url:'/api/techCheck/equDatas.json',data:{projectid:projectid,pageid:pageid}, done:tinghuLabeldataAllFn});
    } else if(pageid == 102)  {
        demand.start({url:'/api/techCheck/equLabellist.json',data:{projectid:projectid,pageid:pageid}, done:shenlongchengLabellistFn});
        demand.start({url:'/api/techCheck/equState.json',data:{projectid:projectid}, done:shenlongchengEquipStatFn});
        demand.start({url:'/api/techCheck/equDatas.json',data:{projectid:projectid,pageid:pageid}, done:shenlongchengLabeldataAllFn});
    } else {
        demand.start({url:'/api/techCheck/equLabellist.json',data:{projectid:projectid,pageid:pageid}, done:huanghAlabellistFn});
        demand.start({url:'/api/techCheck/equState.json',data:{projectid:projectid}, done:huanghuaEquipStatFn});
        demand.start({url:'/api/techCheck/equDatas.json',data:{projectid:projectid,pageid:pageid}, done:huanghuaAlabeldataAllFn});
    }
} 

$('.artwork-popup').on('click',function(){
    var classinstanceid = $(this).attr('data-classinstanceid');
    console.log(classinstanceid )
    //设备名
    demand.start({url:'/api/techCheck/insLabellist.json',parameter:{classinstanceid:classinstanceid},data:{classinstanceid:classinstanceid}, done:popupCallback});
    $('#gytModSel').children('li').on('click', function(){
        var $this = $(this);
        var dir = $this.data('dir');
        globalTools.selectFn($this,'li');
        $(dir).siblings('.gyt-mod-block').addClass('hide').end().removeClass('hide');
    });
});
function getListVal(data) {
    var allCheck = $('#gytDyList').find(':checkbox');
    $.each(allCheck,function(i,v){
        var el = $(v);
        var propertyid = el.data('classpropertyid');
        var value = el.parent('label').siblings('span');
        $.each(data.status.data.list,function(i,v){
            if(propertyid === v.classpropertyid) {
                if(v.classpropertyid === 166 && v.datavalue === 1) value.text('开机'); 
                else if(v.classpropertyid === 166 && v.datavalue === 0) value.text('关机'); 
                else value.text(v.datavalue1);
            }
        });
    });
}

function clickPopup(){}

        function buildGytList(listInfo) {
            var str = '';
            var regEx = new RegExp('<li class="list-group-item',i);
            for(var i = 0, l = listInfo.length; i < l; i++) str += '<li class="list-group-item '+listInfo[i].split('-')[0]+'">'+listInfo[i].split('-')[1]+' <span class="gyt-list-name">'+listInfo[i].split('-')[2]+'</span></li>';

            str = str.replace(regEx,'<li class="list-group-item active');
            $('#gyt-list').empty().append(str); 

        }
        function showMe(name) {
            $(name).siblings('div').addClass('hide').end().removeClass('hide');
        }
        function myTimeoutFn(fn, time,callback) {
            fn();
            checkCallbackFn(callback)
            var t = setTimeout(function(){myTimeoutFn(fn,time)}, time)
            return t;
        }
                //myTimeoutFn(test,60)
        var legendName0 = '当'
          , legendName1 = '年'
          , legendName2 = '月'
          , legendName3 = '日'
          , legendName4 = '成本'
          , legendName5 = '收益'
          , legendName6 = legendName0+legendName1+legendName4 //当年成本
          , legendName7 = legendName0+legendName2+legendName4 //当月成本
          , legendName8 = legendName0+legendName3+legendName4 //当日成本
          , legendName9 = legendName0+legendName1+legendName5 //当年收益
          , legendName10 = legendName0+legendName2+legendName5 // 当月收益
          , legendName11 = legendName0+legendName3+legendName5 // 当日收益
          ;

        // 日期备用
        var nowdate = new Date();
        var nowYear = nowdate.getFullYear();
        var nowMonth = nowdate.getMonth();
        var nowDay = nowdate.getDate();

        var jsonDataRight = {}; // 全局

        // 工艺图侧边栏
        $('.gyt-sidebar-title').on('click', function(){
            var $this = $(this);
            if(!$this.hasClass('gyt-sidebar-sm')) {
                $this.addClass('gyt-sidebar-sm');
                $('.gyt-sidebar').width(50); 
                $('.gyt-list-name').hide();
            } else {
                $this.removeClass('gyt-sidebar-sm'); 
                $('.gyt-sidebar').width('auto'); 
                $('.gyt-list-name').show();
            }
        });
        //工艺图弹出层
        $doc.on('click',':checkbox',function(){
            var $this = $(this);
            var instanceid = $this.data('classinstanceid'); 
            var propertyid = [], title = [], dataLines = [];
            //var title = $this.data('title');
            var allCheck = $(':checkbox');
            for(var i = 0, l = allCheck.length; i < l; i++) {
                if(allCheck[i].checked) {
                    title.push($(allCheck[i]).data('title')); 
                    propertyid.push($(allCheck[i]).data('classpropertyid')); 
                } 
            }
            for(var j = 0, k = propertyid.length; j < k; j++) {
                dataLines[j] = []; 
            }
            if(propertyid.length !== 0) {
                demand.start({url:'/api/techCheck/insDatas.json',loadContainer:[['.modal-content'],0],parameter:{title:title,dataLines: dataLines,propertyid:propertyid},data:{classinstanceid:instanceid ,classpropertyid:propertyid.toString() }, done:gytDynamicCharts});
            } else {
                 initGytCharts();   
            }
        });
        function popupCallback(data,parameter) {
        var str = '',modTitle, littleTitle,modal = $("#gytModal");
        $.each(data.status.data.dynamicProps, function(i,v){
            modTitle = v.classinstancename;
            littleTitle = v.classpropertyname;
            str += '<li>'+
                    '<div class="checkbox">'+
                    '<label><input type="checkbox" data-title="'+littleTitle+'" data-classinstanceid="'+v.classinstanceid+'"data-classpropertyid="'+v.classpropertyid+'">'+v.classpropertyname+'：</label>'+
                    '<span></span>'+
                    '<i> '+((v.unitname === "/") ? '' : v.unitname)+'</i>'+
                    '</div>'+
                    '</li>';
        });
        $('#gytDyList').empty().append(str);
        str = '';
            $('#gytModal').modal({
                backdrop: 'static' 
            });            
        str = '<tr>';
        $.each(data.status.data.staticProps,function(i,v){
            var val = v.datavalue;
            if(v.datavalue === null) val = '暂无数据';
            str += '<td>'+v.classpropertyname+'：'+val+'</td>';
            if((i+1)%2 === 0) str += '</tr><tr>';
        });
        str += '</tr>';
        $('#gytModTbody').empty().append(str);
        
        modal.find('.modal-title').text(modTitle);
        //弹出层图表
             initGytCharts();
        //设备值
        demand.start({url:'/api/techCheck/insData.json',data:{classinstanceid:parameter.classinstanceid}, done:getListVal});
        }
        function initGytCharts() {
            optionsGyt.chart.renderTo = 'gytCharts'; 
            optionsGyt.title.text =  '';
            optionsGyt.subtitle.text = '动态属性1h实时数据对比'; 
            optionsGyt.yAxis.title.text = '';
            optionsGyt.series = [{}];
            var gytCharts = new Highcharts.Chart(optionsGyt);
        }
        // 缩放工艺图
        function scaleGYT() {
            var winHeight, winWidth; 
            winHeight = $(window).height();
            winWidth= $(window).width();
            console.log('width',winWidth);
            console.log('height',winHeight );
            //var x = 5,radio = (winWidth /winHeight );
            var x = 4;
            //if(winHeight > 800 && winWidth > 1477) {
                //setTransform(4);
            //} else {
                //setTransform(2.5);
            //} 
            //else if(winHeight >= 627 && winHeight < 800 && winWidth >= 1141 && winWidth < 1477){
                //setTransform(2.7);
            //} else if(winHeight <= 600  && winWidth <= 1280) {
                //setTransform(2.1);
            //} else if(winHeight <= 768  && winWidth <= 1024) {
                //setTransform(2.1);
            //} else if(winHeight <= 600 && winWidth <= 800 ) {
                //setTransform(1.7);
            //}
            //
            //if(winHeight >= 800 || winWidth >= 1477) {
                //setTransform(4);
            //} else if(winHeight >= 627 && winHeight < 800 || winWidth >= 1141 && winWidth < 1477){
                //setTransform(2.5);
            //} else if(winHeight >= 458 && winHeight < 627 || winWidth >= 860 && winWidth < 1141) {
                //setTransform(2);
            //} else if(winHeight < 458 || winWidth < 860) {
                //setTransform(1);
            //}
            //
            //console.log(radio);
            while(x) {
                //if(winHeight > 900){
                    //$('.xa-con-cent').css({'transform':'scale(0.'+(x)+') translate(-50%, -50%)'});
                    //return;
                //}  
                //console.log(x)
                //if(x == 2) return; 
                //hight > 800 and height < 900, 8 9-4, 7 8-3, 6 7, 5 6, 4 5, 3 4,
                //width > 
                if( winHeight > parseInt((x+4)*100) && winHeight < parseInt((x+5)*100)) {
            //console.log('min',parseInt((x+4)*100));
            //console.log('max',parseInt((x+5)*100));
                //if(winWidth < 800 ) {
                    //x = 1.5;    
                //}
                    if(x >= 2) {
                        console.log('up',x);
                        //if(winHeight <= 653 && winWidth <=1024 ) {
                        if(winHeight <= 653 && winWidth <=1366){
                            if(projectid ==10 ||projectid ==17){
                                $('.xa-con-cent').css({'transform':'scale(0.3) translate(-50%, -50%)'});
                            }else {
                                $('.xa-con-cent').css({'transform':'scale(0.3) translate(-50%, -50%)'});
                            }
                        }
                        else if(winHeight <= 767 && winWidth <=1024 ) {
                        //console.log(1024);
                             if(projectid ==6) {
                        //console.log(666);
                                $('.xa-con-cent').css({'transform':'scale(0.37) translate(-50%, -50%)'});
                            } else if(projectid ==5) {
                                $('.xa-con-cent').css({'transform':'scale(0.3) translate(-50%, -50%)'});
                            } else {
                        //console.log('pid',projectid );
                        //console.log(777);
                                $('.xa-con-cent').css({'transform':'scale(0.25) translate(-50%, -50%)'});
                            }
                        } else {
                        //任何
                            if(projectid ==6) {
                                $('.xa-con-cent').css({'transform':'scale(0.4) translate(-50%, -50%)'});
                            } else if(projectid ==10 ||projectid ==17){
                                console.log('zhongde');
                                $('.xa-con-cent').css({'transform':'scale(0.35) translate(-50%, -50%)'});
                            
                            } else {
                                $('.xa-con-cent').css({'transform':'scale(0.'+(x)+') translate(-50%, -50%)'});
                            }
                        }
                        //if(winHeight <= 767 && winWidth <=1366) {
                        
                        //}
                    } else {
                        console.log('down',x);
                        
                        if(!(winHeight < 534) ) {
        //console.log(9999);
                            if(winHeight <= 599 && winWidth <= 800 ) {
                                $('.xa-con-cent').css({'transform':'scale(0.2) translate(-50%, -50%)'});
                            } else {
                            
                                $('.xa-con-cent').css({'transform':'scale(0.25) translate(-50%, -50%)'});
                            }
                        } else {
                            $('.xa-con-cent').css({'transform':'scale(0.2) translate(-50%, -50%)'});
                        }
                    }
                }  
                x--;
            }
                        if(winHeight <= 380 && winWidth<= 733) {
                            $('.xa-con-cent').css({'transform':'scale(0.15) translate(-50%, -50%)'});
                        }
                        if(winHeight > 900 ) {

                            if(projectid ==6) {
                                $('.xa-con-cent').css({'transform':'scale(0.53) translate(-50%, -50%)'});
                            } else if(projectid ==10 ||projectid ==17 ) {
                                $('.xa-con-cent').css({'transform':'scale(0.45) translate(-50%, -50%)'});
                            }
                            else {
                                $('.xa-con-cent').css({'transform':'scale(0.4) translate(-50%, -50%)'});
                            }
                        }
                        //if(!(winHeight <= 380 && winWidth<= 733)) {
                        //console.log(888)
                        
                            //$('.xa-con-cent').css({'transform':'scale(0.2) translate(-50%, -50%)'});
                        //} else {
                        //console.log(555)
                            //$('.xa-con-cent').css({'transform':'scale(0.15) translate(-50%, -50%)'});
                        //}
        }
        //function setTransform(v) {
            //$('.xa-con-cent').css({'transform':'scale(0.'+(v)+') translate(-50%, -50%)'});
        //}




        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
        }

        function filterUnit(dig) {// 过滤万分位
            var max = null
              , flag = null
              , newArray = [];
            if(Object.prototype.toString.call(dig) == '[object Array]') { //判断为array
               max = getMaxOfArray(dig); 
               flag = 1;
            } else {
                max = Number(dig);
                flag = null;
            }
                        

            /*
            */
            if(Number(max) > 10000 ) { // max大于1W
                isWan = 1; //全局flag
                if(flag === 1) { // 是否为array
                   $.each(dig, function(index, value) {
                       newArray[index] = Number(value/10000).toFixed(1); //保留1位小数
                   }); 
                   
                    return  newArray;
                } else {
                    return Number(dig/10000).toFixed(1); //保留1位小数
                }
            }
            else {
                isWan = null;
                return dig;
            }

        }

        /* 工艺图 */
        $doc.on('click', '.huanghuaPA', huanghuaPAFn)
            .on('click', '.huanghuaPB', huanghuaPBFn)
            .on('click', '.huanghuaPC', huanghuaPCFn)
            .on('click', '.huanghuaPD', huanghuaPDFn)
            .on('click', '.tinghuPA', tinghuPAFn)
            .on('click', '.tinghuPB', tinghuPBFn)
            .on('click', '.tinghuPC', tinghuPCFn)
            .on('click', '.tinghuPD', tinghuPDFn)
            .on('click', '.zhaoqingPA', zhaoqingPAFn)
            .on('click', '.zhaoqingPB', zhaoqingPBFn)
            .on('click', '.zhaoqingPC', zhaoqingPCFn)
            .on('click', '.shenlongchengPA', shenlongchengPAFn)
            .on('click', '.shenlongchengPB', shenlongchengPBFn)
            .on('click', '.shenlongchengPC', shenlongchengPCFn)
            .on('click', '.huanghua-thumbnail', huanghuaFirst) 
            .on('click', '.tinghu-thumbnail', tinghuFirst) 
            .on('click', '.shenlongcheng-thumbnail', shenlongchengFirst); 
            //浮动框
            var w992 = $('#widgetid992')  
              , w993 = $('#widgetid993')  
              , w999 = $('#widgetid999')  
              , w1000 = $('#widgetid1000')  
              , w994 = $('#widgetid994')  
              , w995 = $('#widgetid995')  
              , w975 = $('#widgetid975')  
              , w976 = $('#widgetid976')  
              , w977 = $('#widgetid977')  
              , w978 = $('#widgetid978')  
              , w974 = $('#widgetid974')  
              , w1001 = $('#widgetid1001')  
              , w973= $('#widgetid973') // 黄花A区  
              , w996= $('#widgetid996')   
              , w997= $('#widgetid997')   
              , w968= $('#widgetid968')   
              , w969= $('#widgetid969')   
              , w983= $('#widgetid983')   
              , w984= $('#widgetid984')   
              , w985= $('#widgetid985')   
              , w986= $('#widgetid986')   
              , w987= $('#widgetid987')   
              , w966= $('#widgetid966')   
              , w967= $('#widgetid967')   
              , w979= $('#widgetid979')   
              , w980= $('#widgetid980')   
              , w981= $('#widgetid981')   
              , w982= $('#widgetid982')   
              , w988= $('#widgetid988')   
              , w990= $('#widgetid990')   
              , w991= $('#widgetid991')   
              // 神农城
              , w1090= $('#widgetid1090') // 神农城A余热直燃机   
              , w1092= $('#widgetid1092') // 神农城C燃气锅炉
              //亭湖
              , w1025= $('#widgetid1025') //亭湖A   
              , w1040= $('#widgetid1040')   
              , w1016= $('#widgetid1016')   
              , w1029= $('#widgetid1029')   
              , w1041= $('#widgetid1041')   
              , w1022= $('#widgetid1022')   
              , w1023= $('#widgetid1023')   
              , w1030= $('#widgetid1030')   
              , w1037= $('#widgetid1037')   
              , w1046= $('#widgetid1046')   
              , w1027= $('#widgetid1027') // 153   
              , w1028= $('#widgetid1028')   
              , w1042= $('#widgetid1042')   
              , w1043= $('#widgetid1043')   
              , w1031= $('#widgetid1031') //151  
              , w1032= $('#widgetid1032') //151  
              , w1047= $('#widgetid1047') //151  
              , w1048= $('#widgetid1048') //151  
              , w1026= $('#widgetid1026') //155  
              , w1049= $('#widgetid1049') //155  
              , w1056= $('#widgetid1056') //156   
              , w1057= $('#widgetid1057')  // 156 
              , w1052= $('#widgetid1052') // 154   
              , w1053= $('#widgetid1053')   
              , w1054= $('#widgetid1054')   
              , w1055= $('#widgetid1055')   
              //中德
              , w28025= $('#widgetid28025')   
              , w28026= $('#widgetid28026')
              , w28018= $('#widgetid28018')
              , w28020= $('#widgetid28020')
              , w28089= $('#widgetid28089')
              , w28091= $('#widgetid28091')

              ;

        if(globalMode === 0) { //供热
        //黄花A区1or2号余热直燃机
            w985.show()
            w981.show()
            w982.hide()
            w986.hide()
        //黄花B区
            w977.show()
            w978.hide()
            //亭湖BC
            w1043.hide()
            w1042.show()

            w1053.hide()
            w1052.show()

            w1047.show()
            w1048.hide()

        } else if(globalMode === 1) { //供冷
        //黄花A区1or2号余热直燃机
            w985.hide()
            w981.hide()
            w982.show()
            w986.show()
        //黄花B区
            w977.hide()
            w978.show()
            //亭湖BC
            w1043.show()
            w1042.hide()

            w1052.hide()
            w1053.show()
            
            w1047.hide()
            w1048.show()
        } 
        function huanghuaFirst() {
            //gytSelectFn(false,'#huanghuaOverview', '黄花工艺设计图',[-1]);//-1为空
            gytSelectFn(false,'#huanghuaOverview', '黄花工艺设计图',[0]);//-1为空
            huanghuaArtwork.height(1434);
        }
        function tinghuFirst() {
            gytSelectFn(false,'#tinghuOverview', '亭湖工艺设计图',[-1]);//-1为空
            //tinghuArtwork.height(2027);
            tinghuArtwork.height(1718);
        }
        function shenlongchengFirst() {
            gytSelectFn(false,'#shenlongchengOverview', '神农城工艺设计图',[-1]);//-1为空
            shenlongchengArtwork.height(1718);
        }

        //180,157,152,//无181,182,161,162,154,156,183,184//153,151,155
        function tinghuLabellistFn(data) {
            $.each(data.status.data.list,function(index, value){
                if(value.widgetid === 1025) {
                    widgetidFn(1,w1025,[value.title,value.units])
                } else if(value.widgetid === 1040) {
                    widgetidFn(1,w1040,[value.title,value.units])
                }
                else if(value.widgetid === 1016) {
                    widgetidFn(1,w1016,[value.title,value.units])
                }
                else if(value.widgetid === 1029) {
                    widgetidFn(1,w1029,[value.title,value.units])
                }
                else if(value.widgetid === 1041) {
                    widgetidFn(1,w1041,[value.title,value.units])
                }
                else if(value.widgetid === 1022) {
                    widgetidFn(1,w1022,[value.title,value.units])
                }
                else if(value.widgetid === 1023) {
                    widgetidFn(1,w1023,[value.title,value.units])
                }
                else if(value.widgetid === 1030) {
                    widgetidFn(1,w1030,[value.title,value.units])
                }
                else if(value.widgetid === 1037) {
                    widgetidFn(1,w1037,[value.title,value.units])
                }
                else if(value.widgetid === 1046) {
                    widgetidFn(1,w1046,[value.title,value.units])
                }
                /*
                else if(value.widgetid === 1027) { //153
                    widgetidFn(1,w1027,[value.title,value.units])
                }
                else if(value.widgetid === 1028) {
                    widgetidFn(1,w1028,[value.title,value.units])
                }
                */
                else if(value.widgetid === 1042) {
                    widgetidFn(1,w1042,[value.title,value.units])
                }
                else if(value.widgetid === 1043) {
                    widgetidFn(1,w1043,[value.title,value.units])
                }
                else if(value.widgetid === 1031) {
                    widgetidFn(1,w1031,[value.title,value.units])
                }
                else if(value.widgetid === 1032) {
                    widgetidFn(1,w1032,[value.title,value.units])
                }
                else if(value.widgetid === 1047) {
                    widgetidFn(1,w1047,[value.title,value.units])
                }
                else if(value.widgetid === 1048) {
                    widgetidFn(1,w1048,[value.title,value.units])
                }
                else if(value.widgetid === 1026) { //155
                    widgetidFn(1,w1026,[value.title,value.units])
                }
                else if(value.widgetid === 1049) { //155
                    widgetidFn(1,w1049,[value.title,value.units])
                }
                else if(value.widgetid === 1056) { //156
                    widgetidFn(1,w1056,[value.title,value.units])
                }
                else if(value.widgetid === 1057) { //156 classinstanceid
                    widgetidFn(1,w1057,[value.title,value.units])
                }
                else if(value.widgetid === 1052) { //154 classinstanceid
                    widgetidFn(1,w1052,[value.title,value.units])
                }
                else if(value.widgetid === 1053) { //154 classinstanceid
                    widgetidFn(1,w1053,[value.title,value.units])
                }
                /*
                else if(value.widgetid === 1054) { //154 classinstanceid
                    widgetidFn(1,w1054,[value.title,value.units])
                }
                else if(value.widgetid === 1055) { //154 classinstanceid
                    widgetidFn(1,w1055,[value.title,value.units])
                }
                */
            });
            //demand.start({url:'http://10.36.128.73:8080/reds/ds/labeldataAll?pageid=101', jsonp: 'labeldataAll',done:tinghuLabeldataAllFn});
            //localJsonp.start({url:ajaxPath+'labeldataAll101.js', jsonpCallback: 'labeldataAll',done:tinghuLabeldataAllFn});
        }
        function tinghuLabeldataAllFn(data) {
        console.log('label data all fn',data)
            //console.log(data);
            if(data.status.data.length ===0) { console.log('工艺图属性名接口列表为空'); return; }
            $.each(data.status.data.list, function(index, value) {
            //$.each(data, function(index, value) {
                if(value.widgetid === 1025 ) {
                    widgetidFn(0,w1025 ,[value.datavalue])
                } else if(value.widgetid === 1040 ) {
                    widgetidFn(0,w1040 ,[value.datavalue])
                }
                    /*
                else if(value.widgetid === 1016 ) {
                    widgetidFn(0,w1016 ,[value.datavalue])
                }
                */
                else if(value.widgetid === 1029 ) {
                    widgetidFn(0,w1029 ,[value.datavalue])
                }
                else if(value.widgetid === 1041 ) {
                    widgetidFn(0,w1041 ,[value.datavalue])
                }
                /*
                else if(value.widgetid === 1022) {
                    widgetidFn(0,w1022,[value.datavalue])
                }
                else if(value.widgetid === 1023) {
                    widgetidFn(0,w1023,[value.datavalue])
                }
                */
                else if(value.widgetid === 1030) {
                    widgetidFn(0,w1030,[value.datavalue])
                }
                else if(value.widgetid === 1037) {
                    widgetidFn(0,w1037,[value.datavalue])
                }
                else if(value.widgetid === 1046) {
                    widgetidFn(0,w1046,[value.datavalue])
                }
                else if(value.widgetid === 1027) {
                    widgetidFn(0,w1027,[value.datavalue])
                }
                else if(value.widgetid === 1028) {
                    widgetidFn(0,w1028,[value.datavalue])
                }
                else if(value.widgetid === 1042) {
                    widgetidFn(0,w1042,[value.datavalue])
                }
                else if(value.widgetid === 1043) {
                    widgetidFn(0,w1043,[value.datavalue])
                }
                /*
                else if(value.widgetid === 1031) {
                    widgetidFn(0,w1031,[value.datavalue])
                }
                else if(value.widgetid === 1032) {
                    widgetidFn(0,w1032,[value.datavalue])
                }
                */
                else if(value.widgetid === 1047) {
                    widgetidFn(0,w1047,[value.datavalue])
                }
                else if(value.widgetid === 1048) {
                    widgetidFn(0,w1048,[value.datavalue])
                }
                else if(value.widgetid === 1026) {
                    widgetidFn(0,w1026,[value.datavalue])
                }
                else if(value.widgetid === 1049) {
                    widgetidFn(0,w1049,[value.datavalue])
                }
                else if(value.widgetid === 1056) { //156
                    widgetidFn(0,w1056,[value.datavalue])
                }
                else if(value.widgetid === 1057) { //156 classinstanceid
                    widgetidFn(0,w1057,[value.datavalue])
                }
                else if(value.widgetid === 1052) { //154 classinstanceid
                    widgetidFn(0,w1052,[value.datavalue])
                }
                else if(value.widgetid === 1053) { //154 classinstanceid
                    widgetidFn(0,w1053,[value.datavalue])
                }
                /*
                else if(value.widgetid === 1054) { //154 classinstanceid
                    widgetidFn(0,w1054,[value.datavalue])
                }
                else if(value.widgetid === 1055) { //154 classinstanceid
                    widgetidFn(0,w1055,[value.datavalue])
                }
                */
            });
        }
        function shenlongchengLabellistFn(data) {
            $.each(data.status.data.list,function(index, value){
            //$.each(data,function(index, value){
                if(value.widgetid === 1090) {
                    widgetidFn(1,w1090,[value.title,value.units])
                } else if(value.widgetid === 1092) {
                    widgetidFn(1,w1092,[value.title,value.units])
                }
            });
            //demand.start({url:'http://10.36.128.73:8080/reds/ds/labeldataAll?pageid=102', jsonp: 'labeldataAll',done:shenlongchengLabeldataAllFn});
            //localJsonp.start({url:ajaxPath+'labeldataAll102.js', jsonpCallback: 'labeldataAll',done:shenlongchengLabeldataAllFn});
        }
        function shenlongchengLabeldataAllFn(data) {
        console.log('label data all fn',data)
            //console.log(data);
            if(data.status.data.length ===0) { console.log('工艺图属性名接口列表为空'); return; }
            $.each(data.status.data.list, function(index, value) {
            //$.each(data, function(index, value) {
                if(value.widgetid === 1090) {
                    widgetidFn(0,w1090,[value.datavalue])
                } else if(value.widgetid === 1092) {
                    widgetidFn(0,w1092,[value.datavalue])
                }
            });
        }
        function widgetidFn(type,name,value) {
            var t = type
            if(t === 1) { // 1为属性名和单位
                name.children('span.name').text(value[0]+'：').end().children('span.units').text(value[1])
            } else if( t === 0) { // 0为值
                name.children('span.value').text(value[0])
            }
        }
        function huanghAlabellistFn(data) {
        console.log('label list ',data)
            $.each(data.status.data.list,function(index, value){
            //中德站工艺图数据
                if(value.widgetid === 28025) {
                    widgetidFn(1,w28025,[value.title,value.units])
                } else if(value.widgetid === 28026) {
                    widgetidFn(1,w28026,[value.title,value.units])
                } else if(value.widgetid === 28018) {
                    widgetidFn(1,w28018,[value.title,value.units])
                } else if(value.widgetid === 28020) {
                    widgetidFn(1,w28020,[value.title,value.units])
                } else if(value.widgetid === 28089) {
                    widgetidFn(1,w28089,[value.title,value.units])
                } else if (value.widgetid === 28091) {
                    widgetidFn(1,w28091,[value.title,value.units])
            //中德数据结束
                } else if(value.widgetid === 992) {
                    widgetidFn(1,w992,[value.title,value.units])
                } else if(value.widgetid === 993) {
                    widgetidFn(1,w993,[value.title,value.units])
                }
                else if(value.widgetid === 999) {
                    widgetidFn(1,w999,[value.title,value.units])
                }
                else if(value.widgetid === 1000) {
                    widgetidFn(1,w1000,[value.title,value.units])
                }
                else if(value.widgetid === 994) {
                    widgetidFn(1,w994,[value.title,value.units])
                }
                /*
                else if(value.widgetid === 995) {
                    widgetidFn(1,w995,[value.title,value.units])
                }
                else if(value.widgetid === 975) {
                    widgetidFn(1,w975,[value.title,value.units])
                }
                else if(value.widgetid === 976) {
                    widgetidFn(1,w976,[value.title,value.units])
                }
                */
                else if(value.widgetid === 977) {
                    widgetidFn(1,w977,[value.title,value.units])
                }
                else if(value.widgetid === 978) {
                    widgetidFn(1,w978,[value.title,value.units])
                }
                else if(value.widgetid === 974) {
                    widgetidFn(1,w974,[value.title,value.units])
                }
                else if(value.widgetid === 1001) {
                    widgetidFn(1,w1001,[value.title,value.units])
                }
                /*
                else if(value.widgetid === 973) {
                    widgetidFn(1,w973,[value.title,value.units])
                }
                */
                else if(value.widgetid === 996) {
                    widgetidFn(1,w996,[value.title,value.units])
                }
                else if(value.widgetid === 997) {
                    widgetidFn(1,w997,[value.title,value.units])
                }
                else if(value.widgetid === 968) {
                    widgetidFn(1,w968,[value.title,value.units])
                }
                else if(value.widgetid === 969) {
                    widgetidFn(1,w969,[value.title,value.units])
                }
                else if(value.widgetid === 983) {
                    widgetidFn(1,w983,[value.title,value.units])
                }
                else if(value.widgetid === 984) {
                    widgetidFn(1,w984,[value.title,value.units])
                }
                else if(value.widgetid === 985) {
                    widgetidFn(1,w985,[value.title,value.units])
                }
                else if(value.widgetid === 986) {
                    widgetidFn(1,w986,[value.title,value.units])
                }
                else if(value.widgetid === 987) {
                    widgetidFn(1,w987,[value.title,value.units])
                }
                /*
                else if(value.widgetid === 966) {
                    widgetidFn(1,w966,value.title,value.units)
                }
                else if(value.widgetid === 967) {
                    widgetidFn(1,w967,value.title,value.units)
                }
                else if(value.widgetid === 979) {
                    widgetidFn(1,w979,value.title,value.units)
                }
                else if(value.widgetid === 980) {
                    widgetidFn(1,w980,value.title,value.units)
                }
                */
                else if(value.widgetid === 981) {
                    widgetidFn(1,w981,[value.title,value.units])
                }
                else if(value.widgetid === 982) {
                    widgetidFn(1,w982,[value.title,value.units])
                }
                else if(value.widgetid === 988) {
                    widgetidFn(1,w988,[value.title,value.units])
                }
                else if(value.widgetid === 990) {
                    widgetidFn(1,w990,[value.title,value.units])
                }
                else if(value.widgetid === 991) {
                    widgetidFn(1,w991,[value.title,value.units])
                }
            });
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/labeldataAll?pageid=100', jsonp: 'labeldataAll',done:huanghuaAlabeldataAllFn});
            //localJsonp.start({url:ajaxPath+'labeldataAll100.js', jsonpCallback: 'labeldataAll',done:huanghuaAlabeldataAllFn});
            //demand.start({url:'/api/techCheck/equDatas.json',data:{projectid:1,pageid:100}, done:huanghuaAlabeldataAllFn});
        }
        function huanghuaAlabeldataAllFn(data) {
        console.log('label data all fn',data)
            //console.log(data);
            if(data.status.data.length ===0) { console.log('工艺图属性名接口列表为空'); return; }
            $.each(data.status.data.list, function(index, value) {
                if(value.widgetid === 992) {
                    widgetidFn(0,w992,[value.datavalue])
                } else if(value.widgetid === 993) {
                    widgetidFn(0,w993,[value.datavalue])
                }
                //中德开始
                else if(value.widgetid === 28089) {
                    widgetidFn(0,w28089,[value.datavalue])
                }
                else if(value.widgetid === 28091) {
                    widgetidFn(0,w28091,[value.datavalue])
                }
                else if(value.widgetid === 28026) {
                    widgetidFn(0,w28026,[value.datavalue])
                }
                else if(value.widgetid === 28025) {
                    widgetidFn(0,w28025,[value.datavalue])
                }
                else if(value.widgetid === 28018) {
                    widgetidFn(0,w28018,[value.datavalue])
                }
                else if(value.widgetid === 28020) {
                    widgetidFn(0,w28020,[value.datavalue])
                }
                //中德结束
                /*
                else if(value.widgetid === 973) {
                    widgetidFn(0,w973,[value.datavalue])
                }
                */
                else if(value.widgetid === 999) {
                    widgetidFn(0,w999,[value.datavalue])
                }
                else if(value.widgetid === 1000) {
                    widgetidFn(0,w1000,[value.datavalue])
                }
                else if(value.widgetid === 994) {
                    widgetidFn(0,w994,[value.datavalue])
                }
                else if(value.widgetid === 995) {
                    widgetidFn(0,w995,[value.datavalue])
                }
                else if(value.widgetid === 975) {
                    widgetidFn(0,w975,[value.datavalue])
                }
                else if(value.widgetid === 976) {
                    widgetidFn(0,w976,[value.datavalue])
                }
                else if(value.widgetid === 977) {
                    widgetidFn(0,w977,[value.datavalue])
                }
                else if(value.widgetid === 978) {
                    widgetidFn(0,w978,[value.datavalue])
                }
                else if(value.widgetid === 974) {
                    widgetidFn(0,w974,[value.datavalue])
                }
                else if(value.widgetid === 1001) {
                    widgetidFn(0,w1001,[value.datavalue])
                }
                /*
                else if(value.widgetid === 973) {
                    widgetidFn(0,w973,[value.datavalue])
                }
                */
                else if(value.widgetid === 996) {
                    widgetidFn(0,w996,[value.datavalue])
                }
                else if(value.widgetid === 997) {
                    widgetidFn(0,w997,[value.datavalue])
                }
                /*
                else if(value.widgetid === 968) {
                    w968.children('span.value').text(value.datavalue)
                }
                else if(value.widgetid === 969) {
                    w969.children('span.value').text(value.datavalue)
                }
                else if(value.widgetid === 983) {
                    w983.children('span.value').text(value.datavalue)
                }
                else if(value.widgetid === 984) {
                    w984.children('span.value').text(value.datavalue)
                }
                */
                else if(value.widgetid === 985) {
                    widgetidFn(0,w985,[value.datavalue])
                }
                else if(value.widgetid === 986) {
                    widgetidFn(0,w986,[value.datavalue])
                }
                else if(value.widgetid === 987) {
                    widgetidFn(0,w987,[value.datavalue])
                }
                else if(value.widgetid === 966) {
                    widgetidFn(0,w966,[value.datavalue])
                }
                else if(value.widgetid === 967) {
                    widgetidFn(0,w967,[value.datavalue])
                }
                else if(value.widgetid === 979) {
                    widgetidFn(0,w979,[value.datavalue])
                }
                else if(value.widgetid === 980) {
                    widgetidFn(0,w980,[value.datavalue])
                }
                else if(value.widgetid === 981) {
                    widgetidFn(0,w981,[value.datavalue])
                }
                else if(value.widgetid === 982) {
                    widgetidFn(0,w982,[value.datavalue])
                }
                else if(value.widgetid === 988) {
                    widgetidFn(0,w988,[value.datavalue])
                }
                else if(value.widgetid === 990) {
                    widgetidFn(0,w990,[value.datavalue])
                }
                else if(value.widgetid === 991) {
                    widgetidFn(0,w991,[value.datavalue])
                }
            });
        }

        function huanghuaPAFn(){
            gytSelectFn(true,'#huanghuaA','三联供系统',[0]);
            huanghuaArtwork.height(1434);
        }
        function huanghuaPBFn(){
            //gytSelectFn(true,'#huanghuaBC','燃气直燃机燃气热水锅炉系统',[1,2]);
            gytSelectFn(true,'#huanghuaBC','直燃机系统',[1]);
            huanghuaArtwork.height(1288);
        }
        function huanghuaPCFn(){
            gytSelectFn(true,'#huanghuaBC','直燃机系统',[1,2]);
            huanghuaArtwork.height(1288);
        }
        function huanghuaPDFn(){
            gytSelectFn(true,'#huanghuaD','电制冷系统',[2]); 
            huanghuaArtwork.height(1194);
        }

        //亭湖选择
        function tinghuPAFn() {
            gytSelectFn(true,'#tinghuA','燃气三联供设备',[0]);
            tinghuArtwork.height(1341);
        }
        function tinghuPBFn() {
            //gytSelectFn(true,'#tinghuBC','直燃机地源热泵',[1,2]);
            gytSelectFn(true,'#tinghuBC','直燃机地源热泵',[1]);
            tinghuArtwork.height(1200);
        }
        function tinghuPCFn() {
            gytSelectFn(true,'#tinghuBC','直燃机地源热泵',[1,2]);
            tinghuArtwork.height(1200); //不同图片的高度
        }
        function tinghuPDFn() {
            //gytSelectFn(true,'#tinghuD','燃气锅炉',[3]);
            gytSelectFn(true,'#tinghuD','燃气锅炉',[2]);
            tinghuArtwork.height(1349);
        }
        //中德
        function zhongdePAFn() {
            gytSelectFn(true,'#zhongdeA','总览图',[0]);
            shenlongchengArtwork.height(1418);
        }
        //肇庆
        function zhaoqingPAFn() {
            gytSelectFn(true,'#zhaoqingA','乙二醇系统',[0]);
            shenlongchengArtwork.height(1126);
        }
        function zhaoqingPBFn() {
            gytSelectFn(true,'#zhaoqingB','冷却水系统',[1]);
            shenlongchengArtwork.height(1108);
        }
        function zhaoqingPCFn() {
            gytSelectFn(true,'#zhaoqingC','冷冻水系统',[2]);
            shenlongchengArtwork.height(1188);
        }
        //神农城
        function shenlongchengPAFn() {
            gytSelectFn(true,'#shenlongchengA','三联供系统',[0]);
            shenlongchengArtwork.height(1180);
        }
        function shenlongchengPBFn() {
            gytSelectFn(true,'#shenlongchengB','电制冷系统',[1]);
            shenlongchengArtwork.height(1212);
        }
        function shenlongchengPCFn() {
            if($(this).hasClass('active')) return
            gytSelectFn(true,'#shenlongchengC','燃气锅炉',[2]);
            shenlongchengArtwork.height(1158);
        }
//参数显示按钮，显示图片，标题，对应下标
        function gytSelectFn(showBottom,showName,title,num) {
            $(showName).removeClass('hide').siblings('div').addClass('hide');

            if( showBottom ) {
                $('#artworkBottom').removeClass('hide')
            }
            else {
                $('#artworkBottom').addClass('hide')
            }
            $('#artworkTitle').children('div').text(title)
            //$('#artworkTailsBox').children('.tail-icon').removeClass('active')
            //.filter(function(i){ return $.inArray(i,num) > -1; }).addClass('active')
            $('#gyt-list').children('.list-group-item').removeClass('active')
            .filter(function(i){ return $.inArray(i,num) > -1; }).addClass('active')
        }
        function showBottomArea(showName,tailNum) {
            var adClass= 'bottom-thumbnail ' +showName; 
            $('#artworkThumbnail').removeClass().addClass(adClass);        
        }

        //改变缩略图高度
        function artworkBottomHeight(h) {
            $('#artworkThumbnail').height(h).parent('#artworkBottom').height(h);
        }
        //多态小下标
        function builtTailIcon(name,num){
            var str = '', className 
              switch(name) {
                case 1:
                    className = ['huanghuaPA','huanghuaPB','huanghuaPC','huanghuaPD'];
                    break;
                case 3:
                    className = ['tinghuPA','tinghuPB','tinghuPC','tinghuPD'];
                    break;
                case 4:
                    className = ['shenlongchengPA','shenlongchengPB','shenlongchengPC']
                    break;
                //case 6:
                    //className = ['zhaoqingPA','zhaoqingPB','zhaoqingPC']
                    //break;
              }
              for(var i = 0, l = num; i < l; i++) {
                 str += '<span class="tail-icon active '+className[i]+'" >'+className[i].substr(className[i].length - 1)+'</span>'; //取最后一个字符
              }
             $('#artworkTailsBox').empty().append(str)
        }
        var huanghuaDianlengji17 = $('#huanghuaDianlengji17') //1#离心电冷机
          , huanghuaDianlengji18 = $('#huanghuaDianlengji18') //2#离心电冷机
          , huanghuaSanreqi42 = $('#huanghuaSanreqi42')
          , huanghuaSanreqi43 = $('#huanghuaSanreqi43')
          , huanghuaFadianji11 = $('#huanghuaFadianji11')
          , huanghuaFadianji12 = $('#huanghuaFadianji12')
          , huanghuaYurezhiranji13 = $('#huanghuaYurezhiranji13')
          , huanghuaYurezhiranji14 = $('#huanghuaYurezhiranji14')
          , huanghuaSanreqi44 = $('#huanghuaSanreqi44') //黄花BC区换热器
          , huanghuaRanqireshuiguolu16 = $('#huanghuaRanqireshuiguolu16')
          , huanghuaRanqizhiranji15 = $('#huanghuaRanqizhiranji15')


        //黄花设备
        //a
           var classinstanceid17Flag = 0
             , classinstanceid18Flag = 0
             , classinstanceid11Flag = 0
             , classinstanceid12Flag = 0
             // 42,43换热器1和2，13,14烟气余热直燃机1和2，11,12燃气内燃发电机组
             , classinstanceid13Flag = 0 
             , classinstanceid14Flag = 0
             , classinstanceid42Flag = 0
             , classinstanceid43Flag = 0
             // 亭湖 
             , classinstanceid153Flag = 0
             , classinstanceid154Flag = 0
             , classinstanceid155Flag = 0
             , classinstanceid156Flag = 0
             , classinstanceid151Flag = 0
             //a
             , classinstanceid180Flag = 0
             , classinstanceid181Flag = 0
             , classinstanceid182Flag = 0
             , classinstanceid183Flag = 0
             , classinstanceid184Flag = 0
             , classinstanceid157Flag = 0
             , classinstanceid152Flag = 0
             // 神农城
             //a
             //9051, 9053, 102,9054
             , classinstanceid9051Flag = 0
             , classinstanceid9053Flag = 0
             , classinstanceid102Flag = 0
             , classinstanceid9054Flag = 0
             //b
             , classinstanceid97Flag = 0
             , classinstanceid98Flag = 0
             , classinstanceid99Flag = 0
             , classinstanceid100Flag = 0
             , classinstanceid101Flag = 0
             //c
             , classinstanceid103Flag = 0
             , classinstanceid104Flag = 0
             , classinstanceid105Flag = 0
             , classinstanceid106Flag = 0


        function tinghuEquipStatFn(data) {
          ////, globalMode = 1 // 默认供冷模式
            //$.each(data, function(index, value) {
            if(data.status.data.length == 0) { console.log('工艺图设备状态列表为空'); return;}
          //, globalMode = 1 // 默认供冷模式
           $.each(data.status.data.list, function(index, value){
                if(value.classinstanceid === 180 && value.datavalue1 === '0') { //亭湖A蒸汽型溴化锂机组1
                    $('#tinghuAEZhengqixiulengji01').addClass('gray-filter');
                    //pipelineStatus(0,'.tinghu-a-l-xiulengji');
                    classinstanceid180Flag = 0
                }
                else if(value.classinstanceid  === 180 && value.datavalue1 === '1')
                {
                    $('#tinghuAEZhengqixiulengji01').removeClass('gray-filter');
                    //pipelineStatus(1,'.tinghu-xiulengji-out02','.tinghu-xiulengji-in05','.tinghu-a-l-xiulengji','.tinghu-xiulengji-out02','.tinghu-xiulengji-in05');
addClassinstanceid('#tinghuAEZhengqixiulengji01',180);
                    classinstanceid180Flag = 1
                }
                else if(value.classinstanceid === 157 && value.datavalue1 === '0') { //亭湖A烟气余热型蒸汽锅炉1
                    $('#tinghuAEYureguolu01').addClass('gray-filter');
                    $('.tinghu-a-l-yureguolu').children('.inner').height(0); // 无动画流动 
                    //pipelineStatus(0,'.tinghu-a-l-yureguolu');
                    classinstanceid157Flag = 0
                }
                else if(value.classinstanceid  === 157 && value.datavalue1 === '1')
                {
                    $('#tinghuAEYureguolu01').removeClass('gray-filter');
                    //pipelineStatus(1,'.tinghu-ranqiguolu-0-out01','.tinghu-ranqiguolu-1-out02','.tinghu-ranqiguolu-1-in01','.tinghu-a-l-yureguolu','.tinghu-ranqiguolu2-1-out06','.tinghu-yureguolu-out04');
addClassinstanceid('#tinghuAEYureguolu01',157);
                    classinstanceid157Flag = 1
                }
                else if(value.classinstanceid === 152 && value.datavalue1 === '0') { //亭湖A发电机
                    equipStatus(0,'#tinghuAEFdianji01','#tinghuAEHuanreqi02','#tinghuAEHuanreqi01','#tinghuAELengqueta02','#tinghuAELengqueta01')
                    //pipelineStatus(0,'.tinghu-a-l-fadianji','.tb','.tb02','.tinghu-a-l-huanreqi01','.tinghu-a-l-huanreqi02');
                    classinstanceid152Flag = 0
                }
                else if(value.classinstanceid  === 152 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#tinghuAEFdianji01','#tinghuAELengqueta02','#tinghuAELengqueta01');  

addClassinstanceid('#tinghuAEFdianji01',152);
                    if(globalMode === 0) { //供热
                        equipStatus(1,'#tinghuAEHuanreqi02','#tinghuAEHuanreqi01')
                        //pipelineStatus(1,'.tinghu-huanreqi-0-in01','.tinghu-huanreqi-0-in02','.tinghu-a-l-huanreqi01','.tinghu-a-l-huanreqi02','.tb','.tb02','.tinghu-xiulengji-out02','.tinghu-xiulengji-in05','.tinghu-fadianji-out07','.tinghu-fadianji-out06','.tinghu-fadianji-in08');
                        classinstanceid181Flag = 1;
                    }
                    else if(globalMode === 1) //供冷
                    {
                        equipStatus(1,'#tinghuAEHuanreqi02')
                        equipStatus(0,'#tinghuAEHuanreqi01')
                        //pipelineStatus(1,'.tinghu-huanreqi-0-in01','.tinghu-huanreqi-0-in02','.tinghu-a-l-huanreqi02','.tb02','.tinghu-fadianji-out07','.tinghu-fadianji-out06','.tinghu-fadianji-in08');
                        //pipelineStatus(0,'.tinghu-a-l-huanreqi01','.tb','.tinghu-xiulengji-out02','.tinghu-xiulengji-in05');
                        classinstanceid181Flag = 0;
                    }
                    //pipelineStatus(1,'.tinghu-fadianji-out01','.tinghu-a-l-fadianji');
                    classinstanceid152Flag = 1
                }
                else if(value.classinstanceid === 153 && value.datavalue1 === '0') { //亭湖bc直燃机01
                   $('#tinghuBCEZhiranji01').addClass('gray-filter');
                    classinstanceid153Flag = 0
                    //pipelineStatus(0,'.tinghu-bc-l-zhiranji01');
                }
                else if(value.classinstanceid  === 153 && value.datavalue1 === '1')
                {
                    $('#tinghuBCEZhiranji01').removeClass('gray-filter');
                    classinstanceid153Flag = 1
addClassinstanceid('#tinghuBCEZhiranji01',153);
                    //pipelineStatus(1,'.tinghu-bc-l-zhiranji01','.tinghu-zhiranji-0-in02','.tinghu-zhiranji-0-out02','.tinghu-zhiranji-0-in01','.tinghu-zhiranji-0-out01');
                }
                else if(value.classinstanceid === 154 && value.datavalue1 === '0') { //亭湖bc直燃机02
                    $('#tinghuBCEZhiranji02').addClass('gray-filter');
                    classinstanceid154Flag = 0
                    //pipelineStatus(0,'.tinghu-bc-l-zhiranji02');
                }
                else if(value.classinstanceid  === 154 && value.datavalue1 === '1')
                {
                    $('#tinghuBCEZhiranji02').removeClass('gray-filter');
addClassinstanceid('#tinghuBCEZhiranji02',154);
                    classinstanceid154Flag = 1
                    //pipelineStatus(1,'.tinghu-zhiranji-0-in01','.tinghu-zhiranji-0-out01','.tinghu-zhiranji-2-out03','.tinghu-zhiranji-2-in03','.tinghu-zhiranji-0-out02','.tinghu-zhiranji-0-in02','.tinghu-bc-l-zhiranji02');
                }
                else if(value.classinstanceid === 151 && value.datavalue1 === '0') { //亭湖bc地源热泵
                    $('#tinghuBCEDiyuanrebeng01').addClass('gray-filter');
                    classinstanceid151Flag = 0
                    //pipelineStatus(0,'.tinghu-bc-l-diyuanrebeng');
                }
                else if(value.classinstanceid  === 151 && value.datavalue1 === '1')
                {
                    $('#tinghuBCEDiyuanrebeng01').removeClass('gray-filter');
addClassinstanceid('#tinghuBCEDiyuanrebeng01',151);
                    classinstanceid151Flag = 1
                    //pipelineStatus(1,'.tinghu-zhiranji-2-out03','.tinghu-zhiranji-2-in03','.tinghu-zhiranji-0-out02','.tinghu-zhiranji-0-in02','.tinghu-bc-l-diyuanrebeng');
                }
                else if(value.classinstanceid === 155 && value.datavalue1 === '0') { //亭湖D燃气锅炉01
                    $('#tinghuDERanqiguolu01').addClass('gray-filter');
                    //pipelineStatus(0,'.tinghu-d-l-ranqiguolu01');
                    classinstanceid155Flag =0
                }
                else if(value.classinstanceid  === 155 && value.datavalue1 === '1')
                {
                    $('#tinghuDERanqiguolu01').removeClass('gray-filter');
addClassinstanceid('#tinghuDERanqiguolu01',155);
                    //pipelineStatus(1,'.tinghu-ranqiguolu-1-out02','.tinghu-ranqiguolu-0-out01','.tinghu-ranqiguolu2-0-in01','.tinghu-d-l-ranqiguolu01','.tinghu-ranqiguolu2-1-out06','.tinghu-yureguolu-out03','.tinghu-yureguolu-out04');
                    classinstanceid155Flag =1
                }
                else if(value.classinstanceid === 156 && value.datavalue1 === '0') { //亭湖D燃气锅炉02
                    $('#tinghuDERanqiguolu02').addClass('gray-filter');
                    //pipelineStatus(0,'.tinghu-d-l-ranqiguolu02');
                    classinstanceid156Flag =0
                }
                else if(value.classinstanceid  === 156 && value.datavalue1 === '1')
                {
                    $('#tinghuDERanqiguolu02').removeClass('gray-filter');
addClassinstanceid('#tinghuDERanqiguolu02',156);
                    //pipelineStatus(1,'.tinghu-ranqiguolu2-0-in01','.tinghu-ranqiguolu2-1-out06','.tinghu-ranqiguolu-0-out01','.tinghu-d-l-ranqiguolu02','.tinghu-yureguolu-out03','.tinghu-yureguolu-out04');
                    $('.tinghu-yureguolu-out03').attr('id','true');
                    classinstanceid156Flag =1
                }
            });
                //alert("155Flag:"+classinstanceid155Flag+"|156Flag:"+classinstanceid156Flag+"|157Flag:"+classinstanceid157Flag);   tinghu-a-l-yureguolu
                if( classinstanceid153Flag === 0 && classinstanceid154Flag ===0 &&classinstanceid151Flag ===0) { //亭湖bc区
                    //pipelineStatus(0,'.tinghu-zhiranji-0-out02','.tinghu-zhiranji-0-in02');
                } else if(classinstanceid153Flag === 0 && classinstanceid154Flag ===0 ){
                    //pipelineStatus(0,'.tinghu-zhiranji-0-in01','.tinghu-zhiranji-0-out01');
                }
                if(classinstanceid154Flag === 0 && classinstanceid151Flag ===0 ){
                    //pipelineStatus(0,'.tinghu-zhiranji-2-out03','.tinghu-zhiranji-2-in03');
                }
                if(classinstanceid180Flag === 0 && classinstanceid181Flag ===0 ){ //亭湖a区,溴冷机和1号换热器
                    //pipelineStatus(0,'.tinghu-xiulengji-out02','.tinghu-xiulengji-in05');
                }
                if(classinstanceid155Flag === 0 && classinstanceid157Flag ===0) {
                    //pipelineStatus(0,'.tinghu-ranqiguolu-1-out02','.tinghu-ranqiguolu-1-in01');
                }
                if(classinstanceid155Flag === 0 && classinstanceid156Flag ===0) {
                    //pipelineStatus(0,'.tinghu-ranqiguolu2-0-in01','.tinghu-yureguolu-out03');
                }
                if(classinstanceid155Flag === 0 && classinstanceid157Flag ===0 && classinstanceid156Flag ===0) { //亭湖D余热锅炉，1号2号燃气锅炉
                    //pipelineStatus(0,'.tinghu-ranqiguolu-0-out01','.tinghu-ranqiguolu2-1-out06','.tinghu-yureguolu-out04');
                }
                if(classinstanceid157Flag === 1 && classinstanceid152Flag ===1) {
                    //pipelineStatus(1,'.tinghu-yureguolu-in01','.tinghu-yureguolu-in02');
                }
                if(classinstanceid180Flag === 0 && classinstanceid152Flag ===0) {
                    //pipelineStatus(0,'.tinghu-xiulengji-out02','.tinghu-xiulengji-in05');
                }
                if(classinstanceid157Flag === 0 || classinstanceid152Flag ===0) {
                    //pipelineStatus(0,'.tinghu-yureguolu-in01','.tinghu-yureguolu-in02');
                }

                if( classinstanceid153Flag === 0 && classinstanceid154Flag ===0 ) {
                    //pipelineStatus(0,'.tinghu-zhiranji-0-in01','.tinghu-zhiranji-0-out01');
                }
                if(globalMode === 0) { //供热
                    equipStatus(1,'#tinghuDEHuanreqi01','#tinghuDEHuanreqi02');  
                    //pipelineStatus(1,'.tinghu-fenqigang-0-out01','.tinghu-ranqiguolu-0-out02','.tinghu-d-l-huangreqi03','.tinghu-d-l-huangreqi04');
                }
                if(globalMode === 1) //供冷
                {
                    equipStatus(1,'#tinghuDEHuanreqi01');  
                    equipStatus(0,'#tinghuDEHuanreqi02');  
                    //pipelineStatus(1,'.tinghu-fenqigang-0-out01','.tinghu-ranqiguolu-0-out02','.tinghu-d-l-huangreqi03');
                    //pipelineStatus(0,'.tinghu-d-l-huangreqi04');
                }
        }
        //添加classinstanceid到设备
        function addClassinstanceid(id,cid){
            $(id).attr('data-classinstanceid',cid); 
        }
        //判断设备状态, 状态码0为关闭，1为启动
        function equipStatus() {
            var statusCode = Array.prototype.shift.call(arguments) 
              , length = arguments.length
              , i = 0
            if(statusCode === 0) {
                for(i;i<length;i++) {
                    $(arguments[i]).addClass('gray-filter');
                }
            } else if(statusCode === 1) {
                for(i;i<length;i++) {
                    $(arguments[i]).removeClass('gray-filter');
                }
            }
        }
        //判断管道流动, 状态码0为关闭，1为启动
        function pipelineStatus() {
            var statusCode = Array.prototype.shift.call(arguments) 
              , length = arguments.length
              , i = 0
            if(statusCode === 0) {
                for(i;i<length;i++) {
                    $(arguments[i]).children('.inner').height(0); // 无动画流动 
                }
            } else if(statusCode === 1) {
                for(i;i<length;i++) {
                    $(arguments[i]).children('.inner').height('100%'); // 无动画流动 
                }
            }

        }
        function shenlongchengEquipStatFn(data) {
          //, globalMode = 1 // 默认供冷模式
            var classinstanceidHRQ01Flag = 0 , classinstanceidHRQ02Flag = 0;
            $.each(data, function(index, value) {
                if(value.classinstanceid === 9051  && value.datavalue1 === '0') { //神农城A余热直燃机
                    equipStatus(0,'#shenlongchengAEYurezhiranji01');  
                    pipelineStatus(0,'.shenlongcheng-a-l-yurezhiranji');
                    classinstanceid9051Flag = 0
                }
                else if(value.classinstanceid  === 9051 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengAEYurezhiranji01');  
                    pipelineStatus(1,'.shenlongcheng-a-l-yurezhiranji');//,'.shenlongcheng-a-g-yureburanzhiranji-out07','.shenlongcheng-a-g-general-in01','.shenlongcheng-a-g-yureburanzhiranji-out05','.shenlongcheng-a-g-zhiranji-in01'
                    classinstanceid9051Flag = 1
                }
                else if(value.classinstanceid === 9053  && value.datavalue1 === '0') { //神农城A发电机1
                    equipStatus(0,'#shenlongchengAEFadianji01'); //发电机
                    equipStatus(0,'#shenlongchengAElengqueta01'); //冷却塔
                    pipelineStatus(0,'.shenlongcheng-a-l-fadianji01','.shenlongcheng-a-fadianji1-out02','.shenlongcheng-a-fadianji1-out01'); 
                    equipStatus(0,'#shenlongchengAEhuanreqi01'); //换热器
                    pipelineStatus(0,'.shenlongcheng-a-l-huanreqi01');
                    classinstanceid9053Flag = 0;
                    classinstanceidHRQ01Flag = 0;
                }
                else if(value.classinstanceid  === 9053 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengAEFadianji01'); //发电机

                    equipStatus(1,'#shenlongchengAElengqueta01'); //冷却塔
                    pipelineStatus(1,'.shenlongcheng-a-l-fadianji01'); 
                    if(globalMode === 0){//供热季
                        equipStatus(1,'#shenlongchengAEhuanreqi01'); //换热器
                        pipelineStatus(1,'.shenlongcheng-a-l-huanreqi01');
                        classinstanceidHRQ01Flag = 1;
                    }
                    classinstanceid9053Flag = 1//设备开启
                }
                else if(value.classinstanceid  === 102 && value.datavalue1 === '0') //神农城A燃气直燃机1
                {
                    equipStatus(0,'#shenlongchengAEranqizhiranji01');  
                    pipelineStatus(0,'.shenlongcheng-a-l-ranqizhiranji');
                    classinstanceid102Flag = 0
                }
                else if(value.classinstanceid  === 102 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengAEranqizhiranji01');  
                    pipelineStatus(1,'.shenlongcheng-a-l-ranqizhiranji');//,'.shenlongcheng-a-y-yureburanzhiranji-out10','.shenlongcheng-a-y-huanreqi2-out03','.shenlongcheng-a-huanreqi-in06','.shenlongcheng-a-y-yureburanzhiranji-out09','.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-g-yureburanzhiranji-out07','.shenlongcheng-a-g-general-in01','.shenlongcheng-a-g-yureburanzhiranji-out05','.shenlongcheng-a-g-zhiranji-in01'
                    classinstanceid102Flag = 1
                }
                else if(value.classinstanceid  === 9054 && value.datavalue1 === '0') //神农城A发电机2
                {
                    equipStatus(0,'#shenlongchengAEFadianji02'); 
                    equipStatus(0,'#shenlongchengAElengqueta02');
                    pipelineStatus(0,'.shennongcheng-a-l-fadianji02','.shenlongcheng-a-fadianji2-out02','.shenlongcheng-a-fadianji1-out03'); 
                    equipStatus(0,'#shenlongchengAEhuanreqi02'); 
                    pipelineStatus(0,'.shenlongcheng-a-l-huanreqi02');
                    classinstanceidHRQ02Flag = 0;
                    classinstanceid9054Flag = 0;
                }
                else if(value.classinstanceid  === 9054 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengAEFadianji02'); //发电机
                    equipStatus(1,'#shenlongchengAElengqueta02'); //冷却塔
                    pipelineStatus(1,'.shennongcheng-a-l-fadianji02'); 
                    if(globalMode === 0){//供热季
                        equipStatus(1,'#shenlongchengAEhuanreqi02'); //换热器
                        pipelineStatus(1,'.shenlongcheng-a-l-huanreqi02');
                        classinstanceidHRQ02Flag = 1;
                    }
                    classinstanceid9054Flag = 1;//设备开启
                }
                else if(value.classinstanceid  === 97 && value.datavalue1 === '0') //神农城B离心电制冷机01
                {
                    equipStatus(0,'#shenlongchengBELixindianlengji01');  
                    pipelineStatus(0,'.shenlongcheng-b-l-lixindianzhilengA1');
                    classinstanceid97Flag = 0;
                }
                else if(value.classinstanceid  === 97 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengBELixindianlengji01');  
                    pipelineStatus(1,'.shenlongcheng-b-l-lixindianzhilengA1');
                    //pipelineStatus(1,'.shenlongcheng-b-l-lixindianzhilengA1','.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01','.dianzhilengji-jielengquelie-g-lixindianzhilengjiA2-02','.dianzhilengji-b-g-qufenshuiqi-06','.dianzhilengji-jielengquelie-g-lixindianzhilengjiA3-02','.dianzhilengji-b-g-qufenshuiqi-04','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB1-02','.dianzhilengji-b-g-qufenshuiqi-02','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01');
                    classinstanceid97Flag = 1;
                }
                else if(value.classinstanceid  === 98 && value.datavalue1 === '0') //神农城B离心电制冷机02
                {
                    equipStatus(0,'#shenlongchengBELixindianlengji02');  
                    pipelineStatus(0,'.shenlongcheng-b-l-lixindianzhilengA2');
                    classinstanceid98Flag = 0;
                }
                else if(value.classinstanceid  === 98 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengBELixindianlengji02');  
                    pipelineStatus(1,'.shenlongcheng-b-l-lixindianzhilengA2');//,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01',/*第一第二*/'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA1-02','.dianzhilengji-b-lixindianzhilengjiA1-01'/*2和3蓝色*/,'.dianzhilengji-jielengquelie-g-lixindianzhilengjiA2-02','.dianzhilengji-b-g-qufenshuiqi-06','.dianzhilengji-jielengquelie-g-lixindianzhilengjiA3-02','.dianzhilengji-b-g-qufenshuiqi-04','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB1-02','.dianzhilengji-b-g-qufenshuiqi-02','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01'
                    classinstanceid98Flag = 1;
                }
                else if(value.classinstanceid  === 99 && value.datavalue1 === '0') //神农城B离心电制冷机03
                {
                    equipStatus(0,'#shenlongchengBELixindianlengji03');  
                    pipelineStatus(0,'.shenlongcheng-b-l-lixindianzhilengA3');
                    classinstanceid99Flag = 0;
                }
                else if(value.classinstanceid  === 99 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengBELixindianlengji03');  
                    pipelineStatus(1,'.shenlongcheng-b-l-lixindianzhilengA3');//,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01'/*第一第二*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA1-02','.dianzhilengji-b-lixindianzhilengjiA1-01'/*3和4蓝色*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA2-02','.dianzhilengji-b-lixindianzhilengjiA3-02'/*5和6*/,'.dianzhilengji-jielengquelie-g-lixindianzhilengjiA3-02','.dianzhilengji-b-g-qufenshuiqi-04','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB1-02','.dianzhilengji-b-g-qufenshuiqi-02','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01'
                    classinstanceid99Flag = 1;
                }
                else if(value.classinstanceid  === 100 && value.datavalue1 === '0') //神农城B离心电制冷机04
                {
                    equipStatus(0,'#shenlongchengBELixindianlengji04');  
                    pipelineStatus(0,'.shenlongcheng-b-l-lixindianzhilengB1');
                    classinstanceid100Flag = 0;
                }
                else if(value.classinstanceid  === 100 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengBELixindianlengji04');  
                    pipelineStatus(1,'.shenlongcheng-b-l-lixindianzhilengB1');//,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01'/*第一第二*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA1-02','.dianzhilengji-b-lixindianzhilengjiA1-01'/*3和4蓝色*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA2-02','.dianzhilengji-b-lixindianzhilengjiA3-02'/*5和6*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA3-02','.dianzhilengji-b-lixindianzhilengjiB1-02','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB1-02','.dianzhilengji-b-g-qufenshuiqi-02','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01'
                    classinstanceid100Flag = 1;
                }
                else if(value.classinstanceid  === 101 && value.datavalue1 === '0') //神农城B离心电制冷机05
                {
                    equipStatus(0,'#shenlongchengBELixindianlengji05');  
                    pipelineStatus(0,'.shenlongcheng-b-l-lixindianzhilengB2');
                    classinstanceid101Flag = 0;
                }
                else if(value.classinstanceid  === 101 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengBELixindianlengji05');
                    pipelineStatus(1,'.shenlongcheng-b-l-lixindianzhilengB2');//,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01'/*第一第二*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA1-02','.dianzhilengji-b-lixindianzhilengjiA1-01'/*3和4蓝色*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA2-02','.dianzhilengji-b-lixindianzhilengjiA3-02'/*5和6*/,'.dianzhilengji-jielengquelie-b-lixindianzhilengjiA3-02','.dianzhilengji-b-lixindianzhilengjiB1-02'/*7和8*/,'.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01'
                    classinstanceid101Flag = 1;
                }
                else if(value.classinstanceid  === 103 && value.datavalue1 === '0') //神农城C燃气热水锅炉01
                {
                    equipStatus(0,'#shenlongchengCERanqireshuiguolu01');  
                    pipelineStatus(0,'.shenlongcheng-c-l-ranqiguoluA1');
                    classinstanceid103Flag = 0;
                }
                else if(value.classinstanceid  === 103 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengCERanqireshuiguolu01');  
                    pipelineStatus(1,'.shenlongcheng-c-l-ranqiguoluA1');//,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01'/*1和2*/,'.dianzhilengji-c-reshuiguolu-y-A2-01','.dianzhilengji-c-reshuiguolu-y-B1-03','.dianzhilengji-c-reshuiguolu-y-B1-02'
                    classinstanceid103Flag = 1;
                }
                else if(value.classinstanceid  === 104 && value.datavalue1 === '0') //神农城C燃气热水锅炉02
                {
                    equipStatus(0,'#shenlongchengCERanqireshuiguolu02');  
                    pipelineStatus(0,'.shenlongcheng-c-l-ranqiguoluA2');
                    classinstanceid104Flag = 0;
                }
                else if(value.classinstanceid  === 104 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengCERanqireshuiguolu02');  
                    pipelineStatus(1,'.shenlongcheng-c-l-ranqiguoluA2');//,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01'/*1和2*/,'.dianzhilengji-c-reshuiguolu-A1-01','.dianzhilengji-c-reshuiguolu-o-A2-02'/*3和4*/,'.dianzhilengji-c-reshuiguolu-y-A2-01','.dianzhilengji-c-reshuiguolu-y-B1-03','.dianzhilengji-c-reshuiguolu-y-B1-02'
                    classinstanceid104Flag = 1;
                }
                else if(value.classinstanceid  === 105 && value.datavalue1 === '0') //神农城C燃气热水锅炉03
                {
                    equipStatus(0,'#shenlongchengCERanqireshuiguolu03');  
                    pipelineStatus(0,'.shenlongcheng-c-l-ranqiguoluA3');
                    classinstanceid105Flag = 0;
                }
                else if(value.classinstanceid  === 105 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengCERanqireshuiguolu03');  
                    pipelineStatus(1,'.shenlongcheng-c-l-ranqiguoluA3');//,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01'/*1和2*/,'.dianzhilengji-c-reshuiguolu-A1-01','.dianzhilengji-c-reshuiguolu-o-A2-02'/*3和4*/,'.dianzhilengji-c-reshuiguolu-A2-02','.dianzhilengji-c-reshuiguolu-o-A3-02','.dianzhilengji-c-reshuiguolu-y-B1-03','.dianzhilengji-c-reshuiguolu-y-B1-02'
                    classinstanceid105Flag = 1;
                }
                else if(value.classinstanceid  === 106 && value.datavalue1 === '0') //神农城C燃气热水锅炉04
                {
                    equipStatus(0,'#shenlongchengCERanqireshuiguolu04');  
                    pipelineStatus(0,'.shenlongcheng-c-l-ranqiguoluB1');
                    classinstanceid106Flag = 0;
                }
                else if(value.classinstanceid  === 106 && value.datavalue1 === '1')
                {
                    equipStatus(1,'#shenlongchengCERanqireshuiguolu04');  
                    pipelineStatus(1,'.shenlongcheng-c-l-ranqiguoluB1');//,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01'/*1和2*/,'.dianzhilengji-c-reshuiguolu-A1-01','.dianzhilengji-c-reshuiguolu-o-A2-02'/*3和4*/,'.dianzhilengji-c-reshuiguolu-A2-02','.dianzhilengji-c-reshuiguolu-A3-02','.dianzhilengji-c-reshuiguolu-o-B1-02','.dianzhilengji-c-reshuiguolu-o-A3-02','.dianzhilengji-c-reshuiguolu-y-B1-02'
                    classinstanceid106Flag = 1;
                }
            });
            // A区 三联供 共享管道显示逻辑
            if(classinstanceid9051Flag == 1 || classinstanceid102Flag == 1){
                pipelineStatus(1,'.shenlongcheng-a-g-yureburanzhiranji-out05','.shenlongcheng-a-g-zhiranji-in01');
            }else{
                pipelineStatus(0,'.shenlongcheng-a-g-yureburanzhiranji-out05','.shenlongcheng-a-g-zhiranji-in01');
            }
            //发电机开启
            if(classinstanceid9053Flag == 1 || classinstanceid9054Flag == 1){
                pipelineStatus(1,'.shenlongcheng-a-y-yureburanzhiranji-out11');
            }else{//
                pipelineStatus(0,'.shenlongcheng-a-y-yureburanzhiranji-out11');
            }
            //补燃直燃机和发电机任意一个
            if(classinstanceid102Flag == 1 && (classinstanceid9053Flag == 1 || classinstanceid9054Flag == 1)){
                pipelineStatus(1,'.shenlongcheng-a-y-yureburanzhiranji-in11','.shenlongcheng-a-y-ranqizhiranji-in01','.shenlongcheng-a-y-yureburanzhiranji-in12');
                if(classinstanceid9053Flag == 1){//如果是1号发电机，补线
                    pipelineStatus(1,'.shenlongcheng-a-gaowenlengquetai1-in03','.shenlongcheng-a-fadianji1-out01','.shenlongcheng-a-fadianji1-out02');
                }
                if(classinstanceid9054Flag == 1){//2号发电机补线
                    pipelineStatus(1,'.shenlongcheng-a-fadianji1-out03','.shenlongcheng-a-fadianji2-out02');
                }
            }else{
                pipelineStatus(0,'.shenlongcheng-a-y-yureburanzhiranji-in11','.shenlongcheng-a-y-ranqizhiranji-in01','.shenlongcheng-a-gaowenlengquetai1-in03'
                    ,'.shenlongcheng-a-fadianji1-out01','.shenlongcheng-a-fadianji1-out02','.shenlongcheng-a-fadianji1-out03','.shenlongcheng-a-fadianji2-out02','.shenlongcheng-a-y-yureburanzhiranji-in12');
            }

            // 换热器，直燃，余然共享
            if(classinstanceid9051Flag == 1 || classinstanceidHRQ01Flag == 1 || classinstanceidHRQ02Flag == 1 || classinstanceid102Flag == 1){
                pipelineStatus(1,'.shenlongcheng-a-g-general-in01','.shenlongcheng-a-g-yureburanzhiranji-out07');
            }else{//
                pipelineStatus(0,'.shenlongcheng-a-g-general-in01','.shenlongcheng-a-g-yureburanzhiranji-out07');
            }
            // 换热器1
            if(classinstanceidHRQ01Flag == 1){
                pipelineStatus(1,'.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-huanreqi-in06');
            }else{
                pipelineStatus(0,'.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-huanreqi-in06');
            }
            // 换热器2 和 直燃
            if(classinstanceidHRQ02Flag == 1 || classinstanceid102Flag == 1){
                pipelineStatus(1,'.shenlongcheng-a-y-huanreqi2-out03','.shenlongcheng-a-y-yureburanzhiranji-out09','.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-huanreqi-in06');
            }else{
                pipelineStatus(0,'.shenlongcheng-a-y-huanreqi2-out03','.shenlongcheng-a-y-yureburanzhiranji-out09','.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-huanreqi-in06');
            }

            if(classinstanceidHRQ01Flag == 1 || classinstanceidHRQ02Flag == 1 || classinstanceid102Flag == 1){
                pipelineStatus(1,'.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-huanreqi-in06');
            } else {
                pipelineStatus(0,'.shenlongcheng-a-y-yureburanzhiranji-out08','.shenlongcheng-a-huanreqi-in06');
            }
            // B区 电冷机组 共享管道显示逻辑

            //交错放置并行冷却水的输入输出管道
            var shenlongchengLengqueshuiLine = ['.dianzhilengji-jielengquelie-b-lixindianzhilengjiA1-02',
                                                '.dianzhilengji-b-lixindianzhilengjiA1-01',
                                                '.dianzhilengji-jielengquelie-b-lixindianzhilengjiA2-02',
                                                '.dianzhilengji-b-lixindianzhilengjiA3-02',
                                                '.dianzhilengji-jielengquelie-b-lixindianzhilengjiA3-02',
                                                '.dianzhilengji-b-lixindianzhilengjiB1-02',
                                                '.dianzhilengji-jielengquelie-b-lixindianzhilengjiB2-01',
                                                '.dianzhilengji-b-lixindianzhilengjiB2-02'];
            //交错放置并行冷水的输入输出管道				
            var shenlongchengLengshuiLine = ['.dianzhilengji-b-g-qufenshuiqi-02',
                                             '.dianzhilengji-jielengquelie-g-lixindianzhilengjiB1-02',
                                             '.dianzhilengji-b-g-qufenshuiqi-04',
                                             '.dianzhilengji-jielengquelie-g-lixindianzhilengjiA3-02',
                                             '.dianzhilengji-b-g-qufenshuiqi-06',
                                             '.dianzhilengji-jielengquelie-g-lixindianzhilengjiA2-02',
                                             '.dianzhilengji-b-g-qufenshuiqi-08',
                                             '.dianzhilengji-jielengquelie-g-lixindianzhilengjiA1-02'];

        //先全关闭
                pipelineStatus(0,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01');
                pipelineStatus(0,shenlongchengLengqueshuiLine[0],shenlongchengLengqueshuiLine[1],shenlongchengLengqueshuiLine[2],shenlongchengLengqueshuiLine[3],shenlongchengLengqueshuiLine[4],shenlongchengLengqueshuiLine[5],shenlongchengLengqueshuiLine[6],shenlongchengLengqueshuiLine[7]);
                pipelineStatus(0,shenlongchengLengshuiLine[0],shenlongchengLengshuiLine[1],shenlongchengLengshuiLine[2],shenlongchengLengshuiLine[3],shenlongchengLengshuiLine[4],shenlongchengLengshuiLine[5],shenlongchengLengshuiLine[6],shenlongchengLengshuiLine[7]);

            if(classinstanceid97Flag == 1 || classinstanceid98Flag ==1 ||classinstanceid99Flag ==1 || classinstanceid100Flag ==1 || classinstanceid101Flag ==1){
                pipelineStatus(1,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01');
                if(classinstanceid97Flag == 1){//电冷机A1
                    pipelineStatus(1,shenlongchengLengshuiLine[7],shenlongchengLengshuiLine[6],shenlongchengLengshuiLine[5],shenlongchengLengshuiLine[4],shenlongchengLengshuiLine[3],shenlongchengLengshuiLine[2],shenlongchengLengshuiLine[1],shenlongchengLengshuiLine[0]);
                }
                if(classinstanceid98Flag == 1){//电冷机A2
                    pipelineStatus(1,shenlongchengLengqueshuiLine[0],shenlongchengLengqueshuiLine[1]);
                    pipelineStatus(1,shenlongchengLengshuiLine[5],shenlongchengLengshuiLine[4],shenlongchengLengshuiLine[3],shenlongchengLengshuiLine[2],shenlongchengLengshuiLine[1],shenlongchengLengshuiLine[0]);
                }
                if(classinstanceid99Flag == 1){//电冷机A3
                    pipelineStatus(1,shenlongchengLengqueshuiLine[0],shenlongchengLengqueshuiLine[1],shenlongchengLengqueshuiLine[2],shenlongchengLengqueshuiLine[3]);
                    pipelineStatus(1,shenlongchengLengshuiLine[3],shenlongchengLengshuiLine[2],shenlongchengLengshuiLine[1],shenlongchengLengshuiLine[0]);
                }
                if(classinstanceid100Flag == 1){//电冷机B1
                    pipelineStatus(1,shenlongchengLengqueshuiLine[0],shenlongchengLengqueshuiLine[1],shenlongchengLengqueshuiLine[2],shenlongchengLengqueshuiLine[3],shenlongchengLengqueshuiLine[4],shenlongchengLengqueshuiLine[5]);
                    pipelineStatus(1,shenlongchengLengshuiLine[1],shenlongchengLengshuiLine[0]);
                }
                if(classinstanceid101Flag == 1){//电冷机B2
                    pipelineStatus(1,shenlongchengLengqueshuiLine[0],shenlongchengLengqueshuiLine[1],shenlongchengLengqueshuiLine[2],shenlongchengLengqueshuiLine[3],shenlongchengLengqueshuiLine[4],shenlongchengLengqueshuiLine[5],shenlongchengLengqueshuiLine[6],shenlongchengLengqueshuiLine[7]);
                }
            }else{
                pipelineStatus(0,'.dianzhilengji-jielengquelie-in01','.dianzhilengji-blixindianzhilengjiA1-out01','.dianzhilengji-jielengquelie-g-lixindianzhilengjiB2-out01','.dianzhilengji-b-g-qufenshuiqi-in01');
                pipelineStatus(0,shenlongchengLengqueshuiLine[0],shenlongchengLengqueshuiLine[1],shenlongchengLengqueshuiLine[2],shenlongchengLengqueshuiLine[3],shenlongchengLengqueshuiLine[4],shenlongchengLengqueshuiLine[5],shenlongchengLengqueshuiLine[6],shenlongchengLengqueshuiLine[7]);
                pipelineStatus(0,shenlongchengLengshuiLine[0],shenlongchengLengshuiLine[1],shenlongchengLengshuiLine[2],shenlongchengLengshuiLine[3],shenlongchengLengshuiLine[4],shenlongchengLengshuiLine[5],shenlongchengLengshuiLine[6],shenlongchengLengshuiLine[7]);
            }

            /*
                if(classinstanceid101Flag == 0 && classinstanceid100Flag == 0 && classinstanceid99Flag == 0 && classinstanceid98Flag == 0) {
                   pipelineStatus(0, '.dianzhilengji-jielengquelie-b-lixindianzhilengjiA1-02','.dianzhilengji-b-lixindianzhilengjiA1-01')
                }
                if(classinstanceid101Flag == 0 && classinstanceid100Flag == 0 && classinstanceid99Flag == 0) {
                   pipelineStatus(0, '.dianzhilengji-jielengquelie-b-lixindianzhilengjiA2-02','')
                }
                */
            // C区 燃气锅炉组 共享管道显示逻辑

            //交错放置并行热水的输入输出管道
            var shenlongchengCReshuiLines = ['.dianzhilengji-c-reshuiguolu-A1-01',
                                             '.dianzhilengji-c-reshuiguolu-o-A2-02',
                                             '.dianzhilengji-c-reshuiguolu-A2-02',
                                             '.dianzhilengji-c-reshuiguolu-o-A3-02'];
            //燃气的输入输出管道				
            var shenlongchengCRanqiLines = ['.dianzhilengji-c-reshuiguolu-y-B1-03',
                                            '.dianzhilengji-c-reshuiguolu-y-A2-01'];

        //先全关闭
                pipelineStatus(0,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01','.dianzhilengji-c-reshuiguolu-y-B1-02');
                pipelineStatus(0,shenlongchengCReshuiLines[0],shenlongchengCReshuiLines[1],shenlongchengCReshuiLines[2],shenlongchengCReshuiLines[3]);
                pipelineStatus(0,shenlongchengCRanqiLines[0],shenlongchengCRanqiLines[1]);

            if(classinstanceid103Flag == 1 || classinstanceid104Flag ==1 ||classinstanceid105Flag ==1 || classinstanceid106Flag ==1){
                pipelineStatus(1,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01','.dianzhilengji-c-reshuiguolu-y-B1-02');

                if(classinstanceid103Flag == 1){//燃气锅炉A1
                    pipelineStatus(1,shenlongchengCRanqiLines[1],shenlongchengCRanqiLines[0]);
                }
                if(classinstanceid104Flag == 1){//燃气锅炉A2
                    pipelineStatus(1,shenlongchengCReshuiLines[0],shenlongchengCReshuiLines[1]);
                    pipelineStatus(1,shenlongchengCRanqiLines[1],shenlongchengCRanqiLines[0]);
                }
                if(classinstanceid105Flag == 1){//燃气锅炉A3
                    pipelineStatus(1,shenlongchengCReshuiLines[0],shenlongchengCReshuiLines[1],shenlongchengCReshuiLines[2],shenlongchengCReshuiLines[3]);
                    pipelineStatus(1,shenlongchengCRanqiLines[0]);
                }
                if(classinstanceid106Flag == 1){//燃气锅炉B1
                    pipelineStatus(1,shenlongchengCReshuiLines[0],shenlongchengCReshuiLines[1],shenlongchengCReshuiLines[2],shenlongchengCReshuiLines[3]);
                }
            }else{
                pipelineStatus(0,'.dianzhilengji-c-jiereshuixunhuanlie-in01','.dianzhilengji-c-reshuiguolu-o-A1-out01','.dianzhilengji-c-reshuiguolu-y-B1-02');
                pipelineStatus(0,shenlongchengCReshuiLines[0],shenlongchengCReshuiLines[1],shenlongchengCReshuiLines[2],shenlongchengCReshuiLines[3]);
                pipelineStatus(0,shenlongchengCRanqiLines[0],shenlongchengCRanqiLines[1]);
            }


        }
        function huanghuaEquipStatFn(data) {
        console.log('equip status fn',data);
        //console.log(data.status.data.length )
            if(data.status.data.length == 0) { console.log('工艺图设备状态列表为空'); return;}
          //, globalMode = 1 // 默认供冷模式
           $.each(data.status.data.list, function(index, value){
                //黄花D区电冷机17,18
                if(value.classinstanceid === 17 && value.datavalue1 === '0') {
                    equipStatus(0,huanghuaDianlengji17);  
addClassinstanceid(huanghuaDianlengji17,17);
                    //pipelineStatus(0,'.huanghua-d-lixindianlengji01');
                    classinstanceid17Flag = 0
                }
                //中德开始
                else if(value.classinstanceid === 10340 && value.datavalue1 === '0') {
                    equipStatus(0,'#zhongdeDianzhilengji');  
addClassinstanceid('#zhongdeDianzhilengji',10340);
                }else if(value.classinstanceid === 10340 && value.datavalue1 === '1') {
                    equipStatus(1,'#zhongdeDianzhilengji');  
addClassinstanceid('#zhongdeDianzhilengji',10340);
                 
                }else if(value.classinstanceid === 10342 && value.datavalue1 === '0') {
                    equipStatus(1,'#zhongdeDiyuanrebeng');  
addClassinstanceid('#zhongdeDiyuanrebeng',10342);
                }else if(value.classinstanceid === 10342 && value.datavalue1 === '1') {
                    equipStatus(1,'#zhongdeDiyuanrebeng');  
addClassinstanceid('#zhongdeDiyuanrebeng',10342);
                }else if(value.classinstanceid === 10343 && value.datavalue1 === '0') {
                    equipStatus(1,'#zhongdeXiulengji');  
addClassinstanceid('#zhongdeXiulengji',10343);
                }else if(value.classinstanceid === 10343 && value.datavalue1 === '1') {
                    equipStatus(1,'#zhongdeXiulengji');  
addClassinstanceid('#zhongdeXiulengji',10343);
                //中德结束
                } else if(value.classinstanceid === 17 && value.datavalue1 === '1') {
addClassinstanceid(huanghuaDianlengji17,17);
                    equipStatus(1,huanghuaDianlengji17);  
                    //releaseFn('huanghua-d-lixindianlengjiIn');

                    //pipelineStatus(1,'.huanghua-leng-0-in01','.huanghua-leng-0-out01','.huanghua-d-lixindianlengji01','.huanghua-leng-0-in02','.huanghua-leng-0-out02')
                    classinstanceid17Flag = 1
                } else if(value.classinstanceid === 18 && value.datavalue1 === '0') {
addClassinstanceid(huanghuaDianlengji18,18);
                    huanghuaDianlengji18.addClass('gray-filter');
                    //pipelineStatus(0,'.huanghua-d-lixindianlengji02');
                    classinstanceid18Flag = 0
                } else if(value.classinstanceid === 18 && value.datavalue1 === '1') {
addClassinstanceid(huanghuaDianlengji18,18);
                    huanghuaDianlengji18.removeClass('gray-filter');
                    //pipelineStatus(1,'.huanghua-leng-0-out01','.huanghua-leng-0-in01','.huanghua-leng-0-in02','.huanghua-leng-0-out02','.huanghua-d-lixindianlengji02')
                    classinstanceid18Flag = 1
                }
                //黄花A区发电机
                else if(value.classinstanceid  === 11 && value.datavalue1 === '0')         {
addClassinstanceid(huanghuaFadianji11,11);
                   equipStatus(0,huanghuaFadianji11,'#huanghuaDiwenlengqueta01','#huanghuaGaowenlengqueta01',huanghuaSanreqi42);  
                   ////pipelineStatus(0,'.huanghua-a-lengqueta01','.huanghua-a-fadianji01');
                   //pipelineStatus(0,'.huanghua-a-fadianji01','.huanghua-lengqueta-1-in01','.huanghua-lengqueta-1-out01','.huanghua-a-sanreqi01');
                   classinstanceid11Flag = 0; //1号发电机标识 
                   classinstanceid42Flag = 0; 
                }
                else if(value.classinstanceid  === 11 && value.datavalue1 === '1')         {
addClassinstanceid(huanghuaFadianji11,11);
                   equipStatus(1,huanghuaFadianji11,'#huanghuaDiwenlengqueta01','#huanghuaGaowenlengqueta01',huanghuaSanreqi42);  
                   
                   //判断供冷or热季，是否开启换热器
                   if(globalMode === 0) {
                        equipStatus(1,huanghuaSanreqi42); 
                        //pipelineStatus(1,'.huanghua-a-sanreqi01','.huanghua-yurezhiranji-1-in03-up','.huanghua-yurezhiranji-1-in02','.huanghua-yurezhiranji-1-in01','.huanghua-yurezhiranji-1-out03-up','.huanghua-yurezhiranji-1-out02','.huanghua-yurezhiranji-1-out01');//1号换热器路线
                       classinstanceid42Flag = 1; 
                     }
                   else if(globalMode === 1){
                        equipStatus(0,huanghuaSanreqi42); 
                        //pipelineStatus(0,'.huanghua-a-sanreqi01');
                       classinstanceid42Flag = 0; 
                    } // globalMode 1为供冷季节

                   //pipelineStatus(1,'.huanghua-a-fadianji01','.huanghua-lengqueta-1-in01','.huanghua-lengqueta-1-out01');
                   classinstanceid11Flag = 1; 
                }
                else if(value.classinstanceid  === 12 && value.datavalue1 === '0')         {
addClassinstanceid(huanghuaFadianji12,12);
                   equipStatus(0,huanghuaFadianji12,'#huanghuaDiwenlengqueta02','#huanghuaGaowenlengqueta02',huanghuaSanreqi43);  
                   //pipelineStatus(0,'.huanghua-fadianji-2-out03','.huanghua-fadianji-2-out04','.huanghua-yuretianxian-2-out02','.huanghua-fadianji-2-in02','.huanghua-fadianji-2-in01','.huanghua-lengqueta-2-out02','.huanghua-lengqueta-2-out03','.huanghua-lengqueta-2-in02','.huanghua-lengqueta-2-in03','.huanghua-fadianji-2-out01','.huanghua-fadianji-2-out02','.huanghua-lengqueta-2-in01','.huanghua-lengqueta-2-out01','.huanghua-a-sanreqi02');
                   classinstanceid12Flag = 0; 
                       classinstanceid43Flag = 0; //2号换热器 
                }
                else if(value.classinstanceid  === 12 && value.datavalue1 === '1')         {
addClassinstanceid(huanghuaFadianji12,12);
                   equipStatus(1,huanghuaFadianji12,'#huanghuaDiwenlengqueta02','#huanghuaGaowenlengqueta02',huanghuaSanreqi43);  

                   if(globalMode === 0) { 
                        equipStatus(1,huanghuaSanreqi43); 
                        //pipelineStatus(1,'.huanghua-a-sanreqi02','.huanghua-yurezhiranji-2-in04-up','.huanghua-yurezhiranji-2-in03','.huanghua-yurezhiranji-1-in01','.huanghua-yurezhiranji-2-out03-up','.huanghua-yurezhiranji-2-out04','.huanghua-yurezhiranji-1-out01');
                       classinstanceid43Flag = 1; 
                    }
                   else if(globalMode === 1){ 
                        equipStatus(0,huanghuaSanreqi43); 
                        //pipelineStatus(0,'.huanghua-a-sanreqi02');
                       classinstanceid43Flag = 0; 
                    } // globalMode 1为供冷季节

                   //pipelineStatus(1,'.huanghua-fadianji-2-out03','.huanghua-fadianji-2-out04','.huanghua-yuretianxian-2-out02','.huanghua-fadianji-2-in02','.huanghua-fadianji-2-in01','.huanghua-lengqueta-2-out02','.huanghua-lengqueta-2-out03','.huanghua-lengqueta-2-in02','.huanghua-lengqueta-2-in03','.huanghua-fadianji-2-out01','.huanghua-fadianji-2-out02','.huanghua-lengqueta-2-in01','.huanghua-lengqueta-2-out01');
                   classinstanceid12Flag = 1; 
                }
                else if(value.classinstanceid  === 13 && value.datavalue1 === '0')         {
addClassinstanceid(huanghuaYurezhiranji13,13);
                   huanghuaYurezhiranji13.addClass('gray-filter')
                   //pipelineStatus(0,'.huanghua-a-yurezhiranji01');
                   classinstanceid13Flag = 0; 
                }
                else if(value.classinstanceid  === 13 && value.datavalue1 === '1')         {
addClassinstanceid(huanghuaYurezhiranji13,13);
                   huanghuaYurezhiranji13.removeClass('gray-filter')
                   //pipelineStatus(1,'.huanghua-a-yurezhiranji01','.huanghua-yurezhiranji-1-in03-up','.huanghua-yurezhiranji-1-in03-down','.huanghua-yurezhiranji-1-out03-up','.huanghua-yurezhiranji-1-out03-down','.huanghua-yurezhiranji-1-in06','.huanghua-yurezhiranji-1-in01','.huanghua-yurezhiranji-1-out01','.huanghua-yurezhiranji-1-out06','.huanghua-yurezhiranji-1-in02','.huanghua-yurezhiranji-1-out02');
                   classinstanceid13Flag = 1; 
                }
                else if(value.classinstanceid  === 14 && value.datavalue1 === '0')         {
addClassinstanceid(huanghuaYurezhiranji14,14);
                   huanghuaYurezhiranji14.addClass('gray-filter')
                   //pipelineStatus(0,'.huanghua-a-l-yurezhiranji02');
                   classinstanceid14Flag = 0; 
                }
                else if(value.classinstanceid  === 14 && value.datavalue1 === '1')         {
addClassinstanceid(huanghuaYurezhiranji14,14);
                   huanghuaYurezhiranji14.removeClass('gray-filter')
                   //pipelineStatus(1,'.huanghua-a-l-yurezhiranji02','.huanghua-yurezhiranji-2-in04-up','.huanghua-yurezhiranji-2-out03-up','.huanghua-yurezhiranji-2-in03','.huanghua-yurezhiranji-2-out04','.huanghua-yurezhiranji-1-in01','.huanghua-yurezhiranji-1-out01','.huanghua-yurezhiranji-1-in06','.huanghua-yurezhiranji-1-in01','.huanghua-yurezhiranji-1-out01','.huanghua-yurezhiranji-1-out06');
                   classinstanceid14Flag = 1; 
                }
                //黄花BC区
                else if(value.classinstanceid  === 16 && value.datavalue1 === '0') {
addClassinstanceid(huanghuaRanqireshuiguolu16,16);
                    equipStatus(0,huanghuaSanreqi44,huanghuaRanqireshuiguolu16);  
                    //pipelineStatus(0,'.huanghua-bc-reshuiguolu');
                }
                else if(value.classinstanceid  === 16 && value.datavalue1 === '1') {
addClassinstanceid(huanghuaRanqireshuiguolu16,16);
                    equipStatus(1,huanghuaSanreqi44,huanghuaRanqireshuiguolu16);  
                    //pipelineStatus(1,'.huanghua-bc-reshuiguolu');
                }
                else if(value.classinstanceid  === 15 && value.datavalue1 === '0') {
addClassinstanceid(huanghuaRanqizhiranji15,15);
                    equipStatus(0,huanghuaRanqizhiranji15);  
                    //pipelineStatus(0,'.huanghua-bc-ranqizhiranji');
                }
                else if(value.classinstanceid  === 15 && value.datavalue1 === '1') {
addClassinstanceid(huanghuaRanqizhiranji15,15);
                    equipStatus(1,huanghuaRanqizhiranji15);  
                    //pipelineStatus(1,'.huanghua-bc-ranqizhiranji');
                }
           });
                if( classinstanceid17Flag === 0 && classinstanceid18Flag ===0) { //黄花D区
                    $('.huanghua-leng-0-in01').children('.inner').height(0);  
                    $('.huanghua-leng-0-out01').children('.inner').height(0);  
                    $('.huanghua-leng-0-in02').children('.inner').height(0);  
                    $('.huanghua-leng-0-out02').children('.inner').height(0);  
                } 
                if(classinstanceid13Flag === 0 && classinstanceid14Flag ===0 && classinstanceid42Flag === 0 && classinstanceid43Flag ===0){
                    //pipelineStatus(0,'.huanghua-yurezhiranji-1-in06','.huanghua-yurezhiranji-1-in01','.huanghua-yurezhiranji-1-out01','.huanghua-yurezhiranji-1-out06','.huanghua-yurezhiranji-1-in03-down')
                }
                if(classinstanceid12Flag === 1 && classinstanceid14Flag ===1 ){ //黄花2号发电机和2号余热直燃机

                   //pipelineStatus(1,'.huanghua-yurezhiranji-2-out05','.huanghua-yurezhiranji-2-in06','.huanghua-yurezhiranji-2-in05','.huanghua-yurezhiranji-2-out06','.huanghua-yuretianxian-2-in01');
                }
                if(classinstanceid12Flag === 0 && classinstanceid14Flag ===0 ){ //黄花2号发电机和2号余热直燃机
                    //pipelineStatus(0,'.huanghua-yurezhiranji-2-in04-up','.huanghua-yurezhiranji-2-in03','.huanghua-yurezhiranji-2-out03-up','.huanghua-yurezhiranji-2-out04')
                }
                if(classinstanceid12Flag === 0 || classinstanceid14Flag ===0 ) {
                   //pipelineStatus(0,'.huanghua-yurezhiranji-2-out05','.huanghua-yurezhiranji-2-in06','.huanghua-yurezhiranji-2-in05','.huanghua-yurezhiranji-2-out06','.huanghua-yuretianxian-2-in01');
                }
                if(classinstanceid11Flag === 1 && classinstanceid13Flag ===1 ){ //黄花1号发电机和1号余热直燃机
                   ////pipelineStatus(1,'.huanghua-a-lengqueta01','.huanghua-a-fadianji01');
                   //pipelineStatus(1,'.huanghua-yurezhiranji-1-in07','.huanghua-yurezhiranji-1-in08','.huanghua-yurezhiranji-1-out07','.huanghua-yurezhiranji-1-out08','.huanghua-yuretianxian-1-in01');
                }
                if(classinstanceid11Flag === 0 && classinstanceid13Flag ===0 ){ //黄花1号发电机和1号余热直燃机
                    //pipelineStatus(0,'.huanghua-yurezhiranji-1-in03-up','.huanghua-yurezhiranji-1-out03-down','.huanghua-yurezhiranji-1-out03-up','.huanghua-yurezhiranji-1-in02','.huanghua-yurezhiranji-1-out02')
                }

                if(classinstanceid11Flag === 0 || classinstanceid13Flag ===0 ) {
                   //pipelineStatus(0,'.huanghua-yurezhiranji-1-in07','.huanghua-yurezhiranji-1-in08','.huanghua-yurezhiranji-1-out07','.huanghua-yurezhiranji-1-out08','.huanghua-yuretianxian-1-in01');
                }
                if(classinstanceid11Flag === 1 && classinstanceid42Flag ===1 ) { //1号发电机和换热器
                        //pipelineStatus(1,'.huanghua-a-sanreqi-fadianji01');//1号换热器路线
                }
                if(classinstanceid11Flag === 0 || classinstanceid42Flag ===0 ) { //1号发电机和换热器
                        //pipelineStatus(0,'.huanghua-a-sanreqi-fadianji01');//1号换热器路线
                }
                if(classinstanceid12Flag === 1 && classinstanceid43Flag ===1 ) { //2号发电机和换热器
                        //pipelineStatus(1,'.huanghua-a-sanreqi-fadianji02');//1号换热器路线
                }
                if(classinstanceid12Flag === 0 || classinstanceid43Flag ===0 ) { //2号发电机和换热器
                        //pipelineStatus(0,'.huanghua-a-sanreqi-fadianji02');//1号换热器路线
                }
                if(classinstanceid11Flag === 0 && classinstanceid42Flag ===0 ) { //1号发电机和换热器
                        //pipelineStatus(0,'.huanghua-lengqueta-1-in01','.huanghua-lengqueta-1-out01')
                }
                if(classinstanceid12Flag === 0 && classinstanceid43Flag ===0 ) { //2号发电机和换热器
                        //pipelineStatus(0,'.huanghua-lengqueta-2-in01','.huanghua-lengqueta-2-out01')
                }

                if(classinstanceid13Flag === 0 && classinstanceid42Flag ===0 ) { //1号余热直燃机和换热器
                    //pipelineStatus(0,'.huanghua-yurezhiranji-1-in03-up','.huanghua-yurezhiranji-1-out03-up','.huanghua-yurezhiranji-1-in02','.huanghua-yurezhiranji-1-out02')
                }
                if(classinstanceid13Flag === 0 && classinstanceid14Flag ===0 ) {
                    //pipelineStatus(0,'.huanghua-yurezhiranji-1-in06','.huanghua-yurezhiranji-1-out06')
                }
                if(classinstanceid14Flag === 0 && classinstanceid43Flag ===0 ) { //2号余热直燃机和换热器
                    //pipelineStatus(0,'.huanghua-yurezhiranji-2-in04-up','.huanghua-yurezhiranji-2-out03-up','.huanghua-yurezhiranji-2-in03','.huanghua-yurezhiranji-2-out04')
                }
        }

        var lixindianlengjiIn01 = [
            function() { animateFn('.huanghua-leng-0-in02 .inner', {'height':'100%'}, 1428, 'linear',function(){releaseFn('huanghua-d-lixindianlengjiIn')});}, // duration = height * spd 4.2
            function() { animateFn('.huanghua-leng-1-in01 .inner', {'height':'100%'}, 3087, 'linear',function(){releaseFn('huanghua-d-lixindianlengjiIn')});},
            function() { animateFn('.huanghua-leng-1-in02 .inner', {'height':'100%'}, 1134, 'linear',function(){releaseFn('huanghua-d-lixindianlengjiIn')});},
            function() { animateFn('.huanghua-leng-1-out01 .inner', {'height':'100%'}, 1281, 'linear',function(){releaseFn('huanghua-d-lixindianlengjiIn')});},
            function() { animateFn('.huanghua-leng-0-out01 .inner', {'height':'100%'}, 1071, 'linear',function(){releaseFn('huanghua-d-lixindianlengjiIn')});}
        ];
        /*
        动画名
        队列名
        */
        $doc.queue('huanghua-d-lixindianlengjiIn',lixindianlengjiIn01 );
        /*释放队列下一个*/
        function releaseFn(name) {
            $doc.dequeue(name);
        }
        /* 动画公用函数
        ele对象 obj
        styles 属性 obj
        duration 持续时间 number
        easing 方式 string
        callback 回调 function
        */
        function animateFn(ele,styles,duration,easing,callback) {
            $(ele).animate(styles,duration,easing, callback);
        }
        /* 工艺图end */
        function equipsPopup(pid){
            switch(pid) {
                case 1:
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/labellist?pageid=100', jsonp: 'labellist',done:huanghAlabellistFn});
                    localJsonp.start({url:ajaxPath+'labellist100.js',jsonpCallback:'labellist',done:huanghAlabellistFn});
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/equipState', jsonp: 'equipState',done:huanghuaEquipStatFn});
                    localJsonp.start({url:ajaxPath+'huanghua-equipments.js',jsonpCallback:'equipState',done:huanghuaEquipStatFn});
                    break;
                case 3:
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/labellist?pageid=101', jsonp: 'labellist',done:tinghuLabellistFn});
                    localJsonp.start({url:ajaxPath+'labellist101.js',jsonpCallback:'labellist',done:tinghuLabellistFn});
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/equipState', jsonp: 'equipState',done:tinghuEquipStatFn});
                    localJsonp.start({url:ajaxPath+'tinghu-equipments.js',jsonpCallback:'equipState',done:tinghuEquipStatFn});
                    break;
                case 4:
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/labellist?pageid=102', jsonp: 'labellist',done:shenlongchengLabellistFn});
                    localJsonp.start({url:ajaxPath+'labellist102.js',jsonpCallback:'labellist',done:shenlongchengLabellistFn});
                    //demand.start({url:'http://10.36.128.73:8080/reds/ds/equipState', jsonp: 'equipState',done:shenlongchengEquipStatFn});
                    localJsonp.start({url:ajaxPath+'shenlongcheng-equipments.js',jsonpCallback:'equipState',done:shenlongchengEquipStatFn});
                    break;
            }
        }
        function checkCallbackFn(fn) {
            if(typeof fn == 'function') fn();
        }
        // 工艺图切换
        function selectGYT(id,callback) {
            switch(id) {
                case '1': 
                    gytSelectFn(false,'#huanghuaArtwork', '黄花工艺设计图'); 
                    showBottomArea('huanghua-thumbnail');
                    //artworkBottomHeight(348);//底部高度
                    //artworkBottomHeight(116);//底部高度
                    artworkBottomHeight(335);//底部高度
                    builtTailIcon(1,4);
                    //equipsPopup(1);
                    intervalGYTData1 = myTimeoutFn(function(){equipsPopup(1)}, minsUpdate); 
                    checkCallbackFn(callback)
                    break;
                case '3': 
                    gytSelectFn(false,'#tinghuArtwork', '亭湖工艺设计图'); 
                    showBottomArea('tinghu-thumbnail');
                    //artworkBottomHeight(648);//底部高度
                    //artworkBottomHeight(256);//底部高度
                    artworkBottomHeight(605);//底部高度
                    builtTailIcon(3,4); //构建下标
                    //equipsPopup(3);
                    intervalGYTData2 = myTimeoutFn(function(){equipsPopup(3)}, minsUpdate); 
                    checkCallbackFn(callback)
                    break;
                case '4': 
                    gytSelectFn(false,'#shenlongchengArtwork', '神农城工艺设计图'); 
                    showBottomArea('shenlongcheng-thumbnail');
                    //artworkBottomHeight(458);
                    //artworkBottomHeight(156);
                    artworkBottomHeight(415);
                    builtTailIcon(4,3);
                    //equipsPopup(4);
                    intervalGYTData3 = myTimeoutFn(function(){equipsPopup(4)}, minsUpdate); 
                    checkCallbackFn(callback)
                    break;
            }
        }
        /**************end*************/
            }());
});
