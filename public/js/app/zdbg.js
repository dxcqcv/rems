define(function(require) {
	var $ = require('jquery'),
		selectpicker = require('bootstrap-select'),
		zh_cn = require('moment-zh-cn'),
		moment = require('moment'),
		setDate = require('app/setDate'),
		projectid = require('app/checkProjectid'),
		//datetimepickerObj = require('app/dateObj'),
		globalTools = require('app/globalTools'),
		api = require('app/getApi'),
		optionsLines = require('app/highchartsConfigLines'),
		datapicker = require('bootstrap-datetimepicker.min')
      ;
    (function() {
    var zdbgStart = $('#zdbgStart'), zdbgEnd = $('#zdbgEnd');

    var dateStar,dateEnd;

       var datetimepickerObjZdbg = {
            format: 'YYYY-MM-DD',
            locale: 'zh-cn'
       };
    $('.radio').on('click', function(){
        var $this = $(this), id = $this.attr('id');
        if( $this.prop('checked') && id === 'glj' ) { 
            console.log('供冷及'); 
zdbgStart.data("DateTimePicker").date('2015-10-31');
zdbgEnd.data("DateTimePicker").date('2015-05-01');
        }
        else if( $this.prop('checked') && id === 'grj' ) { 
            console.log('供热及'); 
zdbgStart.data("DateTimePicker").date('2016-04-30');
zdbgEnd.data("DateTimePicker").date('2015-11-01');
        }
    });
function setDatePick(id,groupType,startObj,endObj){
//
    zdbgStart.datetimepicker(datetimepickerObj );
    zdbgEnd.datetimepicker(datetimepickerObj );

    $('#'+id).prop('checked',true);        
    groupType = groupType;
}
    //获取当前月
    var m = moment().format('M'), groupType;//季节判断
    if(m >= 5 && m <= 10 ) {// 供冷季
        $('#glj').prop('checked',true);        
        groupType = 0;
    zdbgStart.datetimepicker(datetimepickerObjZdbg );
    zdbgEnd.datetimepicker(datetimepickerObjZdbg );
zdbgStart.data("DateTimePicker").date('2015-10-31');
zdbgEnd.data("DateTimePicker").date('2015-05-01');
    } else { //供热季 
        $('#grj').prop('checked',true);        
        groupType = 1;
    zdbgStart.datetimepicker(datetimepickerObjZdbg );
    zdbgEnd.datetimepicker(datetimepickerObjZdbg );
zdbgStart.data("DateTimePicker").date('2016-04-30');
zdbgEnd.data("DateTimePicker").date('2015-11-01');
        //时间控件
    }
        zdbgStart.on('dp.change', function(ev) {
            dateStar = ev.date.format('YYYY-MM-DD');
           zdbgEnd.data("DateTimePicker").maxDate(ev.date); 
           console.log(groupType )
        });
        zdbgEnd.on('dp.change', function(ev) {
            dateEnd = ev.date.format('YYYY-MM-DD');
           zdbgStart.data("DateTimePicker").minDate(ev.date); 
           //if(groupType  ===)
        });
      //下拉框默认值
      var zdbgStr = '', zdbgProjectSel = $('#zdbgProjectSel') ;
      switch(projectid) {
        case 1:
            zdbgProjectSel.val(0);
            break; 
        case 2:
            zdbgProjectSel.val(1);
            break; 
      }
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


	}());	
});
