//除去input输入文字的首尾空格
function trim(e) {
	var trimReg = /^\s+|\s+$/g;
	return e.value.replace(trimReg,"");
}
//校验后表格样式
function checkOutChange(e,innerText,color) {
	var alertText = e.parentElement.nextElementSibling;
	alertText.innerHTML = innerText;
	alertText.style.color = color;
	e.style.borderColor = color;
}
//校验名称
function checkOutName(e) {
    var chineseReg = /[\u4e00-\u9fa5]/g;                 //查找中文字符
	var lenReg = /^.{4,16}$/;                            //查找4~16个单字符
	var value = trim(e).replace(chineseReg,"ha");        //原始输入去除首尾空格，将中文字符长度转换为2

	if(value==null||value=="") {
		checkOutChange(e,"姓名不能为空","red");
	} else if (!lenReg.test(value)) {
		checkOutChange(e,"长度需为4~16个字符","red");
	} else {
		checkOutChange(e,"名称格式正确","green");
	}
}
//校验密码
function checkOutPassword(e) {                          //去除首尾空格
    var passwordReg = /[^0-9a-z]/gi;                     //匹配一个非英文字符
	var lenReg = /^.{6,16}$/;                            //匹配6~16个单字符
	var value = trim(e);                                 //原始输入去除首尾空格

	if(value==null||value=="") {
		checkOutChange(e,"密码不能为空","red");
	} else if (!lenReg.test(value)) {
		checkOutChange(e,"长度需为6~16个字符","red");
	} else if (passwordReg.test(value)) {
		checkOutChange(e,"密码需由英文字母组成","red");
	} else {
		checkOutChange(e,"密码可用","green");
	}
}
//确认密码
function checkOutPasswordCheck(e) {
	var trimReg = /^\s+|\s+$/g;
	var value = trim(e); 
	var bvalue = document.getElementById("password").value.replace(trimReg,"");
	if(value==null||value=="") {
		checkOutChange(e,"密码不能为空","red");
	} else if(value === bvalue) {
		checkOutChange(e,"密码输入一致","green");
	} else {
		checkOutChange(e,"密码请输入一致","red");
	}
}
//校验邮箱
function checkOutEmail(e) {                            //去除首尾空格
    var emailReg = /^[\w]+\@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i; //匹配邮箱格式
	var value = trim(e);                                   //原始输入去除首尾空格

	if(value==null||value=="") {
		checkOutChange(e,"邮箱不能为空","red");
	} else if (!emailReg.test(value)) {
		checkOutChange(e,"请输入正确的邮箱格式","red");
	} else {
		checkOutChange(e,"邮箱格式正确","green");green
	}
}
//校验电话号码
function checkOutPhone(e) {
	var PhoneReg = /^\d{11}$/;
	var value = trim(e); 
	 if (!PhoneReg.test(value)) {
	 	checkOutChange(e,"请输入正确的手机号码","red");
	 } else {
	 	checkOutChange(e,"手机号码正确","green");
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