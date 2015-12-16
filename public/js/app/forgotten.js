define(function(require){
    var $ = require('jquery'),
    	api = require('app/getApi');
    $(function(){
    	
    	//验证码
    	var sjyzm="";  
    	createCode();
		function createCode() {
		  sjyzm = "";
		  var codeLength = 5;//验证码的长度  
		  var checkCode = document.getElementById("checkCode");
		  var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');  
		  
		  for (var i = 0; i < codeLength; i++) {
		    var charIndex = Math.floor(Math.random() * 36);
		    sjyzm += selectChar[charIndex];
		  }
		  if (checkCode) {
		    checkCode.value = sjyzm;
		  }
		}
		$("#shuaxin").click(function(){
			createCode();
		})
		
		function validate() {
		  var inputCode = $("#pwd").val();
		  if (inputCode.length <= 0) {
		    alert("请输入验证码！");
		    return false;//equalsIgnoreCase(sjyzm)
		  } else if (inputCode.toLowerCase() !=sjyzm.toLowerCase()) {
		    alert("验证码输入错误！");
		  	createCode();//刷新验证码
		  	return false;
		  } else {
		  	return true;
		  }
		}
    	
    	var userName = "";
    	var email = "";	
    	//下一步
		$(".next_1").click(function() {
			if(validate()){
				getNameAndEmi();
			}
		});
		//得到用户名
		function getNameAndEmi(){
			userName = $.trim($("#name").val());
			demand.start({
				url: '/api/forget/getUname.json',
				data: {
					userName: userName
				},
				done: function(data){
					//console.log(data);
					if (data.status.data.message == true) {
						$(".spanUserName").html(userName);
						$("#one_div").css("display","none");
						$("#two_div").css("display","block");
						email=data.status.data.email;
					}else{
						alert(data.status.data.message);
					}
				}
			})
		}

		//发送邮件
		$("#yzm1").click(function() {
			var newEmail = $.trim($("#elems").val());
			if(newEmail == email){
				demand.start({
					url: '/api/emailInfo/sendEmail.json',
					data: {
						userName: userName,
						email: newEmail
					},
					done: function(data){
						//console.log(data);
						$("#shouTextTrue").css("display","block");
					}
				})
			}else{
				alert("绑定邮箱输入错误！");
			}
		});	
		
		//检查验证码
		var mid = "";
		$(".next_2").click(function() {
			var codeEmail = $.trim($("#emailCode").val());
			demand.start({
				url: '/api/forget/checkCode.json',
				data: {
					userName: userName,
					code: codeEmail
				},
				done: function(data){
					//console.log(data);
					if(data.status.data == "输入的验证码无效！"){
						alert(data.status.data);
					}else{
						$("#one_div").css("display","none");
						$("#two_div").css("display","none");
						$("#three_div").css("display","block");
						mid = data.status.data.id;
					}
				}
			})
		});		

		
		//修改密码
		$(".next_3").click(function() {
			var rpwd = $.trim($("#newpwd").val());
			var pwd = $.trim($("#newpwd_true").val());
			if(rpwd == pwd){
				updatePwd(pwd);
			}else{
				alert("两次密码输入不一致!");
			}
			
		});	
		function updatePwd(pass){
			demand.start({
				url: '/api/forget/updatePwd.json',
				data: {
					username: userName,
					password: pass,
					mid: mid
				},
				done: function(data){
					console.log(data);
					$("#three_div").css("display","none");
					$("#four_div").css("display","block");
				}
			})
		}
			
        
    });
});
