define(function(require) {
	var $ = require('jquery')
      , selectpickerCss = require('css!../../css/bootstrap-select')
      , datapickerCss = require('css!../../css/bootstrap-datetimepicker')
      , highcharts = require('highcharts')
      , selectpicker = require('bootstrap-select')
      , datapicker = require('bootstrap-datetimepicker.min')
      ;
	$(function() {
    //时间控件
        $(".datepicker").datetimepicker();
    //选择控件
        $('.selectpicker').selectpicker();
	}());	
});
