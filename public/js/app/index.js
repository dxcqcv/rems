define(function(require){
    var $ = require('jquery')
      , jsonpPath = require('app/getJsonp')
      , api = require('app/getApi')
    ;
    (function(){
        var localData = null // global data
          , isAll = false // check all or not 
          , map
          ;

        function Index(){
            this.winHeight = $(window).height();
            this.str = '';
            this.sum = 20;
            this.itemsDone = false;
        }
        Index.prototype = {
            init: function() {
                //localData != null ? localData : localJsonp.start({url:jsonpPath+'gislist.js',jsonpCallback:'gislist',done:this.getGislist}) 
                localData != null ? localData : demand.start({url:'/api/gislist_features.json', done:this.getGislist});
                this.switchProject();
                this.enterProject();
//                this.configMap(); 
            },
            getHeight: function() {
                return this.winHeight = $(window).height();
            },
            couterItems: function(h) {
                var currentHeight = this.getHeight(); 
                if (currentHeight > 810) return 4;
                else if(currentHeight < 810 && currentHeight > 700) return 3;
                else if(currentHeight < 700 && currentHeight > 600) return 2;
                else if(currentHeight < 600) return 1;
            },
            enterProject: function() {
                $(document)
                    .on('click','.my-index-enter',function(){
                        var $this = $(this);
                        var longitude = $this.data('longitude');
                        var latitude = $this.data('latitude'); 
                        var isList = $this.attr('data-list');
                        var projectid = $this.attr("data-projectid");
                        var title = $this.attr('title');


                        if(isList == 0) {


                        $this
                            .attr('data-list',1)
                            .parent('div.item').siblings('div').attr('data-list',0).find('.project-icon').removeClass('project-icon-clicked').end().find('.project-list-detail').addClass('hide').end().end().end()
                            .siblings('div').attr('data-list',0).find('.project-icon').removeClass('project-icon-clicked').end().find('.project-list-detail').addClass('hide').end().end()
                            .find('.project-icon').addClass('project-icon-clicked').end()
                            .find('.project-list-detail').removeClass('hide'); 
                            map.setZoomAndCenter(10, [longitude, latitude]);
                            
                            //$('.markerlnglat'+projectid+'').attr('src','/img/index/icon-map-icon.png')
$('.maker'+projectid+'').parents('.amap-marker').siblings('.amap-marker').find('.index-map-maker').removeClass('map-maker-big').end().end().end().addClass('map-maker-big');
                        } else {
                            localStorage.setItem('curProjectid', projectid );
                            localStorage.setItem('curProjectidName', title);
                            //demand.start({url:'/api/clickProject.json',data:{projectid:projectid}, done:function(data){
                                //window.location = '/user/xmgl?projectid='+projectid+'&title='+title+'';
                                window.location = '/user/gyjc';

                            //}});
                        }

                    }) 
                    // data-longitude="'+longitude+'" data-latitude="'+latitude+'"
                    //.on('mouseover','.my-index-enter',function(){
                        //var id = $(this).data('projectid');
                        //$('.maker'+id+'').addClass('map-maker-big');
                    //}).on('mouseleave','.my-index-enter',function(){
                        //var id = $(this).data('projectid');
                        //$('.maker'+id+'').removeClass('map-maker-big');
                    //})
                ; 
            },
            getNums: function() {
                  var num = [this.couterItems(),this.couterItems()*3];
                  return num; // return display projects nums 3 or 4, 9 or 12
            },
            switchProject: function() {
                var switchButton = $('.my-index-switch')
                  , self = this
                  ;
                switchButton.on('click', function(){
                    var $this = $(this)
                      , nums = self.getNums()
                      ;
                    $this.toggleClass('my-index-switch-list');
                    if($this.hasClass('my-index-switch-list')) {
                        self.indexProject(nums[0],self.projectList, 0);// 
                        isAll = false;
                    } else {
                        self.indexProject(nums[1],self.projectAll,1);
                        isAll = true;
                    }
                });
            },
            makeIndicators: function(num) {
                return this.str += '<li class="my-indicators" data-target="#myCarousel" data-slide-to="'+num+'"></li>'; 
            },
            projectIndicators: function(sum, type) {
                    this.makeIndicators();
                var
                   k = this.getNums()
                  , items
                  , regI = new RegExp('<li class="my-indicators"',i)
                  ;   
                if(type == 0) items = sum / k[0]; 
                else items = sum / k[1]; 
                this.str = '';

                for(var i = 0; i < items; i++ )
                this.makeIndicators(i);
                this.str = this.str.replace(regI,'<li class="my-indicators active"');
                $('.carousel-indicators').empty().append(this.str);
                this.str = '';
            },
            projectList: function(projectName,projectId,longitude, latitude,industrytypename,address,buildingarea,supplyarea,data1,data2,data3,data4) {
                    var img = '<img src="/img/index/loacationimg00.jpg" class="" alt="">';
                    switch(projectId) {
                        case '1': 
                            img = '<img src="/img/index/HHJC.jpg" class="" alt="">';
                            break;
                        case '3': 
                            img = '<img src="/img/index/THYY.jpg" class="" alt="">';
                            break;
                        case '4': 
                            img = '<img src="/img/index/shnch.jpg" class="" alt="">';
                            break;
                            //肇庆
                        case '6': 
                            img = '<img src="/img/index/ZQ2.jpg" class="" alt="">';
                            break;
                            //中德1号站
                        case '10': 
                            img = '<img src="/img/index/ZQ2.jpg" class="" alt="">';
                            break;
                            //中德4号站
                        case '17': 
                            img = '<img src="/img/index/ZQ2.jpg" class="" alt="">';
                            break;
                            //新奥生态城
                        case '24': 
                            img = '<img src="/img/index/ENNSTC.jpg" class="" alt="">';
                            break;
                            //株洲职教城
                        case '5': 
                            img = '<img src="/img/index/ZZZJC.jpg" class="" alt="">';
                            break;
                            //民生药业
                        case '7': 
                            img = '<img src="/img/index/MSYY.jpg" class="" alt="">';
                            break;
                        default:
                            //img = '<img src="/img/index/loacationimg00.jpg" class="" alt="">';
                            img = '<img src="/img/index/loacationimg00.jpg" class="" alt="">';
                    }


                    return this.str += 
                        //'shangwenlong<div class="my-index-project-box my-index-enter clearfix triggerNav" data-show="xmgl" data-subshow="xmgl-" data-projectid="'+projectId+'" data-longitude="'+longitude+'" data-latitude="'+latitude+'"  data-list="0" title="'+projectName+'">'+
                        'shangwenlong<div class="my-index-project-box my-index-enter clearfix triggerNav" data-show="ycjc" data-subshow="ycjc-gyjc" data-projectid="'+projectId+'" data-longitude="'+longitude+'" data-latitude="'+latitude+'"  data-list="0" title="'+projectName+'">'+
                            '<div class="project-list-left">'+
                                '<span class="project-icon"></span>'+
                                '<p class="project-name">'+ projectName +'</p>'+
                                '<p class="project-loc" title="'+address+'">'+address+'</p>'+
                                '<span class="pro-left-line"></span>'+
                            '</div>'+
                            '<div class="project-list-img-wrapper">'+
                                '<div class="project-list-img">'+
                                    img+ 
                                '</div>'+
                                '<div class="project-list-detail hide">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<p class="detail-name">能源综合利用率</p>'+
                                            '<p class="detail-val">'+data1+'</p>'+
                                        '</li>'+
                                        '<li>'+
                                            '<p class="detail-name">可再生能源利用率</p>'+
                                            '<p class="detail-val">'+data2+'</p>'+
                                        '</li>'+
                                        '<li>'+
                                            '<p class="detail-name">节能率</p>'+
                                            '<p class="detail-val">'+data3+'</p>'+
                                        '</li>'+
                                        '<li>'+
                                            '<p class="detail-name">CO2减排率</p>'+
                                            '<p class="detail-val">'+data4+'</p>'+
                                        '</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                            '<div class="project-list-right">'+
                                '<div class="project-circle project-circle-top">'+
                                    '<span>供能</span><span class="pro-num">'+this.filterWan(supplyarea)+'万</span>'+
                                '</div>'+
                                '<div class="pro-type">'+
                                    '<div class="glyphicon glyphicon-home pro-type-icon"></div>'+
                                    '<div class="pro-type-name">'+industrytypename+'/㎡</div>'+
                                '</div>'+
                                '<div class="project-circle project-circle-bottom">'+
                                    '<span>建筑</span><span class="pro-num">'+this.filterWan(buildingarea)+'万</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            },
            projectAll: function(projectName,projectId) {
                var img = 'my-index-list-def';
                    switch(projectId) {
                        case '1': 
                            img = 'my-index-list-hh';
                            break;
                        case '3': 
                            img = 'my-index-list-th';
                            break;
                        case '4': 
                            img = 'my-index-list-snc';
                            break;
                            //肇庆
                        case '6': 
                            img = 'my-index-list-zq';
                            break;
                            //中德1号站
                        case '10': 
                            img = 'my-index-list-zd1';
                            break;
                            //中德4号站
                        case '17': 
                            img = 'my-index-list-zd4';
                            break;
                            //新奥生态城
                        case '24': 
                            img = 'my-index-list-xastc';
                            break;
                            //株洲职教城
                        case '5': 
                            img = 'my-index-list-zzzjc';
                            break;
                            //民生药业
                        case '7': 
                            img = 'my-index-list-msyy';
                            break;
                        default:
                            img = 'my-index-list-def';
                    }
                //return this.str += 'shangwenlong<div class="my-index-list-cont my-index-enter triggerNav '+ img+'" data-projectid="'+projectId+'" data-list="1" data-show="xmgl" data-subshow="xmgl-" title="'+projectName+'"><span class="my-index-list-name">'+projectName+'</span></div>';
                return this.str += 'shangwenlong<div class="my-index-list-cont my-index-enter triggerNav '+ img+'" data-projectid="'+projectId+'" data-list="1" data-show="ycjc" data-subshow="ycjc-gyjc" title="'+projectName+'"><span class="my-index-list-name">'+projectName+'</span></div>';
            },
            makeItems: function() {
                        this.str += '<div class="item"></div>';
            },
            filterWan: function(num) {
                return (num/10000).toFixed(1); 
            }, 
            indexItems: function(sum,type) {
                var
                   k = this.getNums()
                  , items
                  , regI = new RegExp('<div class="item">',i)
                  ;   
                if(type == 0) items = sum / k[0]; 
                else items = sum / k[1]; 
                this.str = '';

                for(var i = 0; i < items; i++ )
                this.makeItems();
                this.str = this.str.replace(regI,'<div class="item active">');
                $('.carousel-inner').empty().append(this.str);
                this.str = '';
                this.itemsDone = true;
            },
            getGislist: function(data) {
            console.log(data);
                localData = data.status.data.gislist;
                var nums = index.getNums();
                index.indexProject(nums[0],index.projectList,0); //trigger indexProject
                index.configMap(localData); 
            },
            indexProject: function(num,fn,type) {
                var self = this
                  , k = num 
                  , temp = '' 
                  , len = localData.length
                  ;

                this.indexItems(len,type);
                this.projectIndicators(len,type);
                if(this.itemsDone) {
                    $.each(localData, function(i,v){
                        if(v.featureslist.length === 0) v.featureslist.push({datavalue:0},{datavalue:0},{datavalue:0},{datavalue:0});
                        self.str = fn.call(self, v.projectname,v.projectid,v.longitude, v.latitude,v.industrytypename,v.address,v.buildingarea,v.supplyarea,v.featureslist[0].datavalue,v.featureslist[1].datavalue,v.featureslist[2].datavalue,v.featureslist[3].datavalue); 
                    });

                    self.str = self.str.split('shangwenlong'); // splited by string shangwenlong
                    self.str.shift(); // remove first ''
                    $('.item').each(function(i,v) {
                        for(var i = 0; i<k; i++) {
                            if(typeof self.str[0] == 'undefined') continue; // continue if undefined
                            temp += self.str.shift(); 
                        }
                        $(v).empty().append(temp);
                        temp = '';
                    });
                }
                this.itemsDone = false;
            },
            configMap: function (data) {
                 map = new AMap.Map('allmap', {
                        resizeEnable: true,
                      // 设置中心点
                      center: [116.404, 39.915],

                      // 设置缩放级别
                      zoom: 4
                });

                   //在地图中添加ToolBar插件
                map.plugin(["AMap.ToolBar"], function () {
                  toolBar = new AMap.ToolBar();
                  map.addControl(toolBar);
                }); 
                //添加自定义点标记

                //localData.length
                for(var i = 0, l = data.length; i < l; i++)
                $.each(data, function(i,v){
                    if(v.state == 1) addMarker(v.longitude, v.latitude, v.projectid,'index-map-maker-building');//state 1 is building
                    else  addMarker(v.longitude, v.latitude, v.projectid,'');
                });
                
                //添加带文本的点标记覆盖物
                function addMarker(longitude, latitude,projectid,className){ 
                    //自定义点标记内容   
                    var markerContent = document.createElement("div");
                    markerContent.className = "markerContentStyle";
                    
                    //点标记中的图标
                    //var markerImg = document.createElement("img");
                     //markerImg.className = "markerlnglat"+projectid+"";
                     //markerImg.src = "/img/index/icon-map_1.png"; 
                     //markerContent.appendChild(markerImg);
                     var markerIcon = document.createElement('span');
                     markerIcon.className = "index-map-maker maker"+projectid+" " +className;
                     markerContent.appendChild(markerIcon);

                     
                     //点标记中的文本
                     var markerSpan = document.createElement("span");
                     markerSpan.innerHTML = "";
                     markerContent.appendChild(markerSpan);

                     var marker = new AMap.Marker({
                        map:map,
                        //position: new AMap.LngLat(116.397428,39.90923), //基点位置
                        position: new AMap.LngLat(longitude,latitude), //基点位置
                        offset: new AMap.Pixel(-18,-36), //相对于基点的偏移位置
                        draggable: true,  //是否可拖动
                        content: markerContent   //自定义点标记覆盖物内容
                    });

                    
                     marker.setMap(map);  //在地图上添加点
                    
                     //鼠标点击marker弹出自定义的信息窗体
                    //AMap.event.addListener(marker, 'mouseover', function() {
                        //infoWindow.open(map, marker.getPosition());
                    //});
                    //AMap.event.addListener(marker, 'click', function() {
                        //window.location.href="/user/xmgl";
                    //});
                    
                }


              //实例化信息窗体
                //var infoWindow = new AMap.InfoWindow({
                    //isCustom: true,  //使用自定义窗体
                    //content: createInfoWindow('方恒假日酒店&nbsp;&nbsp;<span style="font-size:11px;color:#F00;">价格:318</span>', "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134' style='position:relative;float:left;margin:0 5px 5px 0;'>地址：北京市朝阳区阜通东大街6号院3号楼 东北 8.3 公里<br/>电话：010 64733333<br/><a href='http://baike.baidu.com/view/6748574.htm'>详细信息</a>"),
                    //offset: new AMap.Pixel(16, -45)//-113, -140
                //});

                //构建自定义信息窗体
                //function createInfoWindow(title, content) {
                    //var info = document.createElement("div");
                    //info.className = "info";

                    ////可以通过下面的方式修改自定义窗体的宽高
                    ////info.style.width = "400px";

                    //// 定义顶部标题
                    //var top = document.createElement("div");
                    //var titleD = document.createElement("div");
                    //var closeX = document.createElement("img");
                    //top.className = "info-top";
                    //titleD.innerHTML = title;
                    //closeX.src = "http://webapi.amap.com/images/close2.gif";
                    //closeX.onclick = closeInfoWindow;

                    //top.appendChild(titleD);
                    //top.appendChild(closeX);
                    //info.appendChild(top);


                    //// 定义中部内容
                    //var middle = document.createElement("div");
                    //middle.className = "info-middle";
                    //middle.style.backgroundColor = 'white';
                    //middle.innerHTML = content;
                    //info.appendChild(middle);

                    //// 定义底部内容
                    //var bottom = document.createElement("div");
                    //bottom.className = "info-bottom";
                    //bottom.style.position = 'relative';
                    //bottom.style.top = '0px';
                    //bottom.style.margin = '0 auto';
                    //var sharp = document.createElement("img");
                    //sharp.src = "http://webapi.amap.com/images/sharp.png";
                    //bottom.appendChild(sharp);
                    //info.appendChild(bottom);
                    //return info;
                //}

                ////关闭信息窗体
                //function closeInfoWindow() {
                    //map.clearInfoWindow();
                //}
            }
        }
        var index = new Index();
        index.init();
        $(window).resize(function(){
            if(localData) {
                var nums = index.getNums()
                if(!isAll) index.indexProject(nums[0],index.projectList,0); 
                else index.indexProject(nums[1],index.projectAll,1);
            }
                 
        });
    }());
});
