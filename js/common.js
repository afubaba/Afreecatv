console.log("common.js");
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
	js: function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		// script.async = "async";
		script.defer="defer";
		script.src = path;
		script.type = 'text/javascript';


		head.appendChild(script);
	}
};
//加载的时候语言
var setLang = {
	getI18n: function(name) {
		const rnName = chrome.i18n.getMessage(name);
		return rnName;
	},
	setLanguage: function(idName) {
		var rnNameId = "play_afreecatv_" + idName;
		//获取本地化值
		var rnName = this.getI18n(rnNameId);
		if (rnName != "") {
			let idDom = document.querySelector("#" + idName);
			if (idDom != null) {
				idDom.innerHTML = rnName;;
			} else {
				console.log(idDom);
			}
			// document.getElementById(id).innerHTML=rnName;
			// $("#" + idName).html(rnName);
		}
		//获取本地化值Title
		var rmNameTitleValue = rnNameId + "_title";
		rmNameTitleValue = this.getI18n(rmNameTitleValue);
		if (rmNameTitleValue != "") {
			// $("#" + idName).attr("title", rmNameTitleValue);
			// document.getElementById("#"+idName).setAttribute("title",rmNameTitleValue);
			document.querySelector("#" + idName).setAttribute("title", rmNameTitleValue);
		}
	}
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
