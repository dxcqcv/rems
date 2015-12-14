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
    //var month = moment().month(8).format('M');
    //var year = moment().year();
    //var day = moment().day(1).format('D');
    //console.log(year)
    //console.log(month)
    //console.log(day)
    var year = new Date();
    var fivMonth = new Date(year.setMonth(4));
    var tenMonth = new Date(year.setMonth(9));
    var eleMonth =  new Date(year.setMonth(10));

    var current = new Date();
    var nextYearStamp = current.setFullYear(current.getFullYear()+1);
    var nextYear = new Date(nextYearStamp);
    var fourMonth = new Date(nextYear.setMonth(3));

    //var max = new Date(year.getFullYear()+1,year.setMonth(2),0)
    //console.log(nextYear.setMonth(2) )

       var datetimepickerObjGrj = {
            format: 'YYYY-MM-DD',
            locale: 'zh-cn',
            defaultDate: new Date(),
            minDate:  eleMonth.setDate(1),
            maxDate:  fourMonth.setDate(30),
       };
       var datetimepickerObjGrjUF = {
            format: 'YYYY-MM-DD',
            locale: 'zh-cn',
            defaultDate: new Date(),
            minDate:  eleMonth.setDate(1),
            maxDate:  fourMonth.setDate(30),
            useCurrent: false
       };
       var datetimepickerObjGlj = {
            format: 'YYYY-MM-DD',
            locale: 'zh-cn',
            defaultDate: new Date(),
            minDate:  fivMonth.setDate(1),
            maxDate:  tenMonth.setDate(31),
       };
       var datetimepickerObjGljUF = {
            format: 'YYYY-MM-DD',
            locale: 'zh-cn',
            defaultDate: new Date(),
            minDate:  fivMonth.setDate(1),
            maxDate:  tenMonth.setDate(31),
            useCurrent: false
       };
    var dateStar,dateEnd;
    $('.radio').on('click', function(){
        var $this = $(this), id = $this.attr('id');
        if( $this.prop('checked') && id === 'glj' ) { 
            console.log('供冷及'); 
            setDatePick(id,0,datetimepickerObjGlj,datetimepickerObjGljUF);
        }
        else if( $this.prop('checked') && id === 'grj' ) { 
            console.log('供热及'); 
        }
    });
function setDatePick(id,groupType,startObj,endObj){
console.log(1212)
    $('#'+id).prop('checked',true);        
    groupType = groupType;

    $('#zdbgStart').datetimepicker(startObj).on('dp.change', function(ev) {
        dateStar = ev.date.format('YYYY-MM-DD');
       $('#zdbgEnd').data("DateTimePicker").maxDate(ev.date); 
    });
    $('#zdbgEnd').datetimepicker(endObj).on('dp.change', function(ev) {
        dateEnd = ev.date.format('YYYY-MM-DD');
       $('#zdbgStart').data("DateTimePicker").minDate(ev.date); 
    });
}
    //获取当前月
    var m = moment().format('M'), groupType;//季节判断
    var zdbgStart = $('#zdbgStart'), zdbgEnd = $('#zdbgEnd');
    if(m >= 5 && m <= 10 ) {// 供冷季
        $('#glj').prop('checked',true);        
        groupType = 0;
		$('#zdbgStart').datetimepicker(datetimepickerObjGlj).on('dp.change', function(ev) {
            dateStar = ev.date.format('YYYY-MM-DD');
           $('#zdbgEnd').data("DateTimePicker").maxDate(ev.date); 
        });
		$('#zdbgEnd').datetimepicker(datetimepickerObjGljUF).on('dp.change', function(ev) {
            dateEnd = ev.date.format('YYYY-MM-DD');
           $('#zdbgStart').data("DateTimePicker").minDate(ev.date); 
        });
    } else { //供热季 
        $('#grj').prop('checked',true);        
        groupType = 1;
        //时间控件
		$('#zdbgStart').datetimepicker(datetimepickerObjGrj).on('dp.change', function(ev) {
            dateStar = ev.date.format('YYYY-MM-DD');
           $('#zdbgEnd').data("DateTimePicker").maxDate(ev.date); 
        });
		$('#zdbgEnd').datetimepicker(datetimepickerObjGrjUF).on('dp.change', function(ev) {
            dateEnd = ev.date.format('YYYY-MM-DD');
           $('#zdbgStart').data("DateTimePicker").minDate(ev.date); 
        });
    }
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
