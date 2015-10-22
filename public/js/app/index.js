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
                        self.indexProject(3,4,self.projectList);// 错误self.str is undefined

                    } else {
                    
                        self.indexProject(9,12,self.projectAll);
                    }
                });
            },
            projectList: function(clear, projectName) {
                if(clear) {
                    return this.str = ''; 
                } else {
                    return this.str += 
                        '#<div class="my-index-project-box clearfix">'+
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
            projectAll: function() {
                        this.str += '<a href="" class="my-index-list-cont"></a>';
            },
            makeItems: function() {
                        this.str += '<div class="item"></div>';
            },

            indexItems: function(sum,num1,num2) {
                var items = (this.getHeight() < 800) ? sum/num1 : sum/num2
                  , regI = new RegExp('<div class="item">',i)
                  ;   
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
                if(this.itemsDone) {
                    $.each(localData, function(i,v){
                        self.str = fn(false, v.projectname); 
                        //console.log(self)
                    });


                        //console.log(localData)
                        //console.log(self)
                    self.str = self.str.split('#')
                    if(k ==3) {
                        n1 = self.str[1]+self.str[2]+self.str[3];
                        n2 = self.str[4]+self.str[5]+self.str[6];
                        n3 = self.str[7]+self.str[8]+self.str[9];
                        n4 = self.str[10]+self.str[11]+self.str[12];
                    } else {
                        n1 = self.str[1]+self.str[2]+self.str[3]+self.str[4];
                        n2 = self.str[5]+self.str[6]+self.str[7]+self.str[8];
                        n3 = self.str[9]+self.str[10]+self.str[11]+self.str[12];
                    }

                    $('.item').each(function(i,v) {
                        switch(i) {
                            case 0: 
                                $(v).empty().append(n1);
                                break;
                            case 1: 
                                $(v).empty().append(n2);
                                break;
                            case 2: 
                                $(v).empty().append(n3);
                                break;
                            case 3: 
                                $(v).empty().append(n4);
                                break;
                        }
                    });
                }
                this.itemsDone = false;
            },
            configMap: function () {
                 var map = new AMap.Map('allmap', {
                        resizeEnable: true,
                      // 设置中心点
                      center: [116.404, 39.915],

                      // 设置缩放级别
                      zoom: 5
                });
                   //在地图中添加ToolBar插件
                map.plugin(["AMap.ToolBar"], function () {
                  toolBar = new AMap.ToolBar();
                  map.addControl(toolBar);
                }); 
            }
        }
        var index = new Index();
        index.init();
        $(window).resize(function(){
            //if(localData)
                //index.indexProject(3,4,index.projectList); // 错误self.str is undefined
        });
    }());
});
