define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		zh_cn = require('moment-zh-cn'),
		moment = require('moment'),
		setDate = require('app/setDate'),
		projectid = require('app/checkProjectid'),
		datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines'),
		datapicker = require('bootstrap-datetimepicker.min')
      , radio = require('bootstrap-radio')
      ;
    (function() {
    $('input[type="radio"]').radio();
      //下拉选择
      $('.selectpicker').selectpicker({});

        //选择下拉框
		$('.selectpicker').change(function() {
			var $this = $(this);
			var selected = $this.find('option:selected');
            var instanceid = selected.attr('data-instanceid');
            var propertyid = selected.attr('id');
            var parents = $this.parents('.my-card');
			var charts = parents.find('.chart-box').attr('id');
            var url, config, selectOptions;
            dateStar = parents.find('.datetimepicker1').children('input').val();  
            dateFlag = setDate.getFlag();
        });

        //时间控件
		$('.datetimepicker1').datetimepicker(datetimepickerObj).on('dp.change', function(ev) {
			//dateStar = ev.date.format('YYYY-MM-DD');
            
            var cd = ev.date.format('YYYY-MM-DD');
        });

	}());	
});
