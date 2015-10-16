define(function(require) {
    var 
        $ = require('jquery')
      ;
    (function(){
        // jsonp method
        function LocalJsonp() {
            this.loading = $('#loading')
        }
        $.extend(LocalJsonp.prototype, {
            start: function(opt) {
                var url = opt.url ? opt.url : 'rems-test.json'
                  , type = opt.type ? opt.type : 'GET'
                  , data = opt.data ? opt.data : {}
                  , timeout = opt.timeout ? opt.timeout : 10000
                  , currentRequest = null
                  , done = opt.done ? opt.done : doneFn
                  , fail = opt.fail ? opt.fail : failFn
                  , jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
                  , jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : ''
                  , self = this;

                currentRequest = $.ajax({
                    url: url
                  , type: type
                  , timeout: timeout
                  , data: data
                  , dataType: 'jsonp'
                  , cache: false
                  , jsonp: jsonp
                  , jsonpCallback: jsonpCallback
                  , crossDomain: true
                  , mimeType: 'application/json'
                  , contentType: 'text/plain'
                  , beforeSend: function() {
                        if(currentRequest != null) currentRequest.abort();
                  }
                })
                .done(function(data) {
                    var d = data;
                    self.loading.addClass('hide');
                    done(d);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    if(textStatus == 'timeout') {}
                    fail(jqXHR, textStatus, errorThrown);
                });
                //return currentRequest ;
            }
        });
        function failFn(jqXHR, textStatus,errorThrown) { console.log('error is ' + jqXHR.statusText + ' textStatus is ' + textStatus + ' errorThrown is ' + errorThrown); }
        function doneFn() { console.log('done'); }

        localJsonp = new LocalJsonp(); // 调用本地jsonp 
    }());
});
