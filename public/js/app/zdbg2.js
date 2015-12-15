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

    function dateOptions() {
        var year = new Date();
        var fivMonth = new Date(year.setMonth(4));
        var tenMonth = new Date(year.setMonth(9));
        var eleMonth =  new Date(year.setMonth(10));


        var current = new Date();
        var nextYearStamp = current.setFullYear(current.getFullYear()+1);
        var nextYear = new Date(nextYearStamp);
        var fourMonth = new Date(nextYear.setMonth(3));

        var sr1 = eleMonth.setDate(1);
        var sr30 = fourMonth.setDate(30);

        var sl1 = fivMonth.setDate(1);
        var sl31 = tenMonth.setDate(31);
           var datetimepickerObjGrj = {
                format: 'YYYY-MM-DD',
                locale: 'zh-cn',
                defaultDate: sr30,
                minDate:  sr1,
                maxDate:  sr30,
           };
           var datetimepickerObjGrjUF = {
                format: 'YYYY-MM-DD',
                locale: 'zh-cn',
                defaultDate: sr1,
                minDate:  sr1,
                maxDate:  sr30,
                useCurrent: false
           };
           var datetimepickerObjGlj = {
                format: 'YYYY-MM-DD',
                locale: 'zh-cn',
                defaultDate: sl31,
                minDate:  sl1,
                maxDate:  sl31,
           };
           var datetimepickerObjGljUF = {
                format: 'YYYY-MM-DD',
                locale: 'zh-cn',
                defaultDate: sl1,
                minDate:  sl1,
                maxDate:  sl31,
                useCurrent: false
           };
           return [datetimepickerObjGrj, datetimepickerObjGrjUF, datetimepickerObjGlj, datetimepickerObjGljUF ]; 
    }
    var dateStar,dateEnd;

    $('.radio').on('click', function(){
        var $this = $(this), id = $this.attr('id');
        var dateOption = dateOptions();
        if( $this.prop('checked') && id === 'glj' ) { 
            console.log('供冷及'); 
//zdbgStart.data('DateTimePicker').destroy();
//zdbgEnd.data('DateTimePicker').destroy();
            //setDatePick(id,0,datetimepickerObjGlj,datetimepickerObjGljUF);

        zdbgStart.data("DateTimePicker").options(dateOption[2]);
        zdbgEnd.data("DateTimePicker").options(dateOption[3]);
        }
        else if( $this.prop('checked') && id === 'grj' ) { 
            console.log('供热及'); 
//zdbgStart.data('DateTimePicker').destroy();
//zdbgEnd.data('DateTimePicker').destroy();
            setDatePick(id,1,datetimepickerObjGrj,datetimepickerObjGrjUF);
        }
    });
function setDatePick(id,groupType,startObj,endObj){
//
    zdbgStart.datetimepicker(startObj);
    zdbgEnd.datetimepicker(endObj);
    $('#'+id).prop('checked',true);        
    groupType = groupType;
}
    //获取当前月
    var m = moment().format('M'), groupType;//季节判断
    var dateOption = dateOptions();
    if(m >= 5 && m <= 10 ) {// 供冷季
        $('#glj').prop('checked',true);        
        groupType = 0;
        //setDatePick(1,0,datetimepickerObjGlj,datetimepickerObjGljUF);
        zdbgStart.datetimepicker(dateOption[2]);
        zdbgEnd.datetimepicker(dateOption[3]);
    } else { //供热季 
        $('#grj').prop('checked',true);        
        groupType = 1;
        //时间控件
        //setDatePick(1,1,datetimepickerObjGrj,datetimepickerObjGrjUF);
        zdbgStart.datetimepicker(dateOption[0]);
        zdbgEnd.datetimepicker(dateOption[1]);
    }
        zdbgStart.on('dp.change', function(ev) {
            dateStar = ev.date.format('YYYY-MM-DD');
           zdbgEnd.data("DateTimePicker").maxDate(ev.date); 
        });
        zdbgEnd.on('dp.change', function(ev) {
            dateEnd = ev.date.format('YYYY-MM-DD');
           zdbgStart.data("DateTimePicker").minDate(ev.date); 
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
