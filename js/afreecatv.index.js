
console.log("start javascript");

//背景图地址
var backUrl = "";

//子页面地址
var sonWindowUrl = "http://127.0.0.1:8888/demo/StaticServlet?params=frame.son.html";

function getDomById(idDom) {
	idDom = document.getElementById(idDom);
	return idDom;
}


function initButton() {

	$('button').click(() => {

		var i = 0;
		let initButtonInterval = setInterval(() => {

			if (i == 5 || 'complete' == this.document.readyState) {
				initWindow().initLink();
				clearInterval(initButtonInterval);
			}
			i++;

		}, 2000);


		/*initWindow().initLink();*/


	});
}


var initWindow = function() {
	//初始化子窗口背景
	$('*').css('background', 'none');
	//初始化A链接
	// initLink();
	function initLink() {
		var allA = $('a');
		console.log("initLink");
		console.log("a:" + allA.length + "个");
		for (var i = 0; i < allA.length; i++) {
			// 替换默认链接
			if (!allA[i].href.includes('javascript:') && allA[i].href.includes('https://')) {
				allA[i].href = 'javascript:parent.openWindow("' + allA[i].href + '")';
			}

			if (allA[i].target == '_blank') {
				allA[i].removeAttribute('target');
				allA[i].style.fontSize = 'large';
				allA[i].style.background = 'white';
				allA[i].style.color = 'blue';
				// allA[i].style.background = 'black';
				// allA[i].style.color='white';


			}
			if (allA[i].target == '_top') {
				allA[i].removeAttribute('target');
				allA[i].style.background = 'red';

			}
		}

	}

	//初始化button
	initButton();
	return {
		initLink: initLink
	}

	// initLink();


}

//open方式
function openWindow(link) {
	// openWindow('https://play.afreecatv.com/midnight1025/235618475')
	console.log('打开窗口:' + link);
	//navigator游览器对象


	//创建一个window 0-49
	// eval("if ('undefined' !=typeof "+windowName+") {console.log('已经存在，重新创建');"+windowName+".close();}else{console.log('不存在')}
	getRandomWindowName();
	function getRandomWindowName() {
		let myWindowName;
		let ranNO;
		try {
			ranNO = parseInt(Math.random() * 50 / 1);
			myWindowName = 'myWindow' + ranNO;
			console.log("随机的名字" + myWindowName);
			//捕获异常
			eval(myWindowName);
			getRandomWindowName();
		} catch (e) {
			console.log(e);
			console.log("已经找到" + myWindowName);

			// let ranNO= parseInt(Math.random() * 50 / 1);
			// var winName='myWindow'+ranNO;


			var winName = myWindowName;
			let ctrWindow = winName + "= createWindow(\'" + link + "\',\'" + winName + "\');";

			console.log('ctrWindow:' + ctrWindow);
			eval(ctrWindow);
			console.log('--run Window--');
			// eval(" runWindow("+myWindow+");");
			// console.log(myWindow);
			// runWindow(myWindow);
			eval(" runWindow(" + winName + ");");
			// try{console.log('11');eval('myWindow2') ;}catch(e){console.log(e)}
			// alert('--运行前--');


		}
	}

	//创建窗口
	function createWindow(link, windowName) {
		//判断是否存在
		function isWindowExist() {

			// if ('undefined' != typeof myWindow) {
			//     console.log('createWindow:myWindow已经存在，重新创建')
			//     myWindow.close();
			//
			// }
			// eval("if ('undefined' !=typeof "+windowName+") {console.log('已经存在，重新创建');"+windowName+".close();}else{console.log('不存在')}")
		}
		//直接创建窗口
		var strWindow = windowName + " =window.open(\'" + link + "\', \'" + windowName + "\')";
		console.log(strWindow);
		// windowName.close();
		console.log('windowName:' + windowName);
		return eval(strWindow);
	}


	//10秒以后初始化被打开的窗口
	function runWindow(myWindowName) {
		//传送数据
		//myWindow
		console.log('runWin:')
		console.log(myWindowName);

		// parent.document
		var i = 0;
		let initButtonInterval = setInterval(() => {
			console.log(myWindowName.document.readyState);
			if (i == 5 || 'complete' == myWindowName.document.readyState) {
				console.log('执行了计时器');

				//$('head', myWindowName.document).append("<script>$.ajax({url: 'https://afubaba.github.io/test/frame.son.html',type: 'get',success: function(result, statis) {console.log($('.broadcast_information'));$('.broadcast_information').before(result);setTimeout(function() {$('#startButtonId').click();}, 3000);},error: function(error, errorMessage) {console.log(error);console.log(errorMessage);}});</script>");
				$('.broadcast_information', myWindowName.document).before("<button id=startSonButton onclick='tt()'>startSonButton</button>");

				console.log('执行了计时器');


				$.ajax({
					url: sonWindowUrl,
					type: 'get',
					success: function(result, statis) {
						console.log($('.broadcast_information'), myWindowName.document);
						/*	findGrandSon('.broadcast_information').before(result);*/
						$('.broadcast_information', myWindowName.document).before(result);
						setTimeout(function() {
							$('#startButtonId', myWindowName.document).click();
						}, 3000);
					},
					error: function(error, errorMessage) {
						console.log(error);
						console.log(errorMessage);
					}
				});


				clearInterval(initButtonInterval)
			}
			i++;

		}, 2000);

	}

	//销毁
}

var i = 0;
let initButtonInterval = setInterval(() => {

	if (i == 5 || 'complete' == this.document.readyState) {
		initWindow().initLink();
		clearInterval(initButtonInterval);
	}
	i++;

}, 2000);

/*window.onload = function() {

	initWindow().initLink();
}*/
/*setTimeout(function() {

	initWindow().initLink();

}, 3000);

*/
