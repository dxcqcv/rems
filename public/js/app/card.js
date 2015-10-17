define(function(require){
    var 
      $ = require('jquery')
      , highcharts = require('highcharts')
      ;
    (function(){
            var cardButton = $('.card-button-resize');
            cardButton.on('click', function(){
                var $this = $(this)
                  ; 
                if(!$this.hasClass('card-button-resize-small')) {
                    $this.addClass('card-button-resize-small').parents('.my-card').siblings('.my-card').hide()
                           .end()
                           .removeClass('col-md-6 col-lg-6').addClass('col-md-12 col-lg-12')
                           .css({'height':'100%'})
                           .children('.chart-box').highcharts().reflow()
                    ; 
                } else {
                   $this.removeClass('card-button-resize-small').parents('.my-card').removeClass('col-md-12 col-lg-12').addClass('col-md-6 col-lg-6')
                       .css({'height':'50%'})
                       .children('.chart-box').highcharts().reflow()
                   ;
                   $this.parents('.my-card').siblings('.my-card').show()  
                   ;
                }
            });
    }());
});
