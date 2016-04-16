function initOpen() {
	$("container").addEventListener('click',function(e) {
		if((e.target||e.srcElement)&&e.target.nodeName.toLowerCase()==="button"&&e.target.className === "btn") {
			$("popup").style.display = "flex";
		}
	},true);
}
function initClose() {
	$("popup").addEventListener('click',function(e) {
		if((e.target||e.srcElement)&&(e.target.nodeName.toLowerCase()==="button"||e.target.nodeName.toLowerCase()==="span")) {
			$("popup").style.display = "none";
		}
	},true);
}
function $(id) {
    return document.getElementById(id);
}
window.onload = function() {
	initOpen();
	initClose();
}