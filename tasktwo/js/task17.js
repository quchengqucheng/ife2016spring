/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var start=0;
// 以下两个函数用于随机模拟生成测试数据
function randomColor() {
  //var arraycolor = [0,5,6,7,8,9,'a','b','c','d','e','f'];
  var arraycolor = ['#18BF7D', '#5B9980', '#114465', '#3E627B', '#2A674F', '#21C5B6','#48DEB2', '#86B4D8', '#71EABA', '#2F8096', '#A2FCD8', '#B3D8F6'];
  return arraycolor[Math.floor(Math.random()*arraycolor.length)];
}
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
chartData.height=[];
chartData.time = [];
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
var chartWidth = {
  "day": 10,
  "week": 50,
  "month":100
}
/**
 * 渲染图表
 */
function renderChart() {
  console.log("渲染图表");
  console.log(chartData["height"].length);
  var table = document.getElementById("aqi-chart-wrap");
  table.innerHTML = "";
  for(var i=0;i<chartData["height"].length;i++) {
    var div = document.createElement("div");
    div.setAttribute("class","bear");
    div.style.height = chartData.height[i]+"px";
    div.style.width = chartWidth[pageState.nowGraTime]+"px";
    div.style.backgroundColor = randomColor();
    // console.log(div);
    var span = document.createElement("span");
    span.setAttribute("class","divtitle");
    span.style.left = (chartWidth[pageState.nowGraTime]/2-70)+"px";
    var p = document.createElement("p");
    p.innerHTML = chartData.time[i];
    var p2 = document.createElement("p");
    p2.innerHTML = "AQI: "+Math.ceil(chartData.height[i]);
    span.appendChild(p);
    span.appendChild(p2);
    div.appendChild(span);
    table.appendChild(div);
  }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(ntime) {
  // 确定是否选项发生了变化 
  var nvalue = ntime.value;
  var bvalue = pageState.nowGraTime;
  console.log(nvalue);
  console.log(bvalue);
  if(start != 0&&nvalue == bvalue) return false;
  pageState.nowGraTime = nvalue;
  // ntime.parentNode.style.backgroundColor = "#69F4C6";
  var time = document.getElementById("form-gra-time");
  var input = time.getElementsByTagName("input");
  for(var i=0;i<input.length;i++) {
    if(input[i].checked == true) {
      input[i].parentNode.style.backgroundColor = "#69F4C6";
    } else input[i].parentNode.style.backgroundColor = "rgba(204,255,232,0.6)";
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
  console.log("确定选项发生了变化");
  start++;
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var nvalue = document.getElementById("city-select").value;
  console.log(nvalue);
  console.log(pageState.nowSelectCity);
  if(nvalue == pageState.nowSelectCity) return false;
  pageState.nowSelectCity = nvalue;
  
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var time = document.getElementById("form-gra-time");
  var input = time.getElementsByTagName("input");
  if(start==0) graTimeChange(input[0]);
  for(var i=0;i<input.length;i++) {
    input[i].onclick = function() {
      // console.log("haha");
      graTimeChange(this);
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(var key in aqiSourceData) {
    var city = document.createElement("option");
    city.innerHTML = key;
    var select = document.getElementById("city-select");
    select.appendChild(city);
    console.log(city);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
   var select = document.getElementById("city-select");
   select.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  console.log("处理好的数据存到 chartData 中")
  var ntime = pageState.nowGraTime;
  var ncity = pageState.nowSelectCity;
  chartData.height = [];
  chartData.time = [];
  //for(var ncity in aqiSourceData) 
  
    // console.log( aqiSourceData[ncity]);    //日期及高度
    var jsq=0;
    if(ntime == "day") {//日
        for(var v in aqiSourceData[ncity]) {
        //console.log(aqiSourceData[ncity][v]); //图表高度
        chartData.height[jsq] = aqiSourceData[ncity][v];
        chartData.time[jsq] = Object.getOwnPropertyNames(aqiSourceData[ncity])[jsq];
        // console.log(chartData.time[jsq]);
        jsq++;
      }
    }
    else if(ntime == "week") {//月
        var i=0;
        var weeknum=0;
        var weekheight = 0;
        for(var v in aqiSourceData[ncity]) {
          if(jsq==0) {
             chartData.time[weeknum] = "from "+Object.getOwnPropertyNames(aqiSourceData[ncity])[i]+"<br>";
          }
          if(jsq!=6) {
            weekheight+=aqiSourceData[ncity][v];
            jsq++;
          } else {
            jsq=0;
            chartData.height.push(weekheight/7);
            weekheight = 0;
            chartData.time[weeknum] +=  "to"+Object.getOwnPropertyNames(aqiSourceData[ncity])[i];
            weeknum++;
          }
          i++;
        }
        chartData.height.push(weekheight/jsq);
        chartData.time[monthnum] +=  "to"+Object.getOwnPropertyNames(aqiSourceData[ncity])[i-1];
    }
    else {//年
        var i=0;
        var monthnum=0;
        var monthheight = 0;
        for(var v in aqiSourceData[ncity]) {
          if(jsq==0) {
             chartData.time[monthnum] = "from "+Object.getOwnPropertyNames(aqiSourceData[ncity])[i]+"<br>";
          }
          if(!(jsq==30&&i<50)&&!(jsq==28&&i>50&&i<80)) {
            monthheight+=aqiSourceData[ncity][v];
            jsq++;
          } else {
            chartData.height.push(monthheight/jsq);
            jsq=0;
            monthheight = 0;
            chartData.time[monthnum] +=  "  to "+Object.getOwnPropertyNames(aqiSourceData[ncity])[i];
            monthnum++;
          }
          i++;
        }
        chartData.height.push(monthheight/jsq);
        chartData.time[monthnum] +=  "to"+Object.getOwnPropertyNames(aqiSourceData[ncity])[i-1];
    }
    // var keyArr = Object.getOwnPropertyNames(aqiSourceData[ncity]);
    // for(var i=0;i<keyArr.length;i++) {
    //console.log(keyArr[i]);                //日期
    // }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload = function() {
  init();
}