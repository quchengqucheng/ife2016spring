var traverse = [];// 储存创建的node二叉树
var queue = [];   // 储存遍历的div二叉树
// 二叉树结点的构造函数
function Node(data,left,right) {
	this.data = data;
	this.left = left;
	this.right =right;
}
// 创建二叉树
function createBiTree(num) {
	var root= new Node(num[0],null,null);
	traverse.push(root);
	for(var i=1;i<num.length;i++) {
		var node = new Node(num[i],null,null);
		function addBiTree(node) {
			if(traverse.length!==0) {
				var parent = traverse[0];
				if(parent.left===null) {
					// console.log(parent.data,node.data,"left");
					parent.left = node;
				} else if(parent.right === null) {
					parent.right = node;
					// console.log(parent.data,node.data,"right");
					traverse.shift();
				} 
				// console.log(parent.left,parent.right);
				traverse.push(node);
			}
		}
		addBiTree(node);
	}
	var root2 =root;
	console.log(root2);
	// var rootDiv = document.getElementById("root");
	// renderBiTree(root,rootDiv);
	return root;
}
// 渲染二叉树
function renderBiTree(rt,parentDiv) {
	if(rt!=null) {
		// rt.data = parentDiv;
		var childDiv = document.createElement("div");
		childDiv.setAttribute("class","child");
		rt.data = childDiv;
		parentDiv.appendChild(childDiv);
		renderBiTree(rt.left,childDiv);
		renderBiTree(rt.right,childDiv);
	}
}
// 遍历过程中展示正在遍历的元素
function show(queue) {
	showdiv = setInterval(function() {
		if(queue.length>0) {
			var div = queue.shift();
			div.setAttribute("id","show");
		}
		else {
			clearInterval(showdiv);//队列为空，取消用setInterval设置的重复定时任务
			return;
		}
		setTimeout(function() {//恢复元素原样式
			div.id ="";
		},300);
	},300);
}
// 先序遍历
function preOrder(rt) {
	if(rt!==null) {
		queue.push(rt.data);
		preOrder(rt.left);
		preOrder(rt.right);
	}
	return queue;
}
// 中序遍历
function inOrder(rt) {
	if(rt!==null) {
		inOrder(rt.left);
		queue.push(rt.data);
		inOrder(rt.right);
	}
	return queue;
}
// 后序遍历
function postOrder(rt) {
	if(rt!==null) {
		postOrder(rt.left);
		postOrder(rt.right);
		queue.push(rt.data);
	}
	return queue;
}
function initTree() {
	var num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var rt = createBiTree(num);//同时执行吗？
	var rootDiv = document.getElementById("root");
	renderBiTree(rt,rootDiv);//同时执行吗？
	console.log(rt);

	var prebtn  = document.getElementById("preOrder");
	var inbtn   = document.getElementById("inOrder");
	var postbtn = document.getElementById("postOrder");

	prebtn.addEventListener('click',function(){
		show(preOrder(rt));
	} ,false);
	inbtn.addEventListener('click',function(){
		show(inOrder(rt));
	},false);
	postbtn.addEventListener('click',function(){
		show(postOrder(rt));
	},false);


	
}
window.onload = function() {
	initTree();
}