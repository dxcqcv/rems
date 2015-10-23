define(function(require){
    var $ = require('jquery')
      , jsonpPath = require('app/getJsonp')
    ;
    (function(){
        var localData = null;
        function Index(){
            this.winHeight = $(window).height();
            this.str = '';
            this.sum = 20;
            this.itemsDone = false;
        }
        Index.prototype = {
            init: function() {
                this.configMap(); 
                localData != null ? localData : localJsonp.start({url:jsonpPath+'gislist.js',jsonpCallback:'gislist',done:this.getGislist}) 
                //this.indexProject(3,4,this.projectList);
                this.switchProject();
                this.enterProject();
            },
            getHeight: function() {
                return this.winHeight = $(window).height();
            },
            enterProject: function() {
                $(document).on('click','.my-index-project-box',function(){
                    window.location = '/user/xmgl';  
                }); 
            },
            switchProject: function() {
                var switchButton = $('.my-index-switch')
                  , self = this
                  ;
                switchButton.on('click', function(){
                    var $this = $(this)
                      ;
                    $this.toggleClass('my-index-switch-list');
                    if($this.hasClass('my-index-switch-list')) {
                        self.indexProject(3,4,self.projectList);// 

                    } else {
                    
                        self.indexProject(9,12,self.projectAll);
                    }
                });
            },
            projectList: function(clear, projectName) {
                //console.log(this)
                if(clear) {
                    return this.str = ''; 
                } else {
                    return this.str += 
                        '#<div class="my-index-project-box clearfix" data-show="xmgl" data-subshow="xmgl-">'+
                            '<div class="project-list-left">'+
                                '<span class="glyphicon glyphicon-map-marker project-icon"></span>'+
                                '<p class="project-name">'+ projectName +'</p>'+
                                '<p class="project-loc">湖南省 长沙市长沙县</p>'+
                                '<span class="pro-left-line"></span>'+
                            '</div>'+
                            '<div class="project-list-img-wrapper">'+
                                '<div class="project-list-img">'+
                                    '<img src="/img/index/loacationimg00.jpg" class="" alt="">'+
                                '</div>'+
                                '<div class="project-list-detail ">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<p class="detail-name">能源综合利用率</p>'+
                                            '<p class="detail-val">0.38</p>'+
                                        '</li>'+
                                        '<li>'+
                                            '<p class="detail-name">可再生能源利用率</p>'+
                                            '<p class="detail-val">0.38</p>'+
                                        '</li>'+
                                        '<li>'+
                                            '<p class="detail-name">累计节能率</p>'+
                                            '<p class="detail-val">0.38</p>'+
                                        '</li>'+
                                        '<li>'+
                                            '<p class="detail-name">CO2减排率</p>'+
                                            '<p class="detail-val">0.38</p>'+
                                        '</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                            '<div class="project-list-right">'+
                                '<div class="project-circle project-circle-top">'+
                                    '<span>供能</span><span class="pro-num">6.1万</span>'+
                                '</div>'+
                                '<div class="pro-type">'+
                                    '<div class="glyphicon glyphicon-home pro-type-icon"></div>'+
                                    '<div class="pro-type-name">医院m2</div>'+
                                '</div>'+
                                '<div class="project-circle project-circle-bottom">'+
                                    '<span>建筑</span><span class="pro-num">10.1万</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                }
            },
            projectAll: function(clear) {
                if(clear) {
                    return this.str = ''; 
                } else {
                    return this.str += '#<a href="" class="my-index-list-cont"></a>';
                }
            },
            makeItems: function() {
                        this.str += '<div class="item"></div>';
            },

            indexItems: function(sum,num1,num2) {
                var items = (this.getHeight() < 800) ? sum/num1 : sum/num2
                  , regI = new RegExp('<div class="item">',i)
                  ;   
                this.str = '';

                for(var i = 0; i < items; i++ )
                this.makeItems();
                this.str = this.str.replace(regI,'<div class="item active">');
                $('.carousel-inner').empty().append(this.str);
                //this.str = '';
                this.itemsDone = true;
            },
            getGislist: function(data) {
                localData = data;
                index.indexProject(3,4,index.projectList); //trigger indexProject
            },
            indexProject: function(num1,num2,fn) {
                var self = this
                  , k = (self.getHeight() < 800) ? num1 : num2  
                  , n1, n2, n3, n4
                  ;
                this.indexItems(localData.length,3,4);
                        //console.log(self)
                fn(true);
                if(this.itemsDone) {
                    $.each(localData, function(i,v){
                        //self.str = fn.call(self,false, v.projectname); 
                        self.str = fn(false, v.projectname); 
                        //console.log(self)
                    });


                        //console.log(localData)
                        //console.log(self)
                    var tt = null
                    tt+='#11';
                    var bb = tt.split('#')
                    bb.shift();
                    console.log(bb)
                    self.str = self.str.trim();
                    self.str = self.str.split('#')
                    //self.str.shift();
                    console.log(self.str)
                    //for(var i = 0, l=3; i<l; i++)
                    var temp = null;
                    $('.item').each(function(i,v) {
                        for(var i = 0; i<k; i++) {
                            temp += self.str.shift() 
                        }
                        $(v).empty().append(temp);
                        temp = '';
                    });
                    //$('.item').each(function(i,v) {
                        //$(v).empty().append(temp);
                    //});
                    //console.log(self.str.shift())
                    //console.log(self.str)
                    //console.log(temp)

                    //if(k ==3) {
                        //n1 = self.str[1]+self.str[2]+self.str[3];
                        //n2 = self.str[4]+self.str[5]+self.str[6];
                        //n3 = self.str[7]+self.str[8]+self.str[9];
                        //n4 = self.str[10]+self.str[11]+self.str[12];
                    //} else {
                        //n1 = self.str[1]+self.str[2]+self.str[3]+self.str[4];
                        //n2 = self.str[5]+self.str[6]+self.str[7]+self.str[8];
                        //n3 = self.str[9]+self.str[10]+self.str[11]+self.str[12];
                    //}

                    //$('.item').each(function(i,v) {
                        //switch(i) {
                            //case 0: 
                                //$(v).empty().append(n1);
                                //break;
                            //case 1: 
                                //$(v).empty().append(n2);
                                //break;
                            //case 2: 
                                //$(v).empty().append(n3);
                                //break;
                            //case 3: 
                                //$(v).empty().append(n4);
                                //break;
                        //}
                    //});
                }
                this.itemsDone = false;
            },
            configMap: function () {
                 var map = new AMap.Map('allmap', {
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
                addMarker();
                
                //添加带文本的点标记覆盖物
                function addMarker(){ 
                    //自定义点标记内容   
                    var markerContent = document.createElement("div");
                    markerContent.className = "markerContentStyle";
                    
                    //点标记中的图标
                    var markerImg = document.createElement("img");
                     markerImg.className = "markerlnglat";
                     markerImg.src = "/img/index/icon-map_1.png"; 
                     markerContent.appendChild(markerImg);
                     
                     //点标记中的文本
                     var markerSpan = document.createElement("span");
                     markerSpan.innerHTML = "";
                     markerContent.appendChild(markerSpan);
                     var marker = new AMap.Marker({
                        map:map,
                        position: new AMap.LngLat(116.397428,39.90923), //基点位置
                        offset: new AMap.Pixel(-18,-36), //相对于基点的偏移位置
                        draggable: true,  //是否可拖动
                        content: markerContent   //自定义点标记覆盖物内容
                    });
                     marker.setMap(map);  //在地图上添加点
                     //鼠标点击marker弹出自定义的信息窗体
                    AMap.event.addListener(marker, 'mouseover', function() {
                        infoWindow.open(map, marker.getPosition());
                    });
                    AMap.event.addListener(marker, 'click', function() {
                        window.location.href="/user/xmgl";
                    });
                    
                }


              //实例化信息窗体
                var infoWindow = new AMap.InfoWindow({
                    isCustom: true,  //使用自定义窗体
                    content: createInfoWindow('方恒假日酒店&nbsp;&nbsp;<span style="font-size:11px;color:#F00;">价格:318</span>', "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134' style='position:relative;float:left;margin:0 5px 5px 0;'>地址：北京市朝阳区阜通东大街6号院3号楼 东北 8.3 公里<br/>电话：010 64733333<br/><a href='http://baike.baidu.com/view/6748574.htm'>详细信息</a>"),
                    offset: new AMap.Pixel(16, -45)//-113, -140
                });

                //构建自定义信息窗体
                function createInfoWindow(title, content) {
                    var info = document.createElement("div");
                    info.className = "info";

                    //可以通过下面的方式修改自定义窗体的宽高
                    //info.style.width = "400px";

                    // 定义顶部标题
                    var top = document.createElement("div");
                    var titleD = document.createElement("div");
                    var closeX = document.createElement("img");
                    top.className = "info-top";
                    titleD.innerHTML = title;
                    closeX.src = "http://webapi.amap.com/images/close2.gif";
                    closeX.onclick = closeInfoWindow;

                    top.appendChild(titleD);
                    top.appendChild(closeX);
                    info.appendChild(top);


                    // 定义中部内容
                    var middle = document.createElement("div");
                    middle.className = "info-middle";
                    middle.style.backgroundColor = 'white';
                    middle.innerHTML = content;
                    info.appendChild(middle);

                    // 定义底部内容
                    var bottom = document.createElement("div");
                    bottom.className = "info-bottom";
                    bottom.style.position = 'relative';
                    bottom.style.top = '0px';
                    bottom.style.margin = '0 auto';
                    var sharp = document.createElement("img");
                    sharp.src = "http://webapi.amap.com/images/sharp.png";
                    bottom.appendChild(sharp);
                    info.appendChild(bottom);
                    return info;
                }

                //关闭信息窗体
                function closeInfoWindow() {
                    map.clearInfoWindow();
                }
            }
        }
        var index = new Index();
        index.init();
        $(window).resize(function(){
            if(localData)
                index.indexProject(3,4,index.projectList); // 错误self.str is undefined
        });
    }());
});
