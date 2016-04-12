var traverse = [];// 储存创建的node节点
var queue = [];   // 储存遍历的div节点
var search = [];  // 储存搜索到div节点
var showdiv;
// 多叉树结点的构造函数
function Node(data,text,amount,childNode) {
	this.data = data; 		   // 存放当前结点
	this.text = text;		   // 节点名称
	this.amount= amount;       // 子孩子个数
	this.childNode =[];   	   // 子孩子结点
}
// 创建多叉树
function createTree(num,text,childNum) {
	var root= new Node(num[0],text[0],childNum[0],null);
	traverse.push(root);
	for(var i=1;i<num.length;i++) {
		var node = new Node(num[i],text[i],childNum[i],null);
		function addTree(node) {
			if(traverse.length!==0) {
				var parent = traverse[0];
				if(parent.amount!==0) {
					 console.log(parent.data,node.data);
					parent.amount--;
					parent.childNode.push(node);
				} 
				if(parent.amount === 0) {
					traverse.shift();
				} 
				traverse.push(node);
			}
		}
		addTree(node);
	}
	var root2 =root;
	console.log(root2);

	return root;
}
// 渲染多叉树
function renderTree(rt,parentDiv) {
	if(rt!=null) {
		// rt.data = parentDiv;
		var childDiv = document.createElement("div");
		childDiv.setAttribute("class","child");
		childDiv.innerHTML = rt.text;
		childDiv.value = rt.text;
		rt.data = childDiv;
		parentDiv.appendChild(childDiv);
		for(var i=0;i<rt.childNode.length;i++) {
			renderTree(rt.childNode[i],childDiv);
		}
	}
}
//停止遍历、搜索
function clearAll() {
	//已搜索到的元素恢复为原样式
	function cleanShow(search) {
		while(search.length>0) {
			search.shift().id ="";
		}
	}
	clearInterval(showdiv);
 	queue = [];
 	cleanShow(search);
}
// 遍历过程中展示正在遍历的元素
function show(queue,value) {
	var count = 0;
	console.log(typeof(value));
	showdiv = setInterval(function() {
		if(queue.length>0) {
			var div = queue.shift();
			 console.log(typeof(div.value));
			div.setAttribute("id","show");
			search.push(div);
		}
		else {
			clearInterval(showdiv);//队列为空，取消用setInterval设置的重复定时任务
			if(value!==null) {
				if(count===0) noteText("没有查询到元素","green");
            	else noteText("查询到"+count+"个元素","green");
			}
			return;
		}
		if(value!==null&&div.value.toString() === value) {//搜索到元素
			setTimeout(function(){
				div.id ="highlight";
			},300);
			count++;
		}
		else setTimeout(function() {//恢复元素原样式
			div.id ="";
		},300);
	},300);
	// if(showdiv) noteText("查询完毕"+count+"个","green");
}
// 先序遍历
function preOrder(rt) {
	if(rt!==null) {
		queue.push(rt.data);
		for(var i=0;i<rt.childNode.length;i++) {
			preOrder(rt.childNode[i]);
		}
	}
	return queue;
}
// 后序遍历
function postOrder(rt) {
	if(rt!==null) {
		for(var i=0;i<rt.childNode.length;i++) {
			postOrder(rt.childNode[i]);
		}
		queue.push(rt.data);
	}
	return queue;
}
function initTree() {
	var num =      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];//多叉树节点
	var text = 	   [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];//多叉树名字
	var childNum = [3,3,2,2,2,2,2,0,0, 0, 0, 0, 0, 0, 0];//子节点个数
	var rt = createTree(num,text,childNum);//同时执行吗？
	renderTree(rt,$("root"));//同时执行吗？
	console.log(rt);

	// var prebtn  = $("preOrder");
	// var postbtn = $("postOrder");
	// var preSearchbtn = $("preSearch");
	// var postSearchbtn = $("postSearch");
	// var inputText = $("inputText");

	$("preOrder").addEventListener('click',function(){
		clearAll();
		show(preOrder(rt),null);
	} ,false);
	$("postOrder").addEventListener('click',function(){
		clearAll();
		show(postOrder(rt),null);
	},false); 

	$("preSearch").addEventListener('click',function(){
		var value = checkInputText($("inputText"));
		if(value!==null&&value!=="") {
			noteText("正在查询","green");
			clearAll();
			show(preOrder(rt),value);
		}
		else noteText("查询不能为空","red");
	},false);
	$("postSearch").addEventListener('click',function(){
		var value = checkInputText($("inputText"));
		if(value!==null&&value!=="") {
			noteText("正在查询","green");
			clearAll();
			show(postOrder(rt),value);
		}
		else noteText("查询不能为空","red");
	},false);

	
	$("inputText").addEventListener('focus', function(){
         noteText("请输入查询元素","#000");
    }, true);
    $("inputText").addEventListener('blur',function(){
    	checkInputText(this)
    }, true);
}
function $(id) {
    return document.getElementById(id);
}
function noteText(innerText,color) {
	var alertText = document.getElementById("alertText");
	alertText.innerHTML = innerText;
	alertText.style.color = color;
}
function trim(e) {
	var trimReg = /^\s+|\s+$/g;
	return e.value.replace(trimReg,"");
}
function checkInputText(e) {
	var value = trim(e);        //原始输入去除首尾空格
	var alertText = document.getElementById("alertText");
	if(value===null||value==="") {
		noteText("查询不能为空","red");
	} else {
		noteText("可以开始查询，请点击查询按钮","green");
	}
	return value;
}
window.onload = function() {
	initTree();
}