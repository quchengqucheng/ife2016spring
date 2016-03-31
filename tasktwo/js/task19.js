//点击事件 t
     //效验输入事件(正则)
//判断点击的哪个按钮
     //输入正确 渲染队列
//加载事件
var data = [];
var jsq=1;
function sort() {
	var boxesDiv = document.getElementsByClassName("boxes");
	console.log(boxesDiv.length);
	for(var i=0;i<(data.length-1);i++) {
		for(var j=data.length-1;j>=i+1;j--) {
			console.log(j-1,j);
			var num1 = data[j-1];
			var num2 = data[j];
			if(num1<num2) {
				data[j-1] = num2;
				data[j] = num1;
				boxesDiv[j-1].style.height = 4*num2+"px";
				boxesDiv[j].style.height = 4*num1+"px";
				// boxesDiv[j-1].setAttribute("height",4*num2+"px");
				// boxesDiv[j].setAttribute("height",4*num1+"px");
				// console.log(num1,num2);
				boxesDiv[j-1].getElementsByTagName("span")[0].innerHTML=data[j-1];
				boxesDiv[j].getElementsByTagName("span")[0].innerHTML=data[j];
	    	}
    	}
	}
}
// function popUpText(btnText,num) {
// 	var popUp = document.getElementById("popUp");
// 	var p = document.createElement("p");
// 	var ptext = document.createTextNode("Step"+jsq+": "+btnText+" "+num);
// 	jsq++;
// 	p.appendChild(ptext);
// 	popUp.appendChild(p);
// }
function delDiv(btn) {
	var alertText = document.getElementById("alertText");
	var num;
	if(btn.innerHTML == "右侧出") {
		var boxesDiv = document.getElementsByClassName("boxes");
		if(boxesDiv.length<=0) {
			alertText.innerHTML = "队列已空，请加入新的数字";
			return false;
		}
		data.pop();
		var lastDiv = boxesDiv[boxesDiv.length-1];
		queue.removeChild(lastDiv);
		num = lastDiv.getElementsByTagName("span")[0].innerHTML;
	} else if(btn.innerHTML == "左侧出") {
		var boxesDiv = document.getElementsByClassName("boxes");
		if(boxesDiv.length<=0) {
			alertText.innerHTML = "队列已空，请加入新的数字";
			return false;
		}
		data.shift();
		var firstDiv = boxesDiv[0];
		queue.removeChild(firstDiv);
		num = firstDiv.getElementsByTagName("span")[0].innerHTML;
	}
	alertText.innerHTML = "";
	document.getElementById("input-text").value = "";
	console.log(data);
	// popUpText(btn.innerHTML,num);
}
function addDiv(input,btn) {
	var queue = document.getElementById("queue");
	var div = document.createElement("div");
	div.style.height = 4*input+"px";
	div.setAttribute("class","boxes");
	var span = document.createElement("span");
	span.innerHTML = input;
	div.appendChild(span);
	console.log(btn.innerHTML);
	var alertText = document.getElementById("alertText");
	var num;
	if(btn.innerHTML == "右侧入") {
		data.push(input);
		queue.appendChild(div);
		num = input;
	} else if(btn.innerHTML == "左侧入") {
		data.unshift(input);
		var firstDiv = document.getElementsByClassName("boxes")[0];
		queue.insertBefore(div,firstDiv);
		num = input;
		//当queue元素没有首节点时，firstDiv 返回 null。
        //该元素仍然会被插入到父元素中，位于最后一个节点后面。
        //又由于父元素没有第一个子节点，也没有最后一个子节点。 最终，新元素成为唯一的子元素。
	}
	alertText.innerHTML = "";
	document.getElementById("input-text").value = "";//加入新的数字后，清空输入框
	console.log(data);
	// popUpText(btn.innerHTML,num);
}
function trim(str){ //删除左右两端的空格
	return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}
function checkInput(btn) {
	var input = document.getElementById("input-text").value;
	console.log(input);
	console.log(trim(input));
	input = trim(input);
	if(btn.innerHTML == "右侧出"||btn.innerHTML == "左侧出") {
		delDiv(btn);
		return false;
	}
	var alertText = document.getElementById("alertText");
	if(!input) {
    	alertText.innerHTML = "输入不能为空";
    	return false;
    }
    var find = input.search(/\D/);
    if(find>=0) {
    	alertText.innerHTML = "输入不能包含除数字外的其它字符";
    	return false;
    }
    if(!(parseInt(input)<=100&&parseInt(input)>=10)) {
    	alertText.innerHTML = "输入数字需在10-100之间";
    	return false;
    }
    alertText.innerHTML = "";
    addDiv(input,btn);
}
function randomNums() {
	var queue = document.getElementById("queue");
	var boxesDiv = queue.getElementsByTagName("div");
	// if(boxesDiv.length>0) queue.removeChild(boxesDiv);
	console.log(boxesDiv.length);
	var len=boxesDiv.length;
	for(var i=0;i<len;i++) {
		console.log(boxesDiv.length);
		queue.removeChild(boxesDiv[0]);
	}
	data =[];
	for(var i=0;i<30;i++) {
		var num = Math.floor(Math.random()*90)+10;
		// num =""+num;
		//data.push(num);
		addDiv(num,document.getElementsByTagName("button")[1]);
	}
}
//点击事件
function initBtnSelect() {
	var btn = document.getElementsByTagName("button");
	for(var i=0;i<btn.length-1;i++) {
		btn[i].onclick = function() {
			checkInput(this);
		}
	}
	btn[4].onclick = function() {
		console.log("sort");
		sort();
	}
	btn[5].onclick = function() {
		randomNums();
	}
}
//加载事件
function init() {
	initBtnSelect();
}
window.onload = function() {
	init();
}