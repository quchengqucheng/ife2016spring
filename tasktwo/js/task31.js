var cityUni = {
	"beijing": [
		      '北京大学',
			  '清华大学',
			  '北京理工大学',
			  '北京邮电大学',
			  '中央财经大学'
			],
	"tianjin": [
			  '天津大学',
			  '南开大学',
			  '天津理工大学',
			  '天津商业大学',
			  '天津财经大学'
			  ],
	"shanghai": [
			  '复旦大学',
			  '上海大学',
			  '上海理工大学',
			  '上海海洋大学',
			  '上海财经大学'
			]
}

function showUniOption() {
	var city = document.getElementById("city");
	var uni = document.getElementById("uni");
	uni.innerHTML = "";
	cityValue= city.value;
	console.log(cityValue);
	for(var i=0;i<cityUni[cityValue].length;i++) {
		var option = document.createElement("option");
		option.innerHTML = cityUni[cityValue][i];
		uni.appendChild(option);
	}
}
function showDiv(e) {
	var school = document.getElementById("school");
	var work =document.getElementById('work');
	if(e.value ==="school") {
		school.style.display = "block";
		work.style.display = "none";
	} else {
		school.style.display = "none";
		work.style.display = "block";
	}
}
window.onload = function () {
	// console.log(cityUni["beijing"][0]);
	var table = document.getElementById('table');
	table.addEventListener('click',function(e) {
       if(e.target&&e.target.nodeName.toLowerCase()=="input"){
         showDiv(e.target);//input元素
       }
    }, true);
    var city = document.getElementById("city");
    city.addEventListener('change',showUniOption);
}