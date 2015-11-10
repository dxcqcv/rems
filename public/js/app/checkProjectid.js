define(function(require){
    var $ = require('jquery');
    // check projectid
    var curProjectid = localStorage.getItem('curProjectid');
    var title = localStorage.getItem('curProjectidName');
    $('#subTitleNav').text(title);

    return curProjectid;
});
