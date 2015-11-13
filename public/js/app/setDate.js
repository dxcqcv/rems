define(function(require){

      var moment = require('moment');
function setDate(el){
    var fromEl = el.attr('data-tar');
    var toEl = el.attr('date-pickerto');
    var fromTime, toTime;
    if (el.attr('data-range') == '1d') {
        fromTime = moment().startOf('day').format("YYYY-MM-DD");
        toTime = moment().startOf('minute').format("YYYY-MM-DD");
        //只有执行两次才能保证点击日时候显示正常
        $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM-DD").viewMode('days');
        $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM-DD").viewMode('days');
    }else if (el.attr('data-range') == '1m') {
        fromTime = moment().startOf('month').format("YYYY-MM");
        toTime = moment().startOf('minute').format("YYYY-MM");
        $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM").viewMode('months');
        $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY-MM").viewMode('months');
    }else{
        fromTime = moment().startOf('year').format("YYYY");
        toTime = moment().startOf('minute').format("YYYY");
        $("#" + fromEl).data("DateTimePicker").date(fromTime).format("YYYY").viewMode('years');
    };
}

return setDate;

});
