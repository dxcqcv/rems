define(function(require){
    var restCss = require("css!../../css/reset")
      , bootstrapCss = require("css!../../css/bootstrap")
      , bootstrapThemeCss = require("css!../../css/bootstrap-theme")
      , fontAwesomeCss = require("css!../../font-awesome/css/font-awesome")
      , globalCss = require("css!../../css/global")
      , bootstrap = require('bootstrap')
      , $ = require('jquery')
      ;

    (function(){
        function PageStart() {
            this.win = window;
            this.doc = document;
            this.mainNav = $('#mainNav');
            this.navButton = this.mainNav.children('li').children('a');
            this.myCont = $('.my-content');
            this.myShow = $('.my-show');
            this.mySection = $('.my-section');
            this.mySectionId = this.mySection.attr('id');
            this.subNav = $('#subNav');
            this.subNavList = $('.my-sub-nav').children('li').children('a');
            this.curNav;
            this.str = '';
        } 
        PageStart.prototype = {
            init: function() {
              this.nav();  
            },
            nav: function() {
                var self = this
                  ; 
                //check current nav position
                if(localStorage.getItem('curNav') != null) {
                    this.curNav = localStorage.getItem('curNav').split('-');
                    highlightNav(this.curNav[0]);
                    $('.'+this.curNav[1]+'-subnav').parent('li').siblings('li').removeClass('active').end().addClass('active');
                }
                // global nav layout
                switch(this.mySectionId) {
                    case 'login':
                        this.myCont.removeClass('one-nav'); 
                        break;
                    case 'index':
                        this.subNav.addClass('hide'); 
                        this.mainNav.empty();
                        break; 
                    default: 
                        this.myCont.removeClass('one-nav').addClass('two-nav');
                        this.subNav.removeClass('hide');
                }
                    //导航高度和高亮及子导航内容
                $(this.doc).on('click','.my-nav > li > a', function(){
                    var $this = $(this) 
                      , indexNav = $this.data('hight')
                      , navName = $this.data('show')
                      ;        
                    //$this.parent('li').siblings('li').removeClass('active').end().addClass('active')
                    if(indexNav === 1) {
                        self.myCont.removeClass('one-nav').addClass('two-nav');        
                    } else {
                        self.myCont.removeClass('two-nav').addClass('one-nav');        
                    } 
                    localStorage.setItem('curNav',$this.data('subshow'));
                    highlightNav(navName);
                });
                function highlightNav(navName) {
                    $('.'+navName+'-nav').parent('li').siblings('li').removeClass('active').end().addClass('active');
                    switch(navName) {
                        case 'ycjc': 
                            this.str = '<li class="active"><a class="gyjc-subnav" data-subshow="ycjc-gyjc" href="/user/gyjc">工艺监测</a></li><li><a class="nxjc-subnav" data-subshow="ycjc-nxjc" href="/user/nxjc">能效监测</a></li><li><a class="sjjc-subnav" data-subshow="ycjc-sjjc" href="/user/sjjc">数据监测</a></li>'; 
                            break;
                        case 'nygl':
                            this.str = '<li class="active"><a class="nxfx-subnav" data-subshow="nygl-nxfx" href="/user/nxfx">能效分析</a></li><li><a class="nxfx2-subnav" data-subshow="nygl-nxfx2" href="/user/nxfx2">能效分析2</a></li><li><a class="nxfx3-subnav" data-subshow="nygl-nxfx3" href="/user/nxfx3">能效分析3</a></li><li><a class="tbhb-subnav" data-subshow="nygl-tbhb" href="/user/tbhb">同比环比</a></li><li><a class="fxjl-subnav" data-subshow="nygl-fxjl" href="#">分项计量</a></li><li><a class="cbfx-subnav" data-subshow="nygl-cbfx" href="/user/cbfx">成本分析</a></li><li><a class="bb-subnav" data-subshow="nygl-bb" href="#">报表</a></li>'; 
                            break;
                        case 'pgzd':
                            this.str = '<li class="active"><a class="zdzn-subnav" data-subshow="pgzd-zdzn" href="/user/zdzn">诊断指南</a></li><li><a class="yyzd-subnav" data-subshow="pgzd-yyzd" href="/user/yyzd">预约诊断</a></li><li><a class="zdbg-subnav" data-subshow="pgzd-zdbg" href="/user/zdbg">诊断报告</a></li>'; 
                            break;
                        case 'pgzdzj':
                            this.str = '<li class="active"><a class="bgbj-subnav" data-subshow="pgzdzj-bgbj" href="/user/bgbj">报告编辑</a></li>';
                            break;
                        default:
                    }
                    $('.my-sub-nav').empty().append(this.str);
                }
                //子导航选择
                $(this.doc).on('click','.my-sub-nav > li > a',function(){
                    var $this = $(this)
                    $this.parent('li').siblings('li').removeClass('active').end().addClass('active'); 
                    localStorage.setItem('curNav',$this.data('subshow'));
                });
            }
        } 
        // page start
        var page = new PageStart();
        page.init();
    }(window, document));
});
