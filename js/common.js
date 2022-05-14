function httpRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callback(xhr.responseText);
		}
	}
	xhr.send();
}
var dx = {
	"sfz": function(id) {
		var domId = document.getElementById(id);
		return domId;
	},
	"lx": function(className) {
		var className = document.getElementsByClassName(className);
		return className;
	},
	"nm": function(name) {
		var name = document.getElementsByClassName(name);
		return name;
	}
}
