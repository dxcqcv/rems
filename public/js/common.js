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
       'jquery.ztree.all-3.5.min':{deps:['jquery']},

       'bootstrap-select':{deps:['jquery']},
       'bootstrap-table':{deps:['jquery','bootstrap']},
       'bootstrap-datetimepicker.min':{deps:['jquery','moment']},
       'no-data-to-display': {deps:['highstock']},
       'exporting': {deps:['jquery', 'no-data-to-display']},
       'bootstrap-table-locale-all.min': {deps:['bootstrap-table']},
    }
});
// 全局调用
requirejs(['app/roy']);
