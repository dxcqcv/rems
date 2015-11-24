define(function(require) {
    var 
        $ = require('jquery')
      , jsonpPath = '/jsonp/'
      ;
    (function(){
        // jsonp method
        function LocalJsonp() {
            this.loading = '<div class="loader-wrapper hide">'+
                                 '<div class="loader"></div>'+    
                           '</div>'; 
        }

        $.extend(LocalJsonp.prototype, {
            loader: function(open) {
                var loader = $('.loader-wrapper');
                if(open === true) loader.removeClass('hide'); 
                else loader.addClass('hide');
            },
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
                  , parameter = opt.parameter ? opt.parameter : {}
                  , self = this;
                this.loader(true); 

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
                  , parameter: parameter  
                  , loader: self.loading 
                  , beforeSend: function() {
                        if(currentRequest != null) currentRequest.abort();
                  }
                })
                .done(function(data) {
                    var d = data;
                    //self.loading.addClass('hide');
                    this.loader(false); 
                    done(d,this.parameter);
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

        return jsonpPath;  
});
