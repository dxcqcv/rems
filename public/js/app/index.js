define(function(require){
    var $ = require('jquery'),
        swiper = require('swiper')
    ;
    (function(){
        function Index(){
        }
        Index.prototype = {
            configMap: function () {
                    //// 百度地图API功能
                    var map = new BMap.Map("allmap");// 创建Map实例
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);  // 初始化地图,设置中心点坐标和地图级别
                    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            },
            indexProject: function() {
                var switchButton = $('.my-index-switch')
                  , projectWrapper = $('.my-index-projects-wrapper') 
                  , str = ''
                  ;
                switchButton.on('click', function(){
                    var $this = $(this)
                      ;
                    $this.toggleClass('my-index-switch-list');
                    if($this.hasClass('my-index-switch-list')) {
                        for(var i = 0, l = 3; i < l; i++ )
                        str += '<a href="" class="my-index-project-box"></a>';
                    } else {
                        for(var i = 0, l = 12; i < l; i++ )
                        str += '<a href="" class="my-index-list-cont"></a>';
                    } 
                    projectWrapper.empty().append(str);
                    str = '';
                });
            }
        }
        var index = new Index();
        index.configMap();
        index.indexProject();
    }());
});
//define(['jquery'],function($){
    //return {
        //map: function(){
            //// 百度地图API功能
            //var map = new BMap.Map("allmap");// 创建Map实例
            //map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);  // 初始化地图,设置中心点坐标和地图级别
            //map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            //map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        //},
        //sideBar: function() {}
    //}
//});
