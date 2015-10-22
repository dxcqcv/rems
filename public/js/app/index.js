define(function(require){
    var $ = require('jquery'),
        swiper = require('swiper')
    ;
    (function(){
        function Index(){
            this.winHeight = $(window).height();
            this.str = '';
        }
        Index.prototype = {
            init: function() {
                this.configMap(); 
                this.indexProject(); 

            console.log(this.str)
            },
            getHeight: function() {
                return this.winHeight = $(window).height();
            },
            configMap: function () {
		// 百度地图API功能
		var map = new BMap.Map("allmap");// 创建Map实例
		var top_left_navigation = new BMap.NavigationControl();//左上角，添加默认缩放平移控件
		var marker = new BMap.Marker(new BMap.Point(116.404, 39.915));//添加坐标
		var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + 
					   "<img style='float:right;margin:4px' id='imgDemo' src='http://app.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" + 
					   "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
					   "</div>";
	    var infoWindow = new BMap.InfoWindow(sContent);
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);	// 初始化地图,设置中心点坐标和地图级别
		map.addControl(top_left_navigation); //添加缩放平移控件
		map.addOverlay(marker);
		marker.addEventListener("click", function(){          
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();//防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		   }
		});

		function G(id) {
			return document.getElementById(id);
		}

		function setPlace(){
			map.clearOverlays();    //清除地图上所有覆盖物
			function myFun(){
				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 18);
				map.addOverlay(new BMap.Marker(pp));    //添加标注
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
			  onSearchComplete: myFun
			});
			local.search(myValue);
		}

		//添加标记方法
		function addMarker(point){
		  var marker = new BMap.Marker(point);
		  map.addOverlay(marker);
		}

		// for (var i = 0; i < 5; i ++) {
			var point = new BMap.Point(121.487899,31.249162);
			addMarker(point);
		// }

            },
            switchProject: function() {
                var switchButton = $('.my-index-switch')
                  , self = this
                  ;
                switchButton.on('click', function(){
                    var $this = $(this)
                    $this.toggleClass('my-index-switch-list');
                    if($this.hasClass('my-index-switch-list')) {
                        self.getHeight()
                    } else {
                    
                    }
                });
            },
            projectList: function() {
                        this.str += 
                                '<div class="my-index-project-box clearfix">'+
                                    '<div class="project-list-left">'+
                                        '<span class="glyphicon glyphicon-map-marker project-icon"></span>'+
                                        '<p class="project-name">株洲神农城泛能站</p>'+
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
            },
            projectAll: function() {
                        this.str += '<a href="" class="my-index-list-cont"></a>';
            },

            indexProject: function() {
                var l = (this.getHeight() < 800) ? 3 : 4;   
                for(var i = 0; i < l; i++ )
                this.projectList();

                $('.my-index-projects-wrapper').empty().append(this.str);
                this.str = '';
            }
            //indexProject: function() {
                //var switchButton = $('.my-index-switch')
                  //, projectWrapper = $('.my-index-projects-wrapper') 
                  //, str = ''
                  //,  l = (this.winHeight < 800) ? 3 : 4
                  //,  k = (this.winHeight < 800) ? 9 : 12 
                  //;
                //switchButton.on('click', function(){
                    //var $this = $(this)
                      //;
                    //$this.toggleClass('my-index-switch-list');
                    //if($this.hasClass('my-index-switch-list')) {
                        //for(var i = 0; i < l; i++ )
                        //str += 
                                //'<div class="my-index-project-box clearfix">'+
                                    //'<div class="project-list-left">'+
                                        //'<span class="glyphicon glyphicon-map-marker project-icon"></span>'+
                                        //'<p class="project-name">株洲神农城泛能站</p>'+
                                        //'<p class="project-loc">湖南省 长沙市长沙县</p>'+
                                        //'<span class="pro-left-line"></span>'+
                                    //'</div>'+
                                    //'<div class="project-list-img-wrapper">'+
                                        //'<div class="project-list-img">'+
                                            //'<img src="/img/index/loacationimg00.jpg" class="" alt="">'+
                                        //'</div>'+
                                        //'<div class="project-list-detail ">'+
                                            //'<ul>'+
                                                //'<li>'+
                                                    //'<p class="detail-name">能源综合利用率</p>'+
                                                    //'<p class="detail-val">0.38</p>'+
                                                //'</li>'+
                                                //'<li>'+
                                                    //'<p class="detail-name">可再生能源利用率</p>'+
                                                    //'<p class="detail-val">0.38</p>'+
                                                //'</li>'+
                                                //'<li>'+
                                                    //'<p class="detail-name">累计节能率</p>'+
                                                    //'<p class="detail-val">0.38</p>'+
                                                //'</li>'+
                                                //'<li>'+
                                                    //'<p class="detail-name">CO2减排率</p>'+
                                                    //'<p class="detail-val">0.38</p>'+
                                                //'</li>'+
                                            //'</ul>'+
                                        //'</div>'+
                                    //'</div>'+
                                    //'<div class="project-list-right">'+
                                        //'<div class="project-circle project-circle-top">'+
                                            //'<span>供能</span><span class="pro-num">6.1万</span>'+
                                        //'</div>'+
                                        //'<div class="pro-type">'+
                                            //'<div class="glyphicon glyphicon-home pro-type-icon"></div>'+
                                            //'<div class="pro-type-name">医院m2</div>'+
                                        //'</div>'+
                                        //'<div class="project-circle project-circle-bottom">'+
                                            //'<span>建筑</span><span class="pro-num">10.1万</span>'+
                                        //'</div>'+
                                    //'</div>'+
                                //'</div>';
                    //} else {
                        //for(var i = 0; i < k; i++ )
                        //str += '<a href="" class="my-index-list-cont"></a>';
                    //} 
                    //projectWrapper.empty().append(str);
                    //str = '';
                //});
            //}
        }
        var index = new Index();
        index.init();
                $(window).resize(function(){
        index.init();
                });
    }());
});
