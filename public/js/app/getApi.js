define(function(require) {
    var 
        $ = require('jquery')
      ;
    (function(){
        function Request() {
            this.loading = '<div class="loader-wrapper hide">'+
                                 '<div class="loader"></div>'+    
                           '</div>'; 
        }
        $.extend(Request.prototype, {
            loader: function(open,container) {
                var str = '<div class="loader-wrapper ">'+
                                 '<div class="loader"></div>'+    
                           '</div>'; 
                var loader = $('.loader-wrapper');
                if(open === true) {
                    loader.removeClass('hide');
                    $.each(container, function(i,v){
                    console.log(v);
                        //$(v).append(this.loading);
                        $(v).append(str);
                    });
                }  
                else loader.addClass('hide');
                
            },
            start: function(opt) {
                var url = opt.url ? opt.url : ''
                  , type = opt.type ? opt.type : 'GET'
                  , data = opt.data ? opt.data : {}
                  , timeout = opt.timeout ? opt.timeout : 100000
                  , currentRequest = null
                  , done = opt.done ? opt.done : doneFn
                  , fail = opt.fail ? opt.fail : failFn
                  , parameter = opt.parameter ? opt.parameter : {}
                  , loadContainer = opt.loadContainer ? opt.loadContainer :[] 
                  ////, jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
                  //, jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : '' 
                  , self = this;
                
                    console.log(loadContainer);
                this.loader(true,loadContainer);

                currentRequest = $.ajax({
                    url: url
                  , type: type
                  , timeout: timeout
                  , data: data
                  //, async : false
                  //, dataType: 'jsonp'
                  , dataType: 'json'
                  //, jsonp: jsonp //服务端用于接收callback调用的function名的参数  
                  //, jsonpCallback: jsonpCallback//callback的function名称,服务端会把名称和data一起传递回来 
                  //, crossDomain: true
                  , mimeType: 'application/json'
                  , contentType: 'text/plain'
                  , parameter: parameter  
                  //, xhrFields: { withCredentials: false }
                  , beforeSend: function() {
                        if(currentRequest != null) currentRequest.abort();
                  }
                })
                .done(function(data){
                    var d = data;
                    //self.loading.addClass('hide');
                    self.loader(false);
                    done(d,this.parameter);
                })
                .fail(function(jqXHR, textStatus,errorThrown) {
                    if(textStatus == 'timeout') { //alert('timeout'); 
                    }
                    fail(jqXHR, textStatus,errorThrown);
                });
                //return currentRequest ;
            }
        });
        function failFn(jqXHR, textStatus,errorThrown) { console.log('error is ' + jqXHR.statusText + ' textStatus is ' + textStatus + ' errorThrown is ' + errorThrown); }
        function doneFn() { console.log('done'); }
        demand = new Request(); // 统一调用ajax
    }());
});
