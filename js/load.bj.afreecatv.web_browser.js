console.log("load.bj.afreecatv.web_browser.js");
const domain = "https://afubaba.github.io/Afreecatv/"
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

		head.appendChild(script);
	}
};
dynamicLoading.css(domain + "css/common.css");

dynamicLoading.js(domain + "libs/jquery/1.7.2/jquery.min.js");
dynamicLoading.css(domain + "libs/bootstrap/2.3.2/css/bootstrap.min.css");
//dynamicLoading.js(domain + "libs/bootstrap/2.3.2/js/bootstrap.min.js");
//console.log($.fn.jquery);
getURL();
var initCount = 0;

function getURL() {
	try {
		var imgSrc = $("section.bj_box .thum img").attr("src");

		var src = $('.author_wrap .thumb img').attr('src');
		if (typeof imgSrc == "undefined" || imgSrc == "//bj.afreecatv.com/undefined") {
			setTimeout(function() {
				initCount++;
				if (initCount < 50) {
					getURL();
				}
			}, 1000);
		} else {
			imgSrc = new URL(imgSrc, window.location.href).href;
			//imgSrc = "https:" + imgSrc;
			//发送图标 消息
			let headImgObj;
			// var imgSrc = $("section.bj_box .thum img").attr("src");
			// imgSrc = "https:" + imgSrc;
			// console.log(imgSrc);
			headImgObj = {
				headImgUrl: imgSrc
			}
			window.chrome.webview.postMessage(JSON.stringify(headImgObj));
		}
	} catch (e) {
		setTimeout(function() {
			initCount++;
			if (initCount < 50) {
				getURL();
			}
		}, 1000);
	}
}




//dynamicLoading.js(domain + "js/bj.afreecatv.client.js");