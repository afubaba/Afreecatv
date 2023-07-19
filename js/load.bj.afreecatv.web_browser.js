console.log("load.bj.afreecatv.web_browser.js");
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

function setIcon(newSrc) {
	// 处理事件的逻辑
	//console.log('目标 <img> 的 src 属性发生变化:', newSrc);
	var imgSrc = new URL(newSrc, window.location.href).href;
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
dynamicLoading.js(domain + "libs/jquery/1.7.2/jquery.min.js", function() {

	dynamicLoading.css(domain + "css/common.css");
	dynamicLoading.css(domain + "libs/bootstrap/2.3.2/css/bootstrap.min.css");
	//dynamicLoading.js(domain + "libs/bootstrap/2.3.2/js/bootstrap.min.js",function(){});


	var attemptCount = 0; // 尝试计数器
	function observeTarget() {
		if (attemptCount >= 50) {
			//console.log('目标元素不存在，无法监听');
			return;
		}
		// 判断目标元素是否存在
		if ($('.bj_box img').length) {
			// 使用 jQuery 查找目标 <img> 元素
			var targetImg = $('.bj_box img');
			// 获取初始的 src 属性值
			var initialSrc = targetImg.attr('src');
			// 初次设置图片
			setIcon(initialSrc);
			// 创建一个 MutationObserver 实例
			var observer = new MutationObserver(function(mutationsList) {
				mutationsList.forEach(function(mutation) {
					// 检查是否是目标 <img> 元素的 src 属性发生了变化
					if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
						// 获取新的 src 属性值
						var newSrc = targetImg.attr('src');

						// 初次设置图片
						setIcon(newSrc);
					}
				});
			});

			// 配置观察选项
			var config = {
				attributes: true, // 监听属性的变化
			};

			// 开始观察目标 <img> 元素的 src 属性变化
			observer.observe(targetImg[0], config);


		} else {
			// 目标元素不存在，计数器加1并继续尝试
			attemptCount++;
			setTimeout(observeTarget, 1000); // 间隔1秒后继续尝试
		}
	}

	observeTarget(); // 开始尝试监听目标元素

	//console.log($.fn.jquery);
	// getURL();
	// var initCount = 0;

	// function getURL() {
	// 	try {
	// 		var imgSrc = $("section.bj_box .thum img").attr("src");

	// 		var src = $('.author_wrap .thumb img').attr('src');
	// 		if (typeof imgSrc == "undefined" || imgSrc == "//bj.afreecatv.com/undefined") {
	// 			setTimeout(function() {
	// 				initCount++;
	// 				if (initCount < 50) {
	// 					getURL();
	// 				}
	// 			}, 1000);
	// 		} else {
	// 			imgSrc = new URL(imgSrc, window.location.href).href;
	// 			//imgSrc = "https:" + imgSrc;
	// 			//发送图标 消息
	// 			let headImgObj;
	// 			// var imgSrc = $("section.bj_box .thum img").attr("src");
	// 			// imgSrc = "https:" + imgSrc;
	// 			// console.log(imgSrc);
	// 			headImgObj = {
	// 				headImgUrl: imgSrc
	// 			}
	// 			window.chrome.webview.postMessage(JSON.stringify(headImgObj));
	// 		}
	// 	} catch (e) {
	// 		setTimeout(function() {
	// 			initCount++;
	// 			if (initCount < 50) {
	// 				getURL();
	// 			}
	// 		}, 1000);
	// 	}
	// }




	//dynamicLoading.js(domain + "js/bj.afreecatv.client.js");
});