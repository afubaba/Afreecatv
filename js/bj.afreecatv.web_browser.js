console.log("bj.afreecatv.js");
// const bgURL=chrome.runtime.getURL("img/bg.png");
// getURL();

function getURL() {
	try {
		const bgURL1 = document.getElementsByClassName("thum")[0].style.backgroundImage;
		$('*').css('background', 'none');
		// $('*').css('backgroundImage', 'none');
		bgBackgroundFunction(bgURL1);
	} catch (e) {
		setTimeout(function() {
			getURL();
		}, 1000);
	}
}
var bdBack = document.body;

function bgBackgroundFunction(bgURL) {
	bdBack.style.backgroundImage = bgURL; //设置背景图的的地址
	bdBack.style.backgroundRepeat = "no-repeat"; //设置背景不平铺
	bdBack.style.backgroundPosition = "center"; //设置背景图的位置
	bdBack.style.backgroundSize = "cover"; //设置背景图像的尺寸 
}
// $(bdBack).css('background', 'none');
// bdBack.background=bgURL;
// document.body.style.backgroundSize="100%";
// document.body.style.backgroundWidth="100%";
// document.body.style.background.height="100%";
//css
// .bj {
//       background: url(star.jpg) no-repeat center;
//       background-size: cover;
// }
//.css('background-size','100%').css('height','100%').css('width','100%');




//https://bj.afreecatv.com/kus03125/posts/instagram
//注入事件

//追加打开全部
// document.getElementsByClassName("btn-more")[1].append("<button>nihao</button>");

//模拟单次点击
// document.getElementsByClassName("btn-more")[1].children[0].click()
window.onload = function() {
	// console.log($(".btn-more"));
	// console.log($(".btn-more")[0]);
	// $(".btn-instagram").
	// setInterval(function(){

	// 	var btnLengt=$(".btn-more").length;
	// 	if(btnLengt=="2"){
	// 		$(".btn-more:eq(1)").append("<button>nihao</button>");
	// 	}
	// 	console.log($(".btn-more").length);
	// },1000);


}
//2.$(function($){});

// (function($){})(jQuery);
//展开全部
// $(function($) {
//.trigger("click", ["foo", "bar"]);自动点击复制.btn-instagram,
//1. 交集选择： $(".a.b") --选择同时包含a和b的元素。2. 并集选择：$(".a, .b") --选择包含a或者包含b的元素。

//添加展开全部按钮
let j = 0;
let addClickEventsInterval = setInterval(function() {

	// console.log(j);
	// console.log($(".btn-instagram").length);
	// console.log(document.readyState);
	if (j >= 40) {
		clearInterval(addClickEventsInterval);
	}
	if ($(".sns-instargram").length == "1" || $(".btn-instagram").length == "1") {
		$(".sns-instargram,.btn-instagram").click(function(event, a, b) {
			addOpenAllFunction();
		});
		clearInterval(addClickEventsInterval);
	}
	j++;

}, 250);


var htmlLang = $("html").attr("lang");
let openallButton;
if (htmlLang =="ko") {
	openallButton="모두 확장";
	openallButtonTip="인스타그램 미리 보기 사진을 모두 펼치시겠습니까? 펼치는 과정은 모든 인스타그램 미리 보기를 완전히 보여줄 때까지 스크롤 바를 제어할 수 없습니다";
} else {
	
	openallButton="展开全部";
	
	openallButtonTip="要打开Instagram的所有预览照片吗？展开过程无法控制滚动条，直到完全显示所有Instagram预览";
	
}

//添加
addOpenAllFunction();
async function addOpenAllFunction() {
	let i = 0;
	let addButtonInterval = setInterval(function() {
		let btnMore = $(".snsBoard-insta").children(".btn-more");
		// console.log(btnMore.length);
		i++;
		// console.log(i);
		//10次添加失败停止
		if (i >= 10) {
			clearInterval(addButtonInterval);
		}
		if (btnMore.length == 1) {
			//提前删除一次
			$("#openAll").remove();
			$(".snsBoard-insta").append(
				"<button id='openAll' class='btn btn-danger' style='width:100%;height:" +
				btnMore.height() + "px'>" +openallButton+ "</button>");
			$("#openAll").click(function() {

				const isOpenAll = confirm(openallButtonTip + "?");
				if (isOpenAll) {
					let openAllInterval = setInterval(function() {
						// if ('undefined' != typeof handTimeout) {
						// 	clearInterval(handTimeout);
						// }
						// console.log($(".snsBoard-insta").children(".btn-more").length);
						if ($(".snsBoard-insta").children(
								".btn-more")
							.length ==
							"0") {
							// console.log("已经展开了全部");
							$("#openAll").remove();
							clearInterval(openAllInterval);
						}

						btnMore.children().click();
						//控制顶级滚动条的位置
						window.scrollTo(0, document.body
							.scrollHeight);
					}, 1000);
				}
			});
			clearInterval(addButtonInterval);
		}
		//console.log($(".snsBoard-insta").children(".btn-more").append(" < button > nihao < /button>"));
		// console.log(document.readyState);
	}, 1000);
}
// });


//本地化

function setLanguage(idName) {

	
	if (htmlLang = "ko") {
		$("#" + idName).html("모두 확장");
	} else {
		$("#" + idName).html("展开全部");
	}

}
//批量调用
/* const idNameAarray = [""];
idNameAarray.forEach(function(idName) {
	setLanguage(idName);
}) */
;