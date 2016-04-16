function initStart() {
	
	$("control").addEventListener('click',function(e) {
		for(var i=1;i<=4;i++) {
			if((e.target||e.srcElement)&&e.target.nodeName.toLowerCase()==="button"&&e.target.id === "spaceship"+i+"-start") {
		   		var ship = $("axis"+i);
		   		var angle=170;
		   		ship.style.webkitTransform = "rotate(" + angle + "deg)";
	            ship.style.mozTransform = "rotate(" + angle + "deg)";
	            ship.style.msTransform = "rotate(" + angle + "deg)";
	            ship.style.oTransform = "rotate(" + angle + "deg)";
	            ship.style.transform = "rotate(" + angle + "deg)";
	   		}
		}
	   
	   function fly() {

	   }
   
	},true);
}
function initCreate() {
	$("control").addEventListener('click',function(e) {
		for(var i=1;i<=4;i++) {
			if((e.target||e.srcElement)&&e.target.nodeName.toLowerCase()==="button"&&e.target.id === "spaceship"+i+"-create") {
				// if()
				var orbit = $("orbit"+i);
				var axis = document. createElement("div");
		   		var ship = document. createElement("div");
		   		axis.setAttribute("class","axis");
		   		axis.setAttribute("id","axis"+i);
		   		ship.setAttribute("class","energybar");
		   		ship.setAttribute("id","spaceship"+i);
		   		axis.appendChild(ship);
		   		orbit.appendChild(axis);
		   		
	   		}
		}
	},true);
}
function initDelet() {
	$("control").addEventListener('click',function(e) {
		for(var i=1;i<=4;i++) {
			if((e.target||e.srcElement)&&e.target.nodeName.toLowerCase()==="button"&&e.target.id === "spaceship"+i+"-delet") {
				if($("axis"+i)) {
					$("orbit"+i).removeChild($("axis"+i));
				}
			}
		}
	},true);
}
function $(id) {
    return document.getElementById(id);
}
window.onload = function() {
	initCreate();
	initStart();
	initDelet();
}