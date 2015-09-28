define(['jquery'],function($){
    return {
        pageInit: function() {
            var 
                  navButton = $('.my-nav').children('li').children('a')
                , doc = document
                , myCont = $('.my-content')
                , myShow = $('.my-show')
                , mySection = $('.my-section')
                , mySectionId = mySection.attr('id')
                , subNav = $('.my-sub-nav').children('li').children('a')
                ;
            // global layout
            switch(mySectionId ) {
                case 'login':
                case 'index':
                    myCont.removeClass('one-nav'); break; 
                default: myCont.removeClass('one-nav').addClass('two-nav');
            }
                //导航高度和高亮及子导航内容
            $(doc).on('click','.my-nav > li > a', function(){
                var $this = $(this) 
                  , indexNav = $this.data('hight')
                  , navName = $this.data('show')
                  , str = ''
                  ;        
                $this.parent('li').siblings('li').removeClass('active').end().addClass('active')
                if(indexNav === 1) {
                    myCont.removeClass('one-nav').addClass('two-nav');        
                } else {
                    myCont.removeClass('two-nav').addClass('one-nav');        
                } 
                switch(navName) {
                    case 'ycjc': 
                        str = '<li><a href="#">工艺监测</a></li><li><a href="/user/nxjc">能效监测</a></li><li><a href="/user/sjjc">数据监测</a></li>'; 
                        break;
                    case 'nygl':
                        str = '<li><a href="#">能效分析</a></li><li><a href="/user/tbhb">同比环比</a></li><li><a href="#">分项计量</a></li><li><a href="#">成本收益分析</a></li><li><a href="#">报表</a></li>'; 
                        break;
                    case 'pgzd':
                        str = ''; 
                        break;
                }
                $('.my-sub-nav').empty().append(str);
            });
            //子导航选择
            $(doc).on('click','.my-sub-nav > li > a',function(){
                $(this).parent('li').siblings('li').removeClass('active').end().addClass('active'); 
            });
            ////首页项目选择
            //$('.my-index-right').on('click', function(){
                //$(this).toggleClass('my-index-right-list');
            //});

            ////封装ajax
        //function LocalJsonp() {
            //this.loading = $('#loading');
        //}
        //$.extend(LocalJsonp.prototype, {
            //start: function(opt) {
                //var url = opt.url ? opt.url : 'rems-test.json'
                  //, type = opt.type ? opt.type : 'GET'
                  //, data = opt.data ? opt.data : {}
                  //, timeout = opt.timeout ? opt.timeout : 10000
                  //, currentRequest = null
                  //, done = opt.done ? opt.done : doneFn
                  //, fail = opt.fail ? opt.fail : failFn
                  //, jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
                  //, jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : ''
                  //, self = this;

                //currentRequest = $.ajax({
                    //url: url
                  //, type: type
                  //, timeout: timeout
                  //, data: data
                  //, dataType: 'jsonp'
                  //, cache: false
                  //, jsonp: jsonp
                  //, jsonpCallback: jsonpCallback
                  //, crossDomain: true
                  //, mimeType: 'application/json'
                  //, contentType: 'text/plain'
                  //, beforeSend: function() {
                        //if(currentRequest != null) currentRequest.abort();
                  //}
                //})
                //.done(function(data) {
                    //var d = data;
                    //self.loading.addClass('hide');
                    //done(d);
                //})
                //.fail(function(jqXHR, textStatus, errorThrown) {
                    //if(textStatus == 'timeout') {}
                    //fail(jqXHR, textStatus, errorThrown);
                //});
                ////return currentRequest ;
            //}
        //});
        //function Request() {
            //this.loading = $('#loading')
        //}
        //$.extend(Request.prototype, {
            //start: function(opt) {
                //var url = opt.url ? opt.url : 'rems-test.json'
                  //, type = opt.type ? opt.type : 'GET'
                  //, data = opt.data ? opt.data : {}
                  //, timeout = opt.timeout ? opt.timeout : 10000
                  //, currentRequest = null
                  //, done = opt.done ? opt.done : doneFn
                  //, fail = opt.fail ? opt.fail : failFn
                  //, jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
                  ////, jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : '' 
                  //, self = this;

                //currentRequest = $.ajax({
                    //url: url
                  //, type: type
                  //, timeout: timeout
                  //, data: data
                  ////, async : false
                  //, dataType: 'json'
                  ////, jsonp: jsonp //服务端用于接收callback调用的function名的参数  
                  ////, jsonpCallback: jsonpCallback//callback的function名称,服务端会把名称和data一起传递回来 
                  //, crossDomain: true
                  ////, mimeType: 'application/json'
                  ////, contentType: 'text/plain'
                  ////, xhrFields: { withCredentials: false }
                  //, beforeSend: function() {
                        //if(currentRequest != null) currentRequest.abort();
                  //}
                //})
                //.done(function(data){
                    //var d = data;
                    //self.loading.addClass('hide');
                    //done(d);
                //})
                //.fail(function(jqXHR, textStatus,errorThrown) {
                    //if(textStatus == 'timeout') { //alert('timeout'); 
                    //}
                    //fail(jqXHR, textStatus,errorThrown);
                //});
                ////return currentRequest ;
            //}
        //});
        //function failFn(jqXHR, textStatus,errorThrown) { console.log('error is ' + jqXHR.statusText + ' textStatus is ' + textStatus + ' errorThrown is ' + errorThrown); }
        //function doneFn() { console.log('done'); }
        //var demand = new Request(); // 统一调用ajax
                    ////demand.start({url:'http://10.36.128.73:8080/reds/ds/equipState', jsonp: 'equipState',done:shenlongchengEquipStatFn});
                    ////demand.start({url:'http://10.20.1.155:8080/rems/login',data:{username:'sundear-wq',password:'qwe123'}});
                    ////demand.start({url:'http://10.20.1.155:8080/rems/rest/index3.json', done:testfn});
                    ////demand.start({url:'http://10.20.1.155:8080/rems/rest/gislist.json ', done:testfn2});
                    //function testfn(data){
                       //console.log(data); 
                    //}
                    //function testfn2(data){
                       //console.log(data); 
                    //}
        ////http://10.20.1.155:8080/rems/login?username=sundear-wq&password=qwe123
                     
        }        
    }
});
