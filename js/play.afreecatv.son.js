function getDomById(idDom) {
	idDom = document.getElementById(idDom);
	return idDom;
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

		head.appendChild(script);
	}
};
//自动启动
function testStart() {
	function startButtonId() {
		//启动动画效果
		var src = document.getElementsByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute('src');
		// $('head').append('<script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/afreecatv.son.js/>'); 
		//在线
		// $('head').append('<link rel=stylesheet type=text/css href=https://afubaba.github.io/Afreecatv/css/bootstrap.min.css > <script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/bootstrap.min.js></script><script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/jquery1.7.2.min.js></script><link rel=stylesheet type=text/css href=https://afubaba.github.io/Afreecatv/css/afreecatv.son.css><script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/afreecatv.son.js></script>');
		// javascript
		//createLinkDom(null, 'https://cdn.bootcss.com/bootstrap/2.3.2/css/bootstrap.min.css');

		function createLinkDom(id, link) {
			let showLogDivDom;
			showLogDivDom = document.createElement('link');
			showLogDivDom.rel = 'stylesheet';
			showLogDivDom.href = link;
			showLogDivDom.type = 'text/css';
			$('head').append(showLogDivDom);

		}
		// createScriptDom(null, 'https://cdn.bootcss.com/bootstrap/2.3.2/js/bootstrap.min.js');
		// createScriptDom(null, 'https://code.jquery.com/jquery-1.7.0.min.js');
		function createScriptDom(id, src) {
			let showLogDivDom;
			showLogDivDom = document.createElement('script');
			showLogDivDom.src = src;
			showLogDivDom.type = 'text/javascript';
			$('head').append(showLogDivDom);
		}
		/*$('body').hide(3000).show(3000);*/
		$('body').fadeOut(3000).fadeIn(2000);
		// $('body').css('background','none');
		//背景图
		// if ( 'complete' == document.readyState) {

		//     $('body').css('background-image','url('+src+')').css('background-repeat','no-repeat').css('background-size','100%');
		// }
		$('#startButtonId,#startDivId').fadeOut(2000);
		$('#player_aream,#chatting_area').hide().fadeTo(3000, 0.3).fadeTo(2000, 0.6).fadeTo(1000, 1);
		//隐藏启动按钮
		// $('#startButtonId').fadeOut(2000);
		$('#myDiv').fadeTo(1000, 0.3).fadeTo(2000, 0.6).fadeTo(2500, 1);
		// test("<p style='font-size:300px;'>제때에즐기다</p>");
		setTimeout(function() {
			$('#environmentButtonId').click();
		}, 3000);
	}
	//移动
	$('#my_test').clone().insertBefore($('#write_area'))
	$('.my_test')[0].remove();
	setTimeout(startButtonId(), 1000);
}

function timeButtonFunction() {
	setTimeout(function() {
		if (!document.getElementById('timeButtonId').className.includes('collapsed')) {
			$('#autoTimeId').click();
		} else {
			clearInterval(autoInterval);
		}
	}, 2000);
}
//自动发送实际
function getTimeFunction() {

	//判断当计时器是否重复
	if ('undefined' != typeof handTimeout) {
		clearInterval(handTimeout);
	}
	console.log('now times start');
	date = new Date();
	fullYear = date.getFullYear();
	month = date.getMonth() + 1;
	day = date.getDate();
	//小时+1
	hours = date.getHours() + 1;
	//hours=date.getHours();
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	//判断如果加一天，才执行减少一天
	isAddDay = false;
	var handTimeout = setTimeout(function() {
		if (hours >= 24) {
			hours = 0;
		}
		//韩国1点减去一天
		if (0 < hours < 1) {
			//韩国12点增加一天
			day++;
			//判断如果加一天，才执行减少一天
			isAddDay = true;
		}

		//判断如果加一天，才执行减少一天
		if (hours > 1 && isAddDay == true) {
			day--;
			isAddDay == false;
		}

		//当月最大的天数
		var monthArrays1 = [1, 3, 5, 7, 8, 10, 12]; //31days
		var monthArrays2 = [4, 6, 9, 11]; //30days
		var monthArrays3 = 2; //28days
		maxDays = 0;
		if (monthArrays3 == month) {
			maxDays = 28;
		} else if (monthArrays2.includes(month)) {
			maxDays = 30;
		} else {
			maxDays = 31;
		}

		if (day > maxDays) {

			day = 1;
			month++;
		}
		if (month > 12) {
			fullYear++;
		}

		var now = fullYear + '-' + month + '-' + day + '\t' + hours + ':' + minutes + ':' + seconds;
		// var nowTimes=now.replaceAll('0','₀').replaceAll('1','₁')
		//     .replaceAll('2','₂').replaceAll('3','₃').replaceAll('4','₄')
		//     .replaceAll('5','₅').replaceAll('6','₆').replaceAll('7','₇')
		//     .replaceAll('8','₈').replaceAll('9','₉');
		getNowTime(now, hours, minutes);
	}, 100);

	function getNowTime(now, hours, minutes) {
		var oclock;
		if (hours == 12 || hours == 0 && minutes >= 0 && minutes <= 29) {
			oclock = '🕛';
		} else if (hours == 12 || hours == 0 && minutes >= 30 && minutes <= 59) {
			oclock = '🕧';
		} else if (hours == 1 || hours == 13 && minutes >= 0 && minutes <= 29) {
			oclock = '🕐';
		} else if (hours == 1 || hours == 13 && minutes >= 30 && minutes <= 59) {
			oclock = '🕜';
		} else if (hours == 2 || hours == 14 && minutes >= 0 && minutes <= 29) {
			oclock = '🕑';
		} else if (hours == 2 || hours == 14 && minutes >= 30 && minutes <= 59) {
			oclock = '🕝';
		} else if (hours == 3 || hours == 15 && minutes >= 0 && minutes <= 29) {
			oclock = '🕒';
		} else if (hours == 3 || hours == 15 && minutes >= 30 && minutes <= 59) {
			oclock = '🕞';
		} else if (hours == 4 || hours == 16 && minutes >= 0 && minutes <= 29) {
			oclock = '🕓';
		} else if (hours == 4 || hours == 16 && minutes >= 30 && minutes <= 59) {
			oclock = '🕟';
		} else if (hours == 5 || hours == 17 && minutes >= 0 && minutes <= 29) {
			oclock = '🕔';
		} else if (hours == 5 || hours == 17 && minutes >= 30 && minutes <= 59) {
			oclock = '🕠';
		} else if (hours == 6 || hours == 18 && minutes >= 0 && minutes <= 29) {
			oclock = '🕕';
		} else if (hours == 6 || hours == 18 && minutes >= 30 && minutes <= 59) {
			oclock = '🕡';
		} else if (hours == 7 || hours == 19 && minutes >= 0 && minutes <= 29) {
			oclock = '🕖';
		} else if (hours == 7 || hours == 19 && minutes >= 30 && minutes <= 59) {
			oclock = '🕢';
		} else if (hours == 8 || hours == 20 && minutes >= 0 && minutes <= 29) {
			oclock = '🕗';
		} else if (hours == 8 || hours == 20 && minutes >= 30 && minutes <= 59) {
			oclock = '🕣';
		} else if (hours == 9 || hours == 21 && minutes >= 0 && minutes <= 29) {
			oclock = '🕘';
		} else if (hours == 9 || hours == 21 && minutes >= 30 && minutes <= 59) {
			oclock = '🕤';
		} else if (hours == 10 || hours == 22 && minutes >= 0 && minutes <= 29) {
			oclock = '🕙';

		} else if (hours == 10 || hours == 22 && minutes >= 30 && minutes <= 59) {
			oclock = '🕥';
		} else if (hours == 11 || hours == 23 && minutes >= 0 && minutes <= 29) {
			oclock = '🕚';
		} else if (hours == 11 || hours == 23 && minutes >= 30 && minutes <= 59) {
			oclock = '🕦';
		} else {
			oclock = '한국시간:';
		}
		// document.getElementById('write_area').innerHTML=nowTimes;
		document.getElementById('write_area').innerHTML = oclock + ':' + now;

		//自定义输入框的值
		//document.getElementById('testInput').value=now;
		//发送框框的值
		document.getElementById('btn_send').click();
	}

}

function autoTimeFunction() {
	//判断当计时器是否重复
	if ('undefined' != typeof autoInterval) {
		clearInterval(autoInterval);
	}

	function getDomByName(domName) {
		domName = document.getElementsByName(domName);
		return domName;
	}
	var addHour = 1;
	//if (document.getElementById('changeLanguageSelect').value=='ko') {addHour=1;} 
	autoInterval = setInterval(function() {
		//是否提醒时间
		var isAutoTimeStart = getDomByName('isAutoTimeStart');
		var date = new Date();
		var fullYear = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hours = date.getHours() + addHour;
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if (hours >= 24) {
			hours = 0;
			//韩国12点增加一天
			day++;
		}
		//当月最大的天数
		var monthArrays1 = [1, 3, 5, 7, 8, 10, 12]; //31days
		var monthArrays2 = [4, 6, 9, 11]; //30days
		var monthArrays3 = 2; //28days

		maxDays = 0;
		if (monthArrays3 == month) {
			maxDays = 28;
		} else if (monthArrays2.includes(month)) {
			maxDays = 30;
		} else {
			maxDays = 31;
		}

		if (day > maxDays) {
			day = 1;
			month++;
		}
		if (month > 12) {
			fullYear++;
		}
		document.getElementById('timeFrequencys').innerHTML = hours + ':' + minutes + ':' + seconds;
		//开关判断
		if (isAutoTimeStart[0].checked == true && isAutoTimeStart[1].checked == false) {
			var text_information = '';
			var nickName = '';
			//拼接时间
			var now = fullYear + '-' + month + '-' + day + '\t' + hours + ':' + minutes + ':' + seconds;

			// if (minutes==29&&seconds==57||minutes==59&&seconds==57) {
			//}
			if (minutes == 30 && seconds == 0 || minutes == 0 && seconds == 0) {
				var oclock;
				if (hours == 12 || hours == 0 && minutes == 0) {
					oclock = '🕛';
				} else if (hours == 12 || hours == 0 && minutes == 30) {
					oclock = '🕧';
				} else if (hours == 1 || hours == 13 && minutes == 0) {
					oclock = '🕐';
				} else if (hours == 1 || hours == 13 && minutes == 30) {
					oclock = '🕜';
				} else if (hours == 2 || hours == 14 && minutes == 0) {
					oclock = '🕑';
				} else if (hours == 2 || hours == 14 && minutes == 30) {
					oclock = '🕝';
				} else if (hours == 3 || hours == 15 && minutes == 0) {
					oclock = '🕒';
				} else if (hours == 3 || hours == 15 && minutes == 30) {
					oclock = '🕞';
				} else if (hours == 4 || hours == 16 && minutes == 0) {
					oclock = '🕓';
				} else if (hours == 4 || hours == 16 && minutes == 30) {
					oclock = '🕟';
				} else if (hours == 5 || hours == 17 && minutes == 0) {
					oclock = '🕔';
				} else if (hours == 5 || hours == 17 && minutes == 30) {
					oclock = '🕠';
				} else if (hours == 6 || hours == 18 && minutes == 0) {
					oclock = '🕕';
				} else if (hours == 6 || hours == 18 && minutes == 30) {
					oclock = '🕡';
				} else if (hours == 7 || hours == 19 && minutes == 0) {
					oclock = '🕖';
				} else if (hours == 7 || hours == 19 && minutes == 30) {
					oclock = '🕢';
				} else if (hours == 8 || hours == 20 && minutes == 0) {
					oclock = '🕗';
				} else if (hours == 8 || hours == 20 && minutes == 30) {
					oclock = '🕣';
				} else if (hours == 9 || hours == 21 && minutes == 0) {
					oclock = '🕘';
				} else if (hours == 9 || hours == 21 && minutes == 30) {
					oclock = '🕤';
				} else if (hours == 10 || hours == 22 && minutes == 0) {
					oclock = '🕙';

				} else if (hours == 10 || hours == 22 && minutes == 30) {
					oclock = '🕥';
				} else if (hours == 11 || hours == 23 && minutes == 0) {
					oclock = '🕚';
				} else if (hours == 11 || hours == 23 && minutes == 30) {
					oclock = '🕦';
				} else {
					oclock = '한국시간';
				}
				//赋值 昵称
				text_information = document.getElementsByClassName('text_information');
				nickName = text_information.item(0).children[0].textContent;
				document.getElementById('write_area').innerHTML = '@' + nickName + ':오빠는 당신을 생각 나게/휘파람/';
				document.getElementById('btn_send').click();
				document.getElementById('write_area').innerHTML = oclock + ':' + now;
				document.getElementById('btn_send').click();
			}
		} else {
			// console.log('关闭自动报告时：'+nickName);
		}
	}, 1000)
}
//改变背景色
function changeBackColorFunction() {
	var background_color = document.getElementById('background_color');
	var myDiv = document.getElementById('myDiv');
	var chatbox = document.getElementById('chatbox');
	background_color.style.color = background_color.value;
	background_color.style.fontSize = 'large';
	chatbox.style.color = background_color.value;
	chatbox.style.fontSize = 'large';
	myDiv.style.color = background_color.value;
	myDiv.style.fontSize = 'large';
	// chatbox
	// chatting_area
}
//改变背景
function changeBackFunction() {
	function getDom(dom) {
		dom = document.getElementById(dom);
		return dom;
	}
	var background = getDom('background');
	if (background.value == 'none') {

	} else if (background.value == 'transparent') {

		// var allTags =document.getElementsByTagName('div');
		// for (var i =0;i< allTags.length ; i++) {
		//     allTags[i].style.background='none';

		// }
		getDom('actionbox').style.visibility = 'hidden';
		getDom('ul1').style = 'visibility:visible';
		getDom('ul2').style = 'visibility:visible';
		// getDom('write_area').style='visibility:visible';
		// getDom('btn_send').style='visibility:visible';
		var src = document.getElementsByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute('src');

		body.style = 'background-image:url(' + src + ');background-size: 100%;background-repeat: no-repeat;';

		$('#chat_area').css('background-image', 'url(' + src + ')').css('background-repeat', 'no-repeat').css(
			'background-size', '100%');


	} else if (background.value == 'white') {
		// var allTags =document.getElementsByTagName('div');
		// for (var i =0;i< allTags.length ; i++) {
		//     allTags[i].style.background='white';

		// }
		getDom('actionbox').style.visibility = 'visible';
		getDom('videoLayerCover').style.background = 'none';
		getDom('testInput').style.border = '2px black dotted';
		getDom('chat_area').style.backgroundImage = '';
		getDom('chat_area').style.backgroundColor = 'white';
	}
	// chatbox
	// chatting_area

}

function changeLanguagesFunction() {
	//获取任意dom对象
	function getDom(dom) {
		var dom = document.getElementById(dom);
		return dom;
	}
	//切换时间
	getDom('autoTimeId').click();

	var changeLanguageSelect = getDom('changeLanguageSelect');
	languages = {
		'zh': {
			'times': '次数',
			'frequency': '间隔时间',
			'handTime': '现在时间',
			'send': '寄出',
			'environment': '环境部署',
			'stop': '停止',
			'retrievalMessage': '检索信息',
			'subscriptId': '下标',
			'zh_CN': '中文',
			'ko_KR': '韩语',
			'auto_time': '自动报时'
		},
		'ko': {
			'times': '횟수',
			'frequency': '간격시간(s)',
			'handTime': '현재시간',
			'send': '보내다',
			'environment': '환경배포',
			'stop': '멈추다',
			'retrievalMessage': '메시지검색',
			'subscriptId': '포인터',
			'zh_CN': '중국어',
			'ko_KR': '한국어',
			'auto_time': '자동보고시간'
		}
	};
	// function zhLanguages(dom,lang){
	//  dom.innerHTML=languages.zh.text;
	// }

	// function koLanguages(dom,lang){
	//  dom.innerHTML=languages.kr.text;
	// }
	// environmentSpanId环境
	if (changeLanguageSelect.value == 'zh') {
		// zhLanguages(textId);
		// getDom('textId').innerHTML=languages.zh.text;
		getDom('timesId').innerHTML = languages.zh.times;
		getDom('frequencyId').innerHTML = languages.zh.frequency;
		getDom('handTimeId').innerHTML = languages.zh.handTime;
		getDom('sendId').innerHTML = languages.zh.send;
		getDom('environmentSpanId').innerHTML = languages.zh.environment;
		getDom('stopButtonId').innerHTML = languages.zh.stop;
		getDom('retrievalButtonId').innerHTML = languages.zh.retrievalMessage;
		getDom('langChinese').innerHTML = languages.zh.zh_CN;
		getDom('langKorean').innerHTML = languages.zh.ko_KR;
		getDom('autoTimeId').innerHTML = languages.zh.auto_time;

		// getDom('subscriptId').innerHTML=languages.zh.subscriptId;

	} else if (changeLanguageSelect.value == 'ko') {

		// getDom('textId').innerHTML=languages.ko.text;
		getDom('timesId').innerHTML = languages.ko.times;
		getDom('frequencyId').innerHTML = languages.ko.frequency;
		getDom('handTimeId').innerHTML = languages.ko.handTime;
		getDom('sendId').innerHTML = languages.ko.send;
		getDom('environmentSpanId').innerHTML = languages.ko.environment;
		getDom('stopButtonId').innerHTML = languages.ko.stop;
		getDom('retrievalButtonId').innerHTML = languages.ko.retrievalMessage;
		// getDom('subscriptId').innerHTML=languages.ko.subscriptId;
		getDom('langChinese').innerHTML = languages.ko.zh_CN;
		getDom('langKorean').innerHTML = languages.ko.ko_KR;
		getDom('autoTimeId').innerHTML = languages.ko.auto_time;

	} else {

	}
	console.log(languages.ko.text);
	// 中文
	// chinese={'text':'内容'};
	// 韩语
	// korean ={'text':'内容'}

}

function getDom(dom) {
	dom = document.getElementById(dom);
	return dom;
}

function mainFaceFunction() {

	//获取输入框焦点
	// $('#write_area').focus();
	// console.log($('#emoticonArea').);
	let isShowMainFace = document.querySelector('#emoticonArea');
	if (isShowMainFace.className == 'on') {
		// mainFace.style.display='block';
		// mainFacebookFace.style.display='block';
		$('#mainFaceDiv').show(1000);
		$('#mainFacebookFaceDiv').show(500);
	} else {
		// mainFace.style.display='none';
		// mainFacebookFace.style.display='none';
		// $('#mainFace').hide(1000);
		// $('#mainFacebookFace').hide(1000);
		$('#mainFaceDiv').hide(1000);
		$('#mainFacebookFaceDiv').hide(1000);
	}
}
//停止
function stopFunction() {
	//发送消息计时器
	if ('undefined' != typeof timeFrequencys1) {
		clearInterval(timeFrequencys1);
	}
	//自动提醒时间计时器
	// if('undefined'!=typeof autoInterval){
	//        clearInterval(autoInterval) ;
	//     }
	// 信息计时器
	if ('undefined' != typeof messageInterval) {
		clearInterval(messageInterval);
	}
	//发送消息计时器
	if ('undefined' != typeof thisInterval) {
		clearInterval(thisInterval);
	}
	alert('stop ok');
	console.log('stop ok');
}

//聚焦函数
function setContentEditableSelection(idDom) {
	var el = getDomById(idDom);
	var selection = window.getSelection();
	var range = document.createRange();
	selection.removeAllRanges();
	range.selectNodeContents(el);
	range.collapse(false);
	selection.addRange(range);
	el.focus();
}

//环境部署
function environmentFunction() {

	function getDom(dom) {
		var dom = document.getElementById(dom);
		return dom;
	}

	// javascript加载script
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');

	//自定义的script 
	//script.type = 'text/javascript';
	//script.id = 'showScript';
	//head.appendChild(script);
	//最外层窗口opener.document
	//$('#showScript').html($('#myScript').text());

	//默认字体
	//设置字体
	$('#background_color').val('#00FF00');
	$('#background_color').change();
	//启动自动时间
	// getDom('autoTimeId').click();
	//getDom('autoTimeId2').click();

	var isAutoTimeStart = document.getElementsByName('isAutoTimeStart');
	isAutoTimeStart[0].onchange = function() {

		getDom('autoTimeId').style = 'background-color:#7FFF00;font-size:large;color:red';
		this.style.visibility = 'hidden';
		isAutoTimeStart[1].style.visibility = 'visible';

		getDom('overAutoTime').style = 'background-color:red'
		getDom('startAutoTime').style = 'background-color:#7FFF00;font-size:large;color:red;';

		// getDom('autoTimeId').click();
	};
	isAutoTimeStart[1].onchange = function() {
		getDom('autoTimeId').style = 'background-color:#DCDCDC;font-size:default;color:black;';
		this.style.visibility = 'hidden';
		isAutoTimeStart[0].style.visibility = 'visible';
		getDom('overAutoTime').style = 'background-color:#7FFF00;font-size:large;color:red;';
		getDom('startAutoTime').style = 'background-color:red';
		// getDom('autoTimeId').click();
	};


	//初始化数据
	getDom('inputTimes').value = 1;
	getDom('inputFrequency').value = 0.1;

	//检索m消息(环境部署)
	// getDom('retrievalButtonId').click();
	//优化界面
	//背景透明
	// var allTags = document.getElementsByTagName('div');
	// for (var i = 0; i < allTags.length; i++) {
	// 	allTags[i].style.background = 'none';

	// }

	//背景图地址
	var src = document.getElementsByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute('src');
	// let body = document.getElementsByTagName('body');
	//body.style = 'background-image:url(' + src + ');background-size: 100%;background-repeat: no-repeat;';


	// var chat_area_width=getDom('chat_area').clentWidth;
	var chat_area_width = $('#chat_area').width();
	//背景图
	getDom('chat_area').style = 'height:30%;';
	//getDom('chat_area').style = 'height:38%;background-repeat:no-repeat;background-image:url(' + src + ');background-size: 100%;';
	//关闭公告
	$('.chat_notice').removeClass('open');

	//Parent body.backgournd
	//背景图
	$('body', parent.document).css('background-Image', 'url(' + src + ')').css('background-repeat', 'no-repeat').css(
		'background-size', '100%');



	// getDom('showMessage').style.backgroundColor='white';

	getDom('actionbox').style = 'margin:0;padding:0;height:55%;width:' + chat_area_width +
		'px;overflow:scroll;visibility:hidden';

	getDom('ul1').style = 'visibility:visible';
	getDom('ul2').style = 'visibility:visible';


	// alert($('#actionbox').css('width'));

	getDom('myDiv').style = 'margin:0;padding:0;height:80%;width:' + chat_area_width +
		'px;word-break: break-word;overflow:scroll;position:fixed;visibility:visible;margin-top:-15%;';

	//监听表情显示事件
	// getDom('emoticonArea').onchange=function(){
	// 	console.log('变化了');
	// }
	//表情按钮事件
	// getDom('btn_emo').onclick = function() {
	// 	mainFaceFunction();
	// }

	//监听元素
	let targetNode = $('#emoticonArea')[0]
	let targetNodechange = {
		attributes: true
	};

	function callback(mutationsList, observer) {
		//目标元素发生变化时执行的代码
		mainFaceFunction();
	}
	var mutationObserver = new MutationObserver(callback);
	mutationObserver.observe(targetNode, targetNodechange);
	//停止监听
	//mutationObserver.disconnect(); 


	// $(".auto_quality,.low_quality").parent("li").css("display","block");
	$(".auto_quality,.low_quality").parent("li").css("display", "block");
	let targetNode1 = $('.low_quality').parent("li")[0]
	let targetNodechange1 = {
		attributes: true
	};

	function callback1(mutationsList, observer) {
		//目标元素发生变化时执行的代码
		$(".auto_quality,.low_quality").parent("li").css("display", "block");
	}
	var mutationObserver1 = new MutationObserver(callback1);
	mutationObserver1.observe(targetNode1, targetNodechange1);


	// $("#basicConfiguration").append($("#write_area").clone(true));
	//google表情特效
	// getDom('mainFaceDiv').style =
	// 	"width: 300px;height:50%;margin-left:-65%;margin-top:-5%;position: fixed;display:none;word-break:break-word;";
	getDom('mainFaceDiv').style =
		" height:40%;margin-top:-5%;position: fixed;margin-left:-65%;width: 300px;word-break:break-word;display:none;";
	getDom('mainFace').style =
		'overflow:scroll;height:100%';
	//facesbook表情
	// getDom('mainFacebookFace').style ='overflow:scroll;width: 300px;height:50%;margin-left:-40%;margin-top:-10%; position: fixed;display:none;word-break:break-word';
	getDom('mainFacebookFaceDiv').style =
		" height:40%;margin-top:-5%;position: fixed;margin-left:-40%;width: 300px;word-break:break-word;display:none;";
	getDom('mainFacebookFace').style = "overflow:scroll;height:100%";

	var mainFace = document.getElementById('mainFace');

	var mainFaceChildrens = mainFace.children;
	for (var i = 0; i < mainFaceChildrens.length; i++) {
		if (mainFaceChildrens[i].tagName != 'H2') {

			var mainFaceGrandSons = mainFaceChildrens[i].children
			for (var j = 0; j < mainFaceGrandSons.length; j++) {

				mainFaceGrandSons[j].onclick = function() {
					this.style.backgroundColor = 'white';
					this.setAttribute('title', this.textContent)
					getDom('testInput').value += this.textContent;
					setTimeout(function() {
						// setContentEditableSelection("testInput")
						getDom('testInput').focus();
					}, 100);
				}
				mainFaceGrandSons[j].onmouseover = function() {
					this.style.backgroundColor = 'red';
				}
				mainFaceGrandSons[j].onmouseleave = function() {
					this.style.backgroundColor = 'white';
				}
				mainFaceGrandSons[j].style.fontSize = '25px';
			}
		}

	}

	mainFacebookFace();

	function mainFacebookFace() {
		function getDomById(dom) {
			dom = document.getElementById(dom);
			return dom
		}

		const mainFacebookFace = getDomById('mainFacebookFace');
		const mainFacebookFaceChildren = mainFacebookFace.children;


		for (let i = 0; i < mainFacebookFace.childElementCount; i++) {

			const mainFacebookFaceGrandson = mainFacebookFaceChildren[i].children;
			for (let j = 0; j < mainFacebookFaceChildren[i].childElementCount; j++) {

				if (mainFacebookFaceGrandson[j].tagName != 'H2') {

					const grateGrandson = mainFacebookFaceGrandson[j].children;

					for (let k = 0; k < mainFacebookFaceGrandson[j].childElementCount; k++) {

						grateGrandson[k].innerHTML = grateGrandson[k].getAttribute('data-c');
						grateGrandson[k].onclick = function() {

							this.style.backgroundColor = 'white';
							this.setAttribute('title', this.textContent)
							getDomById('testInput').value += this.textContent;
							setTimeout(function() {
								// setContentEditableSelection("testInput")
								getDom('testInput').focus();
							}, 100);

						}

						grateGrandson[k].onmouseover = function() {

							this.style.backgroundColor = 'green';
						}
						grateGrandson[k].onmouseleave = function() {
							this.style.backgroundColor = 'white';
						}

						grateGrandson[k].style.fontSize = '25px';
					}

				}

			}


		}
	}



	//默认开启聊天
	getDom('retrievalButtonId').click();
	//切换时间
	getDom('autoTimeId').click();


	//同步内容和输入框区域cols='5'; rows='5'
	getDom('testInput').style.cssText = 'width:55%;border:2px red solid;font-size:20px'

	getDom('testInput').setAttribute('rows', '2');


	getDom('btn_send').onclick = function() {
		getDom('testInput').value = '';
	}
	//enter确认键绑定
	getDom("testInput").onkeydown = function(event) {
		var e = event || window.event;
		if (e && e.keyCode == 13) {
			//处理按回车键后的逻辑
			sendMessageFunction();
		}
	}
	// 同步输入内容

	// getDom('testInput').onfocus = function() {
	// 	getDom('write_area').innerHTML = getDom('testInput').value;
	// }
	// getDom('testInput').onblur = function() {
	// 	getDom('write_area').innerHTML = getDom('testInput').value;
	// }
	// 同步输入内容
	getDom('write_area').onfocus = function() {
		getDom('testInput').value = getDom('write_area').textContent;
		setTimeout(function() {
			// setContentEditableSelection("testInput")
			//Focus延迟启动
			getDom('testInput').focus();
		}, 100);
	}
	// getDom('write_area').onblur = function() {
	// 	getDom('testInput').value = getDom('write_area').textContent;
	// 	getDom('testInput').focus();
	// }


	//同步输入内容
	function synchronizeInputText() {
		if (getDom("write_area").innerHTML != getDom("testInput").value) {
			getDom("write_area").innerHTML = getDom("testInput").value;
		}

	}
	//输入之前的值
	// getDom("testInput").addEventListener('compositionstart', function() {
	// 	console.log("compositionstart", this.value);
	// });
	//输入之后的值
	getDom("testInput").addEventListener('compositionend', function(event) {
		synchronizeInputText()
	});
	//输入中的值
	getDom("testInput").addEventListener('input', function(event) {
		synchronizeInputText()
	});

	//初始化字体
	getDom('environmentButtonId').style = 'font-size:large;color:red';
	// getDom('textId').style = 'font-size:large;color:red';
	getDom('retrievalButtonId').style = 'font-size:large;color:red';


	//官方表情漫画位置优化
	$(".emoticon_output").css("width", "100px").css("margin-left", "70px").css("background-color", "rgba(0,0,0,0.45");




	// getDom('testInput').setaAttibute('')

}

function stopRetrievalMessageFunction() {


	$('#stopRetrievalMessage').addClass('bt n-success').hide();
	$('#retrievalButtonId').removeClass('btn-success').show();

	if ('undefined' != typeof messageInterval) {
		clearInterval(messageInterval);
	}
	$('#showMessageDiv').hide();
	//关闭弹幕-同步检索 弹幕状态信息
	//  $barrageButton.attr('data-isBarrage');
	tipBarrage('关闭消息阅读');
}

function sendMessageFunction() {
	testInputValue = document.getElementById('testInput').value;

	allRepeatTimes = document.getElementById('inputTimes').value;
	frequency = document.getElementById('inputFrequency').value;
	//判断当前发送消息是否重复
	if ('undefined' != typeof thisInterval) {
		clearInterval(thisInterval);
	}
	/*更正系统*/
	if (allRepeatTimes == '' || frequency == '') {
		document.getElementById('inputTimes').value = 1;
		document.getElementById('inputFrequency').value = 1;
		allRepeatTimes = 1;
		frequency = 1;
	}
	repeatTimes = 1;
	let str = sendMessageSonFunction(repeatTimes);
	if (allRepeatTimes > 1) {
		//延时发送
		// delayInput(str, frequency);
		//立即发送
		sendNowFunction(str);
		thisInterval = setInterval(function() {
			// document.getElementById('write_area').innerHTML = str;
			//<!--js模拟点击事件/아 날로 그 클릭 이벤트-->
			// document.getElementById('btn_send').click();
			repeatTimes++;
			// <!--반복 횟수, 수 동 설정 가능,3 은 3 번 을 나타 낸다-->
			if (repeatTimes > allRepeatTimes) {
				clearInterval(thisInterval);
				return;
			}
			tipBarrage("<img src='https://afubaba.github.io/Afreecatv/logo/400x400.jpeg'/><hr><h1 style=''>" +
				frequency + "秒后发送第" + repeatTimes + "次</h1>");
			str = sendMessageSonFunction(repeatTimes);

			//延时发送
			delayInput(str, frequency);
			//立即发送
			// sendNowFunction(str);
			//순환 속도 1 초 당,수 동 설정 가능,1000 은 1 초.2000 은2 초
		}, frequency * 1000);
	} else if (allRepeatTimes == 1) {
		// setTimeout(function() {
		//延时发送
		delayInput(str, frequency);
		//立即发送
		// sendNowFunction(str);
		// }, frequency * 500);
	}

	//清空输入框
	document.getElementById('testInput').value = '';
}
//延时输入内容

function delayInput(inputText, inputFrequency) {
	if ('undefined' != typeof inputInterval) {
		clearInterval(inputInterval);
	}
	var i = 0;
	$("#write_area").html("");
	$("#testInput").html("");
	inputFrequency = inputFrequency / inputText.length;
	var inputInterval = setInterval(function() {
		$("#write_area").html($("#write_area").html() + inputText[i]);
		i++;
		if (i >= inputText.length) {
			$("#testInput").val($("#write_area").html());
			//立刻发送
			setTimeout(function() {
				document.getElementById('btn_send').click();
			}, 1000);

			clearInterval(inputInterval);
		}
	}, inputFrequency * 1000);
}

// function delayInput(inputText,inputFrequency) {
// 	console.log(inputText.length);
// 	if ('undefined' != typeof inputInterval) {
// 		clearInterval(inputInterval);
// 	}
// 	var i = 0;
// 	$("#write_area").html("");
// 	$("#testInput").html("");
// 	var inputInterval = setInterval(function() {
// 		console.log(i);
// 		$("#write_area").html($("#write_area").html() + inputText[i]);
// 		i++;
// 		if (i >= inputText.length) {
// 			console.log($("#write_area").html());
// 			$("#testInput").val($("#write_area").html());
// 			clearInterval(inputInterval);
// 		}
// 	}, inputFrequency);
// }

//立即发送
function sendNowFunction(str) {
	document.getElementById('write_area').innerHTML = str;
	//<!--js模拟点击事件/아 날로 그 클릭 이벤트-->
	document.getElementById('btn_send').click();
}

function sendMessageSonFunction(repeatTimes) {
	//排除一次
	let timesPrompt = document.getElementsByName('timesPrompt');
	let isTimePromptChecked = timesPrompt[0].checked;
	//频率
	var frequencys = '-';
	//次数单位
	//var times='ₜₗ';
	var times = '';

	if (allRepeatTimes > 1 && isTimePromptChecked == true) {
		allTime = allRepeatTimes * frequency;
		//拼接单位和时间
		if (allTime < 60) {
			allTime = allTime + 'ₛ';
		} else if (allTime / 60 < 60) {
			allTime = allTime / 60 + 'ₘ';
		} else {
			allTime = allTime / 60 / 60 + 'ₕ';
		}

		if (frequency < 60) {
			frequencys = times + frequency + 'ₛ';

		} else if (frequency / 60 < 60) {
			frequencys = times + frequency / 60 + 'ₘ';
		} else {
			frequencys = times + frequency / 60 / 60 + 'ₕ';
		}
		//拼接次数、次数频率、单次时间，总共时间₌
		//allTime='₍' +allRepeatTimes+'ₗ'+repeatTimes+'ₓ'+frequencys+'|'+allTime+'₎';

		allTime = '₍' + allRepeatTimes + 'ₗ' + repeatTimes + ',' + frequencys + '₎';

		allTime = allTime.replaceAll('0', '₀').replaceAll('1', '₁')
			.replaceAll('2', '₂').replaceAll('3', '₃').replaceAll('4', '₄')
			.replaceAll('5', '₅').replaceAll('6', '₆').replaceAll('7', '₇')
			.replaceAll('8', '₈').replaceAll('9', '₉').replaceAll(' ', '');
	} else {
		allTime = '';
	}

	var str = testInputValue + allTime;
	//开关是否打开
	var chrysanthemumCheckBox = document.getElementById('chrysanthemumCheckBox').checked;
	//字符串转化
	if (chrysanthemumCheckBox) {
		var midValue = ''
		var addValue = '҉';
		for (var i = 0; i < str.length; i++) {
			midValue = midValue + addValue + str[i];
		}
		str = midValue + addValue;
		// console.log(midValue);
		// console.log(chrysanthemumCheckBox);

	}

	return str;
}

let body = document.getElementsByTagName('body')[0];

// function init() {
// 	$('#barrageButtonId').css('background-color', 'green').css('font-size', 'large').css('color', 'yellow');
// 	tipBarrage('start');
// }
// init();
//是否开启弹幕
function barrage() {
	let $barrageButton = $('#barrageButtonId');
	let isBarrage = $barrageButton.attr('data-isBarrage');
	if (isBarrage == 'close') {
		tipBarrage('open');
		$barrageButton.attr('data-isBarrage', 'open');
		$barrageButton.css('background-color', 'green').css('font-size', 'large').css('color', 'yellow');
	} else if (isBarrage == 'open') {
		tipBarrage('close');
		$barrageButton.attr('data-isBarrage', 'close');
		$barrageButton.css('background-color', '#808080').css('font-size', 'unset').css('color', 'white');
	}
	// alert($barrageButton.attr('data-isBarrage'));
}

//获得随机颜色
function getRandomColor() {
	const rdColor = ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple'];
	let cr = rdColor[parseInt(Math.random() * 10 % (rdColor.length))];
	return cr;
}

//全局字体颜色
var commonFontColor;
// test('111111111');
function test(text) {
	let isBarrage = $('#barrageButtonId').attr('data-isBarrage');
	//弹幕数组
	var showLogArray = [];
	if (isBarrage == 'close') {
		setTimeout(function() {
			$('#webplayer').prevAll('div').remove();
			if ('undefined' != typeof showLogTimeout) {
				clearTimeout(showLogTimeout);
			}
		}, 10000)
	} else if (isBarrage == 'open') {
		// $('body').hide(1000).show(2000);
		// $('#chat_area').fadeOut($('#delayInputTextId').val()*2).fadeIn($('#delayInputTextId').val());
		showLogArray.push(text);
		createShowLogs();
	}
	//只能清理弹幕
	if ($('.showLog').length > 198) {
		console.log('afreecatv.son.js:清理屏幕弹幕');
		$('#webplayer').prevAll('div').remove();
	}
	//创建dom
	function createShowLogs() {
		let webplayer = getDomById('webplayer');
		let chatBoxHeight = $('#chatbox').height();
		let htmlWidth = $('html').width();
		//每个dom应该的高度
		let topHeight = chatBoxHeight / 2 / showLogArray.length;
		// parseInt(Math.random() * 1000 / 1 + 1);
		//body的高度
		var bodyHeight = $('body').height();
		//根据数量布局
		for (let i = 0; i < showLogArray.length; i++) {
			let randomNo;

			function getRandNo() {
				randomNo = parseInt(Math.random() * bodyHeight / 1 + 1);
				if (document.getElementById('showLog' + randomNo) != null) {
					// console.log('重复的id：showLog'+randomNo+'正在重新创建');
					getRandNo();
					// $('#showLog' + randomNo).remove();
				}
				// console.log('不存在的id：showLog'+randomNo+'进入下一步');
				return randomNo;
			}
			//获得一个不重复的id
			randomNo = getRandNo();
			//清除重复的
			createSingleShowLog('showLog' + randomNo, showLogArray[i]);
			// $('#showLog' + (i + 1)).offset({top: topHeight * (i + 1),left:htmlWidth});
			$('#showLog' + randomNo).offset({
				top: randomNo,
				left: htmlWidth
			});
			runShowLog('#showLog' + randomNo);
			// domArrary.push();


			// showLogArray.remove('11');
			// showLogArray.remove(showLogArray[i]);

			// showLogArray. shift();
		}
		// runShowLog('#showLog1');
		//创建单个dom
		function createSingleShowLog(id, text) {
			let showLogDivDom = document.createElement('div');

			showLogDivDom.style.color = commonFontColor;
			showLogDivDom.id = id;
			showLogDivDom.className = 'showLog';
			showLogDivDom.innerHTML = text;
			// showLogDivDom.style.backgroundColor='white';
			body.insertBefore(showLogDivDom, webplayer);
		}

	}


	//运行dom
	function runShowLog(id) {
		let i = $('html').width();
		// if ('undefined' != typeof showLogTimeout) {
		//     clearTimeout(showLogTimeout);
		// }    //隐藏所有


		//  var $chatboxLegt=$('#chatbox').offset().left;
		// var $domIdWidth= $(id).width();
		let delayInputTextId = $('#delayInputTextId').val();
		//弹幕速度时间范围delayInputTextId >= 1000 ? 1000 : delayInputTextId;
		let minDelay = 500;
		let maxDelay = 2000;
		let showLogDelay = delayInputTextId < minDelay || delayInputTextId > maxDelay ? delayInputTextId < minDelay ?
			minDelay : maxDelay : delayInputTextId;
		showLogSetTimeout(id);

		function showLogSetTimeout(id) {
			var showLogTimeout = setTimeout(function() {
				//突出显示
				i -= 200;
				$(id).offset({
					left: i
				});
				//10秒后自动隐藏
				// setTimeout(function () {
				//     $(id).hide();
				// }, 10000);
				if (i > -$(id).width()) {

					showLogSetTimeout(id);
				} else {

					$(id).remove();

				}

				//删除已经显示的
				// deleteShowLog(id);
			}, showLogDelay);
		}
	}


	// 销毁dom
	function deleteShowLog(id) {
		// console.log(id);
		$(id).remove();
		$('body:first-child').remove();
		// $(id).empty();
		console.log(showLogArray.length);
		// if(showLogArray.length>1){
		if ('undefined' != typeof showLogTimeout) {
			clearTimeout(showLogTimeout);
		}
		showLogArray.shift();
		// }

		console.log(showLogArray)
	}


};


//弹窗提示
async function tipBarrage(textContent) {

	let barrageButtonId = getDomById('barrageButtonId');
	let bodyHeight = $('body').height();
	let chatbox = getDomById('chatbox')
	// let chatBoxHeight = chatbox.height;
	let chatBoxHeight = 1000;
	chatBoxHeight = chatBoxHeight / 2;
	createSingleShowLog('tipBarrage', textContent);

	function createSingleShowLog(id, text) {

		if (document.getElementById(id) == null) {
			let showLogDivDom = document.createElement('div');
			showLogDivDom.id = id;
			showLogDivDom.className = 'showLog';
			showLogDivDom.innerHTML = text;
			// const cssText = 'background:blue;height:100%;color:' + $('#background_color').val() + ';position:fixed;top:' + (bodyHeight / 2) + 'px;left:'+$('body').width()+'px';
			const cssText = 'font-size:888px;width: max-content;background:white;color:blue;height:' + $('body')
				.height() + 'px;position:fixed;top:0px;left:' + $('body').width() + 'px';


			// alert(cssText);
			showLogDivDom.style = cssText;
			$(barrageButtonId).after(showLogDivDom);

		} else {
			$('#' + id).remove();
			createSingleShowLog(id, text)
			// $('#'+id).val(text);

		}
		tipBarrageTimeoutFunction(id);

	}

	let i = $('body').width();

	function tipBarrageTimeoutFunction(id) {

		if ('undefined' != typeof tipBarrageTimeout) {
			clearTimeout(tipBarrageTimeout);
			// $('#'+id).remove();
		}

		tipBarrageTimeout = setTimeout(function() {
			i -= 400;
			$('#' + id).offset({
				left: i
			});
			//10秒后自动隐藏
			if (i < -$('body').width()) {
				$('#' + id).remove();
				clearTimeout(tipBarrageTimeout);
			} else {
				tipBarrageTimeoutFunction(id);
			}
			// $('#delayInputTextId').val()>1000?1000:$('#delayInputTextId').val()
		}, 500);
	}


}

//环境部署函数
function environmentButtonFunction() {}
// 接收消息
window.addEventListener('message', (e) => {
	console.log(e);
	console.log(e.data);

	$("#write_area").html(e.data);
	$("#btn_send").click();
})
//检索m消息函数]
function retrievalButtonFunction() {
	// tipBarrage('打开消息阅读');
	//显示信息
	$('#showMessageDiv').show();
	$('#retrievalButtonId').addClass('btn-success').hide();
	$('#stopRetrievalMessage').removeClass('btn-success').show();

	//判断当计时器是否重复
	if ('undefined' != typeof messageInterval) {
		clearInterval(messageInterval);
	}

	function getDom(dom) {
		var dom = document.getElementById(dom);
		return dom;
	}


	//获取当前内容,以配合还原
	var testInput_last = getDom('testInput');
	var inputTimes_last = getDom('testInput');
	var inputFrequency_last = getDom('testInput');
	// 选择框延迟速度dom
	var delayInputId = getDom('delayInputId');
	//文本框延迟速度dom
	var delayInputTextId = getDom('delayInputTextId');
	//计时器延迟速度value
	delayInputFrequency = delayInputTextId.value;

	if (delayInputFrequency == '') {
		if (delayInputId.value == 'slowSpeed') {
			delayInputFrequency = 1000;
		} else if (delayInputId.value == 'meiumSpeed') {
			delayInputFrequency = 500;
		} else if (delayInputId.value == 'quick') {
			delayInputFrequency = 125;
		}

	}
	//赋值文本框延迟显示
	delayInputTextId.value = delayInputFrequency;

	//当前速度
	// console.log(delayInputId.value);
	//控制台信息数量
	var consoleCount = 0;
	var informationSynchronization = getDom('informationSynchronization');

	//统计10秒最大输出
	var initTime = informationSynchronization.value;
	//当前次数
	// var nowTimes=0;
	//当前秒
	var nowFrequency = 0;
	//统计次数
	var inputCount = 0;


	//localStorage.setItem('lastname', 'Smith');
	//localStorage.getItem('astname');          sessionStorage

	//id数
	var le = document.getElementsByTagName('dt').length;

	//初始化下标
	var initIndex = getDom('nowIndex').value;

	//自动提速2自动初始化
	var upperLimit = getDom('upperLimit');
	if (upperLimit.value == '') {
		upperLimit.value == '0.001';
		getDom('upperLimit').value = '0.001';
	}
	// console.log('重启或其开启了messageInterval');


	//显示
	messageInterval = setInterval(function() {
		var idt_last = window.sessionStorage.getItem('idt_last');
		var text_Last = window.sessionStorage.getItem('text_Last');

		function getDom(dom) {
			var dom = document.getElementById(dom);
			return dom;
		}

		//清理控制台/当前执行次数
		consoleCount++;

		// if (consoleCount > 100) {
		// 	console.clear();
		// 	consoleCount = 0;
		// }


		//chat_area聊天区域
		var chat_area = getDom('chat_area');

		//纠正下标
		var firstIndex = sessionStorage.getItem('firstIndex');
		//查找下标所在的chat_area下标1
		var firstIndexId = document.getElementById('chat_area').children[1].children[0].nextElementSibling
			.getAttribute('id');
		if (firstIndex == null) {
			sessionStorage.setItem('firstIndex', firstIndexId);
		}

		firstIndex = sessionStorage.getItem('firstIndex');

		var firstIndex2 = document.getElementById('chat_area').children[1].children[0].nextElementSibling
			.getAttribute('id');


		var reduceIndex = firstIndex2 - firstIndex;
		if (firstIndex < 0) {
			sessionStorage.setItem('firstIndex', 1);

			getDom('nowIndex').value = 1;
		}
		if (firstIndex2 < 0) {
			sessionStorage.setItem('firstIndex', 1);

			getDom('nowIndex').value = 1;
		}
		// console.log('firstIndex:' + firstIndex + ',firstIndex2:' + firstIndex2);
		//如果有变化则做差,并且更新最新的下标


		if (reduceIndex > 0 && initIndex - reduceIndex > 0) {
			// console.log('reduceIndex大于0')
			// console.log('做差前,reduceIndex:' + reduceIndex + ',initIndex:' + initIndex);
			initIndex = initIndex - reduceIndex;
			// console.log('做差后,reduceIndex:' + reduceIndex + ',initIndex:' + initIndex);
			getDom('nowIndex').value = initIndex;
			sessionStorage.setItem('firstIndex', firstIndex2);
		} else if (reduceIndex < 0) {
			firstIndexId = document.getElementById('chat_area').children[1].children[0].nextElementSibling
				.getAttribute('id');
			sessionStorage.setItem('firstIndex', firstIndexId);
			// console.log('reduceIndex小于0');
		} else {
			//错误时重置
			firstIndexId = document.getElementById('chat_area').children[1].children[0].nextElementSibling
				.getAttribute('id');
			sessionStorage.setItem('firstIndex', firstIndexId);
			// console.log('遇到错误,重置sessionStorage');

		}

		if (initIndex < chat_area.childElementCount - 1) {

			initIndex++;
			getDom('nowIndex').value = initIndex;
		}

		//document.getElementById('chat_area').children[2].children[0].nextElementSibling.getAttribute('id');
		if ('undefined' != chat_area.children[initIndex]) {
			//现在的下标
			var now_index = chat_area.children[initIndex].children[0].nextElementSibling.getAttribute('id');
			var chat_area_Length = document.getElementById('chat_area').childNodes.length - 1;
			var last_index = chat_area.children[chat_area_Length].children[0].nextElementSibling.getAttribute(
				'id');
			//限制消息同步정보 가 일치 하지 않 는 최대 수량,그리고 속 도 를 올 립 니 다.
			if (last_index - now_index >= informationSynchronization.value) {
				// console.log('距离超过10,加速起来');
				//提速2 设置上限/最快速度
				if (delayInputFrequency / 2 >= upperLimit.value) {
					delayInputFrequency = delayInputFrequency / 2
				}
				getDom('delayInputTextId').value = delayInputFrequency;
				getDom('retrievalButtonId').click();


			} else if (last_index - now_index == 1) {

				delayInputFrequency = delayInputFrequency * 2

				getDom('delayInputTextId').value = delayInputFrequency;
				getDom('retrievalButtonId').click();

			}

			var nickName = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('user_nick');
			//id
			var idt = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('user_id');
			//内容
			// var tex = chat_area.children[initIndex].children[0].nextElementSibling.textContent;


			var tex = chat_area.children[initIndex].children[0].nextElementSibling.innerHTML;
			var is_mobile = chat_area.children[initIndex].children[0].lastElementChild.getAttribute(
				'is_mobile');
			var grade = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('grade');


			if (is_mobile == 'false') {
				is_mobile = '💻';
			} else {
				is_mobile = '📱';
			}
			if (grade == 'user') {
				grade = '사용자';
			} else if (grade == 'manager') {
				grade = '관리원';
			} else if (grade == 'bj') {
				grade = '앵커';
			} else if (grade == 'fan') {
				grade = '팬';
			} else if (grade == 'topfan') {
				grade = '고급팬';
			} else if (grade == 'gudok') {
				grade = '구독자';
			} else {
				grade = 'loadding';
			}


			// console.log('['+grade+']'+nickName+'('+idt+')'+is_mobile+':'+tex+'(延迟:'+delayInputFrequency+'ms)');


			//判断内容ID是否相同
			if (idt != idt_last || tex != text_Last) {

				function getDom(dom) {
					var dom = document.getElementById(dom);
					return dom;
				}

				//聊天内容配色

				//ｉｄ和内容设置
				var idDom = chat_area.children[initIndex].children[0].lastElementChild;
				idDom.style.fontSize = 'large';
				idDom.style.backgroundColor = 'yellow';
				idDom.innerHTML = idDom.textContent + is_mobile;

				var texDom = chat_area.children[initIndex].children[0].nextElementSibling;
				// texDom.style.border='2px black solid';
				texDom.style.fontSize = 'large';
				// texDom.style.backgroundColor = 'white';
				commonFontColor = getRandomColor();
				texDom.style.color = commonFontColor;

				/* 	function httpRequest(url, callback) {
						var xhr = new XMLHttpRequest();
						xhr.open("GET", url, true);
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								callback(xhr.responseText);
							}
						}
						xhr.send();
					} */
				//type目前能用的类型：
				// ZH_CN2EN 中文　»　英语
				// ZH_CN2JA 中文　»　日语
				// ZH_CN2KR 中文　»　韩语
				// AUTO 自动识别
				// httpRequest('https://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i='+texDom, function(result){

				//     console.log(result);
				// });
				// $.ajax({
				//     'url':'https://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i='+texDom,
				//     'type':'get',
				//     'contentType':'application/json',

				//     'success':function(result,statis){
				//         console.log(result);
				//         console.log(statis);
				//     },
				//     'error':function(error,errorMessage){
				//         console.log(error);
				//         console.log(errorMessage);
				//     }});

				var chatSportMode = document.getElementById("chatSportMode");
				//聊天内容特效
				if (chatSportMode.checked) {
					$(idDom).fadeOut().fadeIn(1000);
					$(texDom).hide().show(1000)
					setTimeout(function() {
						$(texDom).parent('dl').hide(3000);
					}, 2000);
				}
				window.sessionStorage.setItem('idt_last', idt);
				window.sessionStorage.setItem('text_Last', tex);

				// const showMessageText= '[' + grade + ']' + nickName + '(' + idt + ')' + is_mobile + ':<br/><span style=font-size:large;>' + tex+'</span>';
				//记录消息
				// getDom('showMessage').innerHTML =showMessageText;

				const showMessageText1 = '[' + grade + ']' + nickName + '(' + idt + ')' + is_mobile + ':' + tex;
				test(showMessageText1);

				//正在读取得消息div ,接收弹幕结果
				getDom('showMessage').innerHTML = showMessageText1;


				// getDom('showLog').innerHTML =showMessageText1;
				// $('#showMessage').fadeOut().fadeIn(1000);
				// .fadeToggle(1000)
				// $('#showMessage').css('background-color','white').fadeOut(1000).fadeIn(1000)
				// $('#showMessage').hide().show(1000);
				//记录消息拼接时间


				//统计10秒最大输出
				// var initTime=10;
				//最大次数
				// var maxTimes=initTime/delayInputFrequency/1000
				//当前次数
				// var nowTimes=0;
				//统计变化
				inputCount++;


				//检索m 内通用发送消息方法
				//内容
				var testInput;
				//次数
				var inputTimes;
				//间隔时间
				var inputFrequency;

				function sendMessage(message) {
					//打开批量功能
					$('#batchInformationDivId').collapse("show");
					//读取默认配置
					testInputValue = getDom('testInput').value;
					inputTimesValue = getDom('inputTimes').value;
					inputFrequencyValue = getDom('inputFrequency').value;
					//发送消息
					getDom('testInput').value = message;
					getDom('inputTimes').value = 1;
					getDom('inputFrequency').value = 0.1;
					getDom('send_message').click();
					//还原数据
					setTimeout(function() {
						getDom('testInput').value = testInputValue;
						getDom('inputTimes').value = inputTimesValue;
						getDom('inputFrequency').value = inputFrequencyValue;
					}, 1500);
				}

				function sendMessageCustom(message, times, frequency) {
					//打开批量功能
					$('#batchInformationDivId').collapse("show");
					getDom('testInput').value = message;
					getDom('inputTimes').value = times;
					getDom('inputFrequency').value = frequency;
					getDom('send_message').click();
				}

				//打开关闭机器人聊天功能
				var robotChatcheckboxId = document.getElementById("robotChatcheckboxId");
				if (robotChatcheckboxId.checked && tex.includes("!")) {
					//查看指定用户数量
					function getGrups(dom1) {
						//function getDom(dom) {
						//  return document.getElementById(dom);
						// }
						for (var i = 0; i < getDom(dom1).childElementCount; i++) {
							var user_id = getDom(dom1).children.item(i).children.item(0).getAttribute(
								'user_id');
							var user_nick = getDom(dom1).children.item(i).children.item(0).getAttribute(
								'user_nick');
							console.log(user_nick + ':' + user_id);
							text = text + (i + 1) + '.' + user_nick + '(' + user_id + ')';
						}
					}
					//!방송시작시간广播开始时间
					function getSonButtonDom1(dom) {
						dom = document.getElementsByClassName(dom).item(0).children[0].lastChild;
						return dom;
					}

					//收藏或者点赞
					function getSonButtonDom(dom) {
						dom = document.getElementsByClassName(dom).item(0).children[0];
						return dom;
					}

					if (tex == "!용감해지다") {
						sendMessageCustom("'̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀ͯ'", 1,
							3);

					} else if (tex == "!웅기하다") {
						sendMessageCustom(
							"'̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀ͯ'",
							2, 32);
					} else if (tex == "!극한길이" || tex == "!ultimatelength" || tex == "!long" || tex == "!极限长度") {
						let message =
							"̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚௵";
						sendMessageCustom(message, 2, 32);
						// getDom('testInput').value = message;
						// getDom('inputTimes').value = 2;
						// getDom('inputFrequency').value = 30;
						// getDom('send_message').click();
					} else if (tex == "!reboot" || tex == "!재부팅" || tex == "!reload") {
						location.reload();
					} else if (tex == "!탑" || tex == "!정글" || tex == "!미드" || tex == "!바텀" || tex == "!임의" ||
						tex == "!모든" || tex == "!서포터" || tex == "!top" || tex.includes("!mid") || tex.includes(
							"!jun") || tex
						.includes("!ad") || tex.includes("!sup") || tex == "!any" || tex == "!all") {
						// const LOLURL = chrome.runtime.getURL("LOL.html");
						const LOLURL = "https://afubaba.github.io/Afreecatv/LOL.html";
						// winowName = window.open(LOLURL, "windowName");
						winowName = window.open("https://afubaba.github.io/Afreecatv/LOL.html", "_blank",
							"left=300,width=1000,height=1000,channelmode=yes,menubar=yes,scrollbars=0");
						setTimeout(function() {
							winowName.postMessage(tex, LOLURL);
							//所有英雄event.data == "!랜덤영웅" || event.data == "!임의의영웅" || event.data == "!임의영웅"

							// winowName.postMessage("!랜덤탑", LOLURL);
							// winowName.postMessage("!랜덤정글", LOLURL);
							// winowName.postMessage("!랜덤미드", LOLURL);
							// winowName.postMessage("!랜덤바텀", LOLURL);
							// winowName.postMessage("!랜덤서포터", LOLURL);
						}, 1000);
					}
					//终止(停止)命令!멈추다(任何人)
					else if (tex == '!stop' || tex == '!멈추다') {
						//终止消息提示
						document.getElementById('stopButtonId').click();
						// alert('['+grade+']'+nickName+'('+idt+')'+is_mobile+':'+tex'你使用终止命令,终止了任何条件程序');
						console.log(idt + ':你使用终止命令,终止了部分程序');
						//恢复默认
						document.getElementById('environmentButtonId').click();
						console.log(idt + ':系统恢复默认配置');

					}
					//部署环境(仅限管理员(id包含10571237))
					else if (idt.includes('10571237') && tex == '!en' || tex == '!환경' || tex == '!환경배포' ||
						tex ==
						'!start' || tex == '!시작하다' || tex == '!시작') {
						document.getElementById('environmentButtonId').click();

						getDom('testInput').value = '@' + nickName + ':환경 배치 성공';
						getDom('send_message').click();

						console.log(idt + '部署环境成功');

					}
					//聊天热度延迟速度
					else if (tex == '!채팅속도' || tex == '!지연속도' || tex == '!속도') {
						var delayInputTextId = getDom('delayInputTextId').value;

						if (delayInputTextId >= 1000) {
							delayInputTextId = delayInputTextId / 1000 + 's';
						} else {
							delayInputTextId = delayInputTextId + 'ms';
						}
						getDom('testInput').value = '@' + nickName + ':관중:' + getDom('nAllViewer').innerHTML +
							',채팅속도:' + delayInputTextId;
						getDom('send_message').click();


					} else if (tex == '!문지기' || tex == '!슈퍼팬') {
						//哪个组dom名称
						var groupName = '';
						var text = '';
						// getDom('setbox_viewer').click();
						document.getElementById('setbox_viewer').children.item(0).click();
						switch (true) {
							case tex == '!manager' || tex == '!문지기':
								// 매니저  管理员
								groupName = 'lv_ul_manager';
								break;
							case tex == '!슈퍼팬':
								// 구독자 高级粉丝
								groupName = 'lv_h3_topfan';
								break;
							case tex == '!팬':
								groupName = 'lv_h3_fan';
								break;
							case tex == '!서포터':
								groupName = 'lv_ul_supporter';
								break;
							default:
								groupName = 'lv_p_bj';
								break;
						}


						setTimeout(function() {
							getGrups(groupName);
							console.log('text:' + text);
							if (text != '') {
								getDom('testInput').value = text;
								//初始化数据
								getDom('inputFrequency').value = 1;

								getDom('send_message').click();

							} else {
								getDom('testInput').value = tex + ':null';
							}
							getDom('inputFrequency').value = 1;
							// document.getElementById('setbox_viewer').children.item(0).click();

						}, 3000);
						// document.getElementById('setbox_viewer').children.item(0).click();


					} else if (tex == '!open') {

						getDom('inputFrequency').value = 6;
						document.getElementById('setbox_viewer').children.item(0).click();

					}
					//!message:q/m/s  /!소식:천천히/중속/서둘러
					else if (idt.includes('1057123') && tex.includes('!message:') || tex.includes('!m:')) {

						//当前速度控制器
						var delayInputId = getDom('delayInputId');
						//要调节的速度
						var speed = tex.substring(tex.indexOf(':') + 1);
						//现在的速度
						var nowDelayInputId = delayInputId.value;
						console.log('speed的值:' + speed);
						if (speed == '') {
							console.log('返回当前速度');

							//发送当前速度
							//转换速度英文值为韩语
							if (nowDelayInputId == 'slowSpeed') {
								// getDom('testInput').value=tex+'천천히';
								getDom('write_area').innerHTML = tex + '천천히';
								// send_message
								getDom('btn_send').click();
								//慢速命令
							} else if (nowDelayInputId == 'meiumSpeed') {
								// getDom('testInput').value=tex+'중속';
								getDom('write_area').innerHTML = tex + '중속';
								getDom('btn_send').click();
								//慢速命令
							} else if (nowDelayInputId == 'quick') {
								// getDom('testInput').value=tex+'서둘러';
								getDom('write_area').innerHTML = tex + '서둘러';
								getDom('btn_send').click();
							} else {
								//发送
								getDom('write_area').innerHTML = tex + 'null';
								getDom('btn_send').click();


							}


						} else {

							if (speed == nowDelayInputId) {
								console.log('当前已经是:' + speed);


							} else {
								//慢速命令
								if (speed == 's' || speed == '천천히') {
									delayInputId.value = 'slowSpeed';
									//慢速命令
								} else if (speed == 'm' || speed == '중속') {
									delayInputId.value = 'meiumSpeed';
									//慢速命令
								} else if (speed == 'q' || speed == '서둘러') {
									delayInputId.value = 'quick';

								}
								//速度调节
								getDom('retrievalButtonId').click();
							}

						}
						console.log('进入调速模式');

					}
					//发送按钮语言
					else if (tex == '!보내다' || tex == '!send' || tex == '!发送' || tex == '!보내기') {

						$('#write_area').html($('#showMessage').html());
						getDom('btn_send').click();
					}
					//语言命令(在有新消息的情况下执行)
					// &&tex='!시간'||tex='!时间'
					else if (idt == '1057123772' && tex == '!시간') {
						var date = new Date();
						console.log('시간:' + date);
					}
					// !자동시간알림自动报时间启动
					else if (idt.includes('10571237') && tex == '!자동시간알림') {
						console.log('管理员(' + idt + '):' + '보고시간(自动报时)');
						document.getElementById('autoTimeId').click();

					}
					// !보고시간现在手动的时间
					else if (tex == '!보고시간' || tex == '!시간' || tex == '!time') {
						console.log('管理员(' + idt + '):' + '보고시간(报告时间)');
						//获取1-3的随机数字
						// console.log(parseInt(Math.random()*NO/1));
						var rdmNo = parseInt(Math.random() * 3 / 1 + 1);
						setTimeout(function() {
							document.getElementById('handTimeId').click();
						}, rdmNo * 1000);


					} else if (tex == '!방송시작시간') {
						var detail_view = getSonButtonDom1('detail_view');

						sendMessage(detail_view.textContent);


					} else if (tex == '!별' || tex == '!즐겨찾기' || tex == '!UP' || tex == '!좋아요' || tex == '!좋아') {
						//收藏
						var bookmarkSonDom;
						//点赞
						var up_recommend;
						switch (true) {
							case tex == '!별' || tex == '!즐겨찾기':
								bookmarkSonDom = getSonButtonDom('bookmark');
								if (bookmarkSonDom.className == '') {
									bookmarkSonDom.click();
									setTimeout(function() {
										bookmarkSonDom = getSonButtonDom('bookmark');
										if (bookmarkSonDom.className == 'on') {
											sendMessage('@' + nickName + ':즐겨찾기 추가 성공');
										} else {
											sendMessage('@' + nickName + ':즐겨찾기 추가 실수');
										}
									}, 1000);
								} else {
									//收藏失败,您已经收藏
									sendMessage('@' + nickName + ':이미 즐겨찾기');
								}
								break;
							case tex == '!UP' || tex == '!좋아요' || tex == '!좋아':
								up_recommend = getSonButtonDom('up_recommend');
								if (up_recommend.className == 'on') {
									//点赞失败,您已经点赞
									sendMessage('@' + nickName + ':이미 좋아요 표시됨');

								} else if (up_recommend.className == '') {
									up_recommend.click();
									setTimeout(function() {
										up_recommend = getSonButtonDom('up_recommend');
										if (up_recommend.className == 'on') {
											console.log('点赞成功:' + up_recommend.className);
											sendMessage('@' + nickName + ':좋아요 성공');
										} else {
											console.log('点赞失败');
											sendMessage('@' + nickName + ':좋아요 실수');
										}
									}, 1000);
								}
								break;
							default:
								break;
						}
					}


					//!멈추다 停止
					//内容发送!text:😗😗,2x3  !text:😗,2x0.01  !text:/짱좋아//짱좋아/,3x2
					// !text:/즐거워/,5x5 id 는 이것 을 포함 해야만 명령 을 실행 할 수 있 습 니 다.이 명령 은 관리자 의 채 팅 번역 기능 을 닫 아야 합 니 다.수 동 설정 도 같은 효과 입 니 다.
					// !text:😗,2x1 명령 권한 이 열 렸 습 니 다.관리자 계 정 이나 앵 커 계 정 은 채 팅 번역 기능 을 닫 아야 합 니 다.
					else if (tex.includes('!text:') && tex.includes('x')) {
						function getDom(dom) {
							var dom = document.getElementById(dom);
							return dom;
						}

						var testInput = getDom('testInput');
						var inputTimes = getDom('inputTimes');
						var inputFrequency = getDom('inputFrequency');
						//获取1-3的随机数字
						// console.log(parseInt(Math.random()*NO/1));
						var rdmNo = parseInt(Math.random() * 3 / 1 + 1);
						var text = "";
						var firstNo = "";
						var lastNo = "";
						if (!tex.includes(",")) {
							text = tex.substring(tex.indexOf(":") + 1);
						} else {
							//固定位置
							text = tex.substring(6, tex.lastIndexOf(','));
							firstNo = tex.substring(tex.lastIndexOf(',') + 1, tex.lastIndexOf('x'));
							lastNo = tex.substring(tex.lastIndexOf('x') + 1);
						}
						setTimeout(function() {
							//发送数据
							if (text != "") {
								getDom('testInput').value = text;
							}
							if (firstNo != "") {
								getDom('inputTimes').value = firstNo;
							}
							if (lastNo != "") {
								getDom('inputFrequency').value = lastNo;
							}
							console.log(text);
							var send_message = getDom('send_message');
							send_message.click();
							//数据还原1,1
							getDom('testInput').value = testInput_last.value;
							getDom('inputTimes').value = inputTimes_last.value;
							getDom('inputFrequency').value = inputFrequency_last.value;

							// getDom('inputTimes').value = 1;
							// getDom('inputFrequency').value = 1;
						}, rdmNo * 1000);
					}
				}
			}
			le = document.getElementsByTagName('dt').length;
		}
		//获取信息的延迟时间
	}, delayInputFrequency);
}

function isStart() {
	//渲染特效
	// $('#retrievalButtonId').toggleClass()
	$("#retrievalButtonId").toggleClass('btn-success btn-inverse');
	let showMessageDivClass = $('#showMessageDiv').attr('class');
	console.log(showMessageDivClass);
	if (showMessageDivClass.includes('in')) {
		retrievalButtonFunction();
		console.log('包含in,执行');
	} else {
		if ('undefined' != typeof messageInterval) {
			clearInterval(messageInterval);
		}

		console.log('不包含in,不执行');
	}

}
