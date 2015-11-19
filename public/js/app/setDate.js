define(function(require){
      var moment = require('moment');
      var $ = require('jquery');
    return {
        changeDate: function(el) {
            var el = $(el);
            var fromEl = el.attr('data-tar');
            var toEl = el.attr('date-pickerto');
            var fromTime, toTime;
            if(fromEl === undefined) return;
            if (el.attr('data-range') == '1d') {
                fromTime = moment().startOf('day').format("YYYY-MM-DD");
                toTime = moment().startOf('minute').format("YYYY-MM-DD");
                $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM-DD").viewMode('days');
            }else if (el.attr('data-range') == '1m') {
                fromTime = moment().startOf('month').format("YYYY-MM");
                toTime = moment().startOf('minute').format("YYYY-MM");
                $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM").viewMode('months');
            }else{
                fromTime = moment().startOf('year').format("YYYY");
                toTime = moment().startOf('minute').format("YYYY");
                $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY").viewMode('years');
            };
            return true; 
        } 
    }

});
