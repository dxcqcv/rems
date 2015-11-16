define(function(require) {
    var 
        $ = require('jquery')
      ;
    (function(){
        function Request() {
            //this.loading = $('#loading')
        }
        $.extend(Request.prototype, {
            start: function(opt) {
                var url = opt.url ? opt.url : ''
                  , type = opt.type ? opt.type : 'GET'
                  , data = opt.data ? opt.data : {}
                  , timeout = opt.timeout ? opt.timeout : 10000
                  , currentRequest = null
                  , done = opt.done ? opt.done : doneFn
                  , fail = opt.fail ? opt.fail : failFn
                  , parameter = opt.parameter ? opt.parameter : {}
                  ////, jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
                  //, jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : '' 
                  , self = this;

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
