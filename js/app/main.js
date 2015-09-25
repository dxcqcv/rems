require.config({
    baseUrl: 'js/lib',
    waitSeconds:120,
    map:{
        '*':{
           'css':'../lib/css.min' 
        }
    },
    paths: {
        app: '../app'
    },
    //paths: {
        //jquery:'../lib/jquery',
        //bootstrap:'../lib/bootstrap.min',
        //swiper:'../lib/swiper.3.1.2.jquery.min',
        //highcharts:'../lib/highcharts/highcharts',
        //index:'index',
        //login:'login',
        //gyt:'gyt',
        //roy:'roy'
    //},
    shim: {
       'bootstrap':{deps:['jquery']},
       'highcharts':{deps:['jquery']},
       'swiper':{deps:['jquery']}
       //'gyt':{deps:['jquery','highcharts']},
       //'nxjc':{deps:['jquery','highcharts']},
       //'roy':{deps:['jquery','bootstrap']}, 
       //'index':{deps:['jquery','bootstrap']}, 
       //'login':{deps:['jquery','bootstrap']} 
    }
});

require(['app/roy'],function(roy){
    roy.pageInit();    
});
//加载对应css模块
require([
//Reset CSS
    //"css!../../css/reset",
//Index css
    "css!../../css/index_right",
    "css!../../css/map",
    "css!../../css/swiper.3.1.2.min",
//Bootstrap Core CSS
    "css!../../css/bootstrap",
    "css!../../css/bootstrap-theme",
//Custom Fonts 
    "css!../../font-awesome/css/font-awesome",
//Custom CSS
    "css!../../css/global",
    "css!../../css/login",
    "css!../../css/index",
    "css!../../css/gyt",
    "css!../../css/others"
]);
