// console.log("index.js");



const domain = "https://afubaba.github.io/Afreecatv/"

const commonURL = domain + "js/common.js";
$("head").append("<script src='" + commonURL + "'/>");


// createLinkDom();
// $("body").before(

// 	"<video width=100 height=100 style='border: 2px red solid;' class='fullscreenvideo' id='bgvid' class='bgvid' playsinline=''autoplay=''  loop=''><source src='https://afubaba.github.io/Afreecatv/video/15211055754cc4cec9bdd887bc.mp4_last.mp4'type='video/mp4'>"
// 	);

// $("body").before(

// 	"<iframe id='afreecatv_player_video' class='fullscreenvideo' width='640' height='360' src='//vod.afreecatv.com/player/77366508/embed?type=station&isAfreeca=false&autoPlay=true&showChat=false&mutePlay=false&szBjId=1057123999&nStationNo=18727399&nBbsNo=56649870&nTitleNo=77366508&szCategory=00230000&szVodCategory=00290002&szPart=NORMAL&nPlaylistIdx=0&path6=0&isEmbedautoPlay=true&szSysType=html5' frameborder='0' allowfullscreen='true'></iframe>"
// );

// $("body").before(

// 	"<iframe id='afreecatv_player_video' onload='frameauto()' class='fullscreenvideo' width='640' height='360' src='//vod.afreecatv.com/player/77366508/embed?type=station&isAfreeca=false&autoPlay=true&showChat=false&mutePlay=false&szBjId=1057123999&nStationNo=18727399&nBbsNo=56649870&nTitleNo=77366508&szCategory=00230000&szVodCategory=00290002&szPart=NORMAL&nPlaylistIdx=0&path6=0&isEmbedautoPlay=true&szSysType=html5' frameborder='0' allowfullscreen='true'></iframe>"
// );


const cssURL = domain + "css/index.client.css";

$('head').append("<link rel=stylesheet type=text/css href= '" + cssURL + "'/>");
//dynamicLoading.css(cssURL);

// function createLinkDom() {
// 	let backDom ;
// 	backDom = document.createElement('video');
// 	backDom.className=""
// 	backDom.className=""
// 	console.log(backDom);
// 	$('body').append(backDom);
// }


// if (location.href=="https://afreecatv.com/") {
// console.log("进入了主页");
//背景图地址
var backUrl1 = "https://profile.img.afreecatv.com/LOGO/10/1057123999/1057123999.jpg";
var backUrl = "https://afubaba.github.io/Afreecatv/img/bg1.webp";
// console.log(chrome.*);
// const bgURL=chrome.extension.getURL("img/bg.png");
var bgURL = "";
try {
	bgURL = document.querySelector(".userInfo ").children[0].children[0].src;
} catch (e) {
	// console.log(e);
	bgURL = backUrl;
}
// console.log(bgURL);
//清除背景.css('background-repeat','no-repeat')
$('*').css('background', 'none');
// $('body').css('background', 'url(' + bgURL + ')').css('background-size', '100%').css('height', '100%').css('width',
// 	'100%').css("background-repeat","no-repeat")

$('body').css('background', 'url(' + bgURL + ')').css('background-size', 'cover').css('height', '100%').css(
	'width',
	'100%').css("backgroundRepeat", "no-repeat").css("backgroundPosition", "center");

//开始清除播放
// document.querySelector("#myVideo").pause();

// 双击事件

//只执行一次
function once(fn) {
	let done = false;
	return function(...args) {
		if (!done) {
			done = true;
			fn.call({}, ...args);
		}
	};
}
const executeOnce = once(function() {
	$("a").css("color", "white");
	$(".btn-more").children().click(function() {
		setTimeout(function() {
			$("a").css("color", "white");
		}, 1000);
	});
});

const executePlay = once(function() {
	const videoURL = domain + "video/background.mp4";
	// muted
	// autoplay=''
	$("body").before(
		// https://afubaba.github.io/Afreecatv
		"<video id=myVideo width=100% height=100%  class='fullscreenvideo'  playsinline='' poster='" +
		bgURL + "'    loop=''><source src='" +
		videoURL + "' type='video/mp4'>"
	);
	$("#myVideo").bind('contextmenu', function() {
		return false;
	})
	playMyVideo();
	//监听播放器
	$("html").hover(function() {
			// setInterval(function() {
			// $("body").css("backgroundImage", "none").css("transform", "none")

			// }, 1000);
			// document.querySelector("#myVideo").play();
			playMyVideo();
			$("body").fadeTo(1000, 0.1).fadeTo(1000, 0.2).fadeTo(1000, 0.3).fadeTo(1000, 0.4).fadeTo(1000,
				0.5).fadeTo(1000, 0.6).fadeTo(1000, 0.7).fadeTo(1000, 0.8).fadeTo(1000, 0.9).fadeTo(
				1000, 1);;

		},
		function() {
			pauseMyVideo();
		});
});
var myVideo;

function playMyVideo() {
	myVideo = document.querySelector("#myVideo");

	//重新播放 myVideo.load();
	let playPromise = myVideo.play()
	if (playPromise !== undefined) {
		playPromise.then(() => {
			myVideo.play()
		}).catch(() => {

		})
	}
}

function pauseMyVideo() {
	myVideo.pause();
}
$("html").dblclick(function() {
	// $("body").toggle();
	// $("body").css("transform", "rotate3d(1,0,1,-" + 90 + "deg)").css("transition-duration", "5s").css(
	// 	"transition-timing-function", "ease-in");
	//显示隐藏
	if ($("body").css("transform") == "none") {
		$("body").css("transform", "scale3d(1,0,2)").css("transition-duration", "3s").css(
			"transition-timing-function", "ease-in");

	} else {
		$("body").css("backgroundImage", "none").css("transform", "none");

		executeOnce();
	}
	executePlay();
});

//背景图
// $('body').css('background', 'url(' + bgURL + ')').css('background-size', 'cover').css('height', '100%').css(
// 	'width',
// 	'100%').css("backgroundRepeat", "no-repeat").css("backgroundPosition", "center");
// getURL();
// function getURL(){
// 	try{
// 		// $('*').css('backgroundImage', 'none');
// 		bgBackgroundFunction('url('+backUrl+')');
// 	}catch(e){
// 		setTimeout(function(){
// 			getURL();
// 		},1000);
// 	}
// }

// var bdBack=document.body;
// function bgBackgroundFunction(bgURL) {
// 	bdBack.style.backgroundImage = bgURL;//设置背景图的的地址
// 	bdBack.style.backgroundRepeat = "no-repeat";//设置背景不平铺
// 	bdBack.style.backgroundPosition = "center";//设置背景图的位置
// 	bdBack.style.backgroundSize = "cover";//设置背景图像的尺寸 

// }

//$('body').css('background-image','url('+backUrl+')');
// var dynamicLoading = {
// 	css: function(path){
// 		if(!path || path.length === 0){
// 			throw new Error('argument "path" is required !');
// 		}
// 		var head = document.getElementsByTagName('head')[0];
// 		var link = document.createElement('link');
// 		link.href = path;
// 		link.rel = 'stylesheet';
// 		link.type = 'text/css';
// 		head.appendChild(link);
// 	},
// 	js: function(path){
// 		if(!path || path.length === 0){
// 			throw new Error('argument "path" is required !');
// 		}
// 		var head = document.getElementsByTagName('head')[0];
// 		var script = document.createElement('script');
// 		script.src = path;
// 		script.type = 'text/javascript';
// 		head.appendChild(script);
// 	}
// };
// dynamicLoading.js("https://afubaba.github.io/Afreecatv/js/afreecatv.index.js");



// chrome.app.window.create('blank.html', {
// 	id: 'default'
// });
// window.open("111","abc");

// chrome.tabs.executeScript(null, {file: "content_script.js"});

// chrome.extension.onRequest.addListener( //监听扩展程序进程或内容脚本发送的请求
// 	function  (request, sender, sendResponse) {
// 		if( request.action ==  "GetBaiduKeyWord" ) {
// 			// sendResponse({ kw: document.forms[0].wd.value });
// 			if (location.href=="https://afreecatv.com/") {
// 				console.log("进入了主页");
// 			}
// 			// var loginBtn=document.getElementById("loginBtn");
// 			// loginBtn.click();
// 			// 
// 			sendResponse({ kw: document.getElementById("szKeyword").value});
// 		}
// 	}
// 	);
// chrome.runtime.onMessage.addListener(
//  	function  (request, sender, sendResponse) {
// 		if( request.action ==  "Test" ) {
// 			alert("test");
// 			console.log("test");
// 			sendResponse({ kw:document.getElementById("testInput").value});
// 		}
// 	}
// )

// alert("Hello..! It's my first chrome extension.");
// chrome.tabs.sendRequest(tab.id, { action:  "GetBaiduKeyWord"  },  function  (response) {


// 	alert(response.kw);
// });


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

// document.getElementById('myFile').onchange = function(){
//  var file = this.files[0];
//  console.log(file);
// }


// var html;
// httpRequest('test.txt', function(result){
//  html = result;
//  console.log(html);
// });
// var title = chrome.i18n.getMessage('extName');
// // console.log(title);
// // 获取浏览器可接受的语言：
// chrome.i18n.getAcceptLanguages(function(languageArray) {
// 	//do something with languageArray
// 	// console.log(languageArray);
// });
// // 获得指定消息的本地化字符串。如果消息不存在，该方法返回空字符串""：
// var msg = chrome.i18n.getMessage("extName", "ko");
// console.log(msg);
// var err = chrome.i18n.getMessage("error", "errorDetails");
// console.log(err);

// // 获取浏览器用户界面的语言1：
// var currentLanguage = chrome.i18n.getUILanguage();
// console.log(currentLanguage);
// console.log( __MSG_@@bidi_dir__);
// 
// 
// 
// 
// chrome.alarms.create('alarmsTest', {
//     periodInMinutes:1,
//     delayInMinutes:1
// });
// var test = 1;
// chrome.alarms.get('alarmsTest', function(alarm) {
//     console.log(test);
//     test++;
// });