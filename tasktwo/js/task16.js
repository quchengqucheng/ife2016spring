/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var jsq=0;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function trim(str){ //删除左右两端的空格
	return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}
function addAqiData() {
	//表头
    if(Object.keys(aqiData).length === 0&&jsq===0) {
    jsq++;
    var table = document.getElementById("aqi-table");
		var tr = document.createElement("tr");
		tr.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
		table.appendChild(tr);
    }
    //读取用户输入信息
    var city = document.getElementById("aqi-city-input").value;
    var cityvalue = document.getElementById("aqi-value-input").value;
    aqiData[city]= cityvalue;
    console.log(city);
    console.log(aqiData[city]);
    //判断输入信息是否符合规范
    var citynamealert = document.getElementById("citynamealert");
    if(!trim(city)) {
    	citynamealert.innerHTML = "输入不能为空";
    	return false;
    }
    var pos = trim(city).search(/\d/);
    if (pos >= 0) {//含一个数字，pos=0;
        citynamealert.innerHTML = "输入不能包含数字，请输入中文或英文"
        return false;
    }
    citynamealert.innerHTML = "";
    var numalert = document.getElementById("numalert");
    if(!trim(cityvalue)) {
    	numalert.innerHTML = "输入不能为空";
    	return false;
    }
    var ha = trim(cityvalue).search(/\D/);
    if (ha >= 0) {
        numalert.innerHTML = "输入不能包含除数字外的字符，请输入纯数字"
        return false;
    }
    numalert.innerHTML ="";
    //符合规范，加入表中
    renderAqiList(city,aqiData[city]);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(city,cityvalue) {
	var table = document.getElementById("aqi-table");
	var tr = document.createElement("tr");
	// console.log(city);
	tr = document.createElement("tr");
	btn = document.createElement("button");
	btn.innerHTML = "删除";
	td = document.createElement("td");
	td.appendChild(btn);
	tr.innerHTML = "<td>"+city+"</td><td>"+cityvalue+"</td>";
	tr.appendChild(td);
	table.appendChild(tr);

	btn.onclick = function() {
		delBtnHandle(this);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  // renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(btn) {
  // do sth.
  
  var trNode = btn.parentNode.parentNode;
  var table = document.getElementById("aqi-table");
  var city = trNode.firstElementChild.innerHTML;
  delete aqiData[city];
  console.log(city);
  table.removeChild(trNode);
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var addbtn = document.getElementById("add-btn");
  addbtn.addEventListener("click",addBtnHandle,false);
}

window.onload = function(){
	init();
}