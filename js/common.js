// console.log("本地common.js");
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
var dynamicLoading = {
	css: function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js: function(path, callback) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		// script.async = "async";
		// script.defer = "defer";
		script.src = path;
		script.type = 'text/javascript';
		script.onload = function() {
			// console.log("外部脚本加载完毕");
			callback();
		}
		head.appendChild(script);
	}
};


//获取任意dom对象
function getDomById(domId) {
	domId = document.getElementById(domId);
	return domId;
}

function getDomByName(domName) {
	domName = document.getElementsByName(domName);
	return domName;
}

function getDomByClassName(domClassName) {
	domClassName = document.getElementsByClassName(domClassName);
	return domClassName;
}

// var dx = {
// 	"sfz": function(id) {
// 		var domId = document.getElementById(id);
// 		return domId;
// 	},
// 	"lx": function(className) {
// 		var className = document.getElementsByClassName(className);
// 		return className;
// 	},
// 	"nm": function(name) {
// 		var name = document.getElementsByClassName(name);
// 		return name;
// 	}
// }



// // 网络时间
// function dateTimeFormate(date) {
// 	if (!date) {
// 		return
// 	} else {
// 		var d = new Date(date);
// 		var year = d.getFullYear();
// 		var month = ('0' + (d.getMonth() + 1)).slice(-2);
// 		var day = ('0' + (d.getDate())).slice(-2);
// 		var hour = ('0' + (d.getHours())).slice(-2);
// 		var minutes = ('0' + (d.getMinutes())).slice(-2);
// 		var seconds = ('0' + (d.getSeconds())).slice(-2);
// 		return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
// 	}
// }

// function setDomTimeById(domTimeId) {
// 	setInterval(function() {
// 		var xhr = new XMLHttpRequest();
// 		if (!xhr) {
// 			xhr = new ActiveXObject("Microsoft.XMLHTTP");
// 		}
// 		xhr.open("HEAD", "https://afreecatv.com", true);
// 		xhr.onreadystatechange =
// 			function() {
// 				if (xhr.readyState == 4 && xhr.status == 200) {
// 					/* alert(xhr.responseText);
// 					alert(xhr.getResponseHeader("Date")); */
// 					/* alert(dateTimeFormate(xhr.getResponseHeader("Date"))); */
// 					nowTime = dateTimeFormate(xhr.getResponseHeader(
// 						"Date"));
// 					getDomById(domTimeId).innerHTML = nowTime;
// 				}
// 			}
// 		xhr.send(null);
// 	}, 1000);
// }
