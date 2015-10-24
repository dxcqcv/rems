require.config({
    //baseUrl: 'js/lib', // for r.js
    baseUrl: '/js/lib', //for dev mode
    //waitSeconds:120,
    //map:{
        //'*':{
           //'css':'css.min' 
        //}
    //},
    paths: {
        app: '../app'
    },
    shim: {
       'bootstrap':{deps:['jquery']},
       'bootstrap-select':{deps:['jquery']},
       'bootstrap-datetimepicker.min':{deps:['jquery','moment']},
       'highcharts':{deps:['jquery']},
       'exporting': {deps:['jquery', 'highstock']},
       'swiper':{deps:['jquery']}
    }
});
// 全局调用
requirejs(['app/roy']);
