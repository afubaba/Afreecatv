console.log("webview2.client.js");

window.onload = function() {

	console.log("载入中");

}

window.onloadstart = function() {

	console.log("开始载入");

}

//JSON.stringify( js对象 [, 过滤器] [, 选项])


// var book = {
// 	title: "Professional JavaScript",
// 	authors: ["Nicholas C. Zakas"],
// 	edition: 3,
// 	year: 2011,
// 	releaseDate: new Date(2011, 11, 1)
// };
// var jsonText = JSON.stringify(book);
// var bookCopy = JSON.parse(jsonText, function(key, value) {
// 	if (key == "releaseDate") {
// 		return new Date(value);
// 	} else {
// 		return value;
// 	}
// });
// 对象转字符串：var str = JSON.stringify(obj)

// 字符串转对象：var obj = JSON.parse(str)

// 对象深拷贝：  var newObj = JSON.parse(JSON.stringify(obj)); 

window.chrome.webview.removeEventListener("message", event => console.log(event.data));

//接收服务端的消息
window.chrome.webview.addEventListener("message", event => {

	console.log(event.data);
	console.log(typeof(event.data));
	console.log(event.data.changeLang);
	console.log("=========================================");
	console.log(JSON.parse(event.data));
	console.log(typeof(JSON.parse(event.data)));

	const jsonData = JSON.parse(event.data);
	if ("changeLang" in jsonData) {

		var initDomChoiseLang = jsonData["changeLang"];
		var cookieLang = getCookie('_lang');
		console.log(initDomChoiseLang);

		if (initDomChoiseLang != cookieLang) {


			//保存切换cookie;
			//1.
			//oFooter.setSiteOption(initDomChoiseLang);
			//2.
			//setCookie('_lang', ' + initDomChoiseLang +', '.afreecatv.com', 365);
			setCookie('_lang', initDomChoiseLang, DOMAIN, 365);

			//跳主页则只能跳主页
			//location.replace("https://afreecatv.com"); 
			location.replace(location.href);
			//location.reload(true);
			oFooter.goPageTop();
		}

	}

	console.log("=========================================");
	// //Object->json
	// console.log(JSON.stringify(event.data));
	// console.log(typeof(JSON.parse(JSON.stringify(event.data))));
	// console.log("=========================================");

	// var jsonData= JSON.parse(JSON.stringify(event.data));
	// console.log(jsonData);
	// console.log(jsonData['changeLang']);

});
//主动给服务端发消息

//发送网址
// var jsonObj;
// jsonObj = {
// 	documentUrl: window.document.URL
// }
// window.chrome.webview.postMessage(JSON.stringify(jsonObj));


//发送语言Cookie
//console.log(getCookie('_lang'));
// if (!getCookie('_lang')) {

// }
// getCookie('_lang') && window.chrome.webview.postMessage("{'cookieLang':'" + getCookie('_lang') + "'}");


function sendMessageToHost(){
	window.chrome.webview.postMessage("{'cookieLang':'" + getCookie('_lang') + "'}");
}