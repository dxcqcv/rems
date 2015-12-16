;define(function(require){
    var $ = require('jquery')
      , exporting = require('exporting')
      , api = require('app/getApi')
      , selectpicker = require('bootstrap-select')
      , projectid = require('app/checkProjectid')
    ;
    (function(){
      //下拉选择
        $('#classTypeList').selectpicker({
        });

        $('#classList').selectpicker({
        });

        $('#classList').change(function ()
      {
          var url = '/api/datamonitor/leftInfo.json';
          //var classid = 2;
          var classid = $('#classList').find("option:selected").attr("value");;  //获取Select选择的Value
          demand.start({
              url: url,
              parameter: {
              },
              data: {
                  projectid: projectid,
                  classid: classid
              },
              done: onClassSelectChanged
          });
      });

        function onClassSelectChanged(result, parameter) {
          //var oneLi = "<li>黄花机场js</li>";
          //$('.rodr').append(oneLi);

          $('#classInstanceList').empty();

          var classInstancelist = result.status.data.list;

          if (classInstancelist != null)
          {
              for (var i = 0; i < classInstancelist.length; i++) {
                  var oneLi = '<li>' + classInstancelist[i].classinstancename + '</li>';
                  $('#classInstanceList').append(oneLi);
                  $('#classInstanceList>li').last().data("instanceId", classInstancelist[i].classinstanceid);
              }
              $('#classInstanceList>li').on('click', function () {

                  var url = '/api/datamonitor/value.json';
                  var instanceId = $(this).data("instanceId");
                  demand.start({
                      url: url,
                      parameter: {
                      },
                      data: {
                          projectid: projectid,
                          instanceid: instanceId
                      },
                      done: onInstancePropertyReceived
                  });
              });
          }

		}

        function onInstancePropertyReceived(result, parameter)
        {
            $('#tbyDynamicProperty').empty();
            $('#tbyStaticProperty').empty();
            var dynamicPropertylist = result.status.data.lists[0];
            var staticPropertylist = result.status.data.lists[0];
            if (dynamicPropertylist != null) {
                for (var i = 0; i < dynamicPropertylist.length; i++) {
                    var oneTr = '<tr class="row"> <td>' + dynamicPropertylist[i].propertyname + '</td> <td>' + dynamicPropertylist[i].datavalue + dynamicPropertylist[i].unitname + '</td></tr>';
                    $('#tbyDynamicProperty').append(oneTr);
                }
            }
            if (staticPropertylist != null) {
                for (var i = 0; i < staticPropertylist.length; i++) {
                    var oneTr = '<tr class="row"> <td>' + staticPropertylist[i].propertyname + '</td> <td>' + staticPropertylist[i].datavalue + staticPropertylist[i].unitname + '</td></tr>';
                    $('#tbyDynamicProperty').append(oneTr);
                }
            }
        };

      //$('#classInstanceList>li').on('click', function () {
      //    var instanceId = 1;
      //});

    	$('.btn_coin').on('click', function() {
            $('#gytModal').modal({
                backdrop: 'static' 
            });  		
        });

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('.sjjc-charts').highcharts('StockChart', {


            rangeSelector : {
                selected : 1
            },

            title : {
                text : null 
            },

        yAxis: {
            title: {
                //text: 'Temperature (°C)'
                text: null 
            },
            plotLines: [{
                value: 125,
                width: 1,
                //color: '#808080'
                zIndex: 2,
                color: 'red'
            }]
        },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
    }());
});
