define(function(require){
    var 
       $ = require('jquery')
      , exporting = require('exporting')
      ;
      (function(){
var proto = Highcharts.Chart.prototype;

proto.zoomToD = function(delta){
    var chartMin = this.xAxis[1].min;
    var chartMax = this.xAxis[0].max;
    var min = chartMax - delta;

    if (chartMin < min) {
        // this.xAxis[0] is the view, this.xAxis[1] is the navigator
        this.xAxis[0].setExtremes(min, chartMax);
        return true;
    }

    this.xAxis[0].setExtremes(chartMin, chartMax);
    return false;
}
proto.zoom1d = function(){
    return this.zoomToD(86400 * 1000);
}
proto.zoom1m = function(){
    return this.zoomToD(2592000 * 1000);
}
proto.zoom3m = function(){
    return this.zoomToD(2592000 * 3 * 1000);
}
proto.zoom6m = function(){
    return this.zoomToD(2592000 * 6 * 1000);
}
proto.zoom1y = function(){
    return this.zoomToD(2592000 * 12 * 1000);
}
proto.zoomAll = function(){
    // picking max values from the navigator axis
    this.xAxis[0].setExtremes(this.xAxis[1].min, this.xAxis[1].max);
}
proto.zoomYtd = function(){
    var chartMin = this.xAxis[1].min;
    var chartMax = this.xAxis[1].max;
    var min = chartMax - 2592000 * 12 * 1000;

    if (chartMin < min) {
        this.xAxis[0].setExtremes(min, chartMax);
        return true;
    }

    this.xAxis[0].setExtremes(chartMin, chartMax);
    return false;
}
proto.zoomWithDate = function(startdate,enddate){
    
    this.xAxis[0].setExtremes(startdate, enddate);
    //alert(Date.UTC(2010,12,12));
    //this.xAxis[0].setExtremes(Date.UTC(2010,12,12), Date.UTC(2013,12,14));
}
      }());
});
