;define(function(require){
    var $ = require('jquery')
      , jsonpPath = require('app/getJsonp')
    ;
    (function(){
    $('#xmglImg').hide();
    $('.one').on('click', function() {
        $('#xmglVideo').hide();
        $('#xmglImg').show();
        $('#xmglImg').attr('src','/img/xmgl/bg3.jpg');         
    });
    $('.two').on('click', function() {
        $('#xmglImg').hide();         
        $('#xmglVideo').show();
    });

    //preload img
    $.fn.preload = function() {
        this.each(function(){
            var suffix = this.split('.')[1]
            console.log(suffix)
            if(suffix=='jpg') $('<img/>')[0].src = this;
            else if(suffix=='mp4') {
            //$('<source>').src = this;
                //var str = '<source src="/img/xmgl/01.mp4" type="video/mp4">'
                //$('#xmglVideo').append(str);
            }  
        });
    }
    //$(['/img/xmgl/bg1.jpg','/img/xmgl/bg2.jpg','/img/xmgl/bg3.jpg','/img/xmgl/bg4.jpg', '/img/xmgl/12.mp4', '/img/xmgl/01.mp4']).preload();
      
     localJsonp.start({url:jsonpPath+'xmgl.js',jsonpCallback:'xmgl',done:xmgl});
     function xmgl(data) {
        var str = '';
        var src = [];
        $.each(data, function(i,v){
            str += '<li>' + v.name + '</li>'; 
            src.push(v.path);
        })
        $(src).preload();
        $('#xmglButton').append(str);

     }
    }());
});

