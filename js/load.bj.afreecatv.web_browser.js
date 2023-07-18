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

function getURL() {
	try{
		var imgSrc = $("section.bj_box .thum img").attr("src");
		console.log(imgSrc);
		var src = $('.author_wrap .thumb img').attr('src');
		console.log(src);
		
		if(typeof imgSrc=="undefined"  || imgSrc=="//bj.afreecatv.com/undefined"){
			setTimeout(function(){
				getURL();
			},1000);
		}else{
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
	}catch(e){
		setTimeout(function(){
			getURL();
		},1000);	
	}
}
/ 判断元素是否存在
if ($('.author_wrap .thumb img').length) {
  // 监听目标元素
  var target = $('.author_wrap .thumb img')[0];

  // 创建一个MutationObserver实例
  var observer = new MutationObserver(function(mutationsList) {
    // 遍历每个mutation
    mutationsList.forEach(function(mutation) {
      if (mutation.attributeName === 'src') {
        // src属性发生变化时触发的事件
        console.log('src属性已变化:', target.src);

        // 在这里添加你的其他逻辑或触发其他事件
        // ...
      }
    });
  });

  // 配置观察选项
  var config = { attributes: true };

  // 开始观察目标元素
  observer.observe(target, config);
} else {
  console.log('目标元素不存在，无法监听');
}



//dynamicLoading.js(domain + "js/bj.afreecatv.client.js");