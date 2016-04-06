function checkInput() {
	var input = document.getElementById("input");
	var value = input.value;
	var alertText = document.getElementById("alertText");
	console.log(value);
	var trimReg = /^\s+|\s+$/g;                          //去除首尾空格
    var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g; //查找中文字符
	var lenReg = /^.{4,16}$/;                            //查找4~16个单字符
	value = value.replace(trimReg,"").replace(chineseReg,"ha");//原始输入去除首尾空格，将中文字符长度转换为2

	if(value==null||value=="") {
		alertText.innerHTML = "姓名不能为空";
		alertText.style.color = "red";
		input.style.borderColor = "red";
	} else if (!lenReg.test(value)) {
		alertText.innerHTML = "长度需为4~16个字符";
		alertText.style.color = "red";
		input.style.borderColor = "red";
	} else {
		alertText.innerHTML = "名称格式正确";
		alertText.style.color = "green";
		input.style.borderColor = "green";
	}

}
function initBtnSelect() {
	var sub = document.getElementById("submit");
	sub.onclick  = function() {
		checkInput();
	}
}
function init() {
	initBtnSelect();
}
window.onload = function() {
	init();
}