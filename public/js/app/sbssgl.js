define(function(require) {
	var $ = require('jquery')
	, selectpicker = require('bootstrap-select')
    , api = require('app/getApi')
	;
	$(function(){
		//获取右侧Tree
		GetLeftTree();
		ReloadTable();
		//添加
        $("#addView").on('click',function(){
        	$("#bg1").css('display','block');
			$("#tablediv").css('display','block');	
        })
		
		//下拉选择
      $('.selectpicker').selectpicker({});
	  $("#sbshglselect").next().find("span").first().text("设备种类");
	  
    	$('.btn_coin').on('click', function() {
            $('#gytModal').modal({
                backdrop: 'static' 
            });  		
        });
		
		//左侧菜单点击事件
		$("#mymenu ul li").next("ul").hide();
		$("#mymenu ul li").click(function(){
		  $(this).next("ul").toggle();
		});		    
		$(".bt").click(function(){
			$("#mymenu").css('display','block');
		});
		    
		    
			//编辑数据点击事件
			//打开 编辑框
			$("#eidtdiv").click(function() {
				$("#bg").css('display', 'block');
				$("#tablediv").css('display', 'block');
			
			})
			
			//关闭编辑框	
			$("#closediv").click(function() {
				$("#bg").css('display', 'none');
				$("#tablediv").css('display', 'none');
			})
		    
					
			//	删除数据点击事件
			//打开删除对话框
			$("#coliseselect").click(function() {
				$("#bg1").css('display', 'block');
				$("#coliseselect").css('display', 'block');
			});
			
			//		关闭删除对话框
			$("#closedivsel").click(function() {
				$("#coliseselect").css('display', 'none');
				$("#bg1").css('display', 'none');
			});
		
		
		
		demand.start({url:'/api/instance/class.json', data:{pid:1},done:sbssgl})
		function sbssgl(data){
			console.log(data);
			var str='<option>请选择类型</option>';			
			$.each(data.status.data.list,function(i,v){
                str +='<option>'+v.classname+'</option>';
            });
            console.log(str);
			$("#sbshglselect").empty().append(str).selectpicker('refresh');
		}
		
	});	
});

//加载Table
function ReloadTable()
{
	demand.start(
		{
			url:'/api/instance/right.json', 
			data:{
				pid:"1",
				page:"1",
				clazz:"",
				keyword:"",
			},
			done:function(data){
				var str="";
				$.each(data.status.data.pager.datas,function(i,v){
				    str += '<tr class="ollclass_'+v[0]+'">';
				    str	+= '<td>'+v[2]+'</td>'
					str	+= '<td>'+v[3]+'</td>'
					str	+= '<td>'+v[5]+'</td>'
					str	+= '<td><span><img src="<img src="/img/bzlgl/下载.png" class="class_img"/></span></td>'
					str	+= '<td>'+v[7]+'</td>'
					str	+= '<td><img class="dd" data-classpropertyid="'+v[0]+'" src="/img/lsxgl/write.png"/><img class="slcolds" src="/img/lsxgl/sz.png"/></td>'
					str	+= '</tr>';
				});
				$("#resultBody").empty().append(str);
				$("#resultBody tr:even").addClass("even");  
				$("#resultBody tr:odd").addClass("odd"); 
			console.info("数据列表显示:");
			console.info(data);
		}});
}

//获取右侧Tree
function GetLeftTree()
{
	demand.start({url:'/api/accessInfo/tree.json', data:null,done:function(data){
		console.info("Tree");
		console.info(data);
		var tempStr="<div class='uldiv'>";
		
		if(data.projectTreeVoList.length>0)
		{
			$.each(data.projectTreeVoList,function(i,item1){
				var tempUl="<ul class='one'>";
				 tempUl+="<li><span><img src='/img/sbssgl/未标题-1.png' class='img_eld'></span><a href='#' id='"+item1.id+"' onclick='UnloadProject();'>"+item1.name+"</a></li>";
				if(item1.children.length>0)
				{
					tempUl+=GetSecondLevel2(item1.children);
				}
				tempUl+="</ul>";
				tempStr+=tempUl;
			});
			
		}
		tempStr+="</div>";
	
		$("#mymenu").html(tempStr);
		
	}});
}

//获取Tree的第二层
function GetSecondLevel2(children)
{
	var tempUl="<ul>";
	$.each(children,function(j,item2){
		tempUl+="<li><span><img src='/img/sbssgl/让退.png' class='img_eld'></span><a href='#' id='"+item2.id+"' onclick='loadProject(this);'>"+item2.name+"</a></li>";
		
		if(item2.children.length>0)
		{
			var tempU2="<li>";
			tempU2+=GetSecondLeve3(item2.children);
			tempU2+="</li>";
			tempUl+=tempU2;
		}
	});
	tempUl+="</ul>";
	return tempUl;
}

//获取Tree的第三层
function GetSecondLeve3(children)
{
	var tempUl="<ul>";
	$.each(children,function(m,item3){
		var tempFiledName="";
		if(item3.name.length>5)
		{
			tempFiledName=item3.name.substring(0,4)+"...";
		}
		else
		{
			tempFiledName=item3.name;
		}
		
		tempUl+="<li><span><img src='/img/sbssgl/tb3.png' class='img_eld'></span><a href='#' id='"+item3.id+"' onclick='loadProject(this);' title='"+item3.name+"'>"+tempFiledName+"</a></li>";
	});
	tempUl+="</ul>";
	return tempUl;
}

function UnloadProject()
{
	$("#sbshglselect").html("");
	$("#sbshglselect").next().find("ul").html("");
	$("#sbshglselect").next().find("span").first().text("设备种类");
}

function loadProject(obj)
{
	//alert($(obj).attr("id"));
	demand.start({url:'/api/clzMng/page.json',done:function(data){
		var str = '<option value="">设备种类</option>';
        $("#edittype,#sbshglselect").empty().append(str).selectpicker('refresh');
        str = '';
		$.each(data.status.data.classList,function(i,v){
			str +='<option value="'+v.classid+'">'+v.classname+'</option>';
		});
		
		$("#edittype,#sbshglselect").empty().append(str).selectpicker('refresh');
	}});
}
