require.config({
    baseUrl: '/js/lib',
    waitSeconds:120,
    map:{
        '*':{
           'css':'../lib/css.min' 
        }
    },
    paths: {
        app: '../app'
    },
    shim: {
       'bootstrap':{deps:['jquery',"css!../../css/bootstrap","css!../../css/bootstrap-theme"]},
       'highcharts':{deps:['jquery']},
       'swiper':{deps:['jquery']}
    }
});

require(['app/roy',"css!../../css/reset",'bootstrap'],function(roy){
    roy.pageInit();    
});
//加载对应css模块
require([
//Index css
    "css!../../css/index_right",
    "css!../../css/map",
    "css!../../css/swiper.3.1.2.min",
//Custom Fonts 
    "css!../../font-awesome/css/font-awesome",
//Custom CSS
    "css!../../css/global",
    "css!../../css/login",
    "css!../../css/index",
    "css!../../css/gyt",
    "css!../../css/others"
]);
