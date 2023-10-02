// JavaScript Document

// console.log("lol.js");

var souceWindow;

// getResourcesByFench("locales/ko/messages.json")
// function getResourcesByFench(url) {
// 	fetch(url).then((response) => {
// 		if (response.ok) {
// 			response.json().then(function(resolve) {
// 				 console.log(resolve);
// 			})
// 		}

// 	}, (error) => {
// 		console.log(error);
// 	});
// }


window.addEventListener("message", (event) => {
	var origin = event.origin;
	// 通常，onmessage()事件处理程序应当首先检测其中的origin属性，忽略来自未知源的消息
	console.log(origin);
	if (origin !== "https://play.afreecatv.com") {

		return;
	} else {
		const inteveal = 2500;
		console.log(event.data);
		if (event.data == "!탑" || event.data == "!top") {
			setTimeout(function() {
				$(".selete-item>label>a").get(0).click();
			}, inteveal);
		}
		if (event.data == "!정글" || event.data == "!jungle" || event.data == "!jun") {
			setTimeout(function() {
				$(".selete-item>label>a").get(1).click();
			}, inteveal);
		}
		if (event.data == "!미드" || event.data == "!middle" || event.data == "!mid" || event.data == "!ap") {
			setTimeout(function() {
				$(".selete-item>label>a").get(2).click();
			}, inteveal);
		}
		if (event.data == "!바텀" || event.data == "!adc" || event.data == "!ad") {
			setTimeout(function() {
				$(".selete-item>label>a").get(3).click();
			}, inteveal);
		}

		if (event.data == "!서포터" || event.data == "!보조" || event.data == "!sup" || event.data ==
			"!support") {
			setTimeout(function() {
				$(".selete-item>label>a").get(4).click();
			}, inteveal);
		}
		if (event.data == "!영웅" || event.data == "!any" || event.data == "!all") {


			//执行函数
			let randomByAll = document.querySelector("#randomByAll");
			setTimeout(function() {
				randomByAll.click();
			}, 5000);
		}
		// event.source.postMessage('LOL的消息：', origin);
		souceWindow = event.source;
	}
	// ...
}, false);

//加载的时候语言
// var setLang = {
// 	getI18n: function(name) {
// 		const rnName = chrome.i18n.getMessage(name);
// 		return rnName;
// 	},
// 	setLanguage: function(idName, prefix) {
// 		var rnNameId = prefix + idName;
// 		//获取本地化值
// 		// console.log(rnNameId);
// 		var rnName = this.getI18n(rnNameId);
// 		if (rnName != "") {
// 			// console.log(rnName);
// 			$("#" + idName).html(rnName);
// 		} else {
// 			console.log("null");
// 		}
// 		//获取本地化值Title
// 		var rmNameTitleValue = rnNameId + "_title";
// 		rmNameTitleValue = this.getI18n(rmNameTitleValue);
// 		if (rmNameTitleValue != "") {
// 			// console.log("title:" + rmNameTitleValue);
// 			$("#" + idName).attr("title", rmNameTitleValue);
// 			// console.log("alt:" + rmNameTitleValue);
// 		}

// 	},
// 	dataEach: function(dataArray, prefix) {
// 		dataArray.forEach(function(idName) {
// 			setLang.setLanguage(idName, prefix);
// 		});
// 	}
// }
// const dataArray="";
// setLang.dataEach()
var topValue = "top";
var junValue = "jungle";
var midValue = "middle";
var adcValue = "adc";
var supValue = "support";
let replaceArray = "";
$.getJSON("json/locales/ko/game/lol/messages.json", function(result) {
	
	topValue = result.lol_top.message;
	junValue = result.lol_jungle.message;
	midValue = result.lol_middle.message;
	adcValue = result.lol_adc.message;
	supValue = result.lol_support.message;

	$("#randomByAll").html("모든 영웅");
	$("#stop").html("정지");
	$(".selete-item>label>a").get(0).innerText = topValue;
	$(".selete-item>label>a").get(1).innerText = junValue;
	$(".selete-item>label>a").get(2).innerText = midValue;
	$(".selete-item>label>a").get(3).innerText = adcValue;
	$(".selete-item>label>a").get(4).innerText = supValue;

	var i = 0;
	let initInterval = setInterval(function() {
		const imgLength = $("#jSearchHeroDiv").children("li").children().children("img").length;

		//替换位置
		let position = $(".commspr-commico-search:eq(" + i + ")");
		position.text(position.text().replace("top", topValue).replace("jungle", junValue).replace(
			"middle", midValue).replace("adc", adcValue).replace("support", supValue));

		// console.log(imgLength);
		//英雄名称父
		let heroParent = $("#jSearchHeroDiv").children("li").children();
		//英雄名称
		let heroName = heroParent.children("p")[i];
		// console.log(heroName);
		let eachImgSrc = heroParent.children("img")[i].src;
		// console.log(eachImgSrc);
		let replaceEachSrc = eachImgSrc.replace("https://afubaba.github.io/Afreecatv/img/lol/", "");
		replaceEachSrc = replaceEachSrc.replace(".webp", "");
		//获取国际化英雄名称父辈

		let replaceEachTitleValue = eval("result.lol_" + replaceEachSrc + "_title.message");
		// console.log(replaceEachTitleValue)
		heroParent[i].title = replaceEachTitleValue;
		// console.log("lol_" + replaceEachSrc + "_title");
		//获取国际化英雄名称
		// console.log(replaceEachSrc);
		let replaceEachSrcValue = eval("result.lol_" + replaceEachSrc + ".message");
		//填入国际化名称 一键
		heroName.innerText = replaceEachSrcValue;
		// console.log(replaceEachSrcValue);

		// console.log(replaceEachSrc + ":" + replaceEachSrcValue + ",title:" +
		// 	replaceEachTitleValue + ",alt:" +
		// 	replaceEachTitleValue);
		// replaceArray = replaceArray + "\"" + replaceEachSrc + "\","
		i++;
		if (i >= imgLength) {
			clearInterval(initInterval);
		}
	}, 16);


	// for (let i = 0; i < imgLength; i++) {
	// 	//英雄名称父
	// 	let heroParent = $("#jSearchHeroDiv").children("li").children();
	// 	//英雄名称
	// 	let heroName = heroParent.children("p")[i];
	// 	// console.log(heroName);
	// 	let eachImgSrc = heroParent.children("img")[i].src;
	// 	// console.log(eachImgSrc);
	// 	let replaceEachSrc = eachImgSrc.replace("https://afubaba.github.io/Afreecatv/img/lol2/", "");
	// 	replaceEachSrc = replaceEachSrc.replace(".png", "");
	// 	//获取国际化英雄名称父辈

	// 	let replaceEachTitleValue = eval("result.lol_" + replaceEachSrc + "_title.message");
	// 	console.log(replaceEachTitleValue)
	// 	heroParent[i].title = replaceEachTitleValue;
	// 	// console.log("lol_" + replaceEachSrc + "_title");
	// 	//获取国际化英雄名称
	// 	console.log(replaceEachSrc);
	// 	let replaceEachSrcValue = eval("result.lol_" + replaceEachSrc + ".message");
	// 	//填入国际化名称 一键
	// 	heroName.innerText = replaceEachSrcValue;
	// 	console.log(replaceEachSrcValue);
	// 	// console.log(replaceEachSrc + ":" + replaceEachSrcValue + ",title:" +
	// 	// 	replaceEachTitleValue + ",alt:" +
	// 	// 	replaceEachTitleValue);
	// 	// replaceArray = replaceArray + "\"" + replaceEachSrc + "\","

	// }
});
window.onload = function() {
	
	//绑定函数
	let heroLeng = $("#jSearchHeroDiv").children("li").children().length;
	console.log(heroLeng);
	document.querySelector("#randomByAll").onclick = function() {
		let randoN = rd(heroLeng);
		console.log("起始位置:", randoN);
		jj(randoN, heroLeng);
	}
	document.querySelector("#stop").onclick = function() {
		jj(-2);
	}
	// const id = chrome.i18n.getMessage("@@extension_id");
	// 获取到英雄英文名称  拼接成Message对象

	// for (let i = 0; i < imgLength; i++) {
	// 	let eachImg = $("#jSearchHeroDiv").children("li").children().children("img")[i];

	// 	let eachSrc = eachImg.src;
	// 	//英雄名称
	// 	let heroName = $("#jSearchHeroDiv").children("li").children().children("p")[i].innerText;
	// 	let heroAlt = eachImg.alt;

	// 	let replaceEachSrc = eachSrc.replace("chrome-extension://" + id + "/img/lol/", "");
	// 	replaceEachSrc = replaceEachSrc.replace(".png", "");
	// 	console.log("\"lol_" + replaceEachSrc + "\":{" +
	// 		"\"message\":\"" + heroName +
	// 		"\",\"description\":\"" + heroName +
	// 		"\"},"
	// 	);
	// 	console.log("\"lol_" + replaceEachSrc + "_alt\":{" +
	// 		"\"message\":\"" + heroAlt +
	// 		"\",\"description\":\"" + heroAlt +
	// 		"\"},"
	// 	);
	// 	console.log("\"lol_" + replaceEachSrc + "_title\":{" +
	// 		"\"message\":\"" + heroAlt +
	// 		"\",\"description\":\"" + heroAlt +
	// 		"\"},"
	// 	);
	// }
	//获取id

	// for (let i = 0; i < imgLength; i++) {
	// 	let eachSrc = $("#jSearchHeroDiv").children("li").children().children("img")[i].src;
	// 	//英雄名称
	// 	let heroName = $("#jSearchHeroDiv").children("li").children().children("p")[i].innerText
	// 	let replaceEachSrc = eachSrc.replace("chrome-extension://" + id + "/img/lol/", "");
	// 	replaceEachSrc = replaceEachSrc.replace(".png", "");

	// 	replaceArray = replaceArray + "\"" + replaceEachSrc + "\","
	// }
	// console.log(replaceArray);
	// console.log(replaceArray);


	// const dataArray = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "AurelionSol",
	// 	"Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Chogath", "Corki",
	// 	"Darius", "Diana", "Draven", "DrMundo", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora",
	// 	"Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi",
	// 	"Irelia", "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma",
	// 	"Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw",
	// 	"Leblanc", "LeeSin", "Leona", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai",
	// 	"MasterYi", "MissFortune", "MonkeyKing", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko",
	// 	"Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Quinn", "Rakan",
	// 	"Rammus", "RekSai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen",
	// 	"Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra",
	// 	"TahmKench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere",
	// 	"TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Vi", "Viktor",
	// 	"Vladimir", "Volibear", "Warwick", "Xayah", "Xerath", "XinZhao", "Yasuo", "Yorick", "Zac", "Zed",
	// 	"Ziggs", "Zilean", "Zoe", "Zyra", "Yuumi", "Qiyana", "Senna", "Aphelios", "Sett"
	// ]
	// setLang.dataEach(dataArray, "lol_");


	function randomByAll() {

	}
}

// "lol_test": {
// 		"message": "展开全部",
// 		"description": "展开全部"
// 	}


$(document).ready(function(e) {

	// $("*").css("background","none");

	var a = document.getElementById("jSearchHeroDiv");
	var top;
	var jungle;
	var middle;
	var adc;
	var support;
	var allHero;
	var text;
	$("li").css("float", "left");
	//border:dashed/solid/dotted
	$("#jSearchHeroDiv>li").css("float", "left").css("text-align", "center")
	$("ul").css("list-style-type", "none");
	/*   $('img').width();*/

	//.css("width","150px")
	//  css("border","1px solid red")

	//alert(b.volume);
	//所有英雄

	//上路
	// top = new Array("狂战士", "无畏战车", "猩红收割者", "正义天使", "亡灵战神", "迅捷斥候", "祖安怒兽", "蛮族之王", "武器大师", "炼金术士", "虚空恐惧",
	//     "祖安狂人", "刀锋舞者", "海洋之灾", "巨魔之王", "诺克萨斯统领", "熔岩巨兽", "荒漠屠夫", "齐天大圣", "暗夜猎手", "机械公敌", "沙漠死神", "圣锤之毅",
	//     "酒桶", "铁铠冥魂", "牧魂人", "离群之刺", "狂暴之心", "德玛西亚之力", "放逐之刃", "暮光之眼", "法外狂徒", "不灭狂雷", "无双剑姬", "诺克萨斯之手",
	//     "未来守护者", "德玛西亚之翼", "迷失之牙", "疾风剑豪", "青钢影", "河流之王", "圣枪游侠", "暴怒骑士", "暗裔剑魔", "海兽祭司", "山隐之焰", "解脱者",
	//     "封魔剑魂", "腕豪", "灵罗娃娃", "纳祖芒荣耀");
	top = new Array(
		"诺克萨斯之手", "暗裔剑魔", "暮光之眼", "铁铠冥魂", "无双剑姬", "沙漠死神", "德玛西亚之力", "青钢影", "山隐之焰", "狂战士",
		"北地之怒", "腕豪", "武器大师", "刀锋舞者", "放逐之刃", "炼金术士", "无畏战车", "暴怒骑士", "海兽祭司", "海洋之灾",
		"祖安怒兽", "亡灵战神", "荒漠屠夫", "圣锤之毅", "祖安狂人", "迅捷斥候", "熔岩巨兽", "傲之追猎者", "德玛西亚之翼",
		"牧魂人", "齐天大圣", "生化魔人", "不屈之枪", "蛮族之王", "封魔剑魂", "扭曲树精", "未来守护者", "灵罗娃娃", "正义天使", "不灭狂雷", "影哨",
		"纳祖芒荣耀", "虚空恐惧", "大发明家", "暗夜猎手", "迷失之牙", "河流之王", "猩红收割者", "疾风剑豪", "含羞蓓蕾", "机械公敌", "酒桶", "离群之刺",
		"兽灵行者", "狂暴之心", "解脱者", "巨魔之王", "符文法师");
	//野区

	// let stringT = "";
	// var listItem = document.getElementsByClassName("list-item");
	// for (let i = 0; i < listItem.length; i++) {

	// 	stringT = stringT + "\"" + listItem[i].innerText + "\","
	// 	console.log(stringT);

	// }
	// 在线去掉空格 http://www.esjson.com/delSpace.html
	// jungle = new Array("狂战士", "德邦总管", "远古恐惧", "无极剑圣", "祖安怒兽", "雪原双子", "武器大师", "痛苦之拥", "瘟疫之源", "死亡颂唱者", "殇之木乃伊",
	//     "披甲龙龟", "恶魔小丑", "巨魔之王", "永恒梦魇", "德玛西亚皇子", "蜘蛛女皇", "齐天大圣", "盲僧", "狂野女猎手", "酒桶", "刀锋之影", "龙血武姬",
	//     "法外狂徒", "不灭狂雷", "傲之追猎者", "北地之怒", "战争之影", "虚空掠夺者", "皎月女神", "影流之镰", "生化魔人", "岩雀", "永猎双子", "破败之王",
	//     "影流之主", "时间刺客", "元素女皇", "皮城执法官", "虚空遁地兽", "含羞蓓蕾", "灵罗娃娃", "虚空女皇");

	jungle = new Array("虚空女皇", "兽灵行者", "法外狂徒", "远古恐惧", "无极剑圣", "蜘蛛女皇", "时间刺客", "披甲龙龟", "生化魔人", "虚空掠夺者", "痛苦之拥",
		"战争之影", "不灭狂雷", "影流之镰", "虚空遁地兽", "永猎双子", "北地之怒", "恶魔小丑", "皎月女神", "雪原双子", "永恒梦魇", "傲之追猎者", "皮城执法官",
		"殇之木乃伊", "祖安怒兽", "破败之王", "德玛西亚皇子", "狂野女猎手", "德邦总管", "盲僧", "铁铠冥魂", "含羞蓓蕾", "扭曲树精", "龙血武姬", "水晶先锋",
		"齐天大圣", "狂战士", "影流之主", "巨魔之王", "岩雀", "刀锋之影", "死亡颂唱者", "酒桶", "圣锤之毅", "不屈之枪", "翠神", "元素女皇", "蒸汽机器人");
	//中路
	// middle = new Array("黑暗之女", "正义巨像", "卡牌大师", "诡术妖姬", "猩红收割者", "正义天使", "符文法师", "亡灵战神", "麦林炮手", "蛮族之王", "堕落天使",
	// 	"虚空恐惧", "冰晶凤凰", "虚空行者", "刀锋舞者", "海洋之灾", "英勇投弹手", "邪恶小法师", "诺克萨斯统领", "熔岩巨兽", "不祥之刃", "荒漠屠夫", "发条魔灵",
	// 	"复仇焰魂", "机械公敌", "魔蛇之拥", "沙漠死神", "不屈之枪", "铁铠冥魂", "离群之刺", "德玛西亚之力", "虚空先知", "刀锋之影", "光辉女郎", "远古巫灵",
	// 	"九尾妖狐", "法外狂徒", "潮汐海灵", "机械先驱", "爆破鬼才", "未来守护者", "冰霜女巫", "皎月女神", "暗黑元首", "暮光星灵", "虚空之女", "疾风剑豪",
	// 	"虚空之眼", "岩雀", "影哨", "圣枪游侠", "影流之主", "时间刺客", "元素女皇", "暗裔剑魔", "沙漠皇帝", "解脱者", "万花通灵", "愁云使者", "封魔剑魂");
	middle = new Array("愁云使者", "影流之主", "暗黑元首", "解脱者", "机械先驱", "不祥之刃", "炼金术士", "猩红收割者", "九尾妖狐", "诺克萨斯统领", "机械公敌",
		"潮汐海灵", "虚空先知", "冰晶凤凰", "大发明家", "封魔剑魂", "刀锋之影", "时间刺客", "影哨", "虚空行者", "刀锋舞者", "不屈之枪", "疾风剑豪",
		"魔蛇之拥", "正义巨像", "瘟疫之源", "离群之刺", "皎月女神", "暮光星灵", "元素女皇", "光辉女郎", "邪恶小法师", "麦林炮手", "远古巫灵", "虚空之眼",
		"时光守护者", "黑暗之女", "岩雀", "腕豪", "爆破鬼才", "荒漠屠夫", "海洋之灾", "万花通灵", "诡术妖姬", "冰霜女巫", "酒桶", "卡牌大师", "发条魔灵",
		"英勇投弹手", "复仇焰魂", "惩戒之箭", "星籁歌姬", "符文法师", "沙漠皇帝");
	//ADC
	// adc = new Array("战争女神", "麦林炮手", "赏金猎人", "寒冰射手", "瘟疫之源", "皮城女警", "暗夜猎手", "探险家", "深渊巨口", "惩戒之箭", "爆破鬼才",
	// 	"荣耀行刑官", "虚空之女", "疾风剑豪", "戏命师", "祖安花火", "暴走萝莉", "河流之王", "圣枪游侠", "沙漠玫瑰", "复仇之矛", "逆羽", "残月之肃", "不羁之悦"
	// );
	adc = new Array("虚空之女", "戏命师", "皮城女警", "麦林炮手", "沙漠玫瑰", "暴走萝莉", "探险家", "赏金猎人", "圣枪游侠", "荣耀行刑官", "不羁之悦",
		"瘟疫之源", "寒冰射手", "惩戒之箭", "星籁歌姬", "死亡颂唱者", "战争女神", "逆羽", "暗夜猎手", "深渊巨口", "爆破鬼才", "复仇之矛", "疾风剑豪",
		"残月之肃", "祖安花火");

	//辅助
	// support = new Array("诡术妖姬", "牛头酋长", "众星之子", "赏金猎人", "寒冰射手", "堕落天使", "时光守护者", "瘟疫之源", "恶魔小丑", "琴瑟仙女", "风暴之怒",
	// 	"天启者", "瓦洛兰之盾", "邪恶小法师", "诺克萨斯统领", "蒸汽机器人", "熔岩巨兽", "扭曲树精", "复仇焰魂", "不屈之枪", "曙光女神", "光辉女郎", "远古巫灵",
	// 	"深海泰坦", "爆破鬼才", "仙灵女巫", "荆棘之兴", "星籁歌姬", "虚空之眼", "弗雷尔卓德之心", "河流之王", "涤魂圣枪", "唤潮鲛姬", "魔法猫咪", "魂锁典狱长",
	// 	"星界游神", "幻翎", "镕铁少女", "血港鬼影", "腕豪", "炼金男爵","纳祖芒荣耀");

	support = new Array("唤潮鲛姬", "蒸汽机器人", "风暴之怒", "炼金男爵", "众星之子", "殇之木乃伊", "血港鬼影", "魂锁典狱长", "琴瑟仙女", "扭曲树精",
		"光辉女郎", "堕落天使", "荆棘之兴", "时光守护者", "仙灵女巫", "深海泰坦", "天启者", "魔法猫咪", "远古巫灵", "镕铁少女", "大发明家", "瓦洛兰之盾",
		"曙光女神", "涤魂圣枪", "寒冰射手", "星界游神", "星籁歌姬", "幻翎", "虚空之眼", "复仇焰魂", "诺克萨斯统领", "牛头酋长", "恶魔小丑", "瘟疫之源",
		"弗雷尔卓德之心", "不屈之枪", "河流之王", "赏金猎人");
	//所有英雄
	allHero = new Array();

	//输入英雄的位置动态填充至I
	//$(".commspr-commico-search").text("11111");

	$("p").text(function(index, text) {
		allHero[index] = text;
	});

	//$(".imgtextlist>li").get(0).style="border:10px red solid"

	//获取18n国际化位置
	// let topValue = setLang.getI18n("lol_top");
	// let junValue = setLang.getI18n("lol_jungle");
	// let midValue = setLang.getI18n("lol_middle");
	// let adcValue = setLang.getI18n("lol_adc");
	// let supValue = setLang.getI18n("lol_support");




	for (i = 0; i < allHero.length; i++) {
		for (j = 0; j < top.length; j++) {
			if (allHero[i] == top[j]) {
				text = $(".commspr-commico-search").get(i).innerHTML
				if ($(".commspr-commico-search").get(i).innerHTML == "") {
					$(".commspr-commico-search").get(i).innerHTML = topValue;
				} else {
					$(".commspr-commico-search").get(i).innerHTML = text + "丨" + topValue;
				}
			}
		}
		for (j = 0; j < middle.length; j++) {
			if (allHero[i] == middle[j]) {
				/*$(".commspr-commico-search").get(i).innerHTML="3333"+"233";*/
				if (allHero[i] == middle[j]) {
					text = $(".commspr-commico-search").get(i).innerHTML
					if ($(".commspr-commico-search").get(i).innerHTML == "") {
						$(".commspr-commico-search").get(i).innerHTML = midValue;;
					} else {

						$(".commspr-commico-search").get(i).innerHTML = text + "丨" + midValue;
					}
				}
			}
		}
		for (j = 0; j < jungle.length; j++) {
			if (allHero[i] == jungle[j]) {
				/*$(".commspr-commico-search").get(i).innerHTML="3333"+"233";*/
				if (allHero[i] == jungle[j]) {
					text = $(".commspr-commico-search").get(i).innerHTML
					if ($(".commspr-commico-search").get(i).innerHTML == "") {
						$(".commspr-commico-search").get(i).innerHTML = junValue;
					} else {

						$(".commspr-commico-search").get(i).innerHTML = text + "丨" + junValue;
					}
				}
			}
		}
		for (j = 0; j < adc.length; j++) {
			if (allHero[i] == adc[j]) {
				/*$(".commspr-commico-search").get(i).innerHTML="3333"+"233";*/
				if (allHero[i] == adc[j]) {
					text = $(".commspr-commico-search").get(i).innerHTML
					if ($(".commspr-commico-search").get(i).innerHTML == "") {
						$(".commspr-commico-search").get(i).innerHTML = adcValue;
					} else {

						$(".commspr-commico-search").get(i).innerHTML = text + "丨" + adcValue;
					}
				}
			}
		}
		for (j = 0; j < support.length; j++) {
			if (allHero[i] == support[j]) {
				/*$(".commspr-commico-search").get(i).innerHTML="3333"+"233";*/
				if (allHero[i] == support[j]) {
					text = $(".commspr-commico-search").get(i).innerHTML
					if ($(".commspr-commico-search").get(i).innerHTML == "") {
						$(".commspr-commico-search").get(i).innerHTML = supValue;
					} else {

						$(".commspr-commico-search").get(i).innerHTML = text + "丨" + supValue;
					}
				}
			}
		}

	}


	//此处添加的是点击事件
	$(".selete-item>label>a").get(0).onclick = function(e) {

		$(".imgtextlist>li").css("display", "none");
		for (var i = 0; i < $(".selete-item>label>a").length; i++) {
			if (i == 0) {
				$(".selete-item>label>a").get(i).style = "background-color:red";
			} else {
				$(".selete-item>label>a").get(i).style = "background-color:none";
			}
		}
		startShow(top);
		showChoice(allHero, top);

	}
	$(".selete-item>label>a").get(1).onclick = function(e) {

		$(".imgtextlist>li").css("display", "none");
		for (var i = 0; i < $(".selete-item>label>a").length; i++) {
			if (i == 1) {
				$(".selete-item>label>a").get(i).style = "background-color:red";
			} else {
				$(".selete-item>label>a").get(i).style = "background-color:none";
			}
		}
		showChoice(allHero, jungle);
	}
	$(".selete-item>label>a").get(2).onclick = function(e) {
		for (var i = 0; i < $(".selete-item>label>a").length; i++) {
			if (i == 2) {
				$(".selete-item>label>a").get(i).style = "background-color:red";
			} else {
				$(".selete-item>label>a").get(i).style = "background-color:none";
			}
		}
		$(".imgtextlist>li").css("display", "none");
		showChoice(allHero, middle);
	}
	$(".selete-item>label>a").get(3).onclick = function(e) {
		for (var i = 0; i < $(".selete-item>label>a").length; i++) {
			if (i == 3) {
				$(".selete-item>label>a").get(i).style = "background-color:red";
			} else {
				$(".selete-item>label>a").get(i).style = "background-color:white";
			}
		}

		$(".imgtextlist>li").css("display", "none");
		showChoice(allHero, adc);
	}
	$(".selete-item>label>a").get(4).onclick = function(e) {
		for (var i = 0; i < $(".selete-item>label>a").length; i++) {
			if (i == 4) {
				$(".selete-item>label>a").get(i).style = "background-color:red";
			} else {
				$(".selete-item>label>a").get(i).style = "background-color:white";
			}
		}
		$(".imgtextlist>li").css("display", "none");
		showChoice(allHero, support);
	}

});


function showChoice(allHer, GPS) {
	var index = new Array();

	for (j = 0; j < GPS.length; j++) {
		for (i = 0; i < allHer.length; i++) {
			if (allHer[i] == GPS[j]) {
				$(".imgtextlist>li").get(i).style = "display:block";
				/*text.substring(0,text.length);*/
				/*alert(text.substring(0,text.length))*/
				index[j] = i;
			} else {
				//$(".imgtextlist>li").css("float","left").get(i).style="display:block";
			}
		}
	}
	//alert("idex长度："+index[0]+"allHero"+allHer[index[0]])

	var no = 0;
	// console.log(index);
	index.sort((a, b) => a - b);
	// console.log(index);
	var myInterval = setInterval(function() {

		//if (index[no]!=0){
		//$(".imgtextlist>li").get(index[no-1]).style="border:10px white solid";

		//kong
		//隐藏显示第一次选择的
		// $(".imgtextlist>li").get(index[no - 1]).style = "display:none";
		// console.log(index[no])
		// console.log($(".imgtextlist>li").get(index[no]))

		// $(".imgtextlist>li").get(index[no]).style.border= "none";
		//}
		if (no >= index.length) {
			no = 0;
		}

		// if(no==0){
		// 	$(".imgtextlist>li").get(index[index.length-1]).style.border= "none";
		// }else{
		// 	$(".imgtextlist>li").get(index[no-1]).style.border= "none";
		// }
		if (no == 0) {
			$(".imgtextlist>li").get(index[index.length - 1]).style.border = "none";
		} else {
			$(".imgtextlist>li").get(index[no - 1]).style.border = "none";
		}
		$(".imgtextlist>li").get(index[no]).style = "border:50px yellow solid";

		$(".imgtextlist>li").css("text-align", "center").css("float", "left")
		let randomNO = getRandom(index.length);
		if (randomNO == no) {
			clearInterval(myInterval);
			console.log("你随机到的" + (index[no] + 1) + "号英雄：" + allHer[index[no]]);
			let heroParent = $("#jSearchHeroDiv").children("li").children();
			//英雄名称
			let heroName = heroParent.children("p")[index[no]].innerText;
			//发信息给
			souceWindow.postMessage(heroName, "https://play.afreecatv.com");
			// console.log($("img:eq(" + index[no] + ")"));

			$("#choiceImg", parent.document).attr("src", "../" + $("img:eq(" +
				index[no] + ")").attr("src"));
			window.close();
		}


		no++;
	}, 16);

}

function startShow(gpsHero) {
	//判断

	var no = rd(10);

	// alert(gpsHero.length);
}


function jj(b, heroLeng) {

	//$("#jSearchHeroDiv>li").get(147).setAttribute("id","demo");
	//$(window).scrollTop($('#demo').offset().top);
	var n = rd(heroLeng);

	var i = 0;
	if (b == -2) {
		window.location.reload();
	} else {
		i = b;
		var myTimeout = setTimeout(function() {
			var j = b - 1;
			if (j >= 0) {
				$('img').get(j).style = "";
			}
			// console.log(i)
			if (i == n) {
				$('img').get(n - 1).style = "border:20px solid red";
				console.log("你随机到了" + n + "号英雄");
				// alert($('img').get(n - 1).getAttribute("alt"));

				// console.log($('img').get(n - 1).nextElementSibling.innerText);
				// 名称
				let heroName = $('img').get(n - 1).nextElementSibling.innerText;

				//发信息给
				souceWindow.postMessage(heroName, "https://play.afreecatv.com");

				//alert($("#jSearchHeroDiv>li").get(n-1).getAttribute("id"))
				$("#jSearchHeroDiv>li").get(n - 1).setAttribute("id", "demo");
				// $("#jSearchHeroDiv>li").get(n - 1).style = "text-align:center";

				//$(window).scrollTop($('#demo').offset().left);
				window.close();
				return;
			}
			if (i >= heroLeng) {
				i = 0;
			}
			$('img').get(i).style.border = "5px solid green";
			// console.log($('img').get(i).alt);

			i++;
			jj(i, heroLeng);
		}, 16);

		$(".imgtextlist>li").css("text-align", "center").css("float", "left")
	}


}

//1-heroNo
function rd(heroNo) {
	//var  rd =Math.random()*100%10;
	var num = Math.floor(Math.random() * (heroNo - 1) + 1);
	return num;
}

// 1-no
function getRandom(no) {
	randomNo = parseInt(Math.random() * (no) / 1);
	return randomNo;
}
