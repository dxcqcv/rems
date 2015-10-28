define(function(require){
    var $ = require('jquery')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      , exporting = require('exporting')
      ;


  (function(){
      //日期控件
       $('.datetimepicker1').datetimepicker();
       
      //下拉选择
      $('.selectpicker').selectpicker({
      });

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
    $.fn.preload = function() {
        this.each(function(){
            $('<img/>')[0].src = this;
        });
    }
    $(['/img/xmgl/bg1.jpg','/img/xmgl/bg2.jpg','/img/xmgl/bg3.jpg','/img/xmgl/bg4.jpg']).preload();
      


  }());



});
