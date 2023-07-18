console.log("load.vod.afreecatv.web_browser.js");
var domain = "https://afubaba.github.io/Afreecatv/"
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
			callback();
		}
		head.appendChild(script);
	}
};
dynamicLoading.css(domain + "css/common.css");


function setIcon(newSrc) {

	//发送图标 消息
	let headImgObj;
	headImgObj = {
		headImgUrl: newSrc
	}
	window.chrome.webview.postMessage(JSON.stringify(headImgObj));

}
dynamicLoading.js(domain + "libs/jquery/1.7.2/jquery.min.js", function() {
	dynamicLoading.css(domain + "libs/bootstrap/2.3.2/css/bootstrap.min.css");
	dynamicLoading.js(domain + "libs/bootstrap/2.3.2/js/bootstrap.min.js", function() {

	});
	//console.log($.fn.jquery);
	getURL();
	let headImgObj;
	var initCount = 0;

	function getURL() {
		try {
			var imgSrc = $('.broadcast_information .bj_thumbnail img').attr('src');
			if (typeof imgSrc == "undefined" || imgSrc == "https://stimg.afreecatv.com/undefined") {
				setTimeout(function() {
					initCount++;
					if (initCount < 50) {
						getURL();
					}

				}, 1000);
			} else {
				//转换地址
				//imgSrc = new URL(imgSrc, window.location.href).href;
				//imgSrc = "https:" + imgSrc;
				//发送图标 消息
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

	var attemptCount = 0; // 尝试计数器

	function observeTarget() {
		if (attemptCount >= 50) {
			console.log('目标元素不存在，无法监听');
			return;
		}

		// 判断目标元素是否存在
		if ($('.author_wrap .thumb img').length) {
			// 获取目标元素
			var targetImg = $('.author_wrap .thumb img');
			
			// 获取初始的 src 属性值
			var initialSrc = targetImg.attr('src');
			setIcon(initialSrc);
			// 创建 MutationObserver 实例
			var observer = new MutationObserver(function(mutationsList) {
				mutationsList.forEach(function(mutation) {
					if (mutation.attributeName === 'src') {
						// src 属性发生变化时触发的事件
						console.log('src 属性已变化:', initialSrc);
						setIcon(initialSrc);
					}
				});
			});

			// 配置观察选项
			var config = {
				attributes: true
			};

			// 开始观察目标元素
			observer.observe(target, config);
		} else {
			// 目标元素不存在，计数器加1并继续尝试
			attemptCount++;
			setTimeout(observeTarget, 1000); // 间隔1秒后继续尝试
		}
	}

	observeTarget(); // 开始尝试监听目标元素

});



//dynamicLoading.js(domain + "js/bj.afreecatv.client.js");