var data = [];
var onsort;
function sort() {
	window.clearInterval(onsort);
	var j = data.length-1,i=0;
	var boxesDiv = document.getElementsByClassName("boxes");
	console.log(boxesDiv.length);
	onsort = setInterval(function() {
			if(data.length==0) return false;
			if(j<i+1) {
				j = data.length-1;
				i++;
			}
			if(i>=data.length-1) {
				return false;
			}
			boxesDiv[j].style.backgroundColor = "#84958B";
			boxesDiv[j-1].style.backgroundColor = "#84958B";

			setTimeout(function() {
				boxesDiv[j].style.backgroundColor = "#65EBA3";
			    boxesDiv[j+1].style.backgroundColor = "#65EBA3";
			},160);
			var num1 = data[j-1];
			var num2 = data[j];
			if(num1<num2) {
				data[j-1] = num2;
				data[j] = num1;
				boxesDiv[j-1].style.height = 4*num2+"px";
				boxesDiv[j].style.height = 4*num1+"px";
			
				boxesDiv[j-1].getElementsByTagName("span")[0].innerHTML=data[j-1];
				boxesDiv[j].getElementsByTagName("span")[0].innerHTML=data[j];
	    	}
	    	j--;
	    	console.log(i,j);
    	},300);
}
//元素从队列中删除
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
//元素加入队列
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
}
function trim(str){ //删除左右两端的空格
	return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}
//效验输入事件
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
//随机生成30组数据
function randomNums() {
	window.clearInterval(onsort);//取消sort
	var queue = document.getElementById("queue");
	var boxesDiv = queue.getElementsByTagName("div");
	var len=boxesDiv.length;
	for(var i=0;i<len;i++) {     //删除原队列
		queue.removeChild(boxesDiv[0]);
	}
	data =[];                    //清空记录队列的数组
	for(var i=0;i<30;i++) {      //随机生成队列
		var num = Math.floor(Math.random()*90)+10;
		addDiv(num,document.getElementsByTagName("button")[1]);
	}
}
//点击事件
function initBtnSelect() {
	var btn = document.getElementsByTagName("button");
	for(var i=0;i<btn.length-1;i++) {
		btn[i].onclick = function() {
			window.clearInterval(onsort);//取消sort
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