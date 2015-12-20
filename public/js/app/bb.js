//bb.js 好用的时候

define(function(require) {
    var $ = require('jquery')
      , highcharts = require('exporting')
      , selectpicker = require('bootstrap-select')

      , zh_cn = require('moment-zh-cn')
      , bootstrapTable = require('bootstrap-table')
      , bsTableLocal = require('bootstrap-table-locale-all.min')

      , datapicker = require('bootstrap-datetimepicker.min')      
      , datetimepickerObj = require('app/dateObj')
      , api = require('app/getApi')
      ;
    (function() {
        // if(window.localStorage){
        //  alert('This browser supports localStorage');
        // }else{
        //  alert('This browser does NOT support localStorage');
        // }

        //获取报表的列表：
        demand.start({url:'/api/config/report/list.json', data:{reportName:""},done:addBbSelect})
        function addBbSelect(data){
            console.log(data);
            //var str = '<option value="">请选择报表</option>';
            var str = '';
           // var haderInputIdsString = '';
            $("#reportTemplateSelect").empty().append(str).selectpicker('refresh');
            $.each(data.status.data.list, function(i, item) {
                str += '<option value="' + item.id + '" codes="' + item.codes + '">' + item.name + '</option>';
               // haderInputIdsString += '<input type="hidden" id="' + item.id + '" value="' + item.header + '"/>';
                localStorage[item.id] = item.header;//设置a为"3"
            });


            //$(document.body).append(haderInputIdsString);
            $("#reportTemplateSelect").empty().append(str).selectpicker('refresh');
        }



        //根据id获取运行报表的内容：
        $('#reportTemplateSelect').change(function(){
                var selected = $(this).find('option:selected').val();
               
                console.log(localStorage[selected]);
                $("#tbyDyrb").html(localStorage[selected]);

                var cellWidth = $("#tbyDyrb colgroup").find("col").eq(0).width();
                
                var colNumber = Math.round(100/cellWidth);
                var htmlInputString = "<tr id='codesTr' style='display:none;'>";
                for (var i = 0; i < colNumber; i++) {
                    htmlInputString += '<th width="'+cellWidth+'%" data-field="P'+i+'">P'+i+'</th> ';
                };
                htmlInputString += "</tr>";
                
            $("#tbyDyrb thead").prepend(htmlInputString);
                $("#tbyDyrb colgroup").remove();
                console.log("iok");
                
                demand.start({url:'/api/runReport/list.json',data:{reportid:selected, dateStar:'2015-09-01',dateFlag:1},done:bb_left})
                
        });

        function bb_left(data){
            console.log(data);
            //$table = $('#tbyDyrb').bootstrapTable({ halign: "center", align: "center", valign: "middle"});
            //将data格式化成标准的table；
            var count = 0;
            var dataObj = [];
            $.each(data.status.data,function(name,value) {
               for(var i=0;i<value.length;i++){
                    dataObj[i]= {};
                }
                //{ "date": "2014/12/29 0:00", "P1": 296.69, "P2": 1000, "P3": 47.87, "P4": 43.74, "P5": 14, "P6": 13.6, "P7": 11.67, "P8": 0, "P9": 242.04, "P10": 0, "P11": 481.48, "P12": 588.67, "P13": 155.06, "P14": 516.8, "P15": 444.38, "P16": 183 }
            });
            $.each(data.status.data,function(name,value) {
                // console.log(name);
                // console.log(value);
                // 此时：
                // 判断是date 相同的则放在一起；
                // 放在p1中：
                // 列：
                for(var i=0;i<value.length;i++){
                 //for(var i=0;i<15;i++){
                    var pnub = "P"+count;
                    if (value[i].datavalue) {
                        dataObj[i][pnub]= value[i].datavalue;
                    }else{
                        dataObj[i][pnub]= 10;
                    }
                    //dataObj[i][pnub]= 10; 
                }
                count++;
                //{ "date": "2014/12/29 0:00", "P1": 296.69, "P2": 1000, "P3": 47.87, "P4": 43.74, "P5": 14, "P6": 13.6, "P7": 11.67, "P8": 0, "P9": 242.04, "P10": 0, "P11": 481.48, "P12": 588.67, "P13": 155.06, "P14": 516.8, "P15": 444.38, "P16": 183 }
            });

            // for (var i = 0; i < dataObj.length; i++) {
            //     dataObj[i]["P0"]= 10;
            //     dataObj[i]["P1"]= 10;
            //     dataObj[i]["P2"]= 10;
            //     dataObj[i]["P3"]= 10;
            //     dataObj[i]["P4"]= 10;
            //     dataObj[i]["P5"]= 10;
            //     dataObj[i]["P6"]= 10;
            //     dataObj[i]["P7"]= 10;
            //     dataObj[i]["P8"]= 10;
            //     dataObj[i]["P9"]= 10;
            //     dataObj[i]["P10"]= 10;
            //     dataObj[i]["P11"]= 10;
            //     dataObj[i]["P12"]= 10;
            //     dataObj[i]["P13"]= 10;
            //     dataObj[i]["P14"]= 10;
            // };
            console.log(dataObj);
            $table = $('#tbyDyrb').bootstrapTable({ halign: "center", align: "center", valign: "middle"});
        $table.bootstrapTable('load', dataObj);

            // var formatData = 
            // $table.bootstrapTable('load', dyrb_data);
            //将data循环出来数据；然后加上checkbox 之后 

            // var str = "";
            // $.each(data.status.data.classList,function(i,v){
            //     str +='<li class="lili" data-classid="'+v.classid+'" data-classtypeid="'+v.classtypeid+'">'+v.classname+'</li>';
            // });
            // $("#lsx_ul").empty().append(str);
        }
          

        //导出excel按钮事件：
        
        $("#exportExcelBtn").on('click',function(){
            alert("iioioi");
            resetChartsForExport();
            $('#myModal-dyrb').modal();
            // var tmpChart = new Highcharts.Chart({
            //     chart: {  
            //         renderTo:'exporttmp',//目标容器  其实这里是不显示的
            //         type: 'bar',
            //         events: {
            //             load: function () {
            //                 var ch = this;
            //                 setTimeout(function(){
            //                     ch.exportChart();
            //                 },1);
            //             }
            //         }
            //     },  
            //     title: {
            //         text: 'Monthly Average Temperature',
            //         x: -20 //center
            //     },
            //     subtitle: {
            //         text: 'Source: WorldClimate.com',
            //         x: -20
            //     },
            //     xAxis: {
            //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            //     },
            //     yAxis: {
            //         title: {
            //             text: 'Temperature (°C)'
            //         },
            //         plotLines: [{
            //             value: 0,
            //             width: 1,
            //             color: '#808080'
            //         }]
            //     },
            //     tooltip: {
            //         valueSuffix: '°C'
            //     },
            //     legend: {
            //         layout: 'vertical',
            //         align: 'right',
            //         verticalAlign: 'middle',
            //         borderWidth: 0
            //     },
            //     series: [{
            //         name: 'Tokyo',
            //         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            //     }, {
            //         name: 'New York',
            //         data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            //     }, {
            //         name: 'Berlin',
            //         data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            //     }, {
            //         name: 'London',
            //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            //     }],
            //     // some chart options 
            //     exporting:{
            //         url: '/user/exportChartPic'
            //     }
            //     // more chart options 
            // });

        })
   
    //选择控件
        $('.selectpicker').selectpicker();
        //时间控件
       $('.datetimepicker1').datetimepicker(datetimepickerObj);

//huang
        var dyrb_Parameter = [
                                { "name": "吸气压力", "unit": "Mpa", "color": "#4572A7", "lineType": "spline", "lineStyle": "dot" },
                                {"name":"排气压力", "unit":"Mpa", "color":"#AA4143","lineType":"spline","lineStyle":"dot"},
                                {"name":"制冷出水温度", "unit":"°C", "color":"#AA4243","lineType":"spline","lineStyle":"dot"},
                                {"name":"制冷回水温度", "unit":"°C", "color":"#AA4343","lineType":"spline","lineStyle":"dot"},
                                {"name":"设定温度", "unit":"°C", "color":"#AA4443","lineType":"spline","lineStyle":"dot"},
                                {"name":"制热出口温度", "unit":"°C", "color":"#AA4543","lineType":"spline","lineStyle":"dot"},
                                {"name":"制热回水温度", "unit":"°C", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"机组电压", "unit":"V", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"1#机组电流", "unit":"A", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"2#机组电流", "unit":"A", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"集水器压力", "unit":"Mpa", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"使用侧回水压力", "unit":"Mpa", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"使用侧流量", "unit":"m³/h", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"分水器压力", "unit":"Mpa", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"循环侧回水压力", "unit":"Mpa", "color":"#AA4643","lineType":"spline","lineStyle":"dot"},
                                {"name":"循环侧流量", "unit":"m³/h", "color":"#AA4643","lineType":"spline","lineStyle":"dot"}
                        ];


        var dyrb_data = [
                    { "date": "2014/12/29 0:00", "P1": 296.69, "P2": 1000, "P3": 47.87, "P4": 43.74, "P5": 14, "P6": 13.6, "P7": 11.67, "P8": 0, "P9": 242.04, "P10": 0, "P11": 481.48, "P12": 588.67, "P13": 155.06, "P14": 516.8, "P15": 444.38, "P16": 183 },
                    { "date": "2014-12-29 01:00", "P1": 296.87, "P2": 1000, "P3": 48.1, "P4": 43.98, "P5": 14, "P6": 13.6, "P7": 11.65, "P8": 0, "P9": 243.51, "P10": 0, "P11": 483.12, "P12": 590.27, "P13": 155.02, "P14": 518.31, "P15": 442.16, "P16": 183.05},
                    { "date": "2014-12-29 02:00", "P1": 296.57, "P2": 1000, "P3": 47.99, "P4": 43.86, "P5": 14, "P6": 13.6, "P7": 11.63, "P8": 0, "P9": 242.39, "P10": 0, "P11": 481, "P12": 588.39, "P13": 155.06, "P14": 516.82, "P15": 439.79, "P16": 183},
                    { "date": "2014-12-29 03:00", "P1": 296.65, "P2": 1000, "P3": 48.11, "P4": 43.98, "P5": 14, "P6": 13.6, "P7": 11.64, "P8": 0, "P9": 243.19, "P10": 0, "P11": 481.61, "P12": 588.96, "P13": 154.91, "P14": 517.51, "P15": 437.54, "P16": 183.3},
                    { "date": "2014-12-29 04:00", "P1": 296.87, "P2": 1000, "P3": 48.17, "P4": 44.06, "P5": 14, "P6": 13.6, "P7": 11.65, "P8": 0, "P9": 243.33, "P10": 0, "P11": 481.77, "P12": 589.04, "P13": 154.98, "P14": 517.14, "P15": 435.45, "P16": 183.13},
                    { "date": "2014-12-29 05:00", "P1": 296.69, "P2": 1000, "P3": 48.17, "P4": 44.04, "P5": 14, "P6": 13.6, "P7": 11.64, "P8": 0, "P9": 243.02, "P10": 0, "P11": 481.26, "P12": 588.59, "P13": 155.02, "P14": 515.96, "P15": 433.38, "P16": 182.98 },
                    { "date": "2014-12-29 06:00", "P1": 296.72, "P2": 1000, "P3": 48.06, "P4": 43.93, "P5": 14, "P6": 13.6, "P7": 11.62, "P8": 0, "P9": 242.24, "P10":0, "P11": 478.79, "P12": 585.46, "P13": 155.31, "P14": 519.27, "P15":430.24, "P16": 182.83},
                    { "date": "2014-12-29 07:00", "P1": 296.44, "P2": 1000, "P3": 47.78, "P4": 43.67, "P5": 14, "P6": 13.6, "P7": 11.63, "P8": 0, "P9": 241.57, "P10":0, "P11": 475.8, "P12": 581.92, "P13": 155.28, "P14": 518.42, "P15":427.14, "P16": 183.77},
                    { "date": "2014-12-29 08:00", "P1": 293.59, "P2": 1000, "P3": 47.62, "P4": 43.08, "P5": 14, "P6": 13.55, "P7": 11.4, "P8": 0, "P9": 233.11, "P10":52.12, "P11": 475.57, "P12": 581.48, "P13": 155.93, "P14": 515.18, "P15":584.19, "P16": 183.01},
                    { "date": "2014-12-29 09:00", "P1": 281.61, "P2": 1000, "P3": 47.6,  "P4": 42.81, "P5": 14, "P6": 13.46, "P7": 11.32, "P8": 0, "P9": 160.55, "P10":162.68, "P11": 473.96, "P12": 580.28, "P13": 155.56, "P14": 510.67, "P15":577.3, "P16": 183.34},
                    { "date": "2014-12-29 10:00", "P1": 280.88, "P2": 1000, "P3": 47.63, "P4": 42.83, "P5": 14, "P6": 13.4,  "P7": 11.28, "P8": 0, "P9": 160.27, "P10":162.12, "P11": 475.03, "P12": 581.43, "P13": 155.66, "P14": 508.49, "P15":568.68, "P16": 182.99},
                    { "date": "2014-12-29 11:00", "P1": 280.45, "P2": 1000, "P3": 47.74, "P4": 42.92, "P5": 14, "P6": 13.33, "P7": 11.2, "P8": 0, "P9": 160.86, "P10": 162.9, "P11": 476.95, "P12": 583.28, "P13": 155.84, "P14": 508.56, "P15": 561.62, "P16": 183.21 },

        ];
        console.log(dyrb_data);

        var guolu_data = [
                            ["2014-12-29 00:00",    0,  0.44,   0,  28.95,  0,  0,  70.91,  0,  0,  0.36,   0,  16.65,  0,  0,  15.81,  0,  0,  0.46,   153.06, 29.44,  27.7,   0],
                            ["2014-12-29 01:00",    0,  0.45,   0,  35.39,  0,  0,  65.28,  0,  0,  0.37,   0,  16.44,  0,  0,  15.35,  0,  0,  0.47,   153.77, 27.3,   26.6,   0],
                            ["2014-12-29 02:00",    0,  0.44,   0,  26.1,   0,  0,  70.24,  0,  0,  0.37,   0,  16.2,   0,  0,  14.96,  0,  0,  0.47,   153.79, 27.18,  26.53,  0],
                            ["2014-12-29 03:00",    0,  0.44,   0,  32.01,  0,  0,  64.24,  0,  0,  0.36,   0,  15.99,  0,  0,  14.63,  0,  0,  0.46,   153.24, 27.08,  26.41,  0],
                            ["2014-12-29 04:00",    0,  0.42,   0,  40.12,  0,  0,  80.49,  0,  0,  0.35,   0,  15.98,  0,  0,  14.37,  0,  0,  0.44,   152.31, 46.79,  33.87,  0],
                            ["2014-12-29 05:00",    0,  0.48,   0,  50.11,  0,  0,  83.59,  0,  0,  0.4,    0,  16.29,  0,  0,  14.24,  0,  0,  0.5,    156.43, 64.25,  49.81,  0],
                            ["2014-12-29 06:00",    0,  0.45,   0,  46.45,  0,  0,  69.13,  0,  0,  0.37,   0,  15.68,  0,  0,  13.95,  0,  0,  0.47,   154.61, 56.6,   55.71,  0],
                            ["2014-12-29 07:00",    0,  0.44,   0,  37.42,  0,  0,  69.29,  0,  0,  0.37,   0,  14.61,  0,  0,  13.46,  0,  0,  0.46,   153.16, 40.61,  44.53,  0],
                            ["2014-12-29 08:00",    0,  0.44,   0,  35.63,  0,  0,  79.27,  0,  0,  0.36,   0,  13.99,  0,  0,  13.01,  0,  0,  0.42,   150.87, 32.95,  41.07,  0],
                            ["2014-12-29 09:00",    0,  0.44,   0,  45.84,  0,  0,  78.13,  0,  0,  0.37,   0,  13.97,  0,  0,  12.75,  0,  0,  0.41,   151.38, 33.65,  41.89,  0],
                            ["2014-12-29 10:00",    0,  0.45,   0,  41.79,  0,  0,  78.01,  0,  0,  0.37,   0,  15.29,  0,  0,  12.71,  0,  0,  0.43,   151.73, 33.87,  43.69,  0],
                            ["2014-12-29 11:00",    0,  0.43,   0,  37.2,   0,  0,  72.01,  0,  0,  0.36,   0,  18.41,  0,  0,  13.21,  0,  0,  0.45,   153.38, 33.88,  42.17,  0],
                            ["2014-12-29 12:00",    0,  0.44,   0,  37.04,  0,  0,  71.62,  0,  0,  0.36,   0,  22.02,  0,  0,  13.79,  0,  0,  0.44,   152.71, 34.32,  41.08,  0],
                            ["2014-12-29 13:00",    0,  0.44,   0,  39.58,  0,  0,  70.11,  0,  0,  0.37,   0,  38.5,   0,  0,  79.33,  0,  0,  0.44,   152.6,  34.68,  40.9,   0],
                            ["2014-12-29 14:00",    0,  0.46,   0,  37.02,  0,  0,  56.06,  0,  0,  0.39,   0,  41.73,  0,  0,  81.58,  0,  0,  0.47,   154.85, 43,     34.84,  0],
                            ["2014-12-29 15:00",    0,  0.41,   0,  31.35,  0,  0,  50.98,  0,  0,  0.35,   0,  49.2,   0,  0,  88.29,  0,  0,  0.39,   149.78, 55.67,  42.83,  0],
                            ["2014-12-29 16:00",    0,  0.44,   0,  41.42,  0,  0,  47.91,  0,  0,  0.37,   0,  51.24,  0,  0,  92.66,  0,  0,  0.44,   153.07, 62.06,  48.87,  0],
                            ["2014-12-29 17:00",    0,  0.44,   0,  31.19,  0,  0,  44.68,  0,  0,  0.37,   0,  54.63,  0,  0,  93.41,  0,  0,  0.46,   154.6,  68.39,  54.93,  0],
                            ["2014-12-29 18:00",    0,  0.44,   0,  28.54,  0,  0,  41.54,  0,  0,  0.37,   0,  47.13,  0,  0,  82.65,  0,  0,  0.47,   154.99, 59.34,  57.31,  0],
                            ["2014-12-29 19:00",    0,  0.48,   0,  26.95,  0,  0,  36.66,  0,  0,  0.41,   0,  47.42,  0,  0,  72.06,  0,  0,  0.51,   156.15, 56.98,  56.5,   0],
                            ["2014-12-29 20:00",    0,  0.46,   0,  22.56,  0,  0,  36.17,  0,  0,  0.39,   0,  36.79,  0,  0,  70.85,  0,  0,  0.48,   154.48, 54.61,  49.39,  0],
                            ["2014-12-29 21:00",    0,  0.45,   0,  19.95,  0,  0,  36,     0,  0,  0.38,   0,  40,     0,  0,  65.44,  0,  0,  0.48,   154.06, 55.12,  48.4,   0],
                            ["2014-12-29 22:00",    0,  0.46,   0,  18.27,  0,  0,  36.68,  0,  0,  0.39,   0,  35.53,  0,  0,  70.96,  0,  0,  0.48,   154.05, 34.93,  41.68,  0],
                            ["2014-12-29 23:00",    0,  0.46,   0,  17.39,  0,  0,  37.43,  0,  0,  0.39,   0,  33.27,  0,  0,  66.97,  0,  0,  0.48,   154.4,  28.25,  41.95,  0]    
        ];

        //报表模板选择
        $('#reportTemplateSelect').change(
            function () {
                //var index = $(this).attr("selectedIndex");
                var index = $('#reportTemplateSelect')[0].selectedIndex;
                if (index == 0)
                {
                    $('#tabDyrb').show();
                    $('#tabGlyx').hide();
                    $('#tabYrxt').hide();
                    //$('#btnPopPicture').attr("data-target", "#myModal-dyrb");
                    //$('#btnPopPicture').data("data-target", "#myModal-dyrb");
                }
                else if(index == 1)
                {
                    $('#tabDyrb').hide();
                    $('#tabGlyx').show();
                    $('#tabYrxt').hide();
                    //$('#btnPopPicture').attr("data-target", "#myModal-guolu");
                }
                else if (index == 2) {
                    $('#tabDyrb').hide();
                    $('#tabGlyx').hide();
                    $('#tabYrxt').show();
                }
        });

        //$(".datepicker").datepicker({startView:"decade", minViewMode:"years", format:"yyyy", autoclose:true});
        $('.selectpicker').selectpicker();

        $('#tabDyrb').show();
        $('#tabGlyx').hide();
        $('#tabYrxt').hide();

        //$('#hc_dyrb').width($('#div_dyrb').width());
        //$('#hc_dyrb').height($('#div_dyrb').height());


        $('.radDateType').on('click', function () {
            if (radPickYear.checked == true) {
                $(".datepicker").datepicker({ startView: "decade", minViewMode: "years", format: "yyyy", autoclose: true });

            }
            else if (radPickMonth.checked == true) {
                $('.datepicker').datepicker({ startView: "year", minViewMode: "months", format: "yyyy/mm", autoclose: true });

            }
            else if (radPickDay.checked == true) {
                $('.datepicker').datepicker({ startView: "month", minViewMode: "days", format: "yyyy/mm/dd", autoclose: true });
            }
        })

        function generateOneLineCheckboxHtml(oneLineData) {
            var thisLineHtml = '<tr>';
            var oneColumn = null;
            for (var i = 0; i < oneLineData.length; i++) {
                if (i == 0)
                {
                    oneColumn = '<td style="width: 300px; text-align: center; vertical-align: middle; word-wrap: break-word;">' +
                                     '全选<input type="checkbox" id="tchkDyrbPa" />' +
                                    '</td>';
                }
                else
                {
                    oneColumn = '<td style="width: 300px; text-align: center; vertical-align: middle; word-wrap: break-word;">' +
                                        '<input type="checkbox"  id="tchkDyrbP' + i + '"/>' +
                                    '</td>';
                }

                thisLineHtml = thisLineHtml + oneColumn;
            }
            thisLineHtml = thisLineHtml + '</tr>';
            return thisLineHtml;
        }

        function generateOneLineHtml(oneLineData)
        {
            var thisLineHtml = '<tr>';
            for (var i = 0; i < oneLineData.length; i++)
            {
                var oneColumn = '<td style="width: 300px; text-align: center; vertical-align: middle; word-wrap: break-word;">' +
                                oneLineData[i] +
                                '</td>';
                thisLineHtml = thisLineHtml + oneColumn;
            }
            thisLineHtml = thisLineHtml + '</tr>';
            return thisLineHtml;
        }




        //$table = $('#tbyDyrb').bootstrapTable({ halign: "center", align: "center", valign: "middle"});
        //$table.bootstrapTable('load', dyrb_data);


        for (var i = 0; i < guolu_data.length; i++)
        {
            $('#tbyGuolu').append(generateOneLineHtml(guolu_data[i]));
        }



        $('#chkDyrbPa').on('click', function ()
        {
            if (chkDyrbPa.checked == true) {
                chkDyrbP1.checked = true;
                chkDyrbP2.checked = true;
                chkDyrbP3.checked = true;
                chkDyrbP4.checked = true;
                chkDyrbP5.checked = true;
                chkDyrbP6.checked = true;
                chkDyrbP7.checked = true;
                chkDyrbP8.checked = true;
                chkDyrbP9.checked = true;
                chkDyrbP10.checked = true;
                chkDyrbP11.checked = true;
                chkDyrbP12.checked = true;
                chkDyrbP13.checked = true;
                chkDyrbP14.checked = true;
                chkDyrbP15.checked = true;
                chkDyrbP16.checked = true;
            }
            else {
                chkDyrbP1.checked = false;
                chkDyrbP2.checked = false;
                chkDyrbP3.checked = false;
                chkDyrbP4.checked = false;
                chkDyrbP5.checked = false;
                chkDyrbP6.checked = false;
                chkDyrbP7.checked = false;
                chkDyrbP8.checked = false;
                chkDyrbP9.checked = false;
                chkDyrbP10.checked = false;
                chkDyrbP11.checked = false;
                chkDyrbP12.checked = false;
                chkDyrbP13.checked = false;
                chkDyrbP14.checked = false;
                chkDyrbP15.checked = false;
                chkDyrbP16.checked = false;
            }
        })


        //点击查看图表按钮
        $('#btnPopChart').on('click', function () {
            resetCharts();
            $('#myModal-dyrb').modal();
        });


        //渲染charts
        function resetCharts(){
                var selectParameterIndexes = new Array();
            var selectParameters = new Array();
            if (chkDyrbP1.checked == true)
            {
                selectParameterIndexes.push(1);
                selectParameters.push("P1");
            }
            if (chkDyrbP2.checked == true) {
                selectParameterIndexes.push(2);
                selectParameters.push("P2");
            }
            if (chkDyrbP3.checked == true) {
                selectParameterIndexes.push(3);
                selectParameters.push("P3");
            }
            if (chkDyrbP4.checked == true) {
                selectParameterIndexes.push(4);
                selectParameters.push("P4");
            }
            if (chkDyrbP5.checked == true) {
                selectParameterIndexes.push(5);
                selectParameters.push("P5");
            }
            if (chkDyrbP6.checked == true) {
                selectParameterIndexes.push(6);
                selectParameters.push("P6");
            }
            if (chkDyrbP7.checked == true) {
                selectParameterIndexes.push(7);
                selectParameters.push("P7");
            }
            if (chkDyrbP8.checked == true) {
                selectParameterIndexes.push(8);
                selectParameters.push("P8");
            }
            if (chkDyrbP9.checked == true) {
                selectParameterIndexes.push(9);
                selectParameters.push("P9");
            }
            if (chkDyrbP10.checked == true) {
                selectParameterIndexes.push(10);
                selectParameters.push("P10");
            }
            if (chkDyrbP11.checked == true) {
                selectParameterIndexes.push(11);
                selectParameters.push("P11");
            }
            if (chkDyrbP12.checked == true) {
                selectParameterIndexes.push(12);
                selectParameters.push("P12");
            }
            if (chkDyrbP13.checked == true) {
                selectParameterIndexes.push(13);
                selectParameters.push("P13");
            }
            if (chkDyrbP14.checked == true) {
                selectParameterIndexes.push(14);
                selectParameters.push("P14");
            }
            if (chkDyrbP15.checked == true) {
                selectParameterIndexes.push(15);
                selectParameters.push("P15");
            }
            if (chkDyrbP16.checked == true) {
                selectParameterIndexes.push(16);
                selectParameters.push("P16");
            }

            var xlabels = new Array();
            //Json方式
            for (var i = 0; i < dyrb_data.length; i++) {
                xlabels.push(dyrb_data[i].date);
            }

            $('#hc_dyrb').highcharts({                         //#container
                //chart: {
                //    zoomType: 'xy'
                //},
                title: {
                    text: '地源热泵运行记录表'
                },
                subtitle: {
                    //text: 'Source: WorldClimate.com'
                },
                xAxis: [{
                    //type: 'datetime',
                    categories: xlabels
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 80,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                }
                
            }
            );

            var dyrb_chart = $('#hc_dyrb').highcharts();

            for (var i = 0; i < selectParameterIndexes.length; i++)
            {
                  
                var thisSeriesData = new Array();
                //原始数据采用Json方式
                for (var j = 0; j < dyrb_data.length; j++) {
                    if(selectParameters[i]=="P1")
                        thisSeriesData.push(dyrb_data[j].P1);
                    else if(selectParameters[i]=="P2")
                        thisSeriesData.push(dyrb_data[j].P2);
                    else if (selectParameters[i] == "P3")
                        thisSeriesData.push(dyrb_data[j].P3);
                    else if (selectParameters[i] == "P4")
                        thisSeriesData.push(dyrb_data[j].P4);
                    else if (selectParameters[i] == "P5")
                        thisSeriesData.push(dyrb_data[j].P5);
                    else if (selectParameters[i] == "P6")
                        thisSeriesData.push(dyrb_data[j].P6);
                    else if (selectParameters[i] == "P7")
                        thisSeriesData.push(dyrb_data[j].P7);
                    else if (selectParameters[i] == "P8")
                        thisSeriesData.push(dyrb_data[j].P8);
                    else if (selectParameters[i] == "P9")
                        thisSeriesData.push(dyrb_data[j].P9);
                    else if (selectParameters[i] == "P10")
                        thisSeriesData.push(dyrb_data[j].P10);
                    else if (selectParameters[i] == "P11")
                        thisSeriesData.push(dyrb_data[j].P11);
                    else if (selectParameters[i] == "P12")
                        thisSeriesData.push(dyrb_data[j].P12);
                    else if (selectParameters[i] == "P13")
                        thisSeriesData.push(dyrb_data[j].P13);
                    else if (selectParameters[i] == "P14")
                        thisSeriesData.push(dyrb_data[j].P14);
                    else if (selectParameters[i] == "P15")
                        thisSeriesData.push(dyrb_data[j].P15);
                    else if (selectParameters[i] == "P16")
                        thisSeriesData.push(dyrb_data[j].P16);

                }

                dyrb_chart.addAxis({
                    title: {
                        text: dyrb_Parameter[selectParameterIndexes[i]-1].name,
                        style: {
                            color: dyrb_Parameter[selectParameterIndexes[i]-1].color
                        }
                    },
                    labels: {
                        formatter: function () {
                            return this.value + dyrb_Parameter[selectParameterIndexes[i]-1].unit;
                        },
                        style: {
                            color: dyrb_Parameter[selectParameterIndexes[i]-1].color
                        }
                    },
                    opposite: true

                }, false, true, true);

                dyrb_chart.addSeries(
                    {
                        name: dyrb_Parameter[selectParameterIndexes[i]-1].name,
                        color: dyrb_Parameter[selectParameterIndexes[i]-1].color,
                        type: 'spline',
                        yAxis: i,
                        data: thisSeriesData,
                        tooltip: {
                            valueSuffix: dyrb_Parameter[selectParameterIndexes[i]-1].unit
                        }
                    }
                );
            }
        }














 function resetChartsForExport(){
                var selectParameterIndexes = new Array();
            var selectParameters = new Array();
            if (chkDyrbP1.checked == true)
            {
                selectParameterIndexes.push(1);
                selectParameters.push("P1");
            }
            if (chkDyrbP2.checked == true) {
                selectParameterIndexes.push(2);
                selectParameters.push("P2");
            }
            if (chkDyrbP3.checked == true) {
                selectParameterIndexes.push(3);
                selectParameters.push("P3");
            }
            if (chkDyrbP4.checked == true) {
                selectParameterIndexes.push(4);
                selectParameters.push("P4");
            }
            if (chkDyrbP5.checked == true) {
                selectParameterIndexes.push(5);
                selectParameters.push("P5");
            }
            if (chkDyrbP6.checked == true) {
                selectParameterIndexes.push(6);
                selectParameters.push("P6");
            }
            if (chkDyrbP7.checked == true) {
                selectParameterIndexes.push(7);
                selectParameters.push("P7");
            }
            if (chkDyrbP8.checked == true) {
                selectParameterIndexes.push(8);
                selectParameters.push("P8");
            }
            if (chkDyrbP9.checked == true) {
                selectParameterIndexes.push(9);
                selectParameters.push("P9");
            }
            if (chkDyrbP10.checked == true) {
                selectParameterIndexes.push(10);
                selectParameters.push("P10");
            }
            if (chkDyrbP11.checked == true) {
                selectParameterIndexes.push(11);
                selectParameters.push("P11");
            }
            if (chkDyrbP12.checked == true) {
                selectParameterIndexes.push(12);
                selectParameters.push("P12");
            }
            if (chkDyrbP13.checked == true) {
                selectParameterIndexes.push(13);
                selectParameters.push("P13");
            }
            if (chkDyrbP14.checked == true) {
                selectParameterIndexes.push(14);
                selectParameters.push("P14");
            }
            if (chkDyrbP15.checked == true) {
                selectParameterIndexes.push(15);
                selectParameters.push("P15");
            }
            if (chkDyrbP16.checked == true) {
                selectParameterIndexes.push(16);
                selectParameters.push("P16");
            }

            var xlabels = new Array();
            //Json方式
            for (var i = 0; i < dyrb_data.length; i++) {
                xlabels.push(dyrb_data[i].date);
            }

            $('#hc_dyrb').highcharts({                         //#container
                chart: {  
                    //renderTo:'exporttmp',//目标容器  其实这里是不显示的
                    type: 'bar',
                    events: {
                        load: function () {
                            var ch = this;
                            setTimeout(function(){
                                ch.exportChart();
                            },5);
                        }
                    }
                }, 
                title: {
                    text: '地源热泵运行记录表'
                },
                subtitle: {
                    //text: 'Source: WorldClimate.com'
                },
                xAxis: [{
                    //type: 'datetime',
                    categories: xlabels
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 80,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                exporting:{
                    url: '/user/exportChartPic'
                }
                
            }
            );

            var dyrb_chart = $('#hc_dyrb').highcharts();

            for (var i = 0; i < selectParameterIndexes.length; i++)
            {
                  
                var thisSeriesData = new Array();
                //原始数据采用Json方式
                for (var j = 0; j < dyrb_data.length; j++) {
                    if(selectParameters[i]=="P1")
                        thisSeriesData.push(dyrb_data[j].P1);
                    else if(selectParameters[i]=="P2")
                        thisSeriesData.push(dyrb_data[j].P2);
                    else if (selectParameters[i] == "P3")
                        thisSeriesData.push(dyrb_data[j].P3);
                    else if (selectParameters[i] == "P4")
                        thisSeriesData.push(dyrb_data[j].P4);
                    else if (selectParameters[i] == "P5")
                        thisSeriesData.push(dyrb_data[j].P5);
                    else if (selectParameters[i] == "P6")
                        thisSeriesData.push(dyrb_data[j].P6);
                    else if (selectParameters[i] == "P7")
                        thisSeriesData.push(dyrb_data[j].P7);
                    else if (selectParameters[i] == "P8")
                        thisSeriesData.push(dyrb_data[j].P8);
                    else if (selectParameters[i] == "P9")
                        thisSeriesData.push(dyrb_data[j].P9);
                    else if (selectParameters[i] == "P10")
                        thisSeriesData.push(dyrb_data[j].P10);
                    else if (selectParameters[i] == "P11")
                        thisSeriesData.push(dyrb_data[j].P11);
                    else if (selectParameters[i] == "P12")
                        thisSeriesData.push(dyrb_data[j].P12);
                    else if (selectParameters[i] == "P13")
                        thisSeriesData.push(dyrb_data[j].P13);
                    else if (selectParameters[i] == "P14")
                        thisSeriesData.push(dyrb_data[j].P14);
                    else if (selectParameters[i] == "P15")
                        thisSeriesData.push(dyrb_data[j].P15);
                    else if (selectParameters[i] == "P16")
                        thisSeriesData.push(dyrb_data[j].P16);

                }

                dyrb_chart.addAxis({
                    title: {
                        text: dyrb_Parameter[selectParameterIndexes[i]-1].name,
                        style: {
                            color: dyrb_Parameter[selectParameterIndexes[i]-1].color
                        }
                    },
                    labels: {
                        formatter: function () {
                            return this.value + dyrb_Parameter[selectParameterIndexes[i]-1].unit;
                        },
                        style: {
                            color: dyrb_Parameter[selectParameterIndexes[i]-1].color
                        }
                    },
                    opposite: true

                }, false, true, true);

                dyrb_chart.addSeries(
                    {
                        name: dyrb_Parameter[selectParameterIndexes[i]-1].name,
                        color: dyrb_Parameter[selectParameterIndexes[i]-1].color,
                        type: 'spline',
                        yAxis: i,
                        data: thisSeriesData,
                        tooltip: {
                            valueSuffix: dyrb_Parameter[selectParameterIndexes[i]-1].unit
                        }
                    }
                );
            }
        }





















    }());   

});
