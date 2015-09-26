var indexfunction = function() {
        // 百度地图API功能
        var map = new BMap.Map("allmap");// 创建Map实例
        var top_left_navigation = new BMap.NavigationControl();//左上角，添加默认缩放平移控件
        var marker = new BMap.Marker(new BMap.Point(106.404, 39.915));//添加坐标
        var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + 
                       "<img style='float:right;margin:4px' id='imgDemo' src='http://app.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" + 
                       "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
                       "</div>";
        var infoWindow = new BMap.InfoWindow(sContent);
        map.centerAndZoom(new BMap.Point(106.404, 39.915), 5);  // 初始化地图,设置中心点坐标和地图级别
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
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId"
            ,"location" : map
        });

        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            setPlace();
        });

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
            var point = new BMap.Point(101.487899,31.249162);
            addMarker(point);
        // }

        //列表和块状标签页切换
        $(".tabs .tab-btn").click(function() {
            $(".swiper-content").eq($(this).index()).addClass('cur').siblings('.swiper-content').removeClass('cur');
        });

        //滑动
        var mySwiper1 = new Swiper ('.swiper-container1', {
            simulateTouch : false,//鼠标无效
            direction: 'horizontal',//horizontal水平，vertical垂直
            loop: false,

            // 如果需要分页器
            pagination: '.swiper-pagination1',
            // 如果需要前进后退按钮

            nextButton: '.swiper-button-next1',
            prevButton: '.swiper-button-prev1',
            slidesPerView: 1,
        });
        $(".swiper-container .swiper-wrapper .swiper-slide ul li").mouseenter(function() {
            $(this).closest(".swiper-container").find('.swiper-slide ul li').removeClass('cur');
            $(this).addClass('cur');
        }); 
        var mySwiper2 = new Swiper ('.swiper-container2', {
            simulateTouch : false,//鼠标无效
            direction: 'horizontal',//horizontal水平，vertical垂直
            loop: false,

            // 如果需要分页器
            pagination: '.swiper-pagination2',
            // 如果需要前进后退按钮

            nextButton: '.swiper-button-next2',
            prevButton: '.swiper-button-prev2',
        });
    
}();
