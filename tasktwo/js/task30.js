function checkOutName(e) {
	var value = e.value;
	var alertText = e.parentElement.nextElementSibling;
	console.log(alertText);
	var trimReg = /^\s+|\s+$/g;                          //去除首尾空格
    var chineseReg = /[\u4e00-\u9fa5]/g;                 //查找中文字符
	var lenReg = /^.{4,16}$/;                            //查找4~16个单字符
	value = value.replace(trimReg,"").replace(chineseReg,"ha");//原始输入去除首尾空格，将中文字符长度转换为2

	if(value==null||value=="") {
		alertText.innerHTML = "姓名不能为空";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else if (!lenReg.test(value)) {
		alertText.innerHTML = "长度需为4~16个字符";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else {
		alertText.innerHTML = "名称格式正确";
		alertText.style.color = "green";
		e.style.borderColor = "green";
	}
}
function checkOutPassword(e) {
	var value = e.value;
	var alertText = e.parentElement.nextElementSibling;
	console.log(alertText);
	var trimReg = /^\s+|\s+$/g;                          //去除首尾空格
    var passwordReg = /[^0-9a-z]/gi;                     //匹配一个非英文字符
	var lenReg = /^.{6,16}$/;                            //匹配6~16个单字符
	value = value.replace(trimReg,"");                   //原始输入去除首尾空格

	if(value==null||value=="") {
		alertText.innerHTML = "密码不能为空";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else if (!lenReg.test(value)) {
		alertText.innerHTML = "长度需为6~16个字符";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else if (passwordReg.test(value)) {
		alertText.innerHTML = "密码需由英文字母组成";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else {
		alertText.innerHTML = "密码可用";
		alertText.style.color = "green";
		e.style.borderColor = "green";
	}
}
function checkOutPasswordCheck(e) {
	var value = e.value;
	var alertText = e.parentElement.nextElementSibling;
	var trimReg = /^\s+|\s+$/g;
	var bvalue = document.getElementById("password").value.replace(trimReg,"");
	if(value==null||value=="") {
		alertText.innerHTML = "密码不能为空";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else if(value === bvalue) {
		alertText.innerHTML = "密码输入一致";
		alertText.style.color = "green";
		e.style.borderColor = "green";
	} else {
		alertText.innerHTML = "密码请输入一致";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	}
}
function checkOutEmail(e) {
	var value = e.value;
	var alertText = e.parentElement.nextElementSibling;
	console.log(alertText);
	var trimReg = /^\s+|\s+$/g;                            //去除首尾空格
    var emailReg = /^[\w]+\@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i; //匹配邮箱格式
	value = value.replace(trimReg,"");                     //原始输入去除首尾空格

	if(value==null||value=="") {
		alertText.innerHTML = "邮箱不能为空";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else if (!emailReg.test(value)) {
		alertText.innerHTML = "请输入正确的邮箱格式";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	} else {
		alertText.innerHTML = "邮箱格式正确";
		alertText.style.color = "green";
		e.style.borderColor = "green";
	}
}
function checkOutPhone(e) {
	var value = e.value;
	var alertText = e.parentElement.nextElementSibling;
	var PhoneReg = /^\d{11}$/;
	 if (!PhoneReg.test(value)) {
	 	alertText.innerHTML = "请输入正确的手机号码";
		alertText.style.color = "red";
		e.style.borderColor = "red";
	 } else {
	 	alertText.innerHTML = "手机号码正确";
		alertText.style.color = "green";
		e.style.borderColor = "green";
	 }

}
function showCheckText(e) {
	var id = e.id;
	       if(id==="name") {
		checkOutName(e);
	} else if(id==="password") {
		checkOutPassword(e);
	} else if(id==="passwordCheck") {
		checkOutPasswordCheck(e);
	} else if(id==="email") {
		checkOutEmail(e);
	} else if(id==="phone") {
		checkOutPhone(e);
	} 
}
function showSubText() {
	console.log("haha");
	var input = document.getElementsByTagName("input");
	var jsq=0;
	for(var i=0;i<input.length-1;i++) {
		input[i].parentElement.nextElementSibling.style.display = "block";
		showCheckText(input[i]);
		if(input[i].style.borderColor === "green") jsq++;
	}
	if(jsq===5) alert("提交成功");
	else alert("输入有误");

}
function showFocusText(e) {
	console.log(e);
	e.parentElement.nextElementSibling.style.display = "block";
	e.style.borderColor = "blue";
}
window.onload=function() {
	var sub = document.getElementById("submit");
	var input = document.getElementsByTagName("input");
	var container = document.getElementById("container");
	sub.addEventListener('click',showSubText,false);
	container.addEventListener('focus', function(e){
       if(e.target&&e.target.nodeName.toLowerCase()=="input"&&e.target.id!="submit"){
         showFocusText(e.target);//input元素
       }
    }, true);
    container.addEventListener('blur', function(e){
       if(e.target|| e.srcElement&&e.target.nodeName.toLowerCase()=="input"){
         showCheckText(e.target);//input元素
       	}
    }, true);
    

}