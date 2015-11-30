define(function(require){
      var moment = require('moment');
		var datapicker = require('bootstrap-datetimepicker.min');
      var $ = require('jquery');
       var datetimepickerObj2 = {
            format: 'YYYY',
            useCurrent: true,
            locale: 'zh-cn',
            defaultDate: new Date() 
       };
       var datetimepickerObj3 = {
            useCurrent: true,
            format: 'YYYY-MM',
            locale: 'zh-cn',
            defaultDate: new Date() 
       };
       var datetimepickerObj4 = {
            format: 'YYYY-MM-DD',
            useCurrent: true,
            locale: 'zh-cn',
            defaultDate: new Date() 
       };
    return {
        changeDate: function(el) {
            var el = $(el);
            var fromEl = el.attr('data-tar');
            var fromTime, toTime;
            var d = new Date();
            if(fromEl === undefined) return;
            if (el.attr('data-range') == '1d') {
                //fromTime = moment().startOf('day').format("YYYY-MM-DD");
                fromTime = moment().format("YYYY-MM-DD");
                //console.log(fromTime)
                //$("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM-DD").viewMode('days');
                $("#" + fromEl).data("DateTimePicker").date(d).format("YYYY-MM-DD").viewMode('days');
//$("#" + fromEl).data("DateTimePicker").destroy();
 //$("#" + fromEl).datetimepicker(datetimepickerObj4)
            }else if (el.attr('data-range') == '1m') {
                fromTime = moment().format("YYYY-MM");
                //$("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM").viewMode('months');
                $("#" + fromEl).data("DateTimePicker").date(d).format("YYYY-MM").viewMode('months');
//$("#" + fromEl).data("DateTimePicker").destroy();
 //$("#" + fromEl).datetimepicker(datetimepickerObj3)
            }else{
                fromTime = moment().format("YYYY");
                //console.log(fromTime);
                //$("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY").viewMode('years');
                $("#" + fromEl).data("DateTimePicker").date(d).format("YYYY").viewMode('years');
                //console.log('fromEl',fromEl)
//$("#" + fromEl).data("DateTimePicker").destroy().datetimepicker(datetimepickerObj2);
//$("#" + fromEl).data("DateTimePicker").destroy();
 //$("#" + fromEl).datetimepicker(datetimepickerObj2)
//$("#" + fromEl).data("DateTimePicker").options(datetimepickerObj2);
            };
            var datetime = $("#" + fromEl).find('input').val();
                //console.log('datetime',datetime)
            return datetime; 
        } 
    }

});
