require.config({
    baseUrl: '/js/lib',
    //waitSeconds:120,
    map:{
        '*':{
           'css':'../lib/css.min' 
        }
    },
    paths: {
        app: '../app'
    },
    shim: {
       'bootstrap':{deps:['jquery']},
       'highcharts':{deps:['jquery']},
       'swiper':{deps:['jquery',"css!../../css/swiper"]}
    }
});

require([
//加载对应css模块
//Index css
    'app/roy',
    'bootstrap'
],function(roy){
    roy.pageInit();    
});
require([
//Custom CSS
    "css!../../css/reset",
    "css!../../font-awesome/css/font-awesome",
    "css!../../css/bootstrap","css!../../css/bootstrap-theme",
    "css!../../css/global",
    "css!../../css/login",
    "css!../../css/index",
    "css!../../css/xmgl",
    "css!../../css/gyt",
    "css!../../css/others"
]);
