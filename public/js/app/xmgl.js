;define(function(require){
    var $ = require('jquery')
      , jsonpPath = require('app/getJsonp')
      , api = require('app/getApi')
      , projectid = require('app/checkProjectid')
    ;
    (function(){
    console.log(projectid)
    $(document).on('click', '#xmglButton > li', function(){
        var $this = $(this);
        var path = $this.data('path');
        var img = $('#xmglImg');
        var video = $('#xmglVideo');
        var suffix = path.split('.')[1];
        $this.siblings('li').removeClass('active').end().addClass('active');
        if(suffix == 'jpg' || suffix == 'png') {
            video.addClass('hide');
            img.removeClass('hide');
            img.attr('src',path); 
        } else if(suffix == 'mp4') {
            img.addClass('hide');
            video.removeClass('hide');
            video.children().attr('src',path);
            video.load();
        }
    });

    //preload img
    $.fn.preload = function() {
        this.each(function(){
            var suffix = this.split('.')[1]
            if(suffix=='jpg') $('<img/>')[0].src = this;
            else if(suffix=='mp4') {
            $('<source>').src = this;
                var str = '<source src="/img/xmgl/01.mp4" type="video/mp4">'
                $('#xmglVideo').append(str);
            }  
        });
    }
      
     localJsonp.start({url:jsonpPath+'xmgl.js',jsonpCallback:'xmgl',done:xmgl});
     
     //demand.start({url:'/api/projectOverview.json', data:{projectid:1}, done:xmgl})

     function xmgl(data) {
        console.log(data);
        var str = '';
        var src = [];
        var regI = new RegExp('^<li','i');
        //$.each(data.xmgl, function(i,v){
        $.each(data, function(i,v){
            if(i == 0) $('#xmglImg').attr('src',v.path);
            str += '<li data-path="'+ v.path +'">' + v.name + '</li>'; 
            str = str.replace(regI, '<li class="active" ');
            src.push(v.path);
        })
        $(src).preload();
        $('#xmglButton').append(str);
     }
    }());
});

