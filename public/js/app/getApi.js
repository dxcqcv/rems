define(function(require) {
    var 
        $ = require('jquery')
      ;
    (function(){
        function Request() {
            var loadingWrapper = document.createElement('div'); 
            var loadCont = document.createElement('div');
            loadingWrapper.className = "loader-wrapper"; 
            loadCont.className = "loader"; 
            loadingWrapper.appendChild(loadCont);
            this.loading = loadingWrapper; 
        }
        $.extend(Request.prototype, {
            loader: function(open,container,padding) {
                var loader = $('.loader-wrapper');
                var self = this;
                var bp = padding;

                if(open === true) {
console.log(open)
console.log(loader.length)
                    if(loader.length === 0) {
                        $.each(container, function(i,v){
                    console.log(loader)
                            var box = $(v);
                            var w = box.width();
                            var h = box.height();
                            if(bp === 0) $(self.loading).width(w).height(h).css({'position': 'absolute', top: 0, left: 0, 'z-index': 9});
                            //else $(self.loading).width(w).height(h).css({'padding':bp});
                            else $(self.loading).width(w).height(h).children('.loader').css({'top':'30%'});
                            box.append(self.loading);
                        });
                    } else {
                    console.log(12121)
                        loader.removeClass('hide');
                    }
                }  
                else {
                    loader.addClass('hide');
                } 
                
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

               //console.log(loadContainer[0]) 
               //console.log(loadContainer[1]) 
               if(loadContainer[1] !== undefined) this.loader(true,loadContainer[0],loadContainer[1]);

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
